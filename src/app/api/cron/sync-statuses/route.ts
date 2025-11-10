import { NextRequest, NextResponse } from 'next/server';
import { createStatusSync } from '@/lib/trading-crm-status';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const dynamic = 'force-dynamic';

/**
 * Cron Job: Automatic Broker Status Sync
 *
 * Runs every hour during working hours (9 AM - 6 PM UTC)
 * Syncs all recent leads with Trading CRM
 *
 * Schedule: Every hour (09:00, 10:00, 11:00... 18:00)
 * URL: https://tradeflow.blog/api/cron/sync-statuses
 */
export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'your-secret-key';

    if (authHeader !== `Bearer ${cronSecret}`) {
      console.log('⚠️ Unauthorized cron request');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if within working hours (9 AM - 6 PM UTC)
    const now = new Date();
    const hour = now.getUTCHours();
    const isWorkingHours = hour >= 9 && hour < 18;

    console.log('⏰ Cron: Sync Statuses', {
      time: now.toISOString(),
      hour,
      isWorkingHours,
    });

    if (!isWorkingHours) {
      console.log('⏸️ Outside working hours, skipping sync');
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: 'Outside working hours (9 AM - 6 PM UTC)',
        currentHour: hour,
      });
    }

    // Get all leads from last 7 days that need syncing
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentLeads, error: fetchError } = await supabase
      .from('signups')
      .select('id, email, broker, pushed_to_crm, broker_status')
      .eq('broker', 'Trading CRM')
      .eq('pushed_to_crm', true)
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('❌ Error fetching leads:', fetchError);
      return NextResponse.json(
        { success: false, error: fetchError.message },
        { status: 500 }
      );
    }

    if (!recentLeads || recentLeads.length === 0) {
      console.log('ℹ️ No recent leads to sync');
      return NextResponse.json({
        success: true,
        synced: 0,
        message: 'No recent leads found',
      });
    }

    console.log(`📊 Found ${recentLeads.length} leads to sync`);

    // Sync statuses
    const statusSync = createStatusSync();
    const results = {
      total: recentLeads.length,
      synced: 0,
      failed: 0,
      conversions: 0,
      statusChanges: 0,
    };

    for (const lead of recentLeads) {
      try {
        console.log(`🔄 Syncing lead: ${lead.email}`);

        // Fetch status from Trading CRM
        const status = await statusSync.fetchLeadStatus(lead.id, lead.email);

        if (!status) {
          console.log(`⚠️ Lead not found in Trading CRM: ${lead.email}`);
          results.failed++;
          continue;
        }

        // Check for status changes
        const hasStatusChanged = lead.broker_status !== status.leadStatus;
        const hasNewFTD = status.ftdExists;

        // Update in database
        const { error: updateError } = await supabase
          .from('signups')
          .update({
            broker_status: status.leadStatus,
            broker_status_code: status.leadStatusCode,
            broker_account_id: status.id,
            tp_account: status.tpAccount,
            ftd_exists: status.ftdExists,
            broker_modified_at: status.modifiedOn,
            last_status_check: new Date().toISOString(),
          })
          .eq('id', lead.id);

        if (updateError) {
          console.error(`❌ Error updating lead ${lead.email}:`, updateError);
          results.failed++;
          continue;
        }

        results.synced++;

        if (hasStatusChanged) {
          results.statusChanges++;
          console.log(`📈 Status changed: ${lead.email} → ${status.leadStatus}`);

          // Log status change
          await supabase.from('lead_status_history').insert({
            lead_id: lead.id,
            previous_status: lead.broker_status || 'Unknown',
            new_status: status.leadStatus,
            status_code: status.leadStatusCode,
            ftd_exists: status.ftdExists,
            changed_at: new Date().toISOString(),
          });
        }

        if (hasNewFTD) {
          results.conversions++;
          console.log(`🎉 NEW CONVERSION: ${lead.email} - FTD!`);

          // Log conversion
          await supabase.from('conversions').insert({
            lead_id: lead.id,
            broker_name: 'Trading CRM',
            conversion_type: 'FTD',
            converted_at: status.modifiedOn,
            tp_account: status.tpAccount,
          });
        }

      } catch (error) {
        console.error(`❌ Error syncing lead ${lead.email}:`, error);
        results.failed++;
      }

      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('✅ Sync complete:', results);

    // Log sync result
    await supabase.from('sync_logs').insert({
      sync_type: 'broker_status_hourly',
      total_leads: results.total,
      synced: results.synced,
      failed: results.failed,
      conversions: results.conversions,
      status_changes: results.statusChanges,
      executed_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      cronJob: 'sync-statuses',
      executedAt: new Date().toISOString(),
      results,
    });

  } catch (error) {
    console.error('❌ Cron job error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
