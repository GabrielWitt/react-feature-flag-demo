import { Navigate, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import { TENANTS } from './tenantsData';

const TenantDetail = () => {
  const navigate = useNavigate();
  const { tenantId } = useParams();
  const tenant = TENANTS.find((item) => item.id === Number(tenantId));

  if (!tenant) {
    return <Navigate to="/admin/tenants" replace />;
  }

  return (
    <MainLayout title="Tenant Detail" subtitle={tenant.name}>
      <Button variant="secondary" onClick={() => navigate('/admin/tenants')} className="mb-6 text-sm">
        Back
      </Button>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Profile</h2>
          <p className="text-base leading-relaxed">Name: {tenant.name}</p>
          <p className="text-base leading-relaxed">Apartment: {tenant.apartment}</p>
          <p className="text-sm text-gray-600 mt-2">+1 (555) 203-3669</p>
        </article>

        <article className="rounded-xl border border-slate-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Payment History</h2>
          <p className="text-base leading-relaxed">Last Payment: {tenant.lastPaymentDate}</p>
          <p className="text-base leading-relaxed">Amount: $1,188</p>
          <p className="text-sm text-gray-600 mt-2">Status: Paid</p>
        </article>
      </div>
    </MainLayout>
  );
};

export default TenantDetail;
