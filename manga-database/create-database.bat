@echo off
echo Creating Manga Database...
echo.

echo Step 1: Creating database and user...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -f setup-db.sql

echo.
echo Step 2: Running Prisma migration...
cd backend
set DATABASE_URL=postgresql://manga_user:manga_password@localhost:5432/manga_database
npx prisma migrate dev --name init

echo.
echo Step 3: Seeding database...
npm run prisma:seed

echo.
echo Database setup complete!
echo You can now start the backend server with: npm run dev
pause
