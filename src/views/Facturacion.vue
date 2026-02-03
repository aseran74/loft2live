<template>
  <admin-layout>
    <div class="p-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-2" style="color: #0D0D0D">Facturación</h1>
        <p class="text-gray-600 mb-6">
          Pagos trimestrales a compradores por proyecto y ticket, según rentabilidad de lofts alquilados.
        </p>

        <!-- Selector de período -->
        <div v-if="proyectosConPagos.length > 0" class="flex flex-wrap items-center gap-4 mb-6">
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Año</label>
            <select
              v-model.number="anioActual"
              class="px-3 py-2 border rounded-lg text-sm"
              style="border-color: #C8D9B0"
              @change="cambiarPeriodo"
            >
              <option v-for="y in aniosDisponibles" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Trimestre</label>
            <select
              v-model.number="trimestreActual"
              class="px-3 py-2 border rounded-lg text-sm"
              style="border-color: #C8D9B0"
              @change="cambiarPeriodo"
            >
              <option :value="1">Q1 (Ene–Mar)</option>
              <option :value="2">Q2 (Abr–Jun)</option>
              <option :value="3">Q3 (Jul–Sep)</option>
              <option :value="4">Q4 (Oct–Dic)</option>
            </select>
          </div>
        </div>

        <div v-if="loading" class="text-center py-12">
          <p class="text-gray-600">Cargando facturación…</p>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
          {{ error }}
        </div>

        <div v-else-if="proyectosConPagos.length === 0" class="bg-white rounded-xl shadow p-8 text-center">
          <p class="text-gray-600">No hay proyectos con lofts alquilados que generen pagos trimestrales.</p>
          <p class="text-sm text-gray-500 mt-2">Los pagos se calculan a partir de los ingresos por alquiler divididos entre los tickets del proyecto.</p>
        </div>

        <div v-else class="space-y-8">
          <!-- Resumen global -->
          <div class="bg-white rounded-xl shadow p-6" style="border-left: 4px solid #2793F2">
            <h2 class="text-lg font-bold mb-4" style="color: #0D0D0D">Resumen trimestral {{ anioActual }} – Q{{ trimestreActual }}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div class="text-xs text-gray-500 uppercase">Proyectos con pagos</div>
                <div class="text-2xl font-bold" style="color: #2793F2">{{ proyectosConPagos.length }}</div>
              </div>
              <div>
                <div class="text-xs text-gray-500 uppercase">Compradores a pagar</div>
                <div class="text-2xl font-bold" style="color: #2793F2">{{ totalCompradores }}</div>
              </div>
              <div>
                <div class="text-xs text-gray-500 uppercase">Total a pagar (trimestre)</div>
                <div class="text-2xl font-bold" style="color: #2793F2">{{ formatCurrency(totalAPagarTrimestre) }}</div>
              </div>
            </div>
          </div>

          <!-- Por proyecto -->
          <div
            v-for="item in proyectosConPagos"
            :key="item.proyecto.id"
            class="bg-white rounded-xl shadow overflow-hidden"
          >
            <div class="px-6 py-4 border-b" style="border-color: #C8D9B0; background: rgba(200, 216, 175, 0.2)">
              <h2 class="text-xl font-bold" style="color: #0D0D0D">{{ item.proyecto.nombre_proyecto }}</h2>
              <div class="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span>Rentabilidad ticket: {{ formatCurrency(item.rentabilidadPorTicketMensual) }}/mes</span>
                <span>·</span>
                <span>Trimestral por ticket: {{ formatCurrency(item.rentabilidadPorTicketTrimestral) }}</span>
                <span>·</span>
                <span>{{ item.numTickets }} tickets</span>
                <span>·</span>
                <span>Total proyecto: {{ formatCurrency(item.totalProyectoTrimestre) }}/trimestre</span>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comprador</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tickets</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">A pagar (trimestre)</th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Pagado anual {{ anioActual }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr
                    v-for="c in item.compradores"
                    :key="c.id"
                    class="hover:bg-gray-50"
                  >
                    <td class="px-6 py-4 whitespace-nowrap font-medium" style="color: #0D0D0D">
                      {{ c.nombre }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {{ c.correo }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right">
                      {{ getTicketsComprador(c) }}
                      <span v-if="c.tipo_compra === 'loft_completo'" class="text-xs text-gray-500">(loft completo)</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right font-semibold" style="color: #2793F2">
                      {{ formatCurrency(getPagoTrimestralComprador(c, item.rentabilidadPorTicketTrimestral)) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                      <select
                        :value="getEstadoPago(item.proyecto.id!, c.id!)"
                        @change="cambiarEstado(item, c, $event)"
                        class="px-2 py-1 text-sm rounded border"
                        :class="getEstadoSelectClass(getEstadoPago(item.proyecto.id!, c.id!))"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="pagado">Pagado</option>
                        <option value="incidencia">Incidencia</option>
                      </select>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right font-semibold" style="color: #0D0D0D">
                      {{ formatCurrency(getPagadoAnualComprador(c.id!)) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { fetchRentabilidades } from '@/utils/publicProyectos'
import { useUsuariosCompradores } from '@/composables/useUsuarios'
import { useFacturacion, type EstadoPago } from '@/composables/useFacturacion'
import type { Proyecto } from '@/types/proyecto'
import type { UsuarioComprador } from '@/types/usuario'

const { compradores, fetchCompradores } = useUsuariosCompradores()
const { fetchPagos, fetchPagadoAnualPorComprador, upsertPago, updateEstadoPago } = useFacturacion()

const proyectos = ref<Proyecto[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const now = new Date()
const anioActual = ref(now.getFullYear())
const trimestreActual = ref(Math.ceil((now.getMonth() + 1) / 3) as 1 | 2 | 3 | 4)
const aniosDisponibles = computed(() => {
  const y = now.getFullYear()
  return [y, y - 1, y - 2]
})

/** Map: `${proyecto_id}-${comprador_id}` -> estado */
const pagosEstadoMap = ref<Map<string, EstadoPago>>(new Map())
/** Map: comprador_id -> total pagado en el año */
const pagadoAnualMap = ref<Map<string, number>>(new Map())

/** Proyectos con rentabilidad que generan pagos trimestrales + compradores agrupados */
const proyectosConPagos = computed(() => {
  const items: Array<{
    proyecto: Proyecto
    rentabilidadPorTicketMensual: number
    rentabilidadPorTicketTrimestral: number
    numTickets: number
    totalProyectoTrimestre: number
    compradores: UsuarioComprador[]
  }> = []

  for (const p of proyectos.value) {
    const tipos = (p.unidades_tipos || []) as Array<{ alquilados?: number; precio_alquiler?: number }>
    let ingresosMensuales = 0
    for (const t of tipos) {
      const alq = Number(t.alquilados) || 0
      const precio = Number(t.precio_alquiler) || 0
      if (alq > 0 && precio > 0) ingresosMensuales += alq * precio
    }
    if (ingresosMensuales <= 0) continue

    const ticketSize = Number(p.precio_ticket) || 5000
    const objetivo = Number(p.objetivo_inversion_total) || 0
    const numTickets = objetivo > 0 ? Math.floor(objetivo / ticketSize) : 0
    if (numTickets <= 0) continue

    const rentabilidadPorTicketMensual = ingresosMensuales / numTickets
    const rentabilidadPorTicketTrimestral = rentabilidadPorTicketMensual * 3

    const comps = compradores.value.filter((c) => c.proyecto_id === p.id && c.estado !== 'cancelado')
    let totalProyectoTrimestre = 0
    for (const c of comps) {
      const tickets = getTicketsComprador(c)
      totalProyectoTrimestre += tickets * rentabilidadPorTicketTrimestral
    }

    items.push({
      proyecto: p,
      rentabilidadPorTicketMensual,
      rentabilidadPorTicketTrimestral,
      numTickets,
      totalProyectoTrimestre: Math.round(totalProyectoTrimestre * 100) / 100,
      compradores: comps,
    })
  }

  return items
})

const totalCompradores = computed(() =>
  proyectosConPagos.value.reduce((acc, item) => acc + item.compradores.length, 0)
)

const totalAPagarTrimestre = computed(() =>
  proyectosConPagos.value.reduce((acc, item) => acc + item.totalProyectoTrimestre, 0)
)

function getTicketsComprador(c: UsuarioComprador): number {
  if (c.tipo_compra === 'loft_completo') {
    return Math.floor((c.monto_invertido || 0) / 5000)
  }
  return c.num_tickets ?? Math.floor((c.monto_invertido || 0) / 5000)
}

function getPagoTrimestralComprador(c: UsuarioComprador, rentabilidadTrimestral: number): number {
  const tickets = getTicketsComprador(c)
  return Math.round(tickets * rentabilidadTrimestral * 100) / 100
}

function getEstadoPago(proyectoId: string, compradorId: string): EstadoPago {
  return pagosEstadoMap.value.get(`${proyectoId}-${compradorId}`) || 'pendiente'
}

function getPagadoAnualComprador(compradorId: string): number {
  return pagadoAnualMap.value.get(compradorId) || 0
}

function getEstadoSelectClass(estado: EstadoPago): string {
  if (estado === 'pagado') return 'border-green-300 bg-green-50 text-green-800'
  if (estado === 'incidencia') return 'border-amber-300 bg-amber-50 text-amber-800'
  return 'border-gray-300 bg-gray-50 text-gray-700'
}

async function cambiarEstado(
  item: { proyecto: Proyecto; rentabilidadPorTicketTrimestral: number },
  c: UsuarioComprador,
  ev: Event
) {
  const estado = (ev.target as HTMLSelectElement).value as EstadoPago
  const pid = item.proyecto.id!
  const cid = c.id!
  const monto = getPagoTrimestralComprador(c, item.rentabilidadPorTicketTrimestral)

  try {
    const updated = await updateEstadoPago(pid, cid, anioActual.value, trimestreActual.value, estado)
    if (updated) {
      pagosEstadoMap.value.set(`${pid}-${cid}`, estado)
    } else {
      await upsertPago({
        proyecto_id: pid,
        comprador_id: cid,
        anio: anioActual.value,
        trimestre: trimestreActual.value,
        monto,
        estado,
      })
      pagosEstadoMap.value.set(`${pid}-${cid}`, estado)
    }
    await cargarPagadoAnual()
  } catch (e: any) {
    error.value = e?.message || 'Error al actualizar estado'
  }
}

async function cargarPagosPeriodo() {
  const pagos = await fetchPagos(anioActual.value, trimestreActual.value)
  const map = new Map<string, EstadoPago>()
  for (const p of pagos) {
    map.set(`${p.proyecto_id}-${p.comprador_id}`, p.estado as EstadoPago)
  }
  pagosEstadoMap.value = map
}

async function cargarPagadoAnual() {
  pagadoAnualMap.value = await fetchPagadoAnualPorComprador(anioActual.value)
}

async function asegurarPagosExisten() {
  for (const item of proyectosConPagos.value) {
    for (const c of item.compradores) {
      const monto = getPagoTrimestralComprador(c, item.rentabilidadPorTicketTrimestral)
      const estado = pagosEstadoMap.value.get(`${item.proyecto.id!}-${c.id!}`) || 'pendiente'
      await upsertPago({
        proyecto_id: item.proyecto.id!,
        comprador_id: c.id!,
        anio: anioActual.value,
        trimestre: trimestreActual.value,
        monto,
        estado,
      })
    }
  }
}

async function cambiarPeriodo() {
  loading.value = true
  error.value = null
  try {
    await cargarPagosPeriodo()
    await asegurarPagosExisten()
    await cargarPagosPeriodo()
    await cargarPagadoAnual()
  } catch (e: any) {
    error.value = e?.message || 'Error al cargar período'
  } finally {
    loading.value = false
  }
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(amount || 0)

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    await Promise.all([fetchCompradores(), loadProyectos()])
    await nextTick()
    await cargarPagosPeriodo()
    await asegurarPagosExisten()
    await cargarPagosPeriodo()
    await cargarPagadoAnual()
  } catch (e: any) {
    error.value = e?.message || 'Error al cargar datos'
  } finally {
    loading.value = false
  }
})

async function loadProyectos() {
  proyectos.value = await fetchRentabilidades()
}
</script>
