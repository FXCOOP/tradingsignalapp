/**
 * API Endpoint: POST /api/ntraffic/sync-status
 *
 * Syncs lead status from N_Traffic API
 * Uses the getLeads endpoint to fetch lead data by custom1 (signupId)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createNTrafficClient } from '@/lib/ntraffic-api';
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

    console.log('📥 N_Traffic: Syncing status for lead:', signupId);

    // Get lead from database to find the leadRequestId from push_response
    const { data: leadData, error: leadError } = await supabase
      .from('signups')
      .select('*')
      .eq('id', signupId)
      .single();

    if (leadError || !leadData) {
      return NextResponse.json({
        success: false,
        error: 'Lead not found in database',
      }, { status: 404 });
    }

    // Check if this is an N_Traffic lead
    if (!leadData.assigned_broker?.includes('N_Traffic')) {
      return NextResponse.json({
        success: false,
        error: 'Lead is not assigned to N_Traffic',
      }, { status: 400 });
    }

    // Try to get leadRequestId from push_response
    let leadRequestId: string | null = null;
    if (leadData.push_response) {
      try {
        const pushResponse = typeof leadData.push_response === 'string'
          ? JSON.parse(leadData.push_response)
          : leadData.push_response;
        leadRequestId = pushResponse.leadRequestId || null;
      } catch (e) {
        console.log('Could not parse push_response:', e);
      }
    }

    const client = createNTrafficClient();

    // If we have a leadRequestId, try to get autologin URL (this confirms the lead exists)
    if (leadRequestId) {
      console.log(`📥 N_Traffic: Found leadRequestId: ${leadRequestId}`);

      const autologinResult = await client.getAutologinUrl(leadRequestId);
      console.log('📥 N_Traffic autologin result:', autologinResult);

      if (autologinResult.success) {
        // Lead exists in N_Traffic - update status as "Active"
        const status = 'Registered';
        const statusCode = 1;

        // Update signup record
        const { error: updateError } = await supabase
          .from('signups')
          .update({
            broker_status: status,
            broker_status_code: statusCode,
            last_status_check: new Date().toISOString(),
          })
          .eq('id', signupId);

        if (updateError) {
          console.error('Error updating lead status:', updateError);
        }

        return NextResponse.json({
          success: true,
          leadId: signupId,
          status: status,
          statusCode: statusCode,
          ftdExists: false, // Will need conversions API to check this
          autologinUrl: autologinResult.url,
          updated: !updateError,
        });
      }
    }

    // Try to find lead in N_Traffic using date range and custom1 (signupId)
    // Search in last 30 days
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);

    const formatDate = (d: Date) => {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} 00:00:00`;
    };

    console.log(`📥 N_Traffic: Searching leads from ${formatDate(fromDate)} to ${formatDate(toDate)} with custom1=${signupId}`);

    const leadsResult = await client.getLeads({
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      custom1: signupId,
      itemsPerPage: 10,
    });

    console.log('📥 N_Traffic getLeads result:', {
      success: leadsResult.success,
      total: leadsResult.total,
      leadsCount: leadsResult.leads?.length,
    });

    if (leadsResult.success && leadsResult.leads && leadsResult.leads.length > 0) {
      const ntrafficLead = leadsResult.leads[0];

      // Determine status based on N_Traffic data
      const hasFTD = ntrafficLead.hasFTD === 1;
      const status = hasFTD ? 'FTD' : (ntrafficLead.saleStatus || 'Registered');
      const statusCode = hasFTD ? 9 : 1;

      // Update signup record
      const { error: updateError } = await supabase
        .from('signups')
        .update({
          broker_status: status,
          broker_status_code: statusCode,
          ftd_exists: hasFTD,
          last_status_check: new Date().toISOString(),
        })
        .eq('id', signupId);

      if (updateError) {
        console.error('Error updating lead status:', updateError);
      }

      // Log status change
      if (leadData.broker_status !== status) {
        try {
          await supabase.from('lead_status_history').insert({
            lead_id: signupId,
            previous_status: leadData.broker_status || 'Unknown',
            new_status: status,
            status_code: statusCode,
            ftd_exists: hasFTD,
            changed_at: new Date().toISOString(),
          });
        } catch (e) {
          console.log('Could not log status history:', e);
        }
      }

      // Log conversion if new FTD
      if (hasFTD && !leadData.ftd_exists) {
        console.log('🎉 NEW CONVERSION from N_Traffic:', leadData.email, '- FTD!');
        try {
          await supabase.from('conversions').insert({
            lead_id: signupId,
            broker_name: 'N_Traffic',
            conversion_type: 'FTD',
            converted_at: new Date().toISOString(),
          });
        } catch (e) {
          console.log('Could not log conversion:', e);
        }
      }

      return NextResponse.json({
        success: true,
        leadId: signupId,
        status: status,
        statusCode: statusCode,
        ftdExists: hasFTD,
        saleStatus: ntrafficLead.saleStatus,
        signupDate: ntrafficLead.signupDate,
        campaign: ntrafficLead.campaignName,
        country: ntrafficLead.countryName,
        updated: !updateError,
        rawData: ntrafficLead,
      });
    }

    // Also check conversions API for FTD status
    console.log(`📥 N_Traffic: Checking conversions API...`);
    const conversionsResult = await client.getConversions({
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      custom1: signupId,
      itemsPerPage: 10,
    });

    console.log('📥 N_Traffic getConversions result:', {
      success: conversionsResult.success,
      total: conversionsResult.total,
      conversionsCount: conversionsResult.conversions?.length,
    });

    if (conversionsResult.success && conversionsResult.conversions && conversionsResult.conversions.length > 0) {
      const conversion = conversionsResult.conversions[0];

      // Lead has converted!
      const status = 'FTD';
      const statusCode = 9;

      // Update signup record
      const { error: updateError } = await supabase
        .from('signups')
        .update({
          broker_status: status,
          broker_status_code: statusCode,
          ftd_exists: true,
          last_status_check: new Date().toISOString(),
        })
        .eq('id', signupId);

      if (updateError) {
        console.error('Error updating lead status:', updateError);
      }

      // Log conversion if new FTD
      if (!leadData.ftd_exists) {
        console.log('🎉 NEW CONVERSION from N_Traffic:', leadData.email, '- FTD!');
        try {
          await supabase.from('conversions').insert({
            lead_id: signupId,
            broker_name: 'N_Traffic',
            conversion_type: 'FTD',
            converted_at: conversion.depositDate,
            amount: conversion.amount,
            currency: conversion.currency,
          });
        } catch (e) {
          console.log('Could not log conversion:', e);
        }
      }

      return NextResponse.json({
        success: true,
        leadId: signupId,
        status: status,
        statusCode: statusCode,
        ftdExists: true,
        depositAmount: conversion.amount,
        depositCurrency: conversion.currency,
        depositDate: conversion.depositDate,
        updated: !updateError,
        rawData: conversion,
      });
    }

    // Lead not found in N_Traffic API - could be pending or not yet synced
    // If push was successful (200), mark as "Pending" status
    if (leadData.push_status_code === 200) {
      const status = 'Pending';
      const statusCode = 0;

      const { error: updateError } = await supabase
        .from('signups')
        .update({
          broker_status: status,
          broker_status_code: statusCode,
          last_status_check: new Date().toISOString(),
        })
        .eq('id', signupId);

      return NextResponse.json({
        success: true,
        leadId: signupId,
        status: status,
        statusCode: statusCode,
        ftdExists: false,
        updated: !updateError,
        info: 'Lead was pushed successfully but not yet visible in N_Traffic reporting. This is normal for recently pushed leads.',
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Lead not found in N_Traffic system',
      leadId: signupId,
    }, { status: 404 });

  } catch (error) {
    console.error('N_Traffic status sync error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    }, { status: 500 });
  }
}

/**
 * GET endpoint to get sync stats
 */
export async function GET() {
  try {
    // Get N_Traffic leads stats
    const { data: ntrafficLeads } = await supabase
      .from('signups')
      .select('id, broker_status, ftd_exists, last_status_check')
      .eq('assigned_broker', 'N_Traffic')
      .limit(100);

    const totalLeads = ntrafficLeads?.length || 0;
    const withFTD = ntrafficLeads?.filter(l => l.ftd_exists).length || 0;
    const synced = ntrafficLeads?.filter(l => l.last_status_check).length || 0;

    // Get status breakdown
    const statusBreakdown: Record<string, number> = {};
    ntrafficLeads?.forEach(lead => {
      const status = lead.broker_status || 'Unknown';
      statusBreakdown[status] = (statusBreakdown[status] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      broker: 'N_Traffic',
      stats: {
        totalLeads,
        synced,
        conversions: withFTD,
        conversionRate: totalLeads > 0 ? ((withFTD / totalLeads) * 100).toFixed(2) + '%' : '0%',
        statusBreakdown,
      },
    });

  } catch (error) {
    console.error('Error getting N_Traffic sync status:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    }, { status: 500 });
  }
}
