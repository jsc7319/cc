import React, { useState } from 'react'
import { Plus, Search, ClipboardCheck, CheckCircle, AlertTriangle, Clock } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { inspecciones } from '../data/mockData'

const estadoOptions = ['Todos', 'Completada', 'En curso', 'Pendiente']

function ResultIcon({ resultado }) {
  if (resultado === 'OK') return <CheckCircle size={14} className="text-green-500" />
  if (resultado === 'Alerta') return <AlertTriangle size={14} className="text-yellow-500" />
  return <Clock size={14} className="text-gray-400" />
}

export default function Inspecciones() {
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('Todos')
  const [selected, setSelected] = useState(null)

  const filtered = inspecciones.filter(i => {
    const matchSearch = search === '' ||
      i.id.toLowerCase().includes(search.toLowerCase()) ||
      i.equipo.toLowerCase().includes(search.toLowerCase()) ||
      i.tecnico.toLowerCase().includes(search.toLowerCase())
    const matchEstado = estadoFilter === 'Todos' || i.estado === estadoFilter
    return matchSearch && matchEstado
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inspecciones</h1>
          <p className="text-sm text-gray-500 mt-0.5">Registro y seguimiento de inspecciones técnicas</p>
        </div>
        <Button icon={Plus}>Nueva inspección</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Completadas', value: inspecciones.filter(i => i.estado === 'Completada').length, color: 'text-green-600 bg-green-50' },
          { label: 'En curso', value: inspecciones.filter(i => i.estado === 'En curso').length, color: 'text-blue-600 bg-blue-50' },
          { label: 'Pendientes', value: inspecciones.filter(i => i.estado === 'Pendiente').length, color: 'text-yellow-600 bg-yellow-50' },
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
              placeholder="Buscar inspecciones..."
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

      {/* Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(ins => (
          <Card key={ins.id} className="hover:shadow-md cursor-pointer" onClick={() => setSelected(ins)}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <ClipboardCheck size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{ins.equipo}</p>
                  <p className="text-xs font-mono text-blue-600">{ins.id} · {ins.serial}</p>
                </div>
              </div>
              <Badge label={ins.estado} />
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs text-gray-500 mb-4">
              <div>
                <p className="text-gray-400 uppercase tracking-wide text-xs mb-0.5">Datacenter</p>
                <p className="font-medium text-gray-700">{ins.datacenter}</p>
              </div>
              <div>
                <p className="text-gray-400 uppercase tracking-wide text-xs mb-0.5">Técnico</p>
                <p className="font-medium text-gray-700">{ins.tecnico}</p>
              </div>
              <div>
                <p className="text-gray-400 uppercase tracking-wide text-xs mb-0.5">Fecha</p>
                <p className="font-medium text-gray-700">{ins.fecha}</p>
              </div>
            </div>

            {ins.items.length > 0 && (
              <div className="space-y-1.5 border-t border-gray-100 pt-4">
                {ins.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <ResultIcon resultado={item.resultado} />
                    <span className="text-gray-600 flex-1">{item.item}</span>
                    {item.observacion && (
                      <span className="text-gray-400 italic truncate max-w-24">{item.observacion}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {ins.items.length === 0 && (
              <div className="text-center py-3 text-xs text-gray-400 border-t border-gray-100 pt-4">
                Sin items registrados aún
              </div>
            )}
          </Card>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Detalle de inspección">
        {selected && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="font-semibold text-gray-900">{selected.equipo}</p>
              <p className="text-sm text-blue-600 mt-0.5">{selected.id} · {selected.serial}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Estado', <Badge key="e" label={selected.estado} />],
                ['Datacenter', selected.datacenter],
                ['Técnico', selected.tecnico],
                ['Fecha', selected.fecha],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-gray-700">{value}</p>
                </div>
              ))}
            </div>
            {selected.items.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Checklist</p>
                <div className="space-y-2">
                  {selected.items.map((item, idx) => (
                    <div key={idx} className={`flex items-start gap-3 p-3 rounded-xl ${item.resultado === 'OK' ? 'bg-green-50' : 'bg-yellow-50'}`}>
                      <ResultIcon resultado={item.resultado} />
                      <div>
                        <p className="text-sm font-medium text-gray-700">{item.item}</p>
                        {item.observacion && <p className="text-xs text-gray-500 mt-0.5">{item.observacion}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
