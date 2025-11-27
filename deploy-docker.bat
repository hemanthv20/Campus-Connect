@echo off
echo ========================================
echo CampusConnect Docker Deployment Script
echo ========================================

echo.
echo Building Backend Docker Image...
cd back-end
docker build -t campusconnect-backend .
if %errorlevel% neq 0 (
    echo Backend build failed!
    pause
    exit /b 1
)

echo.
echo Building Frontend Docker Image...
cd ../front-end
docker build -t campusconnect-frontend .
if %errorlevel% neq 0 (
    echo Frontend build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Docker Images Built Successfully!
echo ========================================
echo.
echo Backend Image: campusconnect-backend
echo Frontend Image: campusconnect-frontend
echo.
echo To run the containers:
echo docker run -p 8080:8080 campusconnect-backend
echo docker run -p 3000:3000 campusconnect-frontend
echo.
echo Or use docker-compose:
echo docker-compose up
echo.
pause