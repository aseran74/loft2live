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
            style="background-color: #D92211"
          >
            + Nuevo Proyecto
          </button>
        </div>

        <!-- Filtros + mapa -->
        <div v-if="proyectos.length > 0" class="mb-6 space-y-4">
          <div class="bg-white rounded-2xl shadow p-5">
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-lg font-bold" style="color:#0D0D0D">Filtros</h2>
              <button
                type="button"
                class="text-sm font-semibold hover:opacity-80"
                style="color:#D92211"
                @click="resetFilters"
              >
                Limpiar filtros
              </button>
            </div>

            <!-- Precio por loft (pantalla completa) -->
            <div class="mt-4 rounded-2xl border p-5" style="border-color:#C8D9B0">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 class="text-base font-bold" style="color:#0D0D0D">Precio por loft</h3>
                  <p class="text-xs text-gray-500 mt-0.5">
                    Rango disponible: {{ formatCurrency(priceRangeMin) }} – {{ formatCurrency(priceRangeMax) }}
                  </p>
                </div>

                <div class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold" style="background:#F2F2F2; color:#0D0D0D; border:1px solid #C8D9B0">
                    {{ formatCurrency(precioMinValue) }} – {{ formatCurrency(precioMaxValue) }}
                  </span>
                </div>
              </div>

              <div class="mt-4">
                <!-- Doble slider (min/max) -->
                <div class="relative h-10">
                  <input
                    v-model.number="precioMinValue"
                    type="range"
                    class="absolute inset-0 w-full"
                    :min="priceRangeMin"
                    :max="priceRangeMax"
                    :step="priceStep"
                    aria-label="Precio mínimo por loft"
                  />
                  <input
                    v-model.number="precioMaxValue"
                    type="range"
                    class="absolute inset-0 w-full"
                    :min="priceRangeMin"
                    :max="priceRangeMax"
                    :step="priceStep"
                    aria-label="Precio máximo por loft"
                  />
                </div>

                <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>{{ formatCurrency(priceRangeMin) }}</span>
                  <span>{{ formatCurrency(priceRangeMax) }}</span>
                </div>
              </div>
            </div>

            <div class="mt-4 text-sm text-gray-600">
              Mostrando <span class="font-semibold" style="color:#0D0D0D">{{ filteredProyectos.length }}</span>
              de {{ proyectos.length }} proyectos.
            </div>
          </div>

          <!-- Mapa proyectos filtrados -->
          <div class="bg-white rounded-2xl shadow p-5">
            <div class="flex items-center justify-between gap-4 mb-3">
              <h2 class="text-lg font-bold" style="color:#0D0D0D">Mapa</h2>
              <span v-if="mapErrorMessage" class="text-xs text-gray-500">({{ mapErrorMessage }})</span>
            </div>

            <div class="rounded-xl overflow-hidden border" style="border-color:#C8D9B0">
              <div class="relative">
                <!-- Fallback: lista de enlaces -->
                <div
                  v-show="mapState !== 'ready'"
                  class="w-full h-72 sm:h-80 md:h-96 bg-gray-50 p-4 overflow-auto"
                >
                  <div class="text-sm text-gray-700">
                    <span v-if="mapState === 'loading'">Cargando mapa…</span>
                    <span v-else>Mapa interactivo no disponible. Usa los enlaces:</span>
                  </div>
                  <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      v-for="p in filteredProyectos"
                      :key="p.id"
                      class="text-sm font-semibold hover:opacity-80"
                      style="color:#D92211"
                      :href="getMapsOpenUrl(p.localizacion)"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ p.nombre_proyecto }} — {{ p.localizacion }}
                    </a>
                  </div>
                </div>

                <!-- Mapa interactivo -->
                <div
                  ref="mapListContainer"
                  class="w-full h-72 sm:h-80 md:h-96"
                  v-show="mapState === 'ready'"
                ></div>
              </div>
            </div>
          </div>
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

      <div v-else-if="filteredProyectos.length === 0" class="text-center py-12">
        <p style="color: #0D0D0D">No hay proyectos que coincidan con los filtros.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="proyecto in filteredProyectos"
          :key="proyecto.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div class="p-5">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: #C8D9B0; color: #D92211">
                Activo
              </span>
              <div class="flex gap-2">
                <button
                  @click="editProyecto(proyecto)"
                  class="text-sm px-3 py-1 rounded transition-colors"
                  style="background-color: #C8D9B0; color: #0D0D0D"
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
            <div v-if="getMainPhotoPath(proyecto)" class="mb-4">
              <img
                :src="getPhotoUrl(getMainPhotoPath(proyecto))"
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
              <div class="flex justify-between">
                <span style="color: #0D0D0D">Precio/loft:</span>
                <span class="font-semibold" style="color: #0D0D0D">{{ formatCurrency(Number(proyecto.precio_unidad || 0)) }}</span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mb-4">
              <div class="flex justify-between text-xs mb-2" style="color: #0D0D0D">
                <span>{{ formatCurrency(proyecto.monto_restante || 0) }} restantes</span>
                <span>{{ proyecto.porcentaje_llegado }}%</span>
              </div>
              <div class="w-full rounded-full h-2" style="background-color: #C8D9B0">
                <div
                  class="h-2 rounded-full"
                  :style="`width: ${proyecto.porcentaje_llegado}%; background-color: #D92211`"
                ></div>
              </div>
            </div>

            <button
              @click="viewDetails(proyecto)"
              class="w-full px-4 py-2 text-white rounded-lg transition-colors font-semibold hover:opacity-90"
              style="background-color: #D92211"
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
import { ref, onMounted, computed, watch, nextTick, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProyectos } from '@/composables/useProyectos'
import ProyectoForm from '@/components/proyectos/ProyectoForm.vue'
import type { Proyecto } from '@/types/proyecto'
import { supabase } from '@/config/supabase'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { loadGoogleMapsPlaces } from '@/utils/loadGoogleMaps'

const router = useRouter()
const route = useRoute()

const { proyectos, loading, error, fetchProyectos, createProyecto, updateProyecto, deleteProyecto } = useProyectos()

const showForm = ref(false)
const selectedProyecto = ref<Proyecto | undefined>(undefined)

// Filtros
const precioMinValue = ref<number>(0)
const precioMaxValue = ref<number>(0)

const priceRangeMin = computed(() => {
  const values = proyectos.value.map((p) => Number(p.precio_unidad || 0)).filter((n) => Number.isFinite(n) && n > 0)
  return values.length ? Math.min(...values) : 0
})
const priceRangeMax = computed(() => {
  const values = proyectos.value.map((p) => Number(p.precio_unidad || 0)).filter((n) => Number.isFinite(n) && n > 0)
  return values.length ? Math.max(...values) : 0
})

const priceStep = computed(() => {
  // Escalón “bonito” para sliders, evitando pasos demasiado pequeños
  const span = Math.max(0, priceRangeMax.value - priceRangeMin.value)
  if (span <= 0) return 1000
  return 1000
})

const filteredProyectos = computed(() => {
  const min = Number.isFinite(precioMinValue.value) ? precioMinValue.value : null
  const max = Number.isFinite(precioMaxValue.value) ? precioMaxValue.value : null

  return (proyectos.value || []).filter((p) => {
    const price = Number(p.precio_unidad || 0)
    if (min != null && Number.isFinite(min) && price && price < min) return false
    if (max != null && Number.isFinite(max) && price && price > max) return false

    return true
  })
})

const resetFilters = () => {
  precioMinValue.value = priceRangeMin.value
  precioMaxValue.value = priceRangeMax.value
}

// Mapa (lista)
const mapListContainer = ref<HTMLDivElement | null>(null)
const mapState = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const mapErrorMessage = ref<string | null>(null)
let map: any = null
let geocoder: any = null
let markers: any[] = []
const geocodeCache = new Map<string, { lat: number; lng: number }>()

const getMapsOpenUrl = (localizacion: string) => {
  const q = encodeURIComponent(localizacion || '')
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}

const clearMarkers = () => {
  for (const m of markers) {
    try {
      m.setMap(null)
    } catch {}
  }
  markers = []
}

const initListMap = async () => {
  if (!mapListContainer.value) return

  mapState.value = 'loading'
  mapErrorMessage.value = null

  try {
    await loadGoogleMapsPlaces()
    const g = (window as any).google
    if (!g?.maps) throw new Error('Google Maps no cargó')

    geocoder = new g.maps.Geocoder()
    map = new g.maps.Map(mapListContainer.value, {
      zoom: 6,
      center: { lat: 40.4168, lng: -3.7038 },
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
      ],
    })

    mapState.value = 'ready'
    await updateMarkers()
  } catch (e: any) {
    console.warn('No se pudo cargar el mapa de proyectos:', e)
    mapState.value = 'error'
    mapErrorMessage.value = e?.message || 'Mapa no disponible'
  }
}

const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  const key = (address || '').trim()
  if (!key) return null
  if (geocodeCache.has(key)) return geocodeCache.get(key)!

  const g = (window as any).google
  if (!geocoder || !g?.maps) return null

  const result = await new Promise<{ lat: number; lng: number } | null>((resolve) => {
    geocoder.geocode({ address: key }, (results: any, status: any) => {
      if (status === 'OK' && results && results[0]) {
        const loc = results[0].geometry.location
        const pos = { lat: loc.lat(), lng: loc.lng() }
        resolve(pos)
      } else {
        resolve(null)
      }
    })
  })

  if (result) geocodeCache.set(key, result)
  return result
}

const updateMarkers = async () => {
  if (mapState.value !== 'ready' || !map) return

  clearMarkers()

  const g = (window as any).google
  const bounds = new g.maps.LatLngBounds()

  // Geocode secuencial (pocos proyectos) para evitar límites agresivos
  for (const p of filteredProyectos.value) {
    const pos = await geocodeAddress(p.localizacion)
    if (!pos) continue

    const marker = new g.maps.Marker({
      map,
      position: pos,
      title: p.nombre_proyecto,
    })

    const infoWindow = new g.maps.InfoWindow({
      content: `
        <div style="padding:10px; max-width:260px;">
          <div style="font-weight:700; margin-bottom:6px;">${p.nombre_proyecto}</div>
          <div style="color:#666; font-size:12px; margin-bottom:6px;">${p.localizacion}</div>
          <div style="font-size:12px;"><b>Precio/loft:</b> ${formatCurrency(Number(p.precio_unidad || 0))}</div>
        </div>
      `,
    })
    marker.addListener('click', () => infoWindow.open(map, marker))

    markers.push(marker)
    bounds.extend(pos as any)
  }

  if (markers.length > 0) {
    map.fitBounds(bounds)
    // Un pequeño zoom-out para que no quede demasiado cerca
    window.setTimeout(() => {
      try {
        const z = map.getZoom()
        if (typeof z === 'number' && z > 14) map.setZoom(14)
      } catch {}
    }, 200)
  }
}

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

watch(
  () => [filteredProyectos.value.length, precioMinValue.value, precioMaxValue.value],
  async () => {
    if (!mapListContainer.value) return
    if (mapState.value === 'idle') {
      await nextTick()
      await initListMap()
    } else {
      await updateMarkers()
    }
  },
  { immediate: true }
)

// Inicializar y mantener consistencia del rango (min <= max)
watch(
  () => [priceRangeMin.value, priceRangeMax.value],
  ([min, max]) => {
    if (min === 0 && max === 0) return
    if (!precioMinValue.value && !precioMaxValue.value) {
      precioMinValue.value = min
      precioMaxValue.value = max
      return
    }
    // Clamp al rango disponible
    precioMinValue.value = Math.min(Math.max(precioMinValue.value, min), max)
    precioMaxValue.value = Math.min(Math.max(precioMaxValue.value, min), max)
    if (precioMinValue.value > precioMaxValue.value) {
      const mid = Math.round((precioMinValue.value + precioMaxValue.value) / 2)
      precioMinValue.value = Math.min(mid, precioMaxValue.value)
      precioMaxValue.value = Math.max(mid, precioMinValue.value)
    }
  },
  { immediate: true }
)

watch(
  () => [precioMinValue.value, precioMaxValue.value],
  ([min, max]) => {
    if (min > max) {
      // Si el usuario cruza los sliders, reordenamos
      precioMinValue.value = max
      precioMaxValue.value = min
    }
  }
)

onUnmounted(() => {
  clearMarkers()
})

const editProyecto = (proyecto: Proyecto) => {
  selectedProyecto.value = proyecto
  showForm.value = true
}

const handleSubmit = async (
  data: Omit<Proyecto, 'id' | 'created_at' | 'updated_at'>,
  photos: File[] = [],
  planosPorTipo: File[][] = [],
  photosOficinaActual: File[] = [],
  photosOficinaRemodelada: File[] = []
) => {
  try {
    let proyectoId: string
    const dataWithoutPhotos = { ...data }
    delete dataWithoutPhotos.fotos
    delete dataWithoutPhotos.fotos_oficina_actual
    delete dataWithoutPhotos.fotos_oficina_remodelada

    if (selectedProyecto.value?.id) {
      // Actualizar proyecto existente
      const updated = await updateProyecto(selectedProyecto.value.id, dataWithoutPhotos)
      proyectoId = updated.id!
      
      // Fotos galería general
      let finalPhotos: string[] = []
      if (photos.length > 0) {
        const uploadedPhotoPaths = await uploadPhotos(proyectoId, photos)
        const existingPhotos = data.fotos || selectedProyecto.value?.fotos || []
        finalPhotos = [...existingPhotos, ...uploadedPhotoPaths]
      } else if (data.fotos !== undefined) {
        finalPhotos = data.fotos
      } else {
        finalPhotos = selectedProyecto.value?.fotos || []
      }
      if (JSON.stringify(finalPhotos) !== JSON.stringify(selectedProyecto.value?.fotos || [])) {
        await updateProyecto(proyectoId, { fotos: finalPhotos })
      }

      // Fotos oficina actual
      let finalOficinaActual: string[] = data.fotos_oficina_actual ?? selectedProyecto.value?.fotos_oficina_actual ?? []
      if (photosOficinaActual.length > 0) {
        const uploaded = await uploadPhotosToFolder(proyectoId, photosOficinaActual, 'oficina_actual')
        finalOficinaActual = [...finalOficinaActual, ...uploaded]
      }
      if (JSON.stringify(finalOficinaActual) !== JSON.stringify(selectedProyecto.value?.fotos_oficina_actual || [])) {
        await updateProyecto(proyectoId, { fotos_oficina_actual: finalOficinaActual })
      }

      // Fotos oficina remodelada
      let finalOficinaRemodelada: string[] = data.fotos_oficina_remodelada ?? selectedProyecto.value?.fotos_oficina_remodelada ?? []
      if (photosOficinaRemodelada.length > 0) {
        const uploaded = await uploadPhotosToFolder(proyectoId, photosOficinaRemodelada, 'oficina_remodelada')
        finalOficinaRemodelada = [...finalOficinaRemodelada, ...uploaded]
      }
      if (JSON.stringify(finalOficinaRemodelada) !== JSON.stringify(selectedProyecto.value?.fotos_oficina_remodelada || [])) {
        await updateProyecto(proyectoId, { fotos_oficina_remodelada: finalOficinaRemodelada })
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
      const created = await createProyecto(dataWithoutPhotos)
      proyectoId = created.id!

      if (photos.length > 0) {
        const uploadedPhotoPaths = await uploadPhotos(proyectoId, photos)
        await updateProyecto(proyectoId, { fotos: uploadedPhotoPaths })
      }
      if (photosOficinaActual.length > 0) {
        const uploaded = await uploadPhotosToFolder(proyectoId, photosOficinaActual, 'oficina_actual')
        await updateProyecto(proyectoId, { fotos_oficina_actual: uploaded })
      }
      if (photosOficinaRemodelada.length > 0) {
        const uploaded = await uploadPhotosToFolder(proyectoId, photosOficinaRemodelada, 'oficina_remodelada')
        await updateProyecto(proyectoId, { fotos_oficina_remodelada: uploaded })
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

const uploadPhotosToFolder = async (proyectoId: string, photos: File[], folder: string): Promise<string[]> => {
  const uploadedPaths: string[] = []
  const { useAuth } = await import('@/composables/useAuth')
  const { currentUser } = useAuth()
  if (!currentUser.value) {
    throw new Error('Debes estar autenticado para subir fotos')
  }
  await currentUser.value.getIdToken()
  for (const photo of photos) {
    try {
      const fileExt = photo.name.split('.').pop()
      const ext = fileExt ? fileExt.toLowerCase() : 'jpg'
      const fileName = `${proyectoId}/${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
      const { data, error } = await supabase.storage
        .from('photos')
        .upload(fileName, photo, { cacheControl: '3600', upsert: false })
      if (error) {
        console.error('Error uploading photo:', error)
        if (error.message.includes('row-level security') || error.message.includes('policy')) {
          throw new Error('No tienes permisos para subir fotos.')
        }
        continue
      }
      uploadedPaths.push(data.path)
    } catch (err) {
      console.error('Error uploading photo:', err)
      if (err instanceof Error && err.message.includes('permisos')) throw err
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

const getMainPhotoPath = (proyecto: Proyecto): string => {
  return (
    proyecto?.fotos?.[0] ??
    proyecto?.fotos_oficina_remodelada?.[0] ??
    proyecto?.fotos_oficina_actual?.[0] ??
    ''
  )
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
