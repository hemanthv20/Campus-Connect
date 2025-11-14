# CampusConnect - Social Media Web Application

A full-stack social media platform built for campus communities, featuring posts, followers, and real-time messaging.

## 🚀 Features

- **User Authentication** - Secure login and registration system
- **Posts & Feed** - Create, edit, and delete posts with images/videos
- **Follow System** - Follow/unfollow users with one-way follow support
- **Private Messaging** - Real-time chat with users you follow
- **User Profiles** - Customizable profiles with college information
- **Admin Panel** - User management and moderation tools

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Firebase (for media storage)
- CSS3 with custom variables

### Backend

- Java Spring Boot
- Spring Data JPA
- PostgreSQL
- Flyway (database migrations)
- Maven

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Java JDK** (v11 or higher) - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven** (v3.6 or higher) - [Download](https://maven.apache.org/download.cgi)
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
CREATE DATABASE campusconnect;

# Exit psql
\q
```

#### Configure Database Connection

Edit `back-end/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/campusconnect
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd back-end

# Install dependencies and build
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```

The backend server will start on `http://localhost:8081`

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

## 🗄️ Database Migrations

The project uses Flyway for database migrations. Migrations run automatically on application startup.

Migration files are located in:

```
back-end/src/main/resources/db/migration/
```

### Available Migrations:

- `V1__create_follows_table.sql` - Creates follow relationships table
- `V2__create_chat_tables.sql` - Creates chat and messages tables

## 📁 Project Structure

```
CampusConnect/
├── back-end/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/socialmediaweb/socialmediaweb/
│   │   │   │   ├── controller/     # REST API endpoints
│   │   │   │   ├── service/        # Business logic
│   │   │   │   ├── repository/     # Database access
│   │   │   │   ├── entities/       # JPA entities
│   │   │   │   └── dto/            # Data transfer objects
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── db/migration/   # Flyway migrations
│   │   └── test/
│   └── pom.xml
│
└── front-end/
    ├── public/
    ├── src/
    │   ├── components/         # React components
    │   │   ├── css/           # Component styles
    │   │   └── common/        # Shared components
    │   ├── config/            # API configuration
    │   ├── assets/            # Images and media
    │   ├── utils/             # Utility functions
    │   ├── firebase.js        # Firebase config
    │   └── index.js           # App entry point
    └── package.json
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

### Chat/Messaging

- `GET /api/chats` - Get user's chats
- `GET /api/chats/with/{userId}` - Get or create chat
- `GET /api/chats/{chatId}/messages` - Get messages
- `POST /api/chats/{chatId}/messages` - Send message
- `DELETE /api/chats/messages/{messageId}` - Delete message
- `GET /api/chats/unread-count` - Get unread count

## 🎨 Features in Detail

### Follow System

- One-way follow model (like Twitter)
- Users can message anyone they follow
- Mutual follow indicators
- Follower/following lists with search

### Messaging System

- Private one-on-one chats
- 100-character message limit
- Real-time updates via polling
- Unread message counts
- Message deletion
- Chat with users you follow

### Posts

- Text, image, and video posts
- Edit and delete own posts
- Admin moderation capabilities
- Automatic link detection
- Media upload via Firebase

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

- Verify PostgreSQL is running
- Check database credentials in `application.properties`
- Ensure database `campusconnect` exists

### Frontend Issues

**Module not found errors:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Firebase errors:**

- Verify Firebase configuration in `firebase.js`
- Check Firebase Storage rules
- Ensure Firebase project is active

**CORS errors:**

- Backend CORS is configured for `http://localhost:3000`
- Update CORS settings in controllers if using different port

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

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Spring Boot documentation
- React documentation
- Firebase documentation
- PostgreSQL community

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Happy Coding! 🎉**
