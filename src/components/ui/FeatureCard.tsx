import { motion } from 'motion/react'
import { type ReactNode, useRef, useState } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  variant?: 'default' | 'accent' | 'warm' | 'cool' | 'minimal'
  className?: string
  tilt?: boolean
}

const variantStyles = {
  default: {
    container: 'bg-white border-primary-100/80 hover:border-primary-200/80 hover:shadow-[var(--shadow-card-hover)]',
    icon: 'bg-gradient-to-br from-primary-800 to-primary-900 text-white',
    title: 'text-primary-900',
    description: 'text-primary-500',
  },
  accent: {
    container: 'bg-gradient-to-br from-accent-50/80 to-accent-50/40 border-accent-100/80 hover:border-accent-200/80',
    icon: 'bg-gradient-to-br from-accent-500 to-accent-600 text-white',
    title: 'text-accent-900',
    description: 'text-accent-700',
  },
  warm: {
    container: 'bg-gradient-to-br from-warm-50/80 to-warm-50/40 border-warm-100/80 hover:border-warm-200/80',
    icon: 'bg-gradient-to-br from-warm-500 to-warm-600 text-white',
    title: 'text-warm-900',
    description: 'text-warm-700',
  },
  cool: {
    container: 'bg-gradient-to-br from-cool-50/80 to-cool-50/40 border-cool-100/80 hover:border-cool-200/80',
    icon: 'bg-gradient-to-br from-cool-500 to-cool-600 text-white',
    title: 'text-cool-900',
    description: 'text-cool-700',
  },
  minimal: {
    container: 'bg-transparent border-transparent hover:border-primary-100 hover:bg-white/50',
    icon: 'bg-primary-100 text-primary-700',
    title: 'text-primary-900',
    description: 'text-primary-500',
  },
}

export function FeatureCard({
  icon,
  title,
  description,
  variant = 'default',
  className = '',
  tilt = false,
}: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotateX(-y * 8)
    setRotateY(x * 8)
  }

  const handleMouseLeave = () => {
    if (!tilt) return
    setRotateX(0)
    setRotateY(0)
  }

  const vs = variantStyles[variant]

  if (tilt) {
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className={`group px-[var(--spacing-card-padding-x)] py-[var(--spacing-card-padding-y)] rounded-2xl border transition-all duration-300 ${vs.container} cursor-default relative overflow-hidden ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-[-4deg] transition-all duration-300 ${vs.icon} shadow-sm`}>
          {icon}
        </div>
        <h3 className={`text-[17px] font-bold mb-3 leading-snug ${vs.title}`}>{title}</h3>
        <p className={`text-sm leading-[1.65] ${vs.description}`}>{description}</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group px-[var(--spacing-card-padding-x)] py-[var(--spacing-card-padding-y)] rounded-2xl border transition-all duration-300 ${vs.container} relative overflow-hidden ${className}`}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-[-4deg] transition-all duration-300 ${vs.icon} shadow-sm`}>
        {icon}
      </div>
      <h3 className={`text-[17px] font-bold mb-3 leading-snug ${vs.title}`}>{title}</h3>
      <p className={`text-sm leading-[1.65] ${vs.description}`}>{description}</p>
    </motion.div>
  )
}
