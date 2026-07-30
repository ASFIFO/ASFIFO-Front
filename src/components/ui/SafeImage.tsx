import { useState } from 'react'
import { motion } from 'motion/react'

interface SafeImageProps {
  src?: string
  alt: string
  className?: string
  fallback?: React.ReactNode
  overlay?: React.ReactNode
  objectFit?: 'cover' | 'contain'
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallback,
  overlay,
  objectFit = 'cover',
}: SafeImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const showFallback = !src || error

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {showFallback ? (
        fallback || (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200/80 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary-300/30">
              {alt.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?'}
            </span>
          </div>
        )
      ) : (
        <>
          {/* Loading skeleton */}
          {!loaded && (
            <motion.div
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-br from-primary-100/80 to-primary-200/60"
            />
          )}
          <motion.img
            src={src}
            alt={alt}
            crossOrigin="anonymous"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.05 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
              objectFit === 'cover' ? 'object-cover' : 'object-contain'
            }`}
            loading="lazy"
          />
        </>
      )}
      {overlay && <div className="absolute inset-0">{overlay}</div>}
    </div>
  )
}
