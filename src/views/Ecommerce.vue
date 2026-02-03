<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <!-- Solicitudes de información (primero) -->
      <div class="col-span-12">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold flex items-center gap-2" style="color: #0D0D0D">
              <span>📋</span> Solicitudes de información
            </h2>
            <router-link
              to="/solicitudes"
              class="text-sm font-medium"
              style="color: #2793F2"
            >
              Ver y editar todas →
            </router-link>
          </div>
          <div v-if="solicitudesError" class="py-6 px-4 rounded-lg bg-red-50 text-red-700">
            <p class="font-medium">Error al cargar solicitudes</p>
            <p class="text-sm mt-1">{{ solicitudesError }}</p>
            <button
              type="button"
              @click="fetchSolicitudes"
              class="mt-3 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 font-medium"
            >
              Reintentar
            </button>
          </div>
          <div v-else-if="loadingSolicitudes" class="py-8 text-center text-gray-500">
            Cargando…
          </div>
          <div v-else-if="solicitudes.length === 0" class="py-8 text-center text-gray-500">
            No hay solicitudes de información.
          </div>
          <div v-else class="overflow-x-auto max-h-96 overflow-y-auto">
            <table class="w-full text-sm text-left">
              <thead class="sticky top-0 bg-gray-50">
                <tr>
                  <th class="px-4 py-2 font-semibold">Fecha</th>
                  <th class="px-4 py-2 font-semibold">Usuario</th>
                  <th class="px-4 py-2 font-semibold">Proyecto</th>
                  <th class="px-4 py-2 font-semibold">Tipo</th>
                  <th class="px-4 py-2 font-semibold">Teléfono</th>
                  <th class="px-4 py-2 font-semibold">¿Cuándo llamar?</th>
                  <th class="px-4 py-2 font-semibold">Consulta</th>
                  <th class="px-4 py-2 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="s in solicitudes"
                  :key="s.id"
                  class="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td class="px-4 py-3 text-gray-600 whitespace-nowrap">{{ formatDate(s.created_at) }}</td>
                  <td class="px-4 py-3">
                    <div class="font-medium">{{ s.user_name || s.user_email }}</div>
                    <div class="text-xs text-gray-500">{{ s.user_email }}</div>
                  </td>
                  <td class="px-4 py-3">
                    <router-link
                      v-if="s.proyecto_id"
                      :to="`/proyectos/${s.proyecto_id}`"
                      class="text-blue-600 hover:underline"
                    >
                      {{ s.nombre_proyecto || '—' }}
                    </router-link>
                    <span v-else>—</span>
                  </td>
                  <td class="px-4 py-3">{{ s.tipo_consulta || '—' }}</td>
                  <td class="px-4 py-3">
                    <a v-if="s.telefono" :href="`tel:${s.telefono}`" class="text-blue-600 hover:underline">
                      {{ s.telefono }}
                    </a>
                    <span v-else>—</span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">{{ formatDateTime(s.fecha_hora_llamada) || '—' }}</td>
                  <td class="px-4 py-3 max-w-xs truncate">{{ s.mensaje }}</td>
                  <td class="px-4 py-3">
                    <span
                      class="px-2 py-0.5 rounded text-xs font-medium"
                      :style="s.estado === 'pendiente' ? 'background: rgba(39, 147, 242, 0.2); color: #2793F2' : 'background: #C8D9B0; color: #0D0D0D'"
                    >
                      {{ s.estado || 'pendiente' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Acceso rápido a Proyectos -->
      <div class="col-span-12">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center gap-3 mb-4">
            <img
              src="/images/Logodefi.png"
              alt="Loft2live"
              class="h-64 w-auto"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <router-link
              to="/proyectos"
              class="flex items-center justify-between p-4 border-2 rounded-lg hover:shadow-md transition-all"
              style="border-color: #C8D9B0"
            >
              <div>
                <h3 class="font-semibold text-lg">Ver Proyectos</h3>
                <p class="text-sm text-gray-600">Gestiona todos los proyectos</p>
              </div>
              <span class="text-2xl">📊</span>
            </router-link>
            <router-link
              to="/proyectos/nuevo"
              class="flex items-center justify-between p-4 border-2 rounded-lg hover:shadow-md transition-all"
              style="border-color: #2793F2"
            >
              <div>
                <h3 class="font-semibold text-lg">Crear Proyecto</h3>
                <p class="text-sm text-gray-600">Añade un nuevo proyecto</p>
              </div>
              <span class="text-2xl">➕</span>
            </router-link>
            <router-link
              to="/usuarios/perfiles"
              class="flex items-center justify-between p-4 border-2 rounded-lg hover:shadow-md transition-all"
              style="border-color: #C8D9B0"
            >
              <div>
                <h3 class="font-semibold text-lg">Usuarios</h3>
                <p class="text-sm text-gray-600">Gestiona perfiles y compradores</p>
              </div>
              <span class="text-2xl">👥</span>
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-span-12 space-y-6">
        <ecommerce-metrics />
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue'
import { useAdminSolicitudes } from '@/composables/useAdminSolicitudes'

const { solicitudes, loading: loadingSolicitudes, error: solicitudesError, fetchSolicitudes } = useAdminSolicitudes()

onMounted(() => {
  fetchSolicitudes()
})

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

function formatDateTime(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
