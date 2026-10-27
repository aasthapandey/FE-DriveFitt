-- Read-only enquiry dashboard administrators.
-- Access is still protected by OTP; this table controls which phone numbers may log in.

CREATE TABLE IF NOT EXISTS enquiry_admin_users (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(16) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_enquiry_admin_users_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO enquiry_admin_users (phone, name, active)
VALUES ('+919650811118', 'Sahil', TRUE)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  active = TRUE;
