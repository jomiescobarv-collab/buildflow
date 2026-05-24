import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { useUIStore, type Toast } from '@/store/uiStore'
import { cn } from '@/lib/utils'

const config: Record<
  Toast['type'],
  { icon: typeof CheckCircle; wrapper: string; iconClass: string }
> = {
  success: {
    icon: CheckCircle,
    wrapper: 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-800',
    iconClass: 'text-emerald-500',
  },
  error: {
    icon: AlertCircle,
    wrapper: 'bg-white dark:bg-slate-900 border-red-200 dark:border-red-800',
    iconClass: 'text-red-500',
  },
  warning: {
    icon: AlertTriangle,
    wrapper: 'bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-800',
    iconClass: 'text-amber-500',
  },
  info: {
    icon: Info,
    wrapper: 'bg-white dark:bg-slate-900 border-brand-200 dark:border-brand-800',
    iconClass: 'text-brand-500 dark:text-brand-400',
  },
}

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const { icon: Icon, wrapper, iconClass } = config[toast.type]
        return (
          <div
            key={toast.id}
            className={cn(
              'flex items-start gap-3 p-4 rounded-xl border shadow-lg pointer-events-auto',
              wrapper
            )}
          >
            <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', iconClass)} />
            <p className="text-sm flex-1 font-medium text-slate-800 dark:text-slate-200">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
