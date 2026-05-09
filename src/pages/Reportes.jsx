import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts'
import { BarChart3, Download, Calendar, TrendingUp } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { chartDataMensual, chartDataEquipos, proyectos, tecnicos } from '../data/mockData'

const COLORS = ['#2563EB', '#60A5FA', '#1D4ED8', '#93C5FD', '#BFDBFE']

const reportTypes = [
  { label: 'Reporte de traslados', description: 'Movimientos de equipos por período', icon: '🚛' },
  { label: 'Reporte de inspecciones', description: 'Checklist y resultados de inspecciones', icon: '📋' },
  { label: 'Reporte de pólizas', description: 'Estado y vencimientos de pólizas', icon: '🛡️' },
  { label: 'Reporte de proyectos', description: 'Avance y estado de proyectos', icon: '📁' },
  { label: 'Reporte de inventario', description: 'Inventario completo de equipos', icon: '💻' },
  { label: 'Reporte de técnicos', description: 'Actividad y asignaciones del equipo', icon: '👷' },
]

export default function Reportes() {
  const proyectosByEstado = [
    { name: 'En progreso', value: proyectos.filter(p => p.estado === 'En progreso').length },
    { name: 'Completado', value: proyectos.filter(p => p.estado === 'Completado').length },
    { name: 'Planificación', value: proyectos.filter(p => p.estado === 'Planificación').length },
    { name: 'Pausado', value: proyectos.filter(p => p.estado === 'Pausado').length },
  ]

  const tecnicosByEstado = [
    { name: 'Disponible', value: tecnicos.filter(t => t.estado === 'Disponible').length },
    { name: 'Ocupado', value: tecnicos.filter(t => t.estado === 'Ocupado').length },
    { name: 'Inactivo', value: tecnicos.filter(t => t.estado === 'Inactivo').length },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
          <p className="text-sm text-gray-500 mt-0.5">Análisis y reportes del sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Calendar}>Período</Button>
          <Button icon={Download}>Exportar</Button>
        </div>
      </div>

      {/* Quick report cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {reportTypes.map(r => (
          <button
            key={r.label}
            className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200 text-left group"
          >
            <span className="text-2xl">{r.icon}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600">{r.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{r.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Actividad mensual" subtitle="Traslados, inspecciones y proyectos" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartDataMensual} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="traslados" fill="#2563EB" radius={[4, 4, 0, 0]} name="Traslados" />
              <Bar dataKey="inspecciones" fill="#60A5FA" radius={[4, 4, 0, 0]} name="Inspecciones" />
              <Bar dataKey="proyectos" fill="#1D4ED8" radius={[4, 4, 0, 0]} name="Proyectos" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Proyectos por estado" subtitle="Distribución actual" />
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={proyectosByEstado}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {proyectosByEstado.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {proyectosByEstado.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-xs text-gray-600">{item.name}</span>
                  <span className="text-xs font-semibold text-gray-900 ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Equipos por categoría" subtitle="Distribución del inventario" />
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={chartDataEquipos}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="cantidad"
                  nameKey="categoria"
                >
                  {chartDataEquipos.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {chartDataEquipos.map((item, idx) => (
                <div key={item.categoria} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-xs text-gray-600">{item.categoria}</span>
                  <span className="text-xs font-semibold text-gray-900 ml-auto">{item.cantidad}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Estado del equipo técnico" subtitle="Disponibilidad actual" />
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={tecnicosByEstado}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {tecnicosByEstado.map((_, idx) => (
                    <Cell key={idx} fill={['#10B981', '#F59E0B', '#9CA3AF'][idx]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {tecnicosByEstado.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ['#10B981', '#F59E0B', '#9CA3AF'][idx] }} />
                  <span className="text-xs text-gray-600">{item.name}</span>
                  <span className="text-xs font-semibold text-gray-900 ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* KPI Summary */}
      <Card>
        <CardHeader title="Resumen ejecutivo" subtitle="Métricas clave del período" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total equipos', value: '10', change: '+2', up: true },
            { label: 'Traslados completados', value: '3', change: '+1', up: true },
            { label: 'Proyectos entregados', value: '1', change: '0', up: null },
            { label: 'Alertas resueltas', value: '2', change: '-3', up: false },
          ].map(kpi => (
            <div key={kpi.label}>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{kpi.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
              <p className={`text-xs mt-0.5 font-medium ${kpi.up === true ? 'text-green-600' : kpi.up === false ? 'text-red-600' : 'text-gray-400'}`}>
                {kpi.change !== '0' && (kpi.up ? '↑' : '↓')} {kpi.change} vs mes anterior
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
