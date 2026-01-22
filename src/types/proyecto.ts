export interface Proyecto {
  id?: string
  nombre_proyecto: string
  objetivo_inversion_total: number
  localizacion: string
  permisos?: string
  num_lofts: number
  precio_unidad: number
  gasto_estimado_comunidad?: number
  tipo_inversion: string
  porcentaje_llegado: number
  min_termino_meses: number
  monto_restante?: number
  alquiler?: boolean
  precio_alquiler_mes?: number
  fotos?: string[]
  comodidades?: string[]
  unidades_tipos?: UnidadTipo[]
  created_at?: string
  updated_at?: string
}

export type TipoInversion = 'Quarterly Bullet' | 'Monthly' | 'Annual'

export interface UnidadTipo {
  nombre: string
  precio: number
  m2?: number
  planos?: string[]
}
