import type { ReactNode } from 'react';
import Container from '../ui/Container';
import Navbar from '../ui/Navbar';
import PageHeader from '../ui/PageHeader';

type MainLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
};

const MainLayout = ({ title, subtitle, children, actions }: MainLayoutProps) => {
  return (
    <main className="min-h-screen bg-[#F4F6F9]">
      <Navbar />
      <Container className="pt-24 pb-10">
        {/* Shared structure keeps every page aligned to one SaaS layout language. */}
        <PageHeader title={title} subtitle={subtitle} actions={actions} />
        <div className="space-y-6">{children}</div>
      </Container>
    </main>
  );
};

export default MainLayout;
