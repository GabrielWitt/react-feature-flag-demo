import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTenant = async (): Promise<void> => {
      if (!user) {
        setTenant(null);
        setLoading(false);
        return;
      }

      try {
        const users = await fetchUsers();
        const currentTenant = users.find((item) => item.id === user.id && item.role === 'user') ?? null;
        setTenant(currentTenant);
      } catch {
        setTenant(null);
      } finally {
        setLoading(false);
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
      {loading ? <LoadingSkeleton /> : null}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border border-slate-200 cursor-pointer hover:shadow-md" onClick={() => navigate('/tenant/lease')}>
          <h2 className="text-2xl font-medium mb-4">Apartment Summary</h2>
          <p className="text-base">Apartment: {apartment}</p>
          <p className="text-base">Monthly Rent: {monthlyRent}</p>
          <p className="text-sm text-gray-500 mt-2">Open lease details</p>
        </Card>

        <Card className="border border-slate-200">
          <h2 className="text-2xl font-medium mb-4">Upcoming Payment</h2>
          <p className="text-base">Next Payment Due: {nextPaymentDue}</p>
          <p className="text-base">Reservation Status: {reservationStatusLabel}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border border-slate-200">
          <h2 className="text-2xl font-medium mb-4">Recent Payments</h2>
          <ul className="space-y-2">
            {recentPayments.map((payment) => (
              <li key={payment.id} className="text-base">
                {payment.date} - {payment.description} - {payment.amount}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border border-slate-200 cursor-pointer hover:shadow-md" onClick={() => navigate('/tenant/reservations')}>
          <h2 className="text-2xl font-medium mb-4">Upcoming Reservations</h2>
          <ul className="space-y-2">
            {upcomingReservations.map((reservation) => (
              <li key={reservation.id} className="text-base">
                {reservation.label}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClientHome;
