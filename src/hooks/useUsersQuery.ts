import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/usersApi';

export const USERS_QUERY_KEY = ['users'] as const;

export const useUsersQuery = () => {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });
};
