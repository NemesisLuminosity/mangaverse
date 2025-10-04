# Manga Database Website

A comprehensive manga tracking and discovery platform built with React, GraphQL, Node.js, and PostgreSQL.

## Features

- 📚 **Manga Database**: Comprehensive manga catalog with metadata
- 🔍 **Advanced Search**: Filter by genre, author, status, and more
- 👤 **User Accounts**: Personal tracking lists, ratings, and reviews
- 🔐 **Authentication**: JWT + social login (Google, GitHub)
- 📱 **Mobile-First**: Responsive design with infinite scrolling
- 🚀 **Performance**: Redis caching and optimized queries
- 🌐 **External APIs**: Integration with MyAnimeList and AniList

## Tech Stack

### Frontend
- React 18 with TypeScript
- Apollo Client for GraphQL
- Material-UI for components
- React Router for navigation

### Backend
- Node.js with Express
- Apollo Server for GraphQL
- PostgreSQL database
- Redis for caching
- JWT authentication
- Passport.js for OAuth

### Development
- Docker & Docker Compose
- TypeScript
- Prisma ORM
- Jest for testing

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (if running locally)
- Redis (if running locally)

### Development Setup

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd manga-database
   ```

2. **Environment Configuration**
   ```bash
   # Copy environment template
   cp backend/env.example backend/.env
   
   # Edit backend/.env with your configuration
   ```

3. **Start with Docker (Recommended)**
   ```bash
   docker-compose up -d
   ```

4. **Or start locally**
   ```bash
   # Backend
   cd backend
   npm install
   npm run dev
   
   # Frontend (in another terminal)
   cd frontend
   npm install
   npm start
   ```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend GraphQL**: http://localhost:4000/graphql
- **Health Check**: http://localhost:4000/health

## Project Structure

```
manga-database/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── graphql/         # GraphQL queries/mutations
│   │   └── ...
│   └── package.json
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── resolvers/       # GraphQL resolvers
│   │   ├── schema/          # GraphQL schema
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   └── ...
│   └── package.json
├── planning/                 # Project documentation
│   └── 13-plan-manga-database/
│       ├── prd.md
│       ├── technical_blueprint.md
│       └── tasks.md
└── docker-compose.yml
```

## Development Commands

### Backend
```bash
cd backend

# Development
npm run dev          # Start with nodemon
npm run build        # Build TypeScript
npm start           # Start production server

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open Prisma Studio

# Testing
npm test            # Run tests
```

### Frontend
```bash
cd frontend

# Development
npm start           # Start development server
npm run build       # Build for production
npm test           # Run tests
```

## API Documentation

### GraphQL Endpoints

#### Queries
- `manga(id: ID!)` - Get manga by ID
- `mangas(filters, limit, offset)` - List manga with filters
- `searchManga(query, limit, offset)` - Search manga
- `user(id: ID!)` - Get user by ID
- `userMangaLists(userId, listType)` - Get user's manga lists

#### Mutations
- `createManga(input)` - Create manga (admin)
- `updateManga(id, input)` - Update manga (admin)
- `registerUser(email, username, password)` - Register user
- `loginUser(email, password)` - Login user
- `addToUserList(userId, mangaId, listType)` - Add to user list

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details
