# CampusConnect - Social Media Web Application

A comprehensive full-stack social media platform built for campus communities, featuring posts, followers, real-time messaging, enhanced profiles, and intelligent search & recommendations.

## 🚀 Features

### Core Features

- **User Authentication** - Secure login and registration system with JWT
- **Posts & Feed** - Create, edit, and delete posts with images/videos
- **Follow System** - Follow/unfollow users with one-way follow support
- **Private Messaging** - Real-time one-on-one chat with users you follow
- **Admin Panel** - User management and moderation tools

### Enhanced Profile System

- **Skills Management** - Add, organize, and showcase your technical and soft skills
- **Interests** - Display your hobbies and interests with categorization
- **Experience** - Professional work experience with company details and descriptions
- **Education** - Academic background with degree, institution, and timeline
- **Projects** - Showcase your projects with descriptions, technologies, and links
- **Goals & Milestones** - Set and track personal and professional goals
- **Social Links** - Connect your GitHub, LinkedIn, portfolio, and other profiles
- **Bio & Contact** - Comprehensive profile information with phone and location

### Search & Discovery

- **Advanced Search** - Search users by name, skills, interests, college, semester, and batch
- **Smart Recommendations** - AI-powered user recommendations based on profile similarity
- **Match Scoring** - Intelligent matching algorithm considering skills, interests, and college info
- **Quick Search** - Fast username and name search with autocomplete
- **Suggested Skills & Interests** - Get suggestions while searching

## 🛠️ Tech Stack

### Frontend

- **React.js** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Firebase** - Media storage for images/videos
- **CSS3** - Modern styling with custom properties and flexbox/grid

### Backend

- **Java 17** - Programming language
- **Spring Boot 3.1.0** - Application framework
- **Spring Data JPA** - Database ORM
- **Hibernate** - JPA implementation
- **PostgreSQL** - Relational database
- **Flyway** - Database version control and migrations
- **Maven** - Build and dependency management

### Architecture

- **RESTful API** - Clean API design with proper HTTP methods
- **DTO Pattern** - Data transfer objects for clean separation
- **Repository Pattern** - Data access abstraction
- **Service Layer** - Business logic separation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Java JDK 17** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven** (v3.6 or higher) - [Download](https://maven.apache.org/download.cgi) or use included Maven wrapper
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/downloads)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd CampusConnect
```

### 2. Database Setup

#### Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE socialmedia_db;

# Exit psql
\q
```

#### Run Database Setup Script

The project includes a complete setup script with all tables and seed data:

```bash
# Run the complete setup script
psql -U postgres -d socialmedia_db -f complete_setup.sql
```

This will create:

- All required tables (users, posts, follows, chats, messages, profiles, skills, interests, etc.)
- Seed data for skills and interests
- Proper indexes and constraints

#### Configure Database Connection

Edit `back-end/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/socialmedia_db
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
server.port=8081

# Flyway configuration
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd back-end

# Option 1: Using Maven (if installed)
mvn clean install
mvn spring-boot:run

# Option 2: Using Maven Wrapper (recommended)
./mvnw clean install
./mvnw spring-boot:run

# On Windows
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```

The backend server will start on `http://localhost:8081`

#### Verify Backend is Running

Visit `http://localhost:8081/api/health` or check the console for:

```
Started SocialmediaWebApplication in X.XXX seconds
```

### 4. Frontend Setup

#### Configure Firebase (for media uploads)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Storage in your Firebase project
3. Get your Firebase configuration

Create `front-end/src/firebase.js`:

```javascript
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
```

#### Install and Run Frontend

```bash
# Navigate to frontend directory
cd front-end

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start on `http://localhost:3000`

## 🗄️ Database Schema

The project uses Flyway for database migrations. Migrations run automatically on application startup.

Migration files are located in: `back-end/src/main/resources/db/migration/`

### Available Migrations:

- `V1__create_follows_table.sql` - Follow relationships table
- `V2__create_chat_tables.sql` - Chat and messages tables
- `V3__create_enhanced_profile_tables.sql` - Enhanced profile features (skills, interests, projects, goals, experience, education)
- `V4__seed_skills_and_interests.sql` - Seed data for skills and interests

### Database Tables:

**Core Tables:**

- `users` - User accounts and basic info
- `post` - User posts with media
- `follows` - Follow relationships
- `chats` - Chat conversations
- `messages` - Chat messages

**Profile Enhancement Tables:**

- `user_profile_extension` - Extended profile info
- `social_links` - Social media links
- `skills` & `skill_categories` - Skills taxonomy
- `user_skills` - User's skills with proficiency
- `skill_endorsements` - Skill endorsements
- `interests` & `interest_categories` - Interests taxonomy
- `user_interests` - User's interests
- `experience` - Work experience
- `education` - Educational background
- `projects` & `project_collaborators` - Projects
- `goals` & `goal_milestones` - Goals and progress

### Setup Scripts:

- `complete_setup.sql` - Complete database setup with all tables and seed data
- `insert_skills_complete.sql` - Comprehensive skills seed data
- `insert_skills_manually.sql` - Manual skills insertion script

## 📁 Project Structure

```
CampusConnect/
├── back-end/
│   ├── src/main/java/com/socialmediaweb/socialmediaweb/
│   │   ├── config/              # Configuration classes
│   │   │   └── CorsConfig.java  # CORS configuration
│   │   ├── controller/          # REST API endpoints
│   │   │   ├── ChatController.java
│   │   │   ├── DataSeedController.java
│   │   │   ├── FollowController.java
│   │   │   ├── ProfileController.java
│   │   │   └── SearchController.java
│   │   ├── service/             # Business logic
│   │   │   ├── ChatService.java
│   │   │   ├── FollowService.java
│   │   │   ├── ProfileService.java
│   │   │   └── SearchService.java
│   │   ├── repository/          # Database access (JPA)
│   │   │   ├── ChatRepository.java
│   │   │   ├── FollowRepository.java
│   │   │   ├── UserSkillRepository.java
│   │   │   └── ... (20+ repositories)
│   │   ├── entities/            # JPA entities
│   │   │   ├── Users.java
│   │   │   ├── Post.java
│   │   │   ├── Follow.java
│   │   │   ├── Chat.java
│   │   │   ├── Message.java
│   │   │   ├── Skill.java
│   │   │   ├── Interest.java
│   │   │   └── ... (25+ entities)
│   │   └── dto/                 # Data transfer objects
│   │       ├── EnhancedProfileDTO.java
│   │       ├── SearchCriteriaDTO.java
│   │       ├── ChatDTO.java
│   │       └── ... (20+ DTOs)
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/migration/        # Flyway migrations
│   │       ├── V1__create_follows_table.sql
│   │       ├── V2__create_chat_tables.sql
│   │       ├── V3__create_enhanced_profile_tables.sql
│   │       └── V4__seed_skills_and_interests.sql
│   ├── database/                # Database documentation
│   │   ├── complete_schema.sql
│   │   └── simple_schema.sql
│   ├── mvnw & mvnw.cmd         # Maven wrapper
│   └── pom.xml
│
├── front-end/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── profile/         # Profile section components
│   │   │   │   ├── SkillsSection.js
│   │   │   │   ├── InterestsSection.js
│   │   │   │   ├── ExperienceSection.js
│   │   │   │   ├── ProjectsSection.js
│   │   │   │   └── GoalsSection.js
│   │   │   ├── ChatIcon.js
│   │   │   ├── ChatList.js
│   │   │   ├── ChatWindow.js
│   │   │   ├── Discover.js      # Search & recommendations
│   │   │   ├── FollowButton.js
│   │   │   ├── FollowersList.js
│   │   │   ├── FollowingList.js
│   │   │   ├── Profile.js
│   │   │   └── css/             # Component styles
│   │   ├── config/
│   │   │   └── api.js           # API configuration
│   │   ├── utils/
│   │   │   └── validation.js    # Form validation
│   │   ├── firebase.js          # Firebase config
│   │   ├── index.js             # App entry point
│   │   └── style.css            # Global styles
│   └── package.json
│
├── complete_setup.sql           # Complete database setup
├── insert_skills_complete.sql   # Skills seed data
├── SETUP_INSTRUCTIONS.md        # Detailed setup guide
├── ENHANCED_PROFILE_IMPLEMENTATION.md
├── SEARCH_AND_RECOMMENDATIONS_IMPLEMENTATION.md
└── README.md
```

## 🔑 API Endpoints

### Authentication

- `POST /createuser` - Register new user
- `POST /login` - User login

### Posts

- `GET /feed` - Get all posts
- `POST /createpost` - Create new post
- `PUT /updatepost` - Update post
- `DELETE /deletepost/{id}` - Delete post
- `GET /posts/user/{userId}` - Get user's posts

### Follow System

- `POST /api/follow` - Follow a user
- `DELETE /api/follow` - Unfollow a user
- `GET /api/follow/followers/{userId}` - Get followers list
- `GET /api/follow/following/{userId}` - Get following list
- `GET /api/follow/counts/{userId}` - Get follower/following counts
- `GET /api/follow/status` - Check follow status

### Chat/Messaging

- `GET /api/chats` - Get user's chats
- `GET /api/chats/with/{userId}` - Get or create chat
- `GET /api/chats/{chatId}/messages` - Get messages
- `POST /api/chats/{chatId}/messages` - Send message
- `DELETE /api/chats/messages/{messageId}` - Delete message
- `GET /api/chats/unread-count` - Get unread count
- `PUT /api/chats/{chatId}/mark-read` - Mark messages as read

### Enhanced Profile

- `GET /api/profile/{userId}` - Get complete user profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/skills` - Add skill
- `DELETE /api/profile/skills/{skillId}` - Remove skill
- `POST /api/profile/interests` - Add interest
- `DELETE /api/profile/interests/{interestId}` - Remove interest
- `POST /api/profile/experience` - Add experience
- `PUT /api/profile/experience/{id}` - Update experience
- `DELETE /api/profile/experience/{id}` - Delete experience
- `POST /api/profile/education` - Add education
- `POST /api/profile/projects` - Add project
- `POST /api/profile/goals` - Add goal
- `PUT /api/profile/goals/{id}/milestones` - Update goal milestones

### Search & Discovery

- `POST /api/search` - Advanced search with filters
- `GET /api/search/quick?query={query}` - Quick name search
- `GET /api/search/recommendations` - Get personalized recommendations
- `GET /api/search/skills?query={query}` - Search skills
- `GET /api/search/interests?query={query}` - Search interests

### Data Seeding (Development)

- `POST /api/seed/skills` - Seed skills data
- `POST /api/seed/interests` - Seed interests data

## 🎨 Features in Detail

### Follow System

- One-way follow model (like Twitter/X)
- Users can message anyone they follow
- Mutual follow indicators
- Follower/following lists with search
- Follow/unfollow with instant UI updates
- Follow counts displayed on profiles

### Messaging System

- Private one-on-one chats
- 100-character message limit
- Real-time updates via polling (5-second intervals)
- Unread message counts with badges
- Message deletion (own messages only)
- Chat only with users you follow
- Automatic chat creation on first message
- Message timestamps
- Read/unread status tracking

### Posts

- Text, image, and video posts
- Edit and delete own posts
- Admin moderation capabilities
- Automatic link detection
- Media upload via Firebase Storage
- Post timestamps
- User profile integration

### Enhanced Profile System

**Skills Management:**

- Add unlimited skills with proficiency levels (Beginner, Intermediate, Advanced, Expert)
- Organize skills by categories (Programming, Design, Business, etc.)
- Feature important skills
- Skill endorsements from other users
- Display order customization

**Interests:**

- Add personal and professional interests
- Categorized interests (Technology, Sports, Arts, etc.)
- Display order management
- Interest-based user matching

**Experience:**

- Add work experience with company, position, and duration
- Detailed job descriptions
- Current position indicator
- Timeline view

**Education:**

- Academic background with degree and institution
- GPA and field of study
- Graduation dates
- Multiple education entries

**Projects:**

- Showcase personal and team projects
- Project descriptions and technologies used
- External links (GitHub, demo, etc.)
- Collaborator management
- Project status tracking

**Goals & Milestones:**

- Set personal and professional goals
- Track progress with milestones
- Target dates and completion status
- Goal categories (Career, Learning, Personal)

**Social Links:**

- Connect GitHub, LinkedIn, portfolio, Twitter
- Custom social media links
- Clickable profile badges

### Search & Discovery

**Advanced Search:**

- Multi-criteria search (name, skills, interests, college, semester, batch)
- Real-time filtering
- Match score calculation
- Relevance-based sorting

**Smart Recommendations:**

- AI-powered user suggestions
- Based on profile similarity (skills, interests, college)
- Excludes already-followed users
- Match reason explanations
- Personalized for each user

**Quick Search:**

- Fast username and name lookup
- Autocomplete suggestions
- Instant results

**Match Scoring Algorithm:**

- Name/username match: 30 points
- Skills similarity: 25 points
- Interests match: 20 points
- College match: 15 points
- Semester/batch match: 10 points
- Minimum threshold for display

## 🚀 Deployment

### Recommended Hosting Platforms

**Database:**

- Railway (500MB free)
- Supabase (500MB free)
- ElephantSQL (20MB free)

**Backend:**

- Railway (500 hours/month free)
- Render (750 hours/month free)
- Heroku (with student pack)

**Frontend:**

- Vercel (unlimited free)
- Netlify (unlimited free)
- GitHub Pages

### Environment Configuration

**Production Backend (`application.properties`):**

```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
server.port=${PORT:8081}
spring.jpa.hibernate.ddl-auto=validate
spring.flyway.enabled=true
```

**Production Frontend (`.env.production`):**

```env
REACT_APP_API_URL=https://your-backend-url.com
```

## 🚦 Running in Production

### Backend

```bash
# Build JAR file
cd back-end
mvn clean package

# Run JAR
java -jar target/socialmediaweb-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
# Build production bundle
cd front-end
npm run build

# Serve with a static server (e.g., serve)
npx serve -s build
```

## 🐛 Troubleshooting

### Backend Issues

**Port 8081 already in use:**

```bash
# Change port in application.properties
server.port=8082
```

**Database connection failed:**

- Verify PostgreSQL is running: `pg_isready`
- Check database credentials in `application.properties`
- Ensure database `socialmedia_db` exists
- Test connection: `psql -U postgres -d socialmedia_db`

**Flyway migration errors:**

```bash
# Reset Flyway if needed (development only)
# This will drop all tables!
spring.flyway.clean-on-validation-error=true
```

**Maven build fails:**

```bash
# Clean and rebuild
./mvnw clean install -DskipTests

# If Maven wrapper fails, use system Maven
mvn clean install
```

**Compilation errors:**

- Ensure Java 17 is installed: `java -version`
- Check JAVA_HOME environment variable
- Verify all dependencies in `pom.xml`

### Frontend Issues

**Module not found errors:**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Firebase errors:**

- Verify Firebase configuration in `firebase.js`
- Check Firebase Storage rules (allow read/write)
- Ensure Firebase project is active
- Verify API keys are correct

**CORS errors:**

- Backend CORS is configured in `CorsConfig.java`
- Default allowed origin: `http://localhost:3000`
- Update for production URLs
- Check browser console for specific CORS errors

**API connection fails:**

- Verify backend is running on port 8081
- Check `api.js` configuration
- Ensure no firewall blocking
- Test API directly: `curl http://localhost:8081/feed`

**Build fails:**

```bash
# Increase Node memory
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

### Database Issues

**Flyway checksum mismatch:**

```sql
-- Repair Flyway metadata
DELETE FROM flyway_schema_history WHERE success = false;
```

**Missing tables:**

```bash
# Run complete setup script
psql -U postgres -d socialmedia_db -f complete_setup.sql
```

**Seed data missing:**

```bash
# Run skills seed script
psql -U postgres -d socialmedia_db -f insert_skills_complete.sql
```

## 📝 Environment Variables

### Backend (`application.properties`)

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/campusconnect
spring.datasource.username=postgres
spring.datasource.password=your_password
server.port=8081
```

### Frontend (`.env`)

```env
REACT_APP_API_URL=http://localhost:8081
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Documentation

- **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** - Detailed setup guide
- **[ENHANCED_PROFILE_IMPLEMENTATION.md](ENHANCED_PROFILE_IMPLEMENTATION.md)** - Profile features documentation
- **[SEARCH_AND_RECOMMENDATIONS_IMPLEMENTATION.md](SEARCH_AND_RECOMMENDATIONS_IMPLEMENTATION.md)** - Search system documentation
- **[back-end/README.md](back-end/README.md)** - Backend-specific documentation
- **[back-end/database/README.md](back-end/database/README.md)** - Database documentation

## 🔖 Version

**Current Version:** v1.0-final-update

This release includes:

- Complete private chat system
- Followers/following functionality
- Enhanced profile features (skills, interests, projects, goals, experience, education)
- Advanced search and recommendations
- Database migrations and seed data
- Production-ready codebase

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available for educational purposes.

## 👥 Team

Developed as a Major Project for campus social networking.

## 🙏 Acknowledgments

- Spring Boot and Spring Data JPA documentation
- React and React Router documentation
- Firebase documentation
- PostgreSQL community
- Flyway migration tools
- Maven and npm ecosystems

## 📞 Support

For issues and questions:

- Open an issue in the GitHub repository
- Check existing documentation in the `/docs` folder
- Review troubleshooting section above

## 🚀 Future Enhancements

Potential features for future versions:

- Real-time messaging with WebSockets
- Notifications system
- Post reactions and comments
- Group chats
- File sharing in chats
- Advanced analytics dashboard
- Mobile app (React Native)
- Email verification
- Password reset functionality
- Two-factor authentication

---

**Happy Coding! 🎉**

Built with ❤️ for campus communities
