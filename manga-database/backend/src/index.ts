import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import GraphQL schema and resolvers
import { typeDefs } from './schema/schema';
import { resolvers } from './resolvers';
import { connectDatabase, disconnectDatabase } from './services/database';

async function startServer() {
  try {
    // Connect to database
    await connectDatabase();

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // Start the server
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req }) => {
        // Add authentication context here
        return { req };
      },
    });

    console.log(`🚀 Server ready at ${url}`);
    console.log(`📊 GraphQL endpoint available at ${url}`);
    console.log(`🗄️  Database connected successfully`);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    await disconnectDatabase();
    process.exit(1);
  }
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
