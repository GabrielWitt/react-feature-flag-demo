import type { FeatureFlag } from '../types/feature';
import { parseJsonResponse } from '../utils/http';

type FlagsApiResponse = {
  success: boolean;
  data?: FeatureFlag[];
  error?: {
    code: string;
    message: string;
  };
};

const isFeatureFlag = (value: unknown): value is FeatureFlag => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return typeof candidate.name === 'string' && typeof candidate.enabled === 'boolean';
};

const isFlagsApiResponse = (value: unknown): value is FlagsApiResponse => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.success === 'boolean';
};

export const fetchFeatureFlags = async (): Promise<FeatureFlag[]> => {
  // Keeping API calls in a dedicated service layer isolates networking concerns
  // and keeps components/hooks focused on UI state instead of transport details.
  let response: Response;

  try {
    response = await fetch('/api/flags.php');
  } catch {
    throw new Error('Could not connect to the feature service. Please try again.');
  }

  const payload = await parseJsonResponse<FlagsApiResponse>(response, {
    empty: 'Feature settings are unavailable right now. Please refresh in a moment.',
    invalid: 'Feature settings returned an unexpected response. Please try again.',
  });

  if (!isFlagsApiResponse(payload)) {
    throw new Error('Feature settings could not be loaded right now.');
  }

  if (!response.ok || !payload.success) {
    throw new Error(payload.error?.message ?? 'Feature settings could not be loaded right now.');
  }

  if (!Array.isArray(payload.data) || !payload.data.every(isFeatureFlag)) {
    throw new Error('Feature settings are temporarily unavailable.');
  }

  return payload.data;
};
