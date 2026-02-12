import type { ReactNode } from 'react';

type MetricCardProps = {
  title: string;
  value: ReactNode;
  subtitle?: string;
  subtitleClassName?: string;
  highlighted?: boolean;
  extra?: ReactNode;
};

const MetricCard = ({
  title,
  value,
  subtitle,
  subtitleClassName = 'text-slate-500',
  highlighted = false,
  extra,
}: MetricCardProps) => {
  return (
    <article className={`rounded-2xl bg-white p-5 shadow-sm ${highlighted ? 'border-2 border-blue-500' : 'border border-slate-200'}`}>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className="mt-2">{value}</div>
      {subtitle ? <p className={`mt-1 text-xs ${subtitleClassName}`}>{subtitle}</p> : null}
      {extra ? <div className="mt-2">{extra}</div> : null}
    </article>
  );
};

export default MetricCard;
