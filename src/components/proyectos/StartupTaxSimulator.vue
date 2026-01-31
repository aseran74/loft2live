<template>
  <div class="rounded-2xl border bg-white p-4 sm:p-6" style="border-color: #C8D9B0">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-2xl font-bold" style="color: #0D0D0D">Simulador desgravación (Ley Startups)</h2>
        <p class="text-sm text-gray-600 mt-1">
          Reparte la inversión por años y calcula la deducción aplicando el % y el tope anual.
        </p>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90"
          style="background-color: #2793F2"
          @click="applyPreset(years)"
        >
          Reparto automático
        </button>
        <button
          type="button"
          class="px-3 py-2 rounded-lg text-sm font-semibold border hover:opacity-80"
          style="border-color: #C8D9B0; color: #0D0D0D"
          @click="mode = 'custom'"
        >
          Personalizar
        </button>
      </div>
    </div>

    <!-- Descripción breve -->
    <div class="mt-5 rounded-xl border p-4" style="border-color:#C8D9B0; background:#F2F2F2">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <p class="text-sm font-semibold" style="color:#0D0D0D">📌 Ley Startups España</p>
          <ul class="mt-2 space-y-1 text-sm text-gray-700">
            <li>💸 Deducción del <b>50%</b> por inversión, con máx. <b>50.000€</b> por año</li>
            <li>⛔ Si inviertes <b>200.000€</b> en un solo año, el exceso <b>NO</b> se arrastra</li>
            <li>✅ Para deducir más, la inversión debe hacerse en <b>años distintos</b></li>
          </ul>
        </div>
        <a
          href="https://n26.com/es-es/blog/nueva-ley-de-startups"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90"
          style="background-color:#2793F2"
        >
          Ver guía (N26)
        </a>
      </div>
      <p class="text-xs text-gray-500 mt-3">
        Nota: resumen orientativo. Comprueba requisitos y límites aplicables en tu caso.
      </p>
    </div>

    <div class="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="rounded-xl bg-gray-50 p-4">
        <label class="block text-xs font-medium text-gray-600 mb-1">Importe total a invertir</label>
        <input
          v-model.number="totalInvestment"
          type="number"
          min="0"
          step="0.01"
          class="w-full px-3 py-2 rounded-lg border focus:outline-none"
          style="border-color: #C8D9B0"
        />
        <p class="text-xs text-gray-500 mt-1">Sugerido desde el proyecto (precio/unidad).</p>
      </div>

      <div class="rounded-xl bg-gray-50 p-4">
        <label class="block text-xs font-medium text-gray-600 mb-1">Años</label>
        <div class="grid grid-cols-5 gap-2">
          <button
            v-for="y in [1,2,3,4,5]"
            :key="y"
            type="button"
            class="px-2 py-2 rounded-lg text-sm font-semibold border"
            :style="years === y ? 'border-color:#2793F2;color:#2793F2;background:#C8D9B0' : 'border-color:#C8D9B0;color:#0D0D0D;background:#fff'"
            @click="setYears(y)"
          >
            {{ y }}
          </button>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <label class="text-xs font-medium text-gray-600">Modo</label>
          <select
            v-model="mode"
            class="px-3 py-2 rounded-lg border text-sm bg-white"
            style="border-color: #C8D9B0"
          >
            <option value="preset">Automático</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>
      </div>

      <div class="rounded-xl bg-gray-50 p-4">
        <label class="block text-xs font-medium text-gray-600 mb-1">Parámetros fiscales</label>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] text-gray-500 mb-1">% deducción</label>
            <input
              v-model.number="deductionRatePercent"
              type="number"
              min="0"
              max="100"
              step="0.01"
              class="w-full px-3 py-2 rounded-lg border focus:outline-none"
              style="border-color: #C8D9B0"
            />
          </div>
          <div>
            <label class="block text-[11px] text-gray-500 mb-1">Tope anual (base deducible)</label>
            <input
              v-model.number="annualBaseCap"
              type="number"
              min="0"
              step="0.01"
              class="w-full px-3 py-2 rounded-lg border focus:outline-none"
              style="border-color: #C8D9B0"
            />
          </div>
        </div>

        <!-- Slider IRPF anual -->
        <div class="mt-4">
          <div class="flex items-end justify-between gap-3">
            <div>
              <label class="block text-[11px] text-gray-500 mb-1">IRPF anual pagado (para “aprovechar” la deducción)</label>
              <div class="text-sm font-semibold" style="color:#0D0D0D">
                {{ formatCurrency(irpfAnnual) }}
              </div>
            </div>
            <div class="text-[11px] text-gray-500 text-right">
              Rango: {{ formatCurrency(10000) }} – {{ formatCurrency(50000) }}
            </div>
          </div>
          <input
            v-model.number="irpfAnnual"
            type="range"
            min="10000"
            max="50000"
            step="1000"
            class="w-full mt-2"
          />
          <p class="text-xs text-gray-500 mt-2">
            A partir de {{ formatCurrency(maxDeductionPerYearByCap) }} de IRPF, la recomendación se estabiliza (por el tope anual).
          </p>
        </div>

        <p class="text-xs text-gray-500 mt-2">
          Ejemplo: tope 100.000€ y 50% ⇒ máximo 50.000€ de deducción anual.
        </p>
      </div>
    </div>

    <!-- Recomendación automática (según IRPF anual) -->
    <div class="mt-5 rounded-xl border p-4" style="border-color:#C8D9B0; background:#F2F2F2">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 class="text-base font-semibold" style="color:#0D0D0D">Recomendación automática</h3>
          <p class="text-sm text-gray-600 mt-1">
            Con un IRPF anual de <b>{{ formatCurrency(irpfAnnual) }}</b>, lo más conveniente es usar
            <b>{{ recommended.years }}</b> año(s) para maximizar la deducción aprovechable.
          </p>
        </div>
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90"
          style="background-color:#2793F2"
          @click="applyRecommendation()"
        >
          Aplicar recomendación
        </button>
      </div>

      <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="rounded-xl bg-white p-4 border" style="border-color:#C8D9B0">
          <p class="text-xs text-gray-600">Deducción aprovechable (total)</p>
          <p class="text-2xl font-bold" style="color:#2793F2">{{ formatCurrency(recommended.totalUsedDeduction) }}</p>
        </div>
        <div class="rounded-xl bg-white p-4 border" style="border-color:#C8D9B0">
          <p class="text-xs text-gray-600">Máx. deducción/año por tope</p>
          <p class="text-2xl font-bold" style="color:#0D0D0D">{{ formatCurrency(maxDeductionPerYearByCap) }}</p>
        </div>
        <div class="rounded-xl bg-white p-4 border" style="border-color:#C8D9B0">
          <p class="text-xs text-gray-600">Máx. deducción/año por IRPF</p>
          <p class="text-2xl font-bold" style="color:#0D0D0D">{{ formatCurrency(irpfAnnual) }}</p>
        </div>
      </div>

      <div class="mt-3 text-xs text-gray-600">
        Nota: estimación simplificada. El aprovechamiento real puede depender de tu base imponible y normativa aplicable.
      </div>
    </div>

    <div class="mt-5">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-base font-semibold" style="color:#0D0D0D">Reparto por años</h3>
        <div class="text-xs text-gray-600">
          Total asignado: <span class="font-semibold">{{ formatCurrency(totalAllocated) }}</span>
          <span v-if="remainingToAllocate > 0" class="ml-2">
            (resta: <span class="font-semibold">{{ formatCurrency(remainingToAllocate) }}</span>)
          </span>
        </div>
      </div>

      <div class="space-y-2">
        <div
          v-for="row in rows"
          :key="row.year"
          class="grid grid-cols-1 md:grid-cols-12 gap-2 items-center rounded-xl border p-3"
          style="border-color:#C8D9B0"
        >
          <div class="md:col-span-2 text-sm font-semibold" style="color:#0D0D0D">Año {{ row.year }}</div>

          <div class="md:col-span-4">
            <label class="block text-[11px] text-gray-500 mb-1">Inversión año</label>
            <input
              v-model.number="allocations[row.year - 1]"
              type="number"
              min="0"
              step="0.01"
              :disabled="mode === 'preset'"
              class="w-full px-3 py-2 rounded-lg border focus:outline-none disabled:opacity-70"
              style="border-color:#C8D9B0"
              @input="normalizeCustom()"
            />
          </div>

          <div class="md:col-span-3">
            <label class="block text-[11px] text-gray-500 mb-1">Base deducible (cap)</label>
            <div class="text-sm font-semibold" style="color:#0D0D0D">
              {{ formatCurrency(row.eligibleBase) }}
            </div>
            <div v-if="row.nonEligible > 0" class="text-[11px] text-gray-500">
              Fuera de tope: {{ formatCurrency(row.nonEligible) }}
            </div>
          </div>

          <div class="md:col-span-3">
            <label class="block text-[11px] text-gray-500 mb-1">Deducción ({{ deductionRatePercent }}%)</label>
            <div class="text-sm font-bold" style="color:#2793F2">
              {{ formatCurrency(row.deduction) }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="rounded-xl bg-gray-50 p-4">
          <p class="text-xs text-gray-600">Deducción total</p>
          <p class="text-2xl font-bold" style="color:#2793F2">{{ formatCurrency(totalDeduction) }}</p>
        </div>
        <div class="rounded-xl bg-gray-50 p-4">
          <p class="text-xs text-gray-600">Base total deducible</p>
          <p class="text-2xl font-bold" style="color:#0D0D0D">{{ formatCurrency(totalEligibleBase) }}</p>
        </div>
        <div class="rounded-xl bg-gray-50 p-4">
          <p class="text-xs text-gray-600">Inversión fuera de tope</p>
          <p class="text-2xl font-bold" style="color:#0D0D0D">{{ formatCurrency(totalNonEligible) }}</p>
        </div>
      </div>

      <div v-if="mode === 'custom'" class="mt-3 text-xs text-gray-600">
        Consejo: puedes poner, por ejemplo, <b>100.000€</b> en el año 1 y repartir el resto en los demás años.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  defaultInvestment?: number
}>()

type Mode = 'preset' | 'custom'

// Por defecto: 5 años (20% cada año)
const years = ref<number>(5)
const mode = ref<Mode>('preset')

// Según tu ejemplo: 50% y tope anual de 100.000€ (editable)
const deductionRatePercent = ref<number>(50)
const annualBaseCap = ref<number>(100000)

// Slider IRPF anual (visual). No limita la base, limita la “deducción aprovechable” anual.
const irpfAnnual = ref<number>(50000)

const totalInvestment = ref<number>(props.defaultInvestment ?? 0)

// allocations[i] = inversión asignada al año i+1
const allocations = ref<number[]>([0, 0, 0, 0, 0])

const rate = computed(() => Math.max(0, Math.min(1, deductionRatePercent.value / 100)))

const maxDeductionPerYearByCap = computed(() => {
  const cap = Math.max(0, annualBaseCap.value || 0)
  return cap * rate.value
})

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number.isFinite(amount) ? amount : 0)

function setYears(y: number) {
  years.value = y
  // Al elegir años, se recalcula automáticamente el reparto proporcional (1/y)
  applyPreset(y)
}

function applyPreset(y: number) {
  mode.value = 'preset'
  const total = Math.max(0, totalInvestment.value || 0)
  const perYear = y > 0 ? total / y : 0
  const next = [0, 0, 0, 0, 0]
  for (let i = 0; i < y; i++) next[i] = perYear
  allocations.value = next
}

function normalizeCustom() {
  // En personalizado, nos quedamos solo con los años activos y limpiamos el resto
  const y = years.value
  const next = [...allocations.value]
  for (let i = y; i < 5; i++) next[i] = 0
  for (let i = 0; i < y; i++) next[i] = Math.max(0, Number(next[i] || 0))
  allocations.value = next
}

const totalAllocated = computed(() => allocations.value.slice(0, years.value).reduce((a, b) => a + (Number(b) || 0), 0))
const remainingToAllocate = computed(() => Math.max(0, (totalInvestment.value || 0) - totalAllocated.value))

const rows = computed(() => {
  const y = years.value
  const cap = Math.max(0, annualBaseCap.value || 0)
  return Array.from({ length: y }, (_, idx) => {
    const inv = Math.max(0, Number(allocations.value[idx] || 0))
    const eligibleBase = Math.min(inv, cap)
    const nonEligible = Math.max(0, inv - cap)
    const deduction = eligibleBase * rate.value
    return { year: idx + 1, inv, eligibleBase, nonEligible, deduction }
  })
})

const totalEligibleBase = computed(() => rows.value.reduce((s, r) => s + r.eligibleBase, 0))
const totalNonEligible = computed(() => rows.value.reduce((s, r) => s + r.nonEligible, 0))
const totalDeduction = computed(() => rows.value.reduce((s, r) => s + r.deduction, 0))

type Recommendation = {
  years: number
  allocations: number[]
  totalUsedDeduction: number
}

function computeBestForYears(y: number): Recommendation {
  const total = Math.max(0, totalInvestment.value || 0)
  const cap = Math.max(0, annualBaseCap.value || 0)
  const r = rate.value
  const irpf = Math.max(0, irpfAnnual.value || 0)

  // Para “llenar” la deducción anual: base objetivo = min(cap, irpf / r)
  // Si r=0 => no hay deducción
  const targetBase = r > 0 ? Math.min(cap, irpf / r) : 0

  const allocationsLocal = [0, 0, 0, 0, 0]
  let remaining = total
  let totalUsed = 0

  for (let i = 0; i < y; i++) {
    // Si IRPF es muy alto, targetBase será cap (y el límite real es cap)
    // Si IRPF es bajo, targetBase será irpf/r (para no meter inversión “inútil” en ese año)
    const base = Math.min(targetBase > 0 ? targetBase : cap, remaining)
    allocationsLocal[i] = base
    remaining -= base

    const deduction = Math.min(base, cap) * r
    const used = Math.min(deduction, irpf)
    totalUsed += used
  }

  // Si todavía queda inversión y el IRPF >= cap*r (o sea, el límite es el cap),
  // repartir el resto rellenando hasta cap en cada año.
  if (remaining > 0 && irpf >= cap * r) {
    for (let i = 0; i < y; i++) {
      const extraCapacity = Math.max(0, cap - allocationsLocal[i])
      if (extraCapacity <= 0) continue
      const extra = Math.min(extraCapacity, remaining)
      allocationsLocal[i] += extra
      remaining -= extra
      const extraDeduction = extra * r
      totalUsed += extraDeduction // IRPF no limita en este caso (por definición)
      if (remaining <= 0) break
    }
  }

  return { years: y, allocations: allocationsLocal, totalUsedDeduction: totalUsed }
}

const recommended = computed<Recommendation>(() => {
  let best: Recommendation | null = null
  for (const y of [1, 2, 3, 4, 5]) {
    const cand = computeBestForYears(y)
    if (!best) best = cand
    else if (cand.totalUsedDeduction > best.totalUsedDeduction + 0.01) best = cand
    else if (Math.abs(cand.totalUsedDeduction - best.totalUsedDeduction) <= 0.01 && cand.years < best.years) best = cand
  }
  return best!
})

function applyRecommendation() {
  mode.value = 'preset'
  years.value = recommended.value.years
  allocations.value = [...recommended.value.allocations]
}

watch(
  () => props.defaultInvestment,
  (v) => {
    if (typeof v === 'number' && Number.isFinite(v)) {
      totalInvestment.value = v
      if (mode.value === 'preset') applyPreset(years.value)
    }
  }
)

watch(
  () => totalInvestment.value,
  () => {
    if (mode.value === 'preset') applyPreset(years.value)
  }
)

// init
applyPreset(5)
</script>

