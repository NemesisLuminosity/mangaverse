import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
  emailVerified: boolean;
}

export interface LoginResult {
  user: AuthUser;
  token: string;
}

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here-change-this-in-production';
  private static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

  /**
   * Hash a password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare a password with its hash
   */
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Generate a JWT token for a user
   */
  static generateToken(user: AuthUser): string {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      emailVerified: user.emailVerified
    };

    const secret = this.JWT_SECRET || 'fallback-secret-key';
    const expiresIn = this.JWT_EXPIRES_IN || '7d';

    return (jwt as any).sign(payload, secret, { expiresIn });
  }

  /**
   * Verify and decode a JWT token
   */
  static verifyToken(token: string): AuthUser | null {
    try {
      const secret = this.JWT_SECRET || 'fallback-secret-key';
      const decoded = (jwt as any).verify(token, secret);
      return {
        id: decoded.id,
        email: decoded.email,
        username: decoded.username,
        role: decoded.role,
        emailVerified: decoded.emailVerified
      };
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  /**
   * Register a new user
   */
  static async register(email: string, username: string, password: string): Promise<LoginResult> {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        throw new Error('User with this email already exists');
      }
      if (existingUser.username === username.toLowerCase()) {
        throw new Error('Username is already taken');
      }
    }

    // Hash password
    const passwordHash = await this.hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        passwordHash,
        role: 'user',
        emailVerified: false
      }
    });

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      emailVerified: user.emailVerified
    };

    const token = this.generateToken(authUser);

    return {
      user: authUser,
      token
    };
  }

  /**
   * Login a user
   */
  static async login(email: string, password: string): Promise<LoginResult> {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.passwordHash) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await this.comparePassword(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      emailVerified: user.emailVerified
    };

    const token = this.generateToken(authUser);

    return {
      user: authUser,
      token
    };
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string): Promise<AuthUser | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      emailVerified: user.emailVerified
    };
  }

  /**
   * Update user profile
   */
  static async updateUser(id: string, updates: {
    username?: string;
    email?: string;
    role?: string;
  }): Promise<AuthUser> {
    // Check if username is taken (if updating username)
    if (updates.username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: updates.username.toLowerCase(),
          NOT: { id }
        }
      });

      if (existingUser) {
        throw new Error('Username is already taken');
      }
    }

    // Check if email is taken (if updating email)
    if (updates.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: updates.email.toLowerCase(),
          NOT: { id }
        }
      });

      if (existingUser) {
        throw new Error('Email is already taken');
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(updates.username && { username: updates.username.toLowerCase() }),
        ...(updates.email && { email: updates.email.toLowerCase() }),
        ...(updates.role && { role: updates.role })
      }
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      emailVerified: user.emailVerified
    };
  }
}
