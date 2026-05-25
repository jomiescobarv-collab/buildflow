import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, HardHat } from 'lucide-react'
import { loginSchema, type LoginFormData } from '@/lib/validations'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { Button, Input } from '@/components/ui'

export function LoginPage() {
  const navigate = useNavigate()
  const { setUser, loadUserData } = useAuthStore()
  const addToast = useUIStore((s) => s.addToast)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      if (error) {
        addToast({ type: 'error', message: error.message })
        return
      }
      if (authData.user) {
        setUser(authData.user)
        await loadUserData(authData.user.id)
        useAuthStore.setState({ isLoading: false, initialized: true })
        navigate('/dashboard')
      }
    } catch (err) {
      addToast({ type: 'error', message: 'Error de conexión. Intenta nuevamente.' })
      console.error('Login error:', err)
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
          <blockquote className="text-slate-300 text-2xl font-light leading-relaxed">
            "Gestiona cada obra desde el primer plano hasta la entrega final."
          </blockquote>
          <p className="text-slate-500 mt-4 text-sm">Plataforma de gestión para constructoras comerciales</p>
        </div>
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-1 rounded-full bg-slate-800 flex-1">
              <div className={`h-full rounded-full bg-brand-600 ${i === 0 ? 'w-full' : 'w-0'}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-slate-950">
        <div className="w-full max-w-sm">
          {/* Logo móvil */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center">
              <HardHat className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white text-lg">BuildFlow</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Iniciar sesión</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Bienvenido de vuelta</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              placeholder="••••••••"
              autoComplete="current-password"
              startIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register('password')}
            />
            <Button type="submit" fullWidth loading={isSubmitting} size="lg" className="mt-2">
              Iniciar sesión
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
              Registra tu empresa
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
