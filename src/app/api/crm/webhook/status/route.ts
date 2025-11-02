import { NextRequest, NextResponse } from 'next/server';
import {
  createWebhookLog,
  createSalesStatus,
  updateSalesStatus,
  getSalesStatusByLeadId,
  updateSignupCRM,
  logLeadActivity,
  getBrokerById
} from '@/lib/supabase';

/**
 * POST /api/crm/webhook/status
 *
 * Receives sales status updates from brokers
 *
 * Expected payload format:
 * {
 *   broker_api_key: "your_broker_key",
 *   lead_id: "uuid",  // or external_lead_id
 *   external_lead_id: "broker's_internal_id",
 *   status: "contacted" | "deposit_made" | "active_trader" | etc.,
 *   deposit_amount: 1000,
 *   deposit_currency: "USD",
 *   deposit_date: "2025-01-15T10:30:00Z",
 *   trading_volume: 50000,
 *   total_trades: 25,
 *   last_trade_date: "2025-01-20T15:45:00Z",
 *   notes: "Customer is very active"
 * }
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null;
    const userAgent = request.headers.get('user-agent') || null;

    // Log the webhook request
    const webhookLog = await createWebhookLog({
      webhook_type: 'status_update',
      request_method: 'POST',
      request_headers: Object.fromEntries(request.headers.entries()),
      request_body: body,
      ip_address: ip || undefined,
      user_agent: userAgent || undefined,
      processed: false
    });

    // Validate broker API key
    const { broker_api_key, lead_id, external_lead_id, status } = body;

    if (!broker_api_key) {
      return NextResponse.json(
        { error: 'Missing broker_api_key' },
        { status: 401 }
      );
    }

    // TODO: Validate broker_api_key against database
    // For now, we'll accept any key and try to process

    if (!lead_id && !external_lead_id) {
      return NextResponse.json(
        { error: 'Either lead_id or external_lead_id is required' },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Find or create sales status record
    let salesStatusRecord;
    const existingStatus = await getSalesStatusByLeadId(lead_id);

    if (existingStatus && existingStatus.length > 0) {
      // Update existing record
      salesStatusRecord = await updateSalesStatus(existingStatus[0].id, {
        status,
        deposit_amount: body.deposit_amount || existingStatus[0].deposit_amount,
        deposit_currency: body.deposit_currency || existingStatus[0].deposit_currency,
        deposit_date: body.deposit_date || existingStatus[0].deposit_date,
        trading_volume: body.trading_volume || existingStatus[0].trading_volume,
        total_trades: body.total_trades || existingStatus[0].total_trades,
        last_trade_date: body.last_trade_date || existingStatus[0].last_trade_date,
        last_contact_at: new Date().toISOString(),
        broker_notes: body.notes || existingStatus[0].broker_notes
      });
    } else {
      // Create new record
      salesStatusRecord = await createSalesStatus({
        lead_id,
        broker_id: body.broker_id, // Should be determined from API key
        status,
        deposit_amount: body.deposit_amount,
        deposit_currency: body.deposit_currency || 'USD',
        deposit_date: body.deposit_date,
        trading_volume: body.trading_volume || 0,
        total_trades: body.total_trades || 0,
        last_trade_date: body.last_trade_date,
        first_contact_at: new Date().toISOString(),
        last_contact_at: new Date().toISOString(),
        contact_attempts: 1,
        broker_notes: body.notes,
        lead_assignment_id: body.assignment_id // If provided
      });
    }

    // Update lead status in signups table
    await updateSignupCRM(lead_id, {
      lead_status: status,
      last_activity_at: new Date().toISOString()
    });

    // Log activity
    await logLeadActivity({
      lead_id,
      activity_type: 'status_changed',
      actor: 'broker_api',
      details: {
        old_status: existingStatus?.[0]?.status,
        new_status: status,
        webhook_id: webhookLog.id
      }
    });

    // Mark webhook as processed
    await createWebhookLog({
      id: webhookLog.id,
      processed: true,
      response_status: 200,
      response_body: { success: true }
    });

    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      sales_status_id: salesStatusRecord.id,
      processing_time_ms: processingTime
    });

  } catch (error: any) {
    console.error('Webhook processing error:', error);

    return NextResponse.json({
      error: error.message || 'Failed to process webhook',
      success: false
    }, { status: 500 });
  }
}

// GET /api/crm/webhook/status - Get webhook documentation
export async function GET(request: NextRequest) {
  return NextResponse.json({
    endpoint: '/api/crm/webhook/status',
    method: 'POST',
    description: 'Receives sales status updates from broker systems',
    authentication: 'Include broker_api_key in the request body',
    payload: {
      broker_api_key: 'string (required)',
      lead_id: 'uuid (required if no external_lead_id)',
      external_lead_id: 'string (required if no lead_id)',
      status: 'string (required) - one of: new, contacted, interested, demo_scheduled, demo_completed, application_submitted, kyc_pending, kyc_approved, kyc_rejected, deposit_made, active_trader, inactive, lost, blocked',
      deposit_amount: 'number (optional)',
      deposit_currency: 'string (optional, default: USD)',
      deposit_date: 'ISO 8601 datetime (optional)',
      trading_volume: 'number (optional)',
      total_trades: 'number (optional)',
      last_trade_date: 'ISO 8601 datetime (optional)',
      notes: 'string (optional)'
    },
    example: {
      broker_api_key: 'your_secret_key_here',
      lead_id: '123e4567-e89b-12d3-a456-426614174000',
      status: 'deposit_made',
      deposit_amount: 1000,
      deposit_currency: 'USD',
      deposit_date: '2025-01-15T10:30:00Z',
      notes: 'Customer deposited and is ready to trade'
    }
  });
}
