import { motion } from 'motion/react'

interface SectionTitleProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionTitle({ label, title, description, align = 'center', light = false }: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl mb-[var(--spacing-section-title-mb)] ${alignment}`}
    >
      {label && (
        <span className={`inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] uppercase mb-5 ${
          light ? 'text-accent-400' : 'text-accent-600'
        }`}>
          {!light && (
            <span className="w-8 h-px bg-gradient-to-r from-accent-500 to-accent-300" />
          )}
          <span className="relative">
            {label}
            <span className={`absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
              light ? 'bg-accent-400/50' : 'bg-accent-500/50'
            }`} />
          </span>
        </span>
      )}
      <h2 className={`text-2xl md:text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-tight mb-5 md:mb-6 ${
        light ? 'text-white' : 'text-primary-900'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`text-[17px] leading-[1.65] max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${
          light ? 'text-primary-400' : 'text-primary-500'
        }`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
