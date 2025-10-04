import { AuthService, AuthUser } from '../services/auth';

export interface AuthContext {
  user?: AuthUser;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isModerator: boolean;
}

/**
 * Extract user from JWT token in Authorization header
 */
export function extractUserFromToken(authHeader?: string): AuthUser | null {
  if (!authHeader) {
    return null;
  }

  // Extract token from "Bearer <token>" format
  const token = authHeader.replace('Bearer ', '');
  
  if (!token) {
    return null;
  }

  return AuthService.verifyToken(token);
}

/**
 * Create authentication context for GraphQL resolvers
 */
export function createAuthContext(req: any): AuthContext {
  const authHeader = req.headers.authorization;
  const user = extractUserFromToken(authHeader);

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isModerator: user?.role === 'moderator' || user?.role === 'admin'
  };
}

/**
 * Authentication guard - throws error if user is not authenticated
 */
export function requireAuth(context: AuthContext): AuthUser {
  if (!context.isAuthenticated || !context.user) {
    throw new Error('Authentication required');
  }
  return context.user;
}

/**
 * Admin guard - throws error if user is not admin
 */
export function requireAdmin(context: AuthContext): AuthUser {
  const user = requireAuth(context);
  if (user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return user;
}

/**
 * Moderator guard - throws error if user is not moderator or admin
 */
export function requireModerator(context: AuthContext): AuthUser {
  const user = requireAuth(context);
  if (user.role !== 'moderator' && user.role !== 'admin') {
    throw new Error('Moderator access required');
  }
  return user;
}

/**
 * Check if user can access a resource (own resource or admin/moderator)
 */
export function canAccessResource(context: AuthContext, resourceUserId: string): boolean {
  if (!context.isAuthenticated || !context.user) {
    return false;
  }

  // Admin and moderators can access any resource
  if (context.isModerator) {
    return true;
  }

  // Users can only access their own resources
  return context.user.id === resourceUserId;
}
