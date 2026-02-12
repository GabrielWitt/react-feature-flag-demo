import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const id = Number(reservationId);
  const reservation = RESERVATIONS.find((item) => item.id === id);

  if (!reservation) {
    return <Navigate to="/reservations" replace />;
  }

  if (user.role === 'user' && reservation.apartment !== 'B402') {
    return <Navigate to="/reservations" replace />;
  }

  const displayStatus = 'Pending';

  return (
    <main className="min-h-screen bg-[#dfe6ee] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_rgba(15,23,42,0.2)]">
        <header className="border-b border-slate-200 bg-[#f8fafc] px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <img src="/GabroDevLogo.png" alt="Gabrodev logo" className="h-8 w-10 object-contain" />
            <p className="text-xl font-semibold text-slate-800">Gabrodev</p>
          </div>
        </header>

        <section className="bg-[#f7f9fc] px-5 py-6 sm:px-7 sm:py-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Reservation Details</h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{reservation.areaName}</h2>
            <span className="rounded-full bg-sky-500 px-4 py-1 text-base font-semibold text-white">{displayStatus}</span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 text-slate-700 sm:grid-cols-3">
            <div className="space-y-1.5">
              <p className="text-lg font-bold text-slate-900">Date:</p>
              <p className="text-lg">{formatDate(reservation.reservedAt)}</p>
              <p className="text-lg font-bold text-slate-900">Time Slot:</p>
              <p className="text-lg">{reservation.timeSlot}</p>
              <p className="text-lg font-bold text-slate-900">Duration</p>
              <p className="text-lg">2 Hours</p>
            </div>

            <div className="space-y-1.5">
              <p className="text-lg font-bold text-slate-900">Time Slot ID:</p>
              <p className="text-lg">RES-{reservation.reservedAt.replace(/-/g, '')}-00M</p>
            </div>

            <div className="space-y-1.5">
              <p className="text-lg font-bold text-slate-900">Reservation ID:</p>
              <p className="text-lg">RES-{reservation.reservedAt.replace(/-/g, '')}-{String(reservation.id).padStart(3, '0')}</p>
              <p className="text-lg">2 Hours</p>
            </div>
          </div>

          <hr className="my-8 border-slate-200" />

          <section>
            <h3 className="text-2xl font-bold text-slate-900">Additional Details</h3>
            <h4 className="mt-2 text-xl font-bold text-slate-900">Rules Reminder</h4>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-slate-500 sm:text-base">
              <li>Arrive 10 minutes before your reservation starts.</li>
              <li>Leave the area clean and ready for the next resident.</li>
            </ul>

            <label htmlFor="notes" className="mt-4 block text-lg font-bold text-slate-900">
              Notes
            </label>
            <input
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              className="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Submit
            </button>
          </section>

          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate('/reservations')}
              className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-slate-200"
            >
              Back
            </button>
            {user.role === 'admin' ? (
              <button
                type="button"
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Approve
              </button>
            ) : (
              <button
                type="button"
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Cancel Reservation
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ReservationDetails;
