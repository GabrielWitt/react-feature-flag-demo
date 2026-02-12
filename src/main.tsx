import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { FeatureFlagProvider } from './context/FeatureFlagContext';
import './style.css';

// Global providers are declared at the root so every route shares one consistent
// auth and feature-flag state, avoiding duplicated provider trees.
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <FeatureFlagProvider>
        <App />
      </FeatureFlagProvider>
    </AuthProvider>
  </BrowserRouter>,
);
