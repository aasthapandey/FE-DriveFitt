CREATE TABLE IF NOT EXISTS trial_pass_bookings (
  id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  phone VARCHAR(16) NOT NULL,
  email VARCHAR(254) NOT NULL,
  date_of_birth DATE NOT NULL,
  trial_date DATE NOT NULL,
  service_id INT UNSIGNED NOT NULL,
  amount_paise INT UNSIGNED NOT NULL,
  razorpay_order_id VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin UNIQUE,
  razorpay_payment_id VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin UNIQUE,
  paid_at DATETIME(3),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_trial_guest_phone (phone),
  INDEX idx_trial_date (trial_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trial_pass_receipt_emails (
  booking_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,
  claim_token CHAR(36) CHARACTER SET ascii COLLATE ascii_bin,
  claimed_until DATETIME(3),
  sent_at DATETIME(3),
  CONSTRAINT fk_trial_pass_receipt_booking
    FOREIGN KEY (booking_id) REFERENCES trial_pass_bookings (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
