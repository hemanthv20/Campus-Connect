-- Complete SQL to insert skills and interests into socialmedia_db
-- Run this in pgAdmin Query Tool

-- Insert Skills
INSERT INTO skills (name, category_id, is_verified) 
VALUES 
('Java', 1, true),
('Python', 1, true),
('JavaScript', 1, true),
('TypeScript', 1, true),
('C++', 1, true),
('C#', 1, true),
('Go', 1, true),
('PHP', 1, true),
('React', 2, true),
('Angular', 2, true),
('Vue.js', 2, true),
('Node.js', 2, true),
('Spring Boot', 2, true),
('Django', 2, true),
('Express.js', 2, true),
('Communication', 3, true),
('Leadership', 3, true),
('Teamwork', 3, true),
('Problem Solving', 3, true),
('UI/UX Design', 4, true),
('Figma', 4, true),
('Photoshop', 4, true),
('Machine Learning', 6, true),
('Data Analysis', 6, true),
('TensorFlow', 6, true),
('React Native', 7, true),
('Flutter', 7, true),
('Android Development', 7, true),
('Docker', 8, true),
('Kubernetes', 8, true),
('AWS', 8, true)
ON CONFLICT (name) DO NOTHING;

-- Insert Interests
INSERT INTO interests (name, category_id) 
VALUES 
('Artificial Intelligence', 1),
('Web Development', 1),
('Mobile Apps', 1),
('Music', 2),
('Photography', 2),
('Painting', 2),
('Football', 3),
('Basketball', 3),
('Yoga', 3),
('Startups', 4),
('Marketing', 4),
('Finance', 4),
('Environmental Conservation', 5),
('Education', 5),
('Healthcare', 5),
('Computer Science', 6),
('Mathematics', 6),
('Gaming', 7),
('Reading', 7),
('Cooking', 7),
('Traveling', 8)
ON CONFLICT (name) DO NOTHING;

-- Verify the data
SELECT COUNT(*) as total_skills FROM skills;
SELECT COUNT(*) as total_interests FROM interests;

-- Show all skills
SELECT s.id, s.name, sc.name as category 
FROM skills s 
LEFT JOIN skill_categories sc ON s.category_id = sc.id 
ORDER BY sc.name, s.name;
