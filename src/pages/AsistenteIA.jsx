import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react'
import Card from '../components/ui/Card'

const suggestions = [
  '¿Dónde está el equipo SRV-001?',
  '¿Qué técnicos están disponibles hoy?',
  '¿Cuántas pólizas están por vencer?',
  'Muéstrame los traslados pendientes',
  '¿Cuál es el estado de los proyectos activos?',
  'Genera un resumen de alertas',
]

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content: '¡Hola! Soy el Asistente IA de CELEC SOLUTIONS. Puedo ayudarte a consultar información sobre equipos, traslados, proyectos, pólizas y más. ¿En qué puedo ayudarte hoy?',
    time: '10:00',
  },
  {
    id: 2,
    role: 'user',
    content: '¿Dónde se encuentra actualmente el servidor SRV-001?',
    time: '10:02',
  },
  {
    id: 3,
    role: 'assistant',
    content: `El servidor **SRV-001** (Dell PowerEdge R740) está actualmente **en traslado**.\n\n📍 **Origen:** DC Quito Norte - Rack A-01\n🎯 **Destino:** DC Guayaquil - Rack B-02\n👤 **Responsable:** Carlos Mendoza\n📅 **Fecha de traslado:** 16 de enero 2024\n📊 **Estado:** En curso\n\n¿Necesitas más información sobre este equipo o traslado?`,
    time: '10:02',
  },
  {
    id: 4,
    role: 'user',
    content: '¿Cuántas pólizas están próximas a vencer?',
    time: '10:05',
  },
  {
    id: 5,
    role: 'assistant',
    content: `Encontré **2 pólizas críticas** que requieren atención inmediata:\n\n🔴 **Vencida (hace 77 días):**\n• SEG-2022-134 — Municipio de Quito / ACE Seguros\n• Monto: $75,000\n\n🟡 **Por vencer pronto:**\n• SEG-2023-089 — Corporación Favorita / Seguros Pichincha (5 días)\n• SEG-2023-045 — Petroecuador / Mapfre Ecuador (15 días)\n\nTe recomiendo contactar a las aseguradoras para renovar estas pólizas. ¿Deseas que genere un reporte detallado?`,
    time: '10:05',
  },
]

const autoResponses = [
  (q) => q.toLowerCase().includes('técnico') ? `Actualmente tenemos **4 técnicos disponibles**:\n\n✅ Carlos Mendoza — Servidores y Virtualización\n✅ Luis Vega — Redes LAN/WAN\n✅ Carmen Ruiz — Servidores y Storage\n✅ Jorge Mora — Cableado Estructurado\n\n3 técnicos están ocupados con asignaciones activas. ¿Quieres asignar un técnico a alguna tarea?` : null,
  (q) => q.toLowerCase().includes('alerta') ? `Hay **7 alertas activas** en el sistema:\n\n🔴 Alta prioridad (3): Pólizas vencidas y proyectos en riesgo\n🟡 Media prioridad (3): Equipos sin movimiento y pólizas por vencer\n🟢 Baja prioridad (1): Equipos sin inspección\n\nLa alerta más crítica es la póliza SEG-2022-134 que ya venció. ¿Te muestro el detalle?` : null,
  (q) => q.toLowerCase().includes('proyecto') ? `Tienes **4 proyectos activos** actualmente:\n\n📊 PRY-001 — Migración Cloud Banco Pichincha (65% avance)\n📊 PRY-002 — DC Secundario Petroecuador (15% avance)\n📊 PRY-003 — Red Core CNT Ecuador (80% — en riesgo de retraso)\n📊 PRY-006 — Renovación Hardware UCE (25% avance)\n\nEl proyecto PRY-003 requiere atención, pues la fecha límite es el 28 de febrero. ¿Deseas más detalles?` : null,
  (q) => q.toLowerCase().includes('traslado') ? `Actualmente hay **2 traslados pendientes** y **1 en curso**:\n\n🔵 En curso: TRL-001 — SRV-001 hacia DC Guayaquil\n🟡 Pendiente: TRL-002 — Switch Juniper EX4300 en DC Cuenca\n🟡 Pendiente: TRL-005 — Firewall Fortinet hacia DC Quito Sur\n\n¿Quieres iniciar un nuevo traslado o actualizar el estado de alguno?` : null,
  () => `Entiendo tu consulta. Basándome en los datos del sistema, puedo ofrecerte información detallada sobre equipos, traslados, proyectos, pólizas, inspecciones y alertas. ¿Podrías ser más específico sobre qué información necesitas?`,
]

function MessageBubble({ message }) {
  const isAssistant = message.role === 'assistant'

  const formatContent = (content) => {
    return content.split('\n').map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      return <p key={i} className={i > 0 ? 'mt-1' : ''} dangerouslySetInnerHTML={{ __html: bold }} />
    })
  }

  return (
    <div className={`flex items-start gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
        isAssistant ? 'bg-blue-600' : 'bg-gray-200'
      }`}>
        {isAssistant ? <Bot size={16} className="text-white" /> : <User size={16} className="text-gray-600" />}
      </div>
      <div className={`max-w-[75%] ${isAssistant ? '' : 'items-end flex flex-col'}`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isAssistant
            ? 'bg-white border border-gray-200 text-gray-700 shadow-sm'
            : 'bg-blue-600 text-white'
        }`}>
          {formatContent(message.content)}
        </div>
        <p className="text-xs text-gray-400 mt-1 px-1">{message.time}</p>
      </div>
    </div>
  )
}

export default function AsistenteIA() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text) => {
    const query = text || input.trim()
    if (!query) return

    const now = new Date()
    const time = now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })

    const userMsg = { id: Date.now(), role: 'user', content: query, time }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      let response = null
      for (const fn of autoResponses) {
        response = fn(query)
        if (response) break
      }

      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response || autoResponses[autoResponses.length - 1](),
        time: new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, assistantMsg])
      setLoading(false)
    }, 1200)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full space-y-4" style={{ height: 'calc(100vh - 120px)' }}>
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles size={22} className="text-blue-600" />
            Asistente IA
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Consulta información del sistema con lenguaje natural</p>
        </div>
        <button
          onClick={() => setMessages(initialMessages)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
        >
          <RefreshCw size={14} />
          Nueva sesión
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="px-6 py-3 border-t border-gray-100 flex gap-2 overflow-x-auto">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="px-3 py-1.5 text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-all whitespace-nowrap shrink-0"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pregunta sobre equipos, traslados, pólizas..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-gray-700 resize-none outline-none placeholder-gray-400"
              style={{ maxHeight: '120px' }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Presiona Enter para enviar · Shift+Enter para nueva línea
          </p>
        </div>
      </div>
    </div>
  )
}
