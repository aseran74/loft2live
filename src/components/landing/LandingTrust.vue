<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="text-center mb-10">
        <h2 class="text-3xl lg:text-4xl font-bold mb-3" style="color: #0D0D0D">
          Confianza de los clientes,<br />
          <span style="color: var(--color-landing-primary)">la base de nuestro negocio</span>
        </h2>
        <p class="text-lg max-w-3xl mx-auto" style="color: #0D0D0D">
          LoftAndLive es una plataforma inmobiliaria P2P impulsada por <span class="font-semibold" style="color: var(--color-landing-primary)">Grupo Vihorev</span>.
          Nuestros logros hablan por sí solos:
        </p>
        <a
          href="#descubre-como"
          class="inline-block mt-6 px-6 py-3 text-base font-semibold text-white rounded-lg transition opacity-90 hover:opacity-100"
          style="background-color: var(--color-landing-primary)"
        >
          Descubre cómo
        </a>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div class="rounded-xl p-5 text-center" style="background-color: rgba(var(--color-landing-primary-rgb), 0.2)">
          <div class="text-3xl font-bold mb-2" style="color: var(--color-landing-primary)">
            {{ statsLoading ? '—' : inversoresLabel }}
          </div>
          <div class="font-medium" style="color: #0D0D0D">Inversores y creciendo</div>
        </div>
        <div class="rounded-xl p-5 text-center" style="background-color: rgba(var(--color-landing-primary-rgb), 0.2)">
          <div class="text-3xl font-bold mb-2" style="color: var(--color-landing-primary)">
            {{ statsLoading ? '—' : elevadoLabel }}
          </div>
          <div class="font-medium" style="color: #0D0D0D">Elevado</div>
        </div>
        <div class="rounded-xl p-5 text-center" style="background-color: rgba(var(--color-landing-primary-rgb), 0.2)">
          <div class="text-3xl font-bold mb-2" style="color: var(--color-landing-primary)">
            {{ statsLoading ? '—' : proyectosFinanciadosLabel }}
          </div>
          <div class="font-medium" style="color: #0D0D0D">Proyectos financiados</div>
        </div>
        <div class="rounded-xl p-5 text-center" style="background-color: rgba(var(--color-landing-primary-rgb), 0.2)">
          <div class="text-3xl font-bold mb-2" style="color: var(--color-landing-primary)">
            {{ statsLoading ? '—' : valorBrutoLabel }}
          </div>
          <div class="font-medium" style="color: #0D0D0D">Valor bruto de desarrollo</div>
        </div>
      </div>

      <!-- Detailed Stats Table -->
      <div class="rounded-2xl p-6 overflow-x-auto" style="background-color: var(--color-landing-cream)">
        <table class="w-full min-w-[600px]">
          <thead>
            <tr class="border-b-2" style="border-color: rgba(var(--color-landing-primary-rgb), 0.2)">
              <th class="text-left py-3 px-4 font-semibold" style="color: #0D0D0D">Estado</th>
              <th class="text-left py-3 px-4 font-semibold" style="color: #0D0D0D">Unidades</th>
              <th class="text-left py-3 px-4 font-semibold" style="color: #0D0D0D">Metros cuadrados</th>
              <th class="text-left py-3 px-4 font-semibold" style="color: #0D0D0D">Coste de inversión</th>
              <th class="text-left py-3 px-4 font-semibold" style="color: #0D0D0D">Valor bruto de desarrollo</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b" style="border-color: rgba(var(--color-landing-primary-rgb), 0.2)">
              <td class="py-3 px-4 font-medium" style="color: #0D0D0D">Completadas</td>
              <td class="py-3 px-4" style="color: #0D0D0D">115</td>
              <td class="py-3 px-4" style="color: #0D0D0D">7,096</td>
              <td class="py-3 px-4" style="color: #0D0D0D">11,840,000 EUR</td>
              <td class="py-3 px-4" style="color: #0D0D0D">17,000,000 EUR</td>
            </tr>
            <tr class="border-b" style="border-color: rgba(var(--color-landing-primary-rgb), 0.2)">
              <td class="py-3 px-4 font-medium" style="color: #0D0D0D">En operación</td>
              <td class="py-3 px-4" style="color: #0D0D0D">197</td>
              <td class="py-3 px-4" style="color: #0D0D0D">9,040</td>
              <td class="py-3 px-4" style="color: #0D0D0D">35,600,000 EUR</td>
              <td class="py-3 px-4" style="color: #0D0D0D">44,600,000 EUR</td>
            </tr>
            <tr class="border-b" style="border-color: rgba(var(--color-landing-primary-rgb), 0.2)">
              <td class="py-3 px-4 font-medium" style="color: #0D0D0D">En construcción</td>
              <td class="py-3 px-4" style="color: #0D0D0D">60</td>
              <td class="py-3 px-4" style="color: #0D0D0D">9,822</td>
              <td class="py-3 px-4" style="color: #0D0D0D">16,300,000 EUR</td>
              <td class="py-3 px-4" style="color: #0D0D0D">21,170,000 EUR</td>
            </tr>
            <tr class="font-semibold" style="background-color: rgba(var(--color-landing-primary-rgb), 0.2)">
              <td class="py-3 px-4" style="color: #0D0D0D">Total</td>
              <td class="py-3 px-4" style="color: #0D0D0D">472</td>
              <td class="py-3 px-4" style="color: #0D0D0D">25,958</td>
              <td class="py-3 px-4" style="color: #0D0D0D">63,740,000 EUR</td>
              <td class="py-3 px-4" style="color: #0D0D0D">82,770,000 EUR</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { supabase } from '@/config/supabase'

type LandingStats = {
  inversores: number
  elevado: number
  proyectosFinanciados: number
  valorBruto: number
}

const statsLoading = ref(true)
const statsError = ref<string | null>(null)
const stats = ref<LandingStats>({
  inversores: 0,
  elevado: 0,
  proyectosFinanciados: 0,
  valorBruto: 0,
})

const formatInt = (n: number) => new Intl.NumberFormat('es-ES').format(Math.round(n))
const formatCompactEur = (n: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 0,
  }).format(n)

const inversoresLabel = computed(() => formatInt(stats.value.inversores))
const elevadoLabel = computed(() => formatCompactEur(stats.value.elevado))
const proyectosFinanciadosLabel = computed(() => formatInt(stats.value.proyectosFinanciados))
const valorBrutoLabel = computed(() => formatCompactEur(stats.value.valorBruto))

async function fetchLandingStats() {
  statsLoading.value = true
  statsError.value = null

  try {
    // Conteos (persistentes)
    const usersCountReq = supabase.from('users').select('id', { count: 'exact', head: true })
    const usuariosProfileCountReq = supabase
      .from('usuarios_profile')
      .select('id', { count: 'exact', head: true })
    const usuariosCompradoresCountReq = supabase
      .from('usuarios_compradores')
      .select('id', { count: 'exact', head: true })
    const proyectosCountReq = supabase.from('proyectos').select('id', { count: 'exact', head: true })

    // Datos de proyectos para cálculos (elevado / valor bruto)
    const proyectosDataReq = supabase
      .from('proyectos')
      .select('objetivo_inversion_total, porcentaje_llegado, monto_restante')

    const [
      usersCountRes,
      usuariosProfileCountRes,
      usuariosCompradoresCountRes,
      proyectosCountRes,
      proyectosDataRes,
    ] = await Promise.all([
      usersCountReq,
      usuariosProfileCountReq,
      usuariosCompradoresCountReq,
      proyectosCountReq,
      proyectosDataReq,
    ])

    // Si alguna tabla no es accesible por RLS, no rompemos la landing: dejamos 0 y mostramos warning.
    const inversores =
      (usersCountRes.error ? 0 : usersCountRes.count ?? 0) +
      (usuariosProfileCountRes.error ? 0 : usuariosProfileCountRes.count ?? 0) +
      (usuariosCompradoresCountRes.error ? 0 : usuariosCompradoresCountRes.count ?? 0)

    const proyectosFinanciados = proyectosCountRes.error ? 0 : proyectosCountRes.count ?? 0

    const proyectos = proyectosDataRes.error ? [] : proyectosDataRes.data || []

    const valorBruto = proyectos.reduce((acc: number, p: any) => acc + (Number(p.objetivo_inversion_total) || 0), 0)

    // Elevado: objetivo * porcentaje_llegado (si existe), si no, derivamos de monto_restante si está.
    const elevado = proyectos.reduce((acc: number, p: any) => {
      const objetivo = Number(p.objetivo_inversion_total) || 0
      const porcentaje = Number(p.porcentaje_llegado)
      const restante = Number(p.monto_restante)

      if (Number.isFinite(porcentaje) && porcentaje > 0) {
        return acc + objetivo * (porcentaje / 100)
      }

      if (Number.isFinite(restante) && objetivo > 0) {
        return acc + Math.max(0, objetivo - restante)
      }

      return acc
    }, 0)

    stats.value = {
      inversores,
      elevado,
      proyectosFinanciados,
      valorBruto,
    }

    if (
      usersCountRes.error ||
      usuariosProfileCountRes.error ||
      usuariosCompradoresCountRes.error ||
      proyectosCountRes.error ||
      proyectosDataRes.error
    ) {
      console.warn('Landing stats: alguna consulta falló (posible RLS).', {
        users: usersCountRes.error,
        usuarios_profile: usuariosProfileCountRes.error,
        usuarios_compradores: usuariosCompradoresCountRes.error,
        proyectosCount: proyectosCountRes.error,
        proyectosData: proyectosDataRes.error,
      })
    }
  } catch (e: any) {
    console.warn('Landing stats: error cargando métricas', e)
    statsError.value = e?.message || 'Error cargando métricas'
  } finally {
    statsLoading.value = false
  }
}

onMounted(() => {
  fetchLandingStats()
})
</script>
