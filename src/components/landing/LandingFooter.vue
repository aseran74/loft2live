<template>
  <footer class="py-10" style="background-color: #0D0D0D; color: white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <!-- Logo and Description -->
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <router-link to="/" class="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <span class="h-11 w-11 rounded-xl flex items-center justify-center" style="background-color:#CFCEF2">
                <img
                  src="/images/logo/Logodefi.png"
                  alt="Loft2live"
                  class="h-8 w-auto object-contain"
                  loading="lazy"
                />
              </span>
              <span class="text-2xl font-bold">Loft2live</span>
            </router-link>
          </div>
          <p class="text-sm opacity-70">
            Plataforma de inversión en crédito P2P para propiedades de alquiler.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold mb-3">Enlaces rápidos</h4>
          <ul class="space-y-2">
            <li>
              <a href="#oportunidades" class="opacity-70 hover:opacity-100 transition-opacity">Oportunidades de inversión</a>
            </li>
            <li>
              <a href="#preguntas" class="opacity-70 hover:opacity-100 transition-opacity">Preguntas frecuentes</a>
            </li>
            <li>
              <a href="#nosotros" class="opacity-70 hover:opacity-100 transition-opacity">Quiénes somos</a>
            </li>
            <li>
              <a href="#blog" class="opacity-70 hover:opacity-100 transition-opacity">Blog</a>
            </li>
          </ul>
        </div>

        <!-- Legal Documents -->
        <div>
          <h4 class="font-semibold mb-3">Documentos legales</h4>
          <ul class="space-y-2">
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
        <div>
          <h4 class="font-semibold mb-3">Contacto</h4>
          <ul class="space-y-2">
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
