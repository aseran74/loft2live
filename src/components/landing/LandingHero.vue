<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let ctx: gsap.Context | undefined;

onMounted(() => {
  console.clear();
  
  ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
            trigger: ".wrapper",
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true,
            markers: false
        }
      })
      .to(".image-container img", {
        scale: 5,
        opacity: 0,
        z: 350,
        transformOrigin: "center center",
        ease: "power1.inOut"
      })
      .to(".section.hero", {
        scale: 1.1,
        transformOrigin: "center center",
        ease: "power1.inOut"
      }, "<")
      .to(".hero-logo-fixed-container", {
        opacity: 0,
        scale: 1.5,
        ease: "power1.inOut"
      }, "-=0.5");
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <div class="wrapper">
    <div class="hero-logo-fixed-container">
      <img src="/images/Logoblanco3.png" alt="Loft2live" class="hero-logo" />
    </div>

    <div class="content">
      <section class="section hero" :style="{ backgroundImage: `url(/images/Ciudadnoche.png)` }">
        <div class="hero-text">
          <p class="hero-subtitle">Ha llegado la revolución al Flexliving</p>
        </div>
      </section>
    </div>

    <div class="image-container">
      <img src="/images/interiordefi.png" alt="interior">
    </div>
  </div>
</template>

<style>
.wrapper,
.content {
  position: relative;
  width: 100%;
  z-index: 1;
}

.content {
  overflow-x: hidden;
}

.content .section {
  width: 100%;
  height: 100vh;
}

.content .section.hero {
  /* background-image set inline */
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  padding-bottom: 4rem;
}

/* Contenedor fijo del logo: subido, sin animación */
.hero-logo-fixed-container {
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none;
  width: 100%;
  display: flex;
  justify-content: center;
}

.hero-logo {
  max-width: clamp(312px, 78vw, 936px);
  width: auto;
  height: auto;
  filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.5));
}

.hero-text {
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 70rem;
  text-align: center;
  color: white;
  font-family: 'Outfit', sans-serif;
  padding: 0 2rem;
}

.hero-subtitle {
  font-size: clamp(2.5rem, 8vw, 4.9rem); /* ~50% del tamaño anterior */
  font-weight: 500;
  margin-top: 8rem;
  text-align: center;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  line-height: 1.1;
  max-width: 90%;
}

/* Móvil: subtítulo centrado */
@media (max-width: 640px) {
  .hero-text {
    padding: 0 1.5rem;
  }

  .hero-subtitle {
    font-size: clamp(1.75rem, 9vw, 3.5rem); /* ~50% del tamaño anterior */
    line-height: 1.15;
    margin-top: 6rem;
    text-align: center;
  }
}

.image-container {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  perspective: 500px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
</style>
