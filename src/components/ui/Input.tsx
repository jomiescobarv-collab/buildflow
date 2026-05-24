import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, startIcon, endIcon, className, id, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              {startIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'block w-full rounded-lg border py-2.5 text-sm transition-colors',
              'bg-white dark:bg-slate-900',
              'text-slate-900 dark:text-slate-100',
              'placeholder:text-slate-400 dark:placeholder:text-slate-600',
              'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
              error
                ? 'border-red-400 focus:ring-red-400 dark:border-red-500'
                : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600',
              startIcon ? 'pl-10 pr-4' : 'px-4',
              endIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {endIcon && (
            <span className="absolute inset-y-0 right-3 flex items-center text-slate-400 dark:text-slate-500">
              {endIcon}
            </span>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-500">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
