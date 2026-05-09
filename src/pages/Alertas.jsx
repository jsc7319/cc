import React, { useState } from 'react'
import { Bell, AlertTriangle, Shield, FolderKanban, Cpu, CheckCircle, Clock } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { alertas } from '../data/mockData'

const tipoIcons = {
  'Equipo sin movimiento': Cpu,
  'Póliza por vencer': Shield,
  'Póliza vencida': Shield,
  'Proyecto retrasado': FolderKanban,
  'Inspección pendiente': Clock,
}

const tipoColors = {
  'Equipo sin movimiento': 'bg-orange-50 text-orange-600 border-orange-100',
  'Póliza por vencer': 'bg-yellow-50 text-yellow-600 border-yellow-100',
  'Póliza vencida': 'bg-red-50 text-red-600 border-red-100',
  'Proyecto retrasado': 'bg-blue-50 text-blue-600 border-blue-100',
  'Inspección pendiente': 'bg-purple-50 text-purple-600 border-purple-100',
}

const tiposUnicos = ['Todos', ...new Set(alertas.map(a => a.tipo))]

export default function Alertas() {
  const [tipoFilter, setTipoFilter] = useState('Todos')
  const [prioridadFilter, setPrioridadFilter] = useState('Todos')

  const filtered = alertas.filter(a => {
    const matchTipo = tipoFilter === 'Todos' || a.tipo === tipoFilter
    const matchPrioridad = prioridadFilter === 'Todos' || a.prioridad === prioridadFilter
    return matchTipo && matchPrioridad
  })

  const altaCount = alertas.filter(a => a.prioridad === 'Alta').length
  const mediaCount = alertas.filter(a => a.prioridad === 'Media').length
  const bajaCount = alertas.filter(a => a.prioridad === 'Baja').length

  const handleResolve = (id) => {
    // In real app, would update state/backend
    alert(`Alerta ${id} marcada como resuelta`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alertas y Seguimiento</h1>
          <p className="text-sm text-gray-500 mt-0.5">{alertas.filter(a => a.estado === 'Pendiente').length} alertas pendientes de atención</p>
        </div>
        <Button icon={CheckCircle} variant="secondary">Marcar todas como leídas</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Alta prioridad', value: altaCount, color: 'text-red-600 bg-red-50', icon: AlertTriangle },
          { label: 'Media prioridad', value: mediaCount, color: 'text-yellow-600 bg-yellow-50', icon: Bell },
          { label: 'Baja prioridad', value: bajaCount, color: 'text-green-600 bg-green-50', icon: Bell },
        ].map(stat => (
          <div key={stat.label} className={`rounded-2xl px-5 py-4 ${stat.color} flex items-center gap-4`}>
            <stat.icon size={24} />
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Tipo:</span>
            <div className="flex gap-1.5">
              {tiposUnicos.map(tipo => (
                <button
                  key={tipo}
                  onClick={() => setTipoFilter(tipo)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    tipoFilter === tipo
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Prioridad:</span>
            <div className="flex gap-1.5">
              {['Todos', 'Alta', 'Media', 'Baja'].map(p => (
                <button
                  key={p}
                  onClick={() => setPrioridadFilter(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    prioridadFilter === p
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Alert cards */}
      <div className="space-y-3">
        {filtered.map(alerta => {
          const Icon = tipoIcons[alerta.tipo] || Bell
          const colorClass = tipoColors[alerta.tipo] || 'bg-gray-50 text-gray-600 border-gray-100'

          return (
            <div
              key={alerta.id}
              className={`flex items-start gap-4 p-4 rounded-2xl border ${
                alerta.prioridad === 'Alta'
                  ? 'bg-red-50 border-red-100'
                  : alerta.prioridad === 'Media'
                  ? 'bg-yellow-50 border-yellow-100'
                  : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl ${colorClass} flex items-center justify-center shrink-0 border`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{alerta.titulo}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{alerta.descripcion}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 bg-white rounded-lg border border-gray-200 text-gray-500">{alerta.tipo}</span>
                      <span className="text-xs text-gray-400">{alerta.fecha}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <Badge label={alerta.prioridad} />
                    <Badge label={alerta.estado} />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleResolve(alerta.id)}
                    className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-all"
                  >
                    Marcar como resuelto
                  </button>
                  <button className="text-xs px-3 py-1 bg-blue-600 rounded-lg text-white hover:bg-blue-700 font-medium transition-all">
                    Ver detalle
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} className="text-green-500" />
            </div>
            <p className="text-gray-500 font-medium">No hay alertas para los filtros seleccionados</p>
            <p className="text-sm text-gray-400 mt-1">Todo está bajo control</p>
          </div>
        </Card>
      )}
    </div>
  )
}
