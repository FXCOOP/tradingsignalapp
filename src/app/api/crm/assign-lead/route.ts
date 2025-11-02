import { NextRequest, NextResponse } from 'next/server';
import {
  createLeadAssignment,
  updateSignupCRM,
  getActiveBrokers,
  updateBroker,
  logLeadActivity,
  getAllSignups
} from '@/lib/supabase';

// POST /api/crm/assign-lead - Assign a lead to a broker
export async function POST(request: NextRequest) {
  try {
    const { leadId, brokerId, method = 'manual' } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    let selectedBrokerId = brokerId;

    // If no broker specified, use auto-assignment logic
    if (!selectedBrokerId) {
      const broker = await findBestBroker(leadId);
      if (!broker) {
        return NextResponse.json(
          { error: 'No available broker found for this lead' },
          { status: 404 }
        );
      }
      selectedBrokerId = broker.id;
    }

    // Create the assignment
    const assignment = await createLeadAssignment({
      lead_id: leadId,
      broker_id: selectedBrokerId,
      assignment_method: method,
      delivery_status: 'pending',
      priority: 0
    });

    // Update the lead's status
    await updateSignupCRM(leadId, {
      lead_status: 'assigned',
      assigned_broker_id: selectedBrokerId,
      last_activity_at: new Date().toISOString()
    });

    // Log activity
    await logLeadActivity({
      lead_id: leadId,
      activity_type: 'assigned',
      actor: 'system',
      details: {
        broker_id: selectedBrokerId,
        method
      }
    });

    // Try to send the lead to the broker's API
    try {
      await sendLeadToBroker(assignment);
    } catch (error) {
      console.error('Failed to send lead to broker:', error);
      // Don't fail the request, just log the error
    }

    return NextResponse.json({
      success: true,
      assignment
    });

  } catch (error: any) {
    console.error('Error assigning lead:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to assign lead' },
      { status: 500 }
    );
  }
}

// Helper function to find the best broker for a lead
async function findBestBroker(leadId: string) {
  // Get the lead details
  const leads = await getAllSignups();
  const lead = leads?.find((l: any) => l.id === leadId);

  if (!lead) return null;

  // Get active brokers
  const brokers = await getActiveBrokers();

  // Filter brokers based on:
  // 1. Country codes they accept
  // 2. Not exceeding daily/hourly limits
  // 3. Currently in working hours
  const availableBrokers = brokers.filter((broker) => {
    // Check country
    if (broker.country_codes.length > 0 && !broker.country_codes.includes(lead.country)) {
      return false;
    }

    // Check daily limit
    if (broker.leads_received_today >= broker.max_leads_per_day) {
      return false;
    }

    // Check hourly limit
    if (broker.leads_received_this_hour >= broker.max_leads_per_hour) {
      return false;
    }

    // Check working hours (simplified - assumes UTC)
    const now = new Date();
    const currentHour = now.getUTCHours();
    const startHour = parseInt(broker.working_hours_start.split(':')[0]);
    const endHour = parseInt(broker.working_hours_end.split(':')[0]);

    if (currentHour < startHour || currentHour >= endHour) {
      return false;
    }

    // Check working days (1 = Monday, 7 = Sunday)
    const currentDay = now.getUTCDay() || 7; // Convert Sunday from 0 to 7
    if (!broker.working_days.includes(currentDay)) {
      return false;
    }

    return true;
  });

  if (availableBrokers.length === 0) {
    return null;
  }

  // Sort by conversion rate (best performing broker first)
  availableBrokers.sort((a, b) => b.conversion_rate - a.conversion_rate);

  return availableBrokers[0];
}

// Helper function to send lead to broker's API
async function sendLeadToBroker(assignment: any) {
  // TODO: Implement actual API call to broker
  // This would use the broker's api_endpoint, api_key, etc.

  // Example structure:
  // const broker = await getBrokerById(assignment.broker_id);
  // const lead = await getSignupById(assignment.lead_id);
  //
  // const response = await fetch(broker.api_endpoint, {
  //   method: broker.api_method,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${broker.api_key}`,
  //     ...broker.api_headers
  //   },
  //   body: JSON.stringify({
  //     first_name: lead.first_name,
  //     last_name: lead.last_name,
  //     email: lead.email,
  //     phone: `${lead.country_code}${lead.phone_number}`,
  //     country: lead.country
  //   })
  // });

  console.log('Would send lead to broker:', assignment.broker_id);
}
