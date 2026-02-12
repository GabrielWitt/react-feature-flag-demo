import AppNavigator from '../shared/components/AppNavigator';

const LeaseDetail = () => {
  return (
    <main className="min-h-screen bg-[#e9eef4] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <AppNavigator />

        <section className="bg-[#f7f9fc] px-5 py-5 sm:px-8 sm:py-7">
          <article className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Lease Agreement</h1>

            <hr className="my-5 border-slate-200" />

            <div>
              <h2 className="text-2xl font-bold text-slate-900">Property Information</h2>
              <div className="mt-3 grid grid-cols-1 gap-4 text-slate-700 sm:grid-cols-3">
                <div className="space-y-2 text-base sm:text-lg">
                  <p className="font-semibold text-slate-900">Building Name:</p>
                  <p className="font-semibold text-slate-900">Apartment Number:</p>
                  <p className="font-semibold text-slate-900">Monthly Rent:</p>
                </div>

                <div className="space-y-2 text-base sm:text-lg">
                  <p>Gabrodev Tower</p>
                  <p>
                    <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white sm:text-sm">B402</span>
                  </p>
                  <p>$1,200.00</p>
                </div>

                <div className="space-y-2 text-base sm:text-lg">
                  <p className="font-semibold text-slate-900">Monthly Rent Date:</p>
                  <p>October 1, 2025</p>
                  <p>Contract End: September 30, 2025</p>
                </div>
              </div>
            </div>

            <hr className="my-5 border-slate-200" />

            <div>
              <h2 className="text-2xl font-bold text-slate-900">Monthly Payment</h2>
              <div className="mt-3 space-y-3 text-base text-slate-700 sm:text-lg">
                <p>
                  <span className="font-semibold text-slate-900">Monthly Rent Amount:</span> $1,200.00
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Due Date:</span> 1st of each month
                  <span className="ml-3 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white sm:text-sm">Paid</span>
                </p>
              </div>
            </div>

            <hr className="my-5 border-slate-200" />

            <div>
              <h2 className="text-2xl font-bold text-slate-900">Community &amp; Safety Notes</h2>
              <div className="mt-3 rounded-xl bg-blue-50 p-4 text-sm text-slate-700 sm:text-base">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Pets are allowed but owners must clean up after them.</li>
                  <li>Reserved common areas must be left clean after use.</li>
                  <li>Contact the building manager at 321-456-7890 for any concerns.</li>
                </ul>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default LeaseDetail;
