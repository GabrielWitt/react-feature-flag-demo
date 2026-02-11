import type { FeatureFlag } from '../types/feature';

const isFeatureFlag = (value: unknown): value is FeatureFlag => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return typeof candidate.name === 'string' && typeof candidate.enabled === 'boolean';
};

export const fetchFeatureFlags = async (): Promise<FeatureFlag[]> => {
  // Keeping API calls in a dedicated service layer isolates networking concerns
  // and keeps components/hooks focused on UI state instead of transport details.
  let response: Response;

  try {
    response = await fetch('/api/feature-flags.php');
  } catch (error) {
    throw new Error(
      `Network error while fetching feature flags: ${error instanceof Error ? error.message : 'unknown error'}`,
    );
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch feature flags: ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isFeatureFlag)) {
    throw new Error('Invalid feature flags response format.');
  }

  return data;
};
