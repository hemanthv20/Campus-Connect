-- Complete setup SQL for socialmedia_db
-- This creates tables (if needed) and inserts all data
-- Run this entire script in pgAdmin Query Tool

-- 1. Create skill_categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS skill_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Insert skill categories
INSERT INTO skill_categories (name, description, icon) VALUES
('Programming Languages', 'Programming and scripting languages', 'code'),
('Frameworks & Tools', 'Development frameworks and tools', 'tools'),
('Soft Skills', 'Communication and interpersonal skills', 'users'),
('Design', 'UI/UX and graphic design skills', 'palette'),
('Languages', 'Spoken and written languages', 'globe'),
('Data Science', 'Data analysis and machine learning', 'chart-bar'),
('Mobile Development', 'iOS and Android development', 'mobile'),
('DevOps', 'Deployment and infrastructure', 'server'),
('Other', 'Miscellaneous skills', 'star')
ON CONFLICT (name) DO NOTHING;

-- 3. Create skills table if it doesn't exist
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category_id INTEGER REFERENCES skill_categories(id) ON DELETE SET NULL,
    description TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Insert skills
INSERT INTO skills (name, category_id, is_verified) VALUES
-- Programming Languages
('Java', (SELECT id FROM skill_categories WHERE name = 'Programming Languages'), true),
('Python', (SELECT id FROM skill_categories WHERE name = 'Programming Languages'), true),
('JavaScript', (SELECT id FROM skill_categories WHERE name = 'Programming Languages'), true),
('TypeScript', (SELECT id FROM skill_categories WHERE name = 'Programming Languages'), true),
('C++', (SELECT id FROM skill_categories WHERE name = 'Programming Languages'), true),
('C#', (SELECT id FROM skill_categories WHERE name = 'Programming Languages'), true),
('Go', (SELECT id FROM skill_categories WHERE name = 'Programming Languages'), true),
('PHP', (SELECT id FROM skill_categories WHERE name = 'Programming Languages'), true),
('Ruby', (SELECT id FROM skill_categories WHERE name = 'Programming Languages'), true),
-- Frameworks & Tools
('React', (SELECT id FROM skill_categories WHERE name = 'Frameworks & Tools'), true),
('Angular', (SELECT id FROM skill_categories WHERE name = 'Frameworks & Tools'), true),
('Vue.js', (SELECT id FROM skill_categories WHERE name = 'Frameworks & Tools'), true),
('Node.js', (SELECT id FROM skill_categories WHERE name = 'Frameworks & Tools'), true),
('Spring Boot', (SELECT id FROM skill_categories WHERE name = 'Frameworks & Tools'), true),
('Django', (SELECT id FROM skill_categories WHERE name = 'Frameworks & Tools'), true),
('Flask', (SELECT id FROM skill_categories WHERE name = 'Frameworks & Tools'), true),
('Express.js', (SELECT id FROM skill_categories WHERE name = 'Frameworks & Tools'), true),
('Next.js', (SELECT id FROM skill_categories WHERE name = 'Frameworks & Tools'), true),
('Laravel', (SELECT id FROM skill_categories WHERE name = 'Frameworks & Tools'), true),
-- Soft Skills
('Communication', (SELECT id FROM skill_categories WHERE name = 'Soft Skills'), true),
('Leadership', (SELECT id FROM skill_categories WHERE name = 'Soft Skills'), true),
('Teamwork', (SELECT id FROM skill_categories WHERE name = 'Soft Skills'), true),
('Problem Solving', (SELECT id FROM skill_categories WHERE name = 'Soft Skills'), true),
('Time Management', (SELECT id FROM skill_categories WHERE name = 'Soft Skills'), true),
('Critical Thinking', (SELECT id FROM skill_categories WHERE name = 'Soft Skills'), true),
-- Design
('UI/UX Design', (SELECT id FROM skill_categories WHERE name = 'Design'), true),
('Figma', (SELECT id FROM skill_categories WHERE name = 'Design'), true),
('Adobe XD', (SELECT id FROM skill_categories WHERE name = 'Design'), true),
('Photoshop', (SELECT id FROM skill_categories WHERE name = 'Design'), true),
('Illustrator', (SELECT id FROM skill_categories WHERE name = 'Design'), true),
-- Data Science
('Machine Learning', (SELECT id FROM skill_categories WHERE name = 'Data Science'), true),
('Data Analysis', (SELECT id FROM skill_categories WHERE name = 'Data Science'), true),
('TensorFlow', (SELECT id FROM skill_categories WHERE name = 'Data Science'), true),
('PyTorch', (SELECT id FROM skill_categories WHERE name = 'Data Science'), true),
('Pandas', (SELECT id FROM skill_categories WHERE name = 'Data Science'), true),
-- Mobile Development
('React Native', (SELECT id FROM skill_categories WHERE name = 'Mobile Development'), true),
('Flutter', (SELECT id FROM skill_categories WHERE name = 'Mobile Development'), true),
('Swift', (SELECT id FROM skill_categories WHERE name = 'Mobile Development'), true),
('Kotlin', (SELECT id FROM skill_categories WHERE name = 'Mobile Development'), true),
('Android Development', (SELECT id FROM skill_categories WHERE name = 'Mobile Development'), true),
('iOS Development', (SELECT id FROM skill_categories WHERE name = 'Mobile Development'), true),
-- DevOps
('Docker', (SELECT id FROM skill_categories WHERE name = 'DevOps'), true),
('Kubernetes', (SELECT id FROM skill_categories WHERE name = 'DevOps'), true),
('AWS', (SELECT id FROM skill_categories WHERE name = 'DevOps'), true),
('Azure', (SELECT id FROM skill_categories WHERE name = 'DevOps'), true),
('CI/CD', (SELECT id FROM skill_categories WHERE name = 'DevOps'), true),
('Jenkins', (SELECT id FROM skill_categories WHERE name = 'DevOps'), true)
ON CONFLICT (name) DO NOTHING;

-- 5. Create interest_categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS interest_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Insert interest categories
INSERT INTO interest_categories (name, description, icon) VALUES
('Technology & Innovation', 'Tech trends and innovations', 'cpu'),
('Arts & Culture', 'Creative arts and cultural activities', 'palette'),
('Sports & Fitness', 'Physical activities and sports', 'dumbbell'),
('Business & Entrepreneurship', 'Business and startup interests', 'briefcase'),
('Social Causes', 'Social impact and volunteering', 'heart'),
('Academic Research', 'Research and academic pursuits', 'book'),
('Hobbies & Entertainment', 'Personal hobbies and entertainment', 'gamepad'),
('Travel & Adventure', 'Travel and outdoor activities', 'map')
ON CONFLICT (name) DO NOTHING;

-- 7. Create interests table if it doesn't exist
CREATE TABLE IF NOT EXISTS interests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category_id INTEGER REFERENCES interest_categories(id) ON DELETE SET NULL,
    description TEXT,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Insert interests
INSERT INTO interests (name, category_id) VALUES
-- Technology & Innovation
('Artificial Intelligence', (SELECT id FROM interest_categories WHERE name = 'Technology & Innovation')),
('Blockchain', (SELECT id FROM interest_categories WHERE name = 'Technology & Innovation')),
('Web Development', (SELECT id FROM interest_categories WHERE name = 'Technology & Innovation')),
('Mobile Apps', (SELECT id FROM interest_categories WHERE name = 'Technology & Innovation')),
('Cybersecurity', (SELECT id FROM interest_categories WHERE name = 'Technology & Innovation')),
-- Arts & Culture
('Music', (SELECT id FROM interest_categories WHERE name = 'Arts & Culture')),
('Photography', (SELECT id FROM interest_categories WHERE name = 'Arts & Culture')),
('Painting', (SELECT id FROM interest_categories WHERE name = 'Arts & Culture')),
('Theater', (SELECT id FROM interest_categories WHERE name = 'Arts & Culture')),
('Film Making', (SELECT id FROM interest_categories WHERE name = 'Arts & Culture')),
-- Sports & Fitness
('Football', (SELECT id FROM interest_categories WHERE name = 'Sports & Fitness')),
('Basketball', (SELECT id FROM interest_categories WHERE name = 'Sports & Fitness')),
('Cricket', (SELECT id FROM interest_categories WHERE name = 'Sports & Fitness')),
('Yoga', (SELECT id FROM interest_categories WHERE name = 'Sports & Fitness')),
('Gym', (SELECT id FROM interest_categories WHERE name = 'Sports & Fitness')),
('Running', (SELECT id FROM interest_categories WHERE name = 'Sports & Fitness')),
-- Business & Entrepreneurship
('Startups', (SELECT id FROM interest_categories WHERE name = 'Business & Entrepreneurship')),
('Marketing', (SELECT id FROM interest_categories WHERE name = 'Business & Entrepreneurship')),
('Finance', (SELECT id FROM interest_categories WHERE name = 'Business & Entrepreneurship')),
('Investing', (SELECT id FROM interest_categories WHERE name = 'Business & Entrepreneurship')),
-- Social Causes
('Environmental Conservation', (SELECT id FROM interest_categories WHERE name = 'Social Causes')),
('Education', (SELECT id FROM interest_categories WHERE name = 'Social Causes')),
('Healthcare', (SELECT id FROM interest_categories WHERE name = 'Social Causes')),
('Community Service', (SELECT id FROM interest_categories WHERE name = 'Social Causes')),
-- Academic Research
('Computer Science', (SELECT id FROM interest_categories WHERE name = 'Academic Research')),
('Mathematics', (SELECT id FROM interest_categories WHERE name = 'Academic Research')),
('Physics', (SELECT id FROM interest_categories WHERE name = 'Academic Research')),
('Biology', (SELECT id FROM interest_categories WHERE name = 'Academic Research')),
-- Hobbies & Entertainment
('Gaming', (SELECT id FROM interest_categories WHERE name = 'Hobbies & Entertainment')),
('Reading', (SELECT id FROM interest_categories WHERE name = 'Hobbies & Entertainment')),
('Cooking', (SELECT id FROM interest_categories WHERE name = 'Hobbies & Entertainment')),
('Traveling', (SELECT id FROM interest_categories WHERE name = 'Hobbies & Entertainment'))
ON CONFLICT (name) DO NOTHING;

-- 9. Verify the data
SELECT 'Skill Categories' as table_name, COUNT(*) as count FROM skill_categories
UNION ALL
SELECT 'Skills', COUNT(*) FROM skills
UNION ALL
SELECT 'Interest Categories', COUNT(*) FROM interest_categories
UNION ALL
SELECT 'Interests', COUNT(*) FROM interests;

-- 10. Show sample data
SELECT 'Sample Skills:' as info;
SELECT s.id, s.name, sc.name as category 
FROM skills s 
LEFT JOIN skill_categories sc ON s.category_id = sc.id 
ORDER BY sc.name, s.name
LIMIT 10;
