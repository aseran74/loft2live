export interface UsuarioProfile {
  id?: string
  nombre: string
  telefono?: string
  correo: string
  direccion?: string
  analisis_rcp?: string
  esta_interesado: boolean
  notas?: string
  created_at?: string
  updated_at?: string
}

export interface UsuarioComprador {
  id?: string
  nombre: string
  telefono?: string
  correo: string
  direccion?: string
  proyecto_id?: string
  monto_invertido: number
  tipo_compra?: 'tickets' | 'loft_completo'
  num_tickets?: number
  fecha_inversion?: string
  estado: 'pendiente' | 'confirmado' | 'completado' | 'cancelado'
  notas?: string
  created_at?: string
  updated_at?: string
}
