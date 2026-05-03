-- 013-diagnostic-centres.sql
-- Adds diagnostic centre selection to the specialist lab order flow.
-- Centres are linked to diagnostic staff via provider_profiles.centre_id
-- and to lab orders via lab_orders.diagnostic_centre_id.

-- 1. Create diagnostic_centres table
CREATE TABLE IF NOT EXISTS diagnostic_centres (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  display_distance text NOT NULL DEFAULT 'nearby',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Add centre_id to provider_profiles (links diagnostic staff to their centre)
ALTER TABLE provider_profiles
  ADD COLUMN IF NOT EXISTS centre_id uuid REFERENCES diagnostic_centres(id);

-- 3. Add diagnostic_centre_id to lab_orders (links orders to a centre)
ALTER TABLE lab_orders
  ADD COLUMN IF NOT EXISTS diagnostic_centre_id uuid REFERENCES diagnostic_centres(id);

-- 4. Index for filtering lab orders by centre
CREATE INDEX IF NOT EXISTS idx_lab_orders_diagnostic_centre_id
  ON lab_orders (diagnostic_centre_id);

-- 5. Insert seed diagnostic centres
INSERT INTO diagnostic_centres (id, name, display_distance)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'CityLab Diagnostics - Downtown', '(nearest, 2.3 km away)'),
  ('a0000000-0000-0000-0000-000000000002', 'CityLab Diagnostics - Uptown', '(nearest, 5.1 km away)'),
  ('a0000000-0000-0000-0000-000000000003', 'CityLab Diagnostics - Westside', '(nearest, 8.7 km away)')
ON CONFLICT (id) DO NOTHING;

-- 6. Assign existing diagnostic demo users to centres via their facility_name
UPDATE provider_profiles
SET centre_id = 'a0000000-0000-0000-0000-000000000001'
WHERE facility_name = 'CityLab Diagnostics - Downtown';

UPDATE provider_profiles
SET centre_id = 'a0000000-0000-0000-0000-000000000002'
WHERE facility_name = 'CityLab Diagnostics - Uptown';

-- Assign Imaging and Pathology staff to Westside centre
UPDATE provider_profiles
SET centre_id = 'a0000000-0000-0000-0000-000000000003'
WHERE facility_name IN ('CityLab Diagnostics - Imaging', 'CityLab Diagnostics - Pathology');
