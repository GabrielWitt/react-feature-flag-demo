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
  subtitleClassName = 'text-gray-600',
  highlighted = false,
  extra,
}: MetricCardProps) => {
  return (
    <article className={`rounded-xl border p-4 ${highlighted ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-white'}`}>
      <h3 className="text-xl font-medium mb-3 text-slate-900">{title}</h3>
      <div className="text-base leading-relaxed">{value}</div>
      {subtitle ? <p className={`mt-2 text-sm ${subtitleClassName}`}>{subtitle}</p> : null}
      {extra ? <div className="mt-2">{extra}</div> : null}
    </article>
  );
};

export default MetricCard;
