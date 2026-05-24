import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Building2, HardHat, FileText, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Inicio',    href: '/dashboard', icon: LayoutDashboard },
  { label: 'Proyectos', href: '/projects',  icon: Building2 },
  { label: 'Obras',     href: '/works',      icon: HardHat },
  { label: 'Reportes',  href: '/reports',    icon: FileText },
  { label: 'Equipo',    href: '/team',       icon: Users },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200 lg:hidden">
      <div className="flex">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              cn(
                'flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 text-xs font-medium transition-colors',
                isActive
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-slate-400 dark:text-slate-500'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn('h-5 w-5', isActive && 'text-brand-600 dark:text-brand-400')} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
