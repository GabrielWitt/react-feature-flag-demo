import { useAuth } from '../hooks/useAuth';
import { useFeatureFlagContext } from '../context/FeatureFlagContext';
import { useFeature } from '../hooks/useFeature';

const Home = () => {
  const { user, logout } = useAuth();
  const { loading } = useFeatureFlagContext();
  const isAdminPanelEnabled = useFeature('admin_panel');
  const isBetaDashboardEnabled = useFeature('beta_dashboard');

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm text-slate-600 sm:text-base">Loading feature flags...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl space-y-4 sm:space-y-5">
        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">Admin Dashboard</h1>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Logged in as <span className="font-semibold">{user?.name}</span> ({user?.role})
              </p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">Operations Overview</h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Core administrative metrics and monitoring widgets.
            </p>
          </section>

          {isAdminPanelEnabled && (
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-emerald-900 sm:text-xl">Admin Panel</h2>
              <p className="mt-2 text-sm text-emerald-800 sm:text-base">
                Administrative controls enabled through the <code>admin_panel</code> feature flag.
              </p>
            </section>
          )}

          {isBetaDashboardEnabled && (
            <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm sm:p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold text-indigo-900 sm:text-xl">Beta Dashboard</h2>
              <p className="mt-2 text-sm text-indigo-800 sm:text-base">
                Experimental analytics and previews behind the <code>beta_dashboard</code> feature flag.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
