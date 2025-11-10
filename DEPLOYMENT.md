# CampusConnect - Deployment Guide

## 🚀 Production Deployment Guide

This guide will help you deploy your improved CampusConnect application to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass (see TESTING_CHECKLIST.md)
- [ ] No console errors in development
- [ ] All environment variables are configured
- [ ] Database is set up and accessible
- [ ] SSL certificate is ready (for HTTPS)
- [ ] Domain name is configured
- [ ] Backup strategy is in place
- [ ] Monitoring tools are set up

---

## 🔧 Environment Configuration

### Backend Configuration

1. **Update `application.properties` for production**:

```properties
# Server Configuration
server.port=8081

# Database Configuration (Use environment variables)
spring.datasource.url=${DATABASE_URL:jdbc:postgresql://localhost:5432/socialmedia_db}
spring.datasource.username=${DATABASE_USERNAME:postgres}
spring.datasource.password=${DATABASE_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Settings
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false

# Logging
logging.level.root=INFO
logging.level.com.socialmediaweb=INFO

# CORS Configuration (Update with your frontend URL)
cors.allowed.origins=${CORS_ORIGINS:http://localhost:3000}
```

2. **Set environment variables**:

```bash
export DATABASE_URL=jdbc:postgresql://your-db-host:5432/socialmedia_db
export DATABASE_USERNAME=your_username
export DATABASE_PASSWORD=your_secure_password
export CORS_ORIGINS=https://your-frontend-domain.com
```

### Frontend Configuration

1. **Create `.env.production` file**:

```env
REACT_APP_API_URL=https://your-backend-domain.com
```

2. **Update Firebase configuration** (if using):

```javascript
// src/firebase.js
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
```

---

## 🗄️ Database Setup

### PostgreSQL Production Setup

1. **Create production database**:

```sql
CREATE DATABASE socialmedia_db;
CREATE USER campusconnect_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE socialmedia_db TO campusconnect_user;
```

2. **Run migrations** (if you have existing data):

```bash
# Backup existing database
pg_dump -U postgres socialmedia_db > backup.sql

# Restore to production
psql -U campusconnect_user -d socialmedia_db < backup.sql
```

3. **Migrate passwords** (see PASSWORD_MIGRATION.md)

---

## 🏗️ Backend Deployment

### Option 1: Deploy to Heroku

1. **Install Heroku CLI**:

```bash
npm install -g heroku
```

2. **Login to Heroku**:

```bash
heroku login
```

3. **Create Heroku app**:

```bash
cd CampusConnect/back-end
heroku create campusconnect-api
```

4. **Add PostgreSQL addon**:

```bash
heroku addons:create heroku-postgresql:hobby-dev
```

5. **Set environment variables**:

```bash
heroku config:set CORS_ORIGINS=https://your-frontend.com
```

6. **Deploy**:

```bash
git init
git add .
git commit -m "Initial deployment"
git push heroku main
```

### Option 2: Deploy to AWS EC2

1. **Launch EC2 instance** (Ubuntu 20.04 LTS)

2. **Connect to instance**:

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Java 17**:

```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

4. **Install PostgreSQL**:

```bash
sudo apt install postgresql postgresql-contrib
```

5. **Upload your application**:

```bash
scp -i your-key.pem target/socialmedia-web-0.0.1-SNAPSHOT.jar ubuntu@your-ec2-ip:~/
```

6. **Run application**:

```bash
java -jar socialmedia-web-0.0.1-SNAPSHOT.jar
```

7. **Set up as service** (systemd):

Create `/etc/systemd/system/campusconnect.service`:

```ini
[Unit]
Description=CampusConnect Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu
ExecStart=/usr/bin/java -jar /home/ubuntu/socialmedia-web-0.0.1-SNAPSHOT.jar
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable campusconnect
sudo systemctl start campusconnect
```

### Option 3: Deploy with Docker

1. **Create `Dockerfile`** in `back-end/`:

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/socialmedia-web-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
```

2. **Build image**:

```bash
docker build -t campusconnect-backend .
```

3. **Run container**:

```bash
docker run -d -p 8081:8081 \
  -e DATABASE_URL=jdbc:postgresql://db:5432/socialmedia_db \
  -e DATABASE_USERNAME=postgres \
  -e DATABASE_PASSWORD=password \
  campusconnect-backend
```

---

## 🎨 Frontend Deployment

### Option 1: Deploy to Netlify

1. **Build production bundle**:

```bash
cd CampusConnect/front-end
npm run build
```

2. **Install Netlify CLI**:

```bash
npm install -g netlify-cli
```

3. **Deploy**:

```bash
netlify deploy --prod --dir=build
```

4. **Configure environment variables** in Netlify dashboard:
   - `REACT_APP_API_URL`
   - Firebase variables (if using)

### Option 2: Deploy to Vercel

1. **Install Vercel CLI**:

```bash
npm install -g vercel
```

2. **Deploy**:

```bash
cd CampusConnect/front-end
vercel --prod
```

3. **Set environment variables**:

```bash
vercel env add REACT_APP_API_URL
```

### Option 3: Deploy to AWS S3 + CloudFront

1. **Build production bundle**:

```bash
npm run build
```

2. **Create S3 bucket**:

```bash
aws s3 mb s3://campusconnect-frontend
```

3. **Upload files**:

```bash
aws s3 sync build/ s3://campusconnect-frontend
```

4. **Configure bucket for static hosting**

5. **Create CloudFront distribution** for CDN

### Option 4: Deploy with Nginx

1. **Build production bundle**:

```bash
npm run build
```

2. **Copy to server**:

```bash
scp -r build/* user@server:/var/www/campusconnect
```

3. **Configure Nginx**:

Create `/etc/nginx/sites-available/campusconnect`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/campusconnect;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Enable site**:

```bash
sudo ln -s /etc/nginx/sites-available/campusconnect /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔒 SSL/HTTPS Setup

### Using Let's Encrypt (Free)

1. **Install Certbot**:

```bash
sudo apt install certbot python3-certbot-nginx
```

2. **Get certificate**:

```bash
sudo certbot --nginx -d your-domain.com
```

3. **Auto-renewal**:

```bash
sudo certbot renew --dry-run
```

### Using AWS Certificate Manager

1. Request certificate in ACM
2. Validate domain ownership
3. Attach to CloudFront or Load Balancer

---

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy CampusConnect

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 17
        uses: actions/setup-java@v2
        with:
          java-version: "17"
      - name: Build with Maven
        run: cd back-end && mvn clean package
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "campusconnect-api"
          heroku_email: "your-email@example.com"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"
      - name: Install dependencies
        run: cd front-end && npm install
      - name: Build
        run: cd front-end && npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: "./front-end/build"
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 📊 Monitoring & Logging

### Application Monitoring

1. **Set up logging**:

   - Use Logback for backend
   - Use Sentry for frontend errors

2. **Add health check endpoint**:

```java
@GetMapping("/health")
public ResponseEntity<String> health() {
    return ResponseEntity.ok("OK");
}
```

3. **Monitor with tools**:
   - New Relic
   - Datadog
   - AWS CloudWatch

### Database Monitoring

1. **Enable slow query log**
2. **Set up connection pooling**
3. **Monitor disk space**
4. **Set up automated backups**

---

## 🔐 Security Hardening

### Backend Security

1. **Enable HTTPS only**
2. **Set secure headers**:

```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .headers()
                .contentSecurityPolicy("default-src 'self'")
                .and()
                .xssProtection()
                .and()
                .frameOptions().deny();
        return http.build();
    }
}
```

3. **Rate limiting**:

   - Use Spring Security
   - Or use API Gateway

4. **Input validation**:
   - Already implemented
   - Add server-side validation

### Frontend Security

1. **Content Security Policy**
2. **XSS Protection**
3. **CSRF Protection**
4. **Secure cookies**

---

## 💾 Backup Strategy

### Database Backups

1. **Automated daily backups**:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U postgres socialmedia_db > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://campusconnect-backups/
```

2. **Retention policy**:
   - Daily backups: Keep 7 days
   - Weekly backups: Keep 4 weeks
   - Monthly backups: Keep 12 months

### File Backups

1. **Backup uploaded files** (if stored locally)
2. **Use S3 versioning** (if using S3)

---

## 🚨 Rollback Plan

### If deployment fails:

1. **Backend rollback**:

```bash
heroku rollback
# or
git revert HEAD
git push heroku main
```

2. **Frontend rollback**:

```bash
netlify rollback
# or
vercel rollback
```

3. **Database rollback**:

```bash
psql -U postgres socialmedia_db < backup_previous.sql
```

---

## 📈 Performance Optimization

### Backend

1. **Enable caching**:

```java
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "posts");
    }
}
```

2. **Database indexing**:

```sql
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_post_user ON post(user_id);
CREATE INDEX idx_post_created ON post(created_on DESC);
```

3. **Connection pooling**:

```properties
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
```

### Frontend

1. **Code splitting**
2. **Lazy loading**
3. **Image optimization**
4. **CDN for static assets**

---

## ✅ Post-Deployment Checklist

After deployment:

- [ ] All endpoints are accessible
- [ ] HTTPS is working
- [ ] Database connections work
- [ ] File uploads work
- [ ] Authentication works
- [ ] All features tested in production
- [ ] Monitoring is active
- [ ] Backups are running
- [ ] SSL certificate is valid
- [ ] Domain DNS is configured
- [ ] Error tracking is working
- [ ] Performance is acceptable
- [ ] Security headers are set
- [ ] CORS is configured correctly

---

## 🆘 Troubleshooting

### Common Issues

1. **CORS errors**:

   - Check CORS_ORIGINS environment variable
   - Verify frontend URL is whitelisted

2. **Database connection fails**:

   - Check DATABASE_URL
   - Verify credentials
   - Check firewall rules

3. **File uploads fail**:

   - Check Firebase configuration
   - Verify storage permissions

4. **502 Bad Gateway**:
   - Check backend is running
   - Verify port configuration
   - Check reverse proxy settings

---

## 📞 Support & Maintenance

### Regular Maintenance

- **Weekly**: Check logs for errors
- **Monthly**: Review performance metrics
- **Quarterly**: Update dependencies
- **Yearly**: Review security practices

### Emergency Contacts

- Database Admin: [contact]
- DevOps Team: [contact]
- Security Team: [contact]

---

## 🎉 Deployment Complete!

Your CampusConnect application is now live in production!

**Next Steps**:

1. Monitor application health
2. Gather user feedback
3. Plan future enhancements
4. Keep dependencies updated

---

**Good luck with your deployment! 🚀**

**Last Updated**: November 2025
