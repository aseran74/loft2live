<script setup>
import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let ctx;

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
      .to(
        ".section.hero",
        {
            scale: 1.1,
            transformOrigin: "center center",
            ease: "power1.inOut"
        },
        "<"
      );
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <section class="section hero" :style="{ backgroundImage: `url(/images/cityscape.jpg)` }">
        <div class="hero-text">
          <h1 class="hero-title">Loft<span class="hero-title-accent">2</span>live<span class="hero-title-accent">.</span></h1>
          <p class="hero-subtitle">Ha llegado otra manera de comprar inmuebles.</p>
          <p class="hero-description">Aprovechate de las ventajas fiscales de la ley startups</p>
          <a href="#descubre-como" class="hero-button">
            Descubre cómo
          </a>
        </div>
      </section>
    </div>
    <div class="image-container">
      <img src="/images/interior.png" alt="interior">
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
}

.hero-text {
  position: relative;
  z-index: 20;
  text-align: center;
  color: white;
  font-family: 'Outfit', sans-serif;
}

.hero-title {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}

.hero-title-accent {
  color: #79358d;
}

.hero-subtitle {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 500;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
}

.hero-description {
  font-size: clamp(1.125rem, 3vw, 1.75rem);
  font-weight: 400;
  margin: 0 0 2rem 0;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
}

.hero-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: #79358d;
  color: white;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 600;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: opacity 0.3s, transform 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-family: 'Outfit', sans-serif;
}

.hero-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
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
