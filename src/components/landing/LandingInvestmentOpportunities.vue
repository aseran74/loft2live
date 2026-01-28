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
          v-for="proyecto in proyectos.slice(0, 4)"
          :key="proyecto.id"
          :proyecto="proyecto"
          @invertir="handleInvertir"
          @ver-detalles="handleVerDetalles"
        />
      </div>

      <div v-if="!loading && proyectos.length > 4" class="mt-8 text-center">
        <router-link
          to="/inversiones"
          class="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90"
          style="background-color:#79358D"
        >
          Ver todas las inversiones
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import ProyectoCard from '@/components/proyectos/ProyectoCard.vue'
import type { Proyecto } from '@/types/proyecto'
import { fetchPublicProyectos } from '@/utils/publicProyectos'

const router = useRouter()

const proyectos = ref<Proyecto[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(() => {
  load()
})

const handleInvertir = (proyecto: Proyecto) => {
  // Público: pedimos login para invertir
  router.push('/signin')
}

const handleVerDetalles = (proyecto: Proyecto) => {
  if (!proyecto.id) return
  router.push(`/inversiones/${proyecto.id}`)
}

async function load() {
  loading.value = true
  error.value = null
  try {
    proyectos.value = await fetchPublicProyectos()
  } catch (e: any) {
    error.value = e?.message || 'Error al cargar oportunidades'
  } finally {
    loading.value = false
  }
}
</script>
