import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Settings,
  Cpu,
  Truck,
  FolderKanban,
  ClipboardCheck,
  Users,
  Shield,
  Bell,
  BarChart3,
  Bot,
  History,
  Database,
  Building2,
  UserSquare2,
  ActivitySquare,
  ListChecks,
  Zap,
} from 'lucide-react'

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
    isActive
      ? 'bg-blue-50 text-blue-600'
      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
  }`

function SectionGroup({ label, icon: Icon, children, defaultOpen = false }) {
  const location = useLocation()
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-all duration-150"
      >
        <span className="flex items-center gap-2.5">
          <Icon size={16} className="text-gray-400" />
          {label}
        </span>
        {open ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
      </button>
      {open && (
        <div className="mt-1 ml-4 pl-3 border-l border-gray-100 space-y-0.5">
          {children}
        </div>
      )}
    </div>
  )
}

export default function Sidebar({ open }) {
  if (!open) return null

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <div>
          <span className="text-sm font-bold text-gray-900 tracking-tight">CELEC</span>
          <span className="text-sm font-bold text-blue-600 tracking-tight"> SOLUTIONS</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {/* Dashboard */}
        <NavLink to="/dashboard" className={navLinkClass}>
          <LayoutDashboard size={16} />
          Dashboard
        </NavLink>

        {/* Parámetros */}
        <SectionGroup label="Parámetros" icon={Settings}>
          <NavLink to="/parametros/actividades" className={navLinkClass}>
            <ActivitySquare size={14} />
            Actividades por tipo
          </NavLink>
          <NavLink to="/parametros/aseguradoras" className={navLinkClass}>
            <Shield size={14} />
            Aseguradoras
          </NavLink>
          <NavLink to="/parametros/clientes" className={navLinkClass}>
            <UserSquare2 size={14} />
            Clientes
          </NavLink>
          <NavLink to="/parametros/datacenters" className={navLinkClass}>
            <Database size={14} />
            Datacenters
          </NavLink>
          <NavLink to="/parametros/datos-parametricos" className={navLinkClass}>
            <ListChecks size={14} />
            Datos paramétricos
          </NavLink>
        </SectionGroup>

        {/* Procesos */}
        <SectionGroup label="Procesos" icon={Cpu} defaultOpen={true}>
          <NavLink to="/proyectos" className={navLinkClass}>
            <FolderKanban size={14} />
            Gestión de Proyectos
          </NavLink>
          <NavLink to="/inspecciones" className={navLinkClass}>
            <ClipboardCheck size={14} />
            Realizar Inspección
          </NavLink>
          <NavLink to="/polizas" className={navLinkClass}>
            <Shield size={14} />
            Gestión de Pólizas
          </NavLink>
          <NavLink to="/traslados" className={navLinkClass}>
            <Truck size={14} />
            Gestión de Traslados
          </NavLink>
          <NavLink to="/trazabilidad" className={navLinkClass}>
            <Cpu size={14} />
            Trazabilidad de Equipos
          </NavLink>
          <NavLink to="/alertas" className={navLinkClass}>
            <Bell size={14} />
            Alertas y Seguimiento
          </NavLink>
          <NavLink to="/reportes" className={navLinkClass}>
            <BarChart3 size={14} />
            Reportes
          </NavLink>
        </SectionGroup>

        <div className="border-t border-gray-100 my-2" />

        <NavLink to="/tecnicos" className={navLinkClass}>
          <Users size={16} />
          Técnicos
        </NavLink>

        <NavLink to="/alertas" className={navLinkClass}>
          <Bell size={16} />
          Alertas
        </NavLink>

        <NavLink to="/asistente-ia" className={navLinkClass}>
          <Bot size={16} />
          Asistente IA
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-900 truncate">Admin CELEC</p>
            <p className="text-xs text-gray-400 truncate">admin@celec.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
