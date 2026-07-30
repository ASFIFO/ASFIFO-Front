import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

interface StatsCounterProps {
  value: number
  suffix?: string
  label: string
}

export function StatsCounter({ value, suffix = '', label }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight bg-gradient-to-b from-white to-white/80 bg-clip-text">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="relative inline-block">
        <div className="text-primary-400 text-sm font-medium group-hover:text-primary-300 transition-colors duration-300">{label}</div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-px bg-accent-500/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </div>
  )
}
