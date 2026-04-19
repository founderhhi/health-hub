-- 015-lab-order-fields.sql
-- Adds notes, order_source, and admin_workflow_status to lab_orders.
-- notes: mandatory clinical reasoning from the ordering clinician (GP or specialist).
-- order_source: identifies who placed the order ('gp' or 'specialist').
-- admin_workflow_status: mirrors the pharmacy admin workflow states.

ALTER TABLE lab_orders
  ADD COLUMN IF NOT EXISTS notes TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS order_source VARCHAR(20) NOT NULL DEFAULT 'specialist',
  ADD COLUMN IF NOT EXISTS admin_workflow_status VARCHAR(50) NOT NULL DEFAULT 'new';

CREATE INDEX IF NOT EXISTS idx_lab_orders_order_source
  ON lab_orders (order_source);

CREATE INDEX IF NOT EXISTS idx_lab_orders_admin_workflow_status
  ON lab_orders (admin_workflow_status);
