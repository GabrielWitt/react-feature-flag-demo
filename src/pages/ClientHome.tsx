import { useAuth } from '../hooks/useAuth';

const ClientHome = () => {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-5xl space-y-4 sm:space-y-5">
        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Client Home</h1>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Welcome back, <span className="font-semibold">{user?.name}</span>.
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

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">Your Dashboard</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            This is the customer experience. Admin-only controls are hidden by role.
          </p>
        </section>
      </div>
    </main>
  );
};

export default ClientHome;
