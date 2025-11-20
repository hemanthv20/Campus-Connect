-- Run this SQL in pgAdmin to insert skills and interests

-- First, let's check if skill_categories exist
SELECT * FROM skill_categories;

-- Insert Skills for each category
INSERT INTO skills (name, category_id, is_verified) 
VALUES 
-- Programming Languages (assuming category_id = 1)
('Java', 1, true),
('Python', 1, true),
('JavaScript', 1, true),
('TypeScript', 1, true),
('C++', 1, true),
('C#', 1, true),
('Go', 1, true),
('PHP', 1, true),
('Ruby', 1, true),
('Kotlin', 1, true),

-- Frameworks & Tools (assuming category_id = 2)
('React', 2, true),
('Angular', 2, true),
('Vue.js', 2, true),
('Node.js', 2, true),
('Spring Boot', 2, true),
('Django', 2, true),
('Flask', 2, true),
('Express.js', 2, true),
('Next.js', 2, true),
('Laravel', 2, true),

-- Soft Skills (assuming category_id = 3)
('Communication', 3, true),
('Leadership', 3, true),
('Teamwork', 3, true),
('Problem Solving', 3, true),
('Time Management', 3, true),
('Critical Thinking', 3, true),

-- Design (assuming category_id = 4)
('UI/UX Design', 4, true),
('Figma', 4, true),
('Adobe XD', 4, true),
('Photoshop', 4, true),
('Illustrator', 4, true),

-- Data Science (assuming category_id = 6)
('Machine Learning', 6, true),
('Data Analysis', 6, true),
('TensorFlow', 6, true),
('PyTorch', 6, true),
('Pandas', 6, true),

-- Mobile Development (assuming category_id = 7)
('React Native', 7, true),
('Flutter', 7, true),
('Swift', 7, true),
('Android Development', 7, true),
('iOS Development', 7, true),

-- DevOps (assuming category_id = 8)
('Docker', 8, true),
('Kubernetes', 8, true),
('AWS', 8, true),
('Azure', 8, true),
('CI/CD', 8, true),
('Jenkins', 8, true)
ON CONFLICT (name) DO NOTHING;

-- Insert Interests
INSERT INTO interests (name, category_id) 
VALUES 
-- Technology & Innovation (assuming category_id = 1)
('Artificial Intelligence', 1),
('Blockchain', 1),
('Web Development', 1),
('Mobile Apps', 1),
('Cybersecurity', 1),

-- Arts & Culture (assuming category_id = 2)
('Music', 2),
('Photography', 2),
('Painting', 2),
('Theater', 2),
('Film Making', 2),

-- Sports & Fitness (assuming category_id = 3)
('Football', 3),
('Basketball', 3),
('Cricket', 3),
('Yoga', 3),
('Gym', 3),
('Running', 3),

-- Business & Entrepreneurship (assuming category_id = 4)
('Startups', 4),
('Marketing', 4),
('Finance', 4),
('Investing', 4),

-- Social Causes (assuming category_id = 5)
('Environmental Conservation', 5),
('Education', 5),
('Healthcare', 5),
('Community Service', 5),

-- Academic Research (assuming category_id = 6)
('Computer Science', 6),
('Mathematics', 6),
('Physics', 6),
('Biology', 6),

-- Hobbies & Entertainment (assuming category_id = 7)
('Gaming', 7),
('Reading', 7),
('Cooking', 7),
('Traveling', 7)
ON CONFLICT (name) DO NOTHING;

-- Verify the data was inserted
SELECT COUNT(*) as skill_count FROM skills;
SELECT COUNT(*) as interest_count FROM interests;

-- Show all skills with their categories
SELECT s.id, s.name, sc.name as category 
FROM skills s 
LEFT JOIN skill_categories sc ON s.category_id = sc.id 
ORDER BY sc.name, s.name;
