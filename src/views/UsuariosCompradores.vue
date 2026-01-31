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
            style="background-color: #D92211"
          >
            + Nuevo Comprador
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

        <!-- Lista de compradores -->
        <div v-if="loading && compradores.length === 0" class="text-center py-12">
          <p>Cargando compradores...</p>
        </div>

        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {{ error }}
        </div>

        <div v-else-if="compradores.length === 0" class="text-center py-12">
          <p>No hay compradores registrados.</p>
        </div>

        <div v-else class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proyecto</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="comprador in compradores" :key="comprador.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ comprador.nombre }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ comprador.correo }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ getProyectoNombre(comprador) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatCurrency(comprador.monto_invertido) }}
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
                  <button
                    @click="editComprador(comprador)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </button>
                  <button
                    @click="deleteCompradorHandler(comprador.id!)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUsuariosCompradores } from '@/composables/useUsuarios'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import UsuarioCompradorForm from '@/components/usuarios/UsuarioCompradorForm.vue'
import type { UsuarioComprador } from '@/types/usuario'

const { compradores, loading, error, fetchCompradores, createComprador, updateComprador, deleteComprador } = useUsuariosCompradores()

const showForm = ref(false)
const selectedComprador = ref<UsuarioComprador | undefined>(undefined)

onMounted(() => {
  fetchCompradores()
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
