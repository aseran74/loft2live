<template>
  <admin-layout>
    <div class="p-6 max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-6" style="color: #0D0D0D">Solicitudes de información</h1>

      <div v-if="loading && solicitudes.length === 0" class="py-12 text-center text-gray-500">Cargando…</div>
      <div v-else-if="error" class="bg-red-50 text-red-700 p-4 rounded-lg mb-6">{{ error }}</div>
      <div v-else-if="solicitudes.length === 0" class="py-12 text-center text-gray-500">No hay solicitudes.</div>

      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto max-h-[70vh] overflow-y-auto">
          <table class="w-full text-sm text-left">
            <thead class="sticky top-0 bg-gray-50 z-10">
              <tr>
                <th class="px-4 py-2 font-semibold">Fecha</th>
                <th class="px-4 py-2 font-semibold">Usuario</th>
                <th class="px-4 py-2 font-semibold">Proyecto</th>
                <th class="px-4 py-2 font-semibold">Tipo</th>
                <th class="px-4 py-2 font-semibold">Teléfono</th>
                <th class="px-4 py-2 font-semibold">Consulta</th>
                <th class="px-4 py-2 font-semibold">Estado</th>
                <th class="px-4 py-2 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="s in solicitudes"
                :key="s.id"
                class="border-t border-gray-200 hover:bg-gray-50"
              >
                <td class="px-4 py-3 whitespace-nowrap">{{ formatDate(s.created_at) }}</td>
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
                  <a v-if="s.telefono" :href="`tel:${s.telefono}`" class="text-blue-600 hover:underline">{{ s.telefono }}</a>
                  <span v-else>—</span>
                </td>
                <td class="px-4 py-3 max-w-xs truncate">{{ s.mensaje }}</td>
                <td class="px-4 py-3">
                  <span
                    class="px-2 py-0.5 rounded text-xs font-medium"
                    :style="s.estado === 'pendiente' ? 'background: rgba(39, 147, 242, 0.2); color: #2793F2' : 'background: #C8D9B0; color: #0D0D0D'"
                  >
                    {{ s.estado || 'pendiente' }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <button
                    type="button"
                    @click="openEdit(s)"
                    class="px-3 py-1 rounded text-sm font-medium"
                    style="background: #2793F2; color: white"
                  >
                    Editar
                  </button>
                  <button
                    v-if="s.user_id"
                    type="button"
                    @click="openMensaje(s, 'user', s.user_id)"
                    class="ml-2 px-3 py-1 rounded text-sm font-medium border"
                    style="border-color: #C8D9B0; color: #0D0D0D"
                  >
                    Mensaje
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Editar solicitud -->
    <Teleport to="body">
      <div
        v-if="editModalOpen"
        class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        @click.self="editModalOpen = false"
      >
        <div class="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
          <h3 class="text-xl font-bold mb-4">Editar solicitud</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Estado</label>
              <select
                v-model="editForm.estado"
                class="w-full px-4 py-3 rounded-lg border"
                style="border-color: #C8D9B0"
              >
                <option value="pendiente">Pendiente</option>
                <option value="respondida">Respondida</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Respuesta / Notas del admin</label>
              <textarea
                v-model="editForm.respuesta_admin"
                rows="4"
                class="w-full px-4 py-3 rounded-lg border resize-y"
                style="border-color: #C8D9B0"
                placeholder="Escribe la respuesta o notas..."
              ></textarea>
            </div>
          </div>
          <div class="flex gap-3 justify-end mt-6">
            <button type="button" @click="editModalOpen = false" class="px-4 py-2 rounded-lg border-2 font-semibold" style="border-color: #C8D9B0">
              Cancelar
            </button>
            <button
              type="button"
              @click="guardarEdicion"
              :disabled="guardando"
              class="px-4 py-2 rounded-lg font-semibold text-white disabled:opacity-50"
              style="background: #2793F2"
            >
              {{ guardando ? 'Guardando…' : 'Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal Enviar mensaje -->
    <Teleport to="body">
      <div
        v-if="mensajeModalOpen"
        class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        @click.self="mensajeModalOpen = false"
      >
        <div class="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
          <h3 class="text-xl font-bold mb-2">Enviar mensaje</h3>
          <p class="text-sm text-gray-600 mb-4">A: {{ mensajeDestinatario }}</p>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Mensaje</label>
            <textarea
              v-model="mensajeContenido"
              rows="4"
              class="w-full px-4 py-3 rounded-lg border resize-y"
              style="border-color: #C8D9B0"
              placeholder="Escribe tu mensaje..."
            ></textarea>
          </div>
          <div v-if="mensajesConversacion.length" class="mb-4 p-3 rounded-lg bg-gray-50 max-h-40 overflow-y-auto">
            <div class="text-xs font-medium text-gray-500 mb-2">Conversación anterior</div>
            <div v-for="m in mensajesConversacion" :key="m.id" class="text-sm py-1">
              <span class="text-gray-500">{{ formatDateTime(m.created_at) }}:</span> {{ m.contenido }}
            </div>
          </div>
          <div class="flex gap-3 justify-end">
            <button type="button" @click="mensajeModalOpen = false" class="px-4 py-2 rounded-lg border-2 font-semibold" style="border-color: #C8D9B0">
              Cerrar
            </button>
            <button
              type="button"
              @click="enviarMensaje"
              :disabled="!mensajeContenido.trim() || enviandoMensaje"
              class="px-4 py-2 rounded-lg font-semibold text-white disabled:opacity-50"
              style="background: #2793F2"
            >
              {{ enviandoMensaje ? 'Enviando…' : 'Enviar' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { useAdminSolicitudes, type AdminSolicitud } from '@/composables/useAdminSolicitudes'
import { useAdminMensajes, type Mensaje } from '@/composables/useAdminMensajes'

const { solicitudes, loading, error, fetchSolicitudes, updateSolicitud } = useAdminSolicitudes()
const { enviarMensaje: enviarMensajeRpc, getConversacion } = useAdminMensajes()

const editModalOpen = ref(false)
const editForm = ref({ estado: '', respuesta_admin: '' })
const solicitudEditando = ref<AdminSolicitud | null>(null)
const guardando = ref(false)

const mensajeModalOpen = ref(false)
const mensajeDestinatario = ref('')
const mensajeContenido = ref('')
const mensajeTipo = ref<'user' | 'comprador' | 'perfil'>('user')
const mensajeDestinoId = ref('')
const mensajeSolicitudId = ref<string | null>(null)
const mensajesConversacion = ref<Mensaje[]>([])
const enviandoMensaje = ref(false)

onMounted(() => fetchSolicitudes())

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}
function formatDateTime(d: string) {
  return new Date(d).toLocaleString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function openEdit(s: AdminSolicitud) {
  solicitudEditando.value = s
  editForm.value = {
    estado: s.estado || 'pendiente',
    respuesta_admin: s.respuesta_admin || ''
  }
  editModalOpen.value = true
}

async function guardarEdicion() {
  if (!solicitudEditando.value) return
  guardando.value = true
  try {
    await updateSolicitud(solicitudEditando.value.id, {
      estado: editForm.value.estado,
      respuesta_admin: editForm.value.respuesta_admin
    })
    editModalOpen.value = false
  } finally {
    guardando.value = false
  }
}

async function openMensaje(s: AdminSolicitud, tipo: 'user' | 'comprador' | 'perfil', destinoId: string) {
  mensajeTipo.value = tipo
  mensajeDestinoId.value = destinoId
  mensajeDestinatario.value = `${s.user_name || s.user_email} (${s.user_email})`
  mensajeSolicitudId.value = s.id
  mensajeContenido.value = ''
  mensajesConversacion.value = await getConversacion(tipo, destinoId)
  mensajeModalOpen.value = true
}

async function enviarMensaje() {
  if (!mensajeContenido.value.trim()) return
  enviandoMensaje.value = true
  try {
    await enviarMensajeRpc({
      to_user_id: mensajeTipo.value === 'user' ? mensajeDestinoId.value : undefined,
      to_comprador_id: mensajeTipo.value === 'comprador' ? mensajeDestinoId.value : undefined,
      to_perfil_id: mensajeTipo.value === 'perfil' ? mensajeDestinoId.value : undefined,
      solicitud_id: mensajeSolicitudId.value,
      contenido: mensajeContenido.value.trim()
    })
    mensajesConversacion.value = await getConversacion(mensajeTipo.value, mensajeDestinoId.value)
    mensajeContenido.value = ''
  } finally {
    enviandoMensaje.value = false
  }
}
</script>
