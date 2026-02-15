import type { User } from '../types/feature';

export const getUserHomePath = (user: User | null): '/admin' | '/tenant' | '/login' => {
  if (!user) {
    return '/login';
  }

  return user.role === 'admin' ? '/admin' : '/tenant';
};

export const hasRequiredRole = (user: User | null, requiredRole: User['role']): boolean => {
  return user?.role === requiredRole;
};

export const canAccessReservation = (user: User | null, reservationApartment: string): boolean => {
  if (!user) {
    return false;
  }

  if (user.role === 'admin') {
    return true;
  }

  return user.apartment !== null && user.apartment === reservationApartment;
};

export const canCreateTenantReservation = (user: User | null): boolean => {
  return user?.role === 'user' && user.apartment !== null;
};
