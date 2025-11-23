# CORS Fix - Quick Reference Card

## ✅ What Was Done

1. **Updated CORS Configuration** - Added your Netlify URLs
2. **Created Deployment Scripts** - Easy Docker build & push
3. **Created Testing Tools** - Verify CORS is working
4. **Pushed to GitHub** - All changes committed

---

## 🚀 Deploy Now (Choose One)

### Windows:

```cmd
cd CampusConnect\back-end
deploy.bat
```

### Linux/Mac:

```bash
cd CampusConnect/back-end
chmod +x deploy.sh
./deploy.sh
```

### Manual:

```bash
cd CampusConnect/back-end
docker build -t hemanthv20/campusconnect-backend:latest .
docker push hemanthv20/campusconnect-backend:latest
```

---

## 🔄 Redeploy on Render

1. Go to: https://dashboard.render.com
2. Click your backend service
3. Click "Manual Deploy" button
4. Select "Deploy latest commit"
5. Wait for deployment to complete (~2-5 minutes)

---

## 🧪 Test CORS (After Deployment)

### Quick Browser Test:

1. Open: https://gilded-semolina-097069.netlify.app
2. Open DevTools (F12) → Console
3. Paste:

```javascript
fetch("https://your-backend.onrender.com/feed")
  .then((res) => res.json())
  .then((data) => console.log("✅ Working!", data))
  .catch((err) => console.error("❌ Error:", err));
```

### Using Test File:

1. Open `back-end/test-cors.html` in browser
2. Enter your Render backend URL
3. Click "Test CORS"
4. Should see ✅ success

---

## 📋 Allowed URLs

Your backend now accepts requests from:

- ✅ https://69206b3a68d3500008f42b1c--gilded-semolina-097069.netlify.app
- ✅ https://gilded-semolina-097069.netlify.app
- ✅ http://localhost:3000
- ✅ http://localhost:3001

---

## 🔧 If Still Not Working

1. **Clear browser cache**: Ctrl+Shift+R
2. **Check Render logs**: Look for "Started SocialmediaWebApplication"
3. **Verify image pulled**: Look for "Pulling image hemanthv20/campusconnect-backend:latest"
4. **Check frontend URL**: Verify REACT_APP_API_URL in Netlify

---

## 📚 Documentation

- **Full Guide**: `back-end/DOCKER_DEPLOY_GUIDE.md`
- **Summary**: `back-end/CORS_FIX_SUMMARY.md`
- **Deployment Config**: `back-end/DEPLOYMENT_CONFIG.md`

---

## ✅ Success Checklist

- [ ] Docker image built
- [ ] Docker image pushed
- [ ] Render redeployed
- [ ] Service shows "Live"
- [ ] No CORS errors in console
- [ ] API calls working
- [ ] Frontend fully functional

---

**Need Help?** Check the detailed guides in the `back-end/` directory.
