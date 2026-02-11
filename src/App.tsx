import { useAuth } from './hooks/useAuth';
import ClientHome from './pages/ClientHome';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Login />;
  }

  if (user.role === 'admin') {
    return <Home />;
  }

  return <ClientHome />;
};

export default App;
