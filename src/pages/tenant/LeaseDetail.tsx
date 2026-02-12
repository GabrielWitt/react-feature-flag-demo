import MainLayout from '../../components/layout/MainLayout';

const LeaseDetail = () => {
  return (
    <MainLayout title="Lease Agreement" subtitle="Current contract details for your apartment">
      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">Property Information</h2>
        <p className="text-base leading-relaxed">Building: Gabrodev Tower</p>
        <p className="text-base leading-relaxed">Apartment: B402</p>
        <p className="text-base leading-relaxed">Monthly Rent: $1,200.00</p>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">Monthly Payment</h2>
        <p className="text-base leading-relaxed">Due Date: 1st of each month</p>
        <p className="text-sm text-gray-600 mt-2">Status: Pending</p>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">Community & Safety Notes</h2>
        <ul className="list-disc pl-5 text-base leading-relaxed">
          <li>Pets are allowed but owners must clean up after them.</li>
          <li>Reserved common areas must be left clean after use.</li>
          <li>Contact the building manager at 321-456-7890 for concerns.</li>
        </ul>
      </section>
    </MainLayout>
  );
};

export default LeaseDetail;
