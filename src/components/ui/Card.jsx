import React from 'react'

export default function Card({ children, className = '', padding = true }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${padding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
