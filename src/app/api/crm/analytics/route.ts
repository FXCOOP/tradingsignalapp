import { NextRequest, NextResponse } from 'next/server';
import {
  getBrokerPerformance,
  getDailyLeadStats,
  getAllSignups,
  getAllBrokers,
  supabaseAdmin
} from '@/lib/supabase';

// GET /api/crm/analytics - Get comprehensive CRM analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    // Fetch basic data
    const [allSignups, allBrokers] = await Promise.all([
      getAllSignups(),
      getAllBrokers()
    ]);

    // Calculate broker performance from signups
    const brokerPerformance = allBrokers.map((broker: any) => {
      const brokerLeads = allSignups.filter((l: any) => l.assigned_broker_id === broker.id);
      const convertedLeads = brokerLeads.filter((l: any) => l.lead_status === 'deposit_made');
      return {
        id: broker.id,
        name: broker.name,
        assigned_leads: brokerLeads.length,
        deposited_leads: convertedLeads.length,
        conversion_rate: brokerLeads.length > 0 ? (convertedLeads.length / brokerLeads.length) * 100 : 0
      };
    });

    // Generate daily stats from signups
    const dailyStats: any[] = [];

    // Calculate overall metrics
    const totalLeads = allSignups.length;
    const assignedLeads = allSignups.filter((l: any) => l.assigned_broker_id).length;
    const convertedLeads = allSignups.filter((l: any) => l.lead_status === 'deposit_made').length;

    // Calculate conversion rate
    const overallConversionRate = assignedLeads > 0
      ? ((convertedLeads / assignedLeads) * 100).toFixed(2)
      : '0.00';

    // Get leads by country
    const leadsByCountry: Record<string, number> = {};
    allSignups.forEach((lead: any) => {
      leadsByCountry[lead.country] = (leadsByCountry[lead.country] || 0) + 1;
    });

    // Get leads by status
    const leadsByStatus: Record<string, number> = {};
    allSignups.forEach((lead: any) => {
      const status = lead.lead_status || 'new';
      leadsByStatus[status] = (leadsByStatus[status] || 0) + 1;
    });

    // Get recent signups (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentSignups = allSignups.filter((l: any) =>
      new Date(l.created_at) >= sevenDaysAgo
    ).length;

    // Calculate growth rate
    const previousPeriodStart = new Date();
    previousPeriodStart.setDate(previousPeriodStart.getDate() - 14);
    const previousPeriodEnd = sevenDaysAgo;
    const previousPeriodSignups = allSignups.filter((l: any) => {
      const createdAt = new Date(l.created_at);
      return createdAt >= previousPeriodStart && createdAt < previousPeriodEnd;
    }).length;

    const growthRate = previousPeriodSignups > 0
      ? (((recentSignups - previousPeriodSignups) / previousPeriodSignups) * 100).toFixed(1)
      : '0.0';

    // Top performing brokers
    const topBrokers = brokerPerformance
      .sort((a: any, b: any) => b.conversion_rate - a.conversion_rate)
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      analytics: {
        overview: {
          total_leads: totalLeads,
          assigned_leads: assignedLeads,
          unassigned_leads: totalLeads - assignedLeads,
          converted_leads: convertedLeads,
          conversion_rate: overallConversionRate,
          recent_signups: recentSignups,
          growth_rate: growthRate,
          active_brokers: allBrokers.filter((b: any) => b.status === 'active').length,
          total_brokers: allBrokers.length
        },
        leads_by_country: leadsByCountry,
        leads_by_status: leadsByStatus,
        broker_performance: brokerPerformance,
        top_brokers: topBrokers,
        daily_stats: dailyStats
      }
    });

  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
