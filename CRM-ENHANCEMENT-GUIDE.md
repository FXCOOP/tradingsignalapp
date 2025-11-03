# CRM Enhancement Implementation Guide

## 🎯 Overview
Enhanced CRM system with advanced broker management, traffic distribution, API integration, and push notification capabilities for https://tradeflow.blog/crm

## ✅ What Has Been Created

### 1. Database Enhancements
**File**: `supabase-crm-traffic-distribution.sql`

**New Features**:
- Traffic distribution by percentage (0-100%)
- Priority-based lead assignment
- Country-specific traffic distribution
- Lead amount filtering (min/max)
- Monthly lead caps
- Auto-push to broker APIs
- Lead push logs table
- Distribution rules engine
- API configuration storage

**New Tables**:
- `lead_push_logs` - Track all API push attempts
- `broker_distribution_rules` - Advanced traffic rules
- `broker_api_configs` - Uploaded API configurations

**New Functions**:
- `get_available_brokers_for_lead()` - Smart broker selection
- `increment_broker_stats()` - Update broker metrics
- `reset_monthly_broker_stats()` - Monthly counter reset

### 2. API Endpoints

#### Upload API Configuration
**Endpoint**: `POST /api/crm/brokers/upload-api`
**File**: `src/app/api/crm/brokers/upload-api/route.ts`

**Features**:
- Upload JSON configuration files
- Validate API structure
- Store endpoint, key, headers
- Apply to specific brokers

**Example JSON Upload**:
```json
{
  "endpoint": "https://api.broker.com/leads",
  "apiKey": "your-secret-key",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "X-Custom-Header": "value"
  }
}
```

#### Push Lead to Broker
**Endpoint**: `POST /api/crm/brokers/push-lead`
**File**: `src/app/api/crm/brokers/push-lead/route.ts`

**Features**:
- Real-time lead pushing
- Automatic retry logic
- Response logging
- Error tracking
- Performance metrics

**Request Body**:
```json
{
  "leadId": "uuid-here",
  "brokerId": "uuid-here"
}
```

### 3. Broker Management Component
**File**: `src/components/BrokerManagement.tsx`

**Features**:
- ✅ Add/Edit/Delete brokers
- ✅ Set traffic percentage (0-100%)
- ✅ Set priority levels (0-10)
- ✅ Configure capacity limits (day/hour/month)
- ✅ Select accepted countries (GCC focus)
- ✅ Upload API configuration files
- ✅ Test API push functionality
- ✅ Set lead amount filters (min/max $)
- ✅ Enable/disable auto-push
- ✅ Real-time status management

**UI Features**:
- Beautiful gradient designs
- Responsive data table
- Modal dialogs for editing
- File upload interface
- Visual status indicators
- Country badges
- Performance metrics

## 🚀 Implementation Steps

### Step 1: Run Database Migration
```bash
# Connect to your Supabase project
# Navigate to SQL Editor
# Copy and paste the contents of: supabase-crm-traffic-distribution.sql
# Execute the migration
```

### Step 2: Update CRM Page
Integrate the BrokerManagement component into your CRM:

```tsx
// In src/app/crm/page.tsx
import { BrokerManagement } from '@/components/BrokerManagement';

// Add to your brokers tab:
{activeTab === 'brokers' && (
  <BrokerManagement
    brokers={brokers}
    onRefresh={fetchData}
  />
)}
```

### Step 3: Update Broker API Route
Enhance the existing broker update endpoint to handle new fields:

```typescript
// In src/app/api/crm/brokers/[id]/route.ts
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const updates = await request.json();

  // Update broker with new traffic distribution fields
  const { data, error } = await supabase
    .from('brokers')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', params.id)
    .select()
    .single();

  return NextResponse.json({ success: true, broker: data });
}
```

### Step 4: Implement Smart Lead Assignment
Update your lead assignment logic to use traffic distribution:

```typescript
// In src/app/api/crm/assign-lead/route.ts
export async function POST(request: NextRequest) {
  const { leadId, method } = await request.json();

  if (method === 'auto') {
    // Fetch lead details
    const { data: lead } = await supabase
      .from('signups')
      .select('*')
      .eq('id', leadId)
      .single();

    // Get available brokers using smart distribution
    const { data: brokers } = await supabase
      .rpc('get_available_brokers_for_lead', {
        p_country_code: lead.country_code,
        p_lead_amount: 0 // Or fetch from lead data
      });

    if (brokers && brokers.length > 0) {
      // Select broker based on traffic percentage and priority
      const selectedBroker = selectBrokerByDistribution(brokers);

      // Assign lead
      await assignLeadToBroker(leadId, selectedBroker.broker_id);

      // Auto-push if enabled
      if (selectedBroker.auto_push_enabled) {
        await fetch('/api/crm/brokers/push-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leadId, brokerId: selectedBroker.broker_id })
        });
      }
    }
  }
}
```

## 📊 Traffic Distribution Logic

### How It Works:

1. **Priority Levels (0-10)**:
   - Higher priority = first choice
   - Use for premium/VIP brokers

2. **Traffic Percentage (0-100%)**:
   - Distribute leads proportionally
   - Example: Broker A (50%), Broker B (30%), Broker C (20%)

3. **Country-Specific Distribution**:
   - Set different % per country
   - Example: UAE → 60%, Saudi → 40%

4. **Capacity Management**:
   - Respect daily/hourly/monthly limits
   - Auto-skip full brokers

5. **Amount Filters**:
   - Route high-value leads to premium brokers
   - Filter by min/max deposit amount

### Distribution Algorithm:
```typescript
function selectBrokerByDistribution(brokers: Broker[]) {
  // 1. Filter by priority (top tier first)
  const topPriority = Math.max(...brokers.map(b => b.traffic_priority));
  let candidates = brokers.filter(b => b.traffic_priority === topPriority);

  // 2. Calculate weighted selection
  const totalPercentage = candidates.reduce((sum, b) => sum + b.traffic_percentage, 0);
  const random = Math.random() * totalPercentage;

  let cumulative = 0;
  for (const broker of candidates) {
    cumulative += broker.traffic_percentage;
    if (random <= cumulative) {
      return broker;
    }
  }

  // 3. Fallback to least loaded
  return candidates.sort((a, b) => a.current_load - b.current_load)[0];
}
```

## 🔔 Push Notification System

### Auto-Push Flow:
1. Lead is created/assigned
2. Check if broker has `auto_push_enabled = true`
3. Verify API endpoint is configured
4. Prepare lead data payload
5. Send POST request to broker API
6. Log response in `lead_push_logs`
7. Update broker statistics

### Manual Push:
- Click "Test" button in CRM
- Select specific lead
- Push immediately to broker
- View real-time response

### Retry Logic:
```typescript
// Implement in cron job or background worker
async function retryFailedPushes() {
  const { data: failedPushes } = await supabase
    .from('lead_push_logs')
    .select('*')
    .eq('status', 'failed')
    .lt('retry_count', 3)
    .order('pushed_at', { ascending: true })
    .limit(10);

  for (const push of failedPushes) {
    // Retry push
    const result = await pushLeadToBroker(push.lead_id, push.broker_id);

    // Update log
    await supabase
      .from('lead_push_logs')
      .update({
        status: result.success ? 'success' : 'failed',
        retry_count: push.retry_count + 1,
        response_data: result.response
      })
      .eq('id', push.id);
  }
}
```

## 📈 Analytics & Reporting

### Broker Performance Metrics:
- Total leads received
- Conversion rate
- Average response time
- Push success rate
- Revenue generated

### Traffic Distribution Reports:
- Leads per broker (percentage)
- Country distribution breakdown
- Priority tier performance
- Capacity utilization
- API push success rates

## 🎨 UI Features

### Broker Management Table:
- Sortable columns
- Filterable by status/country
- Color-coded status indicators
- Quick action buttons
- Inline metrics display

### Add/Edit Modal:
- Multi-step form
- Real-time validation
- Country selector
- Traffic distribution sliders
- API configuration fields

### API Upload Interface:
- Drag & drop file upload
- JSON format validation
- Preview before save
- Test connection button

## 🔒 Security Considerations

1. **API Key Storage**:
   - Encrypt in database
   - Never expose in frontend
   - Use environment variables

2. **Rate Limiting**:
   - Implement on push endpoints
   - Prevent API abuse
   - Track failed attempts

3. **Authentication**:
   - Verify CRM admin access
   - JWT tokens required
   - Role-based permissions

## 📝 Next Steps

1. ✅ Deploy database migration
2. ✅ Test broker CRUD operations
3. ✅ Upload sample API configuration
4. ✅ Test push notification
5. ✅ Configure traffic distribution
6. ✅ Monitor lead assignment
7. ✅ Analyze performance metrics

## 🆘 Troubleshooting

### Push Fails:
- Check API endpoint URL
- Verify API key/token
- Review response in logs
- Test manually with Postman

### Distribution Issues:
- Verify traffic percentages sum correctly
- Check broker capacity limits
- Review country code matches
- Inspect priority levels

### Performance:
- Add database indexes
- Implement caching
- Use background jobs
- Monitor API response times

## 📚 Resources

- **Database Schema**: `supabase-crm-traffic-distribution.sql`
- **Broker Component**: `src/components/BrokerManagement.tsx`
- **Upload API**: `src/app/api/crm/brokers/upload-api/route.ts`
- **Push API**: `src/app/api/crm/brokers/push-lead/route.ts`

---

**Status**: ✅ Ready for Integration
**Version**: 1.0.0
**Last Updated**: 2025-01-03
