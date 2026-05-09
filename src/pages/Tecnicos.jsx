import React, { useState } from 'react'
import { Plus, Search, Users, Mail, Phone } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { tecnicos } from '../data/mockData'

const estadoOptions = ['Todos', 'Disponible', 'Ocupado', 'Inactivo']

export default function Tecnicos() {
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('Todos')

  const filtered = tecnicos.filter(t => {
    const matchSearch = search === '' ||
      t.nombre.toLowerCase().includes(search.toLowerCase()) ||
      t.especialidad.toLowerCase().includes(search.toLowerCase())
    const matchEstado = estadoFilter === 'Todos' || t.estado === estadoFilter
    return matchSearch && matchEstado
  })

  const avatarColor = (nombre) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-rose-500']
    const idx = nombre.charCodeAt(0) % colors.length
    return colors[idx]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Técnicos</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gestión del equipo técnico</p>
        </div>
        <Button icon={Plus}>Nuevo técnico</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Disponibles', value: tecnicos.filter(t => t.estado === 'Disponible').length, color: 'text-green-600 bg-green-50' },
          { label: 'Ocupados', value: tecnicos.filter(t => t.estado === 'Ocupado').length, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Inactivos', value: tecnicos.filter(t => t.estado === 'Inactivo').length, color: 'text-gray-600 bg-gray-100' },
        ].map(stat => (
          <div key={stat.label} className={`rounded-2xl px-5 py-4 ${stat.color}`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nombre o especialidad..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={estadoFilter}
            onChange={e => setEstadoFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {estadoOptions.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </Card>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(tec => (
          <Card key={tec.id} className="hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl ${avatarColor(tec.nombre)} flex items-center justify-center text-white font-semibold text-lg shrink-0`}>
                {tec.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{tec.nombre}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{tec.especialidad}</p>
                  </div>
                  <Badge label={tec.estado} />
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail size={12} className="text-gray-300" />
                {tec.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone size={12} className="text-gray-300" />
                {tec.telefono}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {tec.certificaciones.map(cert => (
                <span key={cert} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg border border-blue-100">
                  {cert}
                </span>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <span className="font-semibold text-gray-900">{tec.asignaciones}</span> asignaciones activas
              </div>
              <Button variant="ghost" size="sm">Ver perfil</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
