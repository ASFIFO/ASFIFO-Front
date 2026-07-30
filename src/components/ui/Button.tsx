import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion } from 'motion/react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  icon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-900 text-white hover:bg-primary-800 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow-primary)] active:shadow-sm',
  secondary: 'bg-gradient-to-br from-accent-500 to-accent-600 text-white hover:from-accent-400 hover:to-accent-500 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow-accent)] active:shadow-sm',
  outline: 'border border-primary-200 text-primary-900 hover:bg-primary-900 hover:text-white hover:border-primary-900 hover:shadow-[var(--shadow-card)]',
  ghost: 'text-primary-600 hover:text-primary-900 hover:bg-primary-50/80',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition-all duration-300 ${variantClasses[variant]} ${sizeClasses[size]} ${props.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  )
}
