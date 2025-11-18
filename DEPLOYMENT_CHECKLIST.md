# ✅ Deployment Checklist

Use this checklist to ensure smooth deployment of CampusConnect.

## 📋 Pre-Deployment

### Code Preparation

- [ ] All code committed to GitHub
- [ ] Backend repository: `Campus-connect-backend`
- [ ] Frontend repository: `Campus-connect-frontend`
- [ ] Firebase configuration completed
- [ ] All features tested locally

### Accounts Created

- [ ] GitHub account (for code hosting)
- [ ] Railway account (for database & backend)
- [ ] Vercel account (for frontend)
- [ ] Firebase account (for media storage)

---

## 🗄️ Database Deployment

### Railway PostgreSQL

- [ ] Railway account created
- [ ] New project created
- [ ] PostgreSQL database provisioned
- [ ] DATABASE_URL copied
- [ ] Connection tested

### Connection Details Saved

```
DATABASE_URL: postgresql://postgres:xxx@xxx.railway.app:5432/railway
PGHOST: xxx.railway.app
PGPORT: 5432
PGDATABASE: railway
PGUSER: postgres
PGPASSWORD: xxx
```

---

## 🔧 Backend Deployment

### Railway Setup

- [ ] Backend repository connected
- [ ] Build detected (Maven/Java)
- [ ] Environment variables added:
  - [ ] DATABASE_URL
  - [ ] CORS_ORIGINS
  - [ ] PORT (8080)
- [ ] Domain generated
- [ ] Backend URL saved: `https://xxx.up.railway.app`

### Build & Deploy

- [ ] First build completed successfully
- [ ] Flyway migrations ran
- [ ] Database tables created
- [ ] Backend is accessible
- [ ] Health check endpoint works

### Testing Backend

```bash
# Test these endpoints:
- [ ] GET /feed (should return empty array or posts)
- [ ] GET /users (should return users list)
- [ ] POST /createuser (test user creation)
- [ ] POST /login (test authentication)
```

---

## 🎨 Frontend Deployment

### Vercel Setup

- [ ] Frontend repository connected
- [ ] Framework detected (Create React App)
- [ ] Build command set: `npm run build`
- [ ] Output directory set: `build`
- [ ] Environment variable added:
  - [ ] REACT_APP_API_URL: `https://xxx.up.railway.app`
- [ ] Domain generated
- [ ] Frontend URL saved: `https://xxx.vercel.app`

### Build & Deploy

- [ ] First build completed successfully
- [ ] No build errors
- [ ] Site is accessible
- [ ] React Router working (no 404 on refresh)

### Testing Frontend

- [ ] Homepage loads
- [ ] Can navigate to login page
- [ ] Can navigate to register page
- [ ] No console errors
- [ ] API calls reaching backend

---

## 🔗 Integration Testing

### CORS Configuration

- [ ] Frontend URL added to CORS_ORIGINS
- [ ] Backend redeployed with new CORS settings
- [ ] No CORS errors in browser console

### Full Flow Testing

- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can view feed
- [ ] Can create post
- [ ] Can upload image/video
- [ ] Can view profile
- [ ] Can follow/unfollow users
- [ ] Can see followers/following lists
- [ ] Can send messages
- [ ] Can receive messages
- [ ] Can delete own posts
- [ ] Can logout

---

## 📊 Monitoring Setup

### Uptime Monitoring

- [ ] UptimeRobot account created
- [ ] Monitor added for backend URL
- [ ] Check interval: 5 minutes
- [ ] Email alerts configured

### Log Monitoring

- [ ] Railway logs accessible
- [ ] Vercel logs accessible
- [ ] No critical errors in logs

---

## 🔒 Security Checklist

### Environment Variables

- [ ] No hardcoded credentials in code
- [ ] DATABASE_URL not exposed
- [ ] Firebase keys not in public repo
- [ ] All secrets in environment variables

### CORS

- [ ] CORS restricted to frontend domain
- [ ] No wildcard (\*) in production
- [ ] HTTPS enforced

### Database

- [ ] Strong database password
- [ ] Connection string secured
- [ ] Regular backups scheduled

---

## 📱 Post-Deployment

### Documentation

- [ ] README.md updated with live URLs
- [ ] Deployment guide reviewed
- [ ] API documentation updated

### Sharing

- [ ] Frontend URL shared with team
- [ ] Demo account created for testing
- [ ] Feedback form created (optional)

### Maintenance

- [ ] Monitor free tier usage
- [ ] Set up weekly database backups
- [ ] Schedule monthly dependency updates
- [ ] Monitor error logs weekly

---

## 🎯 Success Criteria

Your deployment is successful when:

- ✅ Frontend loads without errors
- ✅ Users can register and login
- ✅ Posts can be created and viewed
- ✅ Follow system works
- ✅ Messaging works
- ✅ No CORS errors
- ✅ Database persists data
- ✅ Backend stays awake (with monitoring)

---

## 📞 Support Resources

### If Something Goes Wrong:

**Backend Issues:**

1. Check Railway logs
2. Verify DATABASE_URL
3. Check Flyway migrations
4. Review application.properties

**Frontend Issues:**

1. Check Vercel logs
2. Verify REACT_APP_API_URL
3. Check browser console
4. Test API endpoints directly

**Database Issues:**

1. Check Railway PostgreSQL logs
2. Verify connection string
3. Test connection with psql
4. Check table creation

### Get Help:

- Railway Discord: https://discord.gg/railway
- Vercel Discord: https://discord.gg/vercel
- Stack Overflow: Tag `spring-boot`, `react`, `postgresql`

---

## 🎉 Deployment Complete!

Once all items are checked, your CampusConnect application is:

- ✅ Fully deployed
- ✅ Accessible worldwide
- ✅ Running on free tier
- ✅ Ready for users!

**Share your app:**

```
🌐 CampusConnect is live!
Visit: https://your-app.vercel.app
```

---

**Last Updated:** [Date]
**Deployed By:** [Your Name]
**Status:** 🟢 Live
