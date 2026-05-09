import React, { useState } from 'react'
import { Plus, Search, Truck, Eye, Edit2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Table from '../components/ui/Table'
import Modal from '../components/ui/Modal'
import { traslados } from '../data/mockData'

const estadoOptions = ['Todos', 'En curso', 'Pendiente', 'Completado']

export default function Traslados() {
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('Todos')
  const [selected, setSelected] = useState(null)

  const filtered = traslados.filter(t => {
    const matchSearch = search === '' ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.equipo.toLowerCase().includes(search.toLowerCase()) ||
      t.responsable.toLowerCase().includes(search.toLowerCase())
    const matchEstado = estadoFilter === 'Todos' || t.estado === estadoFilter
    return matchSearch && matchEstado
  })

  const columns = [
    { key: 'id', label: 'ID', render: (v) => <span className="font-mono text-xs font-semibold text-blue-600">{v}</span> },
    { key: 'equipo', label: 'Equipo', render: (v, row) => (
      <div>
        <p className="font-medium text-gray-800">{v}</p>
        <p className="text-xs text-gray-400 font-mono">{row.serial}</p>
      </div>
    )},
    { key: 'origen', label: 'Origen', render: (v) => <span className="text-xs text-gray-600">{v}</span> },
    { key: 'destino', label: 'Destino', render: (v) => <span className="text-xs text-gray-600">{v}</span> },
    { key: 'responsable', label: 'Responsable' },
    { key: 'fecha', label: 'Fecha', render: (v) => <span className="text-xs text-gray-400">{v}</span> },
    { key: 'prioridad', label: 'Prioridad', render: (v) => <Badge label={v} /> },
    { key: 'estado', label: 'Estado', render: (v) => <Badge label={v} /> },
    {
      key: 'id', label: 'Acciones',
      render: (_, row) => (
        <div className="flex gap-1">
          <button onClick={() => setSelected(row)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
            <Eye size={14} />
          </button>
          <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
            <Edit2 size={14} />
          </button>
        </div>
      )
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Traslados</h1>
          <p className="text-sm text-gray-500 mt-0.5">Control de movimiento de equipos entre ubicaciones</p>
        </div>
        <Button icon={Plus}>Nuevo traslado</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'En curso', value: traslados.filter(t => t.estado === 'En curso').length, color: 'text-blue-600 bg-blue-50' },
          { label: 'Pendientes', value: traslados.filter(t => t.estado === 'Pendiente').length, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Completados', value: traslados.filter(t => t.estado === 'Completado').length, color: 'text-green-600 bg-green-50' },
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
              placeholder="Buscar por ID, equipo o responsable..."
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

      <Card padding={false}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Registro de traslados</h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Truck size={13} />
            {filtered.length} traslados
          </div>
        </div>
        <Table columns={columns} data={filtered} />
      </Card>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Detalle del traslado">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Truck size={18} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selected.equipo}</p>
                <p className="text-sm font-mono text-blue-600">{selected.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Estado', <Badge key="e" label={selected.estado} />],
                ['Prioridad', <Badge key="p" label={selected.prioridad} />],
                ['Origen', selected.origen],
                ['Destino', selected.destino],
                ['Responsable', selected.responsable],
                ['Fecha', selected.fecha],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-gray-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
