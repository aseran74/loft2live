<template>
  <full-screen-layout>
    <landing-header />

    <section class="pt-24 pb-14" style="background-color:#F2F2F2">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div class="bg-white rounded-2xl shadow p-6 sm:p-10">
          <h1 class="text-3xl sm:text-4xl font-bold" style="color:#0D0D0D">Quiénes somos</h1>
          <p class="mt-3 text-gray-600">
            En <span class="font-semibold" style="color:#0D0D0D">Loft2live</span> conectamos oportunidades inmobiliarias
            con inversores, creando una experiencia simple, transparente y con foco en la optimización fiscal.
          </p>

          <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded-2xl border p-5" style="border-color:#C8D9B0">
              <div class="text-sm font-semibold" style="color:#D92211">Misión</div>
              <div class="mt-2 text-sm text-gray-700">
                Facilitar la compra y venta de lofts con información clara, herramientas útiles y procesos ágiles.
              </div>
            </div>
            <div class="rounded-2xl border p-5" style="border-color:#C8D9B0">
              <div class="text-sm font-semibold" style="color:#D92211">Visión</div>
              <div class="mt-2 text-sm text-gray-700">
                Ser la plataforma de referencia para invertir en lofts y aprovechar ventajas fiscales de forma segura.
              </div>
            </div>
            <div class="rounded-2xl border p-5" style="border-color:#C8D9B0">
              <div class="text-sm font-semibold" style="color:#D92211">Valores</div>
              <div class="mt-2 text-sm text-gray-700">
                Transparencia, simplicidad, foco en el usuario y mejora continua.
              </div>
            </div>
          </div>

          <div class="mt-8">
            <h2 class="text-2xl font-bold" style="color:#0D0D0D">Contacto</h2>
            <p class="mt-2 text-gray-600">
              ¿Quieres saber más o colaborar? Escríbenos a
              <a class="font-semibold hover:opacity-80" style="color:#D92211" href="mailto:info@loftandlive.com">
                info@loftandlive.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <landing-footer />
  </full-screen-layout>
</template>

<script setup lang="ts">
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import LandingHeader from '@/components/landing/LandingHeader.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
</script>

