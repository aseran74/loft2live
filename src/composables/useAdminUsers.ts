import { ref } from 'vue'
import { supabase } from '@/config/supabase'

export interface AdminUser {
  id: string
  firebase_uid: string
  email: string
  name: string | null
  photo_url: string | null
  role: string
  is_active: boolean
  created_at: string
}

export function useAdminUsers() {
  const users = ref<AdminUser[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      const { data, error: rpcError } = await supabase.rpc('get_admin_users')
      if (rpcError) throw rpcError
      users.value = (data as AdminUser[]) || []
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar usuarios'
      users.value = []
    } finally {
      loading.value = false
    }
  }

  async function updateUser(id: string, data: { name?: string; role?: string; is_active?: boolean }) {
    loading.value = true
    error.value = null
    try {
      const { error: rpcError } = await supabase.rpc('update_user_admin', {
        p_user_id: id,
        p_name: data.name ?? null,
        p_role: data.role ?? null,
        p_is_active: data.is_active ?? null
      })
      if (rpcError) throw rpcError
      await fetchUsers()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al actualizar'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function deleteUser(id: string) {
    loading.value = true
    error.value = null
    try {
      const { error: rpcError } = await supabase.rpc('delete_user_admin', { p_user_id: id })
      if (rpcError) throw rpcError
      await fetchUsers()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al eliminar'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function createUser(email: string, name?: string, role?: string) {
    loading.value = true
    error.value = null
    try {
      const { data, error: rpcError } = await supabase.rpc('create_user_admin', {
        p_email: email,
        p_name: name || null,
        p_role: role || 'user'
      })
      if (rpcError) throw rpcError
      await fetchUsers()
      return data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al crear usuario'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    updateUser,
    deleteUser,
    createUser
  }
}
