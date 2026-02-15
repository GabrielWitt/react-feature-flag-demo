import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { RESERVATIONS } from '../../services/reservationsData';

const Reservations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const rows = useMemo(() => {
    if (!user) return [];
    const baseRows =
      user.role === 'admin'
        ? RESERVATIONS
        : RESERVATIONS.filter((item) => item.apartment === 'B402');
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
    <MainLayout
      title="Reservations"
      subtitle="Shared reservation list for admins and tenants"
      actions={
        user?.role !== 'admin' ? (
          <Button onClick={() => navigate('/reservations/new')} className="text-sm">
            Reserve Area
          </Button>
        ) : null
      }
    >
      <Card className="border border-slate-200">
        <label htmlFor="reservations-search" className="text-sm text-gray-500">
          Search reservations
        </label>
        <input
          id="reservations-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by area, apartment or date"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base outline-none focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
        />
      </Card>

      <Card className="border border-slate-200 p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-[#F4F6F9] text-sm text-gray-500">
              <tr>
                <th className="px-4 py-3">Area Name</th>
                <th className="px-4 py-3">Apartment</th>
                <th className="px-4 py-3">Reservation Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((reservation) => (
                <tr key={reservation.id} className="border-t border-slate-100 hover:bg-[#F4F6F9]">
                  <td className="px-4 py-3 text-base">{reservation.areaName}</td>
                  <td className="px-4 py-3 text-base">{reservation.apartment}</td>
                  <td className="px-4 py-3 text-base">{reservation.reservedAt}</td>
                  <td className="px-4 py-3 text-base">{reservation.status}</td>
                  <td className="px-4 py-3">
                    {reservation.action === 'View' ? (
                      <Button
                        onClick={() => navigate(`/reservations/${reservation.id}`)}
                        className="text-sm"
                      >
                        View
                      </Button>
                    ) : (
                      <span className="text-sm text-gray-500">{reservation.action}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {rows.length === 0 ? (
        <Card className="border border-dashed border-slate-300 text-center">
          <p className="text-base">No reservations found.</p>
          <p className="text-sm text-gray-500 mt-2">Try refining your search criteria.</p>
        </Card>
      ) : null}
    </MainLayout>
  );
};

export default Reservations;
