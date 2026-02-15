import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/feature';
import { loginWithApi } from '../services/authApi';

const AUTH_SESSION_KEY = 'gabrodev.auth.session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;
const REMEMBER_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

type AuthStatus = 'restoring' | 'unauthenticated' | 'loading' | 'authenticated';

export type LoginInput = {
  email: string;
  password: string;
  rememberSession?: boolean;
};

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  authStatus: AuthStatus;
  authLoading: boolean;
  authError: string | null;
  login: (input: LoginInput) => Promise<User>;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type PersistedAuthSession = {
  token: string;
  user: User;
  expiresAt: number;
};

type AuthState = {
  user: User | null;
  token: string | null;
  status: AuthStatus;
  error: string | null;
};

type AuthAction =
  | { type: 'RESTORE_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'RESTORE_FAILED'; payload: { error: string | null } }
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILED'; payload: { error: string } }
  | { type: 'LOGOUT' };

const INITIAL_AUTH_STATE: AuthState = {
  user: null,
  token: null,
  status: 'restoring',
  error: null,
};

const isUser = (value: unknown): value is User => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'number' &&
    typeof candidate.name === 'string' &&
    (candidate.role === 'admin' || candidate.role === 'user')
  );
};

const readStoredSession = (): {
  session: PersistedAuthSession | null;
  error: string | null;
} => {
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) {
      return { session: null, error: null };
    }

    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== 'object' || parsed === null) {
      localStorage.removeItem(AUTH_SESSION_KEY);
      return { session: null, error: null };
    }

    const candidate = parsed as Record<string, unknown>;
    if (
      typeof candidate.token !== 'string' ||
      !isUser(candidate.user) ||
      typeof candidate.expiresAt !== 'number'
    ) {
      localStorage.removeItem(AUTH_SESSION_KEY);
      return { session: null, error: null };
    }

    if (candidate.expiresAt <= Date.now()) {
      localStorage.removeItem(AUTH_SESSION_KEY);
      return { session: null, error: 'Session expired. Please log in again.' };
    }

    return {
      session: {
        token: candidate.token,
        user: candidate.user,
        expiresAt: candidate.expiresAt,
      },
      error: null,
    };
  } catch {
    localStorage.removeItem(AUTH_SESSION_KEY);
    return { session: null, error: null };
  }
};

const saveSession = (session: PersistedAuthSession): void => {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
};

const clearSession = (): void => {
  localStorage.removeItem(AUTH_SESSION_KEY);
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'RESTORE_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        status: 'authenticated',
        error: null,
      };
    case 'RESTORE_FAILED':
      return {
        user: null,
        token: null,
        status: 'unauthenticated',
        error: action.payload.error,
      };
    case 'LOGIN_START':
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        status: 'authenticated',
        error: null,
      };
    case 'LOGIN_FAILED':
      return {
        user: null,
        token: null,
        status: 'unauthenticated',
        error: action.payload.error,
      };
    case 'LOGOUT':
      return {
        user: null,
        token: null,
        status: 'unauthenticated',
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);

  useEffect(() => {
    const { session, error } = readStoredSession();

    if (!session) {
      dispatch({ type: 'RESTORE_FAILED', payload: { error } });
      return;
    }

    dispatch({
      type: 'RESTORE_SUCCESS',
      payload: { user: session.user, token: session.token },
    });
  }, []);

  const login = useCallback(async (input: LoginInput): Promise<User> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const result = await loginWithApi(input);
      const ttl = input.rememberSession ? REMEMBER_SESSION_TTL_MS : SESSION_TTL_MS;
      const expiresAt = Date.now() + ttl;

      saveSession({
        token: result.token,
        user: result.user,
        expiresAt,
      });

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.user,
          token: result.token,
        },
      });

      return result.user;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to login.';
      clearSession();
      dispatch({ type: 'LOGIN_FAILED', payload: { error: message } });
      throw error;
    }
  }, []);

  const logout = useCallback((): void => {
    clearSession();
    dispatch({ type: 'LOGOUT' });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: state.user,
      isAuthenticated: state.status === 'authenticated' && state.user !== null,
      authStatus: state.status,
      authLoading: state.status === 'loading',
      authError: state.error,
      login,
      logout,
    }),
    [state.user, state.status, state.error, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
