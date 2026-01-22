<template>
  <full-screen-layout>
    <landing-header />

    <section class="pt-24 pb-12" style="background-color:#F2F2F2">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex flex-col gap-2 mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold" style="color:#0D0D0D">Alquileres Flexliving</h1>
          <p class="text-lg text-gray-600">
            Encuentra lofts disponibles para alquiler con todas las comodidades incluidas. Precio flexliving todo incluido.
          </p>
        </div>

        <!-- Filtros -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 class="text-xl font-bold mb-1" style="color:#0D0D0D">Búsqueda de alquileres</h2>
              <p class="text-sm text-gray-600">Filtra por localización y rango de precio mensual</p>
            </div>
            <button
              type="button"
              class="px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity"
              style="background-color: #DFDCF2; color: #79358D"
              @click="resetFilters"
            >
              Limpiar filtros
            </button>
          </div>

          <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="rounded-xl border p-4" style="border-color:#DFDCF2">
              <label class="block text-xs text-gray-600 mb-2">Localización</label>
              <input
                v-model="queryLocalizacion"
                type="text"
                class="w-full px-3 py-2 rounded-lg border bg-white text-sm"
                style="border-color:#CFCEF2"
                placeholder="Málaga, Madrid, Valencia…"
              />
            </div>

            <div class="rounded-xl border p-4 lg:col-span-2" style="border-color:#DFDCF2">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div class="text-xs text-gray-600">Precio alquiler mensual</div>
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
                  :step="50"
                  aria-label="Precio mínimo alquiler"
                />
                <input
                  v-model.number="precioMaxValue"
                  type="range"
                  class="absolute inset-0 w-full"
                  :min="priceRangeMin"
                  :max="priceRangeMax"
                  :step="50"
                  aria-label="Precio máximo alquiler"
                />
              </div>
            </div>
          </div>

          <div class="mt-5 pt-4 border-t flex items-center justify-between" style="border-color: #DFDCF2">
            <div class="text-sm text-gray-600">
              Mostrando <span class="font-bold text-lg" style="color:#79358D">{{ filtered.length }}</span>
              <span class="text-gray-500"> de {{ alquileres.length }} alquileres disponibles</span>
            </div>
            <div v-if="filtered.length > 0" class="text-xs text-gray-500">
              Precio promedio: {{ formatCurrency(averagePrice) }}/mes
            </div>
          </div>
        </div>

        <!-- Mapa -->
        <div class="bg-white rounded-2xl shadow p-5 mb-6">
          <div class="flex items-center justify-between gap-4 mb-3">
            <h2 class="text-lg font-bold" style="color:#0D0D0D">Mapa</h2>
            <span v-if="mapErrorMessage" class="text-xs text-gray-500">({{ mapErrorMessage }})</span>
          </div>

          <div class="rounded-xl overflow-hidden border" style="border-color:#DFDCF2">
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
                    style="color:#79358D"
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
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style="border-color: #79358D"></div>
          <p class="mt-4 text-gray-600">Cargando alquileres…</p>
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <h3 class="text-xl font-bold mb-2" style="color: #0D0D0D">No se encontraron alquileres</h3>
          <p class="text-gray-600 mb-4">Intenta ajustar los filtros de búsqueda</p>
          <button
            @click="resetFilters"
            class="px-6 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90"
            style="background-color: #79358D"
          >
            Limpiar filtros
          </button>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AlquilerCard
            v-for="p in filtered"
            :key="p.id"
            :proyecto="p"
            @ver-detalles="goDetalle"
            @alquilar="goSignin"
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
import AlquilerCard from '@/components/proyectos/AlquilerCard.vue'
import type { Proyecto } from '@/types/proyecto'
import { fetchPublicProyectos } from '@/utils/publicProyectos'
import { loadGoogleMapsPlaces } from '@/utils/loadGoogleMaps'

const router = useRouter()

const proyectos = ref<Proyecto[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const queryLocalizacion = ref('')
const precioMinValue = ref(900)
const precioMaxValue = ref(1300)

// Filtrar solo proyectos con alquiler disponible
const alquileres = computed(() => {
  return proyectos.value.filter((p) => p.alquiler === true && p.precio_alquiler_mes)
})

const priceRangeMin = computed(() => {
  const values = alquileres.value
    .map((p) => Number(p.precio_alquiler_mes || 0))
    .filter((n) => Number.isFinite(n) && n > 0)
  return values.length ? Math.min(...values) : 900
})

const priceRangeMax = computed(() => {
  const values = alquileres.value
    .map((p) => Number(p.precio_alquiler_mes || 0))
    .filter((n) => Number.isFinite(n) && n > 0)
  return values.length ? Math.max(...values) : 1300
})

const filtered = computed(() => {
  const q = (queryLocalizacion.value || '').trim().toLowerCase()
  const min = precioMinValue.value
  const max = precioMaxValue.value

  return alquileres.value.filter((p) => {
    const loc = (p.localizacion || '').toLowerCase()
    if (q && !loc.includes(q)) return false
    const price = Number(p.precio_alquiler_mes || 0)
    if (price && price < min) return false
    if (price && price > max) return false
    return true
  })
})

const averagePrice = computed(() => {
  if (filtered.value.length === 0) return 0
  const sum = filtered.value.reduce((acc, p) => acc + Number(p.precio_alquiler_mes || 0), 0)
  return Math.round(sum / filtered.value.length)
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

const goSignin = () => {
  router.push('/signin')
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
    console.warn('Mapa alquileres: error', e)
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
        <div style="font-size:12px;"><b>Alquiler:</b> ${formatCurrency(Number(p.precio_alquiler_mes || 0))}/mes</div>
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
    proyectos.value = await fetchPublicProyectos()
    // init sliders
    precioMinValue.value = priceRangeMin.value
    precioMaxValue.value = priceRangeMax.value
    await nextTick()
    await initMap()
  } catch (e: any) {
    error.value = e?.message || 'Error cargando alquileres'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  load()
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
