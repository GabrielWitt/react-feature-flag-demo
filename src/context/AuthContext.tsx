import { createContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/feature';
import { loginWithApi } from '../services/authApi';

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;
  login: (input: LoginInput) => Promise<User>;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const login = async (input: LoginInput): Promise<User> => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const result = await loginWithApi(input);
      setUser(result.user);
      return result.user;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to login.';
      setAuthError(message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setAuthError(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      authLoading,
      authError,
      login,
      logout,
    }),
    [user, authLoading, authError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
