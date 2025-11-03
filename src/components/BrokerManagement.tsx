'use client';

import { useState } from 'react';

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

interface BrokerManagementProps {
  brokers: Broker[];
  onRefresh: () => void;
}

export function BrokerManagement({ brokers, onRefresh }: BrokerManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [showApiUpload, setShowApiUpload] = useState(false);
  const [apiFile, setApiFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    email: '',
    phone: '',
    country_codes: [] as string[],
    traffic_percentage: 0,
    traffic_priority: 0,
    max_leads_per_day: 100,
    max_leads_per_hour: 10,
    max_leads_per_month: 1000,
    api_endpoint: '',
    api_key: '',
    auto_push_enabled: false,
    min_lead_amount: 0,
    max_lead_amount: 0,
    status: 'active'
  });

  const countries = [
    { code: 'AE', name: 'UAE' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'QA', name: 'Qatar' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'OM', name: 'Oman' }
  ];

  const handleAddBroker = async () => {
    try {
      const response = await fetch('/api/crm/brokers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Broker added successfully!');
        setShowAddModal(false);
        onRefresh();
        resetForm();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error adding broker:', error);
      alert('Failed to add broker');
    }
  };

  const handleUpdateBroker = async () => {
    if (!selectedBroker) return;

    try {
      const response = await fetch(`/api/crm/brokers/${selectedBroker.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Broker updated successfully!');
        setShowEditModal(false);
        setSelectedBroker(null);
        onRefresh();
        resetForm();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error updating broker:', error);
      alert('Failed to update broker');
    }
  };

  const handleUploadApi = async (brokerId: string) => {
    if (!apiFile) {
      alert('Please select a file');
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append('file', apiFile);
      formDataObj.append('brokerId', brokerId);

      const response = await fetch('/api/crm/brokers/upload-api', {
        method: 'POST',
        body: formDataObj
      });

      if (response.ok) {
        alert('API configuration uploaded successfully!');
        setShowApiUpload(false);
        setApiFile(null);
        onRefresh();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error uploading API config:', error);
      alert('Failed to upload API configuration');
    }
  };

  const handlePushTest = async (brokerId: string) => {
    const confirmed = confirm('Send a test lead to this broker\'s API?');
    if (!confirmed) return;

    try {
      // You would need to select a test lead or create one
      const response = await fetch('/api/crm/brokers/push-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: 'test-lead-id', // Replace with actual test lead
          brokerId
        })
      });

      const result = await response.json();
      alert(result.success ? 'Test push successful!' : `Test push failed: ${result.message}`);
    } catch (error) {
      console.error('Error testing push:', error);
      alert('Failed to test push');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      company_name: '',
      email: '',
      phone: '',
      country_codes: [],
      traffic_percentage: 0,
      traffic_priority: 0,
      max_leads_per_day: 100,
      max_leads_per_hour: 10,
      max_leads_per_month: 1000,
      api_endpoint: '',
      api_key: '',
      auto_push_enabled: false,
      min_lead_amount: 0,
      max_lead_amount: 0,
      status: 'active'
    });
  };

  const editBroker = (broker: Broker) => {
    setSelectedBroker(broker);
    setFormData({
      name: broker.name,
      company_name: broker.company_name || '',
      email: broker.email,
      phone: '',
      country_codes: broker.country_codes || [],
      traffic_percentage: broker.traffic_percentage || 0,
      traffic_priority: broker.traffic_priority || 0,
      max_leads_per_day: broker.max_leads_per_day,
      max_leads_per_hour: broker.max_leads_per_hour,
      max_leads_per_month: broker.max_leads_per_month || 1000,
      api_endpoint: broker.api_endpoint || '',
      api_key: '',
      auto_push_enabled: broker.auto_push_enabled || false,
      min_lead_amount: broker.min_lead_amount || 0,
      max_lead_amount: broker.max_lead_amount || 0,
      status: broker.status
    });
    setShowEditModal(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>🏢 Broker Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ➕ Add New Broker
        </button>
      </div>

      {/* Brokers Table */}
      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Broker</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Countries</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>Traffic %</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>Priority</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>Leads/Day</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>Total Leads</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>CVR</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((broker) => (
              <tr key={broker.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px' }}>
                  <div>
                    <div style={{ fontWeight: '600' }}>{broker.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{broker.company_name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{broker.email}</div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {(broker.country_codes || []).map((code) => (
                      <span
                        key={code}
                        style={{
                          padding: '2px 8px',
                          background: '#e0f2fe',
                          color: '#0284c7',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <strong>{broker.traffic_percentage || 0}%</strong>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  {broker.traffic_priority || 0}
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  {broker.max_leads_per_day}
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  {broker.total_leads_received}
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>
                    {broker.conversion_rate?.toFixed(1)}%
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      background: broker.status === 'active' ? '#dcfce7' : '#fee2e2',
                      color: broker.status === 'active' ? '#166534' : '#991b1b',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    {broker.status}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button
                      onClick={() => editBroker(broker)}
                      style={{
                        padding: '6px 12px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBroker(broker);
                        setShowApiUpload(true);
                      }}
                      style={{
                        padding: '6px 12px',
                        background: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      📤 API
                    </button>
                    <button
                      onClick={() => handlePushTest(broker.id)}
                      style={{
                        padding: '6px 12px',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                      disabled={!broker.api_endpoint}
                    >
                      🔔 Test
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            resetForm();
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '800px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{showAddModal ? '➕ Add New Broker' : '✏️ Edit Broker'}</h2>

            <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
              {/* Basic Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Broker Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
              </div>

              {/* Countries */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Accepted Countries
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {countries.map((country) => (
                    <label
                      key={country.code}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '8px 12px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: formData.country_codes.includes(country.code) ? '#dbeafe' : 'white'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.country_codes.includes(country.code)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              country_codes: [...formData.country_codes, country.code]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              country_codes: formData.country_codes.filter((c) => c !== country.code)
                            });
                          }
                        }}
                      />
                      {country.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Traffic Distribution */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Traffic % (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.traffic_percentage}
                    onChange={(e) => setFormData({ ...formData, traffic_percentage: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Priority (0-10)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.traffic_priority}
                    onChange={(e) => setFormData({ ...formData, traffic_priority: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Capacity Limits */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Max Leads/Day
                  </label>
                  <input
                    type="number"
                    value={formData.max_leads_per_day}
                    onChange={(e) => setFormData({ ...formData, max_leads_per_day: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Max Leads/Hour
                  </label>
                  <input
                    type="number"
                    value={formData.max_leads_per_hour}
                    onChange={(e) => setFormData({ ...formData, max_leads_per_hour: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Max Leads/Month
                  </label>
                  <input
                    type="number"
                    value={formData.max_leads_per_month}
                    onChange={(e) => setFormData({ ...formData, max_leads_per_month: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
              </div>

              {/* API Configuration */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  API Endpoint URL
                </label>
                <input
                  type="text"
                  value={formData.api_endpoint}
                  onChange={(e) => setFormData({ ...formData, api_endpoint: e.target.value })}
                  placeholder="https://api.broker.com/leads"
                  style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  API Key (Bearer Token)
                </label>
                <input
                  type="password"
                  value={formData.api_key}
                  onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                  placeholder="Leave empty to keep existing"
                  style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.auto_push_enabled}
                    onChange={(e) => setFormData({ ...formData, auto_push_enabled: e.target.checked })}
                  />
                  <span style={{ fontWeight: '600' }}>Enable Auto-Push to API</span>
                </label>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  Automatically push leads to this broker's API when assigned
                </p>
              </div>

              {/* Lead Amount Filters */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Min Lead Amount ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.min_lead_amount}
                    onChange={(e) => setFormData({ ...formData, min_lead_amount: parseFloat(e.target.value) })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Max Lead Amount ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.max_lead_amount}
                    onChange={(e) => setFormData({ ...formData, max_lead_amount: parseFloat(e.target.value) })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  onClick={showAddModal ? handleAddBroker : handleUpdateBroker}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {showAddModal ? '➕ Add Broker' : '💾 Save Changes'}
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  style={{
                    padding: '12px 24px',
                    background: '#e2e8f0',
                    color: '#64748b',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Upload Modal */}
      {showApiUpload && selectedBroker && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => {
            setShowApiUpload(false);
            setApiFile(null);
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>📤 Upload API Configuration</h2>
            <p style={{ color: '#64748b', marginTop: '8px' }}>
              Upload a JSON file containing API endpoint, key, and headers for <strong>{selectedBroker.name}</strong>
            </p>

            <div style={{ marginTop: '24px' }}>
              <label
                style={{
                  display: 'block',
                  padding: '40px',
                  border: '2px dashed #cbd5e1',
                  borderRadius: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: '#f8fafc'
                }}
              >
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => setApiFile(e.target.files?.[0] || null)}
                  style={{ display: 'none' }}
                />
                {apiFile ? (
                  <div>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
                    <div style={{ fontWeight: '600' }}>{apiFile.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {(apiFile.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📤</div>
                    <div style={{ fontWeight: '600' }}>Click to select file</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>JSON format only</div>
                  </div>
                )}
              </label>

              <div style={{ marginTop: '16px', padding: '12px', background: '#f0f9ff', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>Expected JSON Format:</div>
                <pre style={{ fontSize: '11px', overflow: 'auto' }}>
{`{
  "endpoint": "https://api.broker.com/leads",
  "apiKey": "your-api-key-here",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  }
}`}
                </pre>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  onClick={() => handleUploadApi(selectedBroker.id)}
                  disabled={!apiFile}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: apiFile ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)' : '#e2e8f0',
                    color: apiFile ? 'white' : '#94a3b8',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: apiFile ? 'pointer' : 'not-allowed'
                  }}
                >
                  📤 Upload Configuration
                </button>
                <button
                  onClick={() => {
                    setShowApiUpload(false);
                    setApiFile(null);
                  }}
                  style={{
                    padding: '12px 24px',
                    background: '#e2e8f0',
                    color: '#64748b',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
