import type { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className = '' }: ContainerProps) => {
  return <div className={`max-w-[1440px] mx-auto px-4 md:px-8 ${className}`}>{children}</div>;
};

export default Container;
