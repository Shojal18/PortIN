import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Default demo user initialized for instant hackathon accessibility
    return {
      id: 'usr-demo-01',
      name: 'Capt. Samarth R.',
      email: 'manager@freightiq.demo',
      role: 'Chief Logistics & Chartering Manager',
      organization: 'Bharat East Bulk Logistics Operations',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80'
    };
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('freightiq_token') || 'demo-jwt-token');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('freightiq_token');
      if (storedToken) {
        try {
          const res = await api.getCurrentUser();
          setUser(res.user);
          setToken(storedToken);
        } catch (e) {
          console.warn('Session check failed, maintaining demo session:', e);
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.login(email, password);
      localStorage.setItem('freightiq_token', res.token);
      setToken(res.token);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('freightiq_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
