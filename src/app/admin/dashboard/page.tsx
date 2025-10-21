'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<any>(null)
  const [conversions, setConversions] = useState<any[]>([])
  const [activityLog, setActivityLog] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'conversions' | 'activity' | 'users' | 'emails' | 'analytics'>('overview')
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'all'>('week')
  const [showReportIssue, setShowReportIssue] = useState(false)
  const [issueDescription, setIssueDescription] = useState('')
  const [issueSubmitting, setIssueSubmitting] = useState(false)
  const [issueSubmitted, setIssueSubmitted] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)

  // Authentication check
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admin_authenticated')
    const loginTime = sessionStorage.getItem('admin_login_time')

    if (!isAuthenticated) {
      router.push('/admin')
      return
    }

    // Check if session is older than 24 hours
    if (loginTime) {
      const loginDate = new Date(loginTime)
      const now = new Date()
      const hoursSinceLogin = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)

      if (hoursSinceLogin > 24) {
        sessionStorage.removeItem('admin_authenticated')
        sessionStorage.removeItem('admin_login_time')
        router.push('/admin')
        return
      }
    }
  }, [router])

  useEffect(() => {
    loadDashboardData()
    // Refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000)
    return () => clearInterval(interval)
  }, [timeRange])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // Calculate date range
      const now = new Date()
      let startDate = new Date(0) // Beginning of time
      switch (timeRange) {
        case 'today':
          startDate = new Date(now.setHours(0, 0, 0, 0))
          break
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
      }

      // Fetch conversions
      const { data: conversionsData } = await supabase
        .from('exness_conversions')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(100)

      setConversions(conversionsData || [])

      // Fetch activity log
      const { data: activityData } = await supabase
        .from('activity_log')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(100)

      setActivityLog(activityData || [])

      // Fetch users
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      setUsers(usersData || [])

      // Calculate stats
      const totalUsers = usersData?.length || 0
      const premiumUsers = usersData?.filter((u: any) => u.has_broker_account).length || 0
      const totalConversions = conversionsData?.length || 0
      const totalRewards = conversionsData?.reduce((sum: number, c: any) => sum + (c.reward_amount || 0), 0) || 0
      const totalDeposits = conversionsData?.filter((c: any) => c.event_type === 'AGGREGATED_DEPOSIT').length || 0
      const registrations = conversionsData?.filter((c: any) => c.event_type === 'REGISTRATION').length || 0
      const qualifications = conversionsData?.filter((c: any) => c.event_type === 'QUALIFICATION').length || 0
      const kycPassed = conversionsData?.filter((c: any) => c.event_type === 'IS_KYC_PASSED').length || 0

      setStats({
        totalUsers,
        premiumUsers,
        freeUsers: totalUsers - premiumUsers,
        conversionRate: totalUsers > 0 ? ((premiumUsers / totalUsers) * 100).toFixed(1) : '0.0',
        totalConversions,
        totalRewards: totalRewards.toFixed(2),
        registrations,
        qualifications,
        totalDeposits,
        kycPassed,
        avgRewardPerConversion: totalConversions > 0 ? (totalRewards / totalConversions).toFixed(2) : '0.00'
      })

    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadAnalyticsData = async () => {
    setAnalyticsLoading(true)
    try {
      const response = await fetch('/api/analytics/google')
      const result = await response.json()

      if (result.success) {
        setAnalyticsData(result.data)
      } else {
        console.error('Analytics error:', result.error)
        setAnalyticsData({ error: result.message || 'Failed to load analytics' })
      }
    } catch (error) {
      console.error('Failed to load analytics:', error)
      setAnalyticsData({ error: 'Failed to connect to Analytics API' })
    } finally {
      setAnalyticsLoading(false)
    }
  }

  // Load analytics when tab is switched to analytics
  useEffect(() => {
    if (activeTab === 'analytics' && !analyticsData) {
      loadAnalyticsData()
    }
  }, [activeTab])

  const handleReportIssue = async () => {
    if (!issueDescription.trim()) {
      alert('Please describe the issue')
      return
    }

    setIssueSubmitting(true)

    try {
      // Save issue to activity log
      await supabase.from('activity_log').insert({
        user_id: 'admin',
        action: 'ADMIN_ISSUE_REPORTED',
        details: {
          description: issueDescription,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent
        }
      })

      setIssueSubmitted(true)
      setIssueDescription('')

      setTimeout(() => {
        setShowReportIssue(false)
        setIssueSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error('Error reporting issue:', error)
      alert('Failed to submit issue. Please try again.')
    } finally {
      setIssueSubmitting(false)
    }
  }

  if (loading && !stats) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '24px' }}>Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '32px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TradeFlow Admin Dashboard
            </h1>
            <p style={{ margin: '8px 0 0 0', color: '#64748b' }}>
              Real-time analytics and conversion tracking
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => setShowReportIssue(true)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: '2px solid #f59e0b',
                background: 'white',
                color: '#f59e0b',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f59e0b'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.color = '#f59e0b'
              }}
            >
              Report Issue
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('admin_authenticated')
                sessionStorage.removeItem('admin_login_time')
                router.push('/admin')
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: '2px solid #dc2626',
                background: 'white',
                color: '#dc2626',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#dc2626'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.color = '#dc2626'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
            {(['today', 'week', 'month', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: timeRange === range ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f1f5f9',
                  color: timeRange === range ? 'white' : '#64748b',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {range}
              </button>
            ))}

            <button
              onClick={loadDashboardData}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: '#10b981',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🔄 Refresh
            </button>
          </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          subtitle={`${stats?.premiumUsers} premium, ${stats?.freeUsers} free`}
          icon="👥"
          color="#3b82f6"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats?.conversionRate}%`}
          subtitle={`${stats?.premiumUsers} / ${stats?.totalUsers} users`}
          icon="📊"
          color="#10b981"
        />
        <StatCard
          title="Total Rewards"
          value={`$${stats?.totalRewards}`}
          subtitle={`Avg $${stats?.avgRewardPerConversion} per conversion`}
          icon="💰"
          color="#f59e0b"
        />
        <StatCard
          title="Conversions"
          value={stats?.totalConversions || 0}
          subtitle={`${stats?.registrations} registrations, ${stats?.qualifications} qualified`}
          icon="✅"
          color="#8b5cf6"
        />
        <StatCard
          title="Deposits"
          value={stats?.totalDeposits || 0}
          subtitle="Total deposit events"
          icon="🏦"
          color="#06b6d4"
        />
        <StatCard
          title="KYC Passed"
          value={stats?.kycPassed || 0}
          subtitle="Verified users"
          icon="🆔"
          color="#ec4899"
        />
      </div>

      {/* Tabs */}
      <div style={{
        background: 'white',
        borderRadius: '16px 16px 0 0',
        padding: '20px 20px 0 20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #f1f5f9' }}>
          {(['overview', 'conversions', 'activity', 'users', 'emails', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                border: 'none',
                background: 'transparent',
                color: activeTab === tab ? '#667eea' : '#64748b',
                fontWeight: '600',
                cursor: 'pointer',
                borderBottom: activeTab === tab ? '2px solid #667eea' : '2px solid transparent',
                marginBottom: '-2px',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{
        background: 'white',
        borderRadius: '0 0 16px 16px',
        padding: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        minHeight: '400px'
      }}>
        {activeTab === 'overview' && <OverviewTab stats={stats} conversions={conversions} />}
        {activeTab === 'conversions' && <ConversionsTab conversions={conversions} />}
        {activeTab === 'activity' && <ActivityTab activityLog={activityLog} />}
        {activeTab === 'users' && <UsersTab users={users} />}
        {activeTab === 'emails' && <EmailSignupsTab users={users} />}
        {activeTab === 'analytics' && <AnalyticsTab data={analyticsData} loading={analyticsLoading} onRefresh={() => loadAnalyticsData()} />}
      </div>

      {/* Report Issue Modal */}
      {showReportIssue && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <h2 style={{ marginTop: 0, color: '#1e293b' }}>Report an Issue</h2>

            {issueSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <p style={{ color: '#10b981', fontWeight: '600', fontSize: '18px' }}>
                  Issue reported successfully!
                </p>
              </div>
            ) : (
              <>
                <textarea
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Describe the issue you're experiencing..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    marginBottom: '16px',
                    boxSizing: 'border-box'
                  }}
                />

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      setShowReportIssue(false)
                      setIssueDescription('')
                    }}
                    disabled={issueSubmitting}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      background: 'white',
                      color: '#64748b',
                      fontWeight: '600',
                      cursor: issueSubmitting ? 'not-allowed' : 'pointer',
                      opacity: issueSubmitting ? 0.5 : 1
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReportIssue}
                    disabled={issueSubmitting}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '12px',
                      border: 'none',
                      background: issueSubmitting ? '#94a3b8' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontWeight: '600',
                      cursor: issueSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {issueSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ title, value, subtitle, icon, color }: any) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>{title}</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b' }}>{value}</div>
        </div>
        <div style={{ fontSize: '32px' }}>{icon}</div>
      </div>
      <div style={{ color: '#94a3b8', fontSize: '12px' }}>{subtitle}</div>
    </div>
  )
}

function OverviewTab({ stats, conversions }: any) {
  const recentConversions = conversions.slice(0, 5)

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Recent Activity</h2>

      {recentConversions.length === 0 ? (
        <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>No conversions yet</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Event</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>User ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Amount</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentConversions.map((conv: any) => (
                <tr key={conv.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: getEventColor(conv.event_type),
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {conv.event_type}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '12px' }}>
                    {conv.user_id?.substring(0, 8)}...
                  </td>
                  <td style={{ padding: '12px', fontWeight: '600' }}>
                    ${(conv.reward_amount || conv.ftd_amount || 0).toFixed(2)}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {conv.processed ? '✅ Processed' : '⏳ Pending'}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', fontSize: '14px' }}>
                    {new Date(conv.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ConversionsTab({ conversions }: any) {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>All Conversions ({conversions.length})</h2>

      {conversions.length === 0 ? (
        <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>No conversions yet</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Event</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>User</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Exness ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>FTD Amount</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Reward</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Approved</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {conversions.map((conv: any) => (
                <tr key={conv.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '11px', color: '#94a3b8' }}>
                    {conv.id.substring(0, 8)}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: getEventColor(conv.event_type),
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {conv.event_type}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '11px' }}>
                    {conv.user_id ? `${conv.user_id.substring(0, 8)}...` : '-'}
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '11px' }}>
                    {conv.exness_user_id || '-'}
                  </td>
                  <td style={{ padding: '12px', fontWeight: '600' }}>
                    ${(conv.ftd_amount || 0).toFixed(2)}
                  </td>
                  <td style={{ padding: '12px', fontWeight: '600', color: '#10b981' }}>
                    ${(conv.reward_amount || 0).toFixed(2)}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {conv.user_approved ? '✅ Yes' : '-'}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>
                    {new Date(conv.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ActivityTab({ activityLog }: any) {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Activity Log ({activityLog.length})</h2>

      {activityLog.length === 0 ? (
        <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>No activity yet</p>
      ) : (
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {activityLog.map((activity: any, index: number) => (
            <div
              key={activity.id || index}
              style={{
                padding: '16px',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {activity.action}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                  User: {activity.user_id?.substring(0, 8)}...
                </div>
                {activity.details && (
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                    {JSON.stringify(activity.details)}
                  </div>
                )}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', textAlign: 'right' }}>
                {new Date(activity.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function UsersTab({ users }: any) {
  const premiumUsers = users.filter((u: any) => u.has_broker_account)
  const freeUsers = users.filter((u: any) => !u.has_broker_account)

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Users ({users.length})</h2>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <div style={{ padding: '12px 24px', background: '#10b981', color: 'white', borderRadius: '8px', fontWeight: '600' }}>
          Premium: {premiumUsers.length}
        </div>
        <div style={{ padding: '12px 24px', background: '#64748b', color: 'white', borderRadius: '8px', fontWeight: '600' }}>
          Free: {freeUsers.length}
        </div>
      </div>

      {users.length === 0 ? (
        <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>No users yet</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Broker</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Registered</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}>{user.full_name || '-'}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: user.has_broker_account ? '#10b981' : '#64748b',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {user.has_broker_account ? 'Premium' : 'Free'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>{user.broker_name || '-'}</td>
                  <td style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function EmailSignupsTab({ users }: any) {
  // Sort by most recent first
  const sortedUsers = [...users].sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Email Signups ({users.length})</h2>

      <div style={{ marginBottom: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Total Signups</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{users.length}</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Premium Conversions</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
              {users.filter((u: any) => u.has_broker_account).length}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Conversion Rate</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
              {users.length > 0
                ? ((users.filter((u: any) => u.has_broker_account).length / users.length) * 100).toFixed(1)
                : '0'
              }%
            </div>
          </div>
        </div>
      </div>

      {users.length === 0 ? (
        <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>No email signups yet</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Broker</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Signup Date</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Upgrade Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user: any) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}>{user.full_name || '-'}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: user.has_broker_account ? '#10b981' : '#64748b',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {user.has_broker_account ? '✅ Premium' : '🆓 Free'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    {user.broker_name ? (
                      <span style={{ padding: '4px 8px', background: '#dbeafe', color: '#1e40af', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                        {user.broker_name}
                      </span>
                    ) : '-'}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>
                    {new Date(user.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>
                    {user.broker_verified_at
                      ? new Date(user.broker_verified_at).toLocaleString()
                      : '-'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function AnalyticsTab({ data, loading, onRefresh }: any) {
  if (loading && !data) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Loading Google Analytics data...</div>
      </div>
    )
  }

  if (data?.error) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ color: '#dc2626', marginBottom: '12px' }}>Google Analytics Not Configured</h2>
        <p style={{ color: '#64748b', marginBottom: '20px', maxWidth: '600px', margin: '0 auto' }}>
          {data.error}
        </p>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '20px' }}>
          See <strong>GOOGLE_ANALYTICS_SETUP.md</strong> for setup instructions
        </p>
      </div>
    )
  }

  if (!data) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
        Click refresh to load analytics data
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0 }}>Google Analytics</h2>
        <button
          onClick={onRefresh}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: '#10b981',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Real-time Stats */}
      <div style={{ marginBottom: '24px', padding: '20px', background: '#f0fdf4', borderRadius: '12px', border: '2px solid #10b981' }}>
        <div style={{ fontSize: '14px', color: '#064e3b', fontWeight: '600', marginBottom: '8px' }}>REAL-TIME</div>
        <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981' }}>
          {data.realtime?.activeUsers || 0} active users
        </div>
        <div style={{ fontSize: '12px', color: '#064e3b', marginTop: '4px' }}>Users currently on your site</div>
      </div>

      {/* Key Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ padding: '20px', background: 'white', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '8px' }}>USERS (7 DAYS)</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>{data.last7Days?.users?.toLocaleString() || 0}</div>
        </div>
        <div style={{ padding: '20px', background: 'white', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '8px' }}>PAGE VIEWS (7 DAYS)</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>{data.last7Days?.pageViews?.toLocaleString() || 0}</div>
        </div>
        <div style={{ padding: '20px', background: 'white', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '8px' }}>SESSIONS (7 DAYS)</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>{data.last7Days?.sessions?.toLocaleString() || 0}</div>
        </div>
        <div style={{ padding: '20px', background: 'white', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '8px' }}>BOUNCE RATE</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>{((data.last7Days?.bounceRate || 0) * 100).toFixed(1)}%</div>
        </div>
      </div>

      {/* Top Pages */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Top Pages (Last 7 Days)</h3>
        <div style={{ background: 'white', borderRadius: '12px', border: '2px solid #e2e8f0', overflow: 'hidden' }}>
          {data.topPages && data.topPages.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Page Title</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Path</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#64748b', fontWeight: '600' }}>Views</th>
                </tr>
              </thead>
              <tbody>
                {data.topPages.map((page: any, idx: number) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{page.title}</td>
                    <td style={{ padding: '12px', color: '#64748b', fontSize: '14px', fontFamily: 'monospace' }}>{page.path}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: '700' }}>{page.views.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No page data available</div>
          )}
        </div>
      </div>

      {/* Traffic Sources & Devices */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Traffic Sources */}
        <div>
          <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Traffic Sources</h3>
          <div style={{ background: 'white', borderRadius: '12px', border: '2px solid #e2e8f0', padding: '16px' }}>
            {data.trafficSources && data.trafficSources.length > 0 ? (
              data.trafficSources.map((source: any, idx: number) => (
                <div key={idx} style={{ padding: '12px 0', borderBottom: idx < data.trafficSources.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>{source.source}</span>
                    <span style={{ fontWeight: '700', color: '#667eea' }}>{source.sessions.toLocaleString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No source data</div>
            )}
          </div>
        </div>

        {/* Devices */}
        <div>
          <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Device Breakdown</h3>
          <div style={{ background: 'white', borderRadius: '12px', border: '2px solid #e2e8f0', padding: '16px' }}>
            {data.devices && data.devices.length > 0 ? (
              data.devices.map((device: any, idx: number) => (
                <div key={idx} style={{ padding: '12px 0', borderBottom: idx < data.devices.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>
                      {device.device === 'desktop' ? '💻 Desktop' : device.device === 'mobile' ? '📱 Mobile' : '📟 Tablet'}
                    </span>
                    <span style={{ fontWeight: '700', color: '#764ba2' }}>{device.users.toLocaleString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No device data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function getEventColor(eventType: string) {
  switch (eventType) {
    case 'REGISTRATION': return '#3b82f6'
    case 'QUALIFICATION': return '#8b5cf6'
    case 'AGGREGATED_DEPOSIT': return '#10b981'
    case 'REWARD_PROCESSING': return '#f59e0b'
    case 'IS_KYC_PASSED': return '#ec4899'
    default: return '#64748b'
  }
}
