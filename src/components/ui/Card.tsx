import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>;

const Card = ({ children, className = '', ...rest }: CardProps) => {
  return (
    <article className={`bg-white rounded-xl shadow-sm p-6 ${className}`} {...rest}>
      {children}
    </article>
  );
};

export default Card;
