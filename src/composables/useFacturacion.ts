import { ref } from 'vue'
import { supabase } from '@/config/supabase'

export type EstadoPago = 'pendiente' | 'pagado' | 'incidencia'

export interface PagoTrimestral {
  id?: string
  proyecto_id: string
  comprador_id: string
  anio: number
  trimestre: number
  monto: number
  estado: EstadoPago
  notas?: string
  created_at?: string
  updated_at?: string
}

export function useFacturacion() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPagos = async (anio: number, trimestre: number) => {
    const { data, err } = await supabase
      .from('pagos_trimestrales')
      .select('*')
      .eq('anio', anio)
      .eq('trimestre', trimestre)

    if (err) throw err
    return (data || []) as PagoTrimestral[]
  }

  const fetchPagadoAnualPorComprador = async (anio: number) => {
    const { data, err } = await supabase
      .from('pagos_trimestrales')
      .select('comprador_id, monto')
      .eq('anio', anio)
      .eq('estado', 'pagado')

    if (err) throw err
    const map = new Map<string, number>()
    for (const row of data || []) {
      const id = row.comprador_id
      map.set(id, (map.get(id) || 0) + Number(row.monto))
    }
    return map
  }

  const upsertPago = async (p: {
    proyecto_id: string
    comprador_id: string
    anio: number
    trimestre: number
    monto: number
    estado?: EstadoPago
    notas?: string
  }) => {
    const { data, err } = await supabase
      .from('pagos_trimestrales')
      .upsert(
        {
          proyecto_id: p.proyecto_id,
          comprador_id: p.comprador_id,
          anio: p.anio,
          trimestre: p.trimestre,
          monto: p.monto,
          estado: p.estado ?? 'pendiente',
          notas: p.notas ?? null,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'proyecto_id,comprador_id,anio,trimestre',
          ignoreDuplicates: false,
        }
      )
      .select()
      .single()

    if (err) throw err
    return data as PagoTrimestral
  }

  const updateEstadoPago = async (
    proyectoId: string,
    compradorId: string,
    anio: number,
    trimestre: number,
    estado: EstadoPago,
    notas?: string
  ) => {
    const { data, err } = await supabase
      .from('pagos_trimestrales')
      .update({ estado, notas: notas ?? null, updated_at: new Date().toISOString() })
      .eq('proyecto_id', proyectoId)
      .eq('comprador_id', compradorId)
      .eq('anio', anio)
      .eq('trimestre', trimestre)
      .select()
      .single()

    if (err) {
      if (err.code === 'PGRST116') {
        return null
      }
      throw err
    }
    return data as PagoTrimestral
  }

  return {
    loading,
    error,
    fetchPagos,
    fetchPagadoAnualPorComprador,
    upsertPago,
    updateEstadoPago,
  }
}
