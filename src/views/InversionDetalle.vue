<template>
  <full-screen-layout>
    <landing-header />
    <ProyectoDetalleShared
      mode="public"
      back-to="/inversiones"
      back-label="Volver a inversiones"
      :top-padding="true"
    />
    <landing-footer />
  </full-screen-layout>
</template>

<script setup lang="ts">
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import LandingHeader from '@/components/landing/LandingHeader.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
import ProyectoDetalleShared from '@/components/proyectos/ProyectoDetalleShared.vue'
</script>

