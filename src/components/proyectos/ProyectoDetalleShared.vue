<template>
  <div
    class="p-4 sm:p-6"
    :class="{ 'pt-24': topPadding }"
    style="background-color: #F2F2F2"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Botón volver -->
      <button
        type="button"
        @click="router.push(backTo)"
        class="mb-6 flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
        style="color: #79358D"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        {{ backLabel }}
      </button>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <p style="color: #0D0D0D">Cargando proyecto...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- Contenido del proyecto -->
      <div v-else-if="proyecto" class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Header con imagen principal -->
        <div class="relative">
          <div v-if="proyecto.fotos && proyecto.fotos.length > 0" class="relative h-64 sm:h-96 overflow-hidden">
            <img
              :src="getPhotoUrl(proyecto.fotos[0])"
              :alt="proyecto.nombre_proyecto"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div class="flex items-center gap-3 mb-3">
                <span
                  class="px-4 py-2 rounded-full text-sm font-semibold"
                  style="background-color: #DFDCF2; color: #79358d"
                >
                  Activo
                </span>
                <span class="px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm text-white">
                  {{ proyecto.tipo_inversion }}
                </span>
              </div>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                {{ proyecto.nombre_proyecto }}
              </h1>
              <p class="text-lg sm:text-xl text-white/90">
                {{ proyecto.localizacion }}
              </p>
            </div>
          </div>
          <div v-else class="h-64 sm:h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p class="text-gray-500">Sin imagen</p>
            </div>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="p-6 sm:p-8">
          <!-- Estadísticas principales -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div class="bg-gray-50 rounded-xl p-4 sm:p-6">
              <p class="text-sm text-gray-600 mb-2">Objetivo de inversión</p>
              <p class="text-2xl sm:text-3xl font-bold" style="color: #0D0D0D">
                {{ formatCurrency(proyecto.objetivo_inversion_total) }}
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 sm:p-6">
              <p class="text-sm text-gray-600 mb-2">Progreso</p>
              <p class="text-2xl sm:text-3xl font-bold" style="color: #79358D">
                {{ proyecto.porcentaje_llegado }}%
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 sm:p-6">
              <p class="text-sm text-gray-600 mb-2">Monto restante</p>
              <p class="text-2xl sm:text-3xl font-bold" style="color: #0D0D0D">
                {{ formatCurrency(proyecto.monto_restante || 0) }}
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 sm:p-6">
              <p class="text-sm text-gray-600 mb-2">Unidades disponibles</p>
              <p class="text-2xl sm:text-3xl font-bold" style="color: #0D0D0D">
                {{ proyecto.num_lofts }}
              </p>
              <p v-if="proyecto.unidades_tipos && proyecto.unidades_tipos.length" class="text-xs text-gray-500 mt-1">
                {{ proyecto.unidades_tipos.length }} tipo(s) configurado(s)
              </p>
            </div>
          </div>

          <!-- Barra de progreso -->
          <div class="mb-8">
            <div class="flex justify-between text-sm mb-3" style="color: #0D0D0D">
              <span>Progreso de inversión</span>
              <span class="font-semibold">{{ proyecto.porcentaje_llegado }}% completado</span>
            </div>
            <div class="w-full rounded-full h-4" style="background-color: #DFDCF2">
              <div
                class="h-4 rounded-full transition-all duration-500"
                :style="`width: ${proyecto.porcentaje_llegado}%; background-color: #79358D`"
              ></div>
            </div>
          </div>

          <!-- Grid de información -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <!-- Información principal -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Detalles del proyecto -->
              <div>
                <h2 class="text-2xl font-bold mb-4" style="color: #0D0D0D">Detalles del proyecto</h2>
                <div class="space-y-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-200">
                    <span class="text-gray-600 mb-1 sm:mb-0">Precio por unidad</span>
                    <span class="font-semibold text-lg" style="color: #0D0D0D">
                      {{ formatCurrency(proyecto.precio_unidad) }}
                    </span>
                  </div>
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-200">
                    <span class="text-gray-600 mb-1 sm:mb-0">Gasto estimado comunidad</span>
                    <span class="font-semibold text-lg" style="color: #0D0D0D">
                      {{
                        proyecto.gasto_estimado_comunidad
                          ? formatCurrency(proyecto.gasto_estimado_comunidad)
                          : 'No especificado'
                      }}
                    </span>
                  </div>
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-200">
                    <span class="text-gray-600 mb-1 sm:mb-0">Término mínimo</span>
                    <span class="font-semibold text-lg" style="color: #0D0D0D"> {{ proyecto.min_termino_meses }} meses </span>
                  </div>
                  <div v-if="proyecto.permisos" class="py-3">
                    <span class="text-gray-600 block mb-2">Permisos</span>
                    <p class="text-gray-800 whitespace-pre-line">{{ proyecto.permisos }}</p>
                  </div>
                </div>
              </div>

              <!-- Tipos de unidades -->
              <div class="mt-6">
                <h2 class="text-2xl font-bold mb-4" style="color:#0D0D0D">Tipos de unidad</h2>

                <div
                  v-if="proyecto.unidades_tipos && proyecto.unidades_tipos.length"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div
                    v-for="(u, idx) in proyecto.unidades_tipos.slice(0,4)"
                    :key="idx"
                    class="rounded-xl border bg-white p-4"
                    style="border-color:#CFCEF2"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <h3 class="text-base font-semibold" style="color:#0D0D0D">
                          {{ u.nombre || `Tipo ${idx+1}` }}
                        </h3>
                        <p class="text-sm text-gray-600 mt-1">
                          <span class="font-semibold" style="color:#0D0D0D">
                            {{ formatCurrency(Number(u.precio || 0)) }}
                          </span>
                          <span v-if="u.m2" class="ml-2 text-gray-600">· {{ u.m2 }} m²</span>
                        </p>
                      </div>
                    </div>

                    <div class="mt-3">
                      <p class="text-xs text-gray-500 mb-2">Planos</p>
                      <div v-if="u.planos && u.planos.length" class="space-y-2">
                        <a
                          v-for="(p, pIdx) in u.planos"
                          :key="pIdx"
                          class="block text-sm font-semibold hover:opacity-80"
                          style="color:#79358D"
                          :href="getPhotoUrl(p)"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver plano {{ pIdx + 1 }}
                        </a>
                      </div>
                      <p v-else class="text-sm text-gray-600">Sin planos adjuntos.</p>
                    </div>
                  </div>
                </div>

                <div v-else class="rounded-xl border p-4 text-sm text-gray-600" style="border-color:#DFDCF2">
                  No hay tipos de unidad configurados.
                </div>
              </div>

              <!-- Comodidades / complementos -->
              <div class="mt-6">
                <h2 class="text-2xl font-bold mb-4" style="color: #0D0D0D">Comodidades</h2>

                <div v-if="proyecto.comodidades && proyecto.comodidades.length > 0" class="space-y-4">
                  <div
                    v-for="group in amenityGroups"
                    :key="group.title"
                    class="rounded-xl border p-4 bg-white"
                    style="border-color: #CFCEF2"
                  >
                    <div class="mb-3">
                      <h3 class="text-base font-semibold" style="color: #0D0D0D">{{ group.title }}</h3>
                      <p v-if="group.subtitle" class="text-xs text-gray-500 mt-1">{{ group.subtitle }}</p>
                    </div>

                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="item in group.items.filter(i => proyecto!.comodidades!.includes(i.key))"
                        :key="item.key"
                        class="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm border"
                        style="border-color: #DFDCF2; background-color: #F7F7FB; color: #0D0D0D"
                      >
                        <span class="w-4 h-4" style="color: #79358D" v-html="getAmenityIconSvg(item.key)"></span>
                        <span class="leading-none">{{ item.label }}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div v-else class="rounded-xl border p-4 text-sm text-gray-600" style="border-color: #DFDCF2">
                  No hay comodidades registradas para este proyecto.
                </div>
              </div>

              <!-- Mapa de localización -->
              <div v-if="proyecto.localizacion">
                <h2 class="text-2xl font-bold mb-4" style="color: #0D0D0D">Ubicación</h2>
                <div class="rounded-lg overflow-hidden shadow-md">
                  <div class="relative">
                    <!-- Fallback SIEMPRE visible (no requiere API key) -->
                    <iframe
                      class="w-full h-64 sm:h-80 md:h-96"
                      :src="mapsEmbedUrl"
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>

                    <!-- Mapa interactivo (si carga Google Maps) -->
                    <div
                      ref="mapContainer"
                      class="absolute inset-0 w-full h-full"
                      v-show="mapState === 'ready'"
                    ></div>

                    <div
                      v-if="mapState === 'loading'"
                      class="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center"
                    >
                      <span class="text-sm text-gray-700">Cargando mapa interactivo…</span>
                    </div>
                  </div>
                </div>
                <p class="mt-3 text-sm text-gray-600">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {{ proyecto.localizacion }}
                </p>
                <div class="mt-2 flex items-center gap-3">
                  <a
                    class="text-sm font-semibold hover:opacity-80"
                    style="color:#79358D"
                    :href="mapsOpenUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir en Google Maps
                  </a>
                  <span v-if="mapErrorMessage" class="text-xs text-gray-500"> ({{ mapErrorMessage }}) </span>
                </div>
              </div>

              <!-- Galería de fotos -->
              <div v-if="proyecto.fotos && proyecto.fotos.length > 0" class="mt-6">
                <h2 class="text-2xl font-bold mb-4" style="color: #0D0D0D">Galería de fotos</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div
                    v-for="(photo, index) in proyecto.fotos"
                    :key="index"
                    class="relative group cursor-pointer"
                    @click="openLightbox(index)"
                  >
                    <img
                      :src="getPhotoUrl(photo)"
                      :alt="`Foto ${index + 1} de ${proyecto.nombre_proyecto}`"
                      class="w-full h-32 sm:h-48 object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-colors"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar con información adicional -->
            <div class="space-y-6">
              <!-- Resumen de inversión -->
              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-4" style="color: #0D0D0D">Resumen</h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Tipo de inversión</span>
                    <span class="font-semibold" style="color: #0D0D0D">{{ proyecto.tipo_inversion }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Lofts disponibles</span>
                    <span class="font-semibold" style="color: #0D0D0D">{{ proyecto.num_lofts }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Localización</span>
                    <span class="font-semibold text-right" style="color: #0D0D0D">{{ proyecto.localizacion }}</span>
                  </div>
                </div>
              </div>

              <!-- Fechas -->
              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-4" style="color: #0D0D0D">Información</h3>
                <div class="space-y-3 text-sm">
                  <div>
                    <span class="text-gray-600 block">Creado</span>
                    <span class="font-semibold" style="color: #0D0D0D"> {{ formatDate(proyecto.created_at) }} </span>
                  </div>
                  <div v-if="proyecto.updated_at">
                    <span class="text-gray-600 block">Última actualización</span>
                    <span class="font-semibold" style="color: #0D0D0D"> {{ formatDate(proyecto.updated_at) }} </span>
                  </div>
                </div>
              </div>

              <!-- Acciones -->
              <div class="flex flex-col gap-3">
                <button
                  v-if="mode === 'admin'"
                  @click="editProyecto"
                  class="w-full px-6 py-3 text-white rounded-lg transition-colors font-semibold hover:opacity-90"
                  style="background-color: #79358D"
                >
                  Editar proyecto
                </button>

                <button
                  v-else
                  type="button"
                  @click="router.push('/signin')"
                  class="w-full px-6 py-3 text-white rounded-lg transition-colors font-semibold hover:opacity-90"
                  style="background-color: #79358D"
                >
                  Iniciar sesión para invertir
                </button>

                <button
                  type="button"
                  @click="taxModalOpen = true"
                  class="w-full px-6 py-3 border-2 rounded-lg transition-colors font-semibold hover:opacity-90"
                  style="border-color: #79358D; color: #79358D"
                >
                  Simular desgravación
                </button>

                <button
                  v-if="mode === 'admin'"
                  @click="deleteProyecto"
                  class="w-full px-6 py-3 border-2 rounded-lg transition-colors font-semibold hover:opacity-70"
                  style="border-color: #CFCEF2; color: #0D0D0D"
                >
                  Eliminar proyecto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal fullscreen simulador desgravación -->
  <div v-if="taxModalOpen" class="fixed inset-0 z-50 bg-white" role="dialog" aria-modal="true">
    <!-- Header fijo -->
    <div class="sticky top-0 z-10 border-b bg-white/90 backdrop-blur" style="border-color:#CFCEF2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-start justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold" style="color:#0D0D0D">Simulador desgravación (Ley Startups)</h2>
          <p class="text-sm text-gray-600 mt-1">Elige años (por defecto 5), ajusta topes y reparto.</p>
        </div>
        <button
          type="button"
          class="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          aria-label="Cerrar"
          @click="taxModalOpen = false"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Contenido scroll -->
    <div class="h-[calc(100vh-72px)] overflow-y-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div
          v-if="proyecto?.unidades_tipos && proyecto.unidades_tipos.length"
          class="mb-4 rounded-xl border p-4"
          style="border-color:#DFDCF2; background:#F7F7FB"
        >
          <label class="block text-xs font-medium text-gray-600 mb-2">Tipo de unidad para simular</label>
          <select
            v-model.number="selectedUnidadTipoIndex"
            class="w-full sm:w-auto px-3 py-2 rounded-lg border bg-white text-sm"
            style="border-color:#CFCEF2"
          >
            <option :value="-1">Precio base (proyecto)</option>
            <option v-for="(u, idx) in proyecto.unidades_tipos.slice(0,4)" :key="idx" :value="idx">
              {{ u.nombre || `Tipo ${idx+1}` }} — {{ formatCurrency(Number(u.precio || 0)) }}
            </option>
          </select>
        </div>

        <StartupTaxSimulator :default-investment="selectedUnidadPrecio" />
      </div>
    </div>
  </div>

  <!-- Lightbox para fotos -->
  <div
    v-if="lightboxOpen && proyecto?.fotos && proyecto.fotos.length > 0"
    class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    @click="closeLightbox"
  >
    <div class="relative max-w-4xl max-h-full" @click.stop>
      <!-- Botón cerrar -->
      <button
        @click="closeLightbox"
        class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Cerrar"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Botón anterior -->
      <button
        @click="previousPhoto"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
        aria-label="Foto anterior"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Botón siguiente -->
      <button
        @click="nextPhoto"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
        aria-label="Siguiente foto"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Imagen -->
      <img
        :src="getPhotoUrl(proyecto.fotos[currentPhotoIndex])"
        :alt="`Foto ${currentPhotoIndex + 1} de ${proyecto.nombre_proyecto}`"
        class="max-w-full max-h-[80vh] object-contain rounded-lg"
      />

      <!-- Contador -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {{ currentPhotoIndex + 1 }} / {{ proyecto.fotos.length }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProyectos } from '@/composables/useProyectos'
import type { Proyecto } from '@/types/proyecto'
import { supabase } from '@/config/supabase'
import { loadGoogleMapsPlaces } from '@/utils/loadGoogleMaps'
import { amenityGroups, getAmenityIconSvg } from '@/utils/amenities'
import StartupTaxSimulator from '@/components/proyectos/StartupTaxSimulator.vue'
import { fetchPublicProyectoById } from '@/utils/publicProyectos'

const props = withDefaults(
  defineProps<{
    mode?: 'admin' | 'public'
    backTo?: string
    backLabel?: string
    topPadding?: boolean
    proyectoId?: string
  }>(),
  {
    mode: 'admin',
    backTo: '/proyectos',
    backLabel: 'Volver a proyectos',
    topPadding: false,
    proyectoId: undefined,
  }
)

const mode = computed(() => props.mode)
const backTo = computed(() => props.backTo)
const backLabel = computed(() => props.backLabel)
const topPadding = computed(() => props.topPadding)

const route = useRoute()
const router = useRouter()
const { fetchProyectoById, deleteProyecto: deleteProyectoFunc } = useProyectos()

const proyecto = ref<Proyecto | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const lightboxOpen = ref(false)
const taxModalOpen = ref(false)
const selectedUnidadTipoIndex = ref<number>(-1)
const currentPhotoIndex = ref(0)
const mapContainer = ref<HTMLDivElement | null>(null)
const mapState = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const mapErrorMessage = ref<string | null>(null)
let map: any = null
let geocoder: any = null
let marker: any = null

// Manejar navegación con teclado en lightbox
let keyPressHandler: ((e: KeyboardEvent) => void) | null = null

const resolveProyectoId = (): string | null => {
  const fromProp = (props.proyectoId || '').trim()
  if (fromProp) return fromProp
  const fromRoute = route.params.id as string
  return fromRoute || null
}

onMounted(async () => {
  const proyectoId = resolveProyectoId()
  if (proyectoId) {
    await loadProyecto(proyectoId)
  } else {
    error.value = 'ID de proyecto no válido'
    loading.value = false
  }

  // Configurar manejador de teclado para lightbox
  keyPressHandler = (e: KeyboardEvent) => {
    if (taxModalOpen.value && e.key === 'Escape') {
      taxModalOpen.value = false
      return
    }
    if (lightboxOpen.value) {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowRight') {
        nextPhoto()
      } else if (e.key === 'ArrowLeft') {
        previousPhoto()
      }
    }
  }
  window.addEventListener('keydown', keyPressHandler)
})

const loadProyecto = async (id: string) => {
  loading.value = true
  error.value = null
  try {
    const data =
      mode.value === 'public' ? await fetchPublicProyectoById(id) : await fetchProyectoById(id)

    if (data) {
      proyecto.value = data
      // Cargar mapa después de que el proyecto esté cargado
      await nextTick()
      if (data.localizacion) {
        await loadGoogleMaps()
      }
    } else {
      error.value = 'Proyecto no encontrado'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al cargar el proyecto'
  } finally {
    loading.value = false
  }
}

const loadGoogleMaps = async () => {
  try {
    mapState.value = 'loading'
    mapErrorMessage.value = null
    await loadGoogleMapsPlaces()
    initMap()

    // Si por cualquier motivo no llega callback de geocode, pasamos a fallback
    window.setTimeout(() => {
      if (mapState.value === 'loading') {
        mapState.value = 'error'
        mapErrorMessage.value = 'No se pudo cargar el mapa interactivo (mostrando mapa básico)'
      }
    }, 6000)
  } catch (e) {
    console.warn('Google Places API Key no configurada o fallo cargando Maps. Se usará fallback.', e)
    mapState.value = 'error'
    mapErrorMessage.value = 'Mapa interactivo no disponible (mostrando mapa básico)'
  }
}

const initMap = () => {
  if (!mapContainer.value || !proyecto.value?.localizacion) return

  // Inicializar geocoder
  const g = (window as any).google
  if (!g?.maps) {
    mapState.value = 'error'
    mapErrorMessage.value = 'Google Maps no cargó'
    return
  }
  geocoder = new g.maps.Geocoder()

  // Configuración inicial del mapa
  const mapOptions: any = {
    zoom: 15,
    center: { lat: 40.4168, lng: -3.7038 }, // Centro por defecto (Madrid)
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  }

  map = new g.maps.Map(mapContainer.value, mapOptions)

  // Geocodificar la dirección
  geocoder.geocode({ address: proyecto.value.localizacion }, (results: any, status: any) => {
    if (status === 'OK' && results && results[0]) {
      const location = results[0].geometry.location

      // Centrar el mapa en la ubicación
      map?.setCenter(location)

      // Añadir marcador
      marker = new g.maps.Marker({
        map: map,
        position: location,
        title: proyecto.value?.nombre_proyecto || 'Proyecto',
        animation: g.maps.Animation.DROP,
      })

      // Info window con información del proyecto
      const infoWindow = new g.maps.InfoWindow({
        content: `
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #0D0D0D;">
                ${proyecto.value?.nombre_proyecto || 'Proyecto'}
              </h3>
              <p style="margin: 0; color: #666; font-size: 14px;">
                ${proyecto.value?.localizacion || ''}
              </p>
            </div>
          `,
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })

      mapState.value = 'ready'
    } else {
      console.error('Geocodificación fallida:', status)
      mapState.value = 'error'
      mapErrorMessage.value = `Mapa interactivo: no se pudo localizar (${status})`
    }
  })
}

const mapsEmbedUrl = computed(() => {
  const q = encodeURIComponent(proyecto.value?.localizacion || '')
  return `https://www.google.com/maps?q=${q}&output=embed`
})

const mapsOpenUrl = computed(() => {
  const q = encodeURIComponent(proyecto.value?.localizacion || '')
  return `https://www.google.com/maps?q=${q}`
})

const selectedUnidadPrecio = computed(() => {
  const base = Number(proyecto.value?.precio_unidad || 0)
  const idx = Number(selectedUnidadTipoIndex.value)
  if (idx < 0) return base
  const tipos = proyecto.value?.unidades_tipos
  if (!tipos || !Array.isArray(tipos) || !tipos[idx]) return base
  return Number((tipos[idx] as any).precio || base)
})

watch(
  () => taxModalOpen.value,
  (open) => {
    if (open) {
      selectedUnidadTipoIndex.value = -1
    }
  }
)

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A'
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

const getPhotoUrl = (photoPath: string): string => {
  if (photoPath.startsWith('http')) {
    return photoPath
  }
  const { data } = supabase.storage.from('photos').getPublicUrl(photoPath)
  return data.publicUrl
}

const openLightbox = (index: number) => {
  currentPhotoIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextPhoto = () => {
  if (proyecto.value?.fotos && currentPhotoIndex.value < proyecto.value.fotos.length - 1) {
    currentPhotoIndex.value++
  } else if (proyecto.value?.fotos) {
    currentPhotoIndex.value = 0
  }
}

const previousPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  } else if (proyecto.value?.fotos) {
    currentPhotoIndex.value = proyecto.value.fotos.length - 1
  }
}

const editProyecto = () => {
  if (mode.value !== 'admin') return
  if (proyecto.value?.id) {
    router.push({
      path: '/proyectos',
      query: { edit: proyecto.value.id },
    })
  }
}

const deleteProyecto = async () => {
  if (mode.value !== 'admin') return
  if (!proyecto.value?.id) return

  if (confirm('¿Estás seguro de que quieres eliminar este proyecto? Esta acción no se puede deshacer.')) {
    try {
      await deleteProyectoFunc(proyecto.value.id)
      router.push('/proyectos')
    } catch (err) {
      console.error('Error al eliminar proyecto:', err)
      alert('Error al eliminar el proyecto')
    }
  }
}

onUnmounted(() => {
  if (keyPressHandler) {
    window.removeEventListener('keydown', keyPressHandler)
  }
  // Limpiar mapa
  if (marker) {
    marker.setMap(null)
  }
  map = null
  geocoder = null
  marker = null
})
</script>

<style scoped>
/* Animaciones suaves para el lightbox */
img {
  transition: transform 0.3s ease;
}
</style>

