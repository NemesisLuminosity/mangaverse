import { PrismaClient } from '@prisma/client';
import { AuthService } from '../services/auth';
import { createAuthContext, requireAuth, requireAdmin, canAccessResource } from '../middleware/auth';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    // Manga queries
    manga: async (_, { id }, context) => {
      const manga = await prisma.manga.findUnique({
        where: { id },
        include: {
          userLists: {
            include: {
              user: true
            }
          },
          favorites: {
            include: {
              user: true
            }
          },
          reviews: {
            include: {
              user: true
            }
          }
        }
      });
      return manga;
    },
    
    mangas: async (_, { filters, limit = 20, offset = 0 }, context) => {
      const where: any = {};
      
      if (filters) {
        if (filters.title) {
          where.title = {
            contains: filters.title,
            mode: 'insensitive'
          };
        }
        if (filters.author) {
          where.author = {
            contains: filters.author,
            mode: 'insensitive'
          };
        }
        if (filters.genre) {
          where.genre = {
            contains: filters.genre,
            mode: 'insensitive'
          };
        }
        if (filters.status) {
          where.status = filters.status;
        }
      }

      const mangas = await prisma.manga.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' }
      });
      
      return mangas;
    },
    
    searchManga: async (_, { query, limit = 20, offset = 0 }, context) => {
      const mangas = await prisma.manga.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { author: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' }
      });
      
      return mangas;
    },
    
    // User queries
    user: async (_, { id }, context) => {
      const authContext = createAuthContext(context.req);
      
      // Users can only view their own profile unless they're admin/moderator
      if (!canAccessResource(authContext, id)) {
        throw new Error('Access denied');
      }

      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          mangaLists: {
            include: {
              manga: true
            }
          },
          favorites: {
            include: {
              manga: true
            }
          },
          reviews: {
            include: {
              manga: true
            }
          }
        }
      });
      
      return user;
    },
    
    users: async (_, __, context) => {
      const authContext = createAuthContext(context.req);
      requireAdmin(authContext); // Only admins can view all users

      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      return users;
    },
    
    // User manga list queries
    userMangaLists: async (_, { userId, listType }, context) => {
      const authContext = createAuthContext(context.req);
      
      // Users can only view their own lists unless they're admin/moderator
      if (!canAccessResource(authContext, userId)) {
        throw new Error('Access denied');
      }

      const where: any = { userId };
      if (listType) {
        where.listType = listType;
      }

      const lists = await prisma.userMangaList.findMany({
        where,
        include: {
          manga: true,
          user: true
        },
        orderBy: { createdAt: 'desc' }
      });
      
      return lists;
    },
    
    userFavorites: async (_, { userId }, context) => {
      const authContext = createAuthContext(context.req);
      
      // Users can only view their own favorites unless they're admin/moderator
      if (!canAccessResource(authContext, userId)) {
        throw new Error('Access denied');
      }

      const favorites = await prisma.userFavorite.findMany({
        where: { userId },
        include: {
          manga: true,
          user: true
        },
        orderBy: { createdAt: 'desc' }
      });
      
      return favorites;
    },
  },
  
  Mutation: {
    // Manga mutations (admin only)
    createManga: async (_, { input }, context) => {
      const authContext = createAuthContext(context.req);
      requireAdmin(authContext);

      const manga = await prisma.manga.create({
        data: input
      });
      
      return manga;
    },
    
    updateManga: async (_, { id, input }, context) => {
      const authContext = createAuthContext(context.req);
      requireAdmin(authContext);

      const manga = await prisma.manga.update({
        where: { id },
        data: input
      });
      
      return manga;
    },
    
    deleteManga: async (_, { id }, context) => {
      const authContext = createAuthContext(context.req);
      requireAdmin(authContext);

      await prisma.manga.delete({
        where: { id }
      });
      
      return true;
    },
    
    // User mutations
    register: async (_, { input }, context) => {
      try {
        const result = await AuthService.register(
          input.email,
          input.username,
          input.password
        );
        
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    
    login: async (_, { email, password }, context) => {
      try {
        const result = await AuthService.login(email, password);
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    
    updateUser: async (_, { id, input }, context) => {
      const authContext = createAuthContext(context.req);
      const currentUser = requireAuth(authContext);
      
      // Users can only update their own profile unless they're admin
      if (currentUser.id !== id && !authContext.isAdmin) {
        throw new Error('Access denied');
      }

      const user = await AuthService.updateUser(id, input);
      
      return user;
    },
    
    // User manga list mutations
    addToUserList: async (_, { userId, mangaId, listType }, context) => {
      const authContext = createAuthContext(context.req);
      const currentUser = requireAuth(authContext);
      
      // Users can only add to their own list
      if (currentUser.id !== userId) {
        throw new Error('Access denied');
      }

      // Check if manga exists
      const manga = await prisma.manga.findUnique({
        where: { id: mangaId }
      });
      
      if (!manga) {
        throw new Error('Manga not found');
      }

      // Check if already in list
      const existing = await prisma.userMangaList.findFirst({
        where: {
          userId,
          mangaId,
          listType
        }
      });

      if (existing) {
        throw new Error('Manga already in this list');
      }

      const listEntry = await prisma.userMangaList.create({
        data: {
          userId,
          mangaId,
          listType,
          progress: 0
        },
        include: {
          manga: true,
          user: true
        }
      });
      
      return listEntry;
    },
    
    updateUserList: async (_, { id, rating, review, progress }, context) => {
      const authContext = createAuthContext(context.req);
      const currentUser = requireAuth(authContext);

      // Get the list entry to check ownership
      const listEntry = await prisma.userMangaList.findUnique({
        where: { id }
      });

      if (!listEntry) {
        throw new Error('List entry not found');
      }

      // Users can only update their own entries
      if (listEntry.userId !== currentUser.id) {
        throw new Error('Access denied');
      }

      const updatedEntry = await prisma.userMangaList.update({
        where: { id },
        data: {
          ...(rating !== undefined && { rating }),
          ...(review !== undefined && { review }),
          ...(progress !== undefined && { progress })
        },
        include: {
          manga: true,
          user: true
        }
      });
      
      return updatedEntry;
    },
    
    removeFromUserList: async (_, { id }, context) => {
      const authContext = createAuthContext(context.req);
      const currentUser = requireAuth(authContext);

      // Get the list entry to check ownership
      const listEntry = await prisma.userMangaList.findUnique({
        where: { id }
      });

      if (!listEntry) {
        throw new Error('List entry not found');
      }

      // Users can only remove their own entries
      if (listEntry.userId !== currentUser.id) {
        throw new Error('Access denied');
      }

      await prisma.userMangaList.delete({
        where: { id }
      });
      
      return true;
    },
    
    toggleFavorite: async (_, { userId, mangaId }, context) => {
      const authContext = createAuthContext(context.req);
      const currentUser = requireAuth(authContext);
      
      // Users can only toggle their own favorites
      if (currentUser.id !== userId) {
        throw new Error('Access denied');
      }

      // Check if manga exists
      const manga = await prisma.manga.findUnique({
        where: { id: mangaId }
      });
      
      if (!manga) {
        throw new Error('Manga not found');
      }

      // Check if already favorited
      const existing = await prisma.userFavorite.findFirst({
        where: {
          userId,
          mangaId
        }
      });

      if (existing) {
        // Remove from favorites
        await prisma.userFavorite.delete({
          where: { id: existing.id }
        });
        return null; // Return null to indicate removed
      } else {
        // Add to favorites
        const favorite = await prisma.userFavorite.create({
          data: {
            userId,
            mangaId
          },
          include: {
            manga: true,
            user: true
          }
        });
        return favorite;
      }
    },
  },
};