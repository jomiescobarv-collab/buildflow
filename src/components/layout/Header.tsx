import { Menu, Bell, Sun, Moon } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { profile } = useAuthStore()
  const { theme, toggleTheme } = useUIStore()

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 lg:px-6 gap-3 shrink-0 transition-colors duration-200">
      {/* Hamburger móvil */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1" />

      {/* Toggle tema */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
        aria-label="Cambiar tema"
      >
        {theme === 'dark'
          ? <Sun className="h-4 w-4" />
          : <Moon className="h-4 w-4" />
        }
      </button>

      {/* Notificaciones */}
      <button className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors">
        <Bell className="h-4 w-4" />
      </button>

      {/* Avatar */}
      <div className="w-8 h-8 bg-brand-600 dark:bg-brand-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
        {profile?.full_name?.[0]?.toUpperCase() ?? '?'}
      </div>
    </header>
  )
}
