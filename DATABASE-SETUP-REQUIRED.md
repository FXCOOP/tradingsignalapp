# ⚠️ Database Setup Required

## Error: Could not find the table 'public.brokers'

You need to run the database migration first!

## Quick Fix:

1. **Go to Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**:
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

3. **Run Migration**:
   - Copy the contents of `supabase-crm-migration.sql`
   - Paste into SQL editor
   - Click "Run" or press Ctrl+Enter

4. **Run Traffic Distribution Enhancement**:
   - Copy the contents of `supabase-crm-traffic-distribution.sql`
   - Paste into SQL editor
   - Click "Run"

5. **Verify Tables Created**:
   ```sql
   SELECT table_name
   FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name IN ('brokers', 'lead_assignments', 'lead_push_logs');
   ```

   You should see:
   - ✅ brokers
   - ✅ lead_assignments
   - ✅ lead_push_logs
   - ✅ broker_distribution_rules
   - ✅ broker_api_configs

6. **Refresh CRM Page**: https://tradeflow.blog/crm

## Files to Run (in order):
1. `supabase-crm-migration.sql` - Core tables
2. `supabase-crm-traffic-distribution.sql` - Traffic features

---

After running migrations, the error will be fixed and you can add brokers!
