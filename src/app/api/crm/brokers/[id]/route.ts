import { NextRequest, NextResponse } from 'next/server';
import {
  getBrokerById,
  updateBroker,
  deleteBroker,
  getBrokerAssignments,
  getSalesStatusByBrokerId
} from '@/lib/supabase';

// GET /api/crm/brokers/[id] - Get broker details with stats
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const brokerId = params.id;

    const [broker, assignments, salesStatus] = await Promise.all([
      getBrokerById(brokerId),
      getBrokerAssignments(brokerId, 50),
      getSalesStatusByBrokerId(brokerId)
    ]);

    if (!broker) {
      return NextResponse.json(
        { error: 'Broker not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      broker,
      assignments,
      salesStatus
    });

  } catch (error: any) {
    console.error('Error fetching broker:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch broker' },
      { status: 500 }
    );
  }
}

// PUT /api/crm/brokers/[id] - Update broker
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const brokerId = params.id;
    const updates = await request.json();

    const broker = await updateBroker(brokerId, updates);

    return NextResponse.json({
      success: true,
      broker
    });

  } catch (error: any) {
    console.error('Error updating broker:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update broker' },
      { status: 500 }
    );
  }
}

// DELETE /api/crm/brokers/[id] - Delete broker
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const brokerId = params.id;

    await deleteBroker(brokerId);

    return NextResponse.json({
      success: true,
      message: 'Broker deleted successfully'
    });

  } catch (error: any) {
    console.error('Error deleting broker:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete broker' },
      { status: 500 }
    );
  }
}