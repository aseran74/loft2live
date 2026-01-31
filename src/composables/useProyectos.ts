import { ref } from 'vue'
import { supabase } from '@/config/supabase'
import type { Proyecto } from '@/types/proyecto'

const proyectos = ref<Proyecto[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export function useProyectos() {
  // Obtener todos los proyectos
  const fetchProyectos = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await supabase
        .from('proyectos')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      proyectos.value = data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al cargar proyectos'
      console.error('Error fetching proyectos:', err)
    } finally {
      loading.value = false
    }
  }

  // Obtener un proyecto por ID
  const fetchProyectoById = async (id: string): Promise<Proyecto | null> => {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await supabase
        .from('proyectos')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al cargar el proyecto'
      console.error('Error fetching proyecto:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Crear un nuevo proyecto
  const createProyecto = async (proyecto: Omit<Proyecto, 'id' | 'created_at' | 'updated_at'>) => {
    loading.value = true
    error.value = null
    try {
      // Calcular monto restante si no se proporciona
      const montoRestante = proyecto.monto_restante ?? 
        (proyecto.objetivo_inversion_total * (1 - proyecto.porcentaje_llegado / 100))

      const { data, error: createError } = await supabase
        .from('proyectos')
        .insert([{
          ...proyecto,
          monto_restante: montoRestante
        }])
        .select()
        .single()

      if (createError) throw createError
      
      proyectos.value.unshift(data)
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al crear el proyecto'
      console.error('Error creating proyecto:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actualizar un proyecto
  const updateProyecto = async (id: string, proyecto: Partial<Proyecto>) => {
    loading.value = true
    error.value = null
    try {
      // Recalcular monto restante si se actualiza el porcentaje o el objetivo
      if (proyecto.porcentaje_llegado !== undefined || proyecto.objetivo_inversion_total !== undefined) {
        const proyectoActual = proyectos.value.find(p => p.id === id)
        const objetivo = proyecto.objetivo_inversion_total ?? proyectoActual?.objetivo_inversion_total ?? 0
        const porcentaje = proyecto.porcentaje_llegado ?? proyectoActual?.porcentaje_llegado ?? 0
        proyecto.monto_restante = objetivo * (1 - porcentaje / 100)
      }

      // Preparar el objeto de actualización, excluyendo campos que no deben actualizarse
      const updateData: any = { ...proyecto }
      
      // Asegurar que fotos sea un array válido o null
      if (updateData.fotos !== undefined) {
        if (Array.isArray(updateData.fotos)) {
          updateData.fotos = updateData.fotos
        } else if (updateData.fotos === null || updateData.fotos === '') {
          updateData.fotos = []
        } else {
          updateData.fotos = [updateData.fotos]
        }
      }
      // Fotos oficina actual y remodelada
      if (updateData.fotos_oficina_actual !== undefined) {
        updateData.fotos_oficina_actual = Array.isArray(updateData.fotos_oficina_actual)
          ? updateData.fotos_oficina_actual
          : updateData.fotos_oficina_actual === null || updateData.fotos_oficina_actual === '' ? [] : [updateData.fotos_oficina_actual]
      }
      if (updateData.fotos_oficina_remodelada !== undefined) {
        updateData.fotos_oficina_remodelada = Array.isArray(updateData.fotos_oficina_remodelada)
          ? updateData.fotos_oficina_remodelada
          : updateData.fotos_oficina_remodelada === null || updateData.fotos_oficina_remodelada === '' ? [] : [updateData.fotos_oficina_remodelada]
      }
      if (updateData.videos !== undefined) {
        updateData.videos = Array.isArray(updateData.videos)
          ? updateData.videos
          : updateData.videos === null || updateData.videos === '' ? [] : [updateData.videos]
      }

      // Asegurar que comodidades sea un array válido
      if (updateData.comodidades !== undefined) {
        if (Array.isArray(updateData.comodidades)) {
          updateData.comodidades = updateData.comodidades
        } else if (updateData.comodidades === null || updateData.comodidades === '') {
          updateData.comodidades = []
        } else {
          updateData.comodidades = [updateData.comodidades]
        }
      }

      // Normalizar unidades_tipos (JSONB esperado: array)
      if (updateData.unidades_tipos !== undefined) {
        if (Array.isArray(updateData.unidades_tipos)) {
          updateData.unidades_tipos = updateData.unidades_tipos
        } else if (updateData.unidades_tipos === null || updateData.unidades_tipos === '') {
          updateData.unidades_tipos = []
        } else {
          // Si llega un objeto único, lo convertimos a array
          updateData.unidades_tipos = [updateData.unidades_tipos]
        }
      }

      // Eliminar campos que no existen en la tabla
      delete updateData.id
      delete updateData.created_at
      delete updateData.updated_at

      const { data, error: updateError } = await supabase
        .from('proyectos')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (updateError) {
        console.error('Supabase update error:', updateError)
        throw updateError
      }
      
      const index = proyectos.value.findIndex(p => p.id === id)
      if (index !== -1) {
        proyectos.value[index] = data
      }
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el proyecto'
      error.value = errorMessage
      console.error('Error updating proyecto:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Eliminar un proyecto
  const deleteProyecto = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const { error: deleteError } = await supabase
        .from('proyectos')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      
      proyectos.value = proyectos.value.filter(p => p.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al eliminar el proyecto'
      console.error('Error deleting proyecto:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    proyectos,
    loading,
    error,
    fetchProyectos,
    fetchProyectoById,
    createProyecto,
    updateProyecto,
    deleteProyecto
  }
}
