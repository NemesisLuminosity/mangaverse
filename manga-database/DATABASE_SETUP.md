# Database Setup Guide

## Prerequisites

Before setting up the database, you need to have PostgreSQL installed and running on your system.

### Option 1: Local PostgreSQL Installation

1. **Download PostgreSQL**: Visit https://www.postgresql.org/download/ and download the installer for Windows
2. **Install PostgreSQL**: Run the installer and follow the setup wizard
3. **Create Database**: Create a database named `manga_database`
4. **Create User**: Create a user `manga_user` with password `manga_password`

### Option 2: Docker PostgreSQL (Recommended)

Use the provided Docker Compose setup:

```bash
# From the project root directory
docker-compose up -d postgres
```

This will start PostgreSQL with:
- Database: `manga_database`
- User: `manga_user`
- Password: `manga_password`
- Port: `5432`

## Database Setup Steps

### 1. Navigate to Backend Directory

```bash
cd C:\Users\Aaryan\manga-database\manga-database\backend
```

### 2. Copy Environment File

```bash
copy env.local .env
```

### 3. Run Database Migration

```bash
npm run prisma:migrate
```

This will:
- Create the database tables
- Set up all relationships and indexes
- Create the initial migration

### 4. Seed the Database (Optional)

```bash
npm run prisma:seed
```

This will populate the database with sample manga data.

### 5. Start the Backend Server

```bash
npm run dev
```

## Database Schema

The database includes the following tables:

- **users**: User accounts and authentication
- **manga**: Manga information and metadata
- **user_manga_lists**: User's personal manga lists (reading, completed, etc.)
- **user_favorites**: User's favorite manga
- **user_reviews**: User reviews and ratings

## Useful Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Open Prisma Studio (Database GUI)
npm run prisma:studio

# Reset database (WARNING: This will delete all data)
npx prisma migrate reset

# View database status
npx prisma db pull
```

## Troubleshooting

### Connection Issues

1. **Check PostgreSQL is running**: Make sure PostgreSQL service is started
2. **Verify connection string**: Check the DATABASE_URL in your .env file
3. **Check firewall**: Ensure port 5432 is not blocked

### Migration Issues

1. **Reset database**: `npx prisma migrate reset`
2. **Check schema**: Verify your schema.prisma file is correct
3. **Regenerate client**: `npm run prisma:generate`

## Next Steps

Once the database is set up:

1. The backend server will connect automatically
2. You can test the GraphQL endpoint at http://localhost:4000
3. Use Prisma Studio to view and manage data
4. Continue with implementing the GraphQL resolvers
