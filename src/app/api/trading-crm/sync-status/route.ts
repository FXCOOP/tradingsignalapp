/**
 * API Endpoint: POST /api/trading-crm/sync-status
 *
 * Syncs lead status from Trading CRM
 * Can sync single lead or all recent leads
 */

import { NextRequest, NextResponse } from 'next/server';
import { createStatusSync, LeadStatus } from '@/lib/trading-crm-status';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { signupId, syncAll, days } = body;

    const statusSync = createStatusSync();

    // Sync single lead
    if (signupId) {
      console.log('📥 Syncing status for lead:', signupId);

      // Get lead email from database
      const { data: leadData } = await supabase
        .from('signups')
        .select('email, id')
        .eq('id', signupId)
        .single();

      if (!leadData) {
        return NextResponse.json({
          success: false,
          error: 'Lead not found in database',
        }, { status: 404 });
      }

      // Fetch status from Trading CRM (pass both signupId and email)
      const status = await statusSync.fetchLeadStatus(signupId, leadData.email);

      if (!status) {
        return NextResponse.json({
          success: false,
          error: 'Lead not found in Trading CRM',
        }, { status: 404 });
      }

      // Update in database
      const updateResult = await updateLeadStatus(signupId, status);

      return NextResponse.json({
        success: true,
        leadId: signupId,
        status: status.leadStatus,
        statusCode: status.leadStatusCode,
        ftdExists: status.ftdExists,
        tpAccount: status.tpAccount,
        updated: updateResult.updated,
      });
    }

    // Sync all recent leads
    if (syncAll) {
      const daysToSync = days || 7;
      console.log(`📥 Syncing all leads from last ${daysToSync} days...`);

      const recentLeads = await statusSync.fetchRecentLeads(daysToSync);

      if (recentLeads.length === 0) {
        return NextResponse.json({
          success: true,
          message: 'No leads found in Trading CRM',
          synced: 0,
        });
      }

      // Update all in database
      const results = await Promise.all(
        recentLeads.map(lead => updateLeadStatus(lead.affiliateTransactionId, lead))
      );

      const updated = results.filter(r => r.updated).length;
      const conversions = results.filter(r => r.isConversion).length;

      return NextResponse.json({
        success: true,
        synced: recentLeads.length,
        updated,
        conversions,
        leads: recentLeads.map(l => ({
          id: l.affiliateTransactionId,
          email: l.email,
          status: l.leadStatus,
          ftd: l.ftdExists,
        })),
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Either signupId or syncAll=true is required',
    }, { status: 400 });

  } catch (error) {
    console.error('Status sync error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    }, { status: 500 });
  }
}

/**
 * Update lead status in database
 */
async function updateLeadStatus(signupId: string, status: LeadStatus) {
  try {
    // Get current status
    const { data: currentLead } = await supabase
      .from('signups')
      .select('broker_status, broker_status_code, ftd_exists')
      .eq('id', signupId)
      .single();

    const hasStatusChanged = currentLead?.broker_status !== status.leadStatus;
    const hasNewFTD = status.ftdExists && !currentLead?.ftd_exists;

    // Update signup record
    const { error } = await supabase
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
      .eq('id', signupId);

    if (error) {
      console.error('Error updating lead status:', error);
      return { updated: false, isConversion: false };
    }

    // Log status change
    if (hasStatusChanged) {
      await supabase.from('lead_status_history').insert({
        lead_id: signupId,
        previous_status: currentLead?.broker_status || 'Unknown',
        new_status: status.leadStatus,
        status_code: status.leadStatusCode,
        ftd_exists: status.ftdExists,
        changed_at: new Date().toISOString(),
      });
    }

    // Log conversion
    if (hasNewFTD) {
      console.log('🎉 NEW CONVERSION:', status.email, '- FTD!');

      await supabase.from('conversions').insert({
        lead_id: signupId,
        broker_name: 'Finoglob',
        conversion_type: 'FTD',
        converted_at: status.modifiedOn,
        tp_account: status.tpAccount,
      });
    }

    return {
      updated: true,
      isConversion: status.ftdExists,
      hasStatusChanged,
      hasNewFTD,
    };

  } catch (error) {
    console.error('Error updating lead status:', error);
    return { updated: false, isConversion: false };
  }
}

/**
 * GET endpoint to check sync status
 */
export async function GET(request: NextRequest) {
  try {
    // Get recent sync stats
    const { data: recentSyncs } = await supabase
      .from('signups')
      .select('last_status_check, broker_status, ftd_exists')
      .not('last_status_check', 'is', null)
      .order('last_status_check', { ascending: false })
      .limit(100);

    const totalSynced = recentSyncs?.length || 0;
    const withFTD = recentSyncs?.filter(l => l.ftd_exists).length || 0;
    const lastSync = recentSyncs?.[0]?.last_status_check || null;

    // Get status breakdown
    const statusBreakdown: Record<string, number> = {};
    recentSyncs?.forEach(lead => {
      const status = lead.broker_status || 'Unknown';
      statusBreakdown[status] = (statusBreakdown[status] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalSynced,
        conversions: withFTD,
        conversionRate: totalSynced > 0 ? ((withFTD / totalSynced) * 100).toFixed(2) + '%' : '0%',
        lastSync,
        statusBreakdown,
      },
    });

  } catch (error) {
    console.error('Error getting sync status:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    }, { status: 500 });
  }
}
