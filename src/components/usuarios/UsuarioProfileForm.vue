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
          style="border-color: #C8D9B0; focus:ring-color: #D92211"
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
          style="border-color: #C8D9B0; focus:ring-color: #D92211"
        />
      </div>

      <!-- Teléfono -->
      <div>
        <label class="block text-sm font-medium mb-2">Teléfono</label>
        <input
          v-model="formData.telefono"
          type="tel"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #D92211"
        />
      </div>

      <!-- Dirección -->
      <div>
        <label class="block text-sm font-medium mb-2">Dirección</label>
        <input
          v-model="formData.direccion"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #D92211"
        />
      </div>

      <!-- Está interesado -->
      <div class="md:col-span-2">
        <label class="flex items-center space-x-2">
          <input
            v-model="formData.esta_interesado"
            type="checkbox"
            class="w-4 h-4 rounded"
            style="accent-color: #D92211"
          />
          <span class="text-sm font-medium">Está interesado</span>
        </label>
      </div>

      <!-- Análisis RCP -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium mb-2">Análisis RCP</label>
        <textarea
          v-model="formData.analisis_rcp"
          rows="4"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #D92211"
          placeholder="Análisis de riesgo, capacidad de pago, etc."
        ></textarea>
      </div>

      <!-- Notas -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium mb-2">Notas</label>
        <textarea
          v-model="formData.notas"
          rows="3"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #D92211"
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
        style="background-color: #D92211"
      >
        {{ loading ? 'Guardando...' : (usuario?.id ? 'Actualizar' : 'Crear') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { UsuarioProfile } from '@/types/usuario'

const props = defineProps<{
  usuario?: UsuarioProfile
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: Omit<UsuarioProfile, 'id' | 'created_at' | 'updated_at'>]
  cancel: []
}>()

const formData = ref<Omit<UsuarioProfile, 'id' | 'created_at' | 'updated_at'>>({
  nombre: '',
  telefono: '',
  correo: '',
  direccion: '',
  analisis_rcp: '',
  esta_interesado: false,
  notas: ''
})

watch(() => props.usuario, (newUsuario) => {
  if (newUsuario) {
    formData.value = {
      nombre: newUsuario.nombre,
      telefono: newUsuario.telefono || '',
      correo: newUsuario.correo,
      direccion: newUsuario.direccion || '',
      analisis_rcp: newUsuario.analisis_rcp || '',
      esta_interesado: newUsuario.esta_interesado,
      notas: newUsuario.notas || ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>
