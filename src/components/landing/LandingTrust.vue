<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="text-center mb-10">
        <h2 class="text-3xl lg:text-4xl font-bold mb-3" style="color: #0D0D0D">
          Confianza de los clientes,<br />
          <span style="color: #79358d">la base de nuestro negocio</span>
        </h2>
        <p class="text-lg max-w-3xl mx-auto" style="color: #0D0D0D">
          LoftAndLive es una plataforma inmobiliaria P2P impulsada por <span class="font-semibold" style="color: #79358d">Grupo Vihorev</span>.
          Nuestros logros hablan por sí solos:
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div class="rounded-xl p-5 text-center" style="background-color: #DFDCF2">
          <div class="text-3xl font-bold mb-2" style="color: #79358d">5,500+</div>
          <div class="font-medium" style="color: #0D0D0D">Inversores y creciendo</div>
        </div>
        <div class="rounded-xl p-5 text-center" style="background-color: #CFCEF2">
          <div class="text-3xl font-bold mb-2" style="color: #79358d">24M€</div>
          <div class="font-medium" style="color: #0D0D0D">Elevado</div>
        </div>
        <div class="rounded-xl p-5 text-center" style="background-color: #DFDCF2">
          <div class="text-3xl font-bold mb-2" style="color: #79358d">200+</div>
          <div class="font-medium" style="color: #0D0D0D">Proyectos financiados</div>
        </div>
        <div class="rounded-xl p-5 text-center" style="background-color: #CFCEF2">
          <div class="text-3xl font-bold mb-2" style="color: #79358d">77M€</div>
          <div class="font-medium" style="color: #0D0D0D">Valor bruto de desarrollo</div>
        </div>
      </div>

      <!-- Detailed Stats Table -->
      <div class="rounded-2xl p-6 overflow-x-auto" style="background-color: #F2F2F2">
        <table class="w-full min-w-[600px]">
          <thead>
            <tr class="border-b-2" style="border-color: #CFCEF2">
              <th class="text-left py-3 px-4 font-semibold" style="color: #0D0D0D">Estado</th>
              <th class="text-left py-3 px-4 font-semibold" style="color: #0D0D0D">Unidades</th>
              <th class="text-left py-3 px-4 font-semibold" style="color: #0D0D0D">Metros cuadrados</th>
              <th class="text-left py-3 px-4 font-semibold" style="color: #0D0D0D">Coste de inversión</th>
              <th class="text-left py-3 px-4 font-semibold" style="color: #0D0D0D">Valor bruto de desarrollo</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b" style="border-color: #DFDCF2">
              <td class="py-3 px-4 font-medium" style="color: #0D0D0D">Completadas</td>
              <td class="py-3 px-4" style="color: #0D0D0D">115</td>
              <td class="py-3 px-4" style="color: #0D0D0D">7,096</td>
              <td class="py-3 px-4" style="color: #0D0D0D">11,840,000 EUR</td>
              <td class="py-3 px-4" style="color: #0D0D0D">17,000,000 EUR</td>
            </tr>
            <tr class="border-b" style="border-color: #DFDCF2">
              <td class="py-3 px-4 font-medium" style="color: #0D0D0D">En operación</td>
              <td class="py-3 px-4" style="color: #0D0D0D">197</td>
              <td class="py-3 px-4" style="color: #0D0D0D">9,040</td>
              <td class="py-3 px-4" style="color: #0D0D0D">35,600,000 EUR</td>
              <td class="py-3 px-4" style="color: #0D0D0D">44,600,000 EUR</td>
            </tr>
            <tr class="border-b" style="border-color: #DFDCF2">
              <td class="py-3 px-4 font-medium" style="color: #0D0D0D">En construcción</td>
              <td class="py-3 px-4" style="color: #0D0D0D">60</td>
              <td class="py-3 px-4" style="color: #0D0D0D">9,822</td>
              <td class="py-3 px-4" style="color: #0D0D0D">16,300,000 EUR</td>
              <td class="py-3 px-4" style="color: #0D0D0D">21,170,000 EUR</td>
            </tr>
            <tr class="font-semibold" style="background-color: #DFDCF2">
              <td class="py-3 px-4" style="color: #0D0D0D">Total</td>
              <td class="py-3 px-4" style="color: #0D0D0D">472</td>
              <td class="py-3 px-4" style="color: #0D0D0D">25,958</td>
              <td class="py-3 px-4" style="color: #0D0D0D">63,740,000 EUR</td>
              <td class="py-3 px-4" style="color: #0D0D0D">82,770,000 EUR</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
