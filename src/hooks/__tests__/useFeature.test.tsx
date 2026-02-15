import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FeatureFlag } from '../../types/feature';
import { useFeatureFlagContext } from '../../context/FeatureFlagContext';
import { useFeature } from '../useFeature';

vi.mock('../../context/FeatureFlagContext', () => ({
  useFeatureFlagContext: vi.fn(),
}));

const mockedUseFeatureFlagContext = vi.mocked(useFeatureFlagContext);

const setFlags = (flags: FeatureFlag[]) => {
  mockedUseFeatureFlagContext.mockReturnValue({
    flags,
    loading: false,
    error: null,
  });
};

describe('useFeature', () => {
  // Testing hook behavior in isolation keeps feature-gating decisions predictable
  // as conditions and flags evolve across the app.
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns true when the feature exists and is enabled', () => {
    setFlags([{ name: 'admin_panel', enabled: true }]);

    const { result } = renderHook(() => useFeature('admin_panel'));

    expect(result.current).toBe(true);
  });

  it('returns false when the feature exists but is disabled', () => {
    setFlags([{ name: 'beta_dashboard', enabled: false }]);

    const { result } = renderHook(() => useFeature('beta_dashboard'));

    expect(result.current).toBe(false);
  });

  it('returns false when the feature does not exist', () => {
    setFlags([{ name: 'dashboard', enabled: true }]);

    const { result } = renderHook(() => useFeature('missing_feature'));

    expect(result.current).toBe(false);
  });
});
