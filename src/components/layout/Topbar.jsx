import React from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, Bell, Search, ChevronRight } from 'lucide-react'
import { alertas } from '../../data/mockData'

const routeLabels = {
  '/dashboard': ['Dashboard'],
  '/trazabilidad': ['Procesos', 'Trazabilidad de Equipos'],
  '/traslados': ['Procesos', 'Gestión de Traslados'],
  '/proyectos': ['Procesos', 'Gestión de Proyectos'],
  '/inspecciones': ['Procesos', 'Realizar Inspección'],
  '/tecnicos': ['Técnicos'],
  '/polizas': ['Procesos', 'Gestión de Pólizas'],
  '/alertas': ['Alertas y Seguimiento'],
  '/reportes': ['Procesos', 'Reportes'],
  '/asistente-ia': ['Asistente IA'],
  '/parametros/actividades': ['Parámetros', 'Actividades por tipo'],
  '/parametros/aseguradoras': ['Parámetros', 'Aseguradoras'],
  '/parametros/clientes': ['Parámetros', 'Clientes'],
  '/parametros/datacenters': ['Parámetros', 'Datacenters'],
  '/parametros/datos-parametricos': ['Parámetros', 'Datos paramétricos'],
}

export default function Topbar({ onToggleSidebar }) {
  const location = useLocation()
  const crumbs = routeLabels[location.pathname] || ['CELEC']
  const pendingAlerts = alertas.filter(a => a.estado === 'Pendiente').length

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-150"
        >
          <Menu size={18} />
        </button>
        <nav className="flex items-center gap-1.5 text-sm">
          {crumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight size={13} className="text-gray-300" />}
              <span className={idx === crumbs.length - 1 ? 'text-gray-900 font-semibold' : 'text-gray-400'}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 transition-all duration-200"
          />
        </div>

        <button className="relative p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-150">
          <Bell size={18} />
          {pendingAlerts > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              {pendingAlerts}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
