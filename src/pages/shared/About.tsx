import AppNavigator from './components/AppNavigator';

const About = () => {
  return (
    <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <AppNavigator />

        <section className="bg-[#f7f9fc] px-5 py-5 sm:px-8 sm:py-7">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-4xl font-semibold text-slate-900">About</h1>

            <div className="mt-20 text-center">
              <p className="text-7xl font-bold tracking-tight text-slate-900">Gabrodev</p>
              <p className="mt-5 text-4xl font-medium leading-tight text-blue-600">Building Management System</p>
              <p className="mt-4 text-3xl text-blue-500">v1.0.0</p>
              <p className="mt-24 text-2xl text-blue-500">© 2026 Gabrodev Inc.</p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default About;
