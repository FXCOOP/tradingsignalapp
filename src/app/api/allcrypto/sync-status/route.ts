/**
 * API Endpoint: POST /api/allcrypto/sync-status
 *
 * Syncs lead status from AllCrypto (yourleads.org) API
 * Fetches live status by lead UUID and updates database
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAllCryptoClient } from '@/lib/allcrypto-api';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { signupId } = body;

    if (!signupId) {
      return NextResponse.json({
        success: false,
        error: 'signupId is required',
      }, { status: 400 });
    }

    console.log('📥 Syncing AllCrypto status for lead:', signupId);

    // Get lead from database
    const { data: leadData, error: fetchError } = await supabase
      .from('signups')
      .select('id, email, push_response, assigned_broker')
      .eq('id', signupId)
      .single();

    if (fetchError || !leadData) {
      return NextResponse.json({
        success: false,
        error: 'Lead not found in database',
      }, { status: 404 });
    }

    // Extract AllCrypto lead_uuid from push_response
    let leadUuid: string | null = null;

    if (leadData.push_response) {
      try {
        const pushResponse = typeof leadData.push_response === 'string'
          ? JSON.parse(leadData.push_response)
          : leadData.push_response;

        leadUuid = pushResponse.lead_uuid || pushResponse.leadUuid || null;
      } catch (parseError) {
        console.error('Failed to parse push_response:', parseError);
      }
    }

    if (!leadUuid) {
      return NextResponse.json({
        success: false,
        error: 'AllCrypto lead UUID not found. Lead may not have been pushed to AllCrypto yet.',
      }, { status: 404 });
    }

    console.log('📍 AllCrypto Lead UUID:', leadUuid);

    // Fetch status from AllCrypto API
    const client = createAllCryptoClient();
    const result = await client.getLeadStatus(leadUuid);

    if (!result.success || !result.lead) {
      return NextResponse.json({
        success: false,
        error: result.error || 'Lead not found in AllCrypto',
      }, { status: 404 });
    }

    const lead = result.lead;

    console.log('✅ AllCrypto status fetched:', {
      uuid: lead.uuid,
      email: lead.email,
      goalType: lead.goalType,
      goalTypeUuid: lead.goalTypeUuid,
    });

    // Map AllCrypto goalType to our database status fields
    // AllCrypto uses goalType instead of traditional status
    // Goal types: "Lead Pushed", "FTD", etc.
    const status = lead.goalType || 'Lead Pushed';
    const statusCode = 200; // AllCrypto doesn't provide numeric status codes
    const ftdExists = lead.goalType?.toLowerCase().includes('ftd') || false;

    // Update lead status in database
    const updateResult = await updateLeadStatus(signupId, {
      status,
      statusCode,
      ftdExists,
      leadUuid: lead.uuid,
      advertiserName: lead.advertiserName,
      createdAt: lead.createdAt,
    });

    return NextResponse.json({
      success: true,
      leadId: signupId,
      status,
      statusCode,
      ftdExists,
      updated: updateResult.updated,
      leadUuid: lead.uuid,
      advertiserName: lead.advertiserName,
    });

  } catch (error) {
    console.error('AllCrypto status sync error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    }, { status: 500 });
  }
}

/**
 * Update lead status in database
 */
async function updateLeadStatus(signupId: string, statusData: {
  status: string;
  statusCode: number;
  ftdExists: boolean;
  leadUuid: string;
  advertiserName?: string;
  createdAt?: string;
}) {
  try {
    // Get current status
    const { data: currentLead } = await supabase
      .from('signups')
      .select('broker_status, broker_status_code, ftd_exists')
      .eq('id', signupId)
      .single();

    const hasStatusChanged = currentLead?.broker_status !== statusData.status;
    const hasNewFTD = statusData.ftdExists && !currentLead?.ftd_exists;

    // Update signup record
    const { error } = await supabase
      .from('signups')
      .update({
        broker_status: statusData.status,
        broker_status_code: statusData.statusCode,
        ftd_exists: statusData.ftdExists,
        last_status_check: new Date().toISOString(),
        // Store AllCrypto metadata in push_response if needed
        ...(statusData.advertiserName && {
          assigned_broker: `AllCrypto - ${statusData.advertiserName}`
        }),
      })
      .eq('id', signupId);

    if (error) {
      console.error('Error updating AllCrypto lead status:', error);
      return { updated: false, isConversion: false };
    }

    // Log status change
    if (hasStatusChanged) {
      await supabase.from('lead_status_history').insert({
        lead_id: signupId,
        previous_status: currentLead?.broker_status || 'Unknown',
        new_status: statusData.status,
        status_code: statusData.statusCode,
        ftd_exists: statusData.ftdExists,
        changed_at: new Date().toISOString(),
      });
    }

    // Log conversion
    if (hasNewFTD) {
      console.log('🎉 NEW CONVERSION (AllCrypto):', statusData.leadUuid, '- FTD!');

      await supabase.from('conversions').insert({
        lead_id: signupId,
        broker_name: statusData.advertiserName || 'AllCrypto',
        conversion_type: 'FTD',
        converted_at: new Date().toISOString(),
      });
    }

    return {
      updated: true,
      isConversion: statusData.ftdExists,
      hasStatusChanged,
      hasNewFTD,
    };

  } catch (error) {
    console.error('Error updating AllCrypto lead status:', error);
    return { updated: false, isConversion: false };
  }
}

/**
 * GET endpoint to check sync status
 */
export async function GET(request: NextRequest) {
  try {
    // Get recent AllCrypto syncs
    const { data: recentSyncs } = await supabase
      .from('signups')
      .select('last_status_check, broker_status, ftd_exists, assigned_broker')
      .like('assigned_broker', '%AllCrypto%')
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
    console.error('Error getting AllCrypto sync status:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    }, { status: 500 });
  }
}
