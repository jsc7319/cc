import React from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import {
  Cpu, Truck, Users, Shield, FolderKanban, Bell,
  ArrowRight, Clock, AlertTriangle, CheckCircle, Plus, Eye,
} from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { kpis, actividadReciente, chartDataMensual, alertas } from '../data/mockData'

const activityColors = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  red: 'bg-red-100 text-red-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  teal: 'bg-teal-100 text-teal-600',
}

const activityIcons = {
  traslado: Truck,
  inspeccion: CheckCircle,
  alerta: AlertTriangle,
  proyecto: FolderKanban,
  equipo: Cpu,
  poliza: Shield,
}

export default function Dashboard() {
  const pendingAlerts = alertas.filter(a => a.estado === 'Pendiente')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Resumen general de operaciones CELEC SOLUTIONS</p>
        </div>
        <Button icon={Plus} variant="primary">Nuevo registro</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Equipos activos" value={kpis.equiposActivos} icon={Cpu} color="blue" trendLabel="+2 este mes" trend="up" />
        <StatCard title="Traslados del mes" value={kpis.trasladosMes} icon={Truck} color="purple" trendLabel="6 completados" />
        <StatCard title="Técnicos disponibles" value={kpis.tecnicosDisponibles} icon={Users} color="green" trendLabel="de 8 totales" />
        <StatCard title="Pólizas vencidas" value={kpis.polizasVencidas} icon={Shield} color="red" trendLabel="Requiere atención" trend="down" />
        <StatCard title="Proyectos activos" value={kpis.proyectosActivos} icon={FolderKanban} color="orange" trendLabel="1 en riesgo" />
        <StatCard title="Alertas pendientes" value={kpis.alertasPendientes} icon={Bell} color="yellow" trendLabel="Revisar hoy" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader
              title="Actividad mensual"
              subtitle="Traslados, inspecciones y proyectos por mes"
              action={<Button variant="ghost" size="sm">Ver reporte</Button>}
            />
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chartDataMensual} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)', fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
                <Line type="monotone" dataKey="traslados" stroke="#2563EB" strokeWidth={2.5} dot={{ fill: '#2563EB', r: 3 }} name="Traslados" />
                <Line type="monotone" dataKey="inspecciones" stroke="#60A5FA" strokeWidth={2.5} dot={{ fill: '#60A5FA', r: 3 }} name="Inspecciones" />
                <Line type="monotone" dataKey="proyectos" stroke="#1D4ED8" strokeWidth={2.5} dot={{ fill: '#1D4ED8', r: 3 }} name="Proyectos" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Alerts panel */}
        <div>
          <Card>
            <CardHeader
              title="Alertas activas"
              subtitle={`${pendingAlerts.length} pendientes`}
              action={<Button variant="ghost" size="sm" icon={ArrowRight}>Ver todas</Button>}
            />
            <div className="space-y-3">
              {pendingAlerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                    alert.prioridad === 'Alta' ? 'bg-red-500' : alert.prioridad === 'Media' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-700 truncate">{alert.titulo}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{alert.tipo}</p>
                  </div>
                  <Badge label={alert.prioridad} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Activity feed */}
        <Card>
          <CardHeader title="Actividad reciente" subtitle="Últimas acciones del equipo" />
          <div className="space-y-4">
            {actividadReciente.map((item) => {
              const Icon = activityIcons[item.tipo] || Clock
              const colorClass = activityColors[item.color] || activityColors.blue
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl ${colorClass} flex items-center justify-center shrink-0`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{item.descripcion}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.usuario} · {item.hora}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader title="Acciones rápidas" subtitle="Atajos a las funciones más usadas" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Nuevo traslado', icon: Truck, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
              { label: 'Nueva inspección', icon: CheckCircle, color: 'bg-green-50 text-green-600 hover:bg-green-100' },
              { label: 'Registrar equipo', icon: Cpu, color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
              { label: 'Nuevo proyecto', icon: FolderKanban, color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
              { label: 'Ver alertas', icon: Bell, color: 'bg-red-50 text-red-600 hover:bg-red-100' },
              { label: 'Gestionar pólizas', icon: Shield, color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' },
            ].map((action) => (
              <button
                key={action.label}
                className={`flex items-center gap-3 p-4 rounded-xl ${action.color} transition-all duration-150 text-left`}
              >
                <action.icon size={18} />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
