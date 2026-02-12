import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';

const LeaseDetail = () => {
  return (
    <MainLayout title="Lease Agreement" subtitle="Current contract details for your apartment">
      <Card className="border border-slate-200">
        <h2 className="text-2xl font-medium mb-4">Property Information</h2>
        <p className="text-base">Building: Gabrodev Tower</p>
        <p className="text-base">Apartment: B402</p>
        <p className="text-base">Monthly Rent: $1,200.00</p>
        <p className="text-sm text-gray-500 mt-2">Contract End: September 30, 2026</p>
      </Card>

      <Card className="border border-slate-200">
        <h2 className="text-2xl font-medium mb-4">Monthly Payment</h2>
        <p className="text-base">Due Date: 1st of each month</p>
        <p className="text-sm text-gray-500 mt-2">Status: Pending</p>
      </Card>

      <Card className="border border-slate-200">
        <h2 className="text-2xl font-medium mb-4">Community & Safety Notes</h2>
        <ul className="list-disc space-y-2 pl-5 text-base">
          <li>Pets are allowed but owners must clean up after them.</li>
          <li>Reserved common areas must be left clean after use.</li>
          <li>Contact the building manager at 321-456-7890 for concerns.</li>
        </ul>
      </Card>
    </MainLayout>
  );
};

export default LeaseDetail;
