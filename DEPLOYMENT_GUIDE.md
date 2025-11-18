# 🚀 CampusConnect - Free Deployment Guide

Complete guide to deploy your full-stack social media application for **FREE**.

## 📋 Table of Contents

1. [Recommended Free Hosting Stack](#recommended-stack)
2. [Database Setup (PostgreSQL)](#database-setup)
3. [Backend Deployment (Spring Boot)](#backend-deployment)
4. [Frontend Deployment (React)](#frontend-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Testing & Troubleshooting](#testing)

---

## 🎯 Recommended Free Hosting Stack

### Best Free Combination:

- **Database**: Railway (500MB free) or Supabase (500MB free)
- **Backend**: Railway (500 hours/month free) or Render (750 hours/month free)
- **Frontend**: Vercel (unlimited) or Netlify (unlimited)

### Why This Stack?

- ✅ All services have generous free tiers
- ✅ Easy deployment from GitHub
- ✅ Automatic HTTPS/SSL
- ✅ Good uptime and performance
- ✅ No credit card required (for most)

---

## 🗄️ Database Setup (PostgreSQL)

### Option 1: Railway (Recommended)

#### Step 1: Create Railway Account

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project"

#### Step 2: Add PostgreSQL Database

```bash
1. Click "New" → "Database" → "Add PostgreSQL"
2. Wait for provisioning (1-2 minutes)
3. Click on the PostgreSQL service
4. Go to "Variables" tab
5. Copy these values:
   - DATABASE_URL (full connection string)
   - PGHOST
   - PGPORT
   - PGDATABASE
   - PGUSER
   - PGPASSWORD
```

#### Step 3: Get Connection Details

Your connection string will look like:

```
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
```

**Free Tier Limits:**

- 500MB storage
- Shared CPU
- 500 hours/month execution time
- No credit card required

---

### Option 2: Supabase (Alternative)

#### Step 1: Create Supabase Account

1. Go to [Supabase.com](https://supabase.com/)
2. Sign up with GitHub
3. Click "New Project"

#### Step 2: Create Database

```bash
1. Enter project name: "campusconnect"
2. Set database password (save this!)
3. Choose region (closest to you)
4. Click "Create new project"
5. Wait 2-3 minutes for setup
```

#### Step 3: Get Connection String

```bash
1. Go to Project Settings → Database
2. Copy "Connection string" under "Connection pooling"
3. Replace [YOUR-PASSWORD] with your actual password
```

Connection string format:

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
```

**Free Tier Limits:**

- 500MB database space
- Unlimited API requests
- 50,000 monthly active users
- No credit card required

---

## 🔧 Backend Deployment (Spring Boot)

### Option 1: Railway (Recommended for Java)

#### Step 1: Prepare Your Backend

Create `railway.json` in your backend root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "java -jar target/socialmedia-web-0.0.1-SNAPSHOT.jar",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Create `nixpacks.toml` in your backend root:

```toml
[phases.setup]
nixPkgs = ['maven', 'jdk17']

[phases.build]
cmds = ['mvn clean package -DskipTests']

[start]
cmd = 'java -Dserver.port=$PORT -jar target/socialmedia-web-0.0.1-SNAPSHOT.jar'
```

#### Step 2: Update application.properties

Replace your `application.properties` with:

```properties
# Database Configuration (Railway will inject these)
spring.datasource.url=${DATABASE_URL}
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# Flyway
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
spring.flyway.locations=classpath:db/migration

# Server
server.port=${PORT:8080}

# CORS (update with your frontend URL later)
cors.allowed.origins=${CORS_ORIGINS:http://localhost:3000}
```

#### Step 3: Deploy to Railway

```bash
# Method 1: Deploy from GitHub (Recommended)
1. Push your backend code to GitHub
2. Go to Railway dashboard
3. Click "New" → "GitHub Repo"
4. Select your backend repository
5. Railway will auto-detect and build

# Method 2: Deploy with Railway CLI
1. Install Railway CLI:
   npm install -g @railway/cli

2. Login:
   railway login

3. Navigate to backend folder:
   cd CampusConnect/back-end

4. Initialize:
   railway init

5. Link to your project:
   railway link

6. Deploy:
   railway up
```

#### Step 4: Configure Environment Variables

In Railway dashboard:

```bash
1. Click on your backend service
2. Go to "Variables" tab
3. Add these variables:
   - DATABASE_URL: (copy from PostgreSQL service)
   - CORS_ORIGINS: https://your-frontend-url.vercel.app
   - PORT: 8080 (Railway auto-assigns, but good to set)
```

#### Step 5: Get Your Backend URL

```bash
1. Go to "Settings" tab
2. Click "Generate Domain"
3. Your backend URL: https://your-app.up.railway.app
4. Save this URL for frontend configuration
```

**Free Tier Limits:**

- 500 hours/month
- $5 credit/month
- Shared CPU/RAM
- Auto-sleep after inactivity (wakes on request)

---

### Option 2: Render (Alternative)

#### Step 1: Create Render Account

1. Go to [Render.com](https://render.com/)
2. Sign up with GitHub

#### Step 2: Create Web Service

```bash
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - Name: campusconnect-backend
   - Environment: Java
   - Build Command: mvn clean package -DskipTests
   - Start Command: java -jar target/socialmedia-web-0.0.1-SNAPSHOT.jar
   - Instance Type: Free
```

#### Step 3: Add Environment Variables

```bash
DATABASE_URL=your_postgresql_connection_string
CORS_ORIGINS=https://your-frontend-url.vercel.app
PORT=8080
```

#### Step 4: Deploy

```bash
1. Click "Create Web Service"
2. Wait for build (5-10 minutes first time)
3. Your URL: https://campusconnect-backend.onrender.com
```

**Free Tier Limits:**

- 750 hours/month
- Spins down after 15 min inactivity
- 512MB RAM
- Shared CPU

---

## 🎨 Frontend Deployment (React)

### Option 1: Vercel (Recommended)

#### Step 1: Prepare Frontend

Create `.env.production` in frontend root:

```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```

Update `package.json` to ensure build script exists:

```json
{
  "scripts": {
    "build": "react-scripts build",
    "start": "react-scripts start"
  }
}
```

#### Step 2: Deploy to Vercel

```bash
# Method 1: Deploy from GitHub (Easiest)
1. Go to [Vercel.com](https://vercel.com/)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your frontend repository
5. Configure:
   - Framework Preset: Create React App
   - Root Directory: front-end (if in monorepo)
   - Build Command: npm run build
   - Output Directory: build
6. Add Environment Variable:
   - REACT_APP_API_URL: https://your-backend-url.railway.app
7. Click "Deploy"

# Method 2: Deploy with Vercel CLI
1. Install Vercel CLI:
   npm install -g vercel

2. Navigate to frontend:
   cd CampusConnect/front-end

3. Login:
   vercel login

4. Deploy:
   vercel

5. Follow prompts:
   - Set up and deploy? Yes
   - Which scope? Your account
   - Link to existing project? No
   - Project name: campusconnect
   - Directory: ./
   - Override settings? No

6. Deploy to production:
   vercel --prod
```

#### Step 3: Configure Custom Domain (Optional)

```bash
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
```

#### Step 4: Fix React Router (SPA)

Vercel automatically handles this, but verify:

```bash
1. Create vercel.json in frontend root:
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}

2. Commit and push
3. Vercel will auto-redeploy
```

**Free Tier Limits:**

- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Global CDN
- No credit card required

---

### Option 2: Netlify (Alternative)

#### Step 1: Deploy to Netlify

```bash
# Method 1: Drag and Drop
1. Build locally:
   cd CampusConnect/front-end
   npm run build

2. Go to [Netlify.com](https://netlify.com/)
3. Drag the 'build' folder to Netlify

# Method 2: GitHub Integration
1. Sign up with GitHub
2. Click "Add new site" → "Import existing project"
3. Choose GitHub
4. Select repository
5. Configure:
   - Base directory: front-end
   - Build command: npm run build
   - Publish directory: front-end/build
6. Add environment variables:
   - REACT_APP_API_URL: your backend URL
7. Deploy
```

#### Step 2: Fix React Router

Create `public/_redirects` file:

```
/*    /index.html   200
```

**Free Tier Limits:**

- 100GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS
- Global CDN

---

## ⚙️ Environment Configuration

### Backend Environment Variables

```properties
# Railway/Render Dashboard
DATABASE_URL=postgresql://user:pass@host:5432/dbname
CORS_ORIGINS=https://your-frontend.vercel.app,https://your-frontend.netlify.app
PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

### Frontend Environment Variables

```env
# Vercel/Netlify Dashboard
REACT_APP_API_URL=https://your-backend.railway.app
```

### Update CORS in Backend

In your controllers, update CORS origins:

```java
@CrossOrigin(origins = "${cors.allowed.origins}")
```

Or create a global CORS configuration:

```java
@Configuration
public class CorsConfig {
    @Value("${cors.allowed.origins}")
    private String allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(allowedOrigins.split(","))
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

---

## 🧪 Testing & Troubleshooting

### Test Your Deployment

#### 1. Test Database Connection

```bash
# Use a PostgreSQL client or Railway/Supabase dashboard
# Verify tables were created by Flyway
```

#### 2. Test Backend API

```bash
# Test health endpoint
curl https://your-backend.railway.app/actuator/health

# Test a public endpoint
curl https://your-backend.railway.app/feed
```

#### 3. Test Frontend

```bash
# Open in browser
https://your-frontend.vercel.app

# Check browser console for errors
# Verify API calls are going to correct backend URL
```

### Common Issues & Solutions

#### Issue 1: Backend Not Starting

```bash
Solution:
1. Check Railway/Render logs
2. Verify DATABASE_URL is set correctly
3. Ensure PORT variable is set
4. Check if JAR file was built successfully
```

#### Issue 2: CORS Errors

```bash
Solution:
1. Add frontend URL to CORS_ORIGINS
2. Include both http and https versions
3. Restart backend service
4. Clear browser cache
```

#### Issue 3: Database Connection Failed

```bash
Solution:
1. Verify DATABASE_URL format
2. Check if database service is running
3. Ensure Flyway migrations completed
4. Check database logs
```

#### Issue 4: Frontend Can't Reach Backend

```bash
Solution:
1. Verify REACT_APP_API_URL is correct
2. Check if backend is awake (Railway/Render sleep)
3. Test backend URL directly in browser
4. Check browser network tab for errors
```

#### Issue 5: Build Failures

```bash
Backend:
- Check Java version (should be 11 or 17)
- Verify Maven dependencies
- Check pom.xml for errors

Frontend:
- Run npm install
- Check for missing dependencies
- Verify build command
```

---

## 📊 Monitoring & Maintenance

### Keep Services Awake

#### Backend (Prevent Sleep)

```bash
# Option 1: Use UptimeRobot (free)
1. Go to uptimerobot.com
2. Add monitor for your backend URL
3. Check every 5 minutes

# Option 2: Use Cron-job.org
1. Go to cron-job.org
2. Create job to ping your backend
3. Set interval to 10 minutes
```

#### Monitor Logs

```bash
# Railway
1. Click on service
2. View "Deployments" tab
3. Click "View Logs"

# Render
1. Go to service dashboard
2. Click "Logs" tab
3. View real-time logs
```

---

## 🎉 Deployment Checklist

### Pre-Deployment

- [ ] Code pushed to GitHub
- [ ] Firebase configured
- [ ] Environment variables documented
- [ ] Build tested locally

### Database

- [ ] PostgreSQL created on Railway/Supabase
- [ ] Connection string obtained
- [ ] Flyway migrations ready

### Backend

- [ ] Deployed to Railway/Render
- [ ] Environment variables set
- [ ] DATABASE_URL configured
- [ ] CORS_ORIGINS configured
- [ ] Backend URL obtained and tested

### Frontend

- [ ] Deployed to Vercel/Netlify
- [ ] REACT_APP_API_URL set to backend URL
- [ ] React Router configured
- [ ] Build successful
- [ ] Site accessible

### Testing

- [ ] Database tables created
- [ ] Backend API responding
- [ ] Frontend loads correctly
- [ ] Can create account
- [ ] Can login
- [ ] Can create post
- [ ] Can follow users
- [ ] Can send messages

---

## 🔗 Quick Links

### Your Deployed URLs

```
Frontend: https://campusconnect.vercel.app
Backend: https://campusconnect.up.railway.app
Database: Railway PostgreSQL
```

### Service Dashboards

- Railway: https://railway.app/dashboard
- Vercel: https://vercel.com/dashboard
- Supabase: https://app.supabase.com/

---

## 💡 Pro Tips

1. **Use GitHub for Continuous Deployment**

   - Push to main branch = auto-deploy
   - No manual deployment needed

2. **Monitor Your Free Tier Usage**

   - Railway: 500 hours/month
   - Render: 750 hours/month
   - Check dashboards regularly

3. **Optimize for Free Tier**

   - Minimize database queries
   - Use caching where possible
   - Optimize images before upload

4. **Backup Your Database**

   - Railway: Use pg_dump
   - Supabase: Built-in backups
   - Export data regularly

5. **Use Environment Variables**
   - Never hardcode URLs
   - Easy to switch environments
   - More secure

---

## 🆘 Need Help?

### Resources

- Railway Docs: https://docs.railway.app/
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Supabase Docs: https://supabase.com/docs

### Community

- Railway Discord: https://discord.gg/railway
- Vercel Discord: https://discord.gg/vercel
- Stack Overflow: Tag your questions appropriately

---

**🎊 Congratulations! Your CampusConnect app is now live and accessible worldwide for FREE!**
