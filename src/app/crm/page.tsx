'use client';

import { useState, useEffect } from 'react';
import { BrokerManagement } from '@/components/BrokerManagement';
import './crm.css';

interface Analytics {
  overview: {
    total_leads: number;
    assigned_leads: number;
    unassigned_leads: number;
    converted_leads: number;
    conversion_rate: string;
    recent_signups: number;
    growth_rate: string;
    active_brokers: number;
    total_brokers: number;
  };
  leads_by_country: Record<string, number>;
  leads_by_status: Record<string, number>;
  broker_performance: any[];
  top_brokers: any[];
  daily_stats: any[];
}

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  country_code: string;
  country: string;
  lead_status: string;
  assigned_broker_id: string | null;
  assigned_broker: string | null;
  broker_status: string | null;
  broker_status_code: number | null;
  ftd_exists: boolean | null;
  tp_account: string | null;
  last_status_check: string | null;
  pushed_to_crm: boolean | null;
  push_status_code: number | null;
  push_response: string | null;
  pushed_at: string | null;
  push_error: string | null;
  created_at: string;
}

interface Broker {
  id: string;
  name: string;
  company_name: string;
  email: string;
  status: string;
  country_codes: string[];
  traffic_percentage?: number;
  traffic_priority?: number;
  max_leads_per_day: number;
  max_leads_per_hour: number;
  max_leads_per_month?: number;
  total_leads_received: number;
  total_leads_converted: number;
  conversion_rate: number;
  api_endpoint?: string;
  auto_push_enabled?: boolean;
  country_distribution?: Record<string, number>;
  min_lead_amount?: number;
  max_lead_amount?: number;
}

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'brokers' | 'analytics'>('dashboard');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showPushDetailsModal, setShowPushDetailsModal] = useState(false);
  const [selectedPushDetails, setSelectedPushDetails] = useState<any>(null);
  const [showBrokerStatusModal, setShowBrokerStatusModal] = useState(false);
  const [selectedBrokerStatus, setSelectedBrokerStatus] = useState<any>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [brokerFilter, setBrokerFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching CRM data...');

      const [analyticsRes, leadsRes, brokersRes] = await Promise.all([
        fetch('/api/crm/analytics'),
        fetch('/api/crm/leads?limit=100'),
        fetch('/api/crm/brokers')
      ]);

      console.log('📊 Analytics response:', analyticsRes.status);
      console.log('👥 Leads response:', leadsRes.status);
      console.log('🏢 Brokers response:', brokersRes.status);

      const analyticsData = await analyticsRes.json();
      const leadsData = await leadsRes.json();
      const brokersData = await brokersRes.json();

      console.log('📊 Analytics data:', analyticsData);
      console.log('👥 Leads data:', leadsData);
      console.log('🏢 Brokers data:', brokersData);

      setAnalytics(analyticsData.analytics);
      setLeads(leadsData.leads || []);
      setBrokers(brokersData.brokers || []);

      // Auto-refresh broker status for Trading CRM leads
      await refreshAllBrokerStatuses(leadsData.leads || []);
    } catch (error) {
      console.error('❌ Failed to fetch data:', error);
      alert('Error loading CRM data. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const refreshAllBrokerStatuses = async (leadsData: Lead[]) => {
    try {
      console.log('🔄 Auto-refreshing ALL broker statuses...');

      // Filter ALL Trading CRM leads (including failed/pending pushes)
      const tradingCRMLeads = leadsData.filter(lead =>
        (lead.assigned_broker?.includes('Trading CRM') ||
         lead.assigned_broker?.includes('AFF 225X') ||
         lead.assigned_broker?.includes('225X'))
      );

      if (tradingCRMLeads.length === 0) {
        console.log('ℹ️ No Trading CRM leads to sync');
        return;
      }

      console.log(`📤 Syncing ${tradingCRMLeads.length} Trading CRM leads (all statuses)...`);

      // Sync in batches of 5 to avoid overloading the API
      const batchSize = 5;
      for (let i = 0; i < tradingCRMLeads.length; i += batchSize) {
        const batch = tradingCRMLeads.slice(i, i + batchSize);

        await Promise.all(batch.map(async (lead) => {
          try {
            console.log(`🔄 Syncing ${lead.email}...`);
            const response = await fetch('/api/trading-crm/sync-status', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ signupId: lead.id })
            });

            const data = await response.json();

            if (data.success) {
              console.log(`✅ Synced ${lead.email}: ${data.status}`);
            } else {
              console.warn(`⚠️ Failed to sync ${lead.email}:`, data.error);
            }
          } catch (error) {
            console.error(`❌ Error syncing ${lead.email}:`, error);
          }
        }));

        // Small delay between batches
        if (i + batchSize < tradingCRMLeads.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      console.log('✅ All broker statuses refreshed!');

      // Refresh the leads to show updated data
      const leadsRes = await fetch('/api/crm/leads?limit=100');
      const updatedLeadsData = await leadsRes.json();
      setLeads(updatedLeadsData.leads || []);

    } catch (error) {
      console.error('❌ Error refreshing broker statuses:', error);
    }
  };

  const assignLeadToBroker = async (leadId: string, brokerId: string) => {
    try {
      const response = await fetch('/api/crm/assign-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, brokerId, method: 'manual' })
      });

      if (response.ok) {
        alert('Lead assigned successfully!');
        fetchData();
        setShowAssignModal(false);
      } else {
        alert('Failed to assign lead');
      }
    } catch (error) {
      console.error('Error assigning lead:', error);
      alert('Error assigning lead');
    }
  };

  const fetchLiveBrokerStatus = async (lead: Lead) => {
    try {
      console.log('🔄 Fetching live broker status for:', lead.id);

      // Set loading state
      setSelectedBrokerStatus({
        lead,
        loading: true,
        status: lead.broker_status,
        statusCode: lead.broker_status_code,
        ftdExists: lead.ftd_exists,
        tpAccount: lead.tp_account,
        lastCheck: lead.last_status_check
      });
      setShowBrokerStatusModal(true);

      // Check which broker this lead is assigned to
      const isTradingCRM = lead.assigned_broker?.includes('Trading CRM') ||
                          lead.assigned_broker?.includes('AFF 225X');
      const isAllCrypto = lead.assigned_broker?.includes('AllCrypto');

      // If not Trading CRM or AllCrypto, show current status only
      if (!isTradingCRM && !isAllCrypto) {
        console.log('ℹ️ Lead assigned to:', lead.assigned_broker, '- Showing current status');
        setSelectedBrokerStatus({
          lead,
          loading: false,
          status: lead.broker_status || 'Not available',
          statusCode: lead.broker_status_code,
          ftdExists: lead.ftd_exists || false,
          tpAccount: lead.tp_account,
          lastCheck: lead.last_status_check,
          liveData: null,
          info: `This lead is assigned to ${lead.assigned_broker || 'external broker'}. Live status sync is only available for Trading CRM and AllCrypto leads.`
        });
        return;
      }

      // Determine which API endpoint to use
      const syncEndpoint = isAllCrypto ? '/api/allcrypto/sync-status' : '/api/trading-crm/sync-status';
      console.log(`🔄 Fetching live status from: ${isAllCrypto ? 'AllCrypto' : 'Trading CRM'}`);

      // Fetch live status from broker API
      const response = await fetch(syncEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signupId: lead.id })
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Live broker status fetched:', data);
        setSelectedBrokerStatus({
          lead: { ...lead, broker_status: data.status, broker_status_code: data.statusCode, ftd_exists: data.ftdExists, tp_account: data.tpAccount },
          loading: false,
          status: data.status,
          statusCode: data.statusCode,
          ftdExists: data.ftdExists,
          tpAccount: data.tpAccount,
          lastCheck: new Date().toISOString(),
          liveData: data
        });

        // Refresh the table to show updated status
        fetchData();
      } else {
        console.error('❌ Failed to fetch broker status:', data.error);
        setSelectedBrokerStatus({
          lead,
          loading: false,
          status: lead.broker_status,
          statusCode: lead.broker_status_code,
          ftdExists: lead.ftd_exists,
          tpAccount: lead.tp_account,
          lastCheck: lead.last_status_check,
          error: data.error || 'Lead not found in Trading CRM'
        });
      }
    } catch (error) {
      console.error('❌ Error fetching broker status:', error);
      setSelectedBrokerStatus({
        lead,
        loading: false,
        status: lead.broker_status,
        statusCode: lead.broker_status_code,
        ftdExists: lead.ftd_exists,
        tpAccount: lead.tp_account,
        lastCheck: lead.last_status_check,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  if (loading) {
    return (
      <div className="crm-loading">
        <div className="spinner"></div>
        <p>Loading CRM Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="crm-container">
      {/* Header */}
      <header className="crm-header">
        <div className="crm-header-content">
          <h1>🎯 Affiliate CRM & Back Office</h1>
          <p>Manage your leads, brokers, and traffic</p>
        </div>
        <button onClick={fetchData} className="btn-refresh">
          🔄 Refresh
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav className="crm-tabs">
        <button
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`tab ${activeTab === 'leads' ? 'active' : ''}`}
          onClick={() => setActiveTab('leads')}
        >
          👥 Leads ({leads.length})
        </button>
        <button
          className={`tab ${activeTab === 'brokers' ? 'active' : ''}`}
          onClick={() => setActiveTab('brokers')}
        >
          🏢 Brokers ({brokers.length})
        </button>
        <button
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
      </nav>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="crm-content">
          {!analytics ? (
            <div className="empty-state">
              <h3>Loading analytics data...</h3>
              <p>If this persists, check browser console (F12) for errors</p>
            </div>
          ) : (
            <>
          <h2>Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <div className="stat-value">{analytics.overview.total_leads}</div>
                <div className="stat-label">Total Leads</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <div className="stat-value">{analytics.overview.assigned_leads}</div>
                <div className="stat-label">Assigned Leads</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <div className="stat-value">{analytics.overview.converted_leads}</div>
                <div className="stat-label">Converted</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-value">{analytics.overview.conversion_rate}%</div>
                <div className="stat-label">Conversion Rate</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <div className="stat-value">{analytics.overview.recent_signups}</div>
                <div className="stat-label">Last 7 Days</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-info">
                <div className="stat-value">{analytics.overview.growth_rate}%</div>
                <div className="stat-label">Growth Rate</div>
              </div>
            </div>
          </div>

          <div className="dashboard-row">
            <div className="dashboard-section">
              <h3>Top Performing Brokers</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Broker</th>
                    <th>Leads</th>
                    <th>Converted</th>
                    <th>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.top_brokers.map((broker: any) => (
                    <tr key={broker.id}>
                      <td>{broker.name}</td>
                      <td>{broker.assigned_leads}</td>
                      <td>{broker.deposited_leads}</td>
                      <td>{broker.conversion_rate?.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="dashboard-section">
              <h3>Leads by Country</h3>
              <div className="country-list">
                {Object.entries(analytics.leads_by_country)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10)
                  .map(([country, count]) => (
                    <div key={country} className="country-item">
                      <span className="country-name">{country}</span>
                      <span className="country-count">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      )}

      {/* Leads Tab */}
      {activeTab === 'leads' && (
        <div className="crm-content">
          <div className="content-header">
            <h2>Lead Management</h2>
            <div className="filters">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="assigned">Assigned</option>
                <option value="contacted">Contacted</option>
                <option value="deposit_made">Deposited</option>
              </select>
              <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
                <option value="">All Countries</option>
                <option value="AE">UAE</option>
                <option value="SA">Saudi Arabia</option>
                <option value="QA">Qatar</option>
              </select>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Status</th>
                <th>Broker</th>
                <th>Push Status</th>
                <th>Broker Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads
                .filter(lead => !statusFilter || lead.lead_status === statusFilter)
                .filter(lead => !countryFilter || lead.country === countryFilter)
                .map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.first_name} {lead.last_name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.country_code}{lead.phone_number}</td>
                    <td>{lead.country}</td>
                    <td>
                      <span className={`status-badge status-${lead.lead_status || 'new'}`}>
                        {lead.lead_status || 'new'}
                      </span>
                    </td>
                    <td>
                      {lead.assigned_broker || lead.assigned_broker_id
                        ? (lead.assigned_broker || brokers.find(b => b.id === lead.assigned_broker_id)?.name || 'Unknown')
                        : 'Unassigned'}
                    </td>
                    <td>
                      {lead.pushed_to_crm === true && lead.push_status_code ? (
                        <div
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                          onClick={() => {
                            try {
                              const details = lead.push_response ? JSON.parse(lead.push_response) : {
                                status: lead.push_status_code,
                                error: lead.push_error,
                                raw: lead.push_response
                              };
                              setSelectedPushDetails({ lead, details });
                              setShowPushDetailsModal(true);
                            } catch (e) {
                              setSelectedPushDetails({
                                lead,
                                details: {
                                  status: lead.push_status_code,
                                  error: lead.push_error,
                                  raw: lead.push_response
                                }
                              });
                              setShowPushDetailsModal(true);
                            }
                          }}
                          title="Click to view full API response"
                        >
                          <span
                            className={`status-badge ${lead.push_status_code === 200 ? 'status-push-success' : 'status-push-failed'}`}
                          >
                            {lead.push_status_code === 200 ? '✅' : '❌'} {lead.push_status_code}
                          </span>
                          {lead.pushed_at && (
                            <span style={{ fontSize: '0.85em', color: '#666' }}>
                              {new Date(lead.pushed_at).toLocaleDateString()}
                            </span>
                          )}
                          <span style={{ fontSize: '0.75em', color: '#666' }}>🔍</span>
                        </div>
                      ) : (
                        <span style={{ color: '#999', fontSize: '0.9em' }}>Not pushed</span>
                      )}
                    </td>
                    <td>
                      {lead.broker_status ? (
                        <div
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                          onClick={() => fetchLiveBrokerStatus(lead)}
                          title="Click to fetch live broker status from Trading CRM"
                        >
                          <span className={`status-badge status-broker-${lead.broker_status_code === 9 || lead.ftd_exists ? 'ftd' : 'active'}`}>
                            {lead.broker_status}
                          </span>
                          {lead.ftd_exists && <span title="First Time Deposit - Converted!">💰</span>}
                          {lead.tp_account && <span title={`Trading Account: ${lead.tp_account}`}>📊</span>}
                          <span style={{ fontSize: '0.75em', color: '#666' }}>🔍</span>
                        </div>
                      ) : (
                        <span
                          style={{ color: '#999', fontSize: '0.9em', cursor: 'pointer' }}
                          onClick={() => fetchLiveBrokerStatus(lead)}
                          title="Click to fetch broker status from Trading CRM"
                        >
                          Not synced 🔍
                        </span>
                      )}
                    </td>
                    <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn-small"
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowAssignModal(true);
                        }}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Brokers Tab */}
      {activeTab === 'brokers' && (
        <div className="crm-content">
          <BrokerManagement brokers={brokers} onRefresh={fetchData} />
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && analytics && (
        <div className="crm-content">
          <h2>Detailed Analytics</h2>
          <div className="analytics-section">
            <h3>Leads by Status</h3>
            <div className="status-breakdown">
              {Object.entries(analytics.leads_by_status).map(([status, count]) => (
                <div key={status} className="status-bar">
                  <span className="status-label">{status}</span>
                  <div className="status-progress">
                    <div
                      className="status-fill"
                      style={{ width: `${(count / analytics.overview.total_leads) * 100}%` }}
                    ></div>
                  </div>
                  <span className="status-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Assign Lead Modal */}
      {showAssignModal && selectedLead && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Assign Lead to Broker</h3>
            <p>
              Lead: {selectedLead.first_name} {selectedLead.last_name} ({selectedLead.country})
            </p>
            <div className="broker-list">
              {brokers
                .filter(b => b.status === 'active')
                .filter(b => b.country_codes.length === 0 || b.country_codes.includes(selectedLead.country))
                .map((broker) => (
                  <div key={broker.id} className="broker-option">
                    <div className="broker-info">
                      <strong>{broker.name}</strong>
                      <small>{broker.company_name}</small>
                      <small>Rate: {broker.conversion_rate.toFixed(1)}%</small>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={() => assignLeadToBroker(selectedLead.id, broker.id)}
                    >
                      Assign
                    </button>
                  </div>
                ))}
            </div>
            <button className="btn-secondary" onClick={() => setShowAssignModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Broker Status Modal */}
      {showBrokerStatusModal && selectedBrokerStatus && (
        <div className="modal-overlay" onClick={() => setShowBrokerStatusModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>🏢 Live Broker Status</h3>
              <button
                onClick={() => setShowBrokerStatusModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            {/* Loading State */}
            {selectedBrokerStatus.loading && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
                <p>Fetching live status from {selectedBrokerStatus.lead?.assigned_broker?.includes('AllCrypto') ? 'AllCrypto' : 'Trading CRM'}...</p>
              </div>
            )}

            {/* Info Message */}
            {!selectedBrokerStatus.loading && selectedBrokerStatus.info && (
              <div style={{
                background: '#d1ecf1',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #bee5eb',
                color: '#0c5460'
              }}>
                <strong>ℹ️ Info:</strong> {selectedBrokerStatus.info}
              </div>
            )}

            {/* Error State */}
            {!selectedBrokerStatus.loading && selectedBrokerStatus.error && !selectedBrokerStatus.info && (
              <div style={{
                background: '#f8d7da',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #f5c6cb',
                color: '#721c24'
              }}>
                <strong>❌ Error:</strong> {selectedBrokerStatus.error}
              </div>
            )}

            {/* Content */}
            {!selectedBrokerStatus.loading && (
              <>
                {/* Lead Info */}
                <div style={{
                  background: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  border: '1px solid #dee2e6'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Lead Information</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
                    <div><strong>Name:</strong> {selectedBrokerStatus.lead.first_name} {selectedBrokerStatus.lead.last_name}</div>
                    <div><strong>Email:</strong> {selectedBrokerStatus.lead.email}</div>
                    <div><strong>Phone:</strong> {selectedBrokerStatus.lead.country_code}{selectedBrokerStatus.lead.phone_number}</div>
                    <div><strong>Country:</strong> {selectedBrokerStatus.lead.country}</div>
                    <div><strong>Broker:</strong> {selectedBrokerStatus.lead.assigned_broker || 'N/A'}</div>
                    <div><strong>Last Check:</strong> {selectedBrokerStatus.lastCheck ? new Date(selectedBrokerStatus.lastCheck).toLocaleString() : 'Never'}</div>
                  </div>
                </div>

                {/* Status Overview */}
                <div style={{
                  background: selectedBrokerStatus.ftdExists ? '#d4edda' : '#fff3cd',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  border: `1px solid ${selectedBrokerStatus.ftdExists ? '#c3e6cb' : '#ffeaa7'}`
                }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
                    {selectedBrokerStatus.ftdExists ? '💰 Converted (FTD)' : '📊 Lead Status'}
                  </h4>
                  <div style={{ fontSize: '14px' }}>
                    <div><strong>Status:</strong> {selectedBrokerStatus.status || 'Unknown'}</div>
                    <div><strong>Status Code:</strong> {selectedBrokerStatus.statusCode || 'N/A'}</div>
                    {selectedBrokerStatus.tpAccount && (
                      <div style={{ marginTop: '5px' }}>
                        <strong>Trading Account:</strong> {selectedBrokerStatus.tpAccount}
                      </div>
                    )}
                    {selectedBrokerStatus.ftdExists && (
                      <div style={{ marginTop: '10px', padding: '10px', background: '#28a745', color: 'white', borderRadius: '6px', fontWeight: 'bold' }}>
                        🎉 FIRST TIME DEPOSIT CONFIRMED!
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Data Response */}
                {selectedBrokerStatus.liveData && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Trading CRM Response</h4>
                    <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
                      <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '6px' }}>
                        <strong>Lead ID:</strong> {selectedBrokerStatus.liveData.leadId || 'N/A'}
                      </div>
                      <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '6px' }}>
                        <strong>Updated:</strong> {selectedBrokerStatus.liveData.updated ? 'Yes ✅' : 'No changes'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Full JSON Response */}
                {selectedBrokerStatus.liveData && (
                  <div>
                    <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Full API Response (JSON)</h4>
                    <pre style={{
                      background: '#282c34',
                      color: '#abb2bf',
                      padding: '15px',
                      borderRadius: '8px',
                      overflow: 'auto',
                      fontSize: '12px',
                      lineHeight: '1.5',
                      maxHeight: '400px'
                    }}>
                      {JSON.stringify(selectedBrokerStatus.liveData, null, 2)}
                    </pre>
                  </div>
                )}

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                  {selectedBrokerStatus.liveData && (
                    <button
                      className="btn-primary"
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(selectedBrokerStatus.liveData, null, 2));
                        alert('Response copied to clipboard!');
                      }}
                    >
                      📋 Copy JSON
                    </button>
                  )}
                  {!selectedBrokerStatus.info && (
                    <button
                      className="btn-primary"
                      onClick={() => fetchLiveBrokerStatus(selectedBrokerStatus.lead)}
                    >
                      🔄 Refresh Status
                    </button>
                  )}
                  <button className="btn-secondary" onClick={() => setShowBrokerStatusModal(false)}>
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Push Details Modal */}
      {showPushDetailsModal && selectedPushDetails && (
        <div className="modal-overlay" onClick={() => setShowPushDetailsModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>📡 API Push Response</h3>
              <button
                onClick={() => setShowPushDetailsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            {/* Lead Info */}
            <div style={{
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Lead Information</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
                <div><strong>Name:</strong> {selectedPushDetails.lead.first_name} {selectedPushDetails.lead.last_name}</div>
                <div><strong>Email:</strong> {selectedPushDetails.lead.email}</div>
                <div><strong>Phone:</strong> {selectedPushDetails.lead.country_code}{selectedPushDetails.lead.phone_number}</div>
                <div><strong>Country:</strong> {selectedPushDetails.lead.country}</div>
                <div><strong>Broker:</strong> {selectedPushDetails.lead.assigned_broker || 'N/A'}</div>
                <div><strong>Pushed At:</strong> {selectedPushDetails.lead.pushed_at ? new Date(selectedPushDetails.lead.pushed_at).toLocaleString() : 'N/A'}</div>
              </div>
            </div>

            {/* Status Overview */}
            <div style={{
              background: selectedPushDetails.lead.push_status_code === 200 ? '#d4edda' : '#f8d7da',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: `1px solid ${selectedPushDetails.lead.push_status_code === 200 ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
                {selectedPushDetails.lead.push_status_code === 200 ? '✅ Success' : '❌ Failed'}
              </h4>
              <div style={{ fontSize: '14px' }}>
                <div><strong>HTTP Status:</strong> {selectedPushDetails.lead.push_status_code}</div>
                {selectedPushDetails.details.message && (
                  <div style={{ marginTop: '5px' }}><strong>Message:</strong> {selectedPushDetails.details.message}</div>
                )}
                {selectedPushDetails.details.error && (
                  <div style={{ marginTop: '5px', color: '#721c24' }}><strong>Error:</strong> {selectedPushDetails.details.error}</div>
                )}
              </div>
            </div>

            {/* API Response Details */}
            {selectedPushDetails.details.success !== undefined && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Response Summary</h4>
                <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
                  {selectedPushDetails.details.leadId && (
                    <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '6px' }}>
                      <strong>Lead ID:</strong> {selectedPushDetails.details.leadId}
                    </div>
                  )}
                  {selectedPushDetails.details.redirectUrl && (
                    <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '6px' }}>
                      <strong>Redirect URL:</strong> <a href={selectedPushDetails.details.redirectUrl} target="_blank" rel="noopener noreferrer">{selectedPushDetails.details.redirectUrl}</a>
                    </div>
                  )}
                  {selectedPushDetails.details.timestamp && (
                    <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '6px' }}>
                      <strong>Timestamp:</strong> {new Date(selectedPushDetails.details.timestamp).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Full JSON Response */}
            <div>
              <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Full API Response (JSON)</h4>
              <pre style={{
                background: '#282c34',
                color: '#abb2bf',
                padding: '15px',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '12px',
                lineHeight: '1.5',
                maxHeight: '400px'
              }}>
                {JSON.stringify(selectedPushDetails.details, null, 2)}
              </pre>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button
                className="btn-primary"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(selectedPushDetails.details, null, 2));
                  alert('Response copied to clipboard!');
                }}
              >
                📋 Copy JSON
              </button>
              <button className="btn-secondary" onClick={() => setShowPushDetailsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
