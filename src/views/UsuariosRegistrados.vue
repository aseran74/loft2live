<template>
  <admin-layout>
    <div class="p-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold" style="color: #0D0D0D">Usuarios registrados</h1>
          <button
            @click="openCreate"
            class="px-6 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            style="background-color: #2793F2"
          >
            + Nuevo usuario
          </button>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {{ error }}
        </div>

        <div v-if="loading && users.length === 0" class="py-12 text-center text-gray-500">
          Cargando usuarios…
        </div>

        <div v-else-if="users.length === 0" class="py-12 text-center text-gray-500">
          No hay usuarios registrados.
        </div>

        <div v-else class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registro</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="u in users" :key="u.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <img
                      v-if="u.photo_url"
                      :src="u.photo_url"
                      :alt="u.name || u.email"
                      class="h-8 w-8 rounded-full object-cover"
                    />
                    <div v-else class="h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium" style="background: #C8D9B0; color: #0D0D0D">
                      {{ (u.name || u.email)[0]?.toUpperCase() }}
                    </div>
                    <span class="font-medium">{{ u.name || '—' }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ u.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 py-1 text-xs rounded-full font-medium"
                    :style="u.role === 'admin' ? 'background: rgba(39, 147, 242, 0.2); color: #2793F2' : 'background: #C8D9B0; color: #0D0D0D'"
                  >
                    {{ u.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 py-1 text-xs rounded-full"
                    :class="u.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'"
                  >
                    {{ u.is_active ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(u.created_at) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    @click="openEdit(u)"
                    class="font-medium"
                    style="color: #2793F2"
                  >
                    Editar
                  </button>
                  <button
                    v-if="u.email !== 'alvaroserr@gmail.com'"
                    @click="confirmDelete(u)"
                    class="font-medium text-red-600 hover:text-red-800"
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

    <!-- Modal Crear / Editar -->
    <Teleport to="body">
      <div
        v-if="formModalOpen"
        class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        @click.self="formModalOpen = false"
      >
        <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <h3 class="text-xl font-bold mb-4">{{ editingUser ? 'Editar usuario' : 'Nuevo usuario' }}</h3>
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="w-full px-4 py-3 rounded-lg border"
                style="border-color: #C8D9B0"
                :disabled="!!editingUser"
                required
              />
              <p v-if="editingUser" class="text-xs text-gray-500 mt-1">El email no se puede cambiar</p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Nombre</label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-4 py-3 rounded-lg border"
                style="border-color: #C8D9B0"
              />
            </div>
            <div v-if="editingUser">
              <label class="block text-sm font-medium mb-1">Rol</label>
              <select
                v-model="form.role"
                class="w-full px-4 py-3 rounded-lg border"
                style="border-color: #C8D9B0"
                :disabled="form.email === 'alvaroserr@gmail.com'"
              >
                <option value="user">Usuario</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div v-if="editingUser">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="form.is_active" type="checkbox" />
                <span class="text-sm">Usuario activo</span>
              </label>
            </div>
            <div class="flex gap-3 justify-end pt-4">
              <button type="button" @click="formModalOpen = false" class="px-4 py-2 rounded-lg border-2 font-semibold" style="border-color: #C8D9B0">
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 rounded-lg font-semibold text-white disabled:opacity-50"
                style="background: #2793F2"
              >
                {{ saving ? 'Guardando…' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { useAdminUsers, type AdminUser } from '@/composables/useAdminUsers'

const { users, loading, error, fetchUsers, updateUser, deleteUser, createUser } = useAdminUsers()

const formModalOpen = ref(false)
const editingUser = ref<AdminUser | null>(null)
const saving = ref(false)
const form = ref({ email: '', name: '', role: 'user', is_active: true })

onMounted(() => fetchUsers())

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

function openCreate() {
  editingUser.value = null
  form.value = { email: '', name: '', role: 'user', is_active: true }
  formModalOpen.value = true
}

function openEdit(u: AdminUser) {
  editingUser.value = u
  form.value = { email: u.email, name: u.name || '', role: u.role, is_active: u.is_active ?? true }
  formModalOpen.value = true
}

async function submitForm() {
  saving.value = true
  try {
    if (editingUser.value) {
      await updateUser(editingUser.value.id, {
        name: form.value.name || undefined,
        role: form.value.role,
        is_active: form.value.is_active
      })
    } else {
      await createUser(form.value.email, form.value.name || undefined, form.value.role)
    }
    formModalOpen.value = false
  } catch {
    // error ya en useAdminUsers
  } finally {
    saving.value = false
  }
}

async function confirmDelete(u: AdminUser) {
  if (!confirm(`¿Eliminar a ${u.email}? No podrá acceder al dashboard.`)) return
  try {
    await deleteUser(u.id)
  } catch {
    // error ya mostrado
  }
}
</script>
