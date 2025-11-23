# 🚀 CampusConnect - Quick Start Guide

## ✅ All Features Implemented

Your CampusConnect application is **fully developed** with all features complete:

- ✅ User Authentication & Profiles
- ✅ Follow/Unfollow System
- ✅ Private Messaging
- ✅ Skills & Interests
- ✅ Experience & Education
- ✅ Projects & Goals
- ✅ User Discovery & Search

---

## 🎯 One Final Step: Seed Skills & Interests Data

The dropdowns for Skills and Interests are empty because the database needs initial data.

### Quick Fix (Choose One):

#### Option 1: PowerShell Script (Easiest)

```powershell
cd CampusConnect
.\seed-data-simple.ps1
```

#### Option 2: cURL Commands

```bash
curl -X POST "http://localhost:8081/api/seed/skills"
curl -X POST "http://localhost:8081/api/seed/interests"
```

#### Option 3: Browser Tool

1. Open `CampusConnect/back-end/test-skills-interests.html`
2. Click "🚀 Seed Both"
3. Done!

---

## 📋 Complete Startup Sequence

### 1. Start Backend

```bash
cd CampusConnect/back-end
./mvnw spring-boot:run
```

Backend will run on: `http://localhost:8081`

### 2. Seed Data (First Time Only)

```powershell
cd CampusConnect
.\seed-data-simple.ps1
```

### 3. Start Frontend

```bash
cd CampusConnect/front-end
npm start
```

Frontend will run on: `http://localhost:3000`

### 4. Test the Application

1. Register a new account
2. Complete your profile
3. Add skills and interests (dropdowns now populated!)
4. Follow other users
5. Send messages to users you follow

---

## 🧪 Verify Everything Works

### Test Skills Endpoint

```bash
curl http://localhost:8081/api/profile/skills/all
```

**Expected**: Array of 50+ skills

### Test Interests Endpoint

```bash
curl http://localhost:8081/api/profile/interests/all
```

**Expected**: Array of 40+ interests

### Test Follow System

1. Go to another user's profile
2. Click "Follow" button
3. Check followers/following counts update

### Test Messaging

1. Follow a user
2. Click "Message" button on their profile
3. Send a message
4. Check chat icon for unread count

---

## 📊 What Gets Seeded

### Skills (50+ items):

- Programming: Java, Python, JavaScript, TypeScript, C++, C#, Go, Rust, PHP, Ruby
- Frameworks: React, Angular, Vue.js, Node.js, Spring Boot, Django, Flask, Express.js
- Soft Skills: Communication, Leadership, Teamwork, Problem Solving
- Design: UI/UX, Figma, Adobe XD, Photoshop, Illustrator
- Data Science: ML, TensorFlow, PyTorch, Pandas, NumPy
- Mobile: React Native, Flutter, Swift, Kotlin, Android, iOS
- DevOps: Docker, Kubernetes, AWS, Azure, CI/CD, Jenkins

### Interests (40+ items):

- Technology: AI, Blockchain, Web Dev, Mobile Apps, Cybersecurity
- Arts: Music, Photography, Painting, Theater, Film
- Sports: Football, Basketball, Cricket, Yoga, Gym, Running
- Business: Startups, Marketing, Finance, Investing
- Social: Environment, Education, Healthcare, Community Service
- Academic: CS, Math, Physics, Biology
- Hobbies: Gaming, Reading, Cooking, Traveling

---

## 🔧 Troubleshooting

### Backend Not Starting?

```bash
# Check Java version (need Java 17+)
java -version

# Clean and rebuild
cd CampusConnect/back-end
./mvnw clean install
./mvnw spring-boot:run
```

### Frontend Not Starting?

```bash
# Reinstall dependencies
cd CampusConnect/front-end
rm -rf node_modules package-lock.json
npm install
npm start
```

### Dropdowns Still Empty?

1. Verify backend is running: `http://localhost:8081/actuator/health`
2. Run seed script again: `.\seed-data-simple.ps1`
3. Hard refresh browser: `Ctrl + Shift + R`
4. Check browser console for errors

### Database Issues?

- Check `application.properties` for correct database URL
- Ensure PostgreSQL is running
- Verify database exists and migrations ran

---

## 📚 Additional Documentation

- `COMPLETE_TASKS_SUMMARY.md` - Full feature list and status
- `SKILLS_INTERESTS_DEBUG.md` - Detailed debugging guide
- `SKILLS_INTERESTS_FIX_SUMMARY.md` - Skills/interests fix details
- `back-end/README.md` - Backend documentation
- `front-end/README.md` - Frontend documentation

---

## 🎉 You're All Set!

Once you run the seed script, your CampusConnect application is **100% ready to use**!

**Enjoy your fully functional campus social network!** 🚀

---

## 📞 Need Help?

All seed scripts and test tools are in the `CampusConnect` directory:

- `seed-data-simple.ps1` - PowerShell seed script
- `back-end/seed-data.bat` - Windows batch script
- `back-end/seed-data.sh` - Linux/Mac script
- `back-end/test-skills-interests.html` - Browser testing tool

**Just run one of these and you're done!**
