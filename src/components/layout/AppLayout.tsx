import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import { Header } from './Header'
import { ToastContainer } from '@/components/ui'

export function AppLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-200">
      {/* Sidebar desktop */}
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {/* Sidebar móvil overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Contenido */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8 overflow-auto">
          <Outlet />
        </main>
      </div>

      <BottomNav />
      <ToastContainer />
    </div>
  )
}
