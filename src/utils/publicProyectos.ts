import { supabase } from '@/config/supabase'
import type { Proyecto } from '@/types/proyecto'

/**
 * Acceso público a proyectos mediante RPC en Supabase.
 * Esto evita abrir SELECT público en tablas con RLS.
 *
 * Requiere funciones SQL:
 * - public.public_proyectos_list()
 * - public.public_proyecto_by_id(p_id uuid)
 */

export async function fetchPublicProyectos(): Promise<Proyecto[]> {
  const { data, error } = await supabase.rpc('public_proyectos_list')
  if (!error) return (data as any as Proyecto[]) || []

  // Fallback: si la RPC aún no está desplegada, intentamos SELECT normal.
  // Esto permite que funcione al menos para usuarios autenticados (y evita romper el dashboard).
  const msg = String((error as any)?.message || '')
  const looksLikeMissingRpc =
    msg.includes('public_proyectos_list') && msg.toLowerCase().includes('schema cache')

  if (!looksLikeMissingRpc) throw error

  const { data: rows, error: selectErr } = await supabase
    .from('proyectos')
    .select(
      'id,nombre_proyecto,objetivo_inversion_total,localizacion,num_lofts,precio_unidad,tipo_inversion,porcentaje_llegado,monto_restante,alquiler,precio_alquiler_mes,fotos,comodidades,unidades_tipos,created_at,updated_at'
    )
    .order('created_at', { ascending: false })

  if (selectErr) throw error
  return (rows as any as Proyecto[]) || []
}

export async function fetchPublicProyectoById(id: string): Promise<Proyecto | null> {
  const { data, error } = await supabase.rpc('public_proyecto_by_id', { p_id: id })
  if (!error) {
    const rows = (data as any[]) || []
    return rows[0] || null
  }

  const msg = String((error as any)?.message || '')
  const looksLikeMissingRpc =
    msg.includes('public_proyecto_by_id') && msg.toLowerCase().includes('schema cache')

  if (!looksLikeMissingRpc) throw error

  const { data: row, error: selectErr } = await supabase
    .from('proyectos')
    .select(
      'id,nombre_proyecto,objetivo_inversion_total,localizacion,num_lofts,precio_unidad,tipo_inversion,porcentaje_llegado,monto_restante,alquiler,precio_alquiler_mes,fotos,comodidades,unidades_tipos,created_at,updated_at'
    )
    .eq('id', id)
    .maybeSingle()

  if (selectErr) throw error
  return (row as any as Proyecto) || null
}

