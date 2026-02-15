import type { BackendUser } from '../services/usersApi';
import { useAuth } from './useAuth';
import { useUsersQuery } from './useUsersQuery';

type UseCurrentTenantResult = {
  tenant: BackendUser | null;
  loading: boolean;
  error: string | null;
};

export const useCurrentTenant = (): UseCurrentTenantResult => {
  const { user } = useAuth();
  const usersQuery = useUsersQuery();

  if (!user || user.role !== 'user') {
    return {
      tenant: null,
      loading: usersQuery.isLoading,
      error: null,
    };
  }

  const tenant =
    usersQuery.data?.find((item) => item.id === user.id && item.role === 'user') ?? null;

  return {
    tenant,
    loading: usersQuery.isLoading,
    error: usersQuery.error instanceof Error ? usersQuery.error.message : null,
  };
};
