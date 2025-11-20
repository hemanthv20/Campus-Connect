# Setup Instructions for Enhanced Profile System

## Current Status

✅ **Backend Implementation Complete:**

- Database migration file created (V3)
- 15 entity classes created
- 13 repository interfaces created
- 11 DTO classes created
- ProfileService with full business logic
- ProfileController with 30+ REST endpoints
- UsersRepository created

❌ **Application Not Running:**

- Database connection issue: Password authentication failed

## Steps to Run the Application

### 1. Update Database Credentials

Edit `CampusConnect/back-end/src/main/resources/application.properties`:

```properties
# Update these lines with your actual PostgreSQL credentials:
spring.datasource.url=jdbc:postgresql://localhost:5432/campusconnect
spring.datasource.username=YOUR_POSTGRES_USERNAME
spring.datasource.password=YOUR_POSTGRES_PASSWORD
```

Replace:

- `YOUR_POSTGRES_USERNAME` with your PostgreSQL username
- `YOUR_POSTGRES_PASSWORD` with your PostgreSQL password
- `campusconnect` with your database name (if different)

### 2. Ensure PostgreSQL is Running

Make sure your PostgreSQL server is running and accessible on `localhost:5432`.

### 3. Create Database (if not exists)

Open pgAdmin or psql and create the database:

```sql
CREATE DATABASE campusconnect;
```

### 4. Start the Application

From the `CampusConnect/back-end` directory, run:

```bash
./mvnw spring-boot:run
```

Or if you have Maven installed:

```bash
mvn spring-boot:run
```

### 5. Verify Migration

Once the application starts successfully, you should see Flyway migration logs indicating that V3 migration was executed. Check your database in pgAdmin to verify the new tables were created.

## Expected Tables After Migration

The following 18 new tables should be created:

1. **skill_categories** - 9 pre-populated categories
2. **skills** - 32 pre-populated skills
3. **user_skills** - User's skills with proficiency
4. **skill_endorsements** - Skill endorsements
5. **interest_categories** - 8 pre-populated categories
6. **interests** - 28 pre-populated interests
7. **user_interests** - User's interests
8. **goals** - User goals
9. **goal_milestones** - Goal milestones
10. **projects** - User projects
11. **project_collaborators** - Project team members
12. **education** - Educational background
13. **experience** - Work/volunteer experience
14. **social_links** - Social media links
15. **user_profile_extensions** - Extended profile data
16. **profile_views** - Profile analytics
17. **collaboration_requests** - Networking requests

Plus 3 new columns in the **users** table:

- `phone`
- `location`
- `bio`

## API Endpoints Available

Once running, the following endpoints will be available at `http://localhost:8080/api/profile`:

### Skills

- `GET /{userId}/skills` - Get user skills
- `POST /{userId}/skills` - Add skill
- `PUT /skills/{userSkillId}` - Update skill
- `DELETE /{userId}/skills/{skillId}` - Delete skill
- `GET /skills/search?query=` - Search skills
- `GET /skills/all` - Get all skills

### Interests

- `GET /{userId}/interests` - Get user interests
- `POST /{userId}/interests` - Add interest
- `DELETE /{userId}/interests/{interestId}` - Delete interest
- `GET /interests/search?query=` - Search interests
- `GET /interests/all` - Get all interests

### Goals

- `GET /{userId}/goals` - Get user goals
- `GET /goals/{goalId}` - Get goal by ID
- `POST /{userId}/goals` - Create goal
- `PUT /goals/{goalId}` - Update goal
- `DELETE /goals/{goalId}` - Delete goal

### Projects

- `GET /{userId}/projects` - Get user projects
- `POST /{userId}/projects` - Create project
- `PUT /projects/{projectId}` - Update project
- `DELETE /projects/{projectId}` - Delete project

### Experience

- `GET /{userId}/experiences` - Get experiences
- `POST /{userId}/experiences` - Add experience
- `DELETE /experiences/{experienceId}` - Delete experience

### Education

- `GET /{userId}/education` - Get education
- `POST /{userId}/education` - Add education
- `DELETE /education/{educationId}` - Delete education

### Social Links

- `GET /{userId}/social-links` - Get social links
- `POST /{userId}/social-links` - Add social link
- `DELETE /social-links/{linkId}` - Delete social link

## Testing the API

You can test the endpoints using:

- **Postman** - Import the endpoints and test
- **curl** - Command line testing
- **Browser** - For GET requests

Example curl command:

```bash
curl http://localhost:8080/api/profile/skills/all
```

## Troubleshooting

### Issue: "password authentication failed"

**Solution:** Update the database credentials in `application.properties`

### Issue: "database does not exist"

**Solution:** Create the database in PostgreSQL first

### Issue: "Port 8080 already in use"

**Solution:** Stop any other application using port 8080 or change the port in `application.properties`:

```properties
server.port=8081
```

### Issue: Migration doesn't run

**Solution:** Check Flyway is enabled in `application.properties`:

```properties
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
```

## Next Steps

After the backend is running successfully:

1. **Test API Endpoints** - Use Postman to test all endpoints
2. **Implement Frontend** - Create React components for the profile UI
3. **Add Authentication** - Secure the endpoints with JWT
4. **Deploy** - Deploy to production environment

## Support

For more details, see:

- `ENHANCED_PROFILE_IMPLEMENTATION.md` - Complete implementation documentation
- `back-end/README.md` - Backend setup guide
- `database/README.md` - Database documentation
