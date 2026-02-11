import { useFeatureFlagContext } from '../context/FeatureFlagContext';

// Encapsulating feature checks in one hook keeps business rules centralized.
// As the app grows, changes to flag logic happen in one place instead of every component.
export const useFeature = (featureName: string): boolean => {
  const { flags } = useFeatureFlagContext();

  return flags.some((flag) => flag.name === featureName && flag.enabled);
};
