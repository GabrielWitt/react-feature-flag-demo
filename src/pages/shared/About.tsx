import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';

const About = () => {
  return (
    <MainLayout title="About" subtitle="Product information and version">
      <Card className="border border-slate-200 text-center">
        <h2 className="text-2xl font-medium mb-4">Gabrodev</h2>
        <p className="text-base">Building Management System</p>
        <p className="text-sm text-gray-500 mt-2">v1.0.0</p>
        <p className="text-sm text-gray-500 mt-8">© 2026 Gabrodev Inc.</p>
      </Card>
    </MainLayout>
  );
};

export default About;
