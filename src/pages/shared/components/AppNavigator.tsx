import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
};

const AppNavigator = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const homePath = user.role === 'admin' ? '/admin' : '/tenant';
  const homeLabel = user.role === 'admin' ? 'Dashboard' : 'My Home';

  const links: NavItem[] = [
    { to: homePath, label: homeLabel, end: true },
    ...(user.role === 'admin' ? [{ to: '/admin/tenants', label: 'Tenants' }] : []),
    ...(user.role === 'user' ? [{ to: '/tenant/lease', label: 'My Lease' }] : []),
    { to: user.role === 'user' ? '/tenant/reservations' : '/reservations', label: 'Reservations' },
    { to: '/profile', label: 'Profile' },
    { to: '/about', label: 'About' },
  ];

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <img src="/GabroDevLogo.png" alt="Gabrodev logo" className="h-10 w-12 object-contain" />
        <div>
          <p className="text-lg font-semibold text-slate-800 sm:text-xl">Gabrodev</p>
          <p className="text-xs text-slate-500">{user.name}</p>
        </div>
      </div>

      <nav className="flex flex-wrap items-center gap-1.5" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                isActive ? 'bg-slate-900 text-white' : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        <button
          type="button"
          onClick={logout}
          className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-600"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default AppNavigator;
