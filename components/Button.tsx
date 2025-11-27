import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'black';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  className = '',
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "font-display tracking-wide uppercase rounded-xl flex items-center justify-center transition-all border-2 border-brand-dark active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
  
  const variants = {
    primary: "bg-brand-red text-white shadow-hard hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(45,37,32,1)]",
    secondary: "bg-brand-yellow text-brand-dark shadow-hard hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(45,37,32,1)]",
    black: "bg-brand-dark text-white shadow-hard border-transparent",
    outline: "bg-transparent text-brand-dark hover:bg-brand-dark hover:text-white",
    whatsapp: "bg-brand-green text-white border-brand-green shadow-hard hover:-translate-y-1"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};