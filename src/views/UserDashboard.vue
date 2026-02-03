<template>
  <full-screen-layout>
    <landing-header />

    <section class="pt-24 pb-16" style="background-color: #F2F2F2">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold" style="color: #0D0D0D">Mi cuenta</h1>
          <p class="text-lg text-gray-600 mt-1">
            Gestiona tus favoritos, solicitudes de información e inversiones
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <!-- Favoritos -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border-2" style="border-color: #C8D9B0">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2" style="color: #0D0D0D">
              <span>⭐</span> Favoritos
            </h2>
            <div v-if="loadingFavoritos" class="py-8 text-center text-gray-500">
              Cargando…
            </div>
            <div v-else-if="favoritos.length === 0" class="py-8 text-center text-gray-500">
              No tienes proyectos guardados como favoritos.
              <router-link to="/inversiones" class="block mt-3 font-semibold" style="color: #2793F2">
                Explorar inversiones →
              </router-link>
            </div>
            <ul v-else class="space-y-3">
              <li
                v-for="f in favoritos"
                :key="f.proyecto_id"
                class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                style="border: 1px solid #C8D9B0"
              >
                <router-link :to="`/inversiones/${f.proyecto_id}`" class="flex-1 min-w-0">
                  <div class="font-semibold truncate" style="color: #0D0D0D">{{ f.nombre_proyecto }}</div>
                  <div class="text-sm text-gray-600">{{ f.localizacion }}</div>
                  <div class="text-sm font-semibold mt-1" style="color: #2793F2">
                    {{ formatCurrency(f.precio_unidad) }} · {{ f.porcentaje_llegado }}%
                  </div>
                </router-link>
                <button
                  type="button"
                  @click="removeFavorito(f.proyecto_id)"
                  class="p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Quitar de favoritos"
                >
                  <svg class="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>

          <!-- Solicitudes de información -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border-2" style="border-color: #C8D9B0">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2" style="color: #0D0D0D">
              <span>📋</span> Solicitudes de información
            </h2>
            <div v-if="loadingSolicitudes" class="py-8 text-center text-gray-500">
              Cargando…
            </div>
            <div v-else-if="solicitudes.length === 0" class="py-8 text-center text-gray-500">
              No has enviado ninguna solicitud.
            </div>
            <ul v-else class="space-y-3 max-h-80 overflow-y-auto">
              <li
                v-for="s in solicitudes"
                :key="s.id"
                class="p-3 rounded-xl text-sm"
                style="border: 1px solid #C8D9B0; background-color: rgba(200, 216, 175, 0.2)"
              >
                <div class="font-semibold" style="color: #0D0D0D">
                  {{ s.nombre_proyecto || 'Consulta general' }}
                </div>
                <p v-if="s.tipo_consulta" class="text-xs text-gray-500 mt-0.5">{{ s.tipo_consulta }}</p>
                <p class="text-gray-600 mt-1 line-clamp-2">{{ s.mensaje }}</p>
                <div v-if="s.respuesta_admin" class="mt-2 p-2 rounded text-sm" style="background: rgba(39, 147, 242, 0.1); color: #0D0D0D">
                  <span class="font-medium text-xs">Respuesta:</span> {{ s.respuesta_admin }}
                </div>
                <div v-if="s.telefono || s.fecha_hora_llamada" class="text-xs text-gray-600 mt-2 space-y-0.5">
                  <span v-if="s.telefono">📞 {{ s.telefono }}</span>
                  <span v-if="s.fecha_hora_llamada" class="block">📅 {{ formatDateTime(s.fecha_hora_llamada) }}</span>
                </div>
                <div class="flex items-center justify-between mt-2">
                  <span
                    class="px-2 py-0.5 rounded text-xs font-medium"
                    :style="s.estado === 'pendiente' ? 'background: rgba(39, 147, 242, 0.2); color: #2793F2' : 'background: #C8D9B0; color: #0D0D0D'"
                  >
                    {{ s.estado === 'pendiente' ? 'Pendiente' : 'Respondida' }}
                  </span>
                  <span class="text-xs text-gray-500">{{ formatDate(s.created_at) }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Mis inversiones -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border-2" style="border-color: #C8D9B0">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2" style="color: #0D0D0D">
              <span>💰</span> Mis inversiones
            </h2>
            <div v-if="loadingInversiones" class="py-8 text-center text-gray-500">
              Cargando…
            </div>
            <div v-else-if="inversiones.length === 0" class="py-8 text-center text-gray-500">
              Aún no has invertido en ningún proyecto.
              <router-link to="/inversiones" class="block mt-3 font-semibold" style="color: #2793F2">
                Ver oportunidades →
              </router-link>
            </div>
            <ul v-else class="space-y-3">
              <li
                v-for="inv in inversiones"
                :key="inv.id"
                class="p-3 rounded-xl"
                style="border: 1px solid #C8D9B0; background-color: rgba(39, 147, 242, 0.08)"
              >
                <router-link :to="`/inversiones/${inv.proyecto_id}`">
                  <div class="font-semibold" style="color: #0D0D0D">{{ inv.nombre_proyecto }}</div>
                  <div class="text-sm text-gray-600">{{ inv.localizacion }}</div>
                  <div class="mt-2 flex items-center justify-between">
                    <span class="font-bold" style="color: #2793F2">{{ formatCurrency(inv.monto_invertido) }}</span>
                    <span
                      class="px-2 py-0.5 rounded text-xs font-medium"
                      :style="inv.estado === 'completada' ? 'background: #C8D9B0; color: #0D0D0D' : 'background: rgba(39, 147, 242, 0.2); color: #2793F2'"
                    >
                      {{ inv.estado || 'Pendiente' }}
                    </span>
                  </div>
                  <div v-if="inv.fecha_inversion" class="text-xs text-gray-500 mt-1">
                    {{ formatDate(inv.fecha_inversion) }}
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </full-screen-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import LandingHeader from '@/components/landing/LandingHeader.vue'
import { useUserDashboard } from '@/composables/useUserDashboard'

const {
  favoritos,
  solicitudes,
  inversiones,
  mensajes,
  loadingFavoritos,
  loadingSolicitudes,
  loadingInversiones,
  loadingMensajes,
  fetchAll,
  removeFavorito
} = useUserDashboard()

onMounted(() => {
  fetchAll()
})

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

function formatDateTime(dateStr: string | null) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
