<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
    <!-- Usuarios -->
    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <svg
          class="fill-gray-800 dark:fill-white/90"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.80443 5.60156C7.59109 5.60156 6.60749 6.58517 6.60749 7.79851C6.60749 9.01185 7.59109 9.99545 8.80443 9.99545C10.0178 9.99545 11.0014 9.01185 11.0014 7.79851C11.0014 6.58517 10.0178 5.60156 8.80443 5.60156ZM5.10749 7.79851C5.10749 5.75674 6.76267 4.10156 8.80443 4.10156C10.8462 4.10156 12.5014 5.75674 12.5014 7.79851C12.5014 9.84027 10.8462 11.4955 8.80443 11.4955C6.76267 11.4955 5.10749 9.84027 5.10749 7.79851ZM4.86252 15.3208C4.08769 16.0881 3.70377 17.0608 3.51705 17.8611C3.48384 18.0034 3.5211 18.1175 3.60712 18.2112C3.70161 18.3141 3.86659 18.3987 4.07591 18.3987H13.4249C13.6343 18.3987 13.7992 18.3141 13.8937 18.2112C13.9797 18.1175 14.017 18.0034 13.9838 17.8611C13.7971 17.0608 13.4132 16.0881 12.6383 15.3208C11.8821 14.572 10.6899 13.955 8.75042 13.955C6.81096 13.955 5.61877 14.572 4.86252 15.3208ZM3.8071 14.2549C4.87163 13.2009 6.45602 12.455 8.75042 12.455C11.0448 12.455 12.6292 13.2009 13.6937 14.2549C14.7397 15.2906 15.2207 16.5607 15.4446 17.5202C15.7658 18.8971 14.6071 19.8987 13.4249 19.8987H4.07591C2.89369 19.8987 1.73504 18.8971 2.05628 17.5202C2.28015 16.5607 2.76117 15.2906 3.8071 14.2549Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Usuarios dados de alta</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {{ usersCountLabel }}
          </h4>
        </div>

        <span v-if="loading" class="text-xs text-gray-500">Cargando…</span>
        <span v-else-if="error" class="text-xs text-error-600">Sin datos</span>
      </div>
    </div>

    <!-- Proyectos / Lofts -->
    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <svg
          class="fill-gray-800 dark:fill-white/90"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.665 3.75621C11.8762 3.65064 12.1247 3.65064 12.3358 3.75621L18.7807 6.97856L12.3358 10.2009C12.1247 10.3065 11.8762 10.3065 11.665 10.2009L5.22014 6.97856L11.665 3.75621ZM4.29297 8.19203V16.0946C4.29297 16.3787 4.45347 16.6384 4.70757 16.7654L11.25 20.0366V11.6513C11.1631 11.6205 11.0777 11.5843 10.9942 11.5426L4.29297 8.19203ZM12.75 20.037L19.2933 16.7654C19.5474 16.6384 19.7079 16.3787 19.7079 16.0946V8.19202L13.0066 11.5426C12.9229 11.5844 12.8372 11.6208 12.75 11.6516V20.037ZM13.0066 2.41456C12.3732 2.09786 11.6277 2.09786 10.9942 2.41456L4.03676 5.89319C3.27449 6.27432 2.79297 7.05342 2.79297 7.90566V16.0946C2.79297 16.9469 3.27448 17.726 4.03676 18.1071L10.9942 21.5857C11.6277 21.9024 12.3732 21.9024 13.0066 21.5857L19.9641 18.1071C20.7264 17.726 21.2079 16.9469 21.2079 16.0946V7.90566C21.2079 7.05342 20.7264 6.27432 19.9641 5.89319L13.0066 2.41456Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Proyectos</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {{ proyectosCountLabel }}
          </h4>
        </div>

        <div class="text-right">
          <div class="text-xs text-gray-500">Lofts</div>
          <div class="text-sm font-semibold text-gray-800 dark:text-white/90">
            {{ loftsCountLabel }}
          </div>
        </div>
      </div>
    </div>

    <!-- Ahorro fiscal anual -->
    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <svg
          class="fill-gray-800 dark:fill-white/90"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 6C12.4142 6 12.75 6.33579 12.75 6.75V11.25H16.5C16.9142 11.25 17.25 11.5858 17.25 12C17.25 12.4142 16.9142 12.75 16.5 12.75H12C11.5858 12.75 11.25 12.4142 11.25 12V6.75C11.25 6.33579 11.5858 6 12 6Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Ahorro fiscal anual (potencial)</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {{ ahorroFiscalAnualLabel }}
          </h4>
          <p class="mt-1 text-xs text-gray-500">
            Estimación: min(precio_unidad, 50.000€) × 50% por loft.
          </p>
        </div>
      </div>
    </div>

    <!-- Objetivo total -->
    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <svg
          class="fill-gray-800 dark:fill-white/90"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 4.75C3.58579 4.75 3.25 5.08579 3.25 5.5V18.5C3.25 18.9142 3.58579 19.25 4 19.25H20C20.4142 19.25 20.75 18.9142 20.75 18.5V5.5C20.75 5.08579 20.4142 4.75 20 4.75H4ZM1.75 5.5C1.75 4.25736 2.75736 3.25 4 3.25H20C21.2426 3.25 22.25 4.25736 22.25 5.5V18.5C22.25 19.7426 21.2426 20.75 20 20.75H4C2.75736 20.75 1.75 19.7426 1.75 18.5V5.5Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.25 8.5C6.25 8.08579 6.58579 7.75 7 7.75H17C17.4142 7.75 17.75 8.08579 17.75 8.5C17.75 8.91421 17.4142 9.25 17 9.25H7C6.58579 9.25 6.25 8.91421 6.25 8.5ZM6.25 12C6.25 11.5858 6.58579 11.25 7 11.25H17C17.4142 11.25 17.75 11.5858 17.75 12C17.75 12.4142 17.4142 12.75 17 12.75H7C6.58579 12.75 6.25 12.4142 6.25 12Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Objetivo inversión total (proyectos)</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {{ objetivoTotalLabel }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { supabase } from '@/config/supabase'

type Stats = {
  usersCount: number | null
  proyectosCount: number | null
  loftsCount: number | null
  ahorroFiscalAnual: number | null
  objetivoTotal: number | null
}

const loading = ref(true)
const error = ref<string | null>(null)
const stats = ref<Stats>({
  usersCount: null,
  proyectosCount: null,
  loftsCount: null,
  ahorroFiscalAnual: null,
  objetivoTotal: null,
})

const formatInt = (n: number) => new Intl.NumberFormat('es-ES').format(Math.round(n))
const formatEur = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

const usersCountLabel = computed(() => (stats.value.usersCount == null ? '—' : formatInt(stats.value.usersCount)))
const proyectosCountLabel = computed(() =>
  stats.value.proyectosCount == null ? '—' : formatInt(stats.value.proyectosCount),
)
const loftsCountLabel = computed(() => (stats.value.loftsCount == null ? '—' : formatInt(stats.value.loftsCount)))
const ahorroFiscalAnualLabel = computed(() =>
  stats.value.ahorroFiscalAnual == null ? '—' : formatEur(stats.value.ahorroFiscalAnual),
)
const objetivoTotalLabel = computed(() =>
  stats.value.objetivoTotal == null ? '—' : formatEur(stats.value.objetivoTotal),
)

async function fetchStats() {
  loading.value = true
  error.value = null
  try {
    // En este proyecto, el módulo "Usuarios" usa `usuarios_profile` (no `users`)
    const usersReq = supabase.from('usuarios_profile').select('id', { count: 'exact', head: true })
    const proyectosCountReq = supabase.from('proyectos').select('id', { count: 'exact', head: true })
    const proyectosDataReq = supabase.from('proyectos').select('num_lofts, precio_unidad, objetivo_inversion_total')

    const [usersRes, proyectosCountRes, proyectosDataRes] = await Promise.all([
      usersReq,
      proyectosCountReq,
      proyectosDataReq,
    ])

    if (usersRes.error) throw usersRes.error
    if (proyectosCountRes.error) throw proyectosCountRes.error
    if (proyectosDataRes.error) throw proyectosDataRes.error

    const proyectos = proyectosDataRes.data || []

    const loftsCount = proyectos.reduce((acc, p) => acc + (Number(p.num_lofts) || 0), 0)
    const objetivoTotal = proyectos.reduce((acc, p) => acc + (Number(p.objetivo_inversion_total) || 0), 0)

    // Estimación simple (editable): máximo anual Ley Startups en el IRPF por loft.
    // Base anual tope 50.000€, deducción 50%.
    const ANNUAL_BASE_CAP = 50_000
    const DEDUCTION_RATE = 0.5
    const ahorroFiscalAnual = proyectos.reduce((acc, p) => {
      const lofts = Number(p.num_lofts) || 0
      const precio = Number(p.precio_unidad) || 0
      const ahorroPorLoft = Math.min(precio, ANNUAL_BASE_CAP) * DEDUCTION_RATE
      return acc + lofts * ahorroPorLoft
    }, 0)

    stats.value = {
      usersCount: usersRes.count ?? 0,
      proyectosCount: proyectosCountRes.count ?? 0,
      loftsCount,
      ahorroFiscalAnual,
      objetivoTotal,
    }
  } catch (e: any) {
    console.warn('Error cargando métricas del dashboard:', e)
    error.value = e?.message || 'Error cargando métricas'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>
