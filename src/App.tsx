import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'

export default function App() {
  const theme = useUIStore((s) => s.theme)

  // Aplica la clase dark al <html> cuando cambia el tema
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  // Inicializa sesión de Supabase
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const { setUser, loadUserData, reset } = useAuthStore.getState()
        if (session?.user) {
          setUser(session.user)
          loadUserData(session.user.id).finally(() => {
            useAuthStore.setState({ isLoading: false, initialized: true })
          })
        } else {
          reset()
          useAuthStore.setState({ isLoading: false, initialized: true })
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  return <RouterProvider router={router} />
}
