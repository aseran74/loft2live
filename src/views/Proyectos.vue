<template>
  <AdminLayout>
    <div class="p-6" style="background-color: #F2F2F2">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold" style="color: #0D0D0D">
            Gestión de Proyectos
          </h1>
          <button
            @click="showForm = true; selectedProyecto = undefined"
            class="px-6 py-2 text-white rounded-lg transition-colors font-semibold hover:opacity-90"
            style="background-color: #79358D"
          >
            + Nuevo Proyecto
          </button>
        </div>

      <!-- Formulario Modal -->
      <div
        v-if="showForm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="showForm = false"
      >
        <div
          class="bg-white rounded-lg sm:rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6"
          @click.stop
        >
          <div class="flex justify-between items-center mb-4 sm:mb-6">
            <h2 class="text-xl sm:text-2xl font-bold" style="color: #0D0D0D">
              {{ selectedProyecto ? 'Editar Proyecto' : 'Nuevo Proyecto' }}
            </h2>
            <button
              @click="showForm = false"
              class="text-gray-500 hover:text-gray-700 text-2xl sm:text-xl leading-none"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
          <ProyectoForm
            :proyecto="selectedProyecto"
            :loading="loading"
            @submit="handleSubmit"
            @cancel="showForm = false"
          />
        </div>
      </div>

      <!-- Lista de proyectos -->
      <div v-if="loading && proyectos.length === 0" class="text-center py-12">
        <p style="color: #0D0D0D">Cargando proyectos...</p>
      </div>

      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <div v-else-if="proyectos.length === 0" class="text-center py-12">
        <p style="color: #0D0D0D">No hay proyectos disponibles. Crea tu primer proyecto.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="proyecto in proyectos"
          :key="proyecto.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div class="p-5">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: #DFDCF2; color: #79358d">
                Activo
              </span>
              <div class="flex gap-2">
                <button
                  @click="editProyecto(proyecto)"
                  class="text-sm px-3 py-1 rounded transition-colors"
                  style="background-color: #CFCEF2; color: #0D0D0D"
                >
                  Editar
                </button>
                <button
                  @click="deleteProyectoHandler(proyecto.id!)"
                  class="text-sm px-3 py-1 rounded transition-colors text-red-600 hover:bg-red-50"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <!-- Imagen principal del proyecto -->
            <div v-if="proyecto.fotos && proyecto.fotos.length > 0" class="mb-4">
              <img
                :src="getPhotoUrl(proyecto.fotos[0])"
                :alt="proyecto.nombre_proyecto"
                class="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div v-else class="mb-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <span class="text-gray-400 text-sm">Sin imagen</span>
            </div>

            <h3 class="text-xl font-bold mb-3" style="color: #0D0D0D">
              {{ proyecto.nombre_proyecto }}
            </h3>

            <div class="space-y-2 mb-4 text-sm">
              <div class="flex justify-between">
                <span style="color: #0D0D0D">Objetivo:</span>
                <span class="font-semibold" style="color: #0D0D0D">{{ formatCurrency(proyecto.objetivo_inversion_total) }}</span>
              </div>
              <div class="flex justify-between">
                <span style="color: #0D0D0D">Localización:</span>
                <span class="font-semibold" style="color: #0D0D0D">{{ proyecto.localizacion }}</span>
              </div>
              <div class="flex justify-between">
                <span style="color: #0D0D0D">Lofts:</span>
                <span class="font-semibold" style="color: #0D0D0D">{{ proyecto.num_lofts }}</span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mb-4">
              <div class="flex justify-between text-xs mb-2" style="color: #0D0D0D">
                <span>{{ formatCurrency(proyecto.monto_restante || 0) }} restantes</span>
                <span>{{ proyecto.porcentaje_llegado }}%</span>
              </div>
              <div class="w-full rounded-full h-2" style="background-color: #DFDCF2">
                <div
                  class="h-2 rounded-full"
                  :style="`width: ${proyecto.porcentaje_llegado}%; background-color: #79358D`"
                ></div>
              </div>
            </div>

            <button
              @click="viewDetails(proyecto)"
              class="w-full px-4 py-2 text-white rounded-lg transition-colors font-semibold hover:opacity-90"
              style="background-color: #79358D"
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProyectos } from '@/composables/useProyectos'
import ProyectoForm from '@/components/proyectos/ProyectoForm.vue'
import type { Proyecto } from '@/types/proyecto'
import { supabase } from '@/config/supabase'
import AdminLayout from '@/components/layout/AdminLayout.vue'

const router = useRouter()
const route = useRoute()

const { proyectos, loading, error, fetchProyectos, createProyecto, updateProyecto, deleteProyecto } = useProyectos()

const showForm = ref(false)
const selectedProyecto = ref<Proyecto | undefined>(undefined)

onMounted(() => {
  fetchProyectos()
  
  // Verificar si hay un parámetro de edición en la URL
  const editId = route.query.edit as string
  if (editId) {
    // Buscar el proyecto y abrir el modal de edición
    const proyectoToEdit = proyectos.value.find(p => p.id === editId)
    if (proyectoToEdit) {
      editProyecto(proyectoToEdit)
    }
  }
})

const editProyecto = (proyecto: Proyecto) => {
  selectedProyecto.value = proyecto
  showForm.value = true
}

const handleSubmit = async (
  data: Omit<Proyecto, 'id' | 'created_at' | 'updated_at'>,
  photos: File[] = [],
  planosPorTipo: File[][] = []
) => {
  try {
    let proyectoId: string
    
    if (selectedProyecto.value?.id) {
      // Actualizar proyecto existente
      // Primero actualizamos los datos básicos sin fotos
      const dataWithoutPhotos = { ...data }
      delete dataWithoutPhotos.fotos
      
      const updated = await updateProyecto(selectedProyecto.value.id, dataWithoutPhotos)
      proyectoId = updated.id!
      
      // Manejar fotos por separado
      let finalPhotos: string[] = []
      
      // Si hay fotos nuevas para subir
      if (photos.length > 0) {
        const uploadedPhotoPaths = await uploadPhotos(proyectoId, photos)
        // Combinar fotos existentes que se mantienen con las nuevas
        const existingPhotos = data.fotos || selectedProyecto.value?.fotos || []
        finalPhotos = [...existingPhotos, ...uploadedPhotoPaths]
      } else if (data.fotos !== undefined) {
        // Si solo se actualizaron las fotos existentes (se eliminaron algunas)
        finalPhotos = data.fotos
      } else {
        // Mantener las fotos existentes
        finalPhotos = selectedProyecto.value?.fotos || []
      }
      
      // Actualizar fotos si hay cambios
      if (JSON.stringify(finalPhotos) !== JSON.stringify(selectedProyecto.value?.fotos || [])) {
        await updateProyecto(proyectoId, { fotos: finalPhotos })
      }

      // Subir planos por tipo y actualizar unidades_tipos (persistente)
      if (Array.isArray(planosPorTipo) && planosPorTipo.some((arr) => Array.isArray(arr) && arr.length > 0)) {
        const uploadedByType = await uploadPlanosPorTipo(proyectoId, planosPorTipo)
        const currentTypes = Array.isArray(data.unidades_tipos) ? data.unidades_tipos : []
        const mergedTypes = currentTypes.map((t: any, idx: number) => {
          const existing = Array.isArray(t.planos) ? t.planos : []
          const added = Array.isArray(uploadedByType[idx]) ? uploadedByType[idx] : []
          return { ...t, planos: [...existing, ...added] }
        })
        await updateProyecto(proyectoId, { unidades_tipos: mergedTypes })
      }
    } else {
      // Crear nuevo proyecto
      const dataWithoutPhotos = { ...data }
      delete dataWithoutPhotos.fotos
      
      const created = await createProyecto(dataWithoutPhotos)
      proyectoId = created.id!

      // Subir fotos nuevas si hay alguna
      if (photos.length > 0) {
        const uploadedPhotoPaths = await uploadPhotos(proyectoId, photos)
        await updateProyecto(proyectoId, { fotos: uploadedPhotoPaths })
      }

      // Subir planos por tipo (si hay) y guardar unidades_tipos con paths
      if (Array.isArray(planosPorTipo) && planosPorTipo.some((arr) => Array.isArray(arr) && arr.length > 0)) {
        const uploadedByType = await uploadPlanosPorTipo(proyectoId, planosPorTipo)
        const currentTypes = Array.isArray(data.unidades_tipos) ? data.unidades_tipos : []
        const mergedTypes = currentTypes.map((t: any, idx: number) => {
          const existing = Array.isArray(t.planos) ? t.planos : []
          const added = Array.isArray(uploadedByType[idx]) ? uploadedByType[idx] : []
          return { ...t, planos: [...existing, ...added] }
        })
        await updateProyecto(proyectoId, { unidades_tipos: mergedTypes })
      }
    }

    showForm.value = false
    selectedProyecto.value = undefined
    await fetchProyectos()
  } catch (err: any) {
    console.error('Error al guardar proyecto:', err)
    const errorMessage = err?.message || err?.error?.message || 'Error desconocido al guardar el proyecto'
    alert(`Error al guardar el proyecto: ${errorMessage}`)
  }
}

const uploadPlanosPorTipo = async (proyectoId: string, planosPorTipo: File[][]): Promise<string[][]> => {
  const result: string[][] = [[], [], [], []]

  const { useAuth } = await import('@/composables/useAuth')
  const { currentUser } = useAuth()

  if (!currentUser.value) {
    throw new Error('Debes estar autenticado para subir planos')
  }

  // token (para mantener simetría con fotos; no se usa directamente aquí)
  await currentUser.value.getIdToken()

  for (let tipoIdx = 0; tipoIdx < Math.min(4, planosPorTipo.length); tipoIdx++) {
    const files = Array.isArray(planosPorTipo[tipoIdx]) ? planosPorTipo[tipoIdx] : []
    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop()
        const safeExt = fileExt ? fileExt.toLowerCase() : 'bin'
        const fileName = `${proyectoId}/planos/tipo-${tipoIdx + 1}/${Date.now()}-${Math.random().toString(36).substring(7)}.${safeExt}`

        const { data, error } = await supabase.storage
          .from('photos')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (error) {
          console.error('Error uploading plan:', error)
          if (error.message.includes('row-level security') || error.message.includes('policy')) {
            throw new Error('No tienes permisos para subir planos. Revisa las políticas de Storage.')
          }
          continue
        }

        result[tipoIdx].push(data.path)
      } catch (e) {
        console.error('Error uploading plan:', e)
      }
    }
  }

  return result
}

const uploadPhotos = async (proyectoId: string, photos: File[]): Promise<string[]> => {
  const uploadedPaths: string[] = []
  const { useAuth } = await import('@/composables/useAuth')
  const { currentUser } = useAuth()

  // Verificar que el usuario esté autenticado
  if (!currentUser.value) {
    throw new Error('Debes estar autenticado para subir fotos')
  }

  // Obtener el token de Firebase para validación
  const token = await currentUser.value.getIdToken()

  for (const photo of photos) {
    try {
      const fileExt = photo.name.split('.').pop()
      const fileName = `${proyectoId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      // Intentar subir con el cliente de Supabase
      // Nota: Esto requiere que las políticas de Storage permitan la inserción
      const { data, error } = await supabase.storage
        .from('photos')
        .upload(fileName, photo, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Error uploading photo:', error)
        // Si el error es de RLS, mostrar mensaje más claro
        if (error.message.includes('row-level security') || error.message.includes('policy')) {
          throw new Error('No tienes permisos para subir fotos. Asegúrate de que las políticas de Storage estén configuradas correctamente.')
        }
        continue
      }

      uploadedPaths.push(data.path)
    } catch (error) {
      console.error('Error uploading photo:', error)
      if (error instanceof Error && error.message.includes('permisos')) {
        throw error
      }
    }
  }

  return uploadedPaths
}

const deleteProyectoHandler = async (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
    try {
      await deleteProyecto(id)
      await fetchProyectos()
    } catch (err) {
      console.error('Error al eliminar proyecto:', err)
    }
  }
}

const viewDetails = (proyecto: Proyecto) => {
  if (proyecto.id) {
    router.push(`/proyectos/${proyecto.id}`)
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const getPhotoUrl = (photoPath: string): string => {
  // Si ya es una URL completa, devolverla
  if (photoPath.startsWith('http')) {
    return photoPath
  }
  // Si es una ruta de Supabase Storage, construir la URL
  const { data } = supabase.storage.from('photos').getPublicUrl(photoPath)
  return data.publicUrl
}
</script>
