import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ReserveArea = () => {
  const [area, setArea] = useState('Pool');
  const [date, setDate] = useState('2026-03-12');
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 10:00 AM');

  const slots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '02:00 PM - 03:00 PM',
    '05:00 PM - 06:00 PM',
  ];

  return (
    <MainLayout title="Reserve Common Area" subtitle="Create a new common-area reservation">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="border border-slate-200">
          <h2 className="text-2xl font-medium mb-4">Selection</h2>
          <label className="text-sm text-gray-500">Area</label>
          <select
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base"
          >
            <option>Pool</option>
            <option>BBQ Area</option>
            <option>Meeting Room</option>
            <option>Gym</option>
          </select>

          <label className="mt-4 block text-sm text-gray-500">Date</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base"
          />

          <p className="mt-4 text-sm text-gray-500">Time slots</p>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {slots.map((slot) => (
              <Button
                key={slot}
                variant={timeSlot === slot ? 'primary' : 'secondary'}
                onClick={() => setTimeSlot(slot)}
                className="text-sm"
              >
                {slot}
              </Button>
            ))}
          </div>

          <Button className="mt-4">Reserve</Button>
        </Card>

        <Card className="border border-slate-200">
          <h2 className="text-2xl font-medium mb-4">Reservation Rules</h2>
          <ul className="list-disc space-y-2 pl-5 text-base">
            <li>Book up to 7 days in advance.</li>
            <li>Maximum 2 reservations per day per apartment.</li>
            <li>Cancellations must be made at least 2 hours before start time.</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            Selected: {area} on {date} ({timeSlot})
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReserveArea;
