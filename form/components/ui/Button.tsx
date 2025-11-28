import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center py-3 px-6 border border-transparent rounded-lg text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:ring-blue-400',
    secondary: 'text-gray-700 bg-gray-200 hover:bg-gray-300 hover:shadow-md focus:ring-gray-400',
    danger: 'text-white bg-red-600 hover:bg-red-700 hover:shadow-lg focus:ring-red-400',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;