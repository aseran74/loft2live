<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="contract-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contract-modal-title"
      @click.self="$emit('close')"
    >
      <div class="contract-modal-backdrop" aria-hidden="true" @click="$emit('close')"></div>
      <div class="contract-modal">
        <div class="contract-modal-header">
          <h2 id="contract-modal-title" class="contract-modal-title">Modelo compraventa</h2>
          <button
            type="button"
            class="contract-modal-close"
            aria-label="Cerrar"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="contract-modal-body">
          <p class="contract-intro">
            Contrato íntegro que unifica las cláusulas jurídicas, la estructura fiscal 80/20 y la operativa de tokens. Listo para revisión por tu equipo legal y como base jurídica de la startup.
          </p>

          <h3 class="contract-doc-title">CONTRATO DE PERMUTA DE BIEN INMUEBLE POR ACTIVOS DIGITALES (TOKENS)</h3>

          <section class="contract-section">
            <h4 class="contract-section-title">REUNIDOS:</h4>
            <p>De una parte, <strong>EL VENDEDOR / PROPIETARIO:</strong> [Nombre o Razón Social], con DNI/CIF [Número], y domicilio en [Dirección completa].</p>
            <p>De otra parte, <strong>EL ADQUIRENTE / USUARIO:</strong> [Nombre o Razón Social], con DNI/CIF [Número], y domicilio en [Dirección completa].</p>
            <p>Ambas partes se reconocen mutuamente capacidad legal suficiente para el otorgamiento del presente contrato y, a tal efecto,</p>
          </section>

          <section class="contract-section">
            <h4 class="contract-section-title">DECLARAN:</h4>
            <p><strong>I.</strong> Que EL VENDEDOR es propietario pleno de las fincas registrales que conforman el activo inmobiliario objeto de este contrato, situadas en [Dirección del Loft]:</p>
            <ul class="contract-list">
              <li><strong>Finca A (80% del valor total):</strong> Espacio destinado a uso Terciario/Oficina (Hub Profesional). Inscrita en el Registro de la Propiedad nº [X] de [Ciudad], Finca [Número].</li>
              <li><strong>Finca B (20% del valor total):</strong> Espacio destinado a uso Residencial/Habitación (Módulo de Descanso). Inscrita en el Registro de la Propiedad nº [X] de [Ciudad], Finca [Número].</li>
            </ul>
            <p><strong>II.</strong> Que ambas partes han acordado la transmisión de dichas fincas bajo una estructura de permuta por activos digitales, integrando la propiedad en el ecosistema FlexLiving.</p>
          </section>

          <section class="contract-section">
            <h4 class="contract-section-title">CLÁUSULAS</h4>

            <div class="contract-clause">
              <strong>PRIMERA.– OBJETO.</strong> EL VENDEDOR transmite la nuda propiedad y el pleno dominio de las dos fincas descritas en el Exponencial I (Oficina y Vivienda) a EL ADQUIRENTE, quien las acepta en el estado físico, jurídico y de cargas en que se encuentran.
            </div>

            <div class="contract-clause">
              <strong>SEGUNDA.– PRECIO Y VALORACIÓN DE LOS TOKENS.</strong> Las partes acuerdan que el valor de mercado total de las fincas asciende a la cantidad de [270.000] €. El pago se realizará mediante la entrega de [27.000] Tokens de Valor de la Red FlexLiving, asignando contractualmente a cada token un valor nominal y de canje de 100,00 €.
            </div>

            <div class="contract-clause">
              <strong>TERCERA.– ESTRUCTURA FISCAL 80/20 Y DEDUCCIONES.</strong> La transmisión se desglosa para permitir la optimización fiscal del Adquirente según su naturaleza jurídica:
              <ul class="contract-sublist">
                <li><strong>Tramo Oficina (80%):</strong> Valor de [216.000] €. Al ser un activo afecto a actividad profesional, el Adquirente podrá deducirse el 100% de los gastos e IVA asociados según la normativa vigente.</li>
                <li><strong>Tramo Vivienda (20%):</strong> Valor de [54.000] €. Destinado a uso residencial, con las deducciones de IRPF correspondientes (hasta el 30%).</li>
              </ul>
            </div>

            <div class="contract-clause">
              <strong>CUARTA.– NATURALEZA Y LIQUIDEZ DEL TOKEN.</strong> Los tokens entregados representan un derecho real de participación sobre el pool inmobiliario de la plataforma. Otorgan al titular:
              <ul class="contract-sublist">
                <li>Derecho a percibir rendimientos por el alquiler del activo.</li>
                <li>Capacidad de canje instantáneo por otros activos de la red en distintas ubicaciones geográficas.</li>
                <li>Acceso a descuentos de socio mediante los Tokens de Utilidad vinculados.</li>
              </ul>
            </div>

            <div class="contract-clause">
              <strong>QUINTA.– ESTABILIDAD DEL ACTIVO DIGITAL (PEG-VALUE).</strong> Para garantizar la seguridad patrimonial, el valor del token está anclado al valor de tasación real de los inmuebles.
              <ul class="contract-sublist">
                <li><strong>Revalorización:</strong> Si el mercado inmobiliario sube, la plataforma actualizará la paridad de los tokens o emitirá nuevos tokens a favor del titular para reflejar el incremento de valor de su patrimonio.</li>
                <li><strong>Protección:</strong> Al ser un Stable-Token respaldado por activos físicos, su valor es independiente de la volatilidad de los mercados de criptomonedas externos.</li>
              </ul>
            </div>

            <div class="contract-clause">
              <strong>SEXTA.– MANTENIMIENTO Y AUDITORÍA TÉCNICA.</strong>
              <ul class="contract-sublist">
                <li><strong>Obligación de Conservación:</strong> El titular debe mantener el loft en perfecto estado.</li>
                <li><strong>Fondo de Reserva:</strong> Se autoriza la retención de un pequeño porcentaje de los rendimientos para un fondo de mantenimiento gestionado por FlexLiving.</li>
                <li><strong>Inspección por Permuta:</strong> En caso de que el usuario desee "devolver" el inmueble a la red para mudarse a otra ciudad (Ej. de Madrid a Valencia), la plataforma realizará una auditoría técnica. Cualquier daño detectado será detraído del valor de canje en tokens.</li>
              </ul>
            </div>

            <div class="contract-clause">
              <strong>SÉPTIMA.– CONDICIÓN SUSPENSIVA Y ELEVACIÓN A PÚBLICO.</strong> La eficacia de esta permuta queda sujeta a la elevación a Escritura Pública ante Notario. En dicho acto, se formalizará la transmisión registral y la transferencia técnica de los tokens a la wallet del Vendedor. Los gastos de Notaría, Registro e Impuestos (ITP/IVA) serán satisfechos según ley o pacto específico entre las partes.
            </div>

            <div class="contract-clause">
              <strong>OCTAVA.– OPCIÓN DE VENTA O PERMUTA FUTURA.</strong> El Adquirente conserva el derecho perpetuo a:
              <ul class="contract-sublist">
                <li><strong>Venta Directa:</strong> Enajenar el inmueble a un tercero de forma tradicional.</li>
                <li><strong>Permuta Digital:</strong> Liquidar su posición en el inmueble a cambio de tokens para mudarse a otro activo de la red, ajustando la diferencia de tokens según el valor de mercado de la nueva ciudad (Ej: 27.000 tokens en Madrid por 24.000 en Valencia, manteniendo el usuario 3.000 tokens como remanente líquido).</li>
              </ul>
            </div>

            <div class="contract-clause">
              <strong>NOVENA.– JURISDICCIÓN Y LEY APLICABLE.</strong> Este contrato se rige por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de [Ciudad].
            </div>
          </section>

          <section class="contract-section contract-closing">
            <p>Leído el presente contrato y estando de acuerdo con su contenido, las partes lo firman en duplicado ejemplar en el lugar y fecha indicados en el encabezamiento.</p>
            <p class="contract-signatures">(Firma Vendedor) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Firma Adquirente)</p>
          </section>
        </div>

        <div class="contract-modal-footer">
          <button type="button" class="contract-modal-cta" @click="$emit('close')">
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
.contract-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.contract-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.contract-modal {
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

.contract-modal-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #2793F2;
  border-radius: 1.25rem 1.25rem 0 0;
}

.contract-modal-title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: white;
}

.contract-modal-close {
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

.contract-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.contract-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.65;
  color: #374151;
}

.contract-intro {
  margin: 0 0 1.25rem 0;
  padding: 1rem;
  background: #f0fdf4;
  border-left: 4px solid #2793F2;
  border-radius: 0 0.5rem 0.5rem 0;
  color: #166534;
  font-size: 0.9rem;
}

.contract-doc-title {
  margin: 0 0 1.25rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0D0D0D;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.contract-section {
  margin-bottom: 1.5rem;
}

.contract-section-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #2793F2;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.contract-section p {
  margin: 0 0 0.5rem 0;
}

.contract-list,
.contract-sublist {
  margin: 0.5rem 0 0.75rem 0;
  padding-left: 1.5rem;
}

.contract-list li,
.contract-sublist li {
  margin-bottom: 0.4rem;
}

.contract-clause {
  margin-bottom: 1.25rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border-left: 4px solid #2793F2;
}

.contract-clause:last-child {
  margin-bottom: 0;
}

.contract-closing {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 2px solid #e5e7eb;
}

.contract-signatures {
  margin-top: 1.5rem !important;
  font-style: italic;
  color: #6b7280;
  text-align: center;
}

.contract-modal-footer {
  flex-shrink: 0;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 0 0 1.25rem 1.25rem;
}

.contract-modal-cta {
  width: 100%;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: #2793F2;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.contract-modal-cta:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .contract-modal-title {
    font-size: 1.15rem;
  }

  .contract-modal-body {
    padding: 1rem;
    font-size: 0.85rem;
  }

  .contract-doc-title {
    font-size: 1rem;
  }
}
</style>
