import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTenant = async (): Promise<void> => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const users = await fetchUsers();
        setTenant(users.find((item) => item.id === user.id && item.role === 'user') ?? null);
      } catch {
        setTenant(null);
      } finally {
        setLoading(false);
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
    <MainLayout
      title={`Apartment ${apartment} - Payment History`}
      subtitle={subtitle}
      actions={
        <Button onClick={() => navigate('/tenant/payments/checkout')} className="text-sm">
          Pay Now
        </Button>
      }
    >
      {loading ? <LoadingSkeleton /> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border border-slate-200">
          <h3 className="text-xl font-medium mb-3">Total Paid This Year</h3>
          <p className="text-base">{paymentSummary.totalPaidThisYear}</p>
        </Card>
        <Card className="border border-slate-200">
          <h3 className="text-xl font-medium mb-3">Pending Amount</h3>
          <p className="text-base">{paymentSummary.pendingAmount}</p>
        </Card>
        <Card className="border border-slate-200">
          <h3 className="text-xl font-medium mb-3">Next Due Date</h3>
          <p className="text-base">{paymentSummary.nextDueDate}</p>
        </Card>
      </div>

      <Card className="border border-slate-200 p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-[#F4F6F9] text-sm text-gray-500">
              <tr>
                <th className="px-4 py-3">Payment ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-t border-slate-100 hover:bg-[#F4F6F9]">
                  <td className="px-4 py-3 text-base">{payment.id}</td>
                  <td className="px-4 py-3 text-base">{payment.type}</td>
                  <td className="px-4 py-3 text-base">{payment.description}</td>
                  <td className="px-4 py-3 text-base">{payment.date}</td>
                  <td className="px-4 py-3 text-base">{payment.amount}</td>
                  <td className="px-4 py-3 text-base">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {!loading && paymentHistory.length === 0 ? (
        <Card className="border border-dashed border-slate-300 text-center">
          <p className="text-base">No payment records available yet.</p>
          <p className="text-sm text-gray-500 mt-2">Your upcoming transactions will appear here.</p>
        </Card>
      ) : null}
    </MainLayout>
  );
};

export default Payments;
