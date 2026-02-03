<template>
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <!-- Foto (primera) -->
    <div v-if="coverUrl" class="h-56 sm:h-64 w-full bg-gray-100 overflow-hidden relative group">
      <img
        :src="coverUrl"
        :alt="proyecto.nombre_proyecto"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      <div class="absolute top-3 right-3">
        <span class="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg" style="background: linear-gradient(135deg, #C8D9B0, #2793F2); backdrop-filter: blur(4px)">
          Disponible
        </span>
      </div>
    </div>
    <div v-else class="h-56 sm:h-64 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
      <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>

    <div class="p-6">
      <!-- Precio destacado (desde el mínimo de los tipos) -->
      <div class="mb-4">
        <div class="flex items-baseline gap-2 mb-1">
          <span class="text-3xl font-bold" style="color: #2793F2">
            {{ precioDesdeFormatted }}
          </span>
          <span class="text-sm text-gray-600">/mes</span>
        </div>
        <p class="text-sm font-semibold" style="color: #2793F2">
          Precio flexliving todo incluido
        </p>
      </div>

      <h3 class="text-2xl font-bold mb-3" style="color: #0D0D0D">
        {{ proyecto.nombre_proyecto }}
      </h3>

      <div class="space-y-2 mb-5">
        <div class="flex items-center gap-2 text-sm">
          <svg class="w-4 h-4 flex-shrink-0" style="color: #2793F2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-gray-700">{{ proyecto.localizacion }}</span>
        </div>
        <!-- Lofts por tipo: resta (disponibles - alquilados) y precio según tipo -->
        <div class="space-y-1.5">
          <div
            v-for="tipo in tiposEnAlquiler"
            :key="tipo.nombre"
            class="flex items-center justify-between gap-2 text-sm"
          >
            <span class="text-gray-700">{{ tipo.nombre }}: {{ tipo.disponiblesParaAlquiler }} lofts</span>
            <span class="font-semibold" style="color: #2793F2">{{ formatCurrency(tipo.precio_alquiler!) }}/mes</span>
          </div>
          <div v-if="totalLoftsDisponibles > 0" class="flex items-center gap-2 text-sm text-gray-500 pt-0.5">
            <svg class="w-4 h-4 flex-shrink-0" style="color: #2793F2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{{ totalLoftsDisponibles }} lofts disponibles en total</span>
          </div>
        </div>
      </div>

      <!-- Complementos -->
      <div v-if="proyecto.comodidades && proyecto.comodidades.length > 0" class="mb-6">
        <h4 class="text-sm font-bold mb-3 flex items-center gap-2" style="color: #0D0D0D">
          <svg class="w-4 h-4" style="color: #2793F2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          Complementos ({{ proyecto.comodidades.length }})
        </h4>
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="(amenidad, idx) in displayedAmenities"
            :key="idx"
            class="flex items-center gap-2 p-2 rounded-lg text-xs"
            style="background-color: #F2F2F2"
          >
            <span class="w-4 h-4 flex-shrink-0" style="color: #2793F2" v-html="getAmenityIconSvg(amenidad)"></span>
            <span class="text-gray-700 truncate">{{ getAmenityLabel(amenidad) }}</span>
          </div>
          <div
            v-if="proyecto.comodidades.length > maxAmenities"
            class="flex items-center gap-2 p-2 rounded-lg text-xs font-semibold"
            style="background-color: #C8D9B0; color: #2793F2"
          >
            <span>+{{ proyecto.comodidades.length - maxAmenities }} más</span>
          </div>
        </div>
      </div>

      <div class="flex gap-3 pt-4 border-t" style="border-color: #C8D9B0">
        <button 
          class="flex-1 px-5 py-3 text-white rounded-lg transition-all font-semibold hover:opacity-90 hover:shadow-lg" 
          style="background: linear-gradient(135deg, #C8D9B0, #2793F2)"
          @click="$emit('alquilar', proyecto)"
        >
          Alquilar ahora
        </button>
        <button 
          class="px-5 py-3 border-2 rounded-lg transition-all font-semibold hover:opacity-70 hover:shadow-md" 
          style="border-color: #C8D9B0; color: #0D0D0D"
          @click="$emit('ver-detalles', proyecto)"
        >
          Ver detalles
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Proyecto, UnidadTipo } from '@/types/proyecto'
import { supabase } from '@/config/supabase'
import { amenityGroups, getAmenityIconSvg, getAmenityLabel } from '@/utils/amenities'

const props = defineProps<{
  proyecto: Proyecto
}>()

defineEmits<{
  alquilar: [proyecto: Proyecto]
  'ver-detalles': [proyecto: Proyecto]
}>()

const maxAmenities = 6

// Solo tipos con (disponibles - alquilados) > 0 y precio_alquiler (proyectos vendidos y cerrados)
type TipoEnAlquiler = UnidadTipo & { disponiblesParaAlquiler: number }
const tiposEnAlquiler = computed((): TipoEnAlquiler[] => {
  const tipos = props.proyecto?.unidades_tipos || []
  return tipos
    .map((u) => {
      const disp = Number(u.disponibles ?? 0)
      const alq = Number(u.alquilados ?? 0)
      const disponiblesParaAlquiler = Math.max(0, disp - alq)
      const precio = Number(u.precio_alquiler ?? 0)
      if (disponiblesParaAlquiler <= 0 || precio <= 0) return null
      return { ...u, disponiblesParaAlquiler }
    })
    .filter((t): t is TipoEnAlquiler => t != null)
})

const totalLoftsDisponibles = computed(() =>
  tiposEnAlquiler.value.reduce((acc, t) => acc + t.disponiblesParaAlquiler, 0)
)

const precioDesdeFormatted = computed(() => {
  const precios = tiposEnAlquiler.value.map((t) => Number(t.precio_alquiler ?? 0)).filter((n) => n > 0)
  if (precios.length === 0) return '—'
  const min = Math.min(...precios)
  return formatCurrency(min)
})

const coverUrl = computed(() => {
  const path = props.proyecto?.fotos?.[0]
  if (!path) return ''
  if (path.startsWith('http')) return path
  const { data } = supabase.storage.from('photos').getPublicUrl(path)
  return data.publicUrl
})

const displayedAmenities = computed(() => {
  const amenities = props.proyecto?.comodidades || []
  return amenities.slice(0, maxAmenities)
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
</script>
