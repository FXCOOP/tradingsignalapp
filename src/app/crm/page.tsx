'use client';

import { useState, useEffect } from 'react';
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
  created_at: string;
}

interface Broker {
  id: string;
  name: string;
  company_name: string;
  email: string;
  status: string;
  country_codes: string[];
  total_leads_received: number;
  total_leads_converted: number;
  conversion_rate: number;
}

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'brokers' | 'analytics'>('dashboard');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

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
      const [analyticsRes, leadsRes, brokersRes] = await Promise.all([
        fetch('/api/crm/analytics'),
        fetch('/api/crm/leads?limit=100'),
        fetch('/api/crm/brokers')
      ]);

      const analyticsData = await analyticsRes.json();
      const leadsData = await leadsRes.json();
      const brokersData = await brokersRes.json();

      setAnalytics(analyticsData.analytics);
      setLeads(leadsData.leads || []);
      setBrokers(brokersData.brokers || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
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
      {activeTab === 'dashboard' && analytics && (
        <div className="crm-content">
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
                      {lead.assigned_broker_id
                        ? brokers.find(b => b.id === lead.assigned_broker_id)?.name || 'Unknown'
                        : 'Unassigned'}
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
          <div className="content-header">
            <h2>Broker Management</h2>
            <button className="btn-primary">+ Add Broker</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Status</th>
                <th>Countries</th>
                <th>Leads Received</th>
                <th>Converted</th>
                <th>Conversion Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brokers.map((broker) => (
                <tr key={broker.id}>
                  <td>{broker.name}</td>
                  <td>{broker.company_name}</td>
                  <td>{broker.email}</td>
                  <td>
                    <span className={`status-badge status-${broker.status}`}>
                      {broker.status}
                    </span>
                  </td>
                  <td>{broker.country_codes.join(', ')}</td>
                  <td>{broker.total_leads_received}</td>
                  <td>{broker.total_leads_converted}</td>
                  <td>{broker.conversion_rate.toFixed(1)}%</td>
                  <td>
                    <button className="btn-small">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );
}
