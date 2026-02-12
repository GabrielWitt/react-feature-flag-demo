import { useAuth } from '../../hooks/useAuth';
import AppNavigator from './components/AppNavigator';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const isAdmin = user.role === 'admin';
  const roleLabel = isAdmin ? 'ADMIN' : 'TENANT';
  const email = `${user.name.toLowerCase().replace(/\s+/g, '.')}@gabrodev.com`;
  const userCode = `GAB-${String(user.id).slice(-3).padStart(3, '0')}`;

  return (
    <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <AppNavigator />

        <section className="grid gap-4 bg-[#f7f9fc] px-5 py-5 sm:grid-cols-2 sm:px-8 sm:py-7">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mx-auto grid h-40 w-40 place-items-center rounded-full bg-slate-200 text-4xl font-bold text-slate-600">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="mt-6 text-center">
              <h1 className="text-5xl font-bold tracking-tight text-slate-900">{user.name}</h1>
              <p className="mt-2 text-xl text-slate-500">Headquarters Building A</p>
              <span className="mt-5 inline-block rounded-full bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white">{roleLabel}</span>
            </div>
          </article>

          <div className="space-y-4">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold uppercase text-slate-700">Account Information</h2>
              <div className="mt-6 space-y-4 text-lg text-slate-700">
                <p>
                  <span className="font-semibold">Email:</span> {email}
                </p>
                <p>
                  <span className="font-semibold">Password:</span> ••••••
                </p>
                <p>
                  <span className="font-semibold">User ID:</span> {userCode}
                </p>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold uppercase text-slate-700">Contact Information</h2>
              <div className="mt-6 space-y-4 text-lg text-slate-700">
                <p>
                  <span className="font-semibold">Phone:</span> +1 (555) 123-4567
                </p>
                <p>
                  <span className="font-semibold">Emergency Contact:</span> John Doe
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;
