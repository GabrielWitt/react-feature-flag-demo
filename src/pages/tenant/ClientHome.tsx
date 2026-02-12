import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { fetchUsers } from '../../services/usersApi';
import type { BackendUser, DashboardPayment, DashboardReservation } from '../../services/usersApi';
import { useAuth } from '../../hooks/useAuth';

const FALLBACK_PAYMENTS: DashboardPayment[] = [
  { id: 1, date: 'Sep 05, 2025', description: 'Monthly Lease - September', unit: 'B402', amount: '$1,200.00' },
  { id: 2, date: 'Oct 01, 2025', description: 'Parking Spot', unit: 'B402', amount: '$80.00' },
];

const FALLBACK_RESERVATIONS: DashboardReservation[] = [
  { id: 1, label: 'Gym - Oct 20, 2025' },
  { id: 2, label: 'Pool - Oct 22, 2025' },
];

const ClientHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tenant, setTenant] = useState<BackendUser | null>(null);

  useEffect(() => {
    const loadTenant = async (): Promise<void> => {
      if (!user) {
        setTenant(null);
        return;
      }

      try {
        const users = await fetchUsers();
        const currentTenant = users.find((item) => item.id === user.id && item.role === 'user') ?? null;
        setTenant(currentTenant);
      } catch {
        setTenant(null);
      }
    };

    void loadTenant();
  }, [user]);

  const apartment = tenant?.apartment ?? 'B402';
  const monthlyRent = tenant?.tenantDashboard?.monthlyRent ?? '$1,200';
  const nextPaymentDue = tenant?.tenantDashboard?.nextPaymentDue ?? 'Oct 20, 2025';
  const recentPayments = tenant?.tenantDashboard?.recentPayments ?? FALLBACK_PAYMENTS;
  const upcomingReservations = tenant?.tenantDashboard?.upcomingReservations ?? FALLBACK_RESERVATIONS;

  const reservationStatusLabel = useMemo(() => (tenant?.status === 'inactive' ? 'Review Required' : 'Confirmed'), [tenant?.status]);

  return (
    <MainLayout title="My Apartment" subtitle={`Welcome back, ${tenant?.name ?? user?.name ?? 'Tenant'}`}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article onClick={() => navigate('/tenant/lease')} className="cursor-pointer rounded-xl border border-slate-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Unit Overview</h2>
          <p className="text-base leading-relaxed">Apartment: {apartment}</p>
          <p className="text-base leading-relaxed">Monthly Rent: {monthlyRent}</p>
          <p className="text-sm text-gray-600 mt-2">Open lease details</p>
        </article>

        <article className="rounded-xl border border-slate-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Payment & Reservation</h2>
          <p className="text-base leading-relaxed">Next Payment Due: {nextPaymentDue}</p>
          <p className="text-base leading-relaxed">Reservation Status: {reservationStatusLabel}</p>
        </article>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Recent Payments</h2>
          <ul className="space-y-2">
            {recentPayments.map((payment) => (
              <li key={payment.id} className="text-base leading-relaxed">
                {payment.date} - {payment.description} - {payment.amount}
              </li>
            ))}
          </ul>
        </section>

        <section onClick={() => navigate('/tenant/reservations')} className="cursor-pointer rounded-xl border border-slate-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Upcoming Reservations</h2>
          <ul className="space-y-2">
            {upcomingReservations.map((reservation) => (
              <li key={reservation.id} className="text-base leading-relaxed">
                {reservation.label}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </MainLayout>
  );
};

export default ClientHome;
