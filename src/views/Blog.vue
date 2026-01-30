<template>
  <full-screen-layout>
    <landing-header />

    <section class="pt-24 pb-14" style="background-color:#F2F2F2">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="flex flex-col gap-2 mb-6">
          <h1 class="text-3xl sm:text-4xl font-bold" style="color:#0D0D0D">Blog</h1>
          <p class="text-gray-600">
            Novedades, guías y análisis sobre inversión en lofts, flex living y ventajas fiscales.
          </p>
        </div>

        <div v-if="loading" class="text-center py-12 text-gray-600">
          Cargando noticias...
        </div>
        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article
            v-for="entrada in entradas"
            :key="entrada.id"
            class="bg-white rounded-2xl shadow p-6 flex flex-col"
          >
            <div class="text-xs font-semibold" style="color:#79358D">Noticia</div>
            <h2 class="mt-2 text-xl font-bold" style="color:#0D0D0D">{{ entrada.titulo }}</h2>
            <p class="mt-2 text-sm text-gray-600 flex-1 line-clamp-5">
              {{ entrada.resumen }}
            </p>
            <a
              v-if="entrada.fuente_url"
              :href="entrada.fuente_url"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
              style="color:#79358D"
            >
              Ver fuente
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </article>
        </div>
      </div>
    </section>

    <landing-footer />
  </full-screen-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import LandingHeader from '@/components/landing/LandingHeader.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
import { supabase } from '@/config/supabase'

export interface BlogEntrada {
  id: string
  titulo: string
  resumen: string
  fuente_url: string | null
  orden: number
  created_at?: string
}

const entradas = ref<BlogEntrada[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const { data, err } = await supabase
      .from('blog_entradas')
      .select('id, titulo, resumen, fuente_url, orden, created_at')
      .order('orden', { ascending: true })

    if (err) throw err
    entradas.value = (data ?? []) as BlogEntrada[]
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al cargar las noticias'
  } finally {
    loading.value = false
  }
})
</script>
