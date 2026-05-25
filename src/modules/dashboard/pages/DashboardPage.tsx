import { Building2, HardHat, FileText, TrendingUp, CheckCircle2, Clock, Zap } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { Card, Badge } from '@/components/ui'

const STATS = [
  { label: 'Proyectos activos', value: '0', icon: Building2  },
  { label: 'Obras en curso',    value: '0', icon: HardHat    },
  { label: 'Reportes del mes',  value: '0', icon: FileText   },
  { label: 'Avance promedio',   value: '—', icon: TrendingUp },
]

const STEPS = [
  { label: 'Cuenta y empresa creadas', done: true  },
  { label: 'Crear tu primer proyecto', done: false },
  { label: 'Invitar a tu equipo',      done: false },
  { label: 'Registrar primera obra',   done: false },
]

export function DashboardPage() {
  const { profile, tenant } = useAuthStore()
  const firstName = profile?.full_name?.split(' ')[0] ?? 'usuario'
  const doneCount = STEPS.filter((s) => s.done).length

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Hello, {firstName}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">
          {tenant?.name} · Panel de control
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{value}</p>
              </div>
              <div className="p-2.5 rounded-xl shrink-0 bg-brand-50 dark:bg-brand-950">
                <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Primeros pasos */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Primeros pasos
          </h2>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {doneCount}/{STEPS.length} completados
          </span>
        </div>
        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mb-5">
          <div
            className="h-full bg-brand-600 dark:bg-brand-500 rounded-full transition-all"
            style={{ width: `${(doneCount / STEPS.length) * 100}%` }}
          />
        </div>
        <div className="space-y-3">
          {STEPS.map(({ label, done }) => (
            <div key={label} className="flex items-center gap-3">
              {done
                ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                : <Clock className="h-5 w-5 text-slate-300 dark:text-slate-700 shrink-0" />
              }
              <span className={`text-sm flex-1 ${done ? 'text-slate-400 dark:text-slate-600 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                {label}
              </span>
              {done && <Badge variant="success">Listo</Badge>}
            </div>
          ))}
        </div>
      </Card>

      {/* Banner plan */}
      <Card className="border-brand-200 dark:border-brand-900 bg-brand-50 dark:bg-brand-950/40">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-brand-100 dark:bg-brand-900 rounded-xl shrink-0">
            <Zap className="h-5 w-5 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-800 dark:text-brand-300">
              Plan gratuito activo
            </p>
            <p className="text-sm text-brand-600 dark:text-brand-400 mt-0.5">
              Actualiza a <strong>BuildFlow Pro</strong> para proyectos ilimitados, reportes PDF y soporte prioritario.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
