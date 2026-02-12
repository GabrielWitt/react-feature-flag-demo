import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { RESERVATIONS } from '../../services/reservationsData';

const formatDate = (date: string) => {
  const parsed = new Date(`${date}T00:00:00`);
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(parsed);
};

const ReservationDetails = () => {
  const navigate = useNavigate();
  const { reservationId } = useParams();
  const { user } = useAuth();
  const [notes, setNotes] = useState('');

  if (!user) return <Navigate to="/login" replace />;

  const reservation = RESERVATIONS.find((item) => item.id === Number(reservationId));
  if (!reservation) return <Navigate to="/reservations" replace />;
  if (user.role === 'user' && reservation.apartment !== 'B402') return <Navigate to="/reservations" replace />;

  return (
    <MainLayout title="Reservation Details" subtitle={reservation.areaName}>
      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">Overview</h2>
        <p className="text-base leading-relaxed">Date: {formatDate(reservation.reservedAt)}</p>
        <p className="text-base leading-relaxed">Time Slot: {reservation.timeSlot}</p>
        <p className="text-sm text-gray-600 mt-2">Status: Pending</p>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">Notes</h2>
        <input
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Add notes"
        />
        <Button className="mt-4 text-sm">Submit</Button>
      </section>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => navigate('/reservations')} className="text-sm">
          Back
        </Button>
        {user.role === 'admin' ? <Button className="text-sm">Approve</Button> : <Button className="text-sm">Cancel Reservation</Button>}
      </div>
    </MainLayout>
  );
};

export default ReservationDetails;
