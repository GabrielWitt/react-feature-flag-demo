import { NavLink } from 'react-router-dom';
import Button from './Button';
import Container from './Container';
import { useAuth } from '../../hooks/useAuth';

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
};

const Navbar = () => {
  const { user, logout } = useAuth();

  const items: NavItem[] = user
    ? [
        {
          to: user.role === 'admin' ? '/admin' : '/tenant',
          label: user.role === 'admin' ? 'Dashboard' : 'Home',
          end: true,
        },
        ...(user.role === 'admin' ? [{ to: '/admin/tenants', label: 'Tenants' }] : []),
        ...(user.role === 'user'
          ? [
              { to: '/tenant/lease', label: 'My Lease' },
              { to: '/tenant/payments', label: 'Payments' },
            ]
          : []),
        {
          to: user.role === 'user' ? '/tenant/reservations' : '/reservations',
          label: 'Reservations',
        },
        { to: '/profile', label: 'Profile' },
        { to: '/about', label: 'About' },
      ]
    : [{ to: '/login', label: 'Login', end: true }];

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-slate-200 bg-white shadow-sm">
      <Container className="flex h-full items-center justify-between">
        <img src="/GabroDevLogo.png" alt="Gabrodev" className="h-10 w-12 object-contain" />

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main navigation">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-[#2F80ED] text-white' : 'text-[#2D3436] hover:bg-[#F4F6F9]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {user ? (
            <Button variant="secondary" onClick={logout} className="ml-2 text-sm">
              Logout
            </Button>
          ) : null}
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
