import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import type { User } from './types/feature';
import Home from './pages/admin/Home';
import Tenants from './pages/admin/Tenants';
import TenantDetail from './pages/admin/TenantDetail';
import About from './pages/shared/About';
import Login from './pages/shared/Login';
import Profile from './pages/shared/Profile';
import Reservations from './pages/shared/Reservations';
import ReservationDetails from './pages/shared/ReservationDetails';
import ReserveArea from './pages/shared/ReserveArea';
import ClientHome from './pages/tenant/ClientHome';
import LeaseDetail from './pages/tenant/LeaseDetail';
import Payments from './pages/tenant/Payments';
import PaymentCheckout from './pages/tenant/PaymentCheckout';

type RequireAuthProps = {
  children: ReactNode;
};

type RequireRoleProps = {
  role: User['role'];
  children: ReactNode;
};

const RoleRedirect = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user.role === 'admin' ? '/admin' : '/tenant'} replace />;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const RequireRole = ({ role, children }: RequireRoleProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/tenant'} replace />;
  }

  return <>{children}</>;
};

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<RoleRedirect />} />
      <Route path="/login" element={isAuthenticated ? <RoleRedirect /> : <Login />} />

      <Route
        path="/admin"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <Home />
            </RequireRole>
          </RequireAuth>
        }
      />

      <Route
        path="/admin/tenants"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <Tenants />
            </RequireRole>
          </RequireAuth>
        }
      />

      <Route
        path="/admin/tenants/:tenantId"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <TenantDetail />
            </RequireRole>
          </RequireAuth>
        }
      />

      <Route
        path="/tenant"
        element={
          <RequireAuth>
            <RequireRole role="user">
              <ClientHome />
            </RequireRole>
          </RequireAuth>
        }
      />

      <Route
        path="/tenant/lease"
        element={
          <RequireAuth>
            <RequireRole role="user">
              <LeaseDetail />
            </RequireRole>
          </RequireAuth>
        }
      />

      <Route
        path="/tenant/payments"
        element={
          <RequireAuth>
            <RequireRole role="user">
              <Payments />
            </RequireRole>
          </RequireAuth>
        }
      />

      <Route
        path="/tenant/payments/checkout"
        element={
          <RequireAuth>
            <RequireRole role="user">
              <PaymentCheckout />
            </RequireRole>
          </RequireAuth>
        }
      />

      <Route
        path="/tenant/reservations"
        element={
          <RequireAuth>
            <RequireRole role="user">
              <Reservations />
            </RequireRole>
          </RequireAuth>
        }
      />

      <Route
        path="/about"
        element={
          <RequireAuth>
            <About />
          </RequireAuth>
        }
      />

      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />

      <Route
        path="/reservations"
        element={
          <RequireAuth>
            <Reservations />
          </RequireAuth>
        }
      />

      <Route
        path="/reservations/:reservationId"
        element={
          <RequireAuth>
            <ReservationDetails />
          </RequireAuth>
        }
      />

      <Route
        path="/reservations/new"
        element={
          <RequireAuth>
            <ReserveArea />
          </RequireAuth>
        }
      />

      <Route path="*" element={<RoleRedirect />} />
    </Routes>
  );
};

export default App;
