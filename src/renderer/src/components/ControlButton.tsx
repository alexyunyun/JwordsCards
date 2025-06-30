import React from 'react';
import { motion } from 'framer-motion';

interface ControlButtonProps {
  onClick: (e?: React.MouseEvent) => void;
  title: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  title,
  disabled = false,
  className = '',
  children,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'p-2',
    md: 'p-2',
    lg: 'p-3'
  };

  const baseClasses = `
    ${sizeClasses[size]} 
    rounded-full 
    text-gray-700 
    dark:text-gray-200 
    hover:bg-gray-200 
    dark:hover:bg-gray-700 
    transition-all 
    duration-200 
    disabled:opacity-50 
    disabled:cursor-not-allowed
  `;

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      title={title}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default ControlButton;