-- Insert additional departments
INSERT INTO departments (name, title) VALUES 
('Operations', 'Operations Department'),
('Fitness & Training', 'Fitness & Training Department'),
('Sales', 'Sales Department'),
('Marketing', 'Marketing Department'),
('Administration & HR', 'Administration & HR Department'),
('Finance & Accounts', 'Finance & Accounts Department'),
('Management', 'Management Department'),
('Others', 'Other Departments');

-- Job Type Mapping:
-- 1 = Full-time
-- 2 = Part-time  
-- 3 = Contractor

-- Insert additional locations (if needed)
INSERT INTO location (full_location, city) VALUES 
('Corporate Office, Sector 18, Noida', 'Noida'),
('Tech Hub, Whitefield, Bangalore', 'Bangalore'),
('Business District, Salt Lake, Kolkata', 'Kolkata');

-- Insert sample job postings with different job types
INSERT INTO job_postings (title, department_id, location_id, job_type, application_deadline, job_description, skills_required, role, qualifications, years_of_experience) VALUES 
-- Full-time positions (job_type = 1)
('Operations Manager', 4, 1, 1, '2025-12-31', 'Oversee daily operations and ensure efficiency.', 'Operations Management, Process Improvement, Leadership', '["Operations Manager", "Process Owner"]', '["MBA in Operations", "5+ years experience"]', '5-8'),
('Fitness Trainer', 5, 2, 1, '2025-11-15', 'Provide fitness training and wellness programs.', 'Fitness Training, Nutrition, Communication', '["Fitness Trainer", "Wellness Coach"]', '["Certified Personal Trainer", "2+ years experience"]', '2-4'),
('Marketing Specialist', 6, 3, 1, '2025-10-30', 'Develop and execute marketing campaigns.', 'Digital Marketing, Content Creation, Analytics', '["Marketing Specialist", "Campaign Manager"]', '["BBA in Marketing", "3+ years experience"]', '3-5'),

-- Part-time positions (job_type = 2)
('Part-time Sales Associate', 7, 1, 2, '2025-09-30', 'Support sales activities on part-time basis.', 'Sales, Customer Service, Communication', '["Sales Associate", "Customer Support"]', '["High School Diploma", "1+ years experience"]', '1-2'),
('Part-time Admin Assistant', 8, 2, 2, '2025-10-15', 'Provide administrative support part-time.', 'Administration, Data Entry, Organization', '["Admin Assistant", "Data Entry Clerk"]', '["Diploma in Office Management", "1+ years experience"]', '1-2'),

-- Contractor positions (job_type = 3)
('Contract Software Developer', 2, 3, 3, '2025-12-15', 'Contract-based software development project.', 'React, Node.js, MongoDB, AWS', '["Full Stack Developer", "Project Contributor"]', '["B.Tech in Computer Science", "3+ years experience"]', '3-5'),
('Contract Marketing Consultant', 6, 1, 3, '2025-11-30', 'Consult on marketing strategy and implementation.', 'Marketing Strategy, Brand Management, Analytics', '["Marketing Consultant", "Strategy Advisor"]', '["MBA in Marketing", "5+ years experience"]', '5-8'),
('Contract Finance Analyst', 9, 2, 3, '2025-10-31', 'Contract-based financial analysis and reporting.', 'Financial Analysis, Excel, Accounting', '["Finance Analyst", "Financial Reporter"]', '["CA/CFA", "4+ years experience"]', '4-6');


