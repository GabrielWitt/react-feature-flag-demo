import { useNavigate } from 'react-router-dom';
import AppNavigator from '../shared/components/AppNavigator';

type PaymentStatus = 'Paid' | 'Pending';

type PaymentRow = {
  id: string;
  type: string;
  description: string;
  date: string;
  amount: string;
  status: PaymentStatus;
};

const PAYMENT_ROWS: PaymentRow[] = [
  { id: 'PAY-2025-001', type: 'Monthly Lease', description: 'January', date: 'Jan 01, 2025', amount: '$1,200', status: 'Paid' },
  { id: 'PAY-2025-002', type: 'Reservation', description: 'Pool Reservation', date: 'Jun 15, 2025', amount: '$120', status: 'Paid' },
  { id: 'PAY-2025-009', type: 'Reservation', description: 'BBQ Area Reservation', date: 'Jun 15, 2025', amount: '$120', status: 'Paid' },
  { id: 'PAY-2025-010', type: 'Monthly Lease', description: 'October', date: 'Oct 01, 2025', amount: '$1,200', status: 'Pending' },
];

const statusClass = (status: PaymentStatus) => {
  if (status === 'Paid') {
    return 'bg-blue-100 text-blue-700';
  }

  return 'bg-slate-200 text-slate-700';
};

const Payments = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#e9eef4] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <AppNavigator />

        <section className="bg-[#f7f9fc] px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Apartment B402 - Payment History</h1>
              <p className="mt-1 text-base text-slate-500 sm:text-lg">Lease and Reservation Payments</p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/tenant/payments/checkout')}
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Pay Now
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-xl font-semibold text-slate-800">Total Paid This Year</p>
              <p className="mt-2 text-4xl font-bold text-blue-600">$14,400</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-xl font-semibold text-slate-800">Pending Amount</p>
              <p className="mt-2 text-4xl font-bold text-blue-600">$1,200</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-xl font-semibold text-slate-800">Next Due Date</p>
              <p className="mt-2 text-4xl font-bold text-blue-600">Oct 1, 2025</p>
            </article>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="text-slate-700">
                  <tr>
                    <th className="px-3 py-2 text-base font-semibold">Payment ID</th>
                    <th className="px-3 py-2 text-base font-semibold">Type</th>
                    <th className="px-3 py-2 text-base font-semibold">Description</th>
                    <th className="px-3 py-2 text-base font-semibold">Date</th>
                    <th className="px-3 py-2 text-base font-semibold">Amount</th>
                    <th className="px-3 py-2 text-base font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {PAYMENT_ROWS.map((payment) => (
                    <tr key={payment.id} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-xl">{payment.id}</td>
                      <td className="px-3 py-2 text-xl">{payment.type}</td>
                      <td className="px-3 py-2 text-xl">{payment.description}</td>
                      <td className="px-3 py-2 text-xl">{payment.date}</td>
                      <td className="px-3 py-2 text-xl">{payment.amount}</td>
                      <td className="px-3 py-2">
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusClass(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Payments;
