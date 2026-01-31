<template>
  <AdminLayout>
    <div class="p-6" style="background-color: #F2F2F2">
      <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center gap-4">
            <button
              v-if="isFormView"
              type="button"
              @click="goToList"
              class="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
              style="color: #2793F2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Volver
            </button>
            <h1 class="text-3xl font-bold" style="color: #0D0D0D">
              {{ isFormView ? (editingId ? 'Editar noticia' : 'Crear noticia') : 'Gestión de Noticias' }}
            </h1>
          </div>
          <button
            v-if="!isFormView"
            @click="goToNew"
            class="px-6 py-2 text-white rounded-lg transition-colors font-semibold hover:opacity-90"
            style="background-color: #2793F2"
          >
            + Nueva Noticia
          </button>
        </div>

        <!-- Lista de noticias -->
        <template v-if="!isFormView">
          <div v-if="loading" class="text-center py-12 text-gray-600">Cargando noticias...</div>
          <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {{ error }}
          </div>
          <div v-else class="bg-white rounded-2xl shadow overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr style="background-color: #F2F2F2; border-bottom: 2px solid #C8D9B0">
                    <th class="px-4 py-3 text-sm font-semibold" style="color: #0D0D0D">Orden</th>
                    <th class="px-4 py-3 text-sm font-semibold" style="color: #0D0D0D">Título</th>
                    <th class="px-4 py-3 text-sm font-semibold hidden sm:table-cell" style="color: #0D0D0D">Resumen</th>
                    <th class="px-4 py-3 text-sm font-semibold w-40" style="color: #0D0D0D">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="entrada in entradas"
                    :key="entrada.id"
                    class="border-b border-gray-200 hover:bg-gray-50/50"
                  >
                    <td class="px-4 py-3 text-sm font-medium" style="color: #0D0D0D">{{ entrada.orden }}</td>
                    <td class="px-4 py-3">
                      <span class="font-semibold" style="color: #0D0D0D">{{ entrada.titulo }}</span>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell max-w-xs truncate">
                      {{ entrada.resumen }}
                    </td>
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-2">
                        <router-link
                          :to="`/noticias/${entrada.id}`"
                          class="px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors hover:opacity-90"
                          style="background-color: #C8D9B0; color: #2793F2"
                        >
                          Editar
                        </router-link>
                        <button
                          type="button"
                          @click="confirmDelete(entrada)"
                          class="px-3 py-1.5 text-sm font-semibold rounded-lg border transition-colors hover:opacity-90"
                          style="border-color: #C8D9B0; color: #0D0D0D"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-if="entradas.length === 0 && !loading" class="px-4 py-8 text-center text-gray-500">
              No hay noticias. Crea la primera.
            </p>
          </div>
        </template>

        <!-- Formulario crear / editar -->
        <template v-else>
          <div v-if="submitError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {{ submitError }}
          </div>
          <form @submit.prevent="submit" class="bg-white rounded-2xl shadow p-6 sm:p-8 space-y-6">
            <div>
              <label class="block text-sm font-semibold mb-2" style="color: #0D0D0D">Título</label>
              <input
                v-model="form.titulo"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg border-2 bg-white"
                style="border-color: #C8D9B0; color: #0D0D0D"
                placeholder="Título de la noticia"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2" style="color: #0D0D0D">Resumen</label>
              <textarea
                v-model="form.resumen"
                required
                rows="6"
                class="w-full px-4 py-3 rounded-lg border-2 bg-white resize-y"
                style="border-color: #C8D9B0; color: #0D0D0D"
                placeholder="Texto de la noticia / resumen"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2" style="color: #0D0D0D">URL de la fuente</label>
              <input
                v-model="form.fuente_url"
                type="url"
                class="w-full px-4 py-3 rounded-lg border-2 bg-white"
                style="border-color: #C8D9B0; color: #0D0D0D"
                placeholder="https://..."
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2" style="color: #0D0D0D">Orden</label>
              <input
                v-model.number="form.orden"
                type="number"
                min="0"
                class="w-full max-w-32 px-4 py-3 rounded-lg border-2 bg-white"
                style="border-color: #C8D9B0; color: #0D0D0D"
              />
            </div>
            <div class="flex gap-3">
              <button
                type="submit"
                :disabled="saving"
                class="px-6 py-3 text-white rounded-lg font-semibold transition-colors hover:opacity-90 disabled:opacity-60"
                style="background-color: #2793F2"
              >
                {{ saving ? 'Guardando...' : (editingId ? 'Guardar cambios' : 'Crear noticia') }}
              </button>
              <button
                type="button"
                @click="goToList"
                class="px-6 py-3 rounded-lg font-semibold border-2 transition-colors"
                style="border-color: #C8D9B0; color: #0D0D0D"
              >
                Cancelar
              </button>
            </div>
          </form>
        </template>
      </div>
    </div>

    <!-- Modal confirmar eliminar -->
    <div
      v-if="toDelete"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="toDelete = null"
    >
      <div class="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
        <h3 class="text-lg font-bold mb-2" style="color: #0D0D0D">¿Eliminar noticia?</h3>
        <p class="text-gray-600 mb-4">
          Se eliminará «{{ toDelete.titulo }}». Esta acción no se puede deshacer.
        </p>
        <div class="flex gap-3 justify-end">
          <button
            type="button"
            @click="toDelete = null"
            class="px-4 py-2 rounded-lg font-semibold border-2"
            style="border-color: #C8D9B0; color: #0D0D0D"
          >
            Cancelar
          </button>
          <button
            type="button"
            @click="doDelete"
            :disabled="deleting"
            class="px-4 py-2 rounded-lg font-semibold text-white hover:opacity-90 disabled:opacity-60"
            style="background-color: #2793F2"
          >
            {{ deleting ? 'Eliminando...' : 'Eliminar' }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { supabase } from '@/config/supabase'
import { useAuth } from '@/composables/useAuth'

export interface BlogEntrada {
  id: string
  titulo: string
  resumen: string
  fuente_url: string | null
  orden: number
  created_at?: string
}

const route = useRoute()
const router = useRouter()
const { currentUser } = useAuth()

const entradas = ref<BlogEntrada[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const saving = ref(false)
const submitError = ref<string | null>(null)
const deleting = ref(false)
const toDelete = ref<BlogEntrada | null>(null)

const editingId = computed(() => {
  const id = route.params.id as string
  return id && id !== 'nuevo' ? id : null
})

const isFormView = computed(() => route.path === '/noticias/nuevo' || !!editingId.value)

const form = ref({
  titulo: '',
  resumen: '',
  fuente_url: '',
  orden: 0
})

async function loadEntradas() {
  loading.value = true
  error.value = null
  try {
    const { data, error: fetchError } = await supabase
      .from('blog_entradas')
      .select('id, titulo, resumen, fuente_url, orden, created_at')
      .order('orden', { ascending: true })

    if (fetchError) throw fetchError
    entradas.value = (data ?? []) as BlogEntrada[]
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al cargar noticias'
  } finally {
    loading.value = false
  }
}

async function loadOne(id: string) {
  const { data, error: fetchError } = await supabase
    .from('blog_entradas')
    .select('id, titulo, resumen, fuente_url, orden')
    .eq('id', id)
    .single()

  if (fetchError || !data) {
    submitError.value = 'Noticia no encontrada'
    return
  }
  const e = data as BlogEntrada
  form.value = {
    titulo: e.titulo,
    resumen: e.resumen,
    fuente_url: e.fuente_url ?? '',
    orden: e.orden ?? 0
  }
}

function goToList() {
  router.push('/noticias')
}
function goToNew() {
  router.push('/noticias/nuevo')
  form.value = { titulo: '', resumen: '', fuente_url: '', orden: entradas.value.length + 1 }
}

async function submit() {
  const uid = currentUser.value?.uid
  if (!uid) {
    submitError.value = 'Debes iniciar sesión'
    return
  }
  saving.value = true
  submitError.value = null
  try {
    if (editingId.value) {
      const { error: rpcErr } = await supabase.rpc('update_blog_entrada', {
        p_firebase_uid: uid,
        p_id: editingId.value,
        p_titulo: form.value.titulo,
        p_resumen: form.value.resumen,
        p_fuente_url: form.value.fuente_url || null,
        p_orden: form.value.orden
      })
      if (rpcErr) throw rpcErr
      await loadEntradas()
      goToList()
    } else {
      const { error: rpcErr } = await supabase.rpc('insert_blog_entrada', {
        p_firebase_uid: uid,
        p_titulo: form.value.titulo,
        p_resumen: form.value.resumen,
        p_fuente_url: form.value.fuente_url || null,
        p_orden: form.value.orden
      })
      if (rpcErr) throw rpcErr
      await loadEntradas()
      goToList()
    }
  } catch (e) {
    submitError.value = e instanceof Error ? e.message : 'Error al guardar'
  } finally {
    saving.value = false
  }
}

function confirmDelete(entrada: BlogEntrada) {
  toDelete.value = entrada
}
async function doDelete() {
  if (!toDelete.value) return
  const uid = currentUser.value?.uid
  if (!uid) {
    submitError.value = 'Debes iniciar sesión'
    toDelete.value = null
    return
  }
  deleting.value = true
  submitError.value = null
  try {
    const { error: rpcErr } = await supabase.rpc('delete_blog_entrada', {
      p_firebase_uid: uid,
      p_id: toDelete.value.id
    })
    if (rpcErr) throw rpcErr
    await loadEntradas()
    toDelete.value = null
  } catch (e) {
    submitError.value = e instanceof Error ? e.message : 'Error al eliminar'
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  loadEntradas()
})

watch(
  () => [route.path, editingId.value],
  async () => {
    if (route.path === '/noticias/nuevo') {
      form.value = { titulo: '', resumen: '', fuente_url: '', orden: entradas.value.length + 1 }
      submitError.value = null
    } else if (editingId.value) {
      submitError.value = null
      await loadOne(editingId.value)
    }
  },
  { immediate: true }
)
</script>
