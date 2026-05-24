import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  onClick?: () => void
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export function Card({ children, className, padding = 'md', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white dark:bg-slate-900',
        'border border-slate-200 dark:border-slate-800',
        'rounded-xl shadow-sm',
        paddingClasses[padding],
        onClick && 'cursor-pointer hover:border-brand-300 dark:hover:border-brand-800 hover:shadow-md transition-all',
        className
      )}
    >
      {children}
    </div>
  )
}
