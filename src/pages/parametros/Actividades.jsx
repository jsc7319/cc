import React, { useState } from 'react'
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import Modal from '../../components/ui/Modal'
import { actividades } from '../../data/mockData'

export default function Actividades() {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = actividades.filter(a =>
    search === '' ||
    a.nombre.toLowerCase().includes(search.toLowerCase()) ||
    a.tipo.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'id', label: '#', render: (v) => <span className="text-gray-400 text-xs">{v}</span> },
    { key: 'nombre', label: 'Actividad', render: (v) => <span className="font-medium text-gray-800">{v}</span> },
    { key: 'tipo', label: 'Tipo', render: (v) => (
      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg">{v}</span>
    )},
    { key: 'duracion', label: 'Duración' },
    { key: 'frecuencia', label: 'Frecuencia' },
    { key: 'estado', label: 'Estado', render: (v) => <Badge label={v} /> },
    {
      key: 'id', label: 'Acciones',
      render: () => (
        <div className="flex gap-1">
          <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
            <Edit2 size={14} />
          </button>
          <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all">
            <Trash2 size={14} />
          </button>
        </div>
      )
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Actividades por tipo</h1>
          <p className="text-sm text-gray-500 mt-0.5">Catálogo de actividades técnicas</p>
        </div>
        <Button icon={Plus} onClick={() => setShowModal(true)}>Nueva actividad</Button>
      </div>

      <Card>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar actividades..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Card>

      <Card padding={false}>
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">{filtered.length} actividades registradas</h3>
        </div>
        <Table columns={columns} data={filtered} />
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nueva actividad">
        <div className="space-y-4">
          {[
            { label: 'Nombre de la actividad', type: 'text', placeholder: 'Ej: Inspección Visual' },
            { label: 'Tipo', type: 'select', options: ['Mantenimiento Preventivo', 'Mantenimiento Correctivo', 'Logística', 'Auditoría', 'Prueba'] },
            { label: 'Duración estimada', type: 'text', placeholder: 'Ej: 2 horas' },
            { label: 'Frecuencia', type: 'select', options: ['Mensual', 'Trimestral', 'Semestral', 'Anual', 'A demanda'] },
          ].map(field => (
            <div key={field.label}>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">{field.label}</label>
              {field.type === 'select' ? (
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {field.options.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="primary" className="flex-1">Guardar actividad</Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
