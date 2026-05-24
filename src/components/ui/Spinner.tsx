import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type SpinnerSize = 'sm' | 'md' | 'lg'

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
}

export function Spinner({ size = 'md', className }: { size?: SpinnerSize; className?: string }) {
  return (
    <Loader2
      className={cn('animate-spin text-brand-500 dark:text-brand-400', sizeClasses[size], className)}
    />
  )
}

export function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Cargando...</p>
      </div>
    </div>
  )
}
