"use client"

import React from 'react'

interface ButtonProps {
  label: string
  className?: string
  onClick: () => void
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent"
  size?: "sm" | "md" | "lg"
}

const ButtonStyles = {
    base: "cursor-pointer font-bold",
    primary: "bg-primary text-white hover:bg-transparent hover:text-primary hover:border-primary border-1 transition-all duration-200",
    secondary: "bg-secondary text-primary hover:bg-transparent hover:text-secondary hover:border-secondary border-1 transition-all duration-200",
    accent: "bg-accent text-accent-dark hover:bg-transparent hover:text-accent hover:border-accent border-1 transition-all duration-200",
}

const SizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-12 py-4 text-sm",
    lg: "px-16 py-5 text-md",
}

const Button = ({ label, className, onClick, children, variant, size }: ButtonProps): React.JSX.Element => {
  
  const styles = ButtonStyles.base + " " + ButtonStyles[variant || "primary"] + " " + SizeStyles[size || "md"] + " " + className
  
  return (
    <button className={styles} aria-label={label} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button