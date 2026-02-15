import { describe, expect, it } from 'vitest';
import type { User } from '../../types/feature';
import {
  canAccessReservation,
  canCreateTenantReservation,
  getUserHomePath,
  hasRequiredRole,
} from '../authorization';

const adminUser: User = {
  id: 1,
  name: 'Admin',
  role: 'admin',
  apartment: null,
};

const tenantUser: User = {
  id: 2,
  name: 'Tenant',
  role: 'user',
  apartment: 'B402',
};

describe('authorization utils', () => {
  it('returns correct home path by role', () => {
    expect(getUserHomePath(adminUser)).toBe('/admin');
    expect(getUserHomePath(tenantUser)).toBe('/tenant');
    expect(getUserHomePath(null)).toBe('/login');
  });

  it('enforces required role checks', () => {
    expect(hasRequiredRole(adminUser, 'admin')).toBe(true);
    expect(hasRequiredRole(tenantUser, 'admin')).toBe(false);
    expect(hasRequiredRole(null, 'user')).toBe(false);
  });

  it('authorizes reservation access by role and apartment scope', () => {
    expect(canAccessReservation(adminUser, 'A101')).toBe(true);
    expect(canAccessReservation(tenantUser, 'B402')).toBe(true);
    expect(canAccessReservation(tenantUser, 'A101')).toBe(false);
    expect(canAccessReservation(null, 'B402')).toBe(false);
  });

  it('allows creating reservations only for tenant users with apartment scope', () => {
    expect(canCreateTenantReservation(tenantUser)).toBe(true);
    expect(canCreateTenantReservation(adminUser)).toBe(false);
    expect(
      canCreateTenantReservation({
        ...tenantUser,
        apartment: null,
      }),
    ).toBe(false);
  });
});
