import { type ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'sm' | 'md' | 'lg'
  as?: 'div' | 'section' | 'article'
}

const sizeClasses: Record<string, string> = {
  default: 'max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8',
  lg: 'max-w-[64rem] mx-auto px-5 sm:px-6 lg:px-8',
  md: 'max-w-[56rem] mx-auto px-5 sm:px-6 lg:px-8',
  sm: 'max-w-[48rem] mx-auto px-5 sm:px-6 lg:px-8',
}

export function Container({
  children,
  className = '',
  size = 'default',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag className={`${sizeClasses[size]} ${className}`}>
      {children}
    </Tag>
  )
}
