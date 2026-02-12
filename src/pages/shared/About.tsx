import MainLayout from '../../components/layout/MainLayout';

const About = () => {
  return (
    <MainLayout title="About" subtitle="Product information">
      <div className="rounded-xl border border-slate-200 p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">Gabrodev</h2>
        <p className="text-base leading-relaxed">Building Management System</p>
        <p className="text-sm text-gray-600 mt-2">v1.0.0</p>
        <p className="text-sm text-gray-600 mt-6">© 2026 Gabrodev Inc.</p>
      </div>
    </MainLayout>
  );
};

export default About;
