import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
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
    <MainLayout title="Tenants" subtitle="Manage tenant records and payment activity">
      <Card className="border border-slate-200">
        <label htmlFor="tenant-search" className="text-sm text-gray-500">
          Search tenants
        </label>
        <input
          id="tenant-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, apartment or status"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base text-[#2D3436] outline-none focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
        />
      </Card>

      <Card className="border border-slate-200 p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#F4F6F9] text-sm text-gray-500">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Tenant Name</th>
                <th className="px-4 py-3">Apartment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Payment</th>
                <th className="px-4 py-3">Recorded</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((tenant) => (
                <tr key={tenant.id} className="border-t border-slate-100 hover:bg-[#F4F6F9]">
                  <td className="px-4 py-3 text-base">{tenant.id}</td>
                  <td className="px-4 py-3 text-base">{tenant.name}</td>
                  <td className="px-4 py-3 text-base">{tenant.apartment}</td>
                  <td className="px-4 py-3 text-base">{tenant.status}</td>
                  <td className="px-4 py-3 text-base">{tenant.lastPaymentDate}</td>
                  <td className="px-4 py-3 text-base">{tenant.paymentRecorded}</td>
                  <td className="px-4 py-3">
                    <Button onClick={() => navigate(`/admin/tenants/${tenant.id}`)} className="text-sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {rows.length === 0 ? (
        <Card className="border border-dashed border-slate-300 text-center">
          <p className="text-base text-[#2D3436]">No tenants match your search.</p>
          <p className="text-sm text-gray-500 mt-2">Try a different keyword.</p>
        </Card>
      ) : null}
    </MainLayout>
  );
};

export default Tenants;
