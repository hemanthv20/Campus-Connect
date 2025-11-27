@echo off
setlocal enabledelayedexpansion

REM CampusConnect Docker Setup Script for Windows

echo 🚀 CampusConnect Docker Setup
echo ==============================

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker and try again.
    exit /b 1
)
echo ✅ Docker is running

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose and try again.
    exit /b 1
)
echo ✅ Docker Compose is available

REM Parse command line arguments
set COMMAND=%1
set ENVIRONMENT=%2
set SERVICE=%3

if "%ENVIRONMENT%"=="" set ENVIRONMENT=prod

REM Main script logic
if "%COMMAND%"=="start" goto start
if "%COMMAND%"=="stop" goto stop
if "%COMMAND%"=="restart" goto restart
if "%COMMAND%"=="logs" goto logs
if "%COMMAND%"=="cleanup" goto cleanup
goto usage

:start
if "%ENVIRONMENT%"=="dev" (
    echo 🔧 Starting development environment...
    docker-compose -f docker-compose.dev.yml down --remove-orphans
    docker-compose -f docker-compose.dev.yml up --build -d
    echo 🎉 Development environment started!
    echo 📱 Frontend: http://localhost:3000
    echo 🔧 Backend: http://localhost:8081
    echo 🗄️  Database: localhost:5432
    echo 🐛 Backend Debug: localhost:5005
) else (
    echo 🚀 Starting production environment...
    docker-compose down --remove-orphans
    docker-compose up --build -d
    echo 🎉 Production environment started!
    echo 📱 Frontend: http://localhost:3000
    echo 🔧 Backend: http://localhost:8081
    echo 🗄️  Database: localhost:5432
)
goto end

:stop
if "%ENVIRONMENT%"=="dev" (
    echo 🛑 Stopping development environment...
    docker-compose -f docker-compose.dev.yml down
) else (
    echo 🛑 Stopping production environment...
    docker-compose down
)
echo ✅ Services stopped
goto end

:restart
call :stop
call :start
goto end

:logs
if "%ENVIRONMENT%"=="dev" (
    if not "%SERVICE%"=="" (
        docker-compose -f docker-compose.dev.yml logs -f %SERVICE%
    ) else (
        docker-compose -f docker-compose.dev.yml logs -f
    )
) else (
    if not "%SERVICE%"=="" (
        docker-compose logs -f %SERVICE%
    ) else (
        docker-compose logs -f
    )
)
goto end

:cleanup
echo 🧹 Cleaning up Docker resources...
docker-compose down --remove-orphans --volumes
docker-compose -f docker-compose.dev.yml down --remove-orphans --volumes
docker system prune -f
echo ✅ Cleanup completed
goto end

:usage
echo Usage: %0 {start^|stop^|restart^|logs^|cleanup} [dev^|prod] [service]
echo.
echo Commands:
echo   start [dev^|prod]     - Start the application (default: prod)
echo   stop [dev^|prod]      - Stop the application
echo   restart [dev^|prod]   - Restart the application
echo   logs [dev^|prod] [service] - Show logs (optionally for specific service)
echo   cleanup              - Clean up all Docker resources
echo.
echo Examples:
echo   %0 start dev         - Start development environment
echo   %0 start             - Start production environment
echo   %0 logs dev backend  - Show backend logs in dev environment
echo   %0 stop              - Stop production environment
exit /b 1

:end