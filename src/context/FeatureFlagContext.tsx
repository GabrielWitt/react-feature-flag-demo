import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { FeatureFlag } from '../types/feature';
import { fetchFeatureFlags } from '../services/api';

type FeatureFlagContextType = {
  flags: FeatureFlag[];
  loading: boolean;
};

type FeatureFlagProviderProps = {
  children: ReactNode;
};

// Context is used to expose feature flags app-wide without prop drilling.
// This keeps consumers simple and avoids threading the same data through many layers.
const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

export const FeatureFlagProvider = ({ children }: FeatureFlagProviderProps) => {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFlags = async (): Promise<void> => {
      try {
        const data = await fetchFeatureFlags();
        setFlags(data);
      } catch (error) {
        console.error('Error loading feature flags', error);
      } finally {
        setLoading(false);
      }
    };

    void loadFlags();
  }, []);

  // The context is typed as possibly undefined so TypeScript forces a runtime guard.
  // This helps detect invalid usage early when a consumer is rendered outside the provider.
  const value = useMemo<FeatureFlagContextType>(() => ({ flags, loading }), [flags, loading]);

  return (
    <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>
  );
};

// Centralizing read access in one hook improves maintainability:
// consumers stay consistent, and future context changes are localized here.
export const useFeatureFlagContext = (): FeatureFlagContextType => {
  const context = useContext(FeatureFlagContext);

  if (!context) {
    throw new Error('useFeatureFlagContext must be used within FeatureFlagProvider');
  }

  return context;
};
