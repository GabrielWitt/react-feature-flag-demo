import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useFeatureFlagContext } from '../../context/FeatureFlagContext';
import { useAuth } from '../../hooks/useAuth';
import { useFeature } from '../../hooks/useFeature';
import MetricCard from './components/MetricCard';
import TenantRow from './components/TenantRow';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loading } = useFeatureFlagContext();
  const isAdminPanelEnabled = useFeature('admin_panel');
  const isBetaDashboardEnabled = useFeature('beta_dashboard');

  const tenants = [
    { id: 1, date: '1', description: 'Tiristovet', unit: '50', dueDate: '30/06', status: 'Active' as const },
    { id: 2, date: '2', description: 'Baatvwel', unit: '81', dueDate: '12/07', status: 'Active' as const },
    { id: 3, date: '3', description: 'Treakicocks', unit: '01', dueDate: '24/07', status: 'Active' as const },
    { id: 4, date: '4', description: 'Deetslber', unit: '03', dueDate: '30/08', status: 'Pending' as const },
  ];

  return (
    <MainLayout title="Building Dashboard" subtitle={`Welcome, ${user?.name ?? 'Admin'}`}>
      {loading ? <p className="text-sm text-gray-600">Loading feature flags...</p> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MetricCard title="Total Tenants" value={<p className="text-xl font-medium">350</p>} subtitle="+12 this month" subtitleClassName="text-blue-600" highlighted />
        <MetricCard title="Occupied Apartments" value={<p className="text-xl font-medium">280 / 300</p>} subtitle="93.3% occupancy" />
        <MetricCard title="Pending Payments" value={<p className="text-xl font-medium">$15,000</p>} subtitle="11 payments due" />
        <MetricCard title="Active Reservations" value={<p className="text-xl font-medium">45</p>} extra={<span className="rounded-full bg-blue-600 px-2 py-1 text-sm text-white">Confirmed</span>} />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">Tenants Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-gray-600">
              <tr>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2">Unit</th>
                <th className="px-3 py-2">Due Date</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant, index) => (
                <TenantRow key={tenant.id} tenant={tenant} isLast={index === tenants.length - 1} />
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="mt-4 text-sm text-blue-700 hover:underline"
          onClick={() => navigate('/admin/tenants')}
        >
          View full tenants list
        </button>
      </section>

      {isAdminPanelEnabled ? (
        <section className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <h3 className="text-xl font-medium mb-3 text-emerald-900">Admin Panel</h3>
          <p className="text-sm text-gray-600">Advanced admin controls are enabled.</p>
        </section>
      ) : null}

      {isBetaDashboardEnabled ? (
        <section className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
          <h3 className="text-xl font-medium mb-3 text-indigo-900">Beta Dashboard</h3>
          <p className="text-sm text-gray-600">Experimental analytics modules are enabled.</p>
        </section>
      ) : null}
    </MainLayout>
  );
};

export default Home;
