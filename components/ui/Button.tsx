"use client"

import Link from "next/link"

interface ButtonProps {
  label: string
  className?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent"
  size?: "sm" | "md" | "lg"
  href?: string
  target?: string
}

const ButtonStyles = {
    base: "cursor-pointer font-bold inline-flex justify-center items-center",
    primary: "bg-primary text-white hover:bg-transparent hover:text-primary hover:border-primary border-1 transition-all duration-200",
    secondary: "bg-secondary text-primary hover:bg-transparent hover:text-secondary hover:border-secondary border-1 transition-all duration-200",
    accent: "bg-accent text-accent-dark hover:bg-transparent hover:text-accent hover:border-accent border-1 transition-all duration-200",
}

const SizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-12 py-4 text-sm",
    lg: "px-16 py-5 text-md",
}

const Button = ({ label, className, onClick, children, variant, size, href, target }: ButtonProps): React.JSX.Element => {
  
  const styles = ButtonStyles.base + " " + ButtonStyles[variant || "primary"] + " " + SizeStyles[size || "md"] + " " + (className || "")
  
  if (href) {
    if (href.startsWith("http") || href.startsWith("mailto:")) {
       return (
         <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={styles} aria-label={label}>
           {children}
         </a>
       )
    }
    return (
      <Link href={href} target={target} className={styles} aria-label={label}>
        {children}
      </Link>
    )
  }

  return (
    <button className={styles} aria-label={label} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button