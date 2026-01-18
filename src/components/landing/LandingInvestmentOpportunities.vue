<template>
  <section id="oportunidades" class="py-12" style="background-color: #F2F2F2">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="text-center mb-10">
        <h2 class="text-3xl lg:text-4xl font-bold mb-3" style="color: #0D0D0D">
          Oportunidades de <span style="color: #79358d">inversión actual</span>
        </h2>
      </div>

      <div v-if="loading && proyectos.length === 0" class="text-center py-12">
        <p style="color: #0D0D0D">Cargando oportunidades...</p>
      </div>

      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <div v-else-if="proyectos.length === 0" class="text-center py-12">
        <p style="color: #0D0D0D">No hay oportunidades disponibles en este momento.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProyectoCard
          v-for="proyecto in proyectos"
          :key="proyecto.id"
          :proyecto="proyecto"
          @invertir="handleInvertir"
          @ver-detalles="handleVerDetalles"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProyectos } from '@/composables/useProyectos'
import ProyectoCard from '@/components/proyectos/ProyectoCard.vue'
import type { Proyecto } from '@/types/proyecto'

const { proyectos, loading, error, fetchProyectos } = useProyectos()

onMounted(() => {
  fetchProyectos()
})

const handleInvertir = (proyecto: Proyecto) => {
  // Aquí puedes redirigir a una página de inversión o abrir un modal
  console.log('Invertir en:', proyecto)
  // Ejemplo: router.push(`/invertir/${proyecto.id}`)
}

const handleVerDetalles = (proyecto: Proyecto) => {
  // Aquí puedes redirigir a una página de detalles o abrir un modal
  console.log('Ver detalles de:', proyecto)
  // Ejemplo: router.push(`/proyectos/${proyecto.id}`)
}
</script>
