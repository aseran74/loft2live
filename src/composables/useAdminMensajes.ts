import { ref } from 'vue'
import { supabase } from '@/config/supabase'
import { useAuth } from './useAuth'

export interface Mensaje {
  id: string
  contenido: string
  from_email?: string
  from_name?: string
  from_user_id?: string
  to_user_id?: string
  to_comprador_id?: string
  to_perfil_id?: string
  solicitud_id?: string | null
  created_at: string
  leido: boolean
}

export function useAdminMensajes() {
  const { currentUser } = useAuth()
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function enviarMensaje(opts: {
    to_user_id?: string
    to_comprador_id?: string
    to_perfil_id?: string
    solicitud_id?: string | null
    contenido: string
  }) {
    if (!currentUser.value?.uid) throw new Error('Debes estar autenticado')
    loading.value = true
    error.value = null
    try {
      const { error: rpcError } = await supabase.rpc('crear_mensaje_admin', {
        p_from_firebase_uid: currentUser.value.uid,
        p_to_user_id: opts.to_user_id || null,
        p_to_comprador_id: opts.to_comprador_id || null,
        p_to_perfil_id: opts.to_perfil_id || null,
        p_solicitud_id: opts.solicitud_id || null,
        p_contenido: opts.contenido
      })
      if (rpcError) throw rpcError
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al enviar mensaje'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function getConversacion(tipo: 'user' | 'comprador' | 'perfil', destinoId: string) {
    loading.value = true
    error.value = null
    try {
      const { data, error: rpcError } = await supabase.rpc('get_mensajes_conversacion', {
        p_tipo: tipo,
        p_destino_id: destinoId
      })
      if (rpcError) throw rpcError
      return (data as Mensaje[]) || []
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar mensajes'
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    enviarMensaje,
    getConversacion
  }
}
