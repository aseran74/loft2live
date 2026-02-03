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

      <!-- Lo que ha comprado -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium mb-2">Lo que ha comprado *</label>
        <div class="space-y-4">
          <label class="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors" :class="formData.tipo_compra === 'tickets' ? 'border-2' : ''" style="border-color: #C8D9B0">
            <input v-model="formData.tipo_compra" type="radio" value="tickets" class="mt-1" />
            <div class="flex-1">
              <span class="font-semibold" style="color:#0D0D0D">A) Nº de tickets</span>
              <p class="text-xs text-gray-500 mt-0.5">Múltiplos de 5.000€ (1 ticket = 5.000€)</p>
              <div v-if="formData.tipo_compra === 'tickets'" class="mt-3 flex items-center gap-3">
                <input
                  v-model.number="formData.num_tickets"
                  type="number"
                  min="1"
                  step="1"
                  class="w-24 px-3 py-2 border rounded-lg text-sm"
                  style="border-color: #C8D9B0"
                />
                <span class="text-sm text-gray-600">= {{ formatCurrency((formData.num_tickets || 1) * 5000) }}</span>
              </div>
            </div>
          </label>
          <label class="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors" :class="formData.tipo_compra === 'loft_completo' ? 'border-2' : ''" style="border-color: #C8D9B0">
            <input v-model="formData.tipo_compra" type="radio" value="loft_completo" class="mt-1" />
            <div class="flex-1">
              <span class="font-semibold" style="color:#0D0D0D">B) Loft entero en propiedad</span>
              <p class="text-xs text-gray-500 mt-0.5">Inversión por la unidad completa</p>
              <div v-if="formData.tipo_compra === 'loft_completo'" class="mt-3">
                <input
                  v-model.number="formData.monto_invertido"
                  type="number"
                  step="1000"
                  min="0"
                  class="w-40 px-3 py-2 border rounded-lg text-sm"
                  style="border-color: #C8D9B0"
                  placeholder="Precio loft (EUR)"
                />
                <p class="text-xs text-gray-500 mt-1">Importe total de la unidad</p>
              </div>
            </div>
          </label>
        </div>
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
  tipo_compra: 'tickets',
  num_tickets: 1,
  fecha_inversion: '',
  estado: 'pendiente',
  notas: ''
})

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

watch(() => props.comprador, (newComprador) => {
  if (newComprador) {
    const tipo = newComprador.tipo_compra || (newComprador.num_tickets ? 'tickets' : 'loft_completo')
    const numTickets = newComprador.num_tickets ?? (tipo === 'tickets' && newComprador.monto_invertido ? Math.round(newComprador.monto_invertido / 5000) : 1)
    formData.value = {
      nombre: newComprador.nombre,
      telefono: newComprador.telefono || '',
      correo: newComprador.correo,
      direccion: newComprador.direccion || '',
      proyecto_id: newComprador.proyecto_id || '',
      monto_invertido: newComprador.monto_invertido,
      tipo_compra: tipo,
      num_tickets: numTickets,
      fecha_inversion: newComprador.fecha_inversion || '',
      estado: newComprador.estado,
      notas: newComprador.notas || ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  const data = { ...formData.value }
  if (data.tipo_compra === 'tickets' && data.num_tickets) {
    data.monto_invertido = data.num_tickets * 5000
  } else if (data.tipo_compra === 'loft_completo') {
    data.num_tickets = undefined
  }
  emit('submit', data)
}
</script>
