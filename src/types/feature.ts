export type FeatureFlag = {
  name: string;
  enabled: boolean;
};

export type User = {
  id: number;
  name: string;
  role: 'admin' | 'user';
  apartment: string | null;
};
