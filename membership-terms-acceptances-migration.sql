-- Migration script to create membership terms acceptance audit records

CREATE TABLE IF NOT EXISTS membership_terms_acceptances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  plan_id VARCHAR(100) NOT NULL,
  plan_display_name VARCHAR(255) NOT NULL,
  membership_type INT NOT NULL,
  base_amount DECIMAL(10, 2) NOT NULL,
  gst_amount DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  accepted_at TIMESTAMP NOT NULL,
  terms_url VARCHAR(255) NOT NULL,
  terms_version VARCHAR(100) NOT NULL,
  terms_snapshot LONGTEXT NOT NULL,
  terms_hash VARCHAR(64) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  order_id INT NULL,
  razorpay_order_id VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_terms_acceptances_user (user_id),
  INDEX idx_terms_acceptances_plan (plan_id),
  INDEX idx_terms_acceptances_order (order_id),
  INDEX idx_terms_acceptances_razorpay_order (razorpay_order_id)
);
