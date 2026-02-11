import { createContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/feature';

export type LoginInput = {
  name: string;
  role: User['role'];
};

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (input: LoginInput) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // `useState` stores the actual auth data that can change over time.
  // Updating `user` is what represents login/logout state transitions.
  const [user, setUser] = useState<User | null>(null);

  const login = (input: LoginInput): void => {
    setUser({
      id: Date.now(),
      name: input.name,
      role: input.role,
    });
  };

  const logout = (): void => {
    setUser(null);
  };

  // `useMemo` does not store auth state; it memoizes the context object shape.
  // This keeps a stable reference between renders when `user` is unchanged.
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
