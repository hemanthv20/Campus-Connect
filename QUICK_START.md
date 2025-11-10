# CampusConnect - Quick Start Guide

## 🚀 Getting Started with the Improved Version

### What's New?

Your CampusConnect application has been completely modernized with:

- 🎨 Beautiful, modern UI with smooth animations
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔒 Secure password hashing with BCrypt
- ✅ Comprehensive form validation
- ⚡ Loading states and better user feedback
- 🐛 All major bugs fixed
- 🧹 Clean, maintainable code

---

## 📋 Prerequisites

Before running the application, ensure you have:

1. **Java 17+** installed
2. **Node.js 16+** and npm installed
3. **PostgreSQL** database running
4. **Maven** (comes with the project)

---

## 🔧 Setup Instructions

### Step 1: Database Setup

1. Make sure PostgreSQL is running on port 5432
2. Create a database named `socialmedia_db`:
   ```sql
   CREATE DATABASE socialmedia_db;
   ```
3. Update credentials in `back-end/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd CampusConnect/back-end

# Run the Spring Boot application
./mvnw spring-boot:run

# On Windows, use:
mvnw.cmd spring-boot:run
```

The backend will start on **http://localhost:8081**

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd CampusConnect/front-end

# Install dependencies (first time only)
npm install

# Start the development server
npm start
```

The frontend will start on **http://localhost:3000**

---

## 🎯 Key Features Guide

### For Regular Users

#### 1. **Registration**

- Fill out all required fields (marked with \*)
- Username must be 3-20 characters (letters, numbers, underscores)
- Password must be 8+ characters with uppercase, lowercase, and number
- Watch the password strength indicator
- Upload a profile picture (optional, max 5MB)
- Add your college information

#### 2. **Login**

- Enter your username and password
- You'll be redirected to the feed automatically
- Error messages will guide you if credentials are incorrect

#### 3. **Feed**

- Create posts with text, images, or videos
- View all posts from other users
- Edit or delete your own posts
- Click on usernames to view profiles

#### 4. **Profile**

- View your profile and posts
- See other users' profiles
- Delete your posts from your profile

#### 5. **Search**

- Use the search bar in the navbar
- Autocomplete suggestions appear as you type
- Filter by gender if needed
- Click on suggestions to view profiles

### For Admins

#### 1. **Admin Dashboard**

- Access via the "Admin" link in navbar
- View statistics (total users, admins, regular users)
- Search and filter users
- View user profiles
- Delete users (except yourself)

---

## 🎨 UI Components

### Buttons

- **Primary**: Blue gradient buttons for main actions
- **Secondary**: Outlined buttons for secondary actions
- **Danger**: Red buttons for delete actions

### Forms

- All inputs have focus states with blue borders
- Error states show red borders and error messages
- Success states show green indicators
- Loading states disable inputs and show spinners

### Cards

- Hover effects with elevation
- Smooth transitions
- Consistent padding and spacing

---

## 🔒 Security Features

### Password Security

- All passwords are hashed using BCrypt
- Passwords are never stored in plain text
- Secure authentication process

### Form Validation

- Client-side validation prevents invalid data
- Server-side validation as backup
- Clear error messages guide users

---

## 📱 Responsive Design

### Mobile (< 480px)

- Single column layouts
- Larger touch targets
- Simplified navigation
- Optimized images

### Tablet (480px - 768px)

- Two-column layouts where appropriate
- Balanced spacing
- Touch-friendly interface

### Desktop (> 768px)

- Full multi-column layouts
- Hover effects
- Optimal spacing and typography

---

## 🐛 Troubleshooting

### Backend Won't Start

```bash
# Check if Java is installed
java -version

# Check if port 8081 is available
# On Windows:
netstat -ano | findstr :8081

# On Mac/Linux:
lsof -i :8081
```

### Frontend Won't Start

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check if port 3000 is available
```

### Database Connection Issues

1. Verify PostgreSQL is running
2. Check database name is `socialmedia_db`
3. Verify username and password in `application.properties`
4. Check port 5432 is accessible

### Login Not Working

1. Make sure backend is running
2. Check browser console for errors
3. Verify credentials are correct
4. Clear browser cache and cookies

---

## 📊 API Endpoints

### User Endpoints

- `POST /createuser` - Register new user
- `POST /login` - User login
- `GET /users` - Get all users (admin)
- `GET /users/search/{username}` - Search user
- `GET /users/autocomplete/{term}` - Autocomplete search
- `PUT /updateuser` - Update user
- `DELETE /deleteuser/{id}` - Delete user (admin)

### Post Endpoints

- `POST /createpost` - Create new post
- `GET /feed` - Get all posts
- `GET /post/{id}` - Get specific post
- `GET /posts/user/{userId}` - Get user's posts
- `PUT /updatepost` - Update post
- `DELETE /deletepost/{id}` - Delete post

---

## 🎓 Best Practices

### For Users

1. Use strong passwords (8+ characters, mixed case, numbers)
2. Upload appropriate profile pictures
3. Be respectful in posts
4. Report inappropriate content to admins

### For Admins

1. Regularly monitor user activity
2. Remove inappropriate content promptly
3. Don't delete your own admin account
4. Keep user data secure

### For Developers

1. Always test changes locally first
2. Keep dependencies updated
3. Follow the existing code style
4. Add comments for complex logic
5. Test on multiple devices

---

## 🔄 Common Tasks

### Creating a Post

1. Go to Feed page
2. Type your message in the text area
3. (Optional) Click image or video icon to upload media
4. Click "Create Post" button
5. Post appears at the top of the feed

### Editing a Post

1. Find your post in the feed
2. Click the three dots menu
3. Click "Edit"
4. Modify the content
5. Click "Save Changes"

### Deleting a Post

1. Find your post
2. Click the three dots menu
3. Click "Delete"
4. Confirm deletion

### Viewing a Profile

1. Click on any username in posts
2. Or use the search bar
3. View user information and posts

---

## 📈 Performance Tips

1. **Images**: Keep profile pictures under 5MB
2. **Posts**: Avoid extremely long text posts
3. **Browser**: Use modern browsers (Chrome, Firefox, Safari, Edge)
4. **Cache**: Clear browser cache if experiencing issues
5. **Network**: Ensure stable internet connection

---

## 🎉 Enjoy Your Improved CampusConnect!

The application is now:

- ✅ More secure
- ✅ More user-friendly
- ✅ More responsive
- ✅ More maintainable
- ✅ More professional

Happy connecting! 🚀

---

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console (F12)
2. Check the backend logs
3. Verify all services are running
4. Review the IMPROVEMENTS.md file for detailed changes

---

**Last Updated**: November 2025
**Version**: 2.0 (Improved)
