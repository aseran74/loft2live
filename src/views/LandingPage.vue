<template>
  <full-screen-layout>
    <landing-header />
    <landing-hero />
    <landing-trust />
    <landing-investment-opportunities />
    <landing-how-it-works />
    <landing-benefits />
    <landing-footer />
  </full-screen-layout>
</template>

<script setup lang="ts">
import FullScreenLayout from '../components/layout/FullScreenLayout.vue'
import LandingHeader from '../components/landing/LandingHeader.vue'
import LandingHero from '../components/landing/LandingHero.vue'
import LandingTrust from '../components/landing/LandingTrust.vue'
import LandingInvestmentOpportunities from '../components/landing/LandingInvestmentOpportunities.vue'
import LandingHowItWorks from '../components/landing/LandingHowItWorks.vue'
import LandingBenefits from '../components/landing/LandingBenefits.vue'
import LandingFooter from '../components/landing/LandingFooter.vue'
</script>
