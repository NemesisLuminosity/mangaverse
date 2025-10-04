import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

// GraphQL mutations
const REGISTER_MUTATION = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      user {
        id
        email
        username
        role
        emailVerified
      }
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        username
        role
        emailVerified
      }
      token
    }
  }
`;

// Types
interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [registerMutation] = useMutation(REGISTER_MUTATION);
  const [loginMutation] = useMutation(LOGIN_MUTATION);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await loginMutation({
        variables: { email, password }
      });

      const { user: userData, token: userToken } = data.login;
      
      setUser(userData);
      setToken(userToken);
      
      // Save to localStorage
      localStorage.setItem('token', userToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await registerMutation({
        variables: { 
          input: { email, username, password }
        }
      });

      const { user: userData, token: userToken } = data.register;
      
      setUser(userData);
      setToken(userToken);
      
      // Save to localStorage
      localStorage.setItem('token', userToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
