import type { ReactNode } from 'react';
import Button from './Button';
import Card from './Card';

type StateTone = 'neutral' | 'warning';

type StateCardProps = {
  title: string;
  message: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  tone?: StateTone;
};

const toneClassName: Record<StateTone, string> = {
  neutral: 'border border-slate-300',
  warning: 'border border-amber-200 bg-amber-50',
};

const StateCard = ({ title, message, actionLabel, onAction, tone = 'neutral' }: StateCardProps) => {
  return (
    <Card className={`${toneClassName[tone]} text-center`}>
      <p className="text-base">{title}</p>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
      {actionLabel && onAction ? (
        <div className="mt-4">
          <Button variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </Card>
  );
};

export default StateCard;
