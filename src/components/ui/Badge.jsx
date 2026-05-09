import React from 'react'

const variants = {
  green: 'bg-green-50 text-green-700 border-green-100',
  yellow: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  red: 'bg-red-50 text-red-700 border-red-100',
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  gray: 'bg-gray-100 text-gray-600 border-gray-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-100',
  orange: 'bg-orange-50 text-orange-700 border-orange-100',
}

const statusMap = {
  'Activo': 'green',
  'Activa': 'green',
  'Disponible': 'green',
  'Completado': 'green',
  'Completada': 'green',
  'Vigente': 'green',
  'Operativo': 'green',
  'En progreso': 'blue',
  'En curso': 'blue',
  'En revisión': 'blue',
  'En traslado': 'yellow',
  'Pendiente': 'yellow',
  'Por vencer': 'yellow',
  'Ocupado': 'yellow',
  'Pausado': 'yellow',
  'Planificación': 'purple',
  'Inactivo': 'gray',
  'Inactiva': 'gray',
  'Cancelado': 'gray',
  'Alta': 'red',
  'Media': 'yellow',
  'Baja': 'green',
  'Vencida': 'red',
}

export default function Badge({ label, variant }) {
  const resolvedVariant = variant || statusMap[label] || 'gray'
  const classes = variants[resolvedVariant] || variants.gray

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${classes}`}>
      {label}
    </span>
  )
}
