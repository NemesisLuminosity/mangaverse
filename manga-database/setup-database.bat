@echo off
echo Setting up Manga Database...
echo.

cd backend

echo Copying environment file...
copy env.local .env

echo.
echo Generating Prisma client...
call npm run prisma:generate

echo.
echo Database setup complete!
echo.
echo Next steps:
echo 1. Make sure PostgreSQL is running
echo 2. Run: npm run prisma:migrate
echo 3. Run: npm run prisma:seed (optional)
echo 4. Start the server: npm run dev
echo.
pause
