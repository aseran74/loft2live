import { ref } from 'vue'
import { supabase } from '@/config/supabase'

export interface AdminSolicitud {
  id: string
  user_email: string
  user_name: string | null
  user_id?: string
  proyecto_id: string | null
  nombre_proyecto: string | null
  mensaje: string
  telefono: string | null
  fecha_hora_llamada: string | null
  tipo_consulta: string | null
  estado: string
  created_at: string
  respuesta_admin: string | null
}

export function useAdminSolicitudes() {
  const solicitudes = ref<AdminSolicitud[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSolicitudes() {
    loading.value = true
    error.value = null
    try {
      const { data, error: rpcError } = await supabase.rpc('get_admin_solicitudes')
      if (rpcError) throw rpcError
      solicitudes.value = Array.isArray(data) ? (data as AdminSolicitud[]) : []
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar solicitudes'
      solicitudes.value = []
    } finally {
      loading.value = false
    }
  }

  async function updateSolicitud(solicitudId: string, data: { estado?: string; respuesta_admin?: string }) {
    loading.value = true
    error.value = null
    try {
      const { error: rpcError } = await supabase.rpc('update_solicitud', {
        p_solicitud_id: solicitudId,
        p_estado: data.estado || null,
        p_respuesta_admin: data.respuesta_admin ?? null
      })
      if (rpcError) throw rpcError
      await fetchSolicitudes()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al actualizar'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    solicitudes,
    loading,
    error,
    fetchSolicitudes,
    updateSolicitud
  }
}
