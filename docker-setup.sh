#!/bin/bash

# CampusConnect Docker Setup Script

set -e

echo "🚀 CampusConnect Docker Setup"
echo "=============================="

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker and try again."
        exit 1
    fi
    echo "✅ Docker is running"
}

# Function to check if Docker Compose is available
check_docker_compose() {
    if ! command -v docker-compose > /dev/null 2>&1; then
        echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
        exit 1
    fi
    echo "✅ Docker Compose is available"
}

# Function to build and start services
start_services() {
    local env=$1
    
    if [ "$env" = "dev" ]; then
        echo "🔧 Starting development environment..."
        docker-compose -f docker-compose.dev.yml down --remove-orphans
        docker-compose -f docker-compose.dev.yml up --build -d
        echo "🎉 Development environment started!"
        echo "📱 Frontend: http://localhost:3000"
        echo "🔧 Backend: http://localhost:8081"
        echo "🗄️  Database: localhost:5432"
        echo "🐛 Backend Debug: localhost:5005"
    else
        echo "🚀 Starting production environment..."
        docker-compose down --remove-orphans
        docker-compose up --build -d
        echo "🎉 Production environment started!"
        echo "📱 Frontend: http://localhost:3000"
        echo "🔧 Backend: http://localhost:8081"
        echo "🗄️  Database: localhost:5432"
    fi
}

# Function to stop services
stop_services() {
    local env=$1
    
    if [ "$env" = "dev" ]; then
        echo "🛑 Stopping development environment..."
        docker-compose -f docker-compose.dev.yml down
    else
        echo "🛑 Stopping production environment..."
        docker-compose down
    fi
    echo "✅ Services stopped"
}

# Function to show logs
show_logs() {
    local env=$1
    local service=$2
    
    if [ "$env" = "dev" ]; then
        if [ -n "$service" ]; then
            docker-compose -f docker-compose.dev.yml logs -f "$service"
        else
            docker-compose -f docker-compose.dev.yml logs -f
        fi
    else
        if [ -n "$service" ]; then
            docker-compose logs -f "$service"
        else
            docker-compose logs -f
        fi
    fi
}

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up Docker resources..."
    docker-compose down --remove-orphans --volumes
    docker-compose -f docker-compose.dev.yml down --remove-orphans --volumes
    docker system prune -f
    echo "✅ Cleanup completed"
}

# Main script logic
case "$1" in
    "start")
        check_docker
        check_docker_compose
        start_services "${2:-prod}"
        ;;
    "stop")
        stop_services "${2:-prod}"
        ;;
    "logs")
        show_logs "${2:-prod}" "$3"
        ;;
    "cleanup")
        cleanup
        ;;
    "restart")
        stop_services "${2:-prod}"
        start_services "${2:-prod}"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|logs|cleanup} [dev|prod] [service]"
        echo ""
        echo "Commands:"
        echo "  start [dev|prod]     - Start the application (default: prod)"
        echo "  stop [dev|prod]      - Stop the application"
        echo "  restart [dev|prod]   - Restart the application"
        echo "  logs [dev|prod] [service] - Show logs (optionally for specific service)"
        echo "  cleanup              - Clean up all Docker resources"
        echo ""
        echo "Examples:"
        echo "  $0 start dev         - Start development environment"
        echo "  $0 start             - Start production environment"
        echo "  $0 logs dev backend  - Show backend logs in dev environment"
        echo "  $0 stop              - Stop production environment"
        exit 1
        ;;
esac