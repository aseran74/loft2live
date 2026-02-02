<template>
  <footer
    class="pt-0 pb-10 lg:py-16 lg:px-6"
    style="background-color: var(--color-landing-deep); color: white"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-4 md:gap-x-4 mb-6">
        <!-- Logo and Description -->
        <div class="flex items-start">
          <router-link to="/" class="inline-flex items-center hover:opacity-90 transition-opacity">
            <img
              src="/images/Logoblanco3.png"
              alt="Loft2live"
              class="h-36 w-auto object-contain max-h-40"
              loading="lazy"
            />
          </router-link>
        </div>

        <!-- Quick Links -->
        <div class="pt-0">
          <h4 class="font-semibold mb-2 mt-0">Enlaces rápidos</h4>
          <ul class="space-y-1 list-none pl-0 m-0">
            <li>
              <router-link to="/inversiones" class="opacity-70 hover:opacity-100 transition-opacity">Compra</router-link>
            </li>
            <li>
              <router-link to="/alquileres" class="opacity-70 hover:opacity-100 transition-opacity">Alquiler</router-link>
            </li>
            <li>
              <router-link to="/inversiones#preguntas" class="opacity-70 hover:opacity-100 transition-opacity">Preguntas frecuentes</router-link>
            </li>
            <li>
              <router-link to="/quienes-somos" class="opacity-70 hover:opacity-100 transition-opacity">Quiénes somos</router-link>
            </li>
            <li>
              <router-link to="/blog" class="opacity-70 hover:opacity-100 transition-opacity">Blog</router-link>
            </li>
          </ul>
        </div>

        <!-- Legal Documents -->
        <div class="pt-0">
          <h4 class="font-semibold mb-2 mt-0">Documentos legales</h4>
          <ul class="space-y-1 list-none pl-0 m-0">
            <li>
              <a href="#" class="opacity-70 hover:opacity-100 transition-opacity">Normas de la plataforma</a>
            </li>
            <li>
              <a href="#" class="opacity-70 hover:opacity-100 transition-opacity">Acuerdo de participación</a>
            </li>
            <li>
              <a href="#" class="opacity-70 hover:opacity-100 transition-opacity">GDPR</a>
            </li>
            <li>
              <a href="#" class="opacity-70 hover:opacity-100 transition-opacity">Condiciones generales</a>
            </li>
            <li>
              <a href="#" class="opacity-70 hover:opacity-100 transition-opacity">Normativa</a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="pt-0">
          <h4 class="font-semibold mb-2 mt-0">Contacto</h4>
          <ul class="space-y-1 list-none pl-0 m-0">
            <li class="opacity-70">
              <a href="mailto:info@loftandlive.com" class="hover:opacity-100 transition-opacity">info@loftandlive.com</a>
            </li>
            <li class="opacity-70 text-sm">
              Jungmannova 26/15<br />
              Praha 1 - Nové Město, 110 00
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-6 mt-6" style="border-top: 1px solid rgba(255,255,255,0.1)">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm opacity-70 mb-3 md:mb-0">
            Copyright © LoftAndLive 2026
          </p>
          <div class="flex items-center space-x-2">
            <span class="text-sm opacity-70">LoftAndLive s.r.o.</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
