import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { RESERVATIONS } from '../../services/reservationsData';

const Reservations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const rows = useMemo(() => {
    if (!user) return [];

    const baseRows = user.role === 'admin' ? RESERVATIONS : RESERVATIONS.filter((item) => item.apartment === 'B402');
    const query = search.trim().toLowerCase();
    if (!query) return baseRows;

    return baseRows.filter(
      (item) =>
        item.areaName.toLowerCase().includes(query) ||
        item.apartment.toLowerCase().includes(query) ||
        item.reservedAt.includes(query),
    );
  }, [search, user]);

  return (
    <MainLayout title="Reservations" subtitle="Shared reservation list for admins and tenants">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div className="w-full max-w-md">
          <label htmlFor="reservations-search" className="text-sm text-gray-600">
            Search reservations
          </label>
          <input
            id="reservations-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search reservations..."
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base leading-relaxed text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {user?.role !== 'admin' ? (
          <Button onClick={() => navigate('/reservations/new')} className="text-sm">
            Reserve Area
          </Button>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">Area Name</th>
              <th className="px-4 py-2">Apartment</th>
              <th className="px-4 py-2">Reservation Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((reservation) => (
              <tr key={reservation.id} className="border-t border-slate-100">
                <td className="px-4 py-2">{reservation.areaName}</td>
                <td className="px-4 py-2">{reservation.apartment}</td>
                <td className="px-4 py-2">{reservation.reservedAt}</td>
                <td className="px-4 py-2">{reservation.status}</td>
                <td className="px-4 py-2">
                  {reservation.action === 'View' ? (
                    <Button variant="primary" onClick={() => navigate(`/reservations/${reservation.id}`)} className="text-sm">
                      View
                    </Button>
                  ) : (
                    <span className="text-sm text-gray-600">{reservation.action}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 ? <p className="mt-4 text-sm text-gray-600">No reservations found.</p> : null}
    </MainLayout>
  );
};

export default Reservations;
