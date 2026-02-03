<template>
  <admin-layout>
    <div class="p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">Gestión de Compradores</h1>
          <button
            @click="showForm = true; selectedComprador = undefined"
            class="px-6 py-2 text-white rounded-lg transition-colors font-semibold hover:opacity-90"
            style="background-color: #2793F2"
          >
            + Nuevo Comprador
          </button>
        </div>

        <!-- Tabs: vista proyecto vs comprador -->
        <div class="flex gap-2 mb-6 border-b" style="border-color: #C8D9B0">
          <button
            @click="vistaActual = 'proyecto'"
            :class="[
              'px-4 py-2 font-semibold text-sm transition-colors border-b-2',
              vistaActual === 'proyecto' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            ]"
          >
            Por Proyecto
          </button>
          <button
            @click="vistaActual = 'comprador'"
            :class="[
              'px-4 py-2 font-semibold text-sm transition-colors border-b-2',
              vistaActual === 'comprador' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            ]"
          >
            Por Comprador
          </button>
        </div>

        <!-- Formulario Modal -->
        <div
          v-if="showForm"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          @click.self="showForm = false"
        >
          <div
            class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            @click.stop
          >
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">
                {{ selectedComprador ? 'Editar Comprador' : 'Nuevo Comprador' }}
              </h2>
              <button @click="showForm = false" class="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <UsuarioCompradorForm
              :comprador="selectedComprador"
              :loading="loading"
              @submit="handleSubmit"
              @cancel="showForm = false"
            />
          </div>
        </div>

        <!-- Vista: Por Proyecto -->
        <div v-if="vistaActual === 'proyecto'">
          <div v-if="loadingProyectos" class="text-center py-12">
            <p>Cargando proyectos...</p>
          </div>
          <div v-else-if="proyectos.length === 0" class="text-center py-12">
            <p>No hay proyectos disponibles.</p>
          </div>
          <div v-else>
            <!-- Selector de proyecto -->
            <div class="mb-6 bg-white rounded-lg shadow p-4">
              <label class="block text-sm font-medium mb-2 text-gray-700">Selecciona un proyecto</label>
              <select
                v-model="proyectoSeleccionadoId"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style="border-color: #C8D9B0; focus:ring-color: #2793F2"
              >
                <option value="">-- Todos los proyectos --</option>
                <option v-for="p in proyectos" :key="p.id" :value="p.id">
                  {{ p.nombre_proyecto }}
                </option>
              </select>
              <div v-if="proyectoSeleccionado" class="mt-3 text-sm text-gray-600">
                <span class="font-semibold">{{ compradoresProyectoActual.length }}</span> compradores en este proyecto
              </div>
            </div>

            <!-- Lista compradores del proyecto seleccionado -->
            <div v-if="proyectoSeleccionadoId && compradoresProyectoActual.length === 0" class="text-center py-12">
              <p>No hay compradores para el proyecto seleccionado.</p>
            </div>
            <div v-else-if="proyectoSeleccionadoId" class="bg-white rounded-lg shadow overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lo comprado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="comprador in compradoresProyectoActual" :key="comprador.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ comprador.nombre }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ comprador.correo }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <template v-if="comprador.tipo_compra === 'loft_completo' || (!comprador.tipo_compra && !comprador.num_tickets)">
                        Loft entero · {{ formatCurrency(comprador.monto_invertido) }}
                      </template>
                      <template v-else>
                        {{ comprador.num_tickets || Math.round(comprador.monto_invertido / 5000) }} ticket(s) · {{ formatCurrency(comprador.monto_invertido) }}
                      </template>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="[
                          'px-2 py-1 text-xs rounded-full',
                          getEstadoClass(comprador.estado)
                        ]"
                      >
                        {{ comprador.estado }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button @click="openMensaje(comprador)" class="text-blue-600 hover:text-blue-900">Mensaje</button>
                      <button @click="editComprador(comprador)" class="text-indigo-600 hover:text-indigo-900">Editar</button>
                      <button @click="deleteCompradorHandler(comprador.id!)" class="text-red-600 hover:text-red-900">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Vista: Por Comprador (con filtros) -->
        <div v-if="vistaActual === 'comprador'">
          <!-- Filtros -->
          <div class="bg-white rounded-lg shadow p-4 mb-6">
            <h2 class="text-lg font-semibold mb-4" style="color: #0D0D0D">Filtros</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-medium mb-1 text-gray-700">Buscar por nombre</label>
                <input
                  v-model="filtroNombre"
                  type="text"
                  placeholder="Escribe un nombre..."
                  class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                  style="border-color: #C8D9B0; focus:ring-color: #2793F2"
                />
              </div>
              <div>
                <label class="block text-xs font-medium mb-1 text-gray-700">Proyecto</label>
                <select
                  v-model="filtroProyectoId"
                  class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                  style="border-color: #C8D9B0; focus:ring-color: #2793F2"
                >
                  <option value="">Todos</option>
                  <option v-for="p in proyectos" :key="p.id" :value="p.id">{{ p.nombre_proyecto }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium mb-1 text-gray-700">Estado</label>
                <select
                  v-model="filtroEstado"
                  class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                  style="border-color: #C8D9B0; focus:ring-color: #2793F2"
                >
                  <option value="">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="completado">Completado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <span class="text-sm text-gray-600">
                Mostrando <span class="font-bold" style="color: #2793F2">{{ compradoresFiltrados.length }}</span> de {{ compradores.length }} compradores
              </span>
              <button
                @click="limpiarFiltros"
                class="text-xs px-3 py-1 rounded border hover:opacity-80"
                style="border-color: #C8D9B0; color: #0D0D0D"
              >
                Limpiar filtros
              </button>
            </div>
          </div>

          <!-- Lista compradores filtrados -->
          <div v-if="loading && compradores.length === 0" class="text-center py-12">
            <p>Cargando compradores...</p>
          </div>

          <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {{ error }}
          </div>

          <div v-else-if="compradoresFiltrados.length === 0" class="text-center py-12">
            <p>No hay compradores que coincidan con los filtros.</p>
          </div>

          <div v-else class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proyecto</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lo comprado</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="comprador in compradoresFiltrados" :key="comprador.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ comprador.nombre }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ comprador.correo }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ getProyectoNombre(comprador) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <template v-if="comprador.tipo_compra === 'loft_completo' || (!comprador.tipo_compra && !comprador.num_tickets)">
                      Loft entero · {{ formatCurrency(comprador.monto_invertido) }}
                    </template>
                    <template v-else>
                      {{ comprador.num_tickets || Math.round(comprador.monto_invertido / 5000) }} ticket(s) · {{ formatCurrency(comprador.monto_invertido) }}
                    </template>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'px-2 py-1 text-xs rounded-full',
                        getEstadoClass(comprador.estado)
                      ]"
                    >
                      {{ comprador.estado }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button @click="openMensaje(comprador)" class="text-blue-600 hover:text-blue-900">Mensaje</button>
                    <button @click="editComprador(comprador)" class="text-indigo-600 hover:text-indigo-900">Editar</button>
                    <button @click="deleteCompradorHandler(comprador.id!)" class="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <MensajeModal
      :open="mensajeModalOpen"
      :destinatario="mensajeDestinatario"
      :conversacion="mensajesConversacion"
      @close="mensajeModalOpen = false"
      @send="enviarMensaje"
    />
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUsuariosCompradores } from '@/composables/useUsuarios'
import { useAdminMensajes, type Mensaje } from '@/composables/useAdminMensajes'
import { supabase } from '@/config/supabase'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import UsuarioCompradorForm from '@/components/usuarios/UsuarioCompradorForm.vue'
import MensajeModal from '@/components/admin/MensajeModal.vue'
import type { UsuarioComprador } from '@/types/usuario'
import type { Proyecto } from '@/types/proyecto'

const { compradores, loading, error, fetchCompradores, createComprador, updateComprador, deleteComprador } = useUsuariosCompradores()
const { enviarMensaje: enviarMensajeRpc, getConversacion } = useAdminMensajes()

// Tabs: vista proyecto vs comprador
const vistaActual = ref<'proyecto' | 'comprador'>('proyecto')

// Vista por proyecto
const proyectos = ref<Proyecto[]>([])
const loadingProyectos = ref(false)
const proyectoSeleccionadoId = ref<string>('')
const proyectoSeleccionado = computed(() => proyectos.value.find((p) => p.id === proyectoSeleccionadoId.value))
const compradoresProyectoActual = computed(() => {
  if (!proyectoSeleccionadoId.value) return []
  return compradores.value.filter((c) => c.proyecto_id === proyectoSeleccionadoId.value)
})

// Vista por comprador (filtros)
const filtroNombre = ref('')
const filtroProyectoId = ref('')
const filtroEstado = ref('')
const compradoresFiltrados = computed(() => {
  let result = compradores.value
  const nombre = filtroNombre.value.trim().toLowerCase()
  if (nombre) {
    result = result.filter((c) => (c.nombre || '').toLowerCase().includes(nombre))
  }
  if (filtroProyectoId.value) {
    result = result.filter((c) => c.proyecto_id === filtroProyectoId.value)
  }
  if (filtroEstado.value) {
    result = result.filter((c) => c.estado === filtroEstado.value)
  }
  return result
})

const limpiarFiltros = () => {
  filtroNombre.value = ''
  filtroProyectoId.value = ''
  filtroEstado.value = ''
}

const fetchProyectos = async () => {
  loadingProyectos.value = true
  try {
    const { data } = await supabase.from('proyectos').select('id, nombre_proyecto').order('created_at', { ascending: false })
    proyectos.value = (data || []) as Proyecto[]
  } catch (e) {
    console.error('Error cargando proyectos:', e)
  } finally {
    loadingProyectos.value = false
  }
}

const mensajeModalOpen = ref(false)
const mensajeDestinatario = ref('')
const mensajeCompradorId = ref('')
const mensajesConversacion = ref<Mensaje[]>([])

function openMensaje(c: UsuarioComprador) {
  mensajeDestinatario.value = `${c.nombre} (${c.correo})`
  mensajeCompradorId.value = c.id!
  getConversacion('comprador', c.id!).then((r) => { mensajesConversacion.value = r })
  mensajeModalOpen.value = true
}

async function enviarMensaje(contenido: string) {
  await enviarMensajeRpc({ to_comprador_id: mensajeCompradorId.value, contenido })
  mensajesConversacion.value = await getConversacion('comprador', mensajeCompradorId.value)
}

const showForm = ref(false)
const selectedComprador = ref<UsuarioComprador | undefined>(undefined)

onMounted(async () => {
  await fetchProyectos()
  await fetchCompradores()
  // Si solo hay un proyecto, seleccionarlo automáticamente
  if (proyectos.value.length === 1) {
    proyectoSeleccionadoId.value = proyectos.value[0].id!
  }
})

const editComprador = (comprador: UsuarioComprador) => {
  selectedComprador.value = comprador
  showForm.value = true
}

const handleSubmit = async (data: Omit<UsuarioComprador, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    if (selectedComprador.value?.id) {
      await updateComprador(selectedComprador.value.id, data)
    } else {
      await createComprador(data)
    }
    showForm.value = false
    selectedComprador.value = undefined
    await fetchCompradores()
  } catch (err) {
    console.error('Error al guardar comprador:', err)
  }
}

const deleteCompradorHandler = async (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este comprador?')) {
    try {
      await deleteComprador(id)
      await fetchCompradores()
    } catch (err) {
      console.error('Error al eliminar comprador:', err)
    }
  }
}

const getProyectoNombre = (comprador: any) => {
  if (comprador.proyectos) {
    return comprador.proyectos.nombre_proyecto || '-'
  }
  return '-'
}

const getEstadoClass = (estado: string) => {
  const classes: Record<string, string> = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    confirmado: 'bg-blue-100 text-blue-800',
    completado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800'
  }
  return classes[estado] || 'bg-gray-100 text-gray-800'
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
</script>
