import { type ReactNode } from 'react'
import { motion } from 'motion/react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' | 'none'
  duration?: number
  distance?: number
  once?: boolean
  /** Moves the in-viewport trigger margin closer so elements appear later during scroll */
  tightMargin?: boolean
  spring?: boolean
}

const generateVariants = (direction: string, distance: number) => {
  const base = { opacity: 0 }
  const visible = { opacity: 1, y: 0, x: 0, scale: 1 }

  switch (direction) {
    case 'up':
      return { hidden: { ...base, y: distance }, visible }
    case 'down':
      return { hidden: { ...base, y: -distance }, visible }
    case 'left':
      return { hidden: { ...base, x: -distance }, visible }
    case 'right':
      return { hidden: { ...base, x: distance }, visible }
    case 'scale':
      return { hidden: { ...base, scale: 0.9, y: 12 }, visible: { ...visible, scale: 1 } }
    case 'fade':
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    default:
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  }
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.55,
  distance = 32,
  once = true,
  tightMargin = false,
  spring = false,
}: AnimatedSectionProps) {
  const variants = generateVariants(direction, distance)

  const transition = spring
    ? {
        type: 'spring' as const,
        stiffness: 120,
        damping: 20,
        delay,
      }
    : {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        margin: tightMargin ? '-40px' : '-60px',
      }}
      transition={transition}
      variants={variants}
      className={className}
      style={
        tightMargin
          ? {
              willChange: 'transform',
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  )
}
