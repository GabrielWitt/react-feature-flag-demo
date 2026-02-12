import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const roleLabel = user.role === 'admin' ? 'ADMIN' : 'TENANT';
  const email = `${user.name.toLowerCase().replace(/\s+/g, '.')}@gabrodev.com`;
  const userCode = `GAB-${String(user.id).slice(-3).padStart(3, '0')}`;

  return (
    <MainLayout title="Profile" subtitle="Logged-in user information">
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">User</h2>
          <p className="text-base leading-relaxed">Name: {user.name}</p>
          <p className="text-base leading-relaxed">Role: {roleLabel}</p>
        </article>

        <article className="rounded-xl border border-slate-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Account Information</h2>
          <p className="text-base leading-relaxed">Email: {email}</p>
          <p className="text-base leading-relaxed">User ID: {userCode}</p>
          <p className="text-sm text-gray-600 mt-2">Password: ••••••</p>
        </article>
      </div>
    </MainLayout>
  );
};

export default Profile;
