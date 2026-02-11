import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return <Home />;
}

export default App;

