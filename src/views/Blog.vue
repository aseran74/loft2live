<template>
  <full-screen-layout>
    <landing-header />

    <section class="pt-24 pb-14" style="background-color:#F2F2F2">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="flex flex-col gap-2 mb-6">
          <h1 class="text-3xl sm:text-4xl font-bold" style="color:#0D0D0D">Blog</h1>
          <p class="text-gray-600">
            Novedades, guías y análisis sobre inversión en lofts y ventajas fiscales.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article class="bg-white rounded-2xl shadow p-6">
            <div class="text-xs font-semibold" style="color:#79358D">Próximamente</div>
            <h2 class="mt-2 text-xl font-bold" style="color:#0D0D0D">Cómo evaluar una oportunidad en Loft2live</h2>
            <p class="mt-2 text-sm text-gray-600">
              Checklist práctico para comparar proyectos, entender el precio por loft y revisar la localización.
            </p>
          </article>

          <article class="bg-white rounded-2xl shadow p-6">
            <div class="text-xs font-semibold" style="color:#79358D">Próximamente</div>
            <h2 class="mt-2 text-xl font-bold" style="color:#0D0D0D">Ley Startups: ideas clave para inversores</h2>
            <p class="mt-2 text-sm text-gray-600">
              Resumen orientativo de conceptos y cómo usar el simulador fiscal del detalle de proyecto.
            </p>
          </article>
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

