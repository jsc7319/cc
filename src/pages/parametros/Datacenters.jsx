import React, { useState } from 'react'
import { Plus, Search, Edit2, Trash2, MapPin, Database } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import Modal from '../../components/ui/Modal'
import { datacenters } from '../../data/mockData'

function CapacityBar({ value }) {
  const num = parseInt(value)
  const color = num >= 85 ? 'bg-red-500' : num >= 70 ? 'bg-yellow-500' : 'bg-green-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: value }} />
      </div>
      <span className="text-xs font-medium text-gray-600 w-8">{value}</span>
    </div>
  )
}

export default function Datacenters() {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = datacenters.filter(d =>
    search === '' ||
    d.nombre.toLowerCase().includes(search.toLowerCase()) ||
    d.ciudad.toLowerCase().includes(search.toLowerCase()) ||
    d.codigo.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'codigo', label: 'Código', render: (v) => <span className="font-mono text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{v}</span> },
    { key: 'nombre', label: 'Datacenter', render: (v) => <span className="font-semibold text-gray-800">{v}</span> },
    { key: 'ciudad', label: 'Ciudad', render: (v) => (
      <span className="flex items-center gap-1 text-xs text-gray-600"><MapPin size={11} />{v}</span>
    )},
    { key: 'direccion', label: 'Dirección', render: (v) => <span className="text-xs text-gray-500 max-w-48 truncate block">{v}</span> },
    { key: 'racks', label: 'Racks', render: (v) => <span className="font-medium text-gray-700">{v}</span> },
    { key: 'equipos', label: 'Equipos', render: (v) => <span className="font-medium text-gray-700">{v}</span> },
    { key: 'capacidad', label: 'Capacidad', render: (v) => <CapacityBar value={v} /> },
    { key: 'administrador', label: 'Administrador' },
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
          <h1 className="text-2xl font-bold text-gray-900">Datacenters</h1>
          <p className="text-sm text-gray-500 mt-0.5">Registro de centros de datos</p>
        </div>
        <Button icon={Plus} onClick={() => setShowModal(true)}>Nuevo datacenter</Button>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {datacenters.map(dc => (
          <div key={dc.id} className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                <Database size={14} className="text-blue-600" />
              </div>
              <span className="text-xs font-mono font-bold text-blue-600">{dc.codigo}</span>
            </div>
            <p className="text-sm font-semibold text-gray-800">{dc.nombre}</p>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <MapPin size={10} />{dc.ciudad}
            </p>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Capacidad</span>
                <span className="font-medium">{dc.capacidad}</span>
              </div>
              <CapacityBar value={dc.capacidad} />
            </div>
            <div className="mt-2 flex gap-3 text-xs text-gray-400">
              <span>{dc.racks} racks</span>
              <span>·</span>
              <span>{dc.equipos} equipos</span>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar datacenters..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Card>

      <Card padding={false}>
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">{filtered.length} datacenters</h3>
        </div>
        <Table columns={columns} data={filtered} />
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nuevo datacenter">
        <div className="space-y-4">
          {[
            { label: 'Nombre', type: 'text', placeholder: 'Ej: DC Quito Centro' },
            { label: 'Código', type: 'text', placeholder: 'Ej: DCQC' },
            { label: 'Ciudad', type: 'select', options: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Loja'] },
            { label: 'Dirección', type: 'text', placeholder: 'Av. Principal N01-234' },
            { label: 'Administrador', type: 'text', placeholder: 'Nombre del administrador' },
            { label: 'Total de racks', type: 'number', placeholder: '0' },
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
            <Button variant="primary" className="flex-1">Guardar</Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
