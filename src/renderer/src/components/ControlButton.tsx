import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ControlButton.css';

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
  const sizeClass = `control-button-${size}`;
  const baseClasses = `control-button ${sizeClass}`;

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