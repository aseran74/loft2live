<template>
  <!-- Teleport a body asegura que el modal quede encima de todo en cualquier entorno (local, Vercel) -->
  <Teleport :to="teleportTarget" :disabled="!teleportTarget">
    <div
      v-if="open"
      class="ley-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ley-modal-title"
      @click.self="$emit('close')"
    >
      <div class="ley-modal-backdrop" aria-hidden="true" @click="$emit('close')"></div>
      <div class="ley-modal">
        <div class="ley-modal-header">
          <h2 id="ley-modal-title" class="ley-modal-title">Ley Comunidad de Madrid</h2>
          <button
            type="button"
            class="ley-modal-close"
            aria-label="Cerrar"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="ley-modal-body">
          <h3 class="ley-modal-subtitle">Novedad normativa: Ley de vivienda protegida en la Comunidad de Madrid</h3>
          <p class="ley-modal-p">
            La nueva ley para la promoción de vivienda protegida autoriza el <strong>cambio de uso de suelo de terciario a residencial</strong>: se podrán convertir hasta <strong>20.000 oficinas en viviendas</strong> en régimen de alquiler a precios asequibles, poniendo en el mercado unos <strong>1,8 millones de m²</strong>.
          </p>
          <p class="ley-modal-p">
            Es una medida <strong>extraordinaria y temporal</strong> con una vigencia de <strong>15 años</strong>. La norma incluye una reducción de plazos de construcción de hasta 12 meses y menos cargas en desarrollos de vivienda pública. Una vez aprobada, serán los ayuntamientos los que decidan aplicarla.
          </p>
          <p class="ley-modal-highlight">
            Una revolución en el urbanismo español: reconvertir edificios y suelo terciario en residencial.
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

// Target explícito para Teleport: en cliente usar body real (evita fallos en Vercel/producción)
const teleportTarget = ref<string | HTMLElement | null>(null)
onMounted(() => {
  if (typeof document !== 'undefined' && document.body) {
    teleportTarget.value = document.body
  }
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', onKeydown)
    } else {
      document.removeEventListener('keydown', onKeydown)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.ley-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.ley-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.ley-modal {
  position: relative;
  width: 100%;
  max-width: 36rem;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.ley-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: var(--color-landing-primary);
  color: white;
}

.ley-modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.ley-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.ley-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.ley-modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.ley-modal-subtitle {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #0D0D0D;
}

.ley-modal-p {
  margin: 0 0 1rem 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #0D0D0D;
}

.ley-modal-p strong {
  color: var(--color-landing-primary);
}

.ley-modal-highlight {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-landing-primary);
  font-style: italic;
}

/* Móvil: modal a pantalla completa para mejor lectura */
@media (max-width: 640px) {
  .ley-modal-overlay {
    padding: 0;
    align-items: stretch;
  }

  .ley-modal {
    max-width: none;
    max-height: none;
    height: 100%;
    min-height: 100vh;
    border-radius: 0;
  }

  .ley-modal-header {
    padding: 1rem 1.25rem;
    flex-shrink: 0;
  }

  .ley-modal-title {
    font-size: 1.125rem;
  }

  .ley-modal-close {
    width: 2.75rem;
    height: 2.75rem;
    min-width: 2.75rem;
    min-height: 2.75rem;
  }

  .ley-modal-body {
    padding: 1.25rem 1.25rem 2rem;
    flex: 1;
    -webkit-overflow-scrolling: touch;
  }

  .ley-modal-subtitle {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  .ley-modal-p {
    font-size: 0.9375rem;
    margin-bottom: 0.875rem;
  }
}
</style>
