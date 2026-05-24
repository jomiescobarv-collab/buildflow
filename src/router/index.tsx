import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute, PublicOnlyRoute } from './ProtectedRoute'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { RegisterPage } from '@/modules/auth/pages/RegisterPage'
import { DashboardPage } from '@/modules/dashboard/pages/DashboardPage'

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
          { index: true,          element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard',   element: <DashboardPage /> },
          { path: '/projects',    element: <Placeholder label="Proyectos" /> },
          { path: '/works',       element: <Placeholder label="Obras" /> },
          { path: '/reports',     element: <Placeholder label="Reportes" /> },
          { path: '/team',        element: <Placeholder label="Equipo" /> },
          { path: '/settings',    element: <Placeholder label="Configuración" /> },
        ],
      },
    ],
  },
])
