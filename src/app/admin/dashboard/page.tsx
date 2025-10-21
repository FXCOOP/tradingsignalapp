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
  const [activeTab, setActiveTab] = useState<'overview' | 'conversions' | 'activity' | 'users'>('overview')
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'all'>('week')

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
          {(['overview', 'conversions', 'activity', 'users'] as const).map((tab) => (
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
      </div>
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
