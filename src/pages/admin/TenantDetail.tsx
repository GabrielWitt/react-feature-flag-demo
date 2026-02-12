import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { TENANTS } from './tenantsData';

const TenantDetail = () => {
  const navigate = useNavigate();
  const { tenantId } = useParams();

  const id = Number(tenantId);
  const tenant = TENANTS.find((item) => item.id === id);

  if (!tenant) {
    return <Navigate to="/admin/tenants" replace />;
  }

  return (
    <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <img src="/GabroDevLogo.png" alt="Gabrodev logo" className="h-10 w-12 object-contain" />
            <p className="text-4xl font-semibold text-slate-800">Tenant Detail</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/tenants')}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back
          </button>
        </header>

        <section className="grid gap-4 bg-[#f7f9fc] px-5 py-5 sm:grid-cols-2 sm:px-8 sm:py-7">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mx-auto grid h-40 w-40 place-items-center rounded-full bg-slate-200 text-4xl font-bold text-slate-600">
              {tenant.name.charAt(0).toUpperCase()}
            </div>
            <div className="mt-6 text-center">
              <h1 className="text-5xl font-bold tracking-tight text-slate-900">{tenant.name}</h1>
              <p className="mt-2 text-xl text-slate-500">Apartment: {tenant.apartment}</p>
            </div>

            <div className="mt-6 space-y-1 text-sm text-slate-500">
              <p>+1 (555) 203-3669</p>
              <p>{tenant.name.toLowerCase().replace(/\s+/g, '.')}@gabrodev.com</p>
              <p>Emergency Contact: John Doe</p>
            </div>
          </article>

          <div className="space-y-4">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-3xl font-semibold text-slate-900">Payment History</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead className="text-slate-600">
                    <tr>
                      <th className="px-2 py-2 font-semibold">Date</th>
                      <th className="px-2 py-2 font-semibold">Description</th>
                      <th className="px-2 py-2 font-semibold">Amount</th>
                      <th className="px-2 py-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-t border-slate-100">
                      <td className="px-2 py-2">{tenant.lastPaymentDate}</td>
                      <td className="px-2 py-2">Apartment: {tenant.apartment}</td>
                      <td className="px-2 py-2">$1,188</td>
                      <td className="px-2 py-2"><span className="rounded bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">Paid</span></td>
                    </tr>
                    <tr className="border-t border-slate-100">
                      <td className="px-2 py-2">Sep 30, 2025</td>
                      <td className="px-2 py-2">Fees/Utilities</td>
                      <td className="px-2 py-2">$560</td>
                      <td className="px-2 py-2"><span className="rounded bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">Paid</span></td>
                    </tr>
                    <tr className="border-t border-slate-100">
                      <td className="px-2 py-2">Aug 15, 2025</td>
                      <td className="px-2 py-2">Parking + Amenities</td>
                      <td className="px-2 py-2">$186.83</td>
                      <td className="px-2 py-2"><span className="rounded bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">Paid</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-3xl font-semibold text-slate-900">Reservation History</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead className="text-slate-600">
                    <tr>
                      <th className="px-2 py-2 font-semibold">Area Name</th>
                      <th className="px-2 py-2 font-semibold">Date</th>
                      <th className="px-2 py-2 font-semibold">Time</th>
                      <th className="px-2 py-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-t border-slate-100">
                      <td className="px-2 py-2">Pool</td>
                      <td className="px-2 py-2">Oct 20, 2025</td>
                      <td className="px-2 py-2">Paid</td>
                      <td className="px-2 py-2"><span className="rounded bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">Confirmed</span></td>
                    </tr>
                    <tr className="border-t border-slate-100">
                      <td className="px-2 py-2">Meeting Room</td>
                      <td className="px-2 py-2">Oct 25, 2025</td>
                      <td className="px-2 py-2">Paid</td>
                      <td className="px-2 py-2"><span className="rounded bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">Cancelled</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TenantDetail;
