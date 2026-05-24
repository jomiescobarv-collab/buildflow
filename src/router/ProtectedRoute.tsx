import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { PageSpinner } from '@/components/ui'

/** Rutas que requieren sesión activa */
export function ProtectedRoute() {
  const { user, isLoading, initialized } = useAuthStore()

  if (!initialized || isLoading) return <PageSpinner />
  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}

/** Rutas solo para usuarios no autenticados (login, registro) */
export function PublicOnlyRoute() {
  const { user, isLoading, initialized } = useAuthStore()

  if (!initialized || isLoading) return <PageSpinner />
  if (user) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
