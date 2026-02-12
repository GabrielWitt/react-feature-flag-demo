import { parseJsonResponse } from '../utils/http';
import type { User } from '../types/feature';

export type PaymentStatus = 'Paid' | 'Pending';

export type DashboardPayment = {
  id: number;
  date: string;
  description: string;
  unit: string;
  amount: string;
};

export type DashboardReservation = {
  id: number;
  label: string;
};

export type DashboardPaymentSummary = {
  totalPaidThisYear: string;
  pendingAmount: string;
  nextDueDate: string;
};

export type DashboardPaymentRecord = {
  id: string;
  type: string;
  description: string;
  date: string;
  amount: string;
  status: PaymentStatus;
};

export type TenantDashboard = {
  building: string;
  monthlyRent: string;
  nextPaymentDue: string;
  recentPayments: DashboardPayment[];
  upcomingReservations: DashboardReservation[];
  paymentSummary: DashboardPaymentSummary;
  paymentHistory: DashboardPaymentRecord[];
};

export type BackendUser = {
  id: number;
  name: string;
  email: string;
  role: User['role'];
  apartment: string | null;
  status: 'active' | 'inactive';
  tenantDashboard: TenantDashboard | null;
};

type UsersApiResponse = {
  success: boolean;
  data?: BackendUser[];
  error?: {
    code: string;
    message: string;
  };
};

const isDashboardPayment = (value: unknown): value is DashboardPayment => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'number' &&
    typeof candidate.date === 'string' &&
    typeof candidate.description === 'string' &&
    typeof candidate.unit === 'string' &&
    typeof candidate.amount === 'string'
  );
};

const isDashboardReservation = (value: unknown): value is DashboardReservation => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return typeof candidate.id === 'number' && typeof candidate.label === 'string';
};

const isDashboardPaymentSummary = (value: unknown): value is DashboardPaymentSummary => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.totalPaidThisYear === 'string' &&
    typeof candidate.pendingAmount === 'string' &&
    typeof candidate.nextDueDate === 'string'
  );
};

const isDashboardPaymentRecord = (value: unknown): value is DashboardPaymentRecord => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.type === 'string' &&
    typeof candidate.description === 'string' &&
    typeof candidate.date === 'string' &&
    typeof candidate.amount === 'string' &&
    (candidate.status === 'Paid' || candidate.status === 'Pending')
  );
};

const isTenantDashboard = (value: unknown): value is TenantDashboard => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.building === 'string' &&
    typeof candidate.monthlyRent === 'string' &&
    typeof candidate.nextPaymentDue === 'string' &&
    Array.isArray(candidate.recentPayments) &&
    candidate.recentPayments.every(isDashboardPayment) &&
    Array.isArray(candidate.upcomingReservations) &&
    candidate.upcomingReservations.every(isDashboardReservation) &&
    isDashboardPaymentSummary(candidate.paymentSummary) &&
    Array.isArray(candidate.paymentHistory) &&
    candidate.paymentHistory.every(isDashboardPaymentRecord)
  );
};

const isBackendUser = (value: unknown): value is BackendUser => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'number' &&
    typeof candidate.name === 'string' &&
    typeof candidate.email === 'string' &&
    (candidate.role === 'admin' || candidate.role === 'user') &&
    (typeof candidate.apartment === 'string' || candidate.apartment === null) &&
    (candidate.status === 'active' || candidate.status === 'inactive') &&
    (candidate.tenantDashboard === null || isTenantDashboard(candidate.tenantDashboard))
  );
};

export const fetchUsers = async (): Promise<BackendUser[]> => {
  let response: Response;

  try {
    response = await fetch('/api/users.php');
  } catch {
    throw new Error('Could not connect to the user service. Please try again.');
  }

  const payload = await parseJsonResponse<UsersApiResponse>(response, {
    empty: 'User information is temporarily unavailable.',
    invalid: 'Unexpected user response format. Please try again.',
  });

  if (!response.ok || !payload.success) {
    throw new Error(payload.error?.message ?? 'Could not load user information.');
  }

  if (!Array.isArray(payload.data) || !payload.data.every(isBackendUser)) {
    throw new Error('User data is currently unavailable.');
  }

  return payload.data;
};
