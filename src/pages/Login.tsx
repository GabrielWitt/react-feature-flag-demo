import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Demo authentication flow for role-based feature access.
        </p>

        {isAuthenticated && user ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm text-emerald-900">
                Signed in as <span className="font-semibold">{user.name}</span> ({user.role})
              </p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => login({ name: 'Alex Admin', role: 'admin' })}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Login as Admin
            </button>
            <button
              type="button"
              onClick={() => login({ name: 'Uma User', role: 'user' })}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Login as User
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
