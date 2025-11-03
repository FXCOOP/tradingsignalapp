import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

// POST /api/crm/brokers/push-lead - Push lead to broker's API
export async function POST(request: NextRequest) {
  try {
    const { leadId, brokerId } = await request.json();

    if (!leadId || !brokerId) {
      return NextResponse.json(
        { error: 'Lead ID and Broker ID are required' },
        { status: 400 }
      );
    }

    // Fetch broker details
    const { data: broker, error: brokerError } = await supabase
      .from('brokers')
      .select('*')
      .eq('id', brokerId)
      .single();

    if (brokerError || !broker) {
      return NextResponse.json(
        { error: 'Broker not found' },
        { status: 404 }
      );
    }

    // Fetch lead details
    const { data: lead, error: leadError } = await supabase
      .from('signups')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Check if broker has API endpoint configured
    if (!broker.api_endpoint) {
      return NextResponse.json(
        { error: 'Broker has no API endpoint configured' },
        { status: 400 }
      );
    }

    // Prepare lead data for push
    const leadData = {
      id: lead.id,
      first_name: lead.first_name,
      last_name: lead.last_name,
      email: lead.email,
      phone: lead.phone_number,
      country: lead.country,
      country_code: lead.country_code,
      created_at: lead.created_at,
      // Add any custom fields
      source: 'GCC Signal Pro',
      referral_code: lead.referral_code || null
    };

    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(broker.api_headers || {})
    };

    if (broker.api_key) {
      headers['Authorization'] = `Bearer ${broker.api_key}`;
    }

    // Push lead to broker's API
    const pushResponse = await fetch(broker.api_endpoint, {
      method: broker.api_method || 'POST',
      headers,
      body: JSON.stringify(leadData)
    });

    const responseData = await pushResponse.json().catch(() => ({}));

    // Log the push attempt
    const { error: logError } = await supabase
      .from('lead_push_logs')
      .insert({
        lead_id: leadId,
        broker_id: brokerId,
        status: pushResponse.ok ? 'success' : 'failed',
        http_status: pushResponse.status,
        request_data: leadData,
        response_data: responseData,
        error_message: !pushResponse.ok ? responseData.error || 'Push failed' : null,
        pushed_at: new Date().toISOString()
      });

    if (logError) {
      console.error('Failed to log push attempt:', logError);
    }

    // Update broker stats
    if (pushResponse.ok) {
      await supabase.rpc('increment_broker_stats', {
        broker_id: brokerId,
        field: 'total_leads_sent'
      });
    }

    return NextResponse.json({
      success: pushResponse.ok,
      status: pushResponse.status,
      message: pushResponse.ok ? 'Lead pushed successfully' : 'Failed to push lead',
      response: responseData
    });

  } catch (error: any) {
    console.error('Error pushing lead to broker:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to push lead' },
      { status: 500 }
    );
  }
}
