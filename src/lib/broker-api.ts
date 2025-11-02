/**
 * Broker API Integration Helper
 *
 * This module handles sending leads to broker APIs
 * and managing delivery status
 */

import {
  getBrokerById,
  updateLeadAssignment,
  updateBroker,
  logLeadActivity,
  type Broker,
  type LeadAssignment
} from './supabase';

interface LeadData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  country_code: string;
  phone_number: string;
  country: string;
  ip_address?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

interface BrokerAPIResponse {
  success: boolean;
  lead_id?: string; // Broker's internal lead ID
  message?: string;
  error?: string;
}

/**
 * Send lead to broker's API endpoint
 */
export async function sendLeadToBroker(
  assignment: LeadAssignment,
  leadData: LeadData
): Promise<BrokerAPIResponse> {
  try {
    // Get broker details
    const broker = await getBrokerById(assignment.broker_id);
    if (!broker) {
      throw new Error('Broker not found');
    }

    // Check if broker has API configured
    if (!broker.api_endpoint) {
      console.log('Broker has no API endpoint configured, skipping');
      return { success: true, message: 'No API configured' };
    }

    // Prepare lead payload
    const payload = formatLeadPayload(leadData, broker);

    // Make API request
    const startTime = Date.now();
    const response = await fetch(broker.api_endpoint, {
      method: broker.api_method || 'POST',
      headers: buildHeaders(broker),
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    const responseTime = Date.now() - startTime;
    const responseData = await response.json();

    // Update assignment with result
    if (response.ok) {
      await updateLeadAssignment(assignment.id, {
        delivery_status: 'sent',
        delivered_at: new Date().toISOString(),
        api_response: responseData,
        external_lead_id: responseData.lead_id || responseData.id,
      });

      // Update broker stats
      await updateBroker(broker.id, {
        leads_received_today: broker.leads_received_today + 1,
        leads_received_this_hour: broker.leads_received_this_hour + 1,
        last_lead_sent_at: new Date().toISOString(),
        average_response_time_minutes: Math.round(responseTime / 60000),
      });

      // Log activity
      await logLeadActivity({
        lead_id: leadData.id,
        activity_type: 'sent_to_broker',
        actor: 'system',
        details: {
          broker_id: broker.id,
          response_time_ms: responseTime,
          external_lead_id: responseData.lead_id,
        },
      });

      return {
        success: true,
        lead_id: responseData.lead_id,
        message: 'Lead sent successfully',
      };
    } else {
      // API returned error
      const errorMessage = responseData.error || responseData.message || 'API request failed';

      await updateLeadAssignment(assignment.id, {
        delivery_status: 'failed',
        delivery_attempts: assignment.delivery_attempts + 1,
        last_attempt_at: new Date().toISOString(),
        error_message: errorMessage,
        api_response: responseData,
      });

      await logLeadActivity({
        lead_id: leadData.id,
        activity_type: 'broker_send_failed',
        actor: 'system',
        details: {
          broker_id: broker.id,
          error: errorMessage,
          status_code: response.status,
        },
      });

      return {
        success: false,
        error: errorMessage,
      };
    }
  } catch (error: any) {
    console.error('Error sending lead to broker:', error);

    // Update assignment with error
    await updateLeadAssignment(assignment.id, {
      delivery_status: 'failed',
      delivery_attempts: assignment.delivery_attempts + 1,
      last_attempt_at: new Date().toISOString(),
      error_message: error.message,
    });

    await logLeadActivity({
      lead_id: leadData.id,
      activity_type: 'broker_send_failed',
      actor: 'system',
      details: {
        broker_id: assignment.broker_id,
        error: error.message,
      },
    });

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Format lead data for broker API
 * Customize this based on broker requirements
 */
function formatLeadPayload(lead: LeadData, broker: Broker): any {
  return {
    // Standard fields
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    phone: `${lead.country_code}${lead.phone_number}`,
    country: lead.country,

    // Optional fields
    ...(lead.ip_address && { ip_address: lead.ip_address }),

    // UTM parameters
    ...(lead.utm_source && { utm_source: lead.utm_source }),
    ...(lead.utm_medium && { utm_medium: lead.utm_medium }),
    ...(lead.utm_campaign && { utm_campaign: lead.utm_campaign }),

    // Metadata
    source: 'gcc_signal_pro',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Build HTTP headers for broker API request
 */
function buildHeaders(broker: Broker): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'User-Agent': 'GCC-Signal-Pro-CRM/1.0',
  };

  // Add API key authentication
  if (broker.api_key) {
    headers['Authorization'] = `Bearer ${broker.api_key}`;
  }

  // Add custom headers from broker config
  if (broker.api_headers) {
    Object.entries(broker.api_headers).forEach(([key, value]) => {
      headers[key] = value as string;
    });
  }

  return headers;
}

/**
 * Retry failed lead deliveries
 * Call this from a cron job to retry failed assignments
 */
export async function retryFailedDeliveries(maxAttempts = 3) {
  // This would be implemented to fetch failed assignments
  // and retry sending them to brokers

  // Example:
  // const failedAssignments = await getFailedAssignments(maxAttempts);
  // for (const assignment of failedAssignments) {
  //   const lead = await getLeadById(assignment.lead_id);
  //   await sendLeadToBroker(assignment, lead);
  // }

  console.log('Retry functionality to be implemented');
}

/**
 * Validate broker API endpoint
 * Test connection before activating broker
 */
export async function validateBrokerAPI(broker: Broker): Promise<boolean> {
  try {
    if (!broker.api_endpoint) {
      return false;
    }

    // Try to ping the endpoint
    const response = await fetch(broker.api_endpoint, {
      method: 'HEAD',
      headers: buildHeaders(broker),
      signal: AbortSignal.timeout(10000),
    });

    return response.ok || response.status === 405; // 405 = Method not allowed but endpoint exists
  } catch (error) {
    console.error('Broker API validation failed:', error);
    return false;
  }
}

/**
 * Check if broker is currently accepting leads
 */
export function isBrokerAvailable(broker: Broker): {
  available: boolean;
  reason?: string;
} {
  // Check status
  if (broker.status !== 'active') {
    return { available: false, reason: 'Broker is not active' };
  }

  // Check daily limit
  if (broker.leads_received_today >= broker.max_leads_per_day) {
    return { available: false, reason: 'Daily lead limit reached' };
  }

  // Check hourly limit
  if (broker.leads_received_this_hour >= broker.max_leads_per_hour) {
    return { available: false, reason: 'Hourly lead limit reached' };
  }

  // Check working hours (UTC)
  const now = new Date();
  const currentHour = now.getUTCHours();
  const startHour = parseInt(broker.working_hours_start.split(':')[0]);
  const endHour = parseInt(broker.working_hours_end.split(':')[0]);

  if (currentHour < startHour || currentHour >= endHour) {
    return { available: false, reason: 'Outside working hours' };
  }

  // Check working days (1 = Monday, 7 = Sunday)
  const currentDay = now.getUTCDay() || 7;
  if (!broker.working_days.includes(currentDay)) {
    return { available: false, reason: 'Not a working day' };
  }

  return { available: true };
}

/**
 * Get broker load score (lower is better)
 * Used for load balancing
 */
export function getBrokerLoadScore(broker: Broker): number {
  const dailyUtilization = broker.leads_received_today / broker.max_leads_per_day;
  const hourlyUtilization = broker.leads_received_this_hour / broker.max_leads_per_hour;

  // Weight: 70% daily, 30% hourly
  return (dailyUtilization * 0.7) + (hourlyUtilization * 0.3);
}
