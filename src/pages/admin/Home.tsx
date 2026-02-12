import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFeatureFlagContext } from '../../context/FeatureFlagContext';
import { useFeature } from '../../hooks/useFeature';
import AppNavigator from '../shared/components/AppNavigator';
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

  if (loading) {
    return (
      <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">Loading feature flags...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <AppNavigator />

        <section className="space-y-5 bg-[#f7f9fc] px-5 py-5 sm:px-8 sm:py-7">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Building Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">
              Welcome, <span className="font-semibold text-slate-700">{user?.name}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total Tenants"
              value={<p className="text-4xl font-bold text-slate-900">350</p>}
              subtitle="+12 this month"
              subtitleClassName="text-blue-500"
              highlighted
            />

            <MetricCard
              title="Occupied Apartments"
              value={
                <p className="text-3xl font-bold text-slate-900">
                  280 <span className="text-lg font-medium text-blue-500">/ 300</span>
                </p>
              }
              subtitle="93.3% occupancy"
            />

            <MetricCard
              title="Pending Payments"
              value={<p className="text-3xl font-bold text-slate-900">$15,000</p>}
              subtitle="11 payments due"
              subtitleClassName="text-amber-600"
            />

            <MetricCard
              title="Active Reservations"
              value={<p className="text-3xl font-bold text-slate-900">45</p>}
              extra={<span className="rounded-full bg-blue-500 px-2.5 py-1 text-xs font-semibold text-white">Confirmed</span>}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <section
              role="button"
              tabIndex={0}
              onClick={() => navigate('/admin/tenants')}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  navigate('/admin/tenants');
                }
              }}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md sm:p-6"
            >
              <h2 className="text-2xl font-semibold text-slate-900">Tenants Overview</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-slate-100 text-slate-500">
                    <tr>
                      <th className="rounded-l-lg px-3 py-2 font-medium">Date</th>
                      <th className="px-3 py-2 font-medium">Description</th>
                      <th className="px-3 py-2 font-medium">Unit</th>
                      <th className="px-3 py-2 font-medium">Due Date</th>
                      <th className="rounded-r-lg px-3 py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {tenants.map((tenant, index) => (
                      <TenantRow key={tenant.id} tenant={tenant} isLast={index === tenants.length - 1} />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-2xl font-semibold text-slate-900">Monthly Income</h2>
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <svg viewBox="0 0 520 220" className="h-52 w-full">
                  <g stroke="#cbd5e1" strokeWidth="1">
                    <line x1="40" y1="20" x2="500" y2="20" />
                    <line x1="40" y1="70" x2="500" y2="70" />
                    <line x1="40" y1="120" x2="500" y2="120" />
                    <line x1="40" y1="170" x2="500" y2="170" />
                  </g>
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    points="40,165 110,95 180,110 250,130 320,35 390,92 460,65 500,35"
                  />
                  <g fill="#fff" stroke="#3b82f6" strokeWidth="3">
                    <circle cx="40" cy="165" r="6" />
                    <circle cx="110" cy="95" r="6" />
                    <circle cx="180" cy="110" r="6" />
                    <circle cx="250" cy="130" r="6" />
                    <circle cx="320" cy="35" r="6" />
                    <circle cx="390" cy="92" r="6" />
                    <circle cx="460" cy="65" r="6" />
                    <circle cx="500" cy="35" r="6" />
                  </g>
                  <g className="fill-slate-500 text-xs">
                    <text x="98" y="205">Jan</text>
                    <text x="168" y="205">Feb</text>
                    <text x="238" y="205">Mar</text>
                    <text x="308" y="205">Apr</text>
                    <text x="378" y="205">May</text>
                    <text x="448" y="205">Jun</text>
                  </g>
                </svg>
              </div>
            </section>
          </div>

          {isAdminPanelEnabled && (
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-emerald-900">Admin Panel</h3>
              <p className="mt-1 text-sm text-emerald-800">Advanced admin controls are enabled.</p>
            </section>
          )}

          {isBetaDashboardEnabled && (
            <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-indigo-900">Beta Dashboard</h3>
              <p className="mt-1 text-sm text-indigo-800">You are seeing experimental analytics modules.</p>
            </section>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
