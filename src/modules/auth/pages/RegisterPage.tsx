import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Building2, HardHat } from 'lucide-react'
import { registerSchema, type RegisterFormData } from '@/lib/validations'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { Button, Input } from '@/components/ui'

export function RegisterPage() {
  const navigate = useNavigate()
  const { setUser, loadUserData } = useAuthStore()
  const addToast = useUIStore((s) => s.addToast)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: RegisterFormData) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.full_name, company_name: data.company_name } },
    })
    if (error) { addToast({ type: 'error', message: error.message }); return }
    if (authData.user) {
      setUser(authData.user)
      await new Promise((r) => setTimeout(r, 1000))
      await loadUserData(authData.user.id)
      useAuthStore.setState({ isLoading: false, initialized: true })
      addToast({ type: 'success', message: '¡Empresa creada! Bienvenido a BuildFlow.' })
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-950 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
            <HardHat className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">BuildFlow</span>
        </div>
        <div>
          <h2 className="text-white text-3xl font-bold leading-snug">
            Tu obra, tu equipo,<br />tu plataforma.
          </h2>
          <p className="text-slate-400 mt-4 text-sm leading-relaxed max-w-xs">
            Centraliza proyectos, obras y reportes en un solo lugar. Empieza gratis, escala cuando lo necesites.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['Proyectos ilimitados*', 'Control de obras', 'Reportes PDF', 'Multi-usuario'].map((f) => (
            <div key={f} className="flex items-center gap-2 text-slate-400 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
              {f}
            </div>
          ))}
          <p className="col-span-2 text-slate-600 text-xs mt-1">* Plan gratuito: hasta 3 proyectos</p>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-slate-950 overflow-y-auto">
        <div className="w-full max-w-sm py-6">
          {/* Logo móvil */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center">
              <HardHat className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white text-lg">BuildFlow</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Crea tu cuenta</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Comienza a gestionar tus obras hoy
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nombre de la empresa"
              placeholder="Constructora Ejemplo S.A."
              autoComplete="organization"
              startIcon={<Building2 className="h-4 w-4" />}
              error={errors.company_name?.message}
              {...register('company_name')}
            />
            <Input
              label="Tu nombre completo"
              placeholder="Juan Pérez"
              autoComplete="name"
              startIcon={<User className="h-4 w-4" />}
              error={errors.full_name?.message}
              {...register('full_name')}
            />
            <Input
              label="Email"
              type="email"
              placeholder="tu@empresa.com"
              autoComplete="email"
              startIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              startIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register('password')}
            />
            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              startIcon={<Lock className="h-4 w-4" />}
              error={errors.confirm_password?.message}
              {...register('confirm_password')}
            />
            <Button type="submit" fullWidth loading={isSubmitting} size="lg" className="mt-2">
              Crear empresa gratis
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
