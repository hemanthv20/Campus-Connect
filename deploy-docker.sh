#!/bin/bash

echo "========================================"
echo "CampusConnect Docker Deployment Script"
echo "========================================"

echo ""
echo "Building Backend Docker Image..."
cd back-end
if docker build -t campusconnect-backend .; then
    echo "✅ Backend build successful!"
else
    echo "❌ Backend build failed!"
    exit 1
fi

echo ""
echo "Building Frontend Docker Image..."
cd ../front-end
if docker build -t campusconnect-frontend .; then
    echo "✅ Frontend build successful!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

echo ""
echo "========================================"
echo "✅ Docker Images Built Successfully!"
echo "========================================"
echo ""
echo "Backend Image: campusconnect-backend"
echo "Frontend Image: campusconnect-frontend"
echo ""
echo "To run the containers:"
echo "docker run -p 8080:8080 campusconnect-backend"
echo "docker run -p 3000:3000 campusconnect-frontend"
echo ""
echo "Or use docker-compose:"
echo "docker-compose up"
echo ""