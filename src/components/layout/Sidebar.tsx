import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  HardHat,
  FileText,
  Users,
  Settings,
  LogOut,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

const NAV_ITEMS = [
  { label: 'Dashboard',  href: '/dashboard', icon: LayoutDashboard },
  { label: 'Proyectos',  href: '/projects',  icon: Building2 },
  { label: 'Obras',      href: '/works',      icon: HardHat },
  { label: 'Reportes',   href: '/reports',    icon: FileText },
  { label: 'Equipo',     href: '/team',       icon: Users },
]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const { tenant, profile, signOut } = useAuthStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
      isActive
        ? 'bg-brand-600 text-white shadow-sm'
        : 'text-slate-400 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-800'
    )

  return (
    <aside className="w-64 bg-slate-950 min-h-screen flex flex-col border-r border-slate-800">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <HardHat className="h-4 w-4 text-white" />
          </div>
          <span className="text-white font-semibold text-base tracking-tight">BuildFlow</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Tenant */}
      {tenant && (
        <div className="mx-3 mt-4 px-3 py-2.5 bg-slate-900 rounded-xl border border-slate-800">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Empresa</p>
          <p className="text-slate-200 font-semibold text-sm mt-0.5 truncate">{tenant.name}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <NavLink key={href} to={href} onClick={onClose} className={linkClass}>
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-slate-800 space-y-0.5">
        <NavLink to="/settings" onClick={onClose} className={linkClass}>
          <Settings className="h-4 w-4 shrink-0" />
          Configuración
        </NavLink>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Cerrar sesión
        </button>
      </div>

      {/* User */}
      {profile && (
        <div className="px-4 py-3 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
              {profile.full_name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate">{profile.full_name}</p>
              <p className="text-slate-500 text-xs capitalize">{profile.role}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
