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
      <div class="absolute top-3 left-3 flex items-center gap-2">
        <span class="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg" style="background-color: rgba(121, 53, 141, 0.9); backdrop-filter: blur(4px)">
          Activo
        </span>
        <span class="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg" style="background-color: rgba(13, 13, 13, 0.7); backdrop-filter: blur(4px)">
          {{ proyecto.porcentaje_llegado }}% completado
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
      <h3 class="text-2xl font-bold mb-4" style="color: #0D0D0D">
        {{ proyecto.nombre_proyecto }}
      </h3>

      <!-- Información destacada -->
      <div class="grid grid-cols-2 gap-3 mb-5 p-4 rounded-xl" style="background-color: #F7F6FB">
        <div>
          <div class="text-xs text-gray-600 mb-1">Objetivo inversión</div>
          <div class="text-lg font-bold" style="color: #79358D">
            {{ formatCurrency(proyecto.objetivo_inversion_total) }}
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-600 mb-1">Precio por unidad</div>
          <div class="text-lg font-bold" style="color: #79358D">
            {{ formatCurrency(proyecto.precio_unidad) }}
          </div>
        </div>
      </div>

      <div class="space-y-2.5 mb-5">
        <div class="flex items-center gap-2 text-sm">
          <svg class="w-4 h-4 flex-shrink-0" style="color: #79358D" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-gray-700">{{ proyecto.localizacion }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <svg class="w-4 h-4 flex-shrink-0" style="color: #79358D" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-gray-700">{{ proyecto.num_lofts }} lofts</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <svg class="w-4 h-4 flex-shrink-0" style="color: #79358D" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span class="text-gray-700">{{ proyecto.tipo_inversion }}</span>
        </div>
        <div v-if="proyecto.alquiler && proyecto.precio_alquiler_mes" class="flex items-center gap-2 text-sm">
          <svg class="w-4 h-4 flex-shrink-0" style="color: #79358D" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-gray-700">También disponible para alquiler: {{ formatCurrency(proyecto.precio_alquiler_mes) }}/mes</span>
        </div>
      </div>

      <!-- Progress Bar mejorada -->
      <div class="mb-5">
        <div class="flex justify-between text-sm mb-2" style="color: #0D0D0D">
          <span class="font-medium">{{ formatCurrency(proyecto.monto_restante || 0) }} restantes</span>
          <span class="font-bold" style="color: #79358D">{{ proyecto.porcentaje_llegado }}%</span>
        </div>
        <div class="w-full rounded-full h-3 overflow-hidden" style="background-color: #DFDCF2">
          <div 
            class="h-full rounded-full transition-all duration-500" 
            :style="`width: ${proyecto.porcentaje_llegado}%; background: linear-gradient(90deg, #79358d 0%, #9d5fb3 100%)`"
          ></div>
        </div>
      </div>

      <div class="flex gap-3 pt-4 border-t" style="border-color: #DFDCF2">
        <button 
          class="flex-1 px-5 py-3 text-white rounded-lg transition-all font-semibold hover:opacity-90 hover:shadow-lg" 
          style="background-color: #79358D"
          @click="$emit('invertir', proyecto)"
        >
          Invertir ahora
        </button>
        <button 
          class="px-5 py-3 border-2 rounded-lg transition-all font-semibold hover:opacity-70 hover:shadow-md" 
          style="border-color: #CFCEF2; color: #0D0D0D"
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
import type { Proyecto } from '@/types/proyecto'
import { supabase } from '@/config/supabase'

const props = defineProps<{
  proyecto: Proyecto
}>()

defineEmits<{
  invertir: [proyecto: Proyecto]
  'ver-detalles': [proyecto: Proyecto]
}>()

const coverUrl = computed(() => {
  const p = props.proyecto
  const path =
    p?.fotos?.[0] ??
    p?.fotos_oficina_remodelada?.[0] ??
    p?.fotos_oficina_actual?.[0]
  if (!path) return ''
  if (path.startsWith('http')) return path
  const { data } = supabase.storage.from('photos').getPublicUrl(path)
  return data.publicUrl
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
