# Create database and user for Manga Database
Write-Host "Creating Manga Database..." -ForegroundColor Green

# Use the correct postgres password
$env:PGPASSWORD = "123"

# Create database
Write-Host "Creating database 'manga_database'..." -ForegroundColor Yellow
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE manga_database;"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database created successfully!" -ForegroundColor Green
    
    # Create user
    Write-Host "Creating user 'manga_user'..." -ForegroundColor Yellow
    & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE USER manga_user WITH PASSWORD 'manga_password';"
    
    # Grant privileges
    Write-Host "Granting privileges..." -ForegroundColor Yellow
    & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE manga_database TO manga_user;"
    
    # Grant schema privileges
    Write-Host "Granting schema privileges..." -ForegroundColor Yellow
    & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d manga_database -c "GRANT ALL ON SCHEMA public TO manga_user;"
    & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d manga_database -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO manga_user;"
    & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d manga_database -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO manga_user;"
    
    Write-Host "🎉 Database setup complete!" -ForegroundColor Green
    Write-Host "You can now run: npm run db:setup" -ForegroundColor Cyan
} else {
    Write-Host "❌ Database creation failed. Please check the error above." -ForegroundColor Red
}
