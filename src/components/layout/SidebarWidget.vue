<template>
  <div
    class="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]"
  >
    <p class="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
      Una nueva manera de comprar y vender lofts. Aprovecha y maximiza todas las ventajas fiscales.
    </p>
    <router-link
      to="/"
      class="flex items-center justify-center p-3 font-medium text-white rounded-lg text-theme-sm hover:opacity-90"
      style="background-color:#79358D"
    >
      Ir a la landing
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
