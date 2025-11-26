-- ============================================
-- CampusConnect - Create Admin User Script
-- Manual script to create the master admin account
-- ============================================

-- This script creates the admin user with the following credentials:
-- Username: admin
-- Password: Admin@123 (hashed with BCrypt)
-- Email: admin@campusconnect.com

-- Step 1: Insert admin user if not exists
-- The password hash below corresponds to "Admin@123" using BCrypt with strength 10
INSERT INTO users (username, password, first_name, last_name, email, admin, created_on, updated_on)
SELECT 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'System', 'Administrator', 'admin@campusconnect.com', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE username = 'admin'
);

-- Step 2: Ensure admin role exists in roles table
INSERT INTO roles (role_name, description, created_on)
SELECT 'ADMIN', 'System Administrator with full platform control', CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM roles WHERE role_name = 'ADMIN'
);

-- Step 3: Assign admin role to admin user
INSERT INTO user_roles (user_id, role_id, assigned_on)
SELECT u.user_id, r.role_id, CURRENT_TIMESTAMP
FROM users u, roles r
WHERE u.username = 'admin' 
  AND r.role_name = 'ADMIN'
  AND NOT EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = u.user_id AND ur.role_id = r.role_id
  );

-- Step 4: Verify admin user creation
SELECT 
    u.user_id,
    u.username,
    u.first_name,
    u.last_name,
    u.email,
    u.admin,
    u.created_on,
    r.role_name
FROM users u
LEFT JOIN user_roles ur ON u.user_id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.role_id
WHERE u.username = 'admin';

-- ============================================
-- ADMIN USER CREDENTIALS
-- ============================================
-- Username: admin
-- Password: Admin@123
-- Email: admin@campusconnect.com
-- Role: ADMIN
-- 
-- IMPORTANT SECURITY NOTES:
-- 1. Change the default password immediately after first login
-- 2. Use a strong, unique password for production environments
-- 3. Consider enabling two-factor authentication if available
-- 4. Regularly audit admin access and activities
-- ============================================