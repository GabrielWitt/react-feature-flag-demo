import { Navigate, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import { useUsersQuery } from '../../hooks/useUsersQuery';

const getLatestPaymentDate = (
  tenantId: number,
  users: ReturnType<typeof useUsersQuery>['data'],
) => {
  const tenant = (users ?? []).find((item) => item.id === tenantId && item.role === 'user');
  if (!tenant) {
    return 'N/A';
  }

  const records = tenant.tenantDashboard?.paymentHistory ?? [];
  if (records.length === 0) {
    return 'N/A';
  }

  const latestRecord = [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0];

  return latestRecord?.date ?? 'N/A';
};

const TenantDetail = () => {
  const navigate = useNavigate();
  const { tenantId } = useParams();
  const usersQuery = useUsersQuery();
  const parsedTenantId = Number(tenantId);
  const tenant = (usersQuery.data ?? []).find(
    (item) => item.id === parsedTenantId && item.role === 'user',
  );

  if (usersQuery.isLoading) {
    return (
      <MainLayout title="Tenant Detail" subtitle="Loading tenant details">
        <LoadingSkeleton />
      </MainLayout>
    );
  }

  if (usersQuery.error instanceof Error) {
    return (
      <MainLayout title="Tenant Detail" subtitle="Unable to load tenant details">
        <Card className="border border-rose-200 bg-rose-50">
          <p className="text-sm text-rose-700">{usersQuery.error.message}</p>
        </Card>
      </MainLayout>
    );
  }

  if (!tenant) return <Navigate to="/admin/tenants" replace />;

  return (
    <MainLayout
      title="Tenant Detail"
      subtitle={tenant.name}
      actions={
        <Button variant="secondary" onClick={() => navigate('/admin/tenants')} className="text-sm">
          Back
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="border border-slate-200">
          <h2 className="text-2xl font-medium mb-4">Profile</h2>
          <p className="text-base text-[#2D3436]">Name: {tenant.name}</p>
          <p className="text-base text-[#2D3436]">Apartment: {tenant.apartment ?? 'N/A'}</p>
          <p className="text-sm text-gray-500 mt-2">+1 (555) 203-3669</p>
        </Card>

        <Card className="border border-slate-200">
          <h2 className="text-2xl font-medium mb-4">Payment History</h2>
          <p className="text-base text-[#2D3436]">
            Last Payment: {getLatestPaymentDate(parsedTenantId, usersQuery.data)}
          </p>
          <p className="text-base text-[#2D3436]">Amount: $1,188</p>
          <p className="text-sm text-gray-500 mt-2">Status: Paid</p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TenantDetail;
