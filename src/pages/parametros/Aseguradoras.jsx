import React, { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Mail, Phone } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import Modal from '../../components/ui/Modal'
import { aseguradoras } from '../../data/mockData'

export default function Aseguradoras() {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = aseguradoras.filter(a =>
    search === '' ||
    a.nombre.toLowerCase().includes(search.toLowerCase()) ||
    a.contacto.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'nombre', label: 'Aseguradora', render: (v) => <span className="font-semibold text-gray-800">{v}</span> },
    { key: 'ruc', label: 'RUC', render: (v) => <span className="font-mono text-xs text-gray-500">{v}</span> },
    { key: 'contacto', label: 'Contacto' },
    { key: 'telefono', label: 'Teléfono', render: (v) => (
      <span className="flex items-center gap-1 text-xs text-gray-500"><Phone size={11} />{v}</span>
    )},
    { key: 'email', label: 'Email', render: (v) => (
      <span className="flex items-center gap-1 text-xs text-gray-500"><Mail size={11} />{v}</span>
    )},
    { key: 'polizasActivas', label: 'Pólizas activas', render: (v) => (
      <span className="font-semibold text-blue-600">{v}</span>
    )},
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
          <h1 className="text-2xl font-bold text-gray-900">Aseguradoras</h1>
          <p className="text-sm text-gray-500 mt-0.5">Registro de compañías aseguradoras</p>
        </div>
        <Button icon={Plus} onClick={() => setShowModal(true)}>Nueva aseguradora</Button>
      </div>

      <Card>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar aseguradoras..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Card>

      <Card padding={false}>
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">{filtered.length} aseguradoras registradas</h3>
        </div>
        <Table columns={columns} data={filtered} />
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nueva aseguradora">
        <div className="space-y-4">
          {[
            { label: 'Nombre de la aseguradora', type: 'text', placeholder: 'Ej: Seguros Equinoccial' },
            { label: 'RUC', type: 'text', placeholder: '1791234567001' },
            { label: 'Persona de contacto', type: 'text', placeholder: 'Ej: Lic. Juan Pérez' },
            { label: 'Teléfono', type: 'tel', placeholder: '+593 2 111 2222' },
            { label: 'Email', type: 'email', placeholder: 'contacto@aseguradora.com' },
          ].map(field => (
            <div key={field.label}>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
