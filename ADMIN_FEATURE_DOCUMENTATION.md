# 🛡️ Super Admin Feature Documentation

## Overview

The Super Admin feature provides a master administrator account with full control over the CampusConnect platform. This includes the ability to delete any user account, delete any post, and access comprehensive platform statistics.

## 🔑 Admin Credentials

**Default Admin Account:**

- **Username:** `admin`
- **Password:** `Admin@123`
- **Email:** `admin@campusconnect.com`

> ⚠️ **Security Warning:** Change the default password immediately after first login in production environments.

---

## 🗄️ Database Implementation

### 1. Admin User Seeding

The admin user is automatically created when the application starts using:

- **Migration Script:** `V5__seed_admin_user.sql`
- **CommandLineRunner:** `AdminSeeder.java`

### 2. Database Schema

The admin functionality uses the existing `users` table with the `admin` boolean field:

```sql
-- Users table includes admin field
admin BOOLEAN DEFAULT FALSE

-- Roles table for role-based access
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- User roles mapping
CREATE TABLE user_roles (
    user_role_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);
```

---

## 🔧 Backend Implementation

### 1. Admin Controller (`AdminController.java`)

**Endpoints:**

- `GET /api/admin/users?adminUserId={id}` - Get all users
- `DELETE /api/admin/users/{userId}?adminUserId={id}` - Delete any user
- `DELETE /api/admin/posts/{postId}?adminUserId={id}` - Delete any post
- `GET /api/admin/stats?adminUserId={id}` - Get platform statistics
- `GET /api/admin/check/{userId}` - Check admin status
- `GET /api/admin/posts?adminUserId={id}` - Get all posts

### 2. Admin Service (`AdminService.java`)

**Key Methods:**

- `isAdmin(Long userId)` - Check if user has admin privileges
- `deleteUser(Long userId)` - Delete user and cascade related data
- `deletePost(Long postId)` - Delete any post
- `getPlatformStatistics()` - Get comprehensive platform stats
- `getAllUsers()` - Get all users with admin status

### 3. Security Features

- **Admin-only endpoints** - All admin operations require admin privileges
- **Self-protection** - Admin cannot delete their own account
- **Admin protection** - Cannot delete other admin accounts
- **Audit logging** - All admin operations are logged

---

## 🎨 Frontend Implementation

### 1. Admin Context (`AdminContext.js`)

Provides global admin state management:

```javascript
const { isAdmin, deleteUser, deletePost, getAllUsers } = useAdmin();
```

### 2. Admin Dashboard (`AdminDashboard.js`)

**Features:**

- Platform statistics overview
- User management table
- Bulk user operations
- Real-time data refresh

**Statistics Displayed:**

- Total Users
- Total Posts
- Total Follows
- Total Messages

### 3. Admin Controls in Components

#### Feed Component

- **Admin Delete Button** appears on all posts for admins
- **Visual Distinction** - Admin delete buttons have shield icon
- **Confirmation Dialogs** - Enhanced warnings for admin actions

#### Profile Component

- **Delete User Button** appears on user profiles for admins
- **Protection Logic** - Cannot delete admin users
- **Cascade Warning** - Warns about data deletion

### 4. Navigation Integration

- **Admin Dashboard Link** in navbar for admin users
- **Dynamic Visibility** - Only shown to authenticated admins
- **Icon Indicators** - Shield icons for admin features

---

## 🎯 User Interface Features

### 1. Admin Dashboard

**Layout:**

- Statistics cards with platform metrics
- User management table with actions
- Responsive design for mobile devices
- Real-time data updates

**User Management:**

- View all users with details
- Delete non-admin users
- Protected admin accounts
- Search and filter capabilities

### 2. Admin Controls

**Post Management:**

- Admin delete buttons on all posts
- Visual distinction from regular delete
- Enhanced confirmation dialogs
- Immediate UI updates

**User Management:**

- Delete user buttons on profiles
- Cascade deletion warnings
- Admin protection logic
- Redirect after deletion

### 3. Visual Design

**Admin Elements:**

- Red gradient backgrounds for delete actions
- Shield icons for admin functions
- Enhanced hover effects
- Clear visual hierarchy

---

## 🔒 Security Implementation

### 1. Backend Security

**Authentication:**

- Admin status verification on every request
- User ID validation for admin operations
- Protection against privilege escalation

**Authorization:**

- Role-based access control
- Admin-only endpoint protection
- Self-deletion prevention

### 2. Frontend Security

**State Management:**

- Secure admin context
- Real-time privilege checking
- Automatic logout on privilege loss

**UI Protection:**

- Admin controls only visible to admins
- Disabled states for unauthorized actions
- Clear error messages for access denial

---

## 📊 Platform Statistics

The admin dashboard provides comprehensive platform metrics:

### Available Statistics

- **Total Users** - All registered users
- **Total Admins** - Number of admin accounts
- **Total Posts** - All posts across platform
- **Total Follows** - All follow relationships
- **Total Chats** - All chat conversations
- **Total Messages** - All messages sent

### Data Sources

- Real-time database queries
- Cached for performance
- Updated on admin actions

---

## 🚀 Deployment Instructions

### 1. Database Setup

Run the admin seeding script:

```sql
-- Option 1: Use migration (automatic)
-- V5__seed_admin_user.sql runs automatically

-- Option 2: Manual creation
\i create_admin_user.sql
```

### 2. Application Configuration

Ensure the following components are properly configured:

**Backend:**

- `AdminSeeder.java` - Runs on application start
- `SecurityConfig.java` - Password encoding enabled
- `AdminController.java` - Endpoints configured

**Frontend:**

- `AdminProvider` - Wraps the application
- Admin routes configured in routing
- Admin context imported in components

### 3. Environment Variables

No additional environment variables required. The admin user is created with default credentials.

---

## 🧪 Testing

### 1. Admin Creation Testing

```bash
# Check if admin user exists
SELECT * FROM users WHERE username = 'admin';

# Verify admin role assignment
SELECT u.username, r.role_name
FROM users u
JOIN user_roles ur ON u.user_id = ur.user_id
JOIN roles r ON ur.role_id = r.role_id
WHERE u.username = 'admin';
```

### 2. Admin Functionality Testing

**Login as Admin:**

1. Navigate to login page
2. Enter credentials: `admin` / `Admin@123`
3. Verify admin dashboard link appears in navbar
4. Access admin dashboard at `/admin-dashboard`

**Test Admin Powers:**

1. Navigate to any user profile
2. Verify "Delete User" button appears (for non-admin users)
3. Navigate to feed
4. Verify admin delete buttons appear on all posts
5. Test deletion functionality with confirmation dialogs

### 3. Security Testing

**Access Control:**

1. Test admin endpoints without admin privileges
2. Verify 403 Forbidden responses
3. Test self-deletion prevention
4. Test admin-to-admin deletion prevention

---

## 🔧 Troubleshooting

### Common Issues

**1. Admin User Not Created**

- Check application logs for seeding errors
- Manually run `create_admin_user.sql`
- Verify database connection

**2. Admin Controls Not Visible**

- Check admin status in database
- Verify AdminContext is properly wrapped
- Check browser console for errors

**3. Admin Operations Failing**

- Verify admin endpoints are accessible
- Check CORS configuration
- Validate admin user ID in requests

### Debug Commands

```sql
-- Check admin user status
SELECT user_id, username, admin FROM users WHERE username = 'admin';

-- Check admin role assignment
SELECT u.username, u.admin, r.role_name
FROM users u
LEFT JOIN user_roles ur ON u.user_id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.role_id
WHERE u.username = 'admin';

-- Check platform statistics
SELECT
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM users WHERE admin = true) as total_admins,
  (SELECT COUNT(*) FROM posts) as total_posts,
  (SELECT COUNT(*) FROM follows) as total_follows;
```

---

## 📝 Maintenance

### Regular Tasks

**1. Security Audits**

- Review admin access logs
- Monitor admin operations
- Update admin passwords regularly

**2. Data Cleanup**

- Monitor deleted user data cleanup
- Verify cascade deletions work properly
- Check for orphaned records

**3. Performance Monitoring**

- Monitor admin dashboard load times
- Check database query performance
- Optimize statistics queries if needed

### Backup Considerations

**Before Admin Operations:**

- Backup user data before bulk deletions
- Export important posts before cleanup
- Document admin actions for audit trail

---

## 🎯 Future Enhancements

### Potential Improvements

**1. Enhanced Admin Features**

- Bulk user operations
- Advanced user filtering
- Post moderation tools
- User suspension/activation

**2. Audit System**

- Detailed admin action logging
- Admin activity dashboard
- Change history tracking

**3. Multi-Admin Support**

- Admin role hierarchy
- Delegated admin permissions
- Admin invitation system

**4. Advanced Analytics**

- User engagement metrics
- Content moderation statistics
- Platform growth analytics

---

## 📞 Support

For issues with the admin feature:

1. Check this documentation first
2. Review application logs
3. Test with provided debug commands
4. Verify database schema and data

**Emergency Admin Access:**
If admin access is lost, use the manual SQL script (`create_admin_user.sql`) to recreate the admin account.

---

_This documentation covers the complete Super Admin feature implementation for CampusConnect. Keep this document updated as the feature evolves._
