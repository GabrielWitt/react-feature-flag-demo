import type { ReactNode } from 'react';
import AppNavigator from '../../pages/shared/components/AppNavigator';

type MainLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showNavigator?: boolean;
};

const MainLayout = ({ title, subtitle, children, showNavigator = true }: MainLayoutProps) => {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* A shared layout keeps typography and spacing predictable across every page. */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {showNavigator ? <AppNavigator /> : null}
          <section className="px-6 py-8">
            <header className="mb-6">
              <h1 className="text-3xl font-bold mb-6 text-slate-900">{title}</h1>
              {subtitle ? <p className="text-sm text-gray-600 -mt-4">{subtitle}</p> : null}
            </header>
            <div className="text-base leading-relaxed text-slate-700">{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
