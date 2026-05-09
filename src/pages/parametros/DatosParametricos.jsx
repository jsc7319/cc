import React, { useState } from 'react'
import { Plus, Edit2, Trash2, ListChecks } from 'lucide-react'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { datosParametricos } from '../../data/mockData'

const sections = [
  { key: 'tiposEquipo', label: 'Tipos de equipo', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { key: 'estadosEquipo', label: 'Estados de equipo', color: 'bg-green-50 text-green-700 border-green-100' },
  { key: 'prioridades', label: 'Prioridades', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
  { key: 'estadosProyecto', label: 'Estados de proyecto', color: 'bg-purple-50 text-purple-700 border-purple-100' },
  { key: 'tiposPoliza', label: 'Tipos de póliza', color: 'bg-orange-50 text-orange-700 border-orange-100' },
  { key: 'ciudades', label: 'Ciudades', color: 'bg-teal-50 text-teal-700 border-teal-100' },
  { key: 'especialidades', label: 'Especialidades técnicas', color: 'bg-pink-50 text-pink-700 border-pink-100' },
]

export default function DatosParametricos() {
  const [data, setData] = useState(datosParametricos)
  const [editingSection, setEditingSection] = useState(null)
  const [newValue, setNewValue] = useState('')

  const handleAdd = (key) => {
    if (!newValue.trim()) return
    setData(prev => ({
      ...prev,
      [key]: [...prev[key], newValue.trim()]
    }))
    setNewValue('')
    setEditingSection(null)
  }

  const handleRemove = (key, index) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Datos paramétricos</h1>
          <p className="text-sm text-gray-500 mt-0.5">Listas de valores del sistema</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-xl">
          <ListChecks size={14} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-600">{sections.length} categorías</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {sections.map(section => (
          <Card key={section.key}>
            <CardHeader
              title={section.label}
              subtitle={`${data[section.key].length} valores`}
              action={
                <button
                  onClick={() => setEditingSection(editingSection === section.key ? null : section.key)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <Plus size={14} />
                </button>
              }
            />

            {editingSection === section.key && (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newValue}
                  onChange={e => setNewValue(e.target.value)}
                  placeholder="Nuevo valor..."
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={e => e.key === 'Enter' && handleAdd(section.key)}
                  autoFocus
                />
                <Button variant="primary" size="sm" onClick={() => handleAdd(section.key)}>Añadir</Button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {data[section.key].map((value, idx) => (
                <div
                  key={idx}
                  className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium border ${section.color}`}
                >
                  {value}
                  <button
                    onClick={() => handleRemove(section.key, idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600 ml-0.5"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center shrink-0">
            <ListChecks size={18} className="text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Sobre los datos paramétricos</p>
            <p className="text-sm text-gray-500 mt-1">
              Estos valores son utilizados en los formularios del sistema. Puedes añadir, editar o eliminar
              valores según las necesidades de CELEC SOLUTIONS. Los cambios se aplican inmediatamente en
              todos los módulos del sistema.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
