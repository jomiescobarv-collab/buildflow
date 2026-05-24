-- ============================================================
-- BuildFlow — Migración inicial
-- Aplica en: Supabase SQL Editor o supabase db push
-- ============================================================

-- ============================================================
-- TENANTS (Empresas / organizaciones)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tenants (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  slug       TEXT        NOT NULL UNIQUE,
  plan       TEXT        NOT NULL DEFAULT 'free'
               CHECK (plan IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PROFILES (Usuarios — extiende auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id  UUID        NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  full_name  TEXT,
  role       TEXT        NOT NULL DEFAULT 'member'
               CHECK (role IN ('owner', 'admin', 'member')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS — tenants
-- ============================================================
-- Un usuario solo ve su propio tenant
CREATE POLICY "tenant_select_own"
  ON public.tenants FOR SELECT
  USING (
    id IN (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
  );

-- Solo el owner puede editar la empresa
CREATE POLICY "tenant_update_owner"
  ON public.tenants FOR UPDATE
  USING (
    id IN (
      SELECT tenant_id FROM public.profiles
      WHERE id = auth.uid() AND role = 'owner'
    )
  );

-- ============================================================
-- RLS — profiles
-- ============================================================
-- Un usuario ve todos los perfiles de su mismo tenant
CREATE POLICY "profile_select_same_tenant"
  ON public.profiles FOR SELECT
  USING (
    tenant_id IN (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
  );

-- Cada usuario solo puede editar su propio perfil
CREATE POLICY "profile_update_own"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid());

-- ============================================================
-- FUNCIÓN: crea tenant + profile automáticamente al registrarse
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_tenant_id UUID;
  v_company   TEXT;
  v_slug      TEXT;
BEGIN
  -- Nombre de empresa desde metadata o fallback al dominio del email
  v_company := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'company_name'), ''),
    split_part(NEW.email, '@', 2),
    'Mi Empresa'
  );

  -- Slug único: kebab-case + sufijo del UUID
  v_slug := lower(regexp_replace(v_company, '[^a-zA-Z0-9]+', '-', 'g'))
            || '-' || substring(NEW.id::text, 1, 8);

  INSERT INTO public.tenants (name, slug)
  VALUES (v_company, v_slug)
  RETURNING id INTO v_tenant_id;

  INSERT INTO public.profiles (id, tenant_id, full_name, role)
  VALUES (
    NEW.id,
    v_tenant_id,
    COALESCE(
      NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''),
      split_part(NEW.email, '@', 1)
    ),
    'owner'
  );

  RETURN NEW;
END;
$$;

-- Trigger en auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- FUNCIÓN auxiliar: actualiza updated_at automáticamente
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER tenants_set_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
