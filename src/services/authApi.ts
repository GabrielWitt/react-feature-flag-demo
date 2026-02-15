import type { User } from '../types/feature';
import { parseJsonResponse } from '../utils/http';

type LoginApiResponse = {
  success: boolean;
  data?: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: User['role'];
      apartment: string | null;
    };
  };
  error?: {
    code: string;
    message: string;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResult = {
  token: string;
  user: User;
};

const isLoginApiResponse = (value: unknown): value is LoginApiResponse => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.success === 'boolean';
};

export const loginWithApi = async (payload: LoginRequest): Promise<LoginResult> => {
  let response: Response;

  try {
    response = await fetch('/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Could not connect to the server. Please check your connection and try again.');
  }

  const raw = await parseJsonResponse<LoginApiResponse>(response, {
    empty: 'The login service is temporarily unavailable. Please try again in a moment.',
    invalid: 'We could not read the login response. Please try again.',
  });

  if (!isLoginApiResponse(raw)) {
    throw new Error('Unexpected login response. Please try again.');
  }

  if (!response.ok || !raw.success || !raw.data) {
    throw new Error(
      raw.error?.message ?? 'Login failed. Please verify your credentials and try again.',
    );
  }

  return {
    token: raw.data.token,
    user: {
      id: raw.data.user.id,
      name: raw.data.user.name,
      role: raw.data.user.role,
      apartment: raw.data.user.apartment,
    },
  };
};
