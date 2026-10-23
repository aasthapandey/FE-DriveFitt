-- Replace the original Source 1-10 placeholders with the approved lead sources.
-- Existing placeholder rows are retained for historical foreign-key references.

INSERT INTO enquiry_sources (label, slug, active, sort_order) VALUES
  ('Social Media', 'social-media', TRUE, 10),
  ('Walk-by', 'walk-by', TRUE, 20),
  ('Website', 'website', TRUE, 30),
  ('Phone', 'phone', TRUE, 40),
  ('Referral', 'referral', TRUE, 50),
  ('Event', 'event', TRUE, 60),
  ('Others', 'others', TRUE, 70)
ON DUPLICATE KEY UPDATE
  label = VALUES(label),
  active = VALUES(active),
  sort_order = VALUES(sort_order);

UPDATE enquiry_sources
SET active = FALSE
WHERE slug IN (
  'source-1',
  'source-2',
  'source-3',
  'source-4',
  'source-5',
  'source-6',
  'source-7',
  'source-8',
  'source-9',
  'source-10'
);
