import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();
  if (!user) return null;

  const roleLabel = user.role === 'admin' ? 'ADMIN' : 'TENANT';
  const email = `${user.name.toLowerCase().replace(/\s+/g, '.')}@gabrodev.com`;
  const userCode = `GAB-${String(user.id).slice(-3).padStart(3, '0')}`;

  return (
    <MainLayout title="Profile" subtitle="Logged-in user information">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="border border-slate-200">
          <h2 className="text-2xl font-medium mb-4">User</h2>
          <p className="text-base">Name: {user.name}</p>
          <p className="text-base">Role: {roleLabel}</p>
        </Card>

        <Card className="border border-slate-200">
          <h2 className="text-2xl font-medium mb-4">Account Information</h2>
          <p className="text-base">Email: {email}</p>
          <p className="text-base">User ID: {userCode}</p>
          <p className="text-sm text-gray-500 mt-2">Password: ••••••</p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
