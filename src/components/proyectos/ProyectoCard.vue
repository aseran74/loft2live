<template>
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    <div class="p-5">
      <div class="flex items-center justify-between mb-4">
        <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: #DFDCF2; color: #79358d">
          Activo
        </span>
        <span class="text-sm" style="color: #0D0D0D">{{ proyecto.porcentaje_llegado }}% completado</span>
      </div>

      <h3 class="text-xl font-bold mb-5" style="color: #0D0D0D">
        {{ proyecto.nombre_proyecto }}
      </h3>

      <div class="space-y-2 mb-5">
        <div class="flex justify-between items-center">
          <span style="color: #0D0D0D">Objetivo de inversión:</span>
          <span class="font-semibold" style="color: #0D0D0D">{{ formatCurrency(proyecto.objetivo_inversion_total) }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span style="color: #0D0D0D">Localización:</span>
          <span class="font-semibold" style="color: #0D0D0D">{{ proyecto.localizacion }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span style="color: #0D0D0D">Nº de lofts:</span>
          <span class="font-semibold" style="color: #0D0D0D">{{ proyecto.num_lofts }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span style="color: #0D0D0D">Precio unidad:</span>
          <span class="font-semibold" style="color: #0D0D0D">{{ formatCurrency(proyecto.precio_unidad) }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span style="color: #0D0D0D">Tipo de inversión:</span>
          <span class="font-semibold" style="color: #0D0D0D">{{ proyecto.tipo_inversion }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span style="color: #0D0D0D">Mín. término:</span>
          <span class="font-semibold" style="color: #0D0D0D">{{ proyecto.min_termino_meses }} meses</span>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mb-5">
        <div class="flex justify-between text-sm mb-2" style="color: #0D0D0D">
          <span>{{ formatCurrency(proyecto.monto_restante || 0) }} restantes</span>
          <span>{{ proyecto.porcentaje_llegado }}%</span>
        </div>
        <div class="w-full rounded-full h-3" style="background-color: #DFDCF2">
          <div 
            class="h-3 rounded-full" 
            :style="`width: ${proyecto.porcentaje_llegado}%; background-color: #79358d`"
          ></div>
        </div>
      </div>

      <div class="flex gap-3">
        <button 
          class="flex-1 px-5 py-2.5 text-white rounded-lg transition-colors font-semibold hover:opacity-90" 
          style="background-color: #79358D"
          @click="$emit('invertir', proyecto)"
        >
          Invertir
        </button>
        <button 
          class="px-5 py-2.5 border-2 rounded-lg transition-colors font-semibold hover:opacity-70" 
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
import type { Proyecto } from '@/types/proyecto'

defineProps<{
  proyecto: Proyecto
}>()

defineEmits<{
  invertir: [proyecto: Proyecto]
  'ver-detalles': [proyecto: Proyecto]
}>()

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
</script>
