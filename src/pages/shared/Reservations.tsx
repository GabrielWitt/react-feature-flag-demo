import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AppNavigator from './components/AppNavigator';
import { RESERVATIONS } from '../../services/reservationsData';

const Reservations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const rows = useMemo(() => {
    if (!user) {
      return [];
    }

    const baseRows = user.role === 'admin' ? RESERVATIONS : RESERVATIONS.filter((item) => item.apartment === 'B402');
    const query = search.trim().toLowerCase();

    if (!query) {
      return baseRows;
    }

    return baseRows.filter(
      (item) =>
        item.areaName.toLowerCase().includes(query) ||
        item.apartment.toLowerCase().includes(query) ||
        item.reservedAt.includes(query),
    );
  }, [search, user]);

  return (
    <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <AppNavigator />

        <section className="bg-[#f7f9fc] px-5 py-5 sm:px-8 sm:py-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Reservations</h1>
            {user?.role !== 'admin' && (
              <button
                type="button"
                onClick={() => navigate('/reservations/new')}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Reserve Area
              </button>
            )}
          </div>

          <div className="mt-4 max-w-md">
            <label htmlFor="reservations-search" className="sr-only">
              Search reservations
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-slate-400">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <input
                id="reservations-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search reservations..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="text-slate-800">
                  <tr>
                    <th className="px-4 py-3 text-xl font-semibold">Area Name</th>
                    <th className="px-4 py-3 text-xl font-semibold">Apartment</th>
                    <th className="px-4 py-3 text-xl font-semibold">Reservation Date</th>
                    <th className="px-4 py-3 text-xl font-semibold">Status</th>
                    <th className="px-4 py-3 text-xl font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {rows.map((reservation, index) => (
                    <tr key={reservation.id} className={index % 2 === 0 ? 'bg-slate-50' : 'border-t border-slate-100'}>
                      <td className="px-4 py-3 text-2xl font-medium">{reservation.areaName}</td>
                      <td className="px-4 py-3 text-2xl font-medium">{reservation.apartment}</td>
                      <td className="px-4 py-3 text-xl font-medium">{reservation.reservedAt}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-md px-3 py-1 text-lg font-semibold text-white ${
                            reservation.status === 'Confirmed' ? 'bg-blue-500' : 'bg-slate-500'
                          }`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {reservation.action === 'View' ? (
                          <button
                            type="button"
                            onClick={() => navigate(`/reservations/${reservation.id}`)}
                            className="min-w-[92px] rounded-md bg-blue-500 px-3 py-1 text-lg font-semibold text-white"
                          >
                            View
                          </button>
                        ) : (
                          <span className="inline-block min-w-[92px] rounded-md bg-slate-200 px-3 py-1 text-center text-lg font-semibold text-slate-700">
                            {reservation.action}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {rows.length === 0 && <p className="py-6 text-center text-sm text-slate-500">No reservations found.</p>}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Reservations;
