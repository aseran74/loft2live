import { ref, computed, watch } from 'vue'
import { supabase } from '@/config/supabase'
import { useAuth } from './useAuth'
import type { Proyecto } from '@/types/proyecto'

const FAVORITOS_LOCAL_KEY = 'loft2live_favoritos'

function getLocalFavoritos(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITOS_LOCAL_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw) as unknown
    return Array.isArray(arr) ? arr.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

function setLocalFavoritos(ids: string[]) {
  localStorage.setItem(FAVORITOS_LOCAL_KEY, JSON.stringify(ids))
}

export interface FavoritoConProyecto {
  proyecto_id: string
  nombre_proyecto: string
  localizacion: string
  precio_unidad: number
  porcentaje_llegado: number
  foto_path: string | null
}

export interface SolicitudInfo {
  id: string
  proyecto_id: string | null
  nombre_proyecto: string | null
  mensaje: string
  estado: string
  created_at: string
  telefono: string | null
  fecha_hora_llamada: string | null
  tipo_consulta: string | null
  respuesta_admin: string | null
}

export interface MensajeRecibido {
  id: string
  contenido: string
  from_email: string
  from_name: string | null
  solicitud_id: string | null
  created_at: string
  leido: boolean
}

export interface SolicitudFormData {
  mensaje: string
  telefono?: string
  fecha_hora_llamada?: string | null
  tipo_consulta?: string
}

export interface MiInversion {
  id: string
  proyecto_id: string
  nombre_proyecto: string
  localizacion: string
  monto_invertido: number
  estado: string
  fecha_inversion: string | null
}

// Estado compartido (persistente) para favoritos
const favoritos = ref<FavoritoConProyecto[]>([])
const localFavoritoIds = ref<string[]>(getLocalFavoritos())

export function useUserDashboard() {
  const { currentUser } = useAuth()
  const solicitudes = ref<SolicitudInfo[]>([])
  const inversiones = ref<MiInversion[]>([])
  const mensajes = ref<MensajeRecibido[]>([])
  const loadingFavoritos = ref(false)
  const loadingSolicitudes = ref(false)
  const loadingInversiones = ref(false)
  const loadingMensajes = ref(false)
  const error = ref<string | null>(null)

  const firebaseUid = computed(() => currentUser.value?.uid || '')

  async function migrateLocalFavoritosToDb() {
    const ids = getLocalFavoritos()
    if (ids.length === 0 || !firebaseUid.value) return
    for (const id of ids) {
      try {
        await supabase.rpc('add_favorito', {
          p_firebase_uid: firebaseUid.value,
          p_proyecto_id: id
        })
      } catch {
        /* ignorar errores individuales */
      }
    }
    localStorage.removeItem(FAVORITOS_LOCAL_KEY)
    localFavoritoIds.value = []
    await fetchFavoritos()
  }

  watch(
    firebaseUid,
    async (uid) => {
      if (uid) {
        await migrateLocalFavoritosToDb()
        await fetchFavoritos()
      } else {
        favoritos.value = []
        localFavoritoIds.value = getLocalFavoritos()
      }
    },
    { immediate: true }
  )

  async function fetchFavoritos() {
    if (!firebaseUid.value) {
      favoritos.value = []
      return
    }
    loadingFavoritos.value = true
    error.value = null
    try {
      const { data, error: rpcError } = await supabase.rpc('get_my_favoritos_con_proyectos', {
        p_firebase_uid: firebaseUid.value
      })
      if (rpcError) throw rpcError
      favoritos.value = (data as FavoritoConProyecto[]) || []
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar favoritos'
      favoritos.value = []
    } finally {
      loadingFavoritos.value = false
    }
  }

  async function fetchSolicitudes() {
    if (!firebaseUid.value) return
    loadingSolicitudes.value = true
    error.value = null
    try {
      const { data, error: rpcError } = await supabase.rpc('get_my_solicitudes', {
        p_firebase_uid: firebaseUid.value
      })
      if (rpcError) throw rpcError
      solicitudes.value = (data as SolicitudInfo[]) || []
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar solicitudes'
      solicitudes.value = []
    } finally {
      loadingSolicitudes.value = false
    }
  }

  async function fetchMensajes() {
    if (!firebaseUid.value) return
    loadingMensajes.value = true
    error.value = null
    try {
      const { data, error: rpcError } = await supabase.rpc('get_my_mensajes', {
        p_firebase_uid: firebaseUid.value
      })
      if (rpcError) throw rpcError
      mensajes.value = (data as MensajeRecibido[]) || []
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar mensajes'
      mensajes.value = []
    } finally {
      loadingMensajes.value = false
    }
  }

  async function fetchInversiones() {
    if (!firebaseUid.value) return
    loadingInversiones.value = true
    error.value = null
    try {
      const { data, error: rpcError } = await supabase.rpc('get_my_inversiones', {
        p_firebase_uid: firebaseUid.value
      })
      if (rpcError) throw rpcError
      inversiones.value = (data as MiInversion[]) || []
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar inversiones'
      inversiones.value = []
    } finally {
      loadingInversiones.value = false
    }
  }

  async function addFavorito(proyectoId: string) {
    if (firebaseUid.value) {
      try {
        const { error: rpcError } = await supabase.rpc('add_favorito', {
          p_firebase_uid: firebaseUid.value,
          p_proyecto_id: proyectoId
        })
        if (rpcError) throw rpcError
        await fetchFavoritos()
      } catch (e) {
        throw e instanceof Error ? e : new Error('Error al añadir favorito')
      }
    } else {
      const ids = getLocalFavoritos()
      if (!ids.includes(proyectoId)) {
        ids.push(proyectoId)
        setLocalFavoritos(ids)
        localFavoritoIds.value = ids
      }
    }
  }

  async function removeFavorito(proyectoId: string) {
    if (firebaseUid.value) {
      try {
        const { error: rpcError } = await supabase.rpc('remove_favorito', {
          p_firebase_uid: firebaseUid.value,
          p_proyecto_id: proyectoId
        })
        if (rpcError) throw rpcError
        await fetchFavoritos()
      } catch (e) {
        throw e instanceof Error ? e : new Error('Error al quitar favorito')
      }
    } else {
      const ids = getLocalFavoritos().filter((id) => id !== proyectoId)
      setLocalFavoritos(ids)
      localFavoritoIds.value = ids
    }
  }

  async function crearSolicitud(
    proyectoId: string | null,
    data: { mensaje: string; telefono?: string; fecha_hora_llamada?: string | null; tipo_consulta?: string }
  ) {
    if (!firebaseUid.value) return
    try {
      const fechaHora = data.fecha_hora_llamada ? new Date(data.fecha_hora_llamada).toISOString() : null
      const { error: rpcError } = await supabase.rpc('crear_solicitud_info', {
        p_firebase_uid: firebaseUid.value,
        p_proyecto_id: proyectoId,
        p_mensaje: data.mensaje,
        p_telefono: data.telefono || null,
        p_fecha_hora_llamada: fechaHora,
        p_tipo_consulta: data.tipo_consulta || null
      })
      if (rpcError) throw rpcError
      await fetchSolicitudes()
    } catch (e) {
      throw e instanceof Error ? e : new Error('Error al enviar solicitud')
    }
  }

  async function fetchAll() {
    await Promise.all([fetchFavoritos(), fetchSolicitudes(), fetchInversiones(), fetchMensajes()])
  }

  const isFavorito = (proyectoId: string) =>
    favoritos.value.some((f) => f.proyecto_id === proyectoId) ||
    localFavoritoIds.value.includes(proyectoId)

  return {
    favoritos,
    solicitudes,
    inversiones,
    mensajes,
    loadingFavoritos,
    loadingSolicitudes,
    loadingInversiones,
    loadingMensajes,
    error,
    fetchFavoritos,
    fetchSolicitudes,
    fetchInversiones,
    fetchMensajes,
    fetchAll,
    addFavorito,
    removeFavorito,
    crearSolicitud,
    isFavorito
  }
}
