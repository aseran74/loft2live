<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
        <h3 class="text-xl font-bold mb-2">Enviar mensaje</h3>
        <p class="text-sm text-gray-600 mb-4">A: {{ destinatario }}</p>
        <div class="mb-4">
          <textarea
            v-model="contenido"
            rows="4"
            class="w-full px-4 py-3 rounded-lg border resize-y"
            style="border-color: #C8D9B0"
            placeholder="Escribe tu mensaje..."
          ></textarea>
        </div>
        <div v-if="conversacion.length" class="mb-4 p-3 rounded-lg bg-gray-50 max-h-40 overflow-y-auto">
          <div class="text-xs font-medium text-gray-500 mb-2">Conversación anterior</div>
          <div v-for="m in conversacion" :key="m.id" class="text-sm py-1">
            <span class="text-gray-500">{{ formatDt(m.created_at) }}:</span> {{ m.contenido }}
          </div>
        </div>
        <div class="flex gap-3 justify-end">
          <button type="button" @click="$emit('close')" class="px-4 py-2 rounded-lg border-2 font-semibold" style="border-color: #C8D9B0">
            Cerrar
          </button>
          <button
            type="button"
            @click="enviar"
            :disabled="!contenido.trim() || sending"
            class="px-4 py-2 rounded-lg font-semibold text-white disabled:opacity-50"
            style="background: #2793F2"
          >
            {{ sending ? 'Enviando…' : 'Enviar' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
  destinatario: string
  conversacion: Array<{ id: string; contenido: string; created_at: string }>
}>()

const emit = defineEmits<{
  close: []
  send: [contenido: string]
}>()

const contenido = ref('')
const sending = ref(false)

watch(() => props.open, (v) => {
  if (v) contenido.value = ''
})

function formatDt(d: string) {
  return new Date(d).toLocaleString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

async function enviar() {
  if (!contenido.value.trim()) return
  sending.value = true
  try {
    emit('send', contenido.value.trim())
  } finally {
    sending.value = false
  }
}
</script>
