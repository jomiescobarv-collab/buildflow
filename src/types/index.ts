import type { ComponentType } from 'react'

export interface Tenant {
  id: string
  name: string
  slug: string
  plan: 'free' | 'pro' | 'enterprise'
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  tenant_id: string
  full_name: string | null
  role: 'owner' | 'admin' | 'member'
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface NavItem {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
  badge?: number
}
