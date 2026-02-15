import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'onClick' | 'disabled' | 'children' | 'className'
>;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#2F80ED] text-white hover:bg-[#1c6fe0] focus-visible:ring-[#56CCF2] shadow-sm',
  secondary:
    'bg-white border border-[#2F80ED] text-[#2F80ED] hover:bg-[#F4F6F9] focus-visible:ring-[#56CCF2]',
};

// Reusable button variants keep interactions and visual language consistent at scale.
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
