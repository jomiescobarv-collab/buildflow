import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@supabase/supabase-js'
import type { Profile, Tenant } from '@/types'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  profile: Profile | null
  tenant: Tenant | null
  isLoading: boolean
  initialized: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: Profile | null) => void
  setTenant: (tenant: Tenant | null) => void
  loadUserData: (userId: string) => Promise<void>
  signOut: () => Promise<void>
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      tenant: null,
      isLoading: true,
      initialized: false,

      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setTenant: (tenant) => set({ tenant }),

      loadUserData: async (userId: string) => {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (profileError) {
          console.error('Error loading profile:', profileError)
          return
        }

        const { data: tenant, error: tenantError } = await supabase
          .from('tenants')
          .select('*')
          .eq('id', profile.tenant_id)
          .single()

        if (tenantError) {
          console.error('Error loading tenant:', tenantError)
          return
        }

        set({ profile, tenant })
      },

      signOut: async () => {
        await supabase.auth.signOut()
      },

      reset: () =>
        set({ user: null, profile: null, tenant: null, isLoading: false }),
    }),
    {
      name: 'buildflow-auth',
      // Solo persistir datos del usuario, nunca el estado de carga
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        tenant: state.tenant,
      }),
    }
  )
)
