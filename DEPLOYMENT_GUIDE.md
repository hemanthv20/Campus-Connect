# CampusConnect Deployment Guide

## ✅ Pre-Deployment Checklist Complete

### Frontend Status

- ✅ Build successful with warnings (acceptable)
- ✅ Cross-env added for Windows compatibility
- ✅ Environment variables configured
- ✅ Firebase integration ready
- ✅ API endpoints configured

### Backend Status

- ✅ Maven build successful
- ✅ All dependencies resolved
- ✅ Docker configuration ready
- ✅ Database migrations prepared
- ✅ CORS configuration set

### Git Status

- ✅ All changes committed and pushed to GitHub
- ✅ Repository: https://github.com/hemanthv20/Campus-Connect.git

## 🚀 Deployment Instructions

### Backend Deployment (Docker/Render)

#### Option 1: Render Deployment (Recommended)

1. **Connect to Render:**

   - Go to https://render.com
   - Connect your GitHub account
   - Select the Campus-Connect repository

2. **Create Web Service:**

   - Choose "Web Service"
   - Select the `back-end` directory
   - Use these settings:
     ```
     Build Command: ./mvnw clean package -DskipTests
     Start Command: java -jar target/socialmedia-web-0.0.1-SNAPSHOT.jar
     ```

3. **Environment Variables:**

   ```
   PORT=8080
   DATABASE_URL=<your-postgres-connection-string>
   CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
   JPA_DDL_AUTO=update
   JPA_SHOW_SQL=false
   ```

4. **Database Setup:**
   - Create PostgreSQL database on Render
   - Update DATABASE_URL with connection string

#### Option 2: Docker Deployment

```bash
# Build Docker image
cd CampusConnect/back-end
docker build -t campusconnect-backend .

# Run with environment variables
docker run -p 8080:8080 \
  -e DATABASE_URL=your_db_url \
  -e CORS_ALLOWED_ORIGINS=your_frontend_url \
  campusconnect-backend
```

### Frontend Deployment (GitHub Pages/Netlify/Vercel)

#### Option 1: Netlify (Recommended)

1. **Connect Repository:**

   - Go to https://netlify.com
   - Connect GitHub repository
   - Select Campus-Connect repo

2. **Build Settings:**

   ```
   Base directory: front-end
   Build command: npm run build
   Publish directory: front-end/build
   ```

3. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-domain.onrender.com
   REACT_APP_FIREBASE_API_KEY=AIzaSyDpBQ2HrCURYsKvqTKQnpO_TiJjb956pOI
   REACT_APP_FIREBASE_AUTH_DOMAIN=campusconnect-10901.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=campusconnect-10901
   REACT_APP_FIREBASE_STORAGE_BUCKET=campusconnect-10901.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1076337721495
   REACT_APP_FIREBASE_APP_ID=1:1076337721495:web:1fe749ff4f6fd1f62ea9d2
   ```

#### Option 2: Vercel

1. **Import Project:**

   - Go to https://vercel.com
   - Import from GitHub
   - Select Campus-Connect repository

2. **Framework Preset:** React
3. **Root Directory:** `front-end`
4. **Build Command:** `npm run build`
5. **Output Directory:** `build`

#### Option 3: GitHub Pages

```bash
# Install gh-pages
cd CampusConnect/front-end
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/Campus-Connect",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings

After frontend deployment, update backend CORS_ALLOWED_ORIGINS:

```
CORS_ALLOWED_ORIGINS=https://your-actual-frontend-domain.com
```

### 2. Update Frontend API URL

Update frontend environment variable:

```
REACT_APP_API_URL=https://your-actual-backend-domain.com
```

### 3. Database Setup

Run these SQL scripts on your production database:

- `complete_setup.sql` - Full schema
- `insert_skills_complete.sql` - Seed data

### 4. Test Deployment

1. ✅ User registration/login
2. ✅ Feed functionality (create, read, update, delete posts)
3. ✅ Follow/unfollow features
4. ✅ Chat functionality
5. ✅ Profile management
6. ✅ Search and discovery

## 🌐 Current Deployment URLs

### Backend

- **Current:** https://campus-connect-backend-or3b.onrender.com
- **Status:** ✅ Active and working

### Frontend

- **Repository:** https://github.com/hemanthv20/Campus-Connect.git
- **Ready for deployment to:** Netlify, Vercel, or GitHub Pages

## 📝 Next Steps

1. **Deploy Frontend:** Choose Netlify, Vercel, or GitHub Pages
2. **Update Environment Variables:** Set correct API URLs
3. **Test All Features:** Verify complete functionality
4. **Monitor Performance:** Check logs and metrics
5. **Set up CI/CD:** Automate future deployments

## 🆘 Troubleshooting

### Common Issues:

1. **CORS Errors:** Update CORS_ALLOWED_ORIGINS
2. **API Connection:** Verify REACT_APP_API_URL
3. **Build Failures:** Check environment variables
4. **Database Issues:** Verify connection string

### Support:

- Check deployment logs
- Verify environment variables
- Test API endpoints manually
- Review browser console for errors

---

**Status:** ✅ Ready for Production Deployment
**Last Updated:** November 27, 2024
