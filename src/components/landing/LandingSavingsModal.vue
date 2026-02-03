<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="savings-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="savings-modal-title"
      @click.self="$emit('close')"
    >
      <div class="savings-modal-backdrop" aria-hidden="true" @click="$emit('close')"></div>
      <div class="savings-modal">
        <div class="savings-modal-header">
          <h2 id="savings-modal-title" class="savings-modal-title">¿Cuánto voy a ahorrar?</h2>
          <button
            type="button"
            class="savings-modal-close"
            aria-label="Cerrar"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="savings-modal-body">
          <!-- Intro -->
          <div class="savings-block intro-block">
            <p class="savings-intro-label">💰 Caso de Éxito: El "Efecto 80/20" sobre una Facturación de 80.000 €</p>
            <p class="savings-intro-text">
              Imagina que eres un profesional o empresa que factura 80.000 € al año. Sin una estrategia inmobiliaria inteligente, tu base imponible es muy alta y terminas pagando un porcentaje elevado en impuestos.
            </p>
            <p class="savings-intro-text">
              Con nuestro modelo de Smart Loft, transformas tu gasto de vida en un escudo fiscal.
            </p>
          </div>

          <!-- Escenario A -->
          <div class="savings-block">
            <h3 class="savings-section-title">ESCENARIO A: EL AUTÓNOMO (Estimación Directa)</h3>
            <p class="savings-meta">Facturación: 80.000 € | Alquiler: 1.200 € (1.000 € Oficina + 200 € Vivienda)</p>

            <div class="savings-subblock">
              <h4 class="savings-subtitle">Alquiler con nosotros</h4>
              <p>De esos 80.000 €, restas 12.000 € de la oficina y el 30% de la vivienda. Ahora Hacienda solo te calcula impuestos sobre ~67.280 € en lugar de 80.000 €.</p>
              <p class="savings-result"><strong>Resultado:</strong> Te ahorras unos 4.400 € al año en IRPF. Es como si el loft te costara 4 meses menos al año.</p>
            </div>

            <div class="savings-subblock">
              <h4 class="savings-subtitle">Compra con nosotros (250.000 €)</h4>
              <ul class="savings-list">
                <li><strong>Inyección de Liquidez:</strong> Hacienda te devuelve el 21% de IVA de la oficina: 42.000 € directos a tu cuenta.</li>
                <li><strong>Deducción por Amortización:</strong> Restas unos 4.500 €/año de tus beneficios por el desgaste del inmueble.</li>
              </ul>
              <p class="savings-result"><strong>Resultado:</strong> Pagas la hipoteca con dinero que antes se iba en impuestos.</p>
            </div>
          </div>

          <!-- Escenario B -->
          <div class="savings-block">
            <h3 class="savings-section-title">ESCENARIO B: SOCIEDAD LIMITADA (SL)</h3>
            <p class="savings-meta">Facturación: 80.000 € | Compra: 250.000 €</p>

            <div class="savings-subblock">
              <h4 class="savings-subtitle">Alquiler con nosotros</h4>
              <p>La SL deduce el 100% de la oficina (1.000 €/mes).</p>
              <p class="savings-result"><strong>Resultado:</strong> Reduces el beneficio de la empresa en 12.000 €, ahorrando 3.000 € en Impuesto de Sociedades y recuperando el IVA cada trimestre.</p>
            </div>

            <div class="savings-subblock">
              <h4 class="savings-subtitle">Compra con nosotros</h4>
              <p>La sociedad adquiere el activo.</p>
              <p><strong>Efecto Balance:</strong> Tu empresa ahora tiene un patrimonio de 250.000 €.</p>
              <p class="savings-result"><strong>Resultado:</strong> El 80% de la hipoteca, el IBI, la comunidad y los intereses son gastos que reducen tu beneficio neto, pagando el mínimo legal de impuestos mientras el inmueble se revaloriza.</p>
            </div>
          </div>

          <!-- Resumen -->
          <div class="savings-block summary-block">
            <h3 class="savings-section-title">📉 Resumen: ¿Dónde prefieres que esté tu dinero?</h3>
            <p class="savings-meta">Si facturas 80.000 €...</p>
            <div class="savings-table-wrapper">
              <table class="savings-table">
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>Sin nuestro modelo</th>
                    <th>Con Smart Loft 80/20</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gasto Vivienda</td>
                    <td>No deducible (100% de tu bolsillo)</td>
                    <td>80% deducible como oficina</td>
                  </tr>
                  <tr>
                    <td>IVA de Compra</td>
                    <td>Lo pagas y lo pierdes</td>
                    <td>Recuperas 42.000 € (en oficina)</td>
                  </tr>
                  <tr>
                    <td>Impuestos anuales</td>
                    <td>Máximo tramo</td>
                    <td>Tramo reducido por gastos</td>
                  </tr>
                  <tr>
                    <td>Movilidad</td>
                    <td>Atado a una ciudad</td>
                    <td>Tokens para moverte por la red</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="savings-modal-footer">
          <button type="button" class="savings-modal-cta" @click="$emit('close')">
            Entendido
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

function handleEscape(e: KeyboardEvent) {
  if (props.open && e.key === 'Escape') emit('close')
}

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.savings-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.savings-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.savings-modal {
  position: relative;
  width: 100%;
  max-width: 720px;
  max-height: calc(100vh - 2rem);
  background: white;
  border-radius: 1.25rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

.savings-modal-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #0583F2;
  border-radius: 1.25rem 1.25rem 0 0;
}

.savings-modal-title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: white;
}

.savings-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.savings-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.savings-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.savings-block {
  margin-bottom: 1.75rem;
}

.savings-block:last-child {
  margin-bottom: 0;
}

.intro-block {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.savings-intro-label {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0D0D0D;
  margin: 0 0 0.75rem 0;
}

.savings-intro-text {
  color: #4b5563;
  line-height: 1.65;
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
}

.savings-section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0583F2;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.savings-meta {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0 0 1rem 0;
}

.savings-subblock {
  margin-bottom: 1.25rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  border-left: 4px solid #0583F2;
}

.savings-subblock:last-child {
  margin-bottom: 0;
}

.savings-subtitle {
  font-size: 0.95rem;
  font-weight: 600;
  color: #0D0D0D;
  margin: 0 0 0.5rem 0;
}

.savings-subblock p {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.6;
}

.savings-subblock p:last-child {
  margin-bottom: 0;
}

.savings-list {
  margin: 0.5rem 0 0.75rem 0;
  padding-left: 1.25rem;
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.7;
}

.savings-list li {
  margin-bottom: 0.35rem;
}

.savings-result {
  margin-top: 0.75rem !important;
  padding-top: 0.75rem;
  border-top: 1px dashed #e5e7eb;
  color: #0D0D0D !important;
  font-weight: 500;
}

.summary-block {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
}

.savings-table-wrapper {
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  margin-top: 1rem;
}

.savings-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.savings-table thead {
  background: #0583F2;
  color: white;
}

.savings-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
}

.savings-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

.savings-table tbody tr:nth-child(even) {
  background: #f9fafb;
}

.savings-table td:first-child {
  font-weight: 600;
  color: #0D0D0D;
}

.savings-table td:last-child {
  color: #0583F2;
  font-weight: 500;
}

.savings-modal-footer {
  flex-shrink: 0;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 0 0 1.25rem 1.25rem;
}

.savings-modal-cta {
  width: 100%;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: #0583F2;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.savings-modal-cta:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .savings-modal-title {
    font-size: 1.15rem;
  }

  .savings-modal-body {
    padding: 1rem;
  }

  .savings-table th,
  .savings-table td {
    padding: 0.6rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>
