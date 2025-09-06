# CampusConnect – Social Media Platform for College Students

## Overview

CampusConnect is a purpose-built social media application designed to help university students connect with classmates in their respective courses. It facilitates collaboration, discussions, and community participation in an academic environment.

## Features

- **Login/Signup & Admin Functionality:**  
  Secure user authentication, account creation, and admin controls for user management and content moderation.

- **Social Feed:**  
  Enables campus students to interact and engage by dynamically displaying user-generated posts, updates, and discussions.

- **File Sharing & Landing Page:**  
  Supports collaborative projects and resource sharing through file upload, download, and sharing features integrated into the landing page.

- **Search & Auto-Suggest:**  
  Enhances accessibility and efficiency with robust search functionality, including auto-suggestion for quickly finding posts, users, or resources.

- **Profile Page:**  
  Allows users to personalize their profiles, showcase interests, activities, and contributions, and connect with others based on shared interests.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Java, Spring Boot
- **Database:** MySQL

## Project Structure

Campus-Connect/
│
├─ Front-end/ # React.js frontend
│ ├─ public/ # Public assets
│ ├─ src/ # React source code
│ │ ├─ components/ # Reusable UI components
│ │ ├─ pages/ # Page-level components
│ │ ├─ services/ # API service calls
│ │ └─ App.js # Main React app
│ └─ package.json # Frontend dependencies
│
├─ Back-end/ # Spring Boot backend
│ ├─ src/main/java/com/socialmediaweb/socialmediaweb/
│ │ ├─ controller/ # REST controllers (UserController, PostController)
│ │ ├─ entities/ # JPA entity classes (Users, Post, Role, UserRole)
│ │ ├─ repository/ # Spring Data JPA repositories
│ │ ├─ service/ # Business logic and service classes
│ │ └─ SocialmediaWebApplication.java # Main Spring Boot application
│ ├─ src/main/resources/
│ │ └─ application.properties # DB and application config
│ └─ pom.xml # Backend dependencies
│
└─ README.md # Project documentation

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hemanthv20/Campus-Connect.git
   ```

Navigate to the frontend directory:

cd Front-end

Install frontend dependencies:

npm install

Navigate to the backend directory:

cd ../Back-end

Update application.properties with your MySQL username and password.

(Optional) Create the database automatically:
Uncomment the following line in application.properties:

spring.jpa.hibernate.ddl-auto = create-drop

Start the Spring Boot backend application:

./mvnw spring-boot:run

Access the application:
Open http://localhost:8081
in your web browser.

⭐ Don’t forget to give it a star if you like it!
