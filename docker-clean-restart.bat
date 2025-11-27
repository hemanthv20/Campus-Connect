@echo off
echo Stopping and removing all containers...
docker-compose down -v

echo Removing all images...
docker-compose down --rmi all

echo Cleaning up Docker system...
docker system prune -f

echo Starting fresh containers...
docker-compose up --build -d

echo Waiting for services to start...
timeout /t 30

echo Checking container status...
docker-compose ps

echo Done! Your application should be running with a clean database.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo Admin credentials: admin / Admin@123