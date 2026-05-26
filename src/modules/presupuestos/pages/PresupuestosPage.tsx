import { Calculator, Construction } from 'lucide-react'

export function PresupuestosPage() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
      <div className="p-4 bg-brand-50 dark:bg-brand-950 rounded-2xl">
        <Calculator className="h-8 w-8 text-brand-600 dark:text-brand-400" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Presupuestos</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5 justify-center">
          <Construction className="h-4 w-4" />
          Módulo en construcción
        </p>
      </div>
    </div>
  )
}
