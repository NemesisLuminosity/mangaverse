# Create database and user for Manga Database
Write-Host "Creating Manga Database..." -ForegroundColor Green

# Try with default postgres password
$env:PGPASSWORD = "postgres"

# Create database
Write-Host "Creating database 'manga_database'..." -ForegroundColor Yellow
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE manga_database;"

if ($LASTEXITCODE -eq 0) {
    # Create user
    Write-Host "Creating user 'manga_user'..." -ForegroundColor Yellow
    & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE USER manga_user WITH PASSWORD 'manga_password';"
    
    # Grant privileges
    Write-Host "Granting privileges..." -ForegroundColor Yellow
    & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE manga_database TO manga_user;"
    
    Write-Host "Database setup complete!" -ForegroundColor Green
} else {
    Write-Host "Password 'postgres' didn't work. Please check your PostgreSQL password." -ForegroundColor Red
    Write-Host "You can reset the postgres password using pgAdmin or by running:" -ForegroundColor Yellow
    Write-Host "net user postgres /active:yes" -ForegroundColor Cyan
}
