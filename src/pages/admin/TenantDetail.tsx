import { Navigate, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { TENANTS } from './tenantsData';

const TenantDetail = () => {
  const navigate = useNavigate();
  const { tenantId } = useParams();
  const tenant = TENANTS.find((item) => item.id === Number(tenantId));

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
          <p className="text-base text-[#2D3436]">Apartment: {tenant.apartment}</p>
          <p className="text-sm text-gray-500 mt-2">+1 (555) 203-3669</p>
        </Card>

        <Card className="border border-slate-200">
          <h2 className="text-2xl font-medium mb-4">Payment History</h2>
          <p className="text-base text-[#2D3436]">Last Payment: {tenant.lastPaymentDate}</p>
          <p className="text-base text-[#2D3436]">Amount: $1,188</p>
          <p className="text-sm text-gray-500 mt-2">Status: Paid</p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TenantDetail;
