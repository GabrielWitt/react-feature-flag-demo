import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { fetchUsers } from '../../services/usersApi';
import type { BackendUser, DashboardPaymentRecord } from '../../services/usersApi';

const FALLBACK_HISTORY: DashboardPaymentRecord[] = [
  { id: 'PAY-2025-001', type: 'Monthly Lease', description: 'January', date: 'Jan 01, 2025', amount: '$1,200', status: 'Paid' },
  { id: 'PAY-2025-010', type: 'Monthly Lease', description: 'October', date: 'Oct 01, 2025', amount: '$1,200', status: 'Pending' },
];

const Payments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tenant, setTenant] = useState<BackendUser | null>(null);

  useEffect(() => {
    const loadTenant = async (): Promise<void> => {
      if (!user) return;

      try {
        const users = await fetchUsers();
        setTenant(users.find((item) => item.id === user.id && item.role === 'user') ?? null);
      } catch {
        setTenant(null);
      }
    };

    void loadTenant();
  }, [user]);

  const apartment = tenant?.apartment ?? 'B402';
  const paymentSummary = tenant?.tenantDashboard?.paymentSummary ?? {
    totalPaidThisYear: '$14,400',
    pendingAmount: '$1,200',
    nextDueDate: 'Oct 01, 2025',
  };
  const paymentHistory = tenant?.tenantDashboard?.paymentHistory ?? FALLBACK_HISTORY;

  const subtitle = useMemo(() => {
    if (tenant?.tenantDashboard?.building) {
      return `${tenant.tenantDashboard.building} - Lease and Reservation Payments`;
    }
    return 'Lease and Reservation Payments';
  }, [tenant?.tenantDashboard?.building]);

  return (
    <MainLayout title={`Apartment ${apartment} - Payment History`} subtitle={subtitle}>
      <Button onClick={() => navigate('/tenant/payments/checkout')} className="mb-6 text-sm">
        Pay Now
      </Button>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-xl font-medium mb-3 text-slate-900">Total Paid This Year</h3>
          <p className="text-base leading-relaxed">{paymentSummary.totalPaidThisYear}</p>
        </article>
        <article className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-xl font-medium mb-3 text-slate-900">Pending Amount</h3>
          <p className="text-base leading-relaxed">{paymentSummary.pendingAmount}</p>
        </article>
        <article className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-xl font-medium mb-3 text-slate-900">Next Due Date</h3>
          <p className="text-base leading-relaxed">{paymentSummary.nextDueDate}</p>
        </article>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-100 text-gray-600">
            <tr>
              <th className="px-3 py-2">Payment ID</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{payment.id}</td>
                <td className="px-3 py-2">{payment.type}</td>
                <td className="px-3 py-2">{payment.description}</td>
                <td className="px-3 py-2">{payment.date}</td>
                <td className="px-3 py-2">{payment.amount}</td>
                <td className="px-3 py-2">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Payments;
