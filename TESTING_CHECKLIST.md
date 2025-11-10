# CampusConnect - Testing Checklist

## 🧪 Complete Testing Guide

Use this checklist to verify all improvements are working correctly.

---

## ✅ Pre-Testing Setup

- [ ] Backend is running on http://localhost:8081
- [ ] Frontend is running on http://localhost:3000
- [ ] PostgreSQL database is running
- [ ] Database `socialmedia_db` exists
- [ ] Browser console is open (F12) for debugging

---

## 🔐 Authentication Tests

### Registration

- [ ] Navigate to http://localhost:3000/register
- [ ] Try submitting empty form → Should show validation errors
- [ ] Enter invalid email → Should show "Please enter a valid email"
- [ ] Enter weak password → Should show password strength as "weak"
- [ ] Enter strong password → Should show password strength as "strong"
- [ ] Enter username with spaces → Should show validation error
- [ ] Enter username < 3 characters → Should show validation error
- [ ] Upload image > 5MB → Should show file size error
- [ ] Upload non-image file → Should show file type error
- [ ] Fill all fields correctly → Should register successfully
- [ ] Try registering same username → Should show "Username already in use"
- [ ] Try registering same email → Should show "Email already in use"
- [ ] Check database → Password should start with `$2a$` (hashed)

### Login

- [ ] Navigate to http://localhost:3000/login
- [ ] Try submitting empty form → Should show validation errors
- [ ] Enter wrong username → Should show "Invalid username or password"
- [ ] Enter wrong password → Should show "Invalid username or password"
- [ ] Enter correct credentials → Should redirect to /feed
- [ ] Check localStorage → Should have 'isLoggedIn' and 'user' items
- [ ] Try accessing /login while logged in → Should redirect to /feed

### Logout

- [ ] Click "Logout" in navbar
- [ ] Should redirect to landing page
- [ ] localStorage should be cleared
- [ ] Try accessing /feed → Should redirect to landing page

---

## 🏠 Landing Page Tests

- [ ] Navigate to http://localhost:3000/
- [ ] Page should load with hero image and text
- [ ] "Log In" button should be visible
- [ ] "Register" button should be visible
- [ ] Click "Log In" → Should navigate to /login
- [ ] Click "Register" → Should navigate to /register
- [ ] If logged in, should auto-redirect to /feed
- [ ] Test on mobile (resize browser) → Should be responsive

---

## 📝 Feed Tests

### Viewing Feed

- [ ] Navigate to /feed (must be logged in)
- [ ] Loading spinner should appear briefly
- [ ] Posts should load and display
- [ ] Each post should show:
  - [ ] User profile picture
  - [ ] User name
  - [ ] Username (clickable)
  - [ ] College info (if available)
  - [ ] Post content
  - [ ] Post date
  - [ ] Media (if attached)
- [ ] Posts should be sorted by newest first

### Creating Posts

- [ ] Text-only post:
  - [ ] Type message in text area
  - [ ] Click "Create Post"
  - [ ] Post should appear at top of feed
  - [ ] Text area should clear
- [ ] Post with image:
  - [ ] Click image icon
  - [ ] Select image file
  - [ ] Preview should appear
  - [ ] Click "Create Post"
  - [ ] Post should appear with image
- [ ] Post with video:
  - [ ] Click video icon
  - [ ] Select video file
  - [ ] Preview should appear
  - [ ] Click "Create Post"
  - [ ] Post should appear with video player
- [ ] Empty post → Should still create (content is optional)

### Editing Posts

- [ ] Find your own post
- [ ] Click three dots menu
- [ ] Click "Edit"
- [ ] Modal should open showing original post
- [ ] Modify content
- [ ] Click "Save Changes"
- [ ] Post should update in feed
- [ ] Click "Close" → Should close without saving

### Deleting Posts

- [ ] Find your own post
- [ ] Click three dots menu
- [ ] Click "Delete"
- [ ] Confirmation dialog should appear
- [ ] Click "OK" → Post should be removed
- [ ] Try deleting someone else's post (if not admin) → Should not see option

### Post Interactions

- [ ] Click on username → Should navigate to profile
- [ ] Click on links in post content → Should open in new tab
- [ ] Play video in post → Should play correctly
- [ ] View image in post → Should display correctly

---

## 👤 Profile Tests

### Viewing Own Profile

- [ ] Click on your username in navbar
- [ ] Should navigate to /profile/yourusername
- [ ] Profile header should show:
  - [ ] Cover image (gradient)
  - [ ] Profile picture
  - [ ] Full name
  - [ ] Username
  - [ ] Admin badge (if admin)
  - [ ] College information
  - [ ] Email
- [ ] Posts section should show your posts
- [ ] Post count should be accurate
- [ ] Posts should display in grid layout
- [ ] Hover over post → Delete button should appear
- [ ] Click delete → Should remove post

### Viewing Other Profiles

- [ ] Click on another user's username
- [ ] Should navigate to their profile
- [ ] Should see their information
- [ ] Should see their posts
- [ ] Should NOT see delete button (unless you're admin)
- [ ] Test with user who has no posts → Should show "No posts yet"

### Profile Responsiveness

- [ ] Resize browser to mobile size
- [ ] Profile should stack vertically
- [ ] Posts should show in single column
- [ ] All information should be readable

---

## 👨‍💼 Admin Tests (Admin Users Only)

### Accessing Admin Dashboard

- [ ] Login as admin user
- [ ] "Admin" link should appear in navbar
- [ ] Click "Admin" → Should navigate to /admin
- [ ] Non-admin users should not see "Admin" link
- [ ] Non-admin trying to access /admin → Should redirect to /feed

### Admin Dashboard

- [ ] Statistics cards should show:
  - [ ] Total Users count
  - [ ] Admins count
  - [ ] Regular Users count
- [ ] All numbers should be accurate

### User Management

- [ ] User table should display all users
- [ ] Each row should show:
  - [ ] Profile picture
  - [ ] Name
  - [ ] Username
  - [ ] Email
  - [ ] College info
  - [ ] Gender
  - [ ] Role badge
  - [ ] Action buttons
- [ ] Search functionality:
  - [ ] Type in search box
  - [ ] Results should filter in real-time
  - [ ] Search should work for name, username, email
- [ ] Gender filter:
  - [ ] Select "Male" → Should show only male users
  - [ ] Select "Female" → Should show only female users
  - [ ] Select "Other" → Should show other users
  - [ ] Select "All" → Should show all users
- [ ] View user:
  - [ ] Click eye icon
  - [ ] Should navigate to user's profile
- [ ] Delete user:
  - [ ] Click trash icon
  - [ ] Confirmation dialog should appear
  - [ ] Click "OK" → User should be removed
  - [ ] Cannot delete yourself → Button should not appear

### Admin Responsiveness

- [ ] Test on mobile → Table should scroll horizontally
- [ ] Stats cards should stack vertically
- [ ] Filters should stack vertically

---

## 🔍 Search Tests

### Navbar Search

- [ ] Type in search box
- [ ] Autocomplete should appear after 2 characters
- [ ] Wait 300ms → Suggestions should load
- [ ] Suggestions should match search term
- [ ] Click on suggestion → Should navigate to profile
- [ ] Press Enter → Should search and navigate
- [ ] Search for non-existent user → Should show "Invalid user"
- [ ] Clear search → Autocomplete should disappear

### Gender Filter in Search

- [ ] Select gender from dropdown
- [ ] Search results should filter by gender
- [ ] Change gender → Results should update

---

## 📱 Responsive Design Tests

### Mobile (< 480px)

- [ ] Resize browser to 400px width
- [ ] Landing page:
  - [ ] Image and content should stack
  - [ ] Buttons should be full width
- [ ] Login/Register:
  - [ ] Forms should be full width
  - [ ] Images should be smaller or hidden
- [ ] Navbar:
  - [ ] Search should move to new row
  - [ ] Profile username should hide
  - [ ] Links should be compact
- [ ] Feed:
  - [ ] Posts should be full width
  - [ ] Create post should stack vertically
- [ ] Profile:
  - [ ] Cover should be shorter
  - [ ] Info should stack
  - [ ] Posts should be single column

### Tablet (480px - 768px)

- [ ] Resize browser to 600px width
- [ ] All layouts should adapt
- [ ] Two-column layouts where appropriate
- [ ] Touch targets should be large enough

### Desktop (> 768px)

- [ ] Resize browser to 1200px width
- [ ] Full layouts should display
- [ ] Hover effects should work
- [ ] Multi-column layouts should show

---

## 🎨 Visual Tests

### Animations

- [ ] Page transitions should be smooth
- [ ] Buttons should have hover effects
- [ ] Cards should elevate on hover
- [ ] Loading spinners should rotate
- [ ] Modals should fade in
- [ ] Dropdowns should slide in

### Colors & Theming

- [ ] Primary color (indigo) should be consistent
- [ ] Buttons should have gradient backgrounds
- [ ] Error messages should be red
- [ ] Success indicators should be green
- [ ] Text should be readable on all backgrounds

### Typography

- [ ] Headings should be bold and clear
- [ ] Body text should be readable
- [ ] Font sizes should be appropriate
- [ ] Line heights should be comfortable

---

## ⚡ Performance Tests

### Loading Times

- [ ] Initial page load < 3 seconds
- [ ] Feed loads < 2 seconds
- [ ] Profile loads < 2 seconds
- [ ] Search autocomplete < 500ms
- [ ] Image uploads < 5 seconds

### Interactions

- [ ] Button clicks respond immediately
- [ ] Form submissions show loading state
- [ ] No lag when typing
- [ ] Smooth scrolling

---

## 🐛 Error Handling Tests

### Network Errors

- [ ] Stop backend server
- [ ] Try to login → Should show connection error
- [ ] Try to load feed → Should show error
- [ ] Try to create post → Should show error
- [ ] Start backend → Everything should work again

### Invalid Data

- [ ] Submit form with invalid email → Should show error
- [ ] Submit form with short password → Should show error
- [ ] Upload huge file → Should show error
- [ ] Upload wrong file type → Should show error

### Edge Cases

- [ ] Create post with very long text → Should handle gracefully
- [ ] Upload image with special characters in name → Should work
- [ ] Search for user with special characters → Should work
- [ ] Rapid clicking on buttons → Should not cause issues

---

## 🔒 Security Tests

### Password Security

- [ ] Check database → Passwords should start with `$2a$`
- [ ] Passwords should never appear in network requests
- [ ] Passwords should never appear in console logs
- [ ] Login with wrong password → Should fail
- [ ] Login with correct password → Should succeed

### Authentication

- [ ] Access /feed without login → Should redirect to /
- [ ] Access /profile without login → Should redirect to /
- [ ] Access /admin without login → Should redirect to /
- [ ] Access /admin as non-admin → Should redirect to /feed
- [ ] Logout → Should clear all auth data

### Input Validation

- [ ] Try SQL injection in forms → Should be sanitized
- [ ] Try XSS in post content → Should be escaped
- [ ] Try uploading executable file → Should be rejected

---

## 📊 Data Integrity Tests

### User Data

- [ ] Register new user → Should save all fields
- [ ] Check database → All fields should be present
- [ ] Update user → Changes should persist
- [ ] Delete user → Should remove from database

### Post Data

- [ ] Create post → Should save correctly
- [ ] Edit post → Should update correctly
- [ ] Delete post → Should remove from database
- [ ] Posts should maintain user relationship

---

## 🌐 Browser Compatibility Tests

Test on multiple browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

For each browser, verify:

- [ ] All pages load correctly
- [ ] All features work
- [ ] Styling is consistent
- [ ] No console errors

---

## ✅ Final Checklist

Before considering testing complete:

- [ ] All authentication flows work
- [ ] All CRUD operations work
- [ ] All validations work
- [ ] All error messages display correctly
- [ ] All loading states appear
- [ ] All responsive breakpoints work
- [ ] All animations are smooth
- [ ] No console errors
- [ ] No console warnings
- [ ] No broken images
- [ ] No broken links
- [ ] Database operations work correctly
- [ ] Security measures are in place
- [ ] Performance is acceptable

---

## 🐛 Bug Reporting Template

If you find a bug, document it:

```
**Bug Title**: [Short description]

**Steps to Reproduce**:
1. Go to...
2. Click on...
3. See error

**Expected Behavior**: [What should happen]

**Actual Behavior**: [What actually happens]

**Screenshots**: [If applicable]

**Browser**: [Chrome/Firefox/Safari/Edge]

**Console Errors**: [Any errors in console]

**Additional Context**: [Any other relevant information]
```

---

## 📈 Performance Metrics

Track these metrics:

- **Page Load Time**: < 3 seconds
- **Time to Interactive**: < 2 seconds
- **First Contentful Paint**: < 1 second
- **API Response Time**: < 500ms
- **Image Load Time**: < 2 seconds

---

## 🎉 Testing Complete!

Once all items are checked:

1. ✅ Document any issues found
2. ✅ Fix critical bugs
3. ✅ Re-test fixed issues
4. ✅ Get approval from stakeholders
5. ✅ Prepare for deployment

---

**Happy Testing! 🧪**

**Last Updated**: November 2025
