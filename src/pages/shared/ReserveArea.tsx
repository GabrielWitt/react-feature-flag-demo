import { useState } from 'react';
import AppNavigator from './components/AppNavigator';

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
    <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <AppNavigator />

        <section className="bg-[#f7f9fc] px-5 py-6 sm:px-8 sm:py-8">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">Reserve Common Area</h1>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <label className="text-sm font-semibold text-slate-600">Area selection</label>
              <select
                value={area}
                onChange={(event) => setArea(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                <option>Pool</option>
                <option>BBQ Area</option>
                <option>Meeting Room</option>
                <option>Gym</option>
              </select>

              <label className="mt-4 block text-sm font-semibold text-slate-600">Calendar date picker</label>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-4 text-sm font-semibold text-slate-600">Time slots selector</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      timeSlot === slot ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Reserve
              </button>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-700">Reservation Rules</h2>
              <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Selected area</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{area}</p>
                <p className="mt-3 text-xs text-slate-500">Selected date</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{date}</p>
                <p className="mt-3 text-xs text-slate-500">Selected slot</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{timeSlot}</p>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-700">Reservation Rules</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Book up to 7 days in advance.</li>
                <li>Max 2 reservations per day per apartment.</li>
                <li>Cancellations must be done at least 2 hours before start time.</li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ReserveArea;
