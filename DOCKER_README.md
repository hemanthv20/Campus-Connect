# CampusConnect Docker Setup

This document provides instructions for running CampusConnect using Docker containers.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)
- At least 4GB of available RAM
- Ports 3000, 8081, and 5432 available

## Quick Start

### Production Environment

```bash
# Windows
docker-setup.bat start

# Linux/Mac
./docker-setup.sh start
```

### Development Environment

```bash
# Windows
docker-setup.bat start dev

# Linux/Mac
./docker-setup.sh start dev
```

## Manual Setup

### Production Environment

```bash
# Build and start all services
docker-compose up --build -d

# Stop services
docker-compose down
```

### Development Environment

```bash
# Build and start development services
docker-compose -f docker-compose.dev.yml up --build -d

# Stop development services
docker-compose -f docker-compose.dev.yml down
```

## Services

### Production Services

- **Frontend**: React application served by Nginx on port 3000
- **Backend**: Spring Boot application on port 8081
- **Database**: PostgreSQL database on port 5432

### Development Services

- **Frontend**: React development server with hot reload on port 3000
- **Backend**: Spring Boot with debug port 5005 and hot reload
- **Database**: PostgreSQL database on port 5432

## Environment Variables

### Frontend (.env.local)

```env
REACT_APP_API_URL=http://localhost:8081
REACT_APP_APP_NAME=CampusConnect
REACT_APP_VERSION=1.0.0
```

### Backend (.env)

```env
DATA_SOURCE_URL=jdbc:postgresql://database:5432/campusconnect
DATA_SOURCE_USER=postgres
DATA_SOURCE_PASSWORD=postgres123
FRONTEND_URL=http://localhost:3000
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## Useful Commands

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database

# Development environment
docker-compose -f docker-compose.dev.yml logs -f backend
```

### Database Access

```bash
# Connect to PostgreSQL
docker exec -it campusconnect-db psql -U postgres -d campusconnect

# Or for development
docker exec -it campusconnect-db-dev psql -U postgres -d campusconnect_dev
```

### Rebuild Services

```bash
# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Rebuild and restart
docker-compose up --build -d
```

### Clean Up

```bash
# Stop and remove containers, networks, and volumes
docker-compose down --volumes

# Remove unused Docker resources
docker system prune -f

# Complete cleanup (use script)
./docker-setup.sh cleanup
```

## Development Features

### Hot Reload

- **Frontend**: React development server automatically reloads on file changes
- **Backend**: Spring Boot DevTools enables automatic restart on Java file changes

### Debugging

- **Backend**: Debug port 5005 is exposed for IDE debugging
- **Frontend**: Source maps enabled for browser debugging

### Volume Mounts

Development environment mounts source code directories for live editing:

- `./front-end/src` → `/app/src`
- `./back-end/src` → `/app/src`

## Troubleshooting

### Port Conflicts

If ports are already in use, modify the port mappings in docker-compose.yml:

```yaml
ports:
  - "3001:3000" # Change frontend port to 3001
  - "8082:8080" # Change backend port to 8082
```

### Database Connection Issues

1. Ensure PostgreSQL container is healthy:

   ```bash
   docker-compose ps
   ```

2. Check database logs:

   ```bash
   docker-compose logs database
   ```

3. Verify database initialization:
   ```bash
   docker exec -it campusconnect-db psql -U postgres -d campusconnect -c "\dt"
   ```

### Memory Issues

If containers are killed due to memory constraints:

1. Increase Docker Desktop memory allocation (Settings → Resources → Memory)
2. Close unnecessary applications
3. Use development environment which uses less memory

### Build Failures

1. Clear Docker cache:

   ```bash
   docker builder prune -f
   ```

2. Rebuild without cache:

   ```bash
   docker-compose build --no-cache
   ```

3. Check .dockerignore files for excluded necessary files

## Security Notes

- Default passwords are used for development only
- Change passwords in production environments
- Non-root users are configured in production containers
- Security headers are configured in Nginx

## Performance Optimization

### Production

- Multi-stage builds reduce image size
- Nginx serves static files efficiently
- Gzip compression enabled
- Static asset caching configured

### Development

- Volume mounts for fast file changes
- Dependency caching in Docker layers
- Debug ports for IDE integration

## Monitoring

### Health Checks

Services include health checks for monitoring:

```bash
# Check service health
docker-compose ps

# View health check logs
docker inspect campusconnect-backend --format='{{.State.Health}}'
```

### Resource Usage

```bash
# Monitor resource usage
docker stats

# View container processes
docker-compose top
```
