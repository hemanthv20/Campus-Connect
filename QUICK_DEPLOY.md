# 🚀 Quick Deploy Guide - 15 Minutes to Live!

Follow these steps to deploy CampusConnect in under 15 minutes.

## ⚡ Step-by-Step Deployment

### Step 1: Database (3 minutes)

```bash
1. Go to https://railway.app/
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"
4. Copy DATABASE_URL from Variables tab
   Example: postgresql://postgres:xxx@containers-us-west-xxx.railway.app:5432/railway
```

### Step 2: Backend (5 minutes)

```bash
1. In Railway, click "New" → "GitHub Repo"
2. Select: Campus-connect-backend
3. Railway auto-detects Java and builds
4. Go to Variables tab, add:
   - DATABASE_URL: (paste from Step 1)
   - CORS_ORIGINS: * (we'll update this later)
5. Go to Settings → Generate Domain
6. Copy your backend URL: https://xxx.up.railway.app
```

### Step 3: Frontend (5 minutes)

```bash
1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import: Campus-connect-frontend
5. Configure:
   - Framework: Create React App
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: build
6. Add Environment Variable:
   - Key: REACT_APP_API_URL
   - Value: (paste backend URL from Step 2)
7. Click "Deploy"
8. Copy your frontend URL: https://xxx.vercel.app
```

### Step 4: Update CORS (2 minutes)

```bash
1. Go back to Railway backend
2. Update CORS_ORIGINS variable:
   - Value: https://your-frontend-url.vercel.app
3. Backend will auto-redeploy
```

## ✅ Test Your Deployment

1. Open your frontend URL
2. Try to register a new account
3. Login
4. Create a post
5. Test follow/unfollow
6. Test messaging

## 🎉 Done!

Your app is now live at:

- Frontend: https://your-app.vercel.app
- Backend: https://your-app.up.railway.app

---

## 📱 Share Your App

Share your frontend URL with friends:

```
https://your-app.vercel.app
```

## 🔧 Troubleshooting

**Can't connect to backend?**

- Check REACT_APP_API_URL in Vercel
- Verify backend is running in Railway
- Check CORS_ORIGINS includes your frontend URL

**Database errors?**

- Verify DATABASE_URL in Railway
- Check if Flyway migrations ran (check logs)
- Ensure PostgreSQL service is running

**Build failures?**

- Check build logs in Railway/Vercel
- Verify all dependencies are in package.json/pom.xml
- Try rebuilding

---

## 💡 Next Steps

1. **Custom Domain** (Optional)

   - Add custom domain in Vercel
   - Update CORS_ORIGINS in Railway

2. **Keep Backend Awake**

   - Use UptimeRobot.com (free)
   - Ping your backend every 5 minutes

3. **Monitor Usage**

   - Railway: 500 hours/month free
   - Check dashboard regularly

4. **Backup Database**
   - Export data from Railway dashboard
   - Keep local backups

---

**Need detailed instructions? See DEPLOYMENT_GUIDE.md**
