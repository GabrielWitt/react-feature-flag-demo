import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { RESERVATIONS } from '../../services/reservationsData';

const formatDate = (date: string) => {
  const parsed = new Date(`${date}T00:00:00`);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(parsed);
};

const ReservationDetails = () => {
  const navigate = useNavigate();
  const { reservationId } = useParams();
  const { user } = useAuth();
  const [notes, setNotes] = useState('');

  if (!user) return <Navigate to="/login" replace />;

  const reservation = RESERVATIONS.find((item) => item.id === Number(reservationId));
  if (!reservation) return <Navigate to="/reservations" replace />;
  if (user.role === 'user' && reservation.apartment !== 'B402')
    return <Navigate to="/reservations" replace />;

  return (
    <MainLayout title="Reservation Details" subtitle={reservation.areaName}>
      <Card className="border border-slate-200">
        <h2 className="text-2xl font-medium mb-4">Overview</h2>
        <p className="text-base">Date: {formatDate(reservation.reservedAt)}</p>
        <p className="text-base">Time Slot: {reservation.timeSlot}</p>
        <p className="text-sm text-gray-500 mt-2">Status: Pending</p>
      </Card>

      <Card className="border border-slate-200">
        <h2 className="text-2xl font-medium mb-4">Notes</h2>
        <input
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
          placeholder="Add notes"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <Button>Submit</Button>
          <Button variant="secondary" onClick={() => navigate('/reservations')}>
            Back
          </Button>
          {user.role === 'admin' ? <Button>Approve</Button> : <Button>Cancel Reservation</Button>}
        </div>
      </Card>
    </MainLayout>
  );
};

export default ReservationDetails;
