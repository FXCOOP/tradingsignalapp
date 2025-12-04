/**
 * API Endpoint: POST/GET /api/nax/sync-status
 *
 * NAX Capital Status Sync
 *
 * IMPORTANT: NAX uses Airtable Webhook which is one-way (push only).
 * Status retrieval is NOT supported via the webhook.
 *
 * To get lead status updates from NAX:
 * 1. NAX team can set up a postback webhook to notify us of status changes
 * 2. Or manual status updates via CRM dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * POST - Manual status update for NAX leads
 * Since NAX webhook is one-way, status must be updated manually or via postback
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { signupId, status, notes } = body;

    if (!signupId) {
      return NextResponse.json({
        success: false,
        error: 'signupId is required',
      }, { status: 400 });
    }

    console.log('📥 Manual NAX status update for lead:', signupId);

    // Get lead from database
    const { data: leadData, error: fetchError } = await supabase
      .from('signups')
      .select('id, email, assigned_broker, broker_status')
      .eq('id', signupId)
      .single();

    if (fetchError || !leadData) {
      return NextResponse.json({
        success: false,
        error: 'Lead not found in database',
      }, { status: 404 });
    }

    // Check if this is a NAX lead
    if (leadData.assigned_broker !== 'NAX') {
      return NextResponse.json({
        success: false,
        error: 'This lead was not sent to NAX broker',
      }, { status: 400 });
    }

    // If no status provided, return current status
    if (!status) {
      return NextResponse.json({
        success: true,
        leadId: signupId,
        currentStatus: leadData.broker_status || 'Unknown',
        message: 'NAX webhook is one-way. Status must be updated manually or via postback webhook.',
        note: 'Contact NAX team to set up postback notifications for status updates.',
      });
    }

    // Determine if this is an FTD conversion
    const ftdExists = status.toLowerCase().includes('ftd') ||
                      status.toLowerCase().includes('converted') ||
                      status.toLowerCase().includes('deposit');

    const previousStatus = leadData.broker_status;

    // Update lead status in database
    const { error: updateError } = await supabase
      .from('signups')
      .update({
        broker_status: status,
        broker_status_code: 200,
        ftd_exists: ftdExists,
        last_status_check: new Date().toISOString(),
      })
      .eq('id', signupId);

    if (updateError) {
      console.error('Error updating NAX lead status:', updateError);
      return NextResponse.json({
        success: false,
        error: 'Failed to update status',
      }, { status: 500 });
    }

    // Log status change
    if (previousStatus !== status) {
      await supabase.from('lead_status_history').insert({
        lead_id: signupId,
        previous_status: previousStatus || 'Unknown',
        new_status: status,
        status_code: 200,
        ftd_exists: ftdExists,
        changed_at: new Date().toISOString(),
      });
    }

    // Log conversion if new FTD
    if (ftdExists) {
      const { data: existingConversion } = await supabase
        .from('conversions')
        .select('id')
        .eq('lead_id', signupId)
        .single();

      if (!existingConversion) {
        console.log('🎉 NEW CONVERSION (NAX):', signupId, '- FTD!');

        await supabase.from('conversions').insert({
          lead_id: signupId,
          broker_name: 'NAX',
          conversion_type: 'FTD',
          converted_at: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({
      success: true,
      leadId: signupId,
      previousStatus,
      newStatus: status,
      ftdExists,
      message: 'Status updated successfully',
    });

  } catch (error) {
    console.error('NAX status update error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    }, { status: 500 });
  }
}

/**
 * GET endpoint - NAX sync statistics
 */
export async function GET() {
  try {
    // Get NAX leads stats
    const { data: naxLeads } = await supabase
      .from('signups')
      .select('id, broker_status, ftd_exists, pushed_at, last_status_check')
      .eq('assigned_broker', 'NAX')
      .order('pushed_at', { ascending: false })
      .limit(100);

    const totalLeads = naxLeads?.length || 0;
    const withFTD = naxLeads?.filter(l => l.ftd_exists).length || 0;
    const lastPush = naxLeads?.[0]?.pushed_at || null;

    // Get status breakdown
    const statusBreakdown: Record<string, number> = {};
    naxLeads?.forEach(lead => {
      const status = lead.broker_status || 'Pending';
      statusBreakdown[status] = (statusBreakdown[status] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      broker: 'NAX',
      note: 'NAX webhook is one-way. Status updates require manual input or postback webhook from NAX.',
      stats: {
        totalLeads,
        conversions: withFTD,
        conversionRate: totalLeads > 0 ? ((withFTD / totalLeads) * 100).toFixed(2) + '%' : '0%',
        lastPush,
        statusBreakdown,
      },
      integration: {
        type: 'Airtable Webhook',
        statusSync: 'Manual or Postback',
        contacts: {
          cto: 'matt@sparkeleven.com.au',
          ciso: 'itay@naxcapital.com.au',
        },
      },
    });

  } catch (error) {
    console.error('Error getting NAX stats:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    }, { status: 500 });
  }
}