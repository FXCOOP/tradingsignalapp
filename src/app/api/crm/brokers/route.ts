import { NextRequest, NextResponse } from 'next/server';
import { getAllBrokers, createBroker, type Broker } from '@/lib/supabase';

// GET /api/crm/brokers - Fetch all brokers
export async function GET(request: NextRequest) {
  try {
    const brokers = await getAllBrokers();

    return NextResponse.json({
      success: true,
      brokers,
      total: brokers.length
    });

  } catch (error: any) {
    console.error('Error fetching brokers:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch brokers' },
      { status: 500 }
    );
  }
}

// POST /api/crm/brokers - Create a new broker
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Set defaults
    const brokerData: Partial<Broker> = {
      name: data.name,
      company_name: data.company_name || null,
      email: data.email,
      phone: data.phone || null,
      country_codes: data.country_codes || [],
      status: data.status || 'active',
      api_endpoint: data.api_endpoint || null,
      api_key: data.api_key || null,
      api_method: data.api_method || 'POST',
      api_headers: data.api_headers || null,
      max_leads_per_day: data.max_leads_per_day || 100,
      max_leads_per_hour: data.max_leads_per_hour || 10,
      working_hours_start: data.working_hours_start || '00:00:00',
      working_hours_end: data.working_hours_end || '23:59:59',
      working_days: data.working_days || [1, 2, 3, 4, 5, 6, 7],
      payout_per_lead: data.payout_per_lead || 0,
      payout_per_conversion: data.payout_per_conversion || 0,
    };

    const broker = await createBroker(brokerData);

    return NextResponse.json({
      success: true,
      broker
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating broker:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create broker' },
      { status: 500 }
    );
  }
}
