interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'outline'
  className?: string
}

const variantClasses = {
  default: 'bg-primary-100/80 text-primary-700 backdrop-blur-sm',
  accent: 'bg-gradient-to-r from-accent-100 to-accent-50 text-accent-700',
  outline: 'border border-primary-200 text-primary-600 backdrop-blur-sm',
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-semibold tracking-wide ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
