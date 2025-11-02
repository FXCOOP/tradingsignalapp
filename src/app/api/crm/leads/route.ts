import { NextRequest, NextResponse } from 'next/server';
import { getLeadsWithFilters, updateSignupCRM, getAllSignups } from '@/lib/supabase';

// GET /api/crm/leads - Fetch leads with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      status: searchParams.get('status') || undefined,
      country: searchParams.get('country') || undefined,
      broker_id: searchParams.get('broker_id') || undefined,
      date_from: searchParams.get('date_from') || undefined,
      date_to: searchParams.get('date_to') || undefined,
      limit: parseInt(searchParams.get('limit') || '50'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    const result = await getLeadsWithFilters(filters);

    return NextResponse.json({
      success: true,
      leads: result.data,
      total: result.count,
      filters
    });

  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// PUT /api/crm/leads - Update a lead's CRM fields
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    const updated = await updateSignupCRM(id, updates);

    return NextResponse.json({
      success: true,
      lead: updated
    });

  } catch (error: any) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update lead' },
      { status: 500 }
    );
  }
}