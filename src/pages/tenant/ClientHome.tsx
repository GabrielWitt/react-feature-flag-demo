import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AppNavigator from '../shared/components/AppNavigator';

const ClientHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const recentPayments = [
    { id: 1, date: '1', description: 'Tricotwel', unit: 'B0', amount: '$93.06' },
    { id: 2, date: '2', description: 'Litatotel', unit: '81', amount: '$83.88' },
    { id: 3, date: '3', description: 'Tiowekicks', unit: '03', amount: '$303.68' },
    { id: 4, date: '4', description: 'Gnentbim', unit: '01', amount: '$240.00' },
  ];

  const upcomingReservations = [
    { id: 1, label: 'Gym - Oct 20, 2025' },
    { id: 2, label: 'Gym - Oct 22, 2025' },
    { id: 3, label: 'Meeting Room' },
  ];

  return (
    <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <AppNavigator />

        <section className="space-y-5 bg-[#f7f9fc] px-5 py-5 sm:px-8 sm:py-7">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">My Apartment</h1>
            <p className="mt-1 text-sm text-slate-500">
              Welcome back, <span className="font-semibold text-slate-700">{user?.name}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <article 
              onClick={() => navigate('/tenant/lease')}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-slate-500">Apartment</p>
                  <p className="mt-2 text-5xl font-bold tracking-tight text-blue-600">B402</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Monthly Rent</p>
                  <p className="mt-2 text-4xl font-bold text-blue-600">$1,200</p>
                  <p className="mt-2 text-xs text-slate-400">Paid on time for 5 months</p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-slate-500">Next Payment Due</p>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-blue-600">Oct 20, 2025</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Reservation Status</p>
                  <div className="mt-3">
                    <span className="rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white">Confirmed</span>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <section 
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-2xl font-semibold text-slate-900">Recent Payments</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-slate-100 text-slate-500">
                    <tr>
                      <th className="rounded-l-lg px-3 py-2 font-medium">Date</th>
                      <th className="px-3 py-2 font-medium">Description</th>
                      <th className="px-3 py-2 font-medium">Unit</th>
                      <th className="rounded-r-lg px-3 py-2 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {recentPayments.map((payment, index) => (
                      <tr key={payment.id} className={index === recentPayments.length - 1 ? '' : 'border-b border-slate-100'}>
                        <td className="px-3 py-2">{payment.date}</td>
                        <td className="px-3 py-2">{payment.description}</td>
                        <td className="px-3 py-2">{payment.unit}</td>
                        <td className="px-3 py-2">{payment.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section
              onClick={() => navigate('/tenant/reservations')} 
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-2xl font-semibold text-slate-900">Upcoming Reservations</h2>
              <ul className="mt-4 space-y-3">
                {upcomingReservations.map((reservation) => (
                  <li
                    key={reservation.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-5 w-5 place-items-center rounded-full border border-blue-400 text-xs text-blue-500">i</span>
                      <span className="text-sm font-medium text-slate-700">{reservation.label}</span>
                    </div>
                    <span className="grid h-6 w-6 place-items-center rounded border border-blue-300 text-blue-500">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="5" width="16" height="15" rx="2" />
                        <path d="M8 3v4M16 3v4M4 10h16" />
                      </svg>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ClientHome;
