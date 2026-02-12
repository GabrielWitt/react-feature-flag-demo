import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavigator from '../shared/components/AppNavigator';
import { TENANTS } from './tenantsData';

const Tenants = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return TENANTS;
    }

    return TENANTS.filter(
      (tenant) =>
        tenant.name.toLowerCase().includes(query) ||
        tenant.apartment.toLowerCase().includes(query) ||
        tenant.status.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <AppNavigator />

        <section className="bg-[#f7f9fc] px-5 py-5 sm:px-8 sm:py-7">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Tenants</h1>

          <div className="mt-4 max-w-md">
            <label htmlFor="tenant-search" className="sr-only">
              Search tenants
            </label>
            <input
              id="tenant-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tenants..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-3 py-3 text-base font-semibold">#</th>
                    <th className="px-3 py-3 text-base font-semibold">Tenant Name</th>
                    <th className="px-3 py-3 text-base font-semibold">Department</th>
                    <th className="px-3 py-3 text-base font-semibold">Status</th>
                    <th className="px-3 py-3 text-base font-semibold">Last Payment</th>
                    <th className="px-3 py-3 text-base font-semibold">Last Payment</th>
                    <th className="px-3 py-3 text-base font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {rows.map((tenant, index) => (
                    <tr key={`${tenant.id}-${index}`} className={index % 2 === 0 ? 'bg-slate-50' : 'border-t border-slate-100'}>
                      <td className="px-3 py-3 text-lg">{tenant.id}</td>
                      <td className="px-3 py-3 text-xl font-semibold">{tenant.name}</td>
                      <td className="px-3 py-3 text-xl">{tenant.apartment}</td>
                      <td className="px-3 py-3 text-xl">{tenant.status}</td>
                      <td className="px-3 py-3 text-xl">{tenant.lastPaymentDate}</td>
                      <td className="px-3 py-3 text-xl">{tenant.paymentRecorded}</td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/tenants/${tenant.id}`)}
                          className="rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {rows.length === 0 && <p className="py-6 text-center text-sm text-slate-500">No tenants found.</p>}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Tenants;
