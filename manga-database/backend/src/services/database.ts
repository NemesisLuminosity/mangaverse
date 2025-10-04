import { PrismaClient } from '@prisma/client';

// Create a singleton instance of PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database connection helper
export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

// Database disconnection helper
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
  } catch (error) {
    console.error('❌ Database disconnection failed:', error);
    throw error;
  }
}

// Health check for database
export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', message: 'Database is accessible' };
  } catch (error) {
    return { status: 'unhealthy', message: 'Database is not accessible', error };
  }
}
