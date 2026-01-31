<template>
  <admin-layout>
    <div class="p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">Gestión de Perfiles de Usuarios</h1>
          <button
            @click="showForm = true; selectedUsuario = undefined"
            class="px-6 py-2 text-white rounded-lg transition-colors font-semibold hover:opacity-90"
            style="background-color: #D92211"
          >
            + Nuevo Perfil
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
                {{ selectedUsuario ? 'Editar Perfil' : 'Nuevo Perfil' }}
              </h2>
              <button @click="showForm = false" class="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <UsuarioProfileForm
              :usuario="selectedUsuario"
              :loading="loading"
              @submit="handleSubmit"
              @cancel="showForm = false"
            />
          </div>
        </div>

        <!-- Lista de usuarios -->
        <div v-if="loading && usuarios.length === 0" class="text-center py-12">
          <p>Cargando usuarios...</p>
        </div>

        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {{ error }}
        </div>

        <div v-else-if="usuarios.length === 0" class="text-center py-12">
          <p>No hay usuarios registrados. Crea tu primer perfil.</p>
        </div>

        <div v-else class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interesado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="usuario in usuarios" :key="usuario.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ usuario.nombre }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ usuario.correo }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ usuario.telefono || '-' }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 py-1 text-xs rounded-full',
                      usuario.esta_interesado ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ usuario.esta_interesado ? 'Sí' : 'No' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    @click="editUsuario(usuario)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </button>
                  <button
                    @click="deleteUsuarioHandler(usuario.id!)"
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
import { useUsuariosProfile } from '@/composables/useUsuarios'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import UsuarioProfileForm from '@/components/usuarios/UsuarioProfileForm.vue'
import type { UsuarioProfile } from '@/types/usuario'

const { usuarios, loading, error, fetchUsuarios, createUsuario, updateUsuario, deleteUsuario } = useUsuariosProfile()

const showForm = ref(false)
const selectedUsuario = ref<UsuarioProfile | undefined>(undefined)

onMounted(() => {
  fetchUsuarios()
})

const editUsuario = (usuario: UsuarioProfile) => {
  selectedUsuario.value = usuario
  showForm.value = true
}

const handleSubmit = async (data: Omit<UsuarioProfile, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    if (selectedUsuario.value?.id) {
      await updateUsuario(selectedUsuario.value.id, data)
    } else {
      await createUsuario(data)
    }
    showForm.value = false
    selectedUsuario.value = undefined
    await fetchUsuarios()
  } catch (err) {
    console.error('Error al guardar usuario:', err)
  }
}

const deleteUsuarioHandler = async (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este perfil?')) {
    try {
      await deleteUsuario(id)
      await fetchUsuarios()
    } catch (err) {
      console.error('Error al eliminar usuario:', err)
    }
  }
}
</script>
