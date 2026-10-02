-- Enquiry form storage for /dfnewclient2026fc

CREATE TABLE IF NOT EXISTS enquiry_sources (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_enquiry_sources_active_order (active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO enquiry_sources (label, slug, active, sort_order) VALUES
  ('Source 1', 'source-1', TRUE, 10),
  ('Source 2', 'source-2', TRUE, 20),
  ('Source 3', 'source-3', TRUE, 30),
  ('Source 4', 'source-4', TRUE, 40),
  ('Source 5', 'source-5', TRUE, 50),
  ('Source 6', 'source-6', TRUE, 60),
  ('Source 7', 'source-7', TRUE, 70),
  ('Source 8', 'source-8', TRUE, 80),
  ('Source 9', 'source-9', TRUE, 90),
  ('Source 10', 'source-10', TRUE, 100)
ON DUPLICATE KEY UPDATE label = VALUES(label), sort_order = VALUES(sort_order);

CREATE TABLE IF NOT EXISTS enquiry_prospects (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(16) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  gender VARCHAR(30) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_enquiry_prospects_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS enquiry_consent_acceptances (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(16) NOT NULL,
  terms_url VARCHAR(255) NOT NULL,
  terms_version VARCHAR(50) NOT NULL,
  terms_hash CHAR(64) NOT NULL,
  accepted_at DATETIME NOT NULL,
  verified_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  ip_address VARCHAR(45) NULL,
  user_agent TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_enquiry_consent_phone (phone),
  INDEX idx_enquiry_consent_used (used_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Foreign keys require both the parent and child tables to use InnoDB.
-- These statements also repair tables created by an earlier partial run
-- under a database whose default storage engine was not InnoDB.
ALTER TABLE enquiry_sources ENGINE=InnoDB;
ALTER TABLE enquiry_prospects ENGINE=InnoDB;
ALTER TABLE enquiry_consent_acceptances ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS enquiries (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  public_id CHAR(36) NOT NULL UNIQUE,
  prospect_id BIGINT NOT NULL,
  consent_id BIGINT NOT NULL,
  source_id INT NOT NULL,
  source_label VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  gender VARCHAR(30) NOT NULL,
  enquiry_type VARCHAR(20) NOT NULL,
  idempotency_key CHAR(36) NOT NULL UNIQUE,
  submitted_at DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_enquiries_prospect FOREIGN KEY (prospect_id) REFERENCES enquiry_prospects(id),
  CONSTRAINT fk_enquiries_consent FOREIGN KEY (consent_id) REFERENCES enquiry_consent_acceptances(id),
  CONSTRAINT fk_enquiries_source FOREIGN KEY (source_id) REFERENCES enquiry_sources(id),
  INDEX idx_enquiries_prospect_submitted (prospect_id, submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
