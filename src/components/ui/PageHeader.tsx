import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1
          data-page-title
          tabIndex={-1}
          className="mb-6 text-3xl font-semibold text-[#2D3436] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
        >
          {title}
        </h1>
        {subtitle ? <p className="-mt-4 text-sm text-gray-500">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
};

export default PageHeader;
