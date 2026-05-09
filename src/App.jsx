import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Trazabilidad from './pages/Trazabilidad'
import Traslados from './pages/Traslados'
import Proyectos from './pages/Proyectos'
import Inspecciones from './pages/Inspecciones'
import Tecnicos from './pages/Tecnicos'
import Polizas from './pages/Polizas'
import Alertas from './pages/Alertas'
import Reportes from './pages/Reportes'
import AsistenteIA from './pages/AsistenteIA'
import Actividades from './pages/parametros/Actividades'
import Aseguradoras from './pages/parametros/Aseguradoras'
import Clientes from './pages/parametros/Clientes'
import Datacenters from './pages/parametros/Datacenters'
import DatosParametricos from './pages/parametros/DatosParametricos'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="trazabilidad" element={<Trazabilidad />} />
        <Route path="traslados" element={<Traslados />} />
        <Route path="proyectos" element={<Proyectos />} />
        <Route path="inspecciones" element={<Inspecciones />} />
        <Route path="tecnicos" element={<Tecnicos />} />
        <Route path="polizas" element={<Polizas />} />
        <Route path="alertas" element={<Alertas />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="asistente-ia" element={<AsistenteIA />} />
        <Route path="parametros/actividades" element={<Actividades />} />
        <Route path="parametros/aseguradoras" element={<Aseguradoras />} />
        <Route path="parametros/clientes" element={<Clientes />} />
        <Route path="parametros/datacenters" element={<Datacenters />} />
        <Route path="parametros/datos-parametricos" element={<DatosParametricos />} />
      </Route>
    </Routes>
  )
}
