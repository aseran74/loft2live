<template>
  <section id="descubre-como" class="py-16 bg-gradient-to-b from-white to-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold mb-4" style="color: #0D0D0D">
          ¿Cómo <span style="color: #79358d">funciona?</span>
        </h2>
        <p class="text-xl max-w-3xl mx-auto" style="color: #0D0D0D">
          Nuestra startup transforma oficinas infrautilizadas en lofts modernos y eficientes, creando una nueva forma de invertir, vivir y moverse entre ciudades.
        </p>
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
          <h3 class="step-title">Transformación del activo</h3>
          <p class="step-description">
            Identificamos edificios de oficinas con alto potencial y los remodelamos integralmente para convertirlos en lofts habitables, sostenibles y preparados para un modelo de uso flexible (living + inversión).
          </p>
          <p class="step-description mt-3">
            Cada inmueble se estructura jurídicamente para permitir su tokenización, manteniendo siempre el respaldo en un activo real.
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
          <h3 class="step-title">Tokenización del inmueble</h3>
          <p class="step-description">
            Cada loft se divide en tokens digitales, que representan derechos económicos y de uso sobre el inmueble.
          </p>
          <ul class="step-list">
            <li>Comprar tokens equivale a adquirir un loft real, total o parcialmente.</li>
            <li>Los tokens están vinculados al activo físico y a su explotación.</li>
            <li>El modelo permite acceder al mercado inmobiliario con mayor liquidez y flexibilidad.</li>
          </ul>
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
          <h3 class="step-title">Ventajas fiscales (Ley de Startups 2026)</h3>
          <p class="step-description">
            La inversión se estructura para que el comprador pueda acogerse a los incentivos fiscales vigentes, permitiendo una deducción en el IRPF de hasta <strong>50.000 € anuales</strong>, siempre que se cumplan los requisitos legales aplicables.
          </p>
          <p class="step-description mt-3">
            Esto convierte la compra de tokens no solo en una inversión inmobiliaria, sino también en una herramienta de optimización fiscal dentro del marco regulado de la Ley de Startups.
          </p>
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
          <h3 class="step-title">Uso flexible del loft (Flex Living)</h3>
          <p class="step-description">
            El propietario decide cómo utilizar su loft:
          </p>
          <div class="flex-options">
            <div class="flex-option">
              <span class="flex-emoji">🏠</span>
              <span>Vivir en él</span>
            </div>
            <div class="flex-option">
              <span class="flex-emoji">🌍</span>
              <span>Moverse entre ciudades usando otros lofts de la red</span>
            </div>
            <div class="flex-option">
              <span class="flex-emoji">🔁</span>
              <span>Alquilarlo cuando no lo usa</span>
            </div>
          </div>
          <p class="step-description mt-3">
            Nuestro ecosistema de flex living permite que un usuario viva temporalmente en otros destinos donde existan lofts disponibles dentro de la plataforma.
          </p>
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
          <h3 class="step-title">Rentabilidad: elige cómo cobrar</h3>
          <p class="step-description">
            Cuando el loft se alquila, el usuario puede elegir cómo recibir el rendimiento:
          </p>
          <div class="payment-options">
            <div class="payment-option">
              <span class="payment-emoji">💰</span>
              <span><strong>Dinero:</strong> ingresos directos en euros</span>
            </div>
            <div class="payment-option">
              <span class="payment-emoji">🎯</span>
              <span><strong>Puntos:</strong> para estancias en otros lofts de la red</span>
            </div>
            <div class="payment-option">
              <span class="payment-emoji">🔗</span>
              <span><strong>Tokens:</strong> que pueden acumularse y convertirse en participación en otros inmuebles</span>
            </div>
          </div>
          <p class="step-description mt-3">
            Este sistema convierte el alquiler en una experiencia de inversión dinámica, no limitada a un solo activo o ubicación.
          </p>
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
          <h3 class="step-title">Crecimiento patrimonial continuo</h3>
          <p class="step-description">
            Los tokens recibidos pueden:
          </p>
          <ul class="step-list">
            <li>Mantenerse como inversión</li>
            <li>Intercambiarse por otros inmuebles del ecosistema</li>
            <li>Consolidarse para acceder a un nuevo loft completo</li>
          </ul>
          <p class="step-description mt-3">
            Así, el usuario no solo compra un inmueble: construye un patrimonio inmobiliario líquido, flexible y escalable.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
  background: linear-gradient(90deg, #79358d, #a855f7);
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
  background: linear-gradient(135deg, #79358d, #a855f7);
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
  box-shadow: 0 10px 20px rgba(121, 53, 141, 0.3);
}

.step-number {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #79358d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  box-shadow: 0 4px 6px rgba(121, 53, 141, 0.3);
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
  color: #79358d;
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
  color: #79358d;
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

@media (max-width: 768px) {
  .step-card {
    padding: 1.5rem;
  }
  
  .step-title {
    font-size: 1.25rem;
  }
}
</style>
