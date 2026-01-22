<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <!-- Acceso rápido a Proyectos -->
      <div class="col-span-12">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center gap-3 mb-4">
            <img
              src="/images/Logodefi.png"
              alt="Loft2live"
              class="h-10 w-auto"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <router-link
              to="/proyectos"
              class="flex items-center justify-between p-4 border-2 rounded-lg hover:shadow-md transition-all"
              style="border-color: #CFCEF2"
            >
              <div>
                <h3 class="font-semibold text-lg">Ver Proyectos</h3>
                <p class="text-sm text-gray-600">Gestiona todos los proyectos</p>
              </div>
              <span class="text-2xl">📊</span>
            </router-link>
            <router-link
              to="/proyectos/nuevo"
              class="flex items-center justify-between p-4 border-2 rounded-lg hover:shadow-md transition-all"
              style="border-color: #79358D"
            >
              <div>
                <h3 class="font-semibold text-lg">Crear Proyecto</h3>
                <p class="text-sm text-gray-600">Añade un nuevo proyecto</p>
              </div>
              <span class="text-2xl">➕</span>
            </router-link>
            <router-link
              to="/usuarios/perfiles"
              class="flex items-center justify-between p-4 border-2 rounded-lg hover:shadow-md transition-all"
              style="border-color: #CFCEF2"
            >
              <div>
                <h3 class="font-semibold text-lg">Usuarios</h3>
                <p class="text-sm text-gray-600">Gestiona perfiles y compradores</p>
              </div>
              <span class="text-2xl">👥</span>
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-span-12 space-y-6">
        <ecommerce-metrics />
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '../components/layout/AdminLayout.vue'
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue'
export default {
  components: {
    AdminLayout,
    EcommerceMetrics,
  },
  name: 'Ecommerce',
}
</script>
