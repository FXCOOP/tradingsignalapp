import { NextRequest, NextResponse } from 'next/server';
import {
  getLeadAssignments,
  getSalesStatusByLeadId,
  getLeadActivity
} from '@/lib/supabase';

// GET /api/crm/leads/[id] - Get full lead details with assignments, status, and activity
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = params.id;

    // Fetch all related data in parallel
    const [assignments, salesStatus, activity] = await Promise.all([
      getLeadAssignments(leadId),
      getSalesStatusByLeadId(leadId),
      getLeadActivity(leadId)
    ]);

    return NextResponse.json({
      success: true,
      assignments,
      salesStatus,
      activity
    });

  } catch (error: any) {
    console.error('Error fetching lead details:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch lead details' },
      { status: 500 }
    );
  }
}