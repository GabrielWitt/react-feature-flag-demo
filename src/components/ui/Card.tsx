import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className = '' }: CardProps) => {
  return <article className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>{children}</article>;
};

export default Card;
