export interface Proyecto {
  id?: string
  nombre_proyecto: string
  objetivo_inversion_total: number
  localizacion: string
  permisos?: string
  precio_compra?: number
  precio_reforma?: number
  precio_permisos?: number
  comision_porcentaje?: number
  num_lofts: number
  precio_unidad: number
  precio_ticket?: number
  gasto_estimado_comunidad?: number
  tipo_inversion: string
  porcentaje_llegado: number
  min_termino_meses: number
  monto_restante?: number
  alquiler?: boolean
  precio_alquiler_mes?: number
  mostrar_en_landing?: boolean
  vendido_cerrado?: boolean
  consulta_vinculante_urbanistica?: boolean
  caracteristicas?: string
  fotos?: string[]
  fotos_oficina_actual?: string[]
  fotos_oficina_remodelada?: string[]
  videos?: string[]
  street_view_embed?: string
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
  disponibles?: number
  precio_alquiler?: number
  alquilados?: number
  planos?: string[]
}
