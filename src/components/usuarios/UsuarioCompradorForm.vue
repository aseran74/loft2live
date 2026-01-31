<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-medium mb-2">Nombre *</label>
        <input
          v-model="formData.nombre"
          type="text"
          required
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Correo -->
      <div>
        <label class="block text-sm font-medium mb-2">Correo *</label>
        <input
          v-model="formData.correo"
          type="email"
          required
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Teléfono -->
      <div>
        <label class="block text-sm font-medium mb-2">Teléfono</label>
        <input
          v-model="formData.telefono"
          type="tel"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Dirección -->
      <div>
        <label class="block text-sm font-medium mb-2">Dirección</label>
        <input
          v-model="formData.direccion"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Proyecto -->
      <div>
        <label class="block text-sm font-medium mb-2">Proyecto</label>
        <select
          v-model="formData.proyecto_id"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        >
          <option value="">Seleccionar proyecto</option>
          <option v-for="proyecto in proyectos" :key="proyecto.id" :value="proyecto.id">
            {{ proyecto.nombre_proyecto }}
          </option>
        </select>
      </div>

      <!-- Monto invertido -->
      <div>
        <label class="block text-sm font-medium mb-2">Monto invertido (EUR)</label>
        <input
          v-model.number="formData.monto_invertido"
          type="number"
          step="0.01"
          min="0"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Fecha de inversión -->
      <div>
        <label class="block text-sm font-medium mb-2">Fecha de inversión</label>
        <input
          v-model="formData.fecha_inversion"
          type="datetime-local"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Estado -->
      <div>
        <label class="block text-sm font-medium mb-2">Estado</label>
        <select
          v-model="formData.estado"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        >
          <option value="pendiente">Pendiente</option>
          <option value="confirmado">Confirmado</option>
          <option value="completado">Completado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <!-- Notas -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium mb-2">Notas</label>
        <textarea
          v-model="formData.notas"
          rows="3"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        ></textarea>
      </div>
    </div>

    <div class="flex justify-end gap-4 pt-4">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-6 py-2 border-2 rounded-lg transition-colors font-semibold hover:opacity-70"
        style="border-color: #C8D9B0; color: #0D0D0D"
      >
        Cancelar
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-6 py-2 text-white rounded-lg transition-colors font-semibold hover:opacity-90 disabled:opacity-50"
        style="background-color: #2793F2"
      >
        {{ loading ? 'Guardando...' : (comprador?.id ? 'Actualizar' : 'Crear') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useProyectos } from '@/composables/useProyectos'
import type { UsuarioComprador } from '@/types/usuario'

const props = defineProps<{
  comprador?: UsuarioComprador
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: Omit<UsuarioComprador, 'id' | 'created_at' | 'updated_at'>]
  cancel: []
}>()

const { proyectos, fetchProyectos } = useProyectos()

onMounted(() => {
  fetchProyectos()
})

const formData = ref<Omit<UsuarioComprador, 'id' | 'created_at' | 'updated_at'>>({
  nombre: '',
  telefono: '',
  correo: '',
  direccion: '',
  proyecto_id: '',
  monto_invertido: 0,
  fecha_inversion: '',
  estado: 'pendiente',
  notas: ''
})

watch(() => props.comprador, (newComprador) => {
  if (newComprador) {
    formData.value = {
      nombre: newComprador.nombre,
      telefono: newComprador.telefono || '',
      correo: newComprador.correo,
      direccion: newComprador.direccion || '',
      proyecto_id: newComprador.proyecto_id || '',
      monto_invertido: newComprador.monto_invertido,
      fecha_inversion: newComprador.fecha_inversion || '',
      estado: newComprador.estado,
      notas: newComprador.notas || ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>
