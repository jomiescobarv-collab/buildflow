import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute, PublicOnlyRoute } from './ProtectedRoute'
import { LoginPage }        from '@/modules/auth/pages/LoginPage'
import { RegisterPage }     from '@/modules/auth/pages/RegisterPage'
import { DashboardPage }    from '@/modules/dashboard/pages/DashboardPage'
import { CrmPage }          from '@/modules/crm/pages/CrmPage'
import { PresupuestosPage } from '@/modules/presupuestos/pages/PresupuestosPage'
import { ContratosPage }    from '@/modules/contratos/pages/ContratosPage'
import { MaterialesPage }   from '@/modules/materiales/pages/MaterialesPage'
import { FinanzasPage }     from '@/modules/finanzas/pages/FinanzasPage'

const Placeholder = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
    Módulo <strong className="ml-1 text-gray-600">{label}</strong> — próximamente
  </div>
)

export const router = createBrowserRouter([
  // Rutas públicas (redirigen al dashboard si ya hay sesión)
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: '/login',    element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  // Rutas protegidas
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true,             element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard',      element: <DashboardPage /> },

          // VENTAS
          { path: '/crm',            element: <CrmPage /> },
          { path: '/presupuestos',   element: <PresupuestosPage /> },
          { path: '/contratos',      element: <ContratosPage /> },

          // EJECUCIÓN
          { path: '/projects',       element: <Placeholder label="Proyectos" /> },
          { path: '/works',          element: <Placeholder label="Obras" /> },
          { path: '/materiales',     element: <MaterialesPage /> },

          // ADMINISTRACIÓN
          { path: '/reports',        element: <Placeholder label="Reportes" /> },
          { path: '/team',           element: <Placeholder label="Equipo" /> },
          { path: '/finanzas',       element: <FinanzasPage /> },
          { path: '/settings',       element: <Placeholder label="Configuración" /> },
        ],
      },
    ],
  },
])
