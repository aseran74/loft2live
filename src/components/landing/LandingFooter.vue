<template>
  <footer class="py-10" style="background-color: #0D0D0D; color: white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <!-- Logo and Description -->
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <router-link to="/" class="inline-flex items-center hover:opacity-90 transition-opacity">
              <img
                src="/images/Logoblanco.png"
                alt="Loft2live"
                class="h-72 w-auto object-contain"
                loading="lazy"
              />
            </router-link>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold mb-3">Enlaces rápidos</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/inversiones" class="opacity-70 hover:opacity-100 transition-opacity">Inversiones</router-link>
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
