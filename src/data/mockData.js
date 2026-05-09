// =====================
// EQUIPOS / TRAZABILIDAD
// =====================
export const equipos = [
  { id: 1, serial: 'SRV-001', nombre: 'Servidor Dell PowerEdge R740', estado: 'Activo', ubicacion: 'Rack A-01', datacenter: 'DC Quito Norte', rack: 'A-01', custodio: 'Carlos Mendoza', ultimaActualizacion: '2024-01-15', categoria: 'Servidor' },
  { id: 2, serial: 'SRV-002', nombre: 'Servidor HP ProLiant DL380', estado: 'En traslado', ubicacion: 'Tránsito', datacenter: 'DC Guayaquil', rack: '-', custodio: 'Ana Torres', ultimaActualizacion: '2024-01-14', categoria: 'Servidor' },
  { id: 3, serial: 'SWT-003', nombre: 'Switch Cisco Catalyst 9300', estado: 'Activo', ubicacion: 'Rack B-03', datacenter: 'DC Quito Norte', rack: 'B-03', custodio: 'Luis Vega', ultimaActualizacion: '2024-01-13', categoria: 'Red' },
  { id: 4, serial: 'UPS-004', nombre: 'UPS APC Smart-UPS 3000', estado: 'Activo', ubicacion: 'Rack C-05', datacenter: 'DC Cuenca', rack: 'C-05', custodio: 'María León', ultimaActualizacion: '2024-01-12', categoria: 'Energía' },
  { id: 5, serial: 'RTR-005', nombre: 'Router Cisco ASR 1001', estado: 'Inactivo', ubicacion: 'Almacén', datacenter: 'DC Quito Sur', rack: '-', custodio: 'Pedro Salas', ultimaActualizacion: '2024-01-10', categoria: 'Red' },
  { id: 6, serial: 'SRV-006', nombre: 'Servidor IBM Power9', estado: 'Activo', ubicacion: 'Rack D-02', datacenter: 'DC Guayaquil', rack: 'D-02', custodio: 'Carmen Ruiz', ultimaActualizacion: '2024-01-15', categoria: 'Servidor' },
  { id: 7, serial: 'FRW-007', nombre: 'Firewall Fortinet FG-500E', estado: 'Activo', ubicacion: 'Rack A-01', datacenter: 'DC Quito Norte', rack: 'A-01', custodio: 'Carlos Mendoza', ultimaActualizacion: '2024-01-14', categoria: 'Seguridad' },
  { id: 8, serial: 'SWT-008', nombre: 'Switch Juniper EX4300', estado: 'En traslado', ubicacion: 'Tránsito', datacenter: 'DC Cuenca', rack: '-', custodio: 'Jorge Mora', ultimaActualizacion: '2024-01-15', categoria: 'Red' },
  { id: 9, serial: 'SRV-009', nombre: 'Servidor Lenovo ThinkSystem SR650', estado: 'Activo', ubicacion: 'Rack E-04', datacenter: 'DC Quito Sur', rack: 'E-04', custodio: 'Diana Castro', ultimaActualizacion: '2024-01-11', categoria: 'Servidor' },
  { id: 10, serial: 'UPS-010', nombre: 'UPS Eaton 9PX 6000', estado: 'Activo', ubicacion: 'Rack F-01', datacenter: 'DC Guayaquil', rack: 'F-01', custodio: 'Roberto Díaz', ultimaActualizacion: '2024-01-13', categoria: 'Energía' },
];

// =====================
// TRASLADOS
// =====================
export const traslados = [
  { id: 'TRL-001', equipo: 'Servidor Dell PowerEdge R740', serial: 'SRV-001', origen: 'DC Quito Norte - Rack A-01', destino: 'DC Guayaquil - Rack B-02', responsable: 'Carlos Mendoza', fecha: '2024-01-16', estado: 'En curso', prioridad: 'Alta' },
  { id: 'TRL-002', equipo: 'Switch Juniper EX4300', serial: 'SWT-008', origen: 'DC Cuenca - Almacén', destino: 'DC Cuenca - Rack C-03', responsable: 'Jorge Mora', fecha: '2024-01-15', estado: 'Pendiente', prioridad: 'Media' },
  { id: 'TRL-003', equipo: 'UPS APC Smart-UPS 3000', serial: 'UPS-004', origen: 'DC Cuenca - Rack C-05', destino: 'Mantenimiento Externo', responsable: 'María León', fecha: '2024-01-14', estado: 'Completado', prioridad: 'Alta' },
  { id: 'TRL-004', equipo: 'Router Cisco ASR 1001', serial: 'RTR-005', origen: 'Almacén Quito', destino: 'DC Quito Sur - Rack E-02', responsable: 'Pedro Salas', fecha: '2024-01-13', estado: 'Completado', prioridad: 'Baja' },
  { id: 'TRL-005', equipo: 'Firewall Fortinet FG-500E', serial: 'FRW-007', origen: 'DC Quito Norte - Rack A-01', destino: 'DC Quito Sur - Rack A-02', responsable: 'Ana Torres', fecha: '2024-01-17', estado: 'Pendiente', prioridad: 'Alta' },
  { id: 'TRL-006', equipo: 'Servidor IBM Power9', serial: 'SRV-006', origen: 'DC Guayaquil - Rack D-02', destino: 'DC Guayaquil - Rack D-05', responsable: 'Carmen Ruiz', fecha: '2024-01-12', estado: 'Completado', prioridad: 'Media' },
];

// =====================
// PROYECTOS
// =====================
export const proyectos = [
  { id: 'PRY-001', proyecto: 'Migración Infraestructura Cloud', cliente: 'Banco Pichincha', estado: 'En progreso', prioridad: 'Alta', fechaInicio: '2024-01-01', fechaFin: '2024-03-31', responsable: 'Carlos Mendoza', avance: 65 },
  { id: 'PRY-002', proyecto: 'Implementación Centro de Datos Secundario', cliente: 'Petroecuador', estado: 'Planificación', prioridad: 'Alta', fechaInicio: '2024-02-01', fechaFin: '2024-06-30', responsable: 'Ana Torres', avance: 15 },
  { id: 'PRY-003', proyecto: 'Actualización Red Core', cliente: 'CNT Ecuador', estado: 'En progreso', prioridad: 'Media', fechaInicio: '2023-11-01', fechaFin: '2024-02-28', responsable: 'Luis Vega', avance: 80 },
  { id: 'PRY-004', proyecto: 'Instalación Sistemas UPS', cliente: 'Corporación Favorita', estado: 'Completado', prioridad: 'Media', fechaInicio: '2023-09-01', fechaFin: '2023-12-31', responsable: 'María León', avance: 100 },
  { id: 'PRY-005', proyecto: 'Auditoría Seguridad Perimetral', cliente: 'Municipio de Quito', estado: 'Pausado', prioridad: 'Baja', fechaInicio: '2024-01-10', fechaFin: '2024-04-30', responsable: 'Pedro Salas', avance: 30 },
  { id: 'PRY-006', proyecto: 'Renovación Hardware Servidores', cliente: 'Universidad Central', estado: 'En progreso', prioridad: 'Media', fechaInicio: '2024-01-15', fechaFin: '2024-05-15', responsable: 'Carmen Ruiz', avance: 25 },
];

// =====================
// INSPECCIONES
// =====================
export const inspecciones = [
  { id: 'INS-001', equipo: 'Servidor Dell PowerEdge R740', serial: 'SRV-001', datacenter: 'DC Quito Norte', tecnico: 'Carlos Mendoza', fecha: '2024-01-15', estado: 'Completada', items: [
    { item: 'Estado físico del servidor', resultado: 'OK', observacion: '' },
    { item: 'Temperatura operacional', resultado: 'OK', observacion: 'Normal en 68°C' },
    { item: 'Ventiladores funcionando', resultado: 'OK', observacion: '' },
    { item: 'Conexiones eléctricas', resultado: 'Alerta', observacion: 'Cable HDMI suelto' },
    { item: 'Estado de discos duros', resultado: 'OK', observacion: '' },
  ]},
  { id: 'INS-002', equipo: 'UPS APC Smart-UPS 3000', serial: 'UPS-004', datacenter: 'DC Cuenca', tecnico: 'María León', fecha: '2024-01-14', estado: 'Completada', items: [
    { item: 'Estado batería', resultado: 'Alerta', observacion: 'Batería al 60%' },
    { item: 'Indicadores LED', resultado: 'OK', observacion: '' },
    { item: 'Prueba bypass', resultado: 'OK', observacion: '' },
  ]},
  { id: 'INS-003', equipo: 'Switch Cisco Catalyst 9300', serial: 'SWT-003', datacenter: 'DC Quito Norte', tecnico: 'Luis Vega', fecha: '2024-01-16', estado: 'Pendiente', items: []},
  { id: 'INS-004', equipo: 'Firewall Fortinet FG-500E', serial: 'FRW-007', datacenter: 'DC Quito Norte', tecnico: 'Ana Torres', fecha: '2024-01-17', estado: 'En curso', items: [
    { item: 'Actualización firmware', resultado: 'OK', observacion: 'v7.2.4 instalada' },
    { item: 'Reglas de firewall', resultado: 'OK', observacion: '' },
  ]},
];

// =====================
// TÉCNICOS
// =====================
export const tecnicos = [
  { id: 1, nombre: 'Carlos Mendoza', especialidad: 'Servidores y Virtualización', estado: 'Disponible', asignaciones: 2, certificaciones: ['VMware VCP', 'RHCE'], telefono: '+593 99 123 4567', email: 'c.mendoza@celec.com' },
  { id: 2, nombre: 'Ana Torres', especialidad: 'Redes y Seguridad', estado: 'Ocupado', asignaciones: 4, certificaciones: ['CCNA', 'CCNP', 'CEH'], telefono: '+593 99 234 5678', email: 'a.torres@celec.com' },
  { id: 3, nombre: 'Luis Vega', especialidad: 'Redes LAN/WAN', estado: 'Disponible', asignaciones: 1, certificaciones: ['CCNA', 'Juniper JNCIA'], telefono: '+593 99 345 6789', email: 'l.vega@celec.com' },
  { id: 4, nombre: 'María León', especialidad: 'Energía y UPS', estado: 'Ocupado', asignaciones: 3, certificaciones: ['APC Certified', 'Eaton Certified'], telefono: '+593 99 456 7890', email: 'm.leon@celec.com' },
  { id: 5, nombre: 'Pedro Salas', especialidad: 'Infraestructura Física', estado: 'Inactivo', asignaciones: 0, certificaciones: ['CDCP'], telefono: '+593 99 567 8901', email: 'p.salas@celec.com' },
  { id: 6, nombre: 'Carmen Ruiz', especialidad: 'Servidores y Storage', estado: 'Disponible', asignaciones: 2, certificaciones: ['HPE ASE', 'Dell EMC'], telefono: '+593 99 678 9012', email: 'c.ruiz@celec.com' },
  { id: 7, nombre: 'Jorge Mora', especialidad: 'Cableado Estructurado', estado: 'Disponible', asignaciones: 1, certificaciones: ['BICSI RCDD'], telefono: '+593 99 789 0123', email: 'j.mora@celec.com' },
  { id: 8, nombre: 'Diana Castro', especialidad: 'Cloud y Virtualización', estado: 'Ocupado', asignaciones: 3, certificaciones: ['AWS SAA', 'Azure AZ-104'], telefono: '+593 99 890 1234', email: 'd.castro@celec.com' },
];

// =====================
// PÓLIZAS
// =====================
export const polizas = [
  { id: 'POL-001', numero: 'SEG-2024-001', aseguradora: 'Seguros Equinoccial', cliente: 'Banco Pichincha', tipo: 'Todo Riesgo Electrónico', fechaInicio: '2024-01-01', fechaVencimiento: '2024-12-31', monto: 150000, estado: 'Vigente', diasRestantes: 350 },
  { id: 'POL-002', numero: 'SEG-2023-045', aseguradora: 'Mapfre Ecuador', cliente: 'Petroecuador', tipo: 'Equipo Electrónico', fechaInicio: '2023-03-01', fechaVencimiento: '2024-02-29', monto: 85000, estado: 'Por vencer', diasRestantes: 15 },
  { id: 'POL-003', numero: 'SEG-2024-012', aseguradora: 'Chubb Seguros', cliente: 'CNT Ecuador', tipo: 'Responsabilidad Civil', fechaInicio: '2024-01-15', fechaVencimiento: '2025-01-14', monto: 200000, estado: 'Vigente', diasRestantes: 364 },
  { id: 'POL-004', numero: 'SEG-2023-089', aseguradora: 'Seguros Pichincha', cliente: 'Corporación Favorita', tipo: 'Todo Riesgo Electrónico', fechaInicio: '2023-07-01', fechaVencimiento: '2024-01-20', monto: 120000, estado: 'Por vencer', diasRestantes: 5 },
  { id: 'POL-005', numero: 'SEG-2022-134', aseguradora: 'ACE Seguros', cliente: 'Municipio de Quito', tipo: 'Equipo Electrónico', fechaInicio: '2022-11-01', fechaVencimiento: '2023-10-31', monto: 75000, estado: 'Vencida', diasRestantes: -77 },
  { id: 'POL-006', numero: 'SEG-2024-003', aseguradora: 'Seguros Equinoccial', cliente: 'Universidad Central', tipo: 'Todo Riesgo', fechaInicio: '2024-01-10', fechaVencimiento: '2025-01-09', monto: 95000, estado: 'Vigente', diasRestantes: 359 },
];

// =====================
// ALERTAS
// =====================
export const alertas = [
  { id: 1, tipo: 'Equipo sin movimiento', titulo: 'Router Cisco ASR 1001 sin actividad', descripcion: 'El equipo RTR-005 no registra actividad desde hace 45 días', prioridad: 'Media', fecha: '2024-01-15', estado: 'Pendiente' },
  { id: 2, tipo: 'Póliza por vencer', titulo: 'Póliza SEG-2023-089 vence en 5 días', descripcion: 'La póliza de Corporación Favorita vence el 20 de enero 2024', prioridad: 'Alta', fecha: '2024-01-15', estado: 'Pendiente' },
  { id: 3, tipo: 'Proyecto retrasado', titulo: 'Proyecto PRY-003 en riesgo de retraso', descripcion: 'Actualización Red Core al 80% con fecha límite 28/02/2024', prioridad: 'Alta', fecha: '2024-01-14', estado: 'En revisión' },
  { id: 4, tipo: 'Inspección pendiente', titulo: 'Inspección programada para Switch SWT-003', descripcion: 'La inspección INS-003 está pendiente desde el 16 de enero', prioridad: 'Media', fecha: '2024-01-16', estado: 'Pendiente' },
  { id: 5, tipo: 'Póliza vencida', titulo: 'Póliza SEG-2022-134 venció hace 77 días', descripcion: 'La póliza del Municipio de Quito está vencida. Requiere renovación urgente', prioridad: 'Alta', fecha: '2024-01-01', estado: 'Pendiente' },
  { id: 6, tipo: 'Póliza por vencer', titulo: 'Póliza SEG-2023-045 vence en 15 días', descripcion: 'La póliza de Petroecuador vence el 29 de febrero 2024', prioridad: 'Media', fecha: '2024-01-14', estado: 'Pendiente' },
  { id: 7, tipo: 'Equipo sin movimiento', titulo: 'UPS Eaton 9PX 6000 sin inspección', descripcion: 'El equipo UPS-010 no tiene inspección registrada en los últimos 60 días', prioridad: 'Baja', fecha: '2024-01-10', estado: 'Pendiente' },
];

// =====================
// CLIENTES
// =====================
export const clientes = [
  { id: 1, nombre: 'Banco Pichincha', ruc: '1790123456001', contacto: 'Ing. Roberto García', telefono: '+593 2 123 4567', email: 'rgarcia@pichincha.com', ciudad: 'Quito', estado: 'Activo' },
  { id: 2, nombre: 'Petroecuador', ruc: '1768012456001', contacto: 'Ing. Sandra López', telefono: '+593 2 234 5678', email: 'slopez@petroecuador.ec', ciudad: 'Quito', estado: 'Activo' },
  { id: 3, nombre: 'CNT Ecuador', ruc: '1792123456001', contacto: 'Lic. Mario Herrera', telefono: '+593 4 345 6789', email: 'mherrera@cnt.gob.ec', ciudad: 'Guayaquil', estado: 'Activo' },
  { id: 4, nombre: 'Corporación Favorita', ruc: '1790234567001', contacto: 'Ing. Patricia Mora', telefono: '+593 2 456 7890', email: 'pmora@favorita.com', ciudad: 'Quito', estado: 'Activo' },
  { id: 5, nombre: 'Municipio de Quito', ruc: '1760012456001', contacto: 'Arq. Luis Cabezas', telefono: '+593 2 567 8901', email: 'lcabezas@quito.gob.ec', ciudad: 'Quito', estado: 'Inactivo' },
  { id: 6, nombre: 'Universidad Central', ruc: '1760123456001', contacto: 'Dr. Ana Salinas', telefono: '+593 2 678 9012', email: 'asalinas@uce.edu.ec', ciudad: 'Quito', estado: 'Activo' },
];

// =====================
// DATACENTERS
// =====================
export const datacenters = [
  { id: 1, nombre: 'DC Quito Norte', codigo: 'DCQN', ciudad: 'Quito', direccion: 'Av. de los Shyris N36-188', racks: 24, equipos: 48, capacidad: '85%', estado: 'Operativo', administrador: 'Carlos Mendoza' },
  { id: 2, nombre: 'DC Quito Sur', codigo: 'DCQS', ciudad: 'Quito', direccion: 'Av. Maldonado S12-45', racks: 16, equipos: 32, capacidad: '60%', estado: 'Operativo', administrador: 'Pedro Salas' },
  { id: 3, nombre: 'DC Guayaquil', codigo: 'DCGYE', ciudad: 'Guayaquil', direccion: 'Av. Francisco de Orellana 234', racks: 30, equipos: 58, capacidad: '72%', estado: 'Operativo', administrador: 'Carmen Ruiz' },
  { id: 4, nombre: 'DC Cuenca', codigo: 'DCCUE', ciudad: 'Cuenca', direccion: 'Av. Huayna Cápac 145', racks: 12, equipos: 24, capacidad: '50%', estado: 'Operativo', administrador: 'María León' },
];

// =====================
// ASEGURADORAS
// =====================
export const aseguradoras = [
  { id: 1, nombre: 'Seguros Equinoccial', ruc: '1791234567001', contacto: 'Lic. Fernanda Paz', telefono: '+593 2 111 2222', email: 'fpaz@equinoccial.com', estado: 'Activo', polizasActivas: 2 },
  { id: 2, nombre: 'Mapfre Ecuador', ruc: '1792345678001', contacto: 'Ing. Diego Ramírez', telefono: '+593 2 222 3333', email: 'dramirez@mapfre.com.ec', estado: 'Activo', polizasActivas: 1 },
  { id: 3, nombre: 'Chubb Seguros', ruc: '1793456789001', contacto: 'Dra. Valeria Ortiz', telefono: '+593 2 333 4444', email: 'vortiz@chubb.com', estado: 'Activo', polizasActivas: 1 },
  { id: 4, nombre: 'Seguros Pichincha', ruc: '1794567890001', contacto: 'Lic. Andrés Mora', telefono: '+593 2 444 5555', email: 'amora@segurospichincha.com', estado: 'Activo', polizasActivas: 1 },
  { id: 5, nombre: 'ACE Seguros', ruc: '1795678901001', contacto: 'Ing. Patricia Vela', telefono: '+593 2 555 6666', email: 'pvela@ace.com', estado: 'Inactivo', polizasActivas: 0 },
];

// =====================
// ACTIVIDADES
// =====================
export const actividades = [
  { id: 1, nombre: 'Inspección Visual', tipo: 'Mantenimiento Preventivo', duracion: '2 horas', frecuencia: 'Mensual', estado: 'Activo' },
  { id: 2, nombre: 'Limpieza de Equipos', tipo: 'Mantenimiento Preventivo', duracion: '4 horas', frecuencia: 'Trimestral', estado: 'Activo' },
  { id: 3, nombre: 'Reemplazo de Componentes', tipo: 'Mantenimiento Correctivo', duracion: 'Variable', frecuencia: 'A demanda', estado: 'Activo' },
  { id: 4, nombre: 'Traslado de Equipos', tipo: 'Logística', duracion: 'Variable', frecuencia: 'A demanda', estado: 'Activo' },
  { id: 5, nombre: 'Auditoría de Seguridad', tipo: 'Auditoría', duracion: '8 horas', frecuencia: 'Semestral', estado: 'Activo' },
  { id: 6, nombre: 'Actualización de Firmware', tipo: 'Mantenimiento Preventivo', duracion: '3 horas', frecuencia: 'Semestral', estado: 'Activo' },
  { id: 7, nombre: 'Prueba de Batería UPS', tipo: 'Prueba', duracion: '2 horas', frecuencia: 'Trimestral', estado: 'Activo' },
];

// =====================
// DATOS PARAMÉTRICOS
// =====================
export const datosParametricos = {
  tiposEquipo: ['Servidor', 'Switch', 'Router', 'Firewall', 'UPS', 'Storage', 'Balanceador'],
  estadosEquipo: ['Activo', 'En traslado', 'Inactivo', 'En mantenimiento', 'Dado de baja'],
  prioridades: ['Alta', 'Media', 'Baja'],
  estadosProyecto: ['Planificación', 'En progreso', 'Completado', 'Pausado', 'Cancelado'],
  tiposPoliza: ['Todo Riesgo Electrónico', 'Equipo Electrónico', 'Responsabilidad Civil', 'Todo Riesgo'],
  ciudades: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Loja'],
  especialidades: ['Servidores y Virtualización', 'Redes y Seguridad', 'Redes LAN/WAN', 'Energía y UPS', 'Infraestructura Física', 'Servidores y Storage', 'Cloud y Virtualización'],
};

// =====================
// KPIs / DASHBOARD DATA
// =====================
export const kpis = {
  equiposActivos: 8,
  trasladosMes: 6,
  tecnicosDisponibles: 4,
  polizasVencidas: 1,
  proyectosActivos: 4,
  alertasPendientes: 7,
};

export const actividadReciente = [
  { id: 1, tipo: 'traslado', descripcion: 'Traslado TRL-001 iniciado: SRV-001 hacia DC Guayaquil', usuario: 'Carlos Mendoza', hora: 'Hace 2 horas', color: 'blue' },
  { id: 2, tipo: 'inspeccion', descripcion: 'Inspección INS-001 completada en DC Quito Norte', usuario: 'Carlos Mendoza', hora: 'Hace 4 horas', color: 'green' },
  { id: 3, tipo: 'alerta', descripcion: 'Alerta: Póliza SEG-2023-089 vence en 5 días', usuario: 'Sistema', hora: 'Hace 6 horas', color: 'red' },
  { id: 4, tipo: 'proyecto', descripcion: 'Proyecto PRY-003 actualizado al 80% de avance', usuario: 'Luis Vega', hora: 'Hace 8 horas', color: 'purple' },
  { id: 5, tipo: 'equipo', descripcion: 'Nuevo equipo SRV-009 registrado en DC Quito Sur', usuario: 'Diana Castro', hora: 'Ayer 15:30', color: 'orange' },
  { id: 6, tipo: 'poliza', descripcion: 'Póliza POL-003 renovada con Chubb Seguros', usuario: 'Admin', hora: 'Ayer 10:00', color: 'teal' },
];

export const chartDataMensual = [
  { mes: 'Ago', traslados: 4, inspecciones: 8, proyectos: 2 },
  { mes: 'Sep', traslados: 6, inspecciones: 12, proyectos: 3 },
  { mes: 'Oct', traslados: 5, inspecciones: 10, proyectos: 2 },
  { mes: 'Nov', traslados: 8, inspecciones: 15, proyectos: 4 },
  { mes: 'Dic', traslados: 3, inspecciones: 6, proyectos: 2 },
  { mes: 'Ene', traslados: 6, inspecciones: 11, proyectos: 4 },
];

export const chartDataEquipos = [
  { categoria: 'Servidores', cantidad: 4 },
  { categoria: 'Redes', cantidad: 3 },
  { categoria: 'Energía', cantidad: 2 },
  { categoria: 'Seguridad', cantidad: 1 },
];
