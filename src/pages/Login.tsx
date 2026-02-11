import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <button
          onClick={() => login("admin")}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login as Admin
        </button>

        <button
          onClick={() => login("user")}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Login as Customer
        </button>
      </div>
    </div>
  );
};

export default Login;
