import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { FeatureFlagProvider } from './context/FeatureFlagContext';
import './style.css';

// Global providers are declared at the root so every page shares one consistent
// auth and feature-flag state, avoiding duplicated provider trees.
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <AuthProvider>
    <FeatureFlagProvider>
      <App />
    </FeatureFlagProvider>
  </AuthProvider>,
);
