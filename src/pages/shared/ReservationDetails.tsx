import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StateCard from '../../components/ui/StateCard';
import { useAuth } from '../../hooks/useAuth';
import { RESERVATIONS } from '../../services/reservationsData';
import { canAccessReservation } from '../../utils/authorization';

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

  if (!user) {
    return null;
  }

  const parsedId = Number(reservationId);
  const reservation = RESERVATIONS.find((item) => item.id === parsedId);
  const isForbidden = reservation ? !canAccessReservation(user, reservation.apartment) : false;

  if (!reservation || Number.isNaN(parsedId)) {
    return (
      <MainLayout title="Reservation not found" subtitle="The reservation does not exist">
        <StateCard
          title="Reservation not found."
          message="It may have been removed or the URL is invalid."
          actionLabel="Back to reservations"
          onAction={() => navigate('/reservations')}
        />
      </MainLayout>
    );
  }

  if (isForbidden) {
    return (
      <MainLayout title="Access denied" subtitle="You are not allowed to open this reservation">
        <StateCard
          title="Access denied."
          message="This reservation belongs to another apartment."
          actionLabel="Back to reservations"
          onAction={() => navigate('/reservations')}
          tone="warning"
        />
      </MainLayout>
    );
  }

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
