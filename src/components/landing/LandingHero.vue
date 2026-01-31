<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const wrapperRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const videoEnded = ref(false)
const scrollProgress = ref(0)

// Frames HEro2 comprimidos: _000_1_11zon.webp a _081_82_11zon.webp (82 frames)
const HERO2_BASE = '/images/HEro2/Whisk_q2yjfgzhndo2ejyj1imxuwotyty5qtl1qtmx0sy_'
const hero2FrameUrls = Array.from({ length: 82 }, (_, i) =>
  `${HERO2_BASE}${String(i).padStart(3, '0')}_${i + 1}_11zon.webp`
)

// Dos capas para crossfade suave entre frames
const frameAUrl = ref(hero2FrameUrls[0])
const frameBUrl = ref(hero2FrameUrls[0])
const activeFrameLayer = ref<'a' | 'b'>('a')
// Opacidad del texto: aparece al hacer scroll tras el video
const textOpacity = ref(0)

let ctx: gsap.Context | undefined

function onVideoEnded() {
  videoEnded.value = true
}

function playVideo() {
  const v = videoRef.value
  if (v) v.play().catch(() => {})
}

onMounted(() => {
  // Delay 3 s antes de intentar reproducir (da tiempo a cargar y mejora autoplay en móvil)
  const tryPlay = () => {
    const video = videoRef.value
    if (video && !videoEnded.value) {
      video.muted = true
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
  }
  setTimeout(tryPlay, 3000)
  setTimeout(tryPlay, 3300)

  ctx = gsap.context(() => {
    if (!wrapperRef.value) return

    ScrollTrigger.create({
      trigger: wrapperRef.value,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.value = self.progress
        const progress = self.progress
        if (videoEnded.value) {
          const frameIndex = Math.min(
            Math.floor(progress * hero2FrameUrls.length),
            hero2FrameUrls.length - 1
          )
          const newUrl = hero2FrameUrls[frameIndex]
          if (activeFrameLayer.value === 'a') {
            frameBUrl.value = newUrl
            activeFrameLayer.value = 'b'
          } else {
            frameAUrl.value = newUrl
            activeFrameLayer.value = 'a'
          }
          const textProgress = Math.max(0, (progress - 0.25) / 0.4)
          textOpacity.value = Math.min(1, textProgress)
        }
      }
    })
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div ref="wrapperRef" class="wrapper">
    <!-- Contenido fijo en viewport: video o frames + texto -->
    <div class="hero-viewport">
      <!-- Video: hasta que termine (escritorio, tablet y móvil) -->
      <video
        ref="videoRef"
        v-show="!videoEnded"
        class="hero-media hero-video"
        src="/images/HEro2/Video4.mp4"
        autoplay
        muted
        playsinline
        aria-label="Vídeo hero"
        @ended="onVideoEnded"
        @click="playVideo"
      />
      <!-- Imagen estática: móvil/tablet (no hay frames en esos tamaños por ahora, o podemos ocultar frames) -->
      <img
        v-show="!videoEnded"
        src="/images/interiordefi.png"
        alt=""
        class="hero-media hero-image-desktop"
      />
      <img
        v-show="!videoEnded"
        src="/images/interiormovil2.png"
        alt=""
        class="hero-media hero-image-mobile-tablet"
      />

      <!-- Tras el video: frames HEro2 con crossfade + texto en el mismo hero -->
      <template v-if="videoEnded">
        <img
          :src="frameAUrl"
          alt=""
          class="hero-media hero-frame hero-frame-a"
          :class="{ 'hero-frame-visible': activeFrameLayer === 'a' }"
          loading="eager"
        />
        <img
          :src="frameBUrl"
          alt=""
          class="hero-media hero-frame hero-frame-b"
          :class="{ 'hero-frame-visible': activeFrameLayer === 'b' }"
          loading="eager"
        />
        <div class="hero-text-block">
          <p
            class="hero-subtitle"
            :style="{ opacity: textOpacity }"
          >
            <span class="hero-subtitle-line">Ha llegado la revolución</span>
            <span class="hero-subtitle-line">al Flexliving</span>
          </p>
          <a
            href="#descubre-como"
            class="hero-cta text-white"
            :style="{ opacity: textOpacity }"
          >
            Descubre cómo
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
}

.hero-viewport {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

/* Frames HEro2: crossfade suave entre fotos */
.hero-frame {
  opacity: 0;
  transition: opacity 0.4s ease-out;
}

.hero-frame.hero-frame-visible {
  opacity: 1;
}

/* Video visible en todos los tamaños (móvil, tablet, escritorio) */
.hero-video {
  display: block;
}

/* Imágenes estáticas: ocultas (el video se usa en todas las vistas) */
.hero-image-desktop,
.hero-image-mobile-tablet {
  display: none;
}

.hero-text-block {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-subtitle {
  position: relative;
  font-size: clamp(2.5rem, 8vw, 4.9rem);
  font-weight: 500;
  text-align: center;
  color: white;
  font-family: 'Outfit', sans-serif;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  line-height: 1.1;
  max-width: 90%;
  padding: 0 3rem;
  margin: 0;
  pointer-events: none;
}

.hero-subtitle-line {
  display: block;
  white-space: nowrap;
}

.hero-cta {
  position: relative;
  z-index: 10;
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: #3C9EF3;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.3);
}

.hero-cta:hover {
  opacity: 0.95;
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .hero-subtitle {
    font-size: clamp(1.25rem, 7vw, 2.25rem);
    padding: 0 1.5rem;
  }

  .hero-cta {
    margin-top: 1.25rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.9375rem;
  }
}
</style>
