-- ==========================================
-- ASSIGN EXISTING LEADS TO FINOGLOB
-- ==========================================
-- Run this AFTER creating the Finoglob broker
-- This will assign all existing unassigned Malaysia leads

-- Step 1: Get Finoglob broker ID
DO $$
DECLARE
    broker_id_var UUID;
BEGIN
    -- Get Finoglob broker ID
    SELECT id INTO broker_id_var
    FROM brokers
    WHERE name = 'Finoglob'
    LIMIT 1;

    IF broker_id_var IS NULL THEN
        RAISE EXCEPTION 'Finoglob broker not found! Create it first using create-finoglob-broker.sql';
    END IF;

    -- Update all unassigned Malaysia leads
    UPDATE signups
    SET
        assigned_broker_id = broker_id_var,
        assigned_broker = 'Finoglob',
        lead_status = 'assigned',
        crm_status = 'assigned',
        last_activity_at = NOW()
    WHERE
        country = 'Malaysia'
        AND (assigned_broker_id IS NULL OR assigned_broker_id::text = '')
        AND (lead_status IS NULL OR lead_status = 'new');

    -- Create lead_assignments records for each
    INSERT INTO lead_assignments (
        lead_id,
        broker_id,
        assignment_method,
        delivery_status,
        priority
    )
    SELECT
        s.id,
        broker_id_var,
        'manual',
        'pending',
        0
    FROM signups s
    WHERE
        s.country = 'Malaysia'
        AND s.assigned_broker_id = broker_id_var
        AND NOT EXISTS (
            SELECT 1 FROM lead_assignments la
            WHERE la.lead_id = s.id
        );

    RAISE NOTICE 'Leads assigned to Finoglob successfully!';
END $$;

-- Verify assignments
SELECT
    s.first_name,
    s.last_name,
    s.email,
    s.country,
    s.lead_status,
    b.name as broker_name,
    s.created_at
FROM signups s
LEFT JOIN brokers b ON s.assigned_broker_id = b.id
WHERE s.country = 'Malaysia'
ORDER BY s.created_at DESC;

-- Show summary
SELECT
    COUNT(*) as total_assigned,
    'Finoglob' as broker_name
FROM signups
WHERE assigned_broker = 'Finoglob';
