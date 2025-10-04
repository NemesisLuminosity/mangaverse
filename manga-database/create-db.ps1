# Create database and user for Manga Database
Write-Host "Creating Manga Database..." -ForegroundColor Green

# Set the postgres password (you'll need to enter this when prompted)
$env:PGPASSWORD = "manga_password"

# Create database
Write-Host "Creating database 'manga_database'..." -ForegroundColor Yellow
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE manga_database;"

# Create user
Write-Host "Creating user 'manga_user'..." -ForegroundColor Yellow
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE USER manga_user WITH PASSWORD 'manga_password';"

# Grant privileges
Write-Host "Granting privileges..." -ForegroundColor Yellow
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE manga_database TO manga_user;"

Write-Host "Database setup complete!" -ForegroundColor Green
Write-Host "You can now run: npm run db:setup" -ForegroundColor Cyan
