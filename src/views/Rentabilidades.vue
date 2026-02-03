<template>
  <full-screen-layout>
    <landing-header />

    <section class="pt-24 pb-12" style="background-color:#F2F2F2">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex flex-col gap-2 mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold" style="color:#0D0D0D">Rentabilidades</h1>
          <p class="text-lg text-gray-600">
            Proyectos vendidos y cerrados. Consulta el historial de inversiones finalizadas.
          </p>
        </div>

        <!-- Lo alquilado: ingresos y rentabilidad por ticket -->
        <div v-if="proyectosConAlquileres.length > 0" class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div class="px-6 py-4 border-b" style="border-color:#C8D9B0">
            <h2 class="text-xl font-bold" style="color:#0D0D0D">Lo alquilado</h2>
            <p class="text-sm text-gray-600 mt-1">
              Lofts actualmente alquilados, ingresos mensuales y rentabilidad por ticket de 5.000 €
            </p>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proyecto</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lofts alquilados</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos / mes</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rentabilidad por ticket</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="item in proyectosConAlquileres"
                  :key="item.proyecto.id"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-semibold" style="color:#0D0D0D">{{ item.proyecto.nombre_proyecto }}</div>
                    <div class="text-xs text-gray-500 mt-0.5" v-if="item.detalleAlquileres.length">
                      <template v-for="(d, i) in item.detalleAlquileres" :key="i">
                        {{ d.nombre }}: {{ d.alquilados }} × {{ formatCurrency(d.precio_alquiler) }}/mes
                        <span v-if="i < item.detalleAlquileres.length - 1"> · </span>
                      </template>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {{ item.totalAlquilados }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold" style="color:#2793F2">
                    {{ formatCurrency(item.ingresosMensualesTotales) }}/mes
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {{ item.numTickets }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-bold" style="color:#0D0D0D">
                    {{ formatCurrency(item.rentabilidadPorTicket) }}/mes
                    <span class="text-xs font-normal text-gray-500">por ticket</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="px-6 py-3 bg-gray-50 text-xs text-gray-600">
            Rentabilidad por ticket = Ingresos mensuales totales ÷ Número de tickets (objetivo inversión ÷ 5.000 €)
          </div>
        </div>

        <!-- Filtros -->
        <div v-if="proyectos.length > 0" class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 class="text-xl font-bold mb-1" style="color:#0D0D0D">Búsqueda</h2>
              <p class="text-sm text-gray-600">Filtra por localización y rango de precio por loft</p>
            </div>
            <button
              type="button"
              class="px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity"
              style="background-color: #C8D9B0; color: #2793F2"
              @click="resetFilters"
            >
              Limpiar filtros
            </button>
          </div>

          <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="rounded-xl border p-4" style="border-color:#C8D9B0">
              <label class="block text-xs text-gray-600 mb-2">Localización</label>
              <input
                v-model="queryLocalizacion"
                type="text"
                class="w-full px-3 py-2 rounded-lg border bg-white text-sm"
                style="border-color:#C8D9B0"
                placeholder="Málaga, Madrid, Valencia…"
              />
            </div>

            <div class="rounded-xl border p-4 lg:col-span-2" style="border-color:#C8D9B0">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div class="text-xs text-gray-600">Precio por loft</div>
                  <div class="text-sm font-semibold" style="color:#0D0D0D">
                    {{ formatCurrency(precioMinValue) }} – {{ formatCurrency(precioMaxValue) }}
                  </div>
                </div>
                <div class="text-xs text-gray-500">
                  Rango: {{ formatCurrency(priceRangeMin) }} – {{ formatCurrency(priceRangeMax) }}
                </div>
              </div>

              <div class="mt-3 relative h-10">
                <input
                  v-model.number="precioMinValue"
                  type="range"
                  class="absolute inset-0 w-full"
                  :min="priceRangeMin"
                  :max="priceRangeMax"
                  :step="1000"
                  aria-label="Precio mínimo por loft"
                />
                <input
                  v-model.number="precioMaxValue"
                  type="range"
                  class="absolute inset-0 w-full"
                  :min="priceRangeMin"
                  :max="priceRangeMax"
                  :step="1000"
                  aria-label="Precio máximo por loft"
                />
              </div>
            </div>
          </div>

          <div class="mt-5 pt-4 border-t flex items-center justify-between" style="border-color: #C8D9B0">
            <div class="text-sm text-gray-600">
              Mostrando <span class="font-bold text-lg" style="color:#2793F2">{{ filtered.length }}</span>
              <span class="text-gray-500"> de {{ proyectos.length }} proyectos cerrados</span>
            </div>
            <div v-if="filtered.length > 0" class="text-xs text-gray-500">
              Precio promedio: {{ formatCurrency(averagePrice) }}
            </div>
          </div>
        </div>

        <!-- Mapa -->
        <div v-if="proyectos.length > 0" class="bg-white rounded-2xl shadow p-5 mb-6">
          <div class="flex items-center justify-between gap-4 mb-3">
            <h2 class="text-lg font-bold" style="color:#0D0D0D">Mapa</h2>
            <span v-if="mapErrorMessage" class="text-xs text-gray-500">({{ mapErrorMessage }})</span>
          </div>

          <div class="rounded-xl overflow-hidden border" style="border-color:#C8D9B0">
            <div class="relative">
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
                    v-for="p in filtered"
                    :key="p.id"
                    class="text-sm font-semibold hover:opacity-80"
                    style="color:#2793F2"
                    :href="getMapsOpenUrl(p.localizacion)"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ p.nombre_proyecto }} — {{ p.localizacion }}
                  </a>
                </div>
              </div>

              <div
                ref="mapContainer"
                class="w-full h-72 sm:h-80 md:h-96"
                v-show="mapState === 'ready'"
              ></div>
            </div>
          </div>
        </div>

        <!-- Lista -->
        <div v-if="loading" class="text-center py-16">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style="border-color: #2793F2"></div>
          <p class="mt-4 text-gray-600">Cargando rentabilidades…</p>
        </div>
        <div v-else-if="error" class="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="font-semibold">{{ error }}</span>
          </div>
        </div>
        <div v-else-if="filtered.length === 0" class="text-center py-16 bg-white rounded-2xl shadow">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 class="text-xl font-bold mb-2" style="color: #0D0D0D">No hay proyectos cerrados</h3>
          <p class="text-gray-600 mb-4">Los proyectos vendidos y cerrados aparecerán aquí</p>
          <router-link
            to="/inversiones"
            class="inline-block px-6 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90"
            style="background-color: #2793F2"
          >
            Ver oportunidades de inversión
          </router-link>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProyectoCard
            v-for="p in filtered"
            :key="p.id"
            :proyecto="p"
            :show-favorito="true"
            :is-favorito="isFavorito(p.id)"
            :es-rentabilidad="true"
            @ver-detalles="goDetalle"
            @invertir="() => {}"
            @toggle-favorito="handleToggleFavorito"
          />
        </div>
      </div>
    </section>

    <landing-footer />
  </full-screen-layout>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import LandingHeader from '@/components/landing/LandingHeader.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
import ProyectoCard from '@/components/proyectos/ProyectoCard.vue'
import type { Proyecto } from '@/types/proyecto'
import { fetchRentabilidades } from '@/utils/publicProyectos'
import { loadGoogleMapsPlaces } from '@/utils/loadGoogleMaps'
import { useAuth } from '@/composables/useAuth'
import { useUserDashboard } from '@/composables/useUserDashboard'

const router = useRouter()
const { isAuthenticated } = useAuth()
const { isFavorito, addFavorito, removeFavorito, fetchFavoritos } = useUserDashboard()

async function handleToggleFavorito(proyectoId: string) {
  try {
    if (isFavorito(proyectoId)) await removeFavorito(proyectoId)
    else await addFavorito(proyectoId)
  } catch (e) {
    console.error('Error al actualizar favorito:', e)
  }
}

const proyectos = ref<Proyecto[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const queryLocalizacion = ref('')
const precioMinValue = ref(0)
const precioMaxValue = ref(0)

const priceRangeMin = computed(() => {
  const values = proyectos.value.map((p) => Number(p.precio_unidad || 0)).filter((n) => Number.isFinite(n) && n > 0)
  return values.length ? Math.min(...values) : 0
})
const priceRangeMax = computed(() => {
  const values = proyectos.value.map((p) => Number(p.precio_unidad || 0)).filter((n) => Number.isFinite(n) && n > 0)
  return values.length ? Math.max(...values) : 0
})

const filtered = computed(() => {
  const q = (queryLocalizacion.value || '').trim().toLowerCase()
  const min = precioMinValue.value
  const max = precioMaxValue.value

  return proyectos.value.filter((p) => {
    const loc = (p.localizacion || '').toLowerCase()
    if (q && !loc.includes(q)) return false
    const price = Number(p.precio_unidad || 0)
    if (price && price < min) return false
    if (price && price > max) return false
    return true
  })
})

const averagePrice = computed(() => {
  if (filtered.value.length === 0) return 0
  const sum = filtered.value.reduce((acc, p) => acc + Number(p.precio_unidad || 0), 0)
  return Math.round(sum / filtered.value.length)
})

/** Proyectos con lofts alquilados: cantidad, ingresos mensuales, rentabilidad por ticket */
const proyectosConAlquileres = computed(() => {
  const items: Array<{
    proyecto: Proyecto
    totalAlquilados: number
    ingresosMensualesTotales: number
    numTickets: number
    rentabilidadPorTicket: number
    detalleAlquileres: Array<{ nombre: string; alquilados: number; precio_alquiler: number }>
  }> = []

  for (const p of proyectos.value) {
    const tipos = (p.unidades_tipos || []) as Array<{
      nombre?: string
      alquilados?: number
      precio_alquiler?: number
    }>
    let totalAlquilados = 0
    let ingresosMensuales = 0
    const detalleAlquileres: Array<{ nombre: string; alquilados: number; precio_alquiler: number }> = []

    for (const t of tipos) {
      const alq = Number(t.alquilados) || 0
      const precio = Number(t.precio_alquiler) || 0
      if (alq > 0 && precio > 0) {
        totalAlquilados += alq
        ingresosMensuales += alq * precio
        detalleAlquileres.push({ nombre: t.nombre || 'Tipo', alquilados: alq, precio_alquiler: precio })
      }
    }

    if (totalAlquilados === 0) continue

    const ticketSize = Number(p.precio_ticket) || 5000
    const objetivo = Number(p.objetivo_inversion_total) || 0
    const numTickets = objetivo > 0 ? Math.floor(objetivo / ticketSize) : 0
    const rentabilidadPorTicket = numTickets > 0 ? ingresosMensuales / numTickets : 0

    items.push({
      proyecto: p,
      totalAlquilados,
      ingresosMensualesTotales: Math.round(ingresosMensuales * 100) / 100,
      numTickets,
      rentabilidadPorTicket: Math.round(rentabilidadPorTicket * 100) / 100,
      detalleAlquileres,
    })
  }

  return items
})

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount || 0)

const resetFilters = () => {
  queryLocalizacion.value = ''
  precioMinValue.value = priceRangeMin.value
  precioMaxValue.value = priceRangeMax.value
}

const goDetalle = (p: Proyecto) => {
  if (!p.id) return
  router.push(`/inversiones/${p.id}`)
}

// Mapa
const mapContainer = ref<HTMLDivElement | null>(null)
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
    try { m.setMap(null) } catch {}
  }
  markers = []
}

const initMap = async () => {
  if (!mapContainer.value) return
  mapState.value = 'loading'
  mapErrorMessage.value = null
  try {
    await loadGoogleMapsPlaces()
    const g = (window as any).google
    if (!g?.maps) throw new Error('Google Maps no cargó')
    geocoder = new g.maps.Geocoder()
    map = new g.maps.Map(mapContainer.value, {
      zoom: 6,
      center: { lat: 40.4168, lng: -3.7038 },
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
    })
    mapState.value = 'ready'
    await updateMarkers()
  } catch (e: any) {
    console.warn('Mapa rentabilidades: error', e)
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
        resolve({ lat: loc.lat(), lng: loc.lng() })
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

  for (const p of filtered.value) {
    const pos = await geocodeAddress(p.localizacion)
    if (!pos) continue
    const marker = new g.maps.Marker({ map, position: pos, title: p.nombre_proyecto })
    const info = new g.maps.InfoWindow({
      content: `<div style="padding:10px; max-width:260px;">
        <div style="font-weight:700; margin-bottom:6px;">${p.nombre_proyecto}</div>
        <div style="color:#666; font-size:12px; margin-bottom:6px;">${p.localizacion}</div>
        <div style="font-size:12px;"><b>Precio/loft:</b> ${formatCurrency(Number(p.precio_unidad || 0))}</div>
      </div>`,
    })
    marker.addListener('click', () => info.open(map, marker))
    markers.push(marker)
    bounds.extend(pos as any)
  }

  if (markers.length > 0) {
    map.fitBounds(bounds)
  }
}

async function load() {
  loading.value = true
  error.value = null
  try {
    proyectos.value = await fetchRentabilidades()
    precioMinValue.value = priceRangeMin.value
    precioMaxValue.value = priceRangeMax.value
    await nextTick()
    await initMap()
  } catch (e: any) {
    error.value = e?.message || 'Error cargando rentabilidades'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  load()
  if (isAuthenticated.value) fetchFavoritos()
})

watch(
  () => [filtered.value.length, queryLocalizacion.value, precioMinValue.value, precioMaxValue.value],
  async () => {
    if (mapState.value === 'idle') return
    await updateMarkers()
  }
)

watch(
  () => [precioMinValue.value, precioMaxValue.value],
  ([min, max]) => {
    if (min > max) {
      precioMinValue.value = max
      precioMaxValue.value = min
    }
  }
)

onUnmounted(() => clearMarkers())
</script>
