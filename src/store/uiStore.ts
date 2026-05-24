import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

type Theme = 'light' | 'dark'

interface UIState {
  theme: Theme
  toasts: Toast[]
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: getSystemTheme(),
      toasts: [],

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      setTheme: (theme) => set({ theme }),

      addToast: (toast) => {
        const id = Math.random().toString(36).slice(2)
        set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
        setTimeout(() => get().removeToast(id), 4500)
      },

      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: 'buildflow-ui',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)
