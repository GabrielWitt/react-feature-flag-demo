export type ReservationStatus = 'Confirmed' | 'Cancelled';

export type ReservationAction = 'View' | 'Confirmed' | 'Cancelled';

export type Reservation = {
  id: number;
  areaName: string;
  apartment: string;
  reservedAt: string;
  timeSlot: string;
  status: ReservationStatus;
  action: ReservationAction;
};

const AREAS = ['Pool', 'Gym', 'Meeting Room', 'BBQ Area', 'Cinema', 'Rooftop', 'Padel Court'];
const APARTMENTS = ['A101', 'A203', 'A401', 'C105', 'C210', 'D305', 'E402', 'F110', 'G221', 'H330'];
const TIME_SLOTS = [
  '08:00 AM - 09:00 AM',
  '10:00 AM - 11:00 AM',
  '02:00 PM - 03:00 PM',
  '05:00 PM - 06:00 PM',
];

export const RESERVATION_DATES = [
  '2025-09-03',
  '2025-09-07',
  '2025-09-12',
  '2025-09-19',
  '2025-09-26',
  '2025-10-02',
  '2025-10-09',
  '2025-10-16',
  '2025-10-23',
  '2025-10-30',
  '2025-11-05',
  '2025-11-11',
  '2025-11-18',
  '2025-11-25',
  '2025-12-01',
  '2025-12-06',
  '2025-12-12',
  '2025-12-18',
  '2025-12-24',
  '2025-12-30',
  '2026-01-04',
  '2026-01-09',
  '2026-01-13',
  '2026-01-18',
  '2026-01-22',
  '2026-01-27',
  '2026-02-01',
  '2026-02-05',
  '2026-02-09',
  '2026-02-13',
  '2026-02-17',
  '2026-02-21',
  '2026-02-25',
  '2026-03-01',
  '2026-03-04',
  '2026-03-07',
  '2026-03-10',
  '2026-03-13',
  '2026-03-16',
  '2026-03-19',
  '2026-03-20',
  '2026-03-21',
  '2026-03-22',
  '2026-03-23',
  '2026-03-24',
  '2026-03-25',
  '2026-03-26',
  '2026-03-27',
  '2026-03-28',
  '2026-03-29',
];

export const RESERVATIONS: Reservation[] = Array.from({ length: 50 }, (_, index) => {
  const id = index + 1;
  const isClientReservation = id <= 10;
  const status: ReservationStatus = id % 6 === 0 ? 'Cancelled' : 'Confirmed';

  let action: ReservationAction = 'View';
  if (id % 5 === 0) {
    action = 'Confirmed';
  }
  if (id % 9 === 0) {
    action = 'Cancelled';
  }

  return {
    id,
    areaName: AREAS[index % AREAS.length],
    apartment: isClientReservation ? 'B402' : APARTMENTS[index % APARTMENTS.length],
    reservedAt: RESERVATION_DATES[index],
    timeSlot: TIME_SLOTS[index % TIME_SLOTS.length],
    status,
    action,
  };
});
