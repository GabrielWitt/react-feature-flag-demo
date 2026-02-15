import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
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
    {
      id: 1,
      date: '1',
      description: 'Tiristovet',
      unit: '50',
      dueDate: '30/06',
      status: 'Active' as const,
    },
    {
      id: 2,
      date: '2',
      description: 'Baatvwel',
      unit: '81',
      dueDate: '12/07',
      status: 'Active' as const,
    },
    {
      id: 3,
      date: '3',
      description: 'Treakicocks',
      unit: '01',
      dueDate: '24/07',
      status: 'Active' as const,
    },
    {
      id: 4,
      date: '4',
      description: 'Deetslber',
      unit: '03',
      dueDate: '30/08',
      status: 'Pending' as const,
    },
  ];

  return (
    <MainLayout title="Building Dashboard" subtitle={`Welcome, ${user?.name ?? 'Admin'}`}>
      {loading ? <LoadingSkeleton /> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Tenants"
          value={<p className="text-3xl font-semibold">350</p>}
          subtitle="+12 this month"
          subtitleClassName="text-sm text-[#2F80ED]"
          highlighted
        />
        <MetricCard
          title="Occupied Apartments"
          value={<p className="text-3xl font-semibold">280 / 300</p>}
          subtitle="93.3% occupancy"
        />
        <MetricCard
          title="Pending Payments"
          value={<p className="text-3xl font-semibold">$15,000</p>}
          subtitle="11 payments due"
        />
        <MetricCard
          title="Active Reservations"
          value={<p className="text-3xl font-semibold">45</p>}
          extra={
            <span className="rounded-lg bg-[#2F80ED] px-2 py-1 text-sm text-white">Confirmed</span>
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="border border-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-medium">Tenants Overview</h2>
            <Button
              variant="secondary"
              className="text-sm"
              onClick={() => navigate('/admin/tenants')}
            >
              View All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead className="bg-slate-100 text-sm text-gray-500">
                <tr>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Description</th>
                  <th className="px-3 py-3">Unit</th>
                  <th className="px-3 py-3">Due Date</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant, index) => (
                  <TenantRow
                    key={tenant.id}
                    tenant={tenant}
                    isLast={index === tenants.length - 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="border border-slate-200">
          <h2 className="text-2xl font-medium mb-4">Monthly Income</h2>
          <div className="rounded-lg border border-slate-200 bg-[#F4F6F9] p-4">
            <svg
              viewBox="0 0 560 220"
              className="h-52 w-full"
              aria-label="Monthly income chart"
              role="img"
            >
              <g stroke="#d1d5db" strokeWidth="1">
                <line x1="40" y1="20" x2="540" y2="20" />
                <line x1="40" y1="70" x2="540" y2="70" />
                <line x1="40" y1="120" x2="540" y2="120" />
                <line x1="40" y1="170" x2="540" y2="170" />
              </g>

              <polyline
                fill="none"
                stroke="#2F80ED"
                strokeWidth="3"
                points="40,165 110,95 180,110 250,130 320,35 390,92 460,65 540,45"
              />

              <g fill="#ffffff" stroke="#2F80ED" strokeWidth="2">
                <circle cx="40" cy="165" r="5" />
                <circle cx="110" cy="95" r="5" />
                <circle cx="180" cy="110" r="5" />
                <circle cx="250" cy="130" r="5" />
                <circle cx="320" cy="35" r="5" />
                <circle cx="390" cy="92" r="5" />
                <circle cx="460" cy="65" r="5" />
                <circle cx="540" cy="45" r="5" />
              </g>

              <g className="fill-gray-500 text-sm">
                <text x="90" y="205">
                  Jan
                </text>
                <text x="160" y="205">
                  Feb
                </text>
                <text x="230" y="205">
                  Mar
                </text>
                <text x="300" y="205">
                  Apr
                </text>
                <text x="370" y="205">
                  May
                </text>
                <text x="440" y="205">
                  Jun
                </text>
                <text x="510" y="205">
                  Jul
                </text>
              </g>
            </svg>
          </div>
        </Card>
      </div>

      {isAdminPanelEnabled ? (
        <Card className="border border-[#56CCF2] bg-[#F4F9FF]">
          <h3 className="text-xl font-medium mb-3">Admin Panel</h3>
          <p className="text-sm text-gray-500">Advanced admin controls are enabled.</p>
        </Card>
      ) : null}

      {isBetaDashboardEnabled ? (
        <Card className="border border-slate-200">
          <h3 className="text-xl font-medium mb-3">Beta Dashboard</h3>
          <p className="text-sm text-gray-500">Experimental analytics modules are enabled.</p>
        </Card>
      ) : null}
    </MainLayout>
  );
};

export default Home;
