import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'danger' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300',
};

export default function Button({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${variantClass[variant]} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? 'กำลังโหลด...' : children}
    </button>
  );
}
