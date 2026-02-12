import type { ReactNode } from 'react';
import Card from '../../../components/ui/Card';

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
  subtitleClassName = 'text-sm text-gray-500',
  highlighted = false,
  extra,
}: MetricCardProps) => {
  return (
    <Card className={highlighted ? 'border border-[#2F80ED]' : 'border border-slate-200'}>
      <h3 className="text-xl font-medium mb-3 text-[#2D3436]">{title}</h3>
      <div className="text-base text-[#2D3436]">{value}</div>
      {subtitle ? <p className={`mt-2 ${subtitleClassName}`}>{subtitle}</p> : null}
      {extra ? <div className="mt-3">{extra}</div> : null}
    </Card>
  );
};

export default MetricCard;
