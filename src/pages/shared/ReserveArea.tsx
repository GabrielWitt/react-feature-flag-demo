import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';

const ReserveArea = () => {
  const [area, setArea] = useState('Pool');
  const [date, setDate] = useState('2026-03-12');
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 10:00 AM');

  const slots = ['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '02:00 PM - 03:00 PM', '05:00 PM - 06:00 PM'];

  return (
    <MainLayout title="Reserve Common Area" subtitle="Create a new common-area reservation">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Selection</h2>
          <label className="text-sm text-gray-600">Area</label>
          <select value={area} onChange={(event) => setArea(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2">
            <option>Pool</option>
            <option>BBQ Area</option>
            <option>Meeting Room</option>
            <option>Gym</option>
          </select>

          <label className="mt-4 block text-sm text-gray-600">Date</label>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2" />

          <p className="mt-4 text-sm text-gray-600">Time slot</p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            {slots.map((slot) => (
              <Button key={slot} variant={timeSlot === slot ? 'primary' : 'secondary'} onClick={() => setTimeSlot(slot)} className="text-sm text-left">
                {slot}
              </Button>
            ))}
          </div>

          <Button className="mt-4 text-sm">Reserve</Button>
        </article>

        <article className="rounded-xl border border-slate-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Reservation Rules</h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
            <li>Book up to 7 days in advance.</li>
            <li>Max 2 reservations per day per apartment.</li>
            <li>Cancellations must be made at least 2 hours before start time.</li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">Selected: {area} on {date} ({timeSlot})</p>
        </article>
      </div>
    </MainLayout>
  );
};

export default ReserveArea;
