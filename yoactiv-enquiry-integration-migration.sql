-- YoActiv synchronization status for enquiries created by /dfnewclient2026fc.
-- Existing enquiries are intentionally not inserted into this table or backfilled.

CREATE TABLE IF NOT EXISTS enquiry_crm_sync (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  enquiry_id BIGINT NOT NULL UNIQUE,
  provider VARCHAR(30) NOT NULL DEFAULT 'yoactiv',
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  attempts INT NOT NULL DEFAULT 0,
  last_error VARCHAR(1000) NULL,
  response_summary TEXT NULL,
  synced_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_enquiry_crm_sync_enquiry
    FOREIGN KEY (enquiry_id) REFERENCES enquiries(id),
  INDEX idx_enquiry_crm_sync_status_updated (status, updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
