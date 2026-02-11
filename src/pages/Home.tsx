import { useAuth } from "../hooks/useAuth";
import { useFeature } from "../hooks/useFeature";

const Home = () => {
  const { user, logout } = useAuth();

  const canViewAdminPanel = useFeature("admin_panel");
  const canViewBetaDashboard = useFeature("beta_dashboard");

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.name}
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <p>General content visible to all users.</p>
      </div>

      {user?.role === "admin" && canViewAdminPanel && (
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <p>Only admins with feature enabled can see this.</p>
        </div>
      )}

      {canViewBetaDashboard && (
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Beta Dashboard</h2>
          <p>This is a feature flagged section.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
