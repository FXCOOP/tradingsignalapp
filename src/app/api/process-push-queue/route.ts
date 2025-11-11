import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createTradingCRMClient } from '@/lib/trading-crm-api';

/**
 * API Endpoint: Process Push Queue
 * Runs on cron schedule to push queued leads during working hours
 *
 * Working Hours: 04:00-13:00 GMT+2 (Monday-Friday)
 * Daily Cap: 10 leads per day
 * Natural spacing: 5-15 minutes between pushes
 *
 * GET/POST /api/process-push-queue
 *
 * Set up cron job:
 * - Every 10 minutes during working hours
 * - Or use Render Cron Job: "*/10 4-13 * * 1-5" (GMT+2)
 */
export async function GET(request: NextRequest) {
  return processQueue();
}

export async function POST(request: NextRequest) {
  return processQueue();
}

async function processQueue() {
  try {
    console.log('🕐 Starting push queue processor...');

    // Initialize Supabase with service role (full access)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Check if we're in working hours
    const { data: workingHoursCheck } = await supabase.rpc('is_working_hours');
    const isWorkingHours = workingHoursCheck;

    console.log(`⏰ Working hours: ${isWorkingHours ? 'YES' : 'NO'}`);

    if (!isWorkingHours) {
      return NextResponse.json({
        success: true,
        message: 'Outside working hours (04:00-13:00 GMT+2, Mon-Fri)',
        workingHours: false,
        processed: 0
      });
    }

    // 2. Check daily cap
    const { data: todayCountData } = await supabase.rpc('get_today_push_count');
    const todayCount = todayCountData || 0;

    console.log(`📊 Pushed today: ${todayCount}/10`);

    if (todayCount >= 10) {
      return NextResponse.json({
        success: true,
        message: 'Daily cap reached (10 leads per day)',
        dailyCapReached: true,
        pushedToday: todayCount,
        processed: 0
      });
    }

    // 3. Calculate how many leads we can push now
    const availableSlots = 10 - todayCount;
    console.log(`✅ Available slots: ${availableSlots}`);

    // 4. Get queued leads ready to push (oldest first, respect scheduled time)
    const { data: queuedLeads, error: queueError } = await supabase
      .from('signups')
      .select('*')
      .in('push_queue_status', ['pending', 'waiting_working_hours', 'waiting_daily_cap'])
      .is('pushed_to_crm', null) // Not yet pushed
      .or('pushed_to_crm.eq.false')
      .in('country', ['MY', 'Malaysia', 'TR', 'Turkey', 'FR', 'France', 'IT', 'Italy', 'HK', 'Hong Kong', 'SG', 'Singapore', 'TW', 'Taiwan', 'BR', 'Brazil']) // Only Trading CRM countries
      .order('created_at', { ascending: true })
      .limit(availableSlots);

    if (queueError) {
      console.error('❌ Error fetching queue:', queueError);
      throw queueError;
    }

    if (!queuedLeads || queuedLeads.length === 0) {
      console.log('📭 Queue is empty');
      return NextResponse.json({
        success: true,
        message: 'Queue is empty',
        workingHours: true,
        pushedToday: todayCount,
        availableSlots,
        processed: 0
      });
    }

    console.log(`📦 Found ${queuedLeads.length} leads in queue`);

    // 5. Process leads with natural spacing
    const results = {
      successful: 0,
      failed: 0,
      skipped: 0,
      details: [] as any[]
    };

    for (let i = 0; i < queuedLeads.length; i++) {
      const lead = queuedLeads[i];

      // Check if we've hit daily cap mid-processing
      const { data: currentCount } = await supabase.rpc('get_today_push_count');
      if ((currentCount || 0) >= 10) {
        console.log('⚠️ Daily cap reached during processing');

        // Update remaining leads to wait for next day
        await supabase
          .from('signups')
          .update({
            push_queue_status: 'waiting_daily_cap',
            push_queue_comment: 'Waiting for daily cap reset (10 leads/day limit)'
          })
          .eq('id', lead.id);

        results.skipped++;
        continue;
      }

      // Update status to "pushing"
      await supabase
        .from('signups')
        .update({
          push_queue_status: 'pushing',
          push_queue_comment: 'Currently pushing to Trading CRM...',
          push_attempts: (lead.push_attempts || 0) + 1,
          last_push_attempt_at: new Date().toISOString()
        })
        .eq('id', lead.id);

      console.log(`🚀 Pushing lead ${i + 1}/${queuedLeads.length}: ${lead.email}`);

      // Push to Trading CRM
      const pushResult = await pushLeadToTradingCRM(lead);

      if (pushResult.success) {
        // Success: Update lead and increment daily count
        await supabase
          .from('signups')
          .update({
            assigned_broker: 'Trading CRM',
            crm_status: 'sent_to_broker',
            pushed_to_crm: true,
            push_status_code: 200,
            push_response: JSON.stringify({
              broker: 'Trading CRM',
              timestamp: new Date().toISOString(),
              ...pushResult
            }),
            pushed_at: new Date().toISOString(),
            push_queue_status: 'pushed',
            push_queue_comment: `Successfully pushed to Trading CRM at ${new Date().toLocaleString('en-US', { timeZone: 'GMT' })}`
          })
          .eq('id', lead.id);

        // Increment daily count
        await supabase.rpc('increment_daily_push_count');

        // Log success
        await supabase
          .from('push_queue_log')
          .insert({
            signup_id: lead.id,
            action: 'pushed',
            reason: 'Successfully pushed to Trading CRM',
            push_count_today: (currentCount || 0) + 1,
            working_hours: true
          });

        results.successful++;
        console.log(`✅ Successfully pushed: ${lead.email}`);

      } else {
        // Failed: Update with error
        await supabase
          .from('signups')
          .update({
            assigned_broker: 'Trading CRM',
            crm_status: 'push_failed',
            pushed_to_crm: false,
            push_status_code: 500,
            push_error: pushResult.error,
            push_response: JSON.stringify({
              broker: 'Trading CRM',
              timestamp: new Date().toISOString(),
              error: pushResult.error
            }),
            push_queue_status: 'failed',
            push_queue_comment: `Push failed: ${pushResult.error}`
          })
          .eq('id', lead.id);

        // Log failure
        await supabase
          .from('push_queue_log')
          .insert({
            signup_id: lead.id,
            action: 'failed',
            reason: pushResult.error || 'Unknown error',
            push_count_today: currentCount || 0,
            working_hours: true
          });

        results.failed++;
        console.error(`❌ Failed to push: ${lead.email} - ${pushResult.error}`);
      }

      results.details.push({
        email: lead.email,
        country: lead.country,
        success: pushResult.success,
        error: pushResult.error
      });

      // Natural spacing: Wait 5-15 minutes between pushes (randomized)
      // But only if there are more leads to process
      if (i < queuedLeads.length - 1) {
        const delayMinutes = Math.floor(Math.random() * 11) + 5; // 5-15 minutes
        const delayMs = delayMinutes * 60 * 1000;
        console.log(`⏳ Waiting ${delayMinutes} minutes before next push...`);

        // For cron jobs, we don't actually wait - we just schedule the next lead
        // Instead, we set the next lead's scheduled time
        const nextLead = queuedLeads[i + 1];
        if (nextLead) {
          const scheduledTime = new Date(Date.now() + delayMs);
          await supabase
            .from('signups')
            .update({
              push_scheduled_at: scheduledTime.toISOString(),
              push_queue_comment: `Scheduled for ${scheduledTime.toLocaleString('en-US', { timeZone: 'GMT' })}`
            })
            .eq('id', nextLead.id);
        }
      }
    }

    // 6. Update any remaining pending leads to wait for working hours/daily cap
    await updateQueuedLeadsStatus(supabase);

    console.log('✅ Queue processing complete');
    console.log(`📊 Results: ${results.successful} successful, ${results.failed} failed, ${results.skipped} skipped`);

    return NextResponse.json({
      success: true,
      message: 'Queue processed successfully',
      workingHours: true,
      pushedToday: todayCount + results.successful,
      processed: results.successful + results.failed,
      results
    });

  } catch (error: any) {
    console.error('❌ Error processing queue:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}

/**
 * Push a single lead to Trading CRM
 */
async function pushLeadToTradingCRM(signup: any) {
  try {
    const client = createTradingCRMClient();

    const result = await client.registerLead({
      firstName: signup.first_name,
      lastName: signup.last_name,
      email: signup.email,
      phone: `${signup.country_code}${signup.phone_number}`,
      country: countryNameToISO(signup.country),
      ip: signup.ip_address,
      affiliateTransactionId: signup.id,
      utmSource: 'pksignalpulse',
      tag: 'signal_pulse_queue',
    });

    if (result.success) {
      return {
        success: true,
        leadId: result.leadId,
        redirectUrl: result.redirectUrl,
        rawResponse: result.rawResponse
      };
    } else {
      return {
        success: false,
        error: result.error || 'Trading CRM API failed',
        rawResponse: result.rawResponse
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to connect to Trading CRM'
    };
  }
}

/**
 * Convert country name to ISO code
 */
function countryNameToISO(countryName: string): string {
  const mapping: { [key: string]: string } = {
    'Malaysia': 'MY',
    'Turkey': 'TR',
    'France': 'FR',
    'Italy': 'IT',
    'Hong Kong': 'HK',
    'Singapore': 'SG',
    'Taiwan': 'TW',
    'Brazil': 'BR',
  };
  return mapping[countryName] || countryName;
}

/**
 * Update queued leads that are waiting
 */
async function updateQueuedLeadsStatus(supabase: any) {
  // Get next working hours start time
  const { data: nextWorkingHours } = await supabase.rpc('next_working_hours_start');

  // Update pending leads to wait for working hours
  await supabase
    .from('signups')
    .update({
      push_queue_status: 'waiting_working_hours',
      push_queue_comment: `Waiting for working hours (04:00-13:00 GMT+2, Mon-Fri). Next: ${new Date(nextWorkingHours).toLocaleString('en-US', { timeZone: 'GMT' })}`,
      push_scheduled_at: nextWorkingHours
    })
    .eq('push_queue_status', 'pending')
    .in('country', ['MY', 'Malaysia', 'TR', 'Turkey', 'FR', 'France', 'IT', 'Italy', 'HK', 'Hong Kong', 'SG', 'Singapore', 'TW', 'Taiwan', 'BR', 'Brazil']);
}
