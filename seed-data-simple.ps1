# Simple Skills & Interests Seed Script for PowerShell
# This script populates the skills and interests tables

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Seeding Skills & Interests Data" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$BASE_URL = "http://localhost:8081"

# Check if backend is running
Write-Host "Checking if backend is running..." -ForegroundColor Yellow
try {
    $healthCheck = Invoke-WebRequest -Uri "$BASE_URL/actuator/health" -Method Get -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✓ Backend is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Backend is not running on $BASE_URL" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start the backend first:" -ForegroundColor Yellow
    Write-Host "  cd CampusConnect\back-end" -ForegroundColor White
    Write-Host "  .\mvnw spring-boot:run" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Seed Skills
Write-Host "Seeding Skills..." -ForegroundColor Yellow
try {
    $skillsResponse = Invoke-RestMethod -Uri "$BASE_URL/api/seed/skills" -Method Post -ContentType "application/json" -ErrorAction Stop
    
    if ($skillsResponse.success) {
        Write-Host "✓ Skills seeded successfully" -ForegroundColor Green
        Write-Host "  Created: $($skillsResponse.count) skills" -ForegroundColor Gray
    } else {
        Write-Host "✗ Skills seeding failed: $($skillsResponse.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Error seeding skills: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Seed Interests
Write-Host "Seeding Interests..." -ForegroundColor Yellow
try {
    $interestsResponse = Invoke-RestMethod -Uri "$BASE_URL/api/seed/interests" -Method Post -ContentType "application/json" -ErrorAction Stop
    
    if ($interestsResponse.success) {
        Write-Host "✓ Interests seeded successfully" -ForegroundColor Green
        Write-Host "  Created: $($interestsResponse.count) interests" -ForegroundColor Gray
    } else {
        Write-Host "✗ Interests seeding failed: $($interestsResponse.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Error seeding interests: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Verify seeding
Write-Host "Verifying seeded data..." -ForegroundColor Yellow
try {
    $skills = Invoke-RestMethod -Uri "$BASE_URL/api/profile/skills/all" -Method Get -ErrorAction Stop
    $interests = Invoke-RestMethod -Uri "$BASE_URL/api/profile/interests/all" -Method Get -ErrorAction Stop
    
    Write-Host "✓ Skills count: $($skills.Count)" -ForegroundColor Green
    Write-Host "✓ Interests count: $($interests.Count)" -ForegroundColor Green
    
    if ($skills.Count -gt 0 -and $interests.Count -gt 0) {
        Write-Host ""
        Write-Host "================================" -ForegroundColor Green
        Write-Host "SUCCESS! Data seeded successfully" -ForegroundColor Green
        Write-Host "================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next Steps:" -ForegroundColor Cyan
        Write-Host "1. Refresh your React app" -ForegroundColor White
        Write-Host "2. Go to Profile page" -ForegroundColor White
        Write-Host "3. Skills and Interests dropdowns should now be populated" -ForegroundColor White
        Write-Host ""
        Write-Host "Test URLs:" -ForegroundColor Cyan
        Write-Host "  Skills: $BASE_URL/api/profile/skills/all" -ForegroundColor Gray
        Write-Host "  Interests: $BASE_URL/api/profile/interests/all" -ForegroundColor Gray
    } else {
        Write-Host ""
        Write-Host "WARNING: Data may not have been seeded properly" -ForegroundColor Yellow
        Write-Host "Check the backend logs for errors" -ForegroundColor Yellow
    }
} catch {
    Write-Host "✗ Error verifying data: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to exit"
