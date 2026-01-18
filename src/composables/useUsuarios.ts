import { ref } from 'vue'
import { supabase } from '@/config/supabase'
import type { UsuarioProfile, UsuarioComprador } from '@/types/usuario'

// Composable para Usuarios Profile
export function useUsuariosProfile() {
  const usuarios = ref<UsuarioProfile[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchUsuarios = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await supabase
        .from('usuarios_profile')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      usuarios.value = data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al cargar usuarios'
      console.error('Error fetching usuarios:', err)
    } finally {
      loading.value = false
    }
  }

  const createUsuario = async (usuario: Omit<UsuarioProfile, 'id' | 'created_at' | 'updated_at'>) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: createError } = await supabase
        .from('usuarios_profile')
        .insert([usuario])
        .select()
        .single()

      if (createError) throw createError
      usuarios.value.unshift(data)
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al crear usuario'
      console.error('Error creating usuario:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUsuario = async (id: string, usuario: Partial<UsuarioProfile>) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: updateError } = await supabase
        .from('usuarios_profile')
        .update(usuario)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError
      const index = usuarios.value.findIndex(u => u.id === id)
      if (index !== -1) {
        usuarios.value[index] = data
      }
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al actualizar usuario'
      console.error('Error updating usuario:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteUsuario = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const { error: deleteError } = await supabase
        .from('usuarios_profile')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      usuarios.value = usuarios.value.filter(u => u.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al eliminar usuario'
      console.error('Error deleting usuario:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
  }
}

// Composable para Usuarios Compradores
export function useUsuariosCompradores() {
  const compradores = ref<UsuarioComprador[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCompradores = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await supabase
        .from('usuarios_compradores')
        .select(`
          *,
          proyectos:proyecto_id (
            id,
            nombre_proyecto
          )
        `)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      compradores.value = data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al cargar compradores'
      console.error('Error fetching compradores:', err)
    } finally {
      loading.value = false
    }
  }

  const createComprador = async (comprador: Omit<UsuarioComprador, 'id' | 'created_at' | 'updated_at'>) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: createError } = await supabase
        .from('usuarios_compradores')
        .insert([comprador])
        .select()
        .single()

      if (createError) throw createError
      compradores.value.unshift(data)
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al crear comprador'
      console.error('Error creating comprador:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateComprador = async (id: string, comprador: Partial<UsuarioComprador>) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: updateError } = await supabase
        .from('usuarios_compradores')
        .update(comprador)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError
      const index = compradores.value.findIndex(c => c.id === id)
      if (index !== -1) {
        compradores.value[index] = data
      }
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al actualizar comprador'
      console.error('Error updating comprador:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteComprador = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const { error: deleteError } = await supabase
        .from('usuarios_compradores')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      compradores.value = compradores.value.filter(c => c.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al eliminar comprador'
      console.error('Error deleting comprador:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    compradores,
    loading,
    error,
    fetchCompradores,
    createComprador,
    updateComprador,
    deleteComprador
  }
}
