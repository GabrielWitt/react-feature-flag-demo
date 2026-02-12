import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import { TENANTS } from './tenantsData';

const Tenants = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return TENANTS;

    return TENANTS.filter(
      (tenant) =>
        tenant.name.toLowerCase().includes(query) ||
        tenant.apartment.toLowerCase().includes(query) ||
        tenant.status.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <MainLayout title="Tenants">
      <div className="mb-6 max-w-md">
        <label htmlFor="tenant-search" className="text-sm text-gray-600">
          Search tenants
        </label>
        <input
          id="tenant-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search tenants..."
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base leading-relaxed text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-100 text-gray-600">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Tenant Name</th>
              <th className="px-3 py-2">Apartment</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Last Payment</th>
              <th className="px-3 py-2">Recorded</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((tenant) => (
              <tr key={tenant.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{tenant.id}</td>
                <td className="px-3 py-2">{tenant.name}</td>
                <td className="px-3 py-2">{tenant.apartment}</td>
                <td className="px-3 py-2">{tenant.status}</td>
                <td className="px-3 py-2">{tenant.lastPaymentDate}</td>
                <td className="px-3 py-2">{tenant.paymentRecorded}</td>
                <td className="px-3 py-2">
                  <Button variant="primary" onClick={() => navigate(`/admin/tenants/${tenant.id}`)} className="text-sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 ? <p className="mt-4 text-sm text-gray-600">No tenants found.</p> : null}
    </MainLayout>
  );
};

export default Tenants;
