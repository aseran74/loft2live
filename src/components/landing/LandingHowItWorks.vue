<template>
  <section id="descubre-como" class="py-16 bg-gradient-to-b from-white to-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold mb-4" style="color: #0D0D0D">
          Donde el espacio <span style="color: var(--color-landing-primary)">trabaja para ti</span>.
        </h2>
        <p class="text-xl max-w-3xl mx-auto" style="color: #0D0D0D">
          Rediseñamos oficinas infrautilizadas en lofts contemporáneos de alto rendimiento, integrando fiscalidad inteligente, estructura 80/20 y compraventa dual.
        </p>
        <p class="text-lg max-w-3xl mx-auto mt-4" style="color: #0D0D0D">
          No es solo un lugar donde vivir o trabajar: es una arquitectura pensada para la libertad, la movilidad y la eficiencia del capital.
        </p>
        <p
          class="text-base max-w-2xl mx-auto mt-3"
          style="color: var(--color-landing-primary); font-weight: 600; font-style: italic"
        >
          Real estate para mentes que no quieren quedarse quietas.
        </p>

        <!-- Botón Ley Comunidad de Madrid (abre modal) -->
        <div class="mt-10 flex justify-center">
          <button
            type="button"
            class="ley-madrid-cta-button"
            @click="leyMadridModalOpen = true"
          >
            📜 Ley Comunidad de Madrid
          </button>
        </div>
      </div>

      <LandingLeyMadridModal :open="leyMadridModalOpen" @close="leyMadridModalOpen = false" />

      <!-- Video destacado -->
      <div class="video-section mb-16">
        <div class="video-wrapper">
          <video
            ref="videoEl"
            class="section-video"
            src="/images/Videoabajo.mp4"
            controls
            playsinline
            @play="showPlayOverlay = false"
            @pause="showPlayOverlay = true"
            @ended="showPlayOverlay = true"
          >
            Tu navegador no soporta la reproducción de video.
          </video>
          <div
            v-show="showPlayOverlay"
            class="video-play-overlay"
            role="button"
            tabindex="0"
            aria-label="Reproducir video"
            @click="playVideo"
            @keydown.enter="playVideo"
          >
            <div class="video-play-overlay-inner">
              <img src="/images/Logoblanco3.png" alt="Loft2live" class="video-overlay-logo" />
              <div class="video-play-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="play-icon">
                  <path d="M8 5v14l11-7L8 5z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Explicación 80/20 + Cómo funciona -->
      <div class="how-intro mb-12">
        <h3 class="how-intro-title">¿Cómo funciona?</h3>
        <p class="how-intro-text">
          Utilizamos el modelo <strong>80% trabajo / 20% vivienda</strong>: el espacio profesional (oficina, salón, cocina) representa el 80% del valor y es 100% deducible; el 20% restante es el módulo de descanso, con deducciones estándar. Así optimizas fiscalmente mientras vives y trabajas en el mismo loft.
        </p>
        <p class="how-intro-sub">A continuación, los 6 pilares de nuestro ecosistema:</p>
      </div>

      <!-- Steps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Step 1 -->
        <div class="step-card">
          <div class="step-icon-wrapper">
            <div class="step-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="step-number">1</div>
          </div>
          <h3 class="step-title">El Modelo 80/20: Optimización Fiscal Radical</h3>
          <p class="step-description">
            No compras un loft común; adquieres un activo dividido estratégicamente para que tu bolsillo respire desde el primer día. Estructuramos la operación en dos unidades jurídicas/contractuales:
          </p>
          <p class="step-description mt-3">
            <strong>El Hub Profesional (80% del valor):</strong> Incluye el salón, la cocina americana y la oficina. Al ser un espacio 100% destinado a la actividad profesional, autónomos y empresas pueden desgravarse el 100% de los gastos e IVA, ya que legalmente no es zona de vivienda.
          </p>
          <p class="step-description mt-3">
            <strong>El Módulo de Descanso (20% del valor):</strong> Una habitación privada e independiente destinada al pernocte. En esta unidad, al ser residencial, puedes aplicarte las deducciones estándar (hasta un 30% según el caso).
          </p>
        </div>

        <!-- Step 2 -->
        <div class="step-card">
          <div class="step-icon-wrapper">
            <div class="step-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div class="step-number">2</div>
          </div>
          <h3 class="step-title">Estructura de Adquisición Dual</h3>
          <p class="step-description">
            Para garantizar la máxima seguridad jurídica y el beneficio fiscal, la operación se formaliza mediante la adquisición o alquiler de dos unidades diferenciadas, tal como en una operación inmobiliaria tradicional:
          </p>
          <ul class="step-list">
            <li><strong>Contrato de Oficina (80%):</strong> Adquieres o alquilas el espacio profesional (salón, cocina americana y despacho). Al estar registrado como activo comercial/oficina, permite la desgravación total de gastos para la empresa o el profesional.</li>
            <li><strong>Contrato de Vivienda (20%):</strong> Adquieres o alquilas la unidad de descanso de forma independiente.</li>
          </ul>
          <p class="step-description mt-3">
            <strong>Simplicidad y Respaldo:</strong> Aunque se trate de dos activos, el proceso es ágil y está totalmente vinculado, dándote la propiedad o el derecho de uso sobre el inmueble completo pero con una estructura fiscal optimizada desde la firma.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="step-card">
          <div class="step-icon-wrapper">
            <div class="step-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="step-number">3</div>
          </div>
          <h3 class="step-title">Tokens de Utilidad y Movilidad Global</h3>
          <p class="step-description">
            La formalización de la compraventa o alquiler no solo te otorga la propiedad o el uso del inmueble; también activa tu entrada en nuestro ecosistema digital:
          </p>
          <ul class="step-list">
            <li><strong>Asignación de Tokens:</strong> Al completar la operación, recibes una cantidad de tokens de utilidad proporcional al valor de la transacción.</li>
            <li><strong>Pasaporte Flex Living:</strong> Estos tokens te otorgan derechos exclusivos de socio, permitiéndote acceder a importantes descuentos para alojarte en otros lofts de nuestra red global.</li>
            <li><strong>Movilidad Inteligente:</strong> Tu inversión en una ciudad te abre las puertas a vivir y trabajar en cualquier otro destino de la plataforma de forma mucho más económica.</li>
          </ul>
        </div>

        <!-- Step 4 -->
        <div class="step-card">
          <div class="step-icon-wrapper">
            <div class="step-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="step-number">4</div>
          </div>
          <h3 class="step-title">Uso Flexible y Rentabilidad por Ausencia</h3>
          <p class="step-description">
            Tú decides cómo y cuándo usar tu espacio. Nuestro ecosistema de Flex Living está diseñado para que tu loft nunca sea un gasto, sino una fuente de ingresos:
          </p>
          <div class="flex-options">
            <div class="flex-option">
              <span class="flex-emoji">🏠</span>
              <span><strong>Habitar:</strong> Disfruta de un diseño moderno y eficiente pensado para el alto rendimiento.</span>
            </div>
            <div class="flex-option">
              <span class="flex-emoji">🌍</span>
              <span><strong>Movilidad por Trabajo o Vacaciones:</strong> ¿Te vas 15 días o más por negocios o placer? No dejes tu loft vacío.</span>
            </div>
            <div class="flex-option">
              <span class="flex-emoji">🔁</span>
              <span><strong>Gestión Automática de Alquiler:</strong> Activa el modo "Rent" en nuestra plataforma cuando te ausentes. Nosotros nos encargamos de alquilar tu loft dentro de nuestra red profesional. Así, mientras tú viajas o trabajas en otra ciudad, tu loft te genera un rendimiento que puede cubrir tus propios gastos de viaje o estancia.</span>
            </div>
          </div>
        </div>

        <!-- Step 5 -->
        <div class="step-card">
          <div class="step-icon-wrapper">
            <div class="step-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="step-number">5</div>
          </div>
          <h3 class="step-title">Rentabilidad Inteligente: Tú eliges cómo ganar</h3>
          <p class="step-description">
            Cuando no uses tu loft, nuestro sistema de gestión lo pone a trabajar por ti. Elige cómo recibir tus rendimientos:
          </p>
          <div class="payment-options">
            <div class="payment-option">
              <span class="payment-emoji">💰</span>
              <span><strong>Cash:</strong> Ingresos directos en euros.</span>
            </div>
            <div class="payment-option">
              <span class="payment-emoji">🎯</span>
              <span><strong>Créditos de Estancia:</strong> Puntos para vivir en cualquier loft de la red global.</span>
            </div>
            <div class="payment-option">
              <span class="payment-emoji">🔗</span>
              <span><strong>Re-inversión en Tokens:</strong> Aumenta tu participación en nuevos inmuebles del ecosistema de forma automática.</span>
            </div>
          </div>
        </div>

        <!-- Step 6 -->
        <div class="step-card">
          <div class="step-icon-wrapper">
            <div class="step-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="step-number">6</div>
          </div>
          <h3 class="step-title">Vender o Liquidar: Patrimonio en Movimiento</h3>
          <p class="step-description">
            Tú eres el dueño. Cuando decidas dejar el inmueble, tienes dos vías de salida:
          </p>
          <div class="flex-options">
            <div class="flex-option">
              <span class="flex-emoji">📄</span>
              <span><strong>Venta Tradicional:</strong> Vendes los dos inmuebles a cualquier tercero en el mercado abierto, como una operación inmobiliaria normal.</span>
            </div>
            <div class="flex-option">
              <span class="flex-emoji">🪙</span>
              <span><strong>Conversión a Tokens de Valor:</strong> Canjea tu propiedad por tokens de la plataforma (1 token = 100€) para una movilidad instantánea.</span>
            </div>
          </div>
          <p class="step-description mt-3">
            <strong>Ejemplo de Permuta:</strong> Vendes tu loft en Madrid por 27.000 tokens (270.000€). Te mudas a un loft en Valencia por 24.000 tokens (240.000€). El cambio es automático: ya tienes tu nueva casa y además te sobran 3.000 tokens que te generan rentabilidad mensual por los alquileres de la red.
          </p>
        </div>
      </div>

      <!-- CTA Ahorro + Modelo compraventa + Tabla comparativa -->
      <div class="cta-buttons-row">
        <button
          type="button"
          class="savings-cta-button"
          @click="savingsModalOpen = true"
        >
          💰 ¿Cuánto voy a ahorrar?
        </button>
        <button
          type="button"
          class="savings-cta-button contract-cta-button"
          @click="contractModalOpen = true"
        >
          📄 Modelo compraventa
        </button>
      </div>

      <LandingSavingsModal :open="savingsModalOpen" @close="savingsModalOpen = false" />
      <LandingContractModal :open="contractModalOpen" @close="contractModalOpen = false" />

      <!-- Tabla comparativa -->
      <div class="comparison-section mt-8">
        <h3 class="comparison-title">Comparativa de Ahorro: Modelo 80/20 vs. Tradicional</h3>
        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Loft Tradicional</th>
                <th>Modelo Smart Loft (80/20)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Deducción IVA/Gastos</td>
                <td>0% - 20%</td>
                <td>100% (sobre el 80% del valor)</td>
              </tr>
              <tr>
                <td>Deducción IRPF</td>
                <td>Estándar</td>
                <td>30% (sobre el 20% del valor)</td>
              </tr>
              <tr>
                <td>Estructura Legal</td>
                <td>Escritura única</td>
                <td>Escritura Dual (Máxima optimización)</td>
              </tr>
              <tr>
                <td>Movilidad</td>
                <td>Activo fijo y pesado</td>
                <td>Activo líquido y canjeable por tokens</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import LandingSavingsModal from './LandingSavingsModal.vue'
import LandingContractModal from './LandingContractModal.vue'
import LandingLeyMadridModal from './LandingLeyMadridModal.vue'

gsap.registerPlugin(ScrollTrigger)

const videoEl = ref<HTMLVideoElement | null>(null)
const showPlayOverlay = ref(true)
const savingsModalOpen = ref(false)
const contractModalOpen = ref(false)
const leyMadridModalOpen = ref(false)

function playVideo() {
  if (videoEl.value) {
    videoEl.value.play()
  }
}

onMounted(() => {
  gsap.utils.toArray('.step-card').forEach((card: any, index: number) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out'
    })
  })
})
</script>

<style scoped>
.video-section {
  display: flex;
  justify-content: center;
}

.video-wrapper {
  position: relative;
  width: 100%;
  max-width: 900px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.section-video {
  width: 100%;
  display: block;
  vertical-align: middle;
}

.video-play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.video-play-overlay:hover {
  background: rgba(0, 0, 0, 0.8);
}

.video-play-overlay-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.video-overlay-logo {
  height: 64px;
  width: auto;
  max-width: 220px;
  object-fit: contain;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.4));
}

.video-play-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-landing-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(var(--color-landing-primary-rgb), 0.5);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.video-play-overlay:hover .video-play-button {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(var(--color-landing-primary-rgb), 0.6);
}

.play-icon {
  width: 36px;
  height: 36px;
  color: white;
  margin-left: 4px;
}

.step-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.step-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-landing-accent), var(--color-landing-primary));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.step-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.step-card:hover::before {
  transform: scaleX(1);
}

.step-icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.step-icon {
  width: 64px;
  height: 64px;
  border-radius: 1rem;
  background: linear-gradient(135deg, var(--color-landing-accent), var(--color-landing-primary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.step-card:hover .step-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 10px 20px rgba(var(--color-landing-primary-rgb), 0.3);
}

.step-number {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-landing-accent), var(--color-landing-primary));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  box-shadow: 0 4px 6px rgba(var(--color-landing-primary-rgb), 0.3);
  z-index: 3;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0D0D0D;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.step-description {
  color: #4b5563;
  line-height: 1.7;
  font-size: 0.95rem;
}

.step-description strong {
  color: var(--color-landing-primary);
  font-weight: 600;
}

.step-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.step-list li {
  color: #4b5563;
  line-height: 1.7;
  font-size: 0.95rem;
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.5rem;
}

.step-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-landing-primary);
  font-weight: 700;
}

.flex-options,
.payment-options {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.flex-option,
.payment-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.flex-option:hover,
.payment-option:hover {
  background: #f3f4f6;
  transform: translateX(4px);
}

.flex-emoji,
.payment-emoji {
  font-size: 1.5rem;
  line-height: 1;
}

.flex-option span:last-child,
.payment-option span:last-child {
  color: #4b5563;
  font-size: 0.95rem;
}

/* Comparativa de Ahorro */
.cta-buttons-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
}

.how-intro {
  text-align: center;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.how-intro-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0D0D0D;
  margin: 0 0 1rem 0;
}

.how-intro-title::after {
  content: '';
  display: block;
  width: 48px;
  height: 4px;
  background: var(--color-landing-primary);
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.how-intro-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #4b5563;
  margin: 0 0 0.75rem 0;
}

.how-intro-text strong {
  color: var(--color-landing-primary);
}

.how-intro-sub {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

.savings-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: white;
  background: var(--color-landing-primary);
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(var(--color-landing-secondary-rgb), 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.savings-cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--color-landing-secondary-rgb), 0.5);
}

.contract-cta-button {
  background: linear-gradient(135deg, var(--color-landing-secondary), var(--color-landing-primary));
  box-shadow: 0 4px 14px rgba(var(--color-landing-secondary-rgb), 0.35);
}

.contract-cta-button:hover {
  box-shadow: 0 6px 20px rgba(var(--color-landing-secondary-rgb), 0.45);
}

.ley-madrid-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-landing-primary);
  background: var(--color-landing-cream);
  border: 2px solid var(--color-landing-primary);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.ley-madrid-cta-button:hover {
  background: var(--color-landing-primary);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
}

.comparison-section {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(var(--color-landing-secondary-rgb), 0.08);
  overflow: hidden;
}

.comparison-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0D0D0D;
  text-align: center;
  margin-bottom: 1.5rem;
}

.comparison-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-landing-accent), var(--color-landing-primary));
  margin: 0.75rem auto 0;
  border-radius: 2px;
}

.comparison-table-wrapper {
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.comparison-table thead {
  background: linear-gradient(135deg, var(--color-landing-accent), var(--color-landing-primary));
  color: white;
}

.comparison-table th {
  padding: 1rem 1.25rem;
  text-align: left;
  font-weight: 600;
}

.comparison-table th:first-child {
  border-radius: 0.75rem 0 0 0;
}

.comparison-table th:last-child {
  border-radius: 0 0.75rem 0 0;
  background: rgba(255, 255, 255, 0.12);
}

.comparison-table tbody tr {
  transition: background 0.2s ease;
}

.comparison-table tbody tr:nth-child(even) {
  background: #f9fafb;
}

.comparison-table tbody tr:hover {
  background: #f3f4f6;
}

.comparison-table td {
  padding: 1rem 1.25rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.comparison-table td:first-child {
  font-weight: 600;
  color: #0D0D0D;
  width: 28%;
}

.comparison-table td:nth-child(2) {
  color: #6b7280;
}

.comparison-table td:last-child {
  color: var(--color-landing-primary);
  font-weight: 500;
}

.comparison-table tbody tr:last-child td {
  border-bottom: none;
}

.comparison-table tbody tr:last-child td:first-child {
  border-radius: 0 0 0 0.75rem;
}

.comparison-table tbody tr:last-child td:last-child {
  border-radius: 0 0 0.75rem 0;
}

@media (max-width: 768px) {
  .step-card {
    padding: 1.5rem;
  }
  
  .step-title {
    font-size: 1.25rem;
  }

  .comparison-section {
    padding: 1.25rem;
  }

  .comparison-title {
    font-size: 1.25rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
