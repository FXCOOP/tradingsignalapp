import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const analyticsDataClient = google.analyticsdata('v1beta')

/**
 * Google Analytics Data API Integration
 *
 * Fetches analytics data for the admin dashboard
 * Requires service account credentials in environment variables
 */
export async function GET(request: NextRequest) {
  try {
    // Check if credentials are configured
    if (!process.env.GA_PROPERTY_ID || !process.env.GA_SERVICE_ACCOUNT_EMAIL || !process.env.GA_PRIVATE_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Google Analytics not configured',
        message: 'Please set GA_PROPERTY_ID, GA_SERVICE_ACCOUNT_EMAIL, and GA_PRIVATE_KEY environment variables'
      }, { status: 503 })
    }

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GA_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    })

    const authClient = await auth.getClient()
    google.options({ auth: authClient as any })

    const propertyId = `properties/${process.env.GA_PROPERTY_ID}`

    // Fetch multiple reports in parallel
    const [
      realtimeReport,
      last7DaysReport,
      last30DaysReport,
      topPagesReport,
      trafficSourcesReport,
      deviceReport,
    ] = await Promise.all([
      // Realtime users
      analyticsDataClient.properties.runRealtimeReport({
        property: propertyId,
        requestBody: {
          metrics: [{ name: 'activeUsers' }],
        },
      }),

      // Last 7 days metrics
      analyticsDataClient.properties.runReport({
        property: propertyId,
        requestBody: {
          dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
          metrics: [
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
            { name: 'sessions' },
            { name: 'averageSessionDuration' },
            { name: 'bounceRate' },
          ],
        },
      }),

      // Last 30 days metrics
      analyticsDataClient.properties.runReport({
        property: propertyId,
        requestBody: {
          dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
          metrics: [
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
            { name: 'sessions' },
          ],
        },
      }),

      // Top pages
      analyticsDataClient.properties.runReport({
        property: propertyId,
        requestBody: {
          dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
          dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
          metrics: [{ name: 'screenPageViews' }],
          limit: '10',
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        },
      }),

      // Traffic sources
      analyticsDataClient.properties.runReport({
        property: propertyId,
        requestBody: {
          dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
          dimensions: [{ name: 'sessionSource' }],
          metrics: [{ name: 'sessions' }],
          limit: '10',
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        },
      }),

      // Device breakdown
      analyticsDataClient.properties.runReport({
        property: propertyId,
        requestBody: {
          dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
          dimensions: [{ name: 'deviceCategory' }],
          metrics: [{ name: 'activeUsers' }],
        },
      }),
    ])

    // Parse and format the data
    const realtimeUsers = parseInt(
      realtimeReport.data.rows?.[0]?.metricValues?.[0]?.value || '0'
    )

    const last7Days = {
      users: parseInt(last7DaysReport.data.rows?.[0]?.metricValues?.[0]?.value || '0'),
      pageViews: parseInt(last7DaysReport.data.rows?.[0]?.metricValues?.[1]?.value || '0'),
      sessions: parseInt(last7DaysReport.data.rows?.[0]?.metricValues?.[2]?.value || '0'),
      avgSessionDuration: parseFloat(last7DaysReport.data.rows?.[0]?.metricValues?.[3]?.value || '0'),
      bounceRate: parseFloat(last7DaysReport.data.rows?.[0]?.metricValues?.[4]?.value || '0'),
    }

    const last30Days = {
      users: parseInt(last30DaysReport.data.rows?.[0]?.metricValues?.[0]?.value || '0'),
      pageViews: parseInt(last30DaysReport.data.rows?.[0]?.metricValues?.[1]?.value || '0'),
      sessions: parseInt(last30DaysReport.data.rows?.[0]?.metricValues?.[2]?.value || '0'),
    }

    const topPages = (topPagesReport.data.rows || []).map((row) => ({
      title: row.dimensionValues?.[0]?.value || 'Unknown',
      path: row.dimensionValues?.[1]?.value || '/',
      views: parseInt(row.metricValues?.[0]?.value || '0'),
    }))

    const trafficSources = (trafficSourcesReport.data.rows || []).map((row) => ({
      source: row.dimensionValues?.[0]?.value || 'Direct',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
    }))

    const devices = (deviceReport.data.rows || []).map((row) => ({
      device: row.dimensionValues?.[0]?.value || 'Unknown',
      users: parseInt(row.metricValues?.[0]?.value || '0'),
    }))

    return NextResponse.json({
      success: true,
      data: {
        realtime: {
          activeUsers: realtimeUsers,
        },
        last7Days,
        last30Days,
        topPages,
        trafficSources,
        devices,
      },
      timestamp: new Date().toISOString(),
    })

  } catch (error: any) {
    console.error('❌ Google Analytics API Error:', error)

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch analytics data',
      message: error.message,
      details: error.response?.data || error.toString(),
    }, { status: 500 })
  }
}
