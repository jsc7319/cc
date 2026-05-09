import React, { useState } from 'react'
import { Plus, Search, Shield, AlertTriangle, Eye, Edit2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Table from '../components/ui/Table'
import Modal from '../components/ui/Modal'
import { polizas } from '../data/mockData'

const estadoOptions = ['Todos', 'Vigente', 'Por vencer', 'Vencida']

function DaysRemaining({ dias }) {
  if (dias < 0) return <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-lg">Vencida hace {Math.abs(dias)} días</span>
  if (dias <= 30) return <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-lg">{dias} días restantes</span>
  return <span className="text-xs text-gray-500">{dias} días restantes</span>
}

export default function Polizas() {
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('Todos')
  const [selected, setSelected] = useState(null)

  const filtered = polizas.filter(p => {
    const matchSearch = search === '' ||
      p.numero.toLowerCase().includes(search.toLowerCase()) ||
      p.aseguradora.toLowerCase().includes(search.toLowerCase()) ||
      p.cliente.toLowerCase().includes(search.toLowerCase())
    const matchEstado = estadoFilter === 'Todos' || p.estado === estadoFilter
    return matchSearch && matchEstado
  })

  const columns = [
    { key: 'numero', label: 'Número', render: (v) => <span className="font-mono text-xs font-semibold text-blue-600">{v}</span> },
    { key: 'aseguradora', label: 'Aseguradora' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'tipo', label: 'Tipo', render: (v) => <span className="text-xs text-gray-500">{v}</span> },
    { key: 'fechaInicio', label: 'Inicio', render: (v) => <span className="text-xs text-gray-400">{v}</span> },
    { key: 'fechaVencimiento', label: 'Vencimiento', render: (v) => <span className="text-xs text-gray-400">{v}</span> },
    { key: 'monto', label: 'Monto', render: (v) => <span className="text-sm font-semibold text-gray-700">${v.toLocaleString()}</span> },
    { key: 'diasRestantes', label: 'Días restantes', render: (v) => <DaysRemaining dias={v} /> },
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

  const vencidas = polizas.filter(p => p.estado === 'Vencida')
  const porVencer = polizas.filter(p => p.estado === 'Por vencer')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Pólizas</h1>
          <p className="text-sm text-gray-500 mt-0.5">Control de pólizas de seguros de equipos</p>
        </div>
        <Button icon={Plus}>Nueva póliza</Button>
      </div>

      {/* Alerts for expiring */}
      {(vencidas.length > 0 || porVencer.length > 0) && (
        <div className="space-y-3">
          {vencidas.map(p => (
            <div key={p.id} className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
              <AlertTriangle size={18} className="text-red-500 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-700">Póliza vencida: {p.numero}</p>
                <p className="text-xs text-red-500">{p.cliente} · {p.aseguradora} — Venció hace {Math.abs(p.diasRestantes)} días</p>
              </div>
              <Button variant="danger" size="sm">Renovar</Button>
            </div>
          ))}
          {porVencer.map(p => (
            <div key={p.id} className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-100 rounded-2xl">
              <AlertTriangle size={18} className="text-yellow-500 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-yellow-700">Por vencer: {p.numero}</p>
                <p className="text-xs text-yellow-600">{p.cliente} · {p.aseguradora} — Vence en {p.diasRestantes} días</p>
              </div>
              <Button variant="outline" size="sm">Gestionar</Button>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Vigentes', value: polizas.filter(p => p.estado === 'Vigente').length, color: 'text-green-600 bg-green-50' },
          { label: 'Por vencer', value: porVencer.length, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Vencidas', value: vencidas.length, color: 'text-red-600 bg-red-50' },
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
              placeholder="Buscar por número, aseguradora o cliente..."
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
          <h3 className="text-sm font-semibold text-gray-900">Pólizas de seguros</h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Shield size={13} />
            {filtered.length} pólizas
          </div>
        </div>
        <Table columns={columns} data={filtered} />
      </Card>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Detalle de póliza">
        {selected && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="font-mono font-semibold text-blue-600">{selected.numero}</p>
              <p className="text-sm text-gray-700 mt-0.5">{selected.tipo}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Estado', <Badge key="e" label={selected.estado} />],
                ['Monto', `$${selected.monto.toLocaleString()}`],
                ['Aseguradora', selected.aseguradora],
                ['Cliente', selected.cliente],
                ['Fecha inicio', selected.fechaInicio],
                ['Vencimiento', selected.fechaVencimiento],
                ['Días restantes', <DaysRemaining key="d" dias={selected.diasRestantes} />],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-gray-700">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="primary" className="flex-1">Renovar póliza</Button>
              <Button variant="secondary">Descargar</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
