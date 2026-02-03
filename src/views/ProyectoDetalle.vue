<template>
  <AdminLayout>
    <div class="p-4 sm:p-6" style="background-color: #F2F2F2">
      <div class="max-w-7xl mx-auto">
        <!-- Botón volver -->
        <button
          @click="$router.push('/proyectos')"
          class="mb-6 flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
          style="color: #2793F2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Volver a proyectos
        </button>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <p style="color: #0D0D0D">Cargando proyecto...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- Contenido del proyecto -->
      <div v-else-if="proyecto" class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Header con imagen principal -->
        <div class="relative">
          <div v-if="mainPhotoPath" class="relative h-64 sm:h-96 overflow-hidden">
            <img
              :src="getPhotoUrl(mainPhotoPath)"
              :alt="proyecto.nombre_proyecto"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-4 py-2 rounded-full text-sm font-semibold" style="background-color: #C8D9B0; color: #2793F2">
                  Activo
                </span>
                <span class="px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm text-white">
                  {{ proyecto.tipo_inversion }}
                </span>
              </div>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                {{ proyecto.nombre_proyecto }}
              </h1>
              <p class="text-lg sm:text-xl text-white/90">
                {{ proyecto.localizacion }}
              </p>
            </div>
          </div>
          <div v-else class="h-64 sm:h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-gray-500">Sin imagen</p>
            </div>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="p-6 sm:p-8">
          <!-- Antes y después: oficina actual + fotos reforma (70% + 30%, resto 33%) -->
          <div
            v-if="(proyecto.fotos_oficina_actual && proyecto.fotos_oficina_actual.length > 0) || (proyecto.fotos_oficina_remodelada && proyecto.fotos_oficina_remodelada.length > 0)"
            class="mb-8 -mx-6 sm:-mx-8 px-6 sm:px-8"
          >
            <h2 class="text-2xl sm:text-3xl font-bold mb-4" style="color: #0D0D0D">Antes y después de la reforma</h2>

            <!-- Oficina actual (una foto) -->
            <div
              v-if="proyecto.fotos_oficina_actual && proyecto.fotos_oficina_actual.length > 0"
              class="mb-6"
            >
              <p class="text-base font-semibold px-4 py-3 mb-0 rounded-t-xl" style="background-color: #F2F2F2; color: #0D0D0D">Oficina actual</p>
              <div class="rounded-b-xl overflow-hidden border-2 border-t-0 shadow-md aspect-[4/3] sm:aspect-[3/2] bg-gray-100" style="border-color: #C8D9B0">
                <img
                  :src="getPhotoUrl(proyecto.fotos_oficina_actual[0])"
                  :alt="`Oficina actual - ${proyecto.nombre_proyecto}`"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <!-- Fotos oficina remodelada: como referencia (70% + 2 apiladas 30%, imagen ancha abajo, thumbnails) -->
            <div v-if="proyecto.fotos_oficina_remodelada && proyecto.fotos_oficina_remodelada.length > 0" class="fotos-reforma-wrapper">
              <p class="text-base font-semibold px-4 py-3 mb-0 rounded-t-xl" style="background-color: #F2F2F2; color: #0D0D0D">Oficina remodelada</p>
              <div class="rounded-b-xl overflow-hidden border-2 border-t-0 shadow-md" style="border-color: #C8D9B0">
                <!-- Fila superior: principal 70% + 2 fotos apiladas 30% -->
                <div class="fotos-reforma-gallery">
                  <div class="fotos-reforma-main bg-gray-100">
                    <img
                      :src="getPhotoUrl(proyecto.fotos_oficina_remodelada[0])"
                      :alt="`Oficina remodelada - ${proyecto.nombre_proyecto}`"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    v-for="(foto, idx) in proyecto.fotos_oficina_remodelada.slice(1, 3)"
                    :key="idx"
                    class="fotos-reforma-side bg-gray-100"
                  >
                    <img
                      :src="getPhotoUrl(foto)"
                      :alt="`Reforma ${idx + 2} - ${proyecto.nombre_proyecto}`"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <!-- Imagen ancha debajo (4ª foto) -->
                <div
                  v-if="proyecto.fotos_oficina_remodelada.length > 3"
                  class="fotos-reforma-wide"
                >
                  <img
                    :src="getPhotoUrl(proyecto.fotos_oficina_remodelada[3])"
                    :alt="`Reforma - ${proyecto.nombre_proyecto}`"
                    class="w-full h-full object-cover"
                  />
                </div>
                <!-- Fila de thumbnails -->
                <div class="fotos-reforma-thumbs">
                  <button
                    v-for="(foto, idx) in proyecto.fotos_oficina_remodelada"
                    :key="idx"
                    type="button"
                    class="fotos-reforma-thumb"
                    @click="openReformaLightbox(idx)"
                  >
                    <img
                      :src="getPhotoUrl(foto)"
                      :alt="`Reforma ${idx + 1}`"
                      class="w-full h-full object-cover"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Estadísticas principales -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div class="bg-gray-50 rounded-xl p-4 sm:p-6">
              <p class="text-sm text-gray-600 mb-2">Objetivo de inversión</p>
              <p class="text-2xl sm:text-3xl font-bold" style="color: #0D0D0D">
                {{ formatCurrency(proyecto.objetivo_inversion_total) }}
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 sm:p-6">
              <p class="text-sm text-gray-600 mb-2">Progreso</p>
              <p class="text-2xl sm:text-3xl font-bold" style="color: #2793F2">
                {{ proyecto.porcentaje_llegado }}%
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 sm:p-6">
              <p class="text-sm text-gray-600 mb-2">Monto restante</p>
              <p class="text-2xl sm:text-3xl font-bold" style="color: #0D0D0D">
                {{ formatCurrency(proyecto.monto_restante || 0) }}
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 sm:p-6">
              <p class="text-sm text-gray-600 mb-2">Unidades disponibles</p>
              <p class="text-2xl sm:text-3xl font-bold" style="color: #0D0D0D">
                {{ proyecto.num_lofts }}
              </p>
              <p v-if="proyecto.unidades_tipos && proyecto.unidades_tipos.length" class="text-xs text-gray-500 mt-1">
                {{ proyecto.unidades_tipos.length }} tipo(s) configurado(s)
              </p>
            </div>
          </div>

          <!-- Barra de progreso -->
          <div class="mb-8">
            <div class="flex justify-between text-sm mb-3" style="color: #0D0D0D">
              <span>Progreso de inversión</span>
              <span class="font-semibold">{{ proyecto.porcentaje_llegado }}% completado</span>
            </div>
            <div class="w-full rounded-full h-4" style="background-color: #C8D9B0">
              <div
                class="h-4 rounded-full transition-all duration-500"
                :style="`width: ${proyecto.porcentaje_llegado}%; background: linear-gradient(135deg, #C8D9B0, #2793F2)`"
              ></div>
            </div>
          </div>

          <!-- Grid de información -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <!-- Información principal -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Detalles del proyecto -->
              <div>
                <h2 class="text-2xl font-bold mb-4" style="color: #0D0D0D">Detalles del proyecto</h2>
                <div class="space-y-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-200">
                    <span class="text-gray-600 mb-1 sm:mb-0">Precio por unidad</span>
                    <span class="font-semibold text-lg" style="color: #0D0D0D">
                      {{ formatCurrency(proyecto.precio_unidad) }}
                    </span>
                  </div>
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-200">
                    <span class="text-gray-600 mb-1 sm:mb-0">Ticket de inversión</span>
                    <span class="font-semibold text-lg" style="color: #2793F2">
                      {{ formatCurrency(ticketSize) }} ({{ ticketsRestantes }} restantes)
                    </span>
                  </div>
                  <div v-if="proyecto.permisos" class="py-3">
                    <span class="text-gray-600 block mb-2">Permisos</span>
                    <p class="text-gray-800 whitespace-pre-line">{{ proyecto.permisos }}</p>
                  </div>
                  <div v-if="proyecto.caracteristicas" class="py-3">
                    <span class="text-gray-600 block mb-2">Características</span>
                    <p class="text-gray-800 whitespace-pre-line">{{ proyecto.caracteristicas }}</p>
                  </div>
                </div>
              </div>

              <!-- Tipos de unidades -->
              <div class="mt-6">
                <h2 class="text-2xl font-bold mb-4" style="color:#0D0D0D">Tipos de unidad</h2>

                <div v-if="proyecto.unidades_tipos && proyecto.unidades_tipos.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    v-for="(u, idx) in proyecto.unidades_tipos.slice(0,4)"
                    :key="idx"
                    class="rounded-xl border bg-white p-4"
                    style="border-color:#C8D9B0"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <h3 class="text-base font-semibold" style="color:#0D0D0D">{{ u.nombre || `Tipo ${idx+1}` }}</h3>
                        <p class="text-sm text-gray-600 mt-1">
                          <span class="font-semibold" style="color:#0D0D0D">{{ formatCurrency(Number(u.precio || 0)) }}</span>
                          <span v-if="u.m2" class="ml-2 text-gray-600">· {{ u.m2 }} m²</span>
                          <span v-if="u.disponibles != null && u.disponibles > 0" class="ml-2 text-gray-600">· {{ u.disponibles }} disponible(s)</span>
                        </p>
                        <p v-if="proyecto.vendido_cerrado && (u.precio_alquiler || u.alquilados != null)" class="text-sm text-gray-600 mt-2">
                          <span v-if="u.precio_alquiler" class="font-medium">{{ formatCurrency(Number(u.precio_alquiler)) }}/mes</span>
                          <span v-if="u.alquilados != null && u.alquilados > 0" class="ml-2">{{ u.alquilados }} alquilado(s)</span>
                        </p>
                      </div>
                    </div>

                    <div class="mt-3">
                      <p class="text-xs text-gray-500 mb-2">Planos</p>
                      <div v-if="u.planos && u.planos.length" class="space-y-2">
                        <a
                          v-for="(p, pIdx) in u.planos"
                          :key="pIdx"
                          class="block text-sm font-semibold hover:opacity-80"
                          style="color:#2793F2"
                          :href="getPhotoUrl(p)"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver plano {{ pIdx + 1 }}
                        </a>
                      </div>
                      <p v-else class="text-sm text-gray-600">Sin planos adjuntos.</p>
                    </div>
                  </div>
                </div>

                <div v-else class="rounded-xl border p-4 text-sm text-gray-600" style="border-color:#C8D9B0">
                  No hay tipos de unidad configurados.
                </div>
              </div>

              <!-- Comprador 100% (solo si proyecto vendido y cerrado) -->
              <div v-if="proyecto.vendido_cerrado && proyecto.id" class="mt-6">
                <h2 class="text-2xl font-bold mb-4" style="color:#0D0D0D">Comprador 100% del inmueble</h2>
                <div v-if="loadingComprador" class="rounded-xl border p-4 text-sm text-gray-500" style="border-color:#C8D9B0">Cargando...</div>
                <div v-else-if="comprador100" class="rounded-xl border p-4 bg-white" style="border-color:#C8D9B0">
                  <p class="text-base font-semibold" style="color:#0D0D0D">{{ comprador100.nombre }}</p>
                  <p v-if="comprador100.correo" class="text-sm text-gray-600 mt-1">{{ comprador100.correo }}</p>
                </div>
                <div v-else class="rounded-xl border p-4 text-sm text-gray-500" style="border-color:#C8D9B0">
                  No hay comprador con 100% del inmueble registrado.
                </div>
              </div>

              <!-- Complementos -->
              <div class="mt-6">
                <h2 class="text-2xl font-bold mb-4" style="color: #0D0D0D">Complementos</h2>

                <div v-if="proyecto.comodidades && proyecto.comodidades.length > 0" class="space-y-4">
                  <div
                    v-for="group in amenityGroups"
                    :key="group.title"
                    class="rounded-xl border p-4 bg-white"
                    style="border-color: #C8D9B0"
                  >
                    <div class="mb-3">
                      <h3 class="text-base font-semibold" style="color: #0D0D0D">{{ group.title }}</h3>
                      <p v-if="group.subtitle" class="text-xs text-gray-500 mt-1">{{ group.subtitle }}</p>
                    </div>

                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="item in group.items.filter(i => proyecto!.comodidades!.includes(i.key))"
                        :key="item.key"
                        class="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm border"
                        style="border-color: #C8D9B0; background-color: #F2F2F2; color: #0D0D0D"
                      >
                        <span class="w-4 h-4" style="color: #2793F2" v-html="getAmenityIconSvg(item.key)"></span>
                        <span class="leading-none">{{ item.label }}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div v-else class="rounded-xl border p-4 text-sm text-gray-600" style="border-color: #C8D9B0">
                  No hay complementos registrados para este proyecto.
                </div>
              </div>

              <!-- Mapa de localización -->
              <div v-if="proyecto.localizacion">
                <h2 class="text-2xl font-bold mb-4" style="color: #0D0D0D">Ubicación</h2>
                <div class="rounded-lg overflow-hidden shadow-md">
                  <div class="relative">
                    <!-- Fallback SIEMPRE visible (no requiere API key) -->
                    <iframe
                      class="w-full h-64 sm:h-80 md:h-96"
                      :src="mapsEmbedUrl"
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>

                    <!-- Mapa interactivo (si carga Google Maps) -->
                    <div
                      ref="mapContainer"
                      class="absolute inset-0 w-full h-full"
                      v-show="mapState === 'ready'"
                    ></div>

                    <div
                      v-if="mapState === 'loading'"
                      class="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center"
                    >
                      <span class="text-sm text-gray-700">Cargando mapa interactivo…</span>
                    </div>
                  </div>
                </div>
                <p class="mt-3 text-sm text-gray-600">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ proyecto.localizacion }}
                </p>
                <div class="mt-2 flex items-center gap-3">
                  <a
                    class="text-sm font-semibold hover:opacity-80"
                    style="color:#2793F2"
                    :href="mapsOpenUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir en Google Maps
                  </a>
                  <span v-if="mapErrorMessage" class="text-xs text-gray-500">
                    ({{ mapErrorMessage }})
                  </span>
                </div>

                <!-- Street View: prioridad al iframe embed guardado en el proyecto -->
                <div v-if="proyecto?.street_view_embed || projectLocation" class="mt-8">
                  <h2 class="text-2xl font-bold mb-4" style="color: #0D0D0D">Vista de calle</h2>
                  <div
                    v-if="proyecto?.street_view_embed"
                    class="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border-2 shadow-md"
                    style="border-color: #C8D9B0"
                  >
                    <iframe
                      :src="proyecto.street_view_embed"
                      class="w-full h-full"
                      style="border: 0"
                      allowfullscreen
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <template v-else>
                    <div
                      v-show="streetViewAvailable"
                      ref="streetViewContainer"
                      class="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border-2 shadow-md"
                      style="border-color: #C8D9B0"
                    ></div>
                    <div
                      v-if="!streetViewChecked"
                      class="h-48 rounded-xl border-2 flex items-center justify-center text-gray-500"
                      style="border-color: #C8D9B0; background-color: #F2F2F2"
                    >
                      Cargando vista de calle…
                    </div>
                    <div
                      v-else-if="!streetViewAvailable"
                      class="h-48 rounded-xl border-2 flex items-center justify-center text-gray-500"
                      style="border-color: #C8D9B0; background-color: #F2F2F2"
                    >
                      No hay vista de calle disponible para esta ubicación
                    </div>
                  </template>
                </div>

                <!-- Lugares cercanos (Google Places) -->
                <div v-if="projectLocation" class="mt-8">
                  <h2 class="text-2xl font-bold mb-4" style="color: #0D0D0D">Lugares cercanos</h2>
                  <div
                    v-if="nearbyPlacesCategories.length === 0"
                    class="rounded-xl border p-6 text-center text-gray-500"
                    style="border-color: #C8D9B0; background-color: #F2F2F2"
                  >
                    Cargando supermercados, farmacias, metro, autobús y colegios…
                  </div>
                  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div
                      v-for="cat in nearbyPlacesCategories"
                      :key="cat.type"
                      class="rounded-xl border p-4"
                      style="border-color: #C8D9B0; background-color: #F2F2F2"
                    >
                      <div class="flex items-center gap-2 mb-3">
                        <span class="text-xl" v-html="getPlaceCategoryIcon(cat.type)"></span>
                        <h3 class="font-semibold" style="color: #0D0D0D">{{ cat.label }}</h3>
                      </div>
                      <ul class="space-y-2 text-sm">
                        <li
                          v-for="(place, idx) in cat.places.slice(0, 5)"
                          :key="idx"
                          class="flex items-start gap-2"
                        >
                          <span class="text-gray-500 shrink-0">•</span>
                          <a
                            :href="getPlaceMapUrl(place)"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:underline"
                            style="color: #2793F2"
                          >
                            {{ place.name }}
                          </a>
                        </li>
                        <li v-if="cat.places.length === 0" class="text-gray-500">
                          No encontrado en la zona
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Caso de Éxito: Efecto 80/20 (facturación usuario + valor inmueble del proyecto) -->
              <div class="mt-8 rounded-2xl border-2 p-6 sm:p-8" style="border-color: #C8D9B0; background-color: #F2F2F2">
                <h2 class="text-2xl font-bold mb-2" style="color: #0D0D0D">
                  💰 Caso de Éxito: El "Efecto 80/20" sobre tu facturación
                </h2>
                <p class="text-sm text-gray-600 mb-6">
                  Introduce tu facturación anual. El valor del inmueble corresponde a este proyecto.
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label class="block text-sm font-semibold mb-2" style="color: #0D0D0D">Tu facturación anual (€)</label>
                    <input
                      v-model.number="facturacionAnual"
                      type="number"
                      min="0"
                      step="1000"
                      class="w-full px-4 py-3 rounded-lg border-2 bg-white text-lg"
                      style="border-color: #C8D9B0; color: #0D0D0D"
                      placeholder="80000"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-2" style="color: #0D0D0D">Valor del inmueble (este proyecto)</label>
                    <div
                      class="w-full px-4 py-3 rounded-lg border-2 text-lg font-semibold"
                      style="border-color: #C8D9B0; background-color: #EEEEEE; color: #0D0D0D"
                    >
                      {{ formatCurrency(valorInmueble) }}
                    </div>
                  </div>
                </div>

                <p class="text-gray-700 mb-6">
                  Imagina que eres un profesional o empresa que factura <strong>{{ formatCurrency(facturacionAnual || 0) }}</strong> al año.
                  Sin una estrategia inmobiliaria inteligente, tu base imponible es muy alta y terminas pagando un porcentaje elevado en impuestos.
                  Con nuestro modelo de Smart Loft, transformas tu gasto de vida en un escudo fiscal.
                </p>

                <div class="space-y-6">
                  <div class="rounded-xl border p-4 sm:p-5 bg-white" style="border-color: #C8D9B0">
                    <h3 class="text-lg font-bold mb-3" style="color: #2793F2">ESCENARIO A: EL AUTÓNOMO (Estimación Directa)</h3>
                    <p class="text-sm text-gray-700 mb-3">
                      Facturación: <strong>{{ formatCurrency(facturacionAnual || 0) }}</strong> | Alquiler: 1.200 € (1.000 € Oficina + 200 € Vivienda)
                    </p>
                    <p class="text-sm text-gray-700 mb-2">
                      <strong>Alquiler con nosotros:</strong> De esos {{ formatCurrency(facturacionAnual || 0) }}, restas 12.000 € de la oficina y el 30% de la vivienda. Ahora Hacienda solo te calcula impuestos sobre <strong>~{{ formatCurrency(baseReducidaAutonomo) }}</strong> en lugar de {{ formatCurrency(facturacionAnual || 0) }}.
                    </p>
                    <p class="text-sm text-gray-700 mb-3">
                      <strong>Resultado:</strong> Te ahorras unos <strong>{{ formatCurrency(ahorroIrpfAprox) }}</strong> al año en IRPF. Es como si el loft te costara varios meses menos al año.
                    </p>
                    <p class="text-sm text-gray-700 mb-2">
                      <strong>Compra con nosotros ({{ formatCurrency(valorInmueble) }}):</strong>
                    </p>
                    <p class="text-sm text-gray-700">
                      Inyección de Liquidez: Hacienda te devuelve el 21% de IVA de la oficina: <strong>{{ formatCurrency(ivaRecuperableOficina) }}</strong> directos a tu cuenta. Deducción por Amortización: Restas unos 4.500 €/año de tus beneficios por el desgaste del inmueble. Resultado: Pagas la hipoteca con dinero que antes se iba en impuestos.
                    </p>
                  </div>

                  <div class="rounded-xl border p-4 sm:p-5 bg-white" style="border-color: #C8D9B0">
                    <h3 class="text-lg font-bold mb-3" style="color: #2793F2">ESCENARIO B: SOCIEDAD LIMITADA (SL)</h3>
                    <p class="text-sm text-gray-700 mb-3">
                      Facturación: <strong>{{ formatCurrency(facturacionAnual || 0) }}</strong> | Compra: <strong>{{ formatCurrency(valorInmueble) }}</strong>
                    </p>
                    <p class="text-sm text-gray-700 mb-2">
                      <strong>Alquiler con nosotros:</strong> La SL deduce el 100% de la oficina (1.000 €/mes). Resultado: Reduces el beneficio de la empresa en 12.000 €, ahorrando en Impuesto de Sociedades y recuperando el IVA cada trimestre.
                    </p>
                    <p class="text-sm text-gray-700">
                      <strong>Compra con nosotros:</strong> La sociedad adquiere el activo. Efecto Balance: Tu empresa ahora tiene un patrimonio de <strong>{{ formatCurrency(valorInmueble) }}</strong>. El 80% de la hipoteca, el IBI, la comunidad y los intereses son gastos que reducen tu beneficio neto, pagando el mínimo legal de impuestos mientras el inmueble se revaloriza.
                    </p>
                  </div>

                  <div class="rounded-xl border p-4 sm:p-5 bg-white" style="border-color: #C8D9B0">
                    <h3 class="text-lg font-bold mb-3" style="color: #0D0D0D">📉 Resumen: ¿Dónde prefieres que esté tu dinero?</h3>
                    <p class="text-sm text-gray-600 mb-3">Si facturas {{ formatCurrency(facturacionAnual || 0) }}...</p>
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm border-collapse" style="border-color: #C8D9B0">
                        <thead>
                          <tr style="background-color: #F2F2F2">
                            <th class="text-left py-2 px-3 border" style="border-color: #C8D9B0; color: #0D0D0D">Concepto</th>
                            <th class="text-left py-2 px-3 border" style="border-color: #C8D9B0; color: #0D0D0D">Sin nuestro modelo</th>
                            <th class="text-left py-2 px-3 border" style="border-color: #C8D9B0; color: #2793F2">Con Smart Loft 80/20</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="py-2 px-3 border text-gray-700" style="border-color: #C8D9B0">Gasto Vivienda</td>
                            <td class="py-2 px-3 border text-gray-700" style="border-color: #C8D9B0">No deducible (100% de tu bolsillo)</td>
                            <td class="py-2 px-3 border font-semibold" style="border-color: #C8D9B0; color: #0D0D0D">80% deducible como oficina</td>
                          </tr>
                          <tr>
                            <td class="py-2 px-3 border text-gray-700" style="border-color: #C8D9B0">IVA de Compra</td>
                            <td class="py-2 px-3 border text-gray-700" style="border-color: #C8D9B0">Lo pagas y lo pierdes</td>
                            <td class="py-2 px-3 border font-semibold" style="border-color: #C8D9B0; color: #0D0D0D">Recuperas {{ formatCurrency(ivaRecuperableOficina) }} (en oficina)</td>
                          </tr>
                          <tr>
                            <td class="py-2 px-3 border text-gray-700" style="border-color: #C8D9B0">Impuestos anuales</td>
                            <td class="py-2 px-3 border text-gray-700" style="border-color: #C8D9B0">Máximo tramo</td>
                            <td class="py-2 px-3 border font-semibold" style="border-color: #C8D9B0; color: #0D0D0D">Tramo reducido por gastos</td>
                          </tr>
                          <tr>
                            <td class="py-2 px-3 border text-gray-700" style="border-color: #C8D9B0">Movilidad</td>
                            <td class="py-2 px-3 border text-gray-700" style="border-color: #C8D9B0">Atado a una ciudad</td>
                            <td class="py-2 px-3 border font-semibold" style="border-color: #C8D9B0; color: #0D0D0D">Tokens para moverte por la red</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Galería de fotos -->
              <div v-if="proyecto.fotos && proyecto.fotos.length > 0" class="mt-6">
                <h2 class="text-2xl font-bold mb-4" style="color: #0D0D0D">Galería de fotos</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div
                    v-for="(photo, index) in proyecto.fotos"
                    :key="index"
                    class="relative group cursor-pointer"
                    @click="openLightbox(index)"
                  >
                    <img
                      :src="getPhotoUrl(photo)"
                      :alt="`Foto ${index + 1} de ${proyecto.nombre_proyecto}`"
                      class="w-full h-32 sm:h-48 object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-colors"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar con información adicional -->
            <div class="space-y-6">
              <!-- Resumen de inversión -->
              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-4" style="color: #0D0D0D">Resumen</h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Tipo de inversión</span>
                    <span class="font-semibold" style="color: #0D0D0D">{{ proyecto.tipo_inversion }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Lofts disponibles</span>
                    <span class="font-semibold" style="color: #0D0D0D">{{ proyecto.num_lofts }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Localización</span>
                    <span class="font-semibold text-right" style="color: #0D0D0D">{{ proyecto.localizacion }}</span>
                  </div>
                </div>
              </div>

              <!-- Fechas -->
              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-4" style="color: #0D0D0D">Información</h3>
                <div class="space-y-3 text-sm">
                  <div>
                    <span class="text-gray-600 block">Creado</span>
                    <span class="font-semibold" style="color: #0D0D0D">
                      {{ formatDate(proyecto.created_at) }}
                    </span>
                  </div>
                  <div v-if="proyecto.updated_at">
                    <span class="text-gray-600 block">Última actualización</span>
                    <span class="font-semibold" style="color: #0D0D0D">
                      {{ formatDate(proyecto.updated_at) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Acciones -->
              <div class="flex flex-col gap-3">
                <button
                  @click="editProyecto"
                  class="w-full px-6 py-3 text-white rounded-lg transition-colors font-semibold hover:opacity-90"
                  style="background: linear-gradient(135deg, #C8D9B0, #2793F2)"
                >
                  Editar proyecto
                </button>
                <div
                  class="w-full px-6 py-3 rounded-lg border-2 text-center font-semibold"
                  style="border-color: #C8D9B0; background-color: #F2F2F2; color: #2793F2"
                >
                  Desgravación: 100% (uso 100% oficina)
                </div>
                <button
                  @click="deleteProyecto"
                  class="w-full px-6 py-3 border-2 rounded-lg transition-colors font-semibold hover:opacity-70"
                  style="border-color: #C8D9B0; color: #0D0D0D"
                >
                  Eliminar proyecto
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  </AdminLayout>

  <!-- Lightbox para fotos -->
  <div
    v-if="lightboxOpen && proyecto?.fotos && proyecto.fotos.length > 0"
    class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    @click="closeLightbox"
  >
      <button
        @click="closeLightbox"
        class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Cerrar"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button
        v-if="proyecto.fotos.length > 1"
        @click.stop="previousPhoto"
        class="absolute left-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Anterior"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        v-if="proyecto.fotos.length > 1"
        @click.stop="nextPhoto"
        class="absolute right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Siguiente"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <img
        :src="getPhotoUrl(proyecto.fotos[currentPhotoIndex])"
        :alt="`Foto ${currentPhotoIndex + 1} de ${proyecto.nombre_proyecto}`"
        class="max-w-full max-h-full object-contain"
        @click.stop
      />
      <div
        v-if="proyecto.fotos.length > 1"
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm"
      >
        {{ currentPhotoIndex + 1 }} / {{ proyecto.fotos.length }}
      </div>
  </div>

  <!-- Lightbox fotos reforma -->
  <div
    v-if="reformaLightboxOpen && proyecto?.fotos_oficina_remodelada?.length"
    class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    @click="closeReformaLightbox"
  >
    <button
      @click="closeReformaLightbox"
      class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
      aria-label="Cerrar"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <button
      v-if="proyecto.fotos_oficina_remodelada.length > 1"
      @click.stop="previousReformaPhoto"
      class="absolute left-4 text-white hover:text-gray-300 transition-colors"
      aria-label="Anterior"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      v-if="proyecto.fotos_oficina_remodelada.length > 1"
      @click.stop="nextReformaPhoto"
      class="absolute right-4 text-white hover:text-gray-300 transition-colors"
      aria-label="Siguiente"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    <img
      :src="getPhotoUrl(proyecto.fotos_oficina_remodelada[currentReformaPhotoIndex])"
      :alt="`Reforma ${currentReformaPhotoIndex + 1}`"
      class="max-w-full max-h-full object-contain"
      @click.stop
    />
    <div
      v-if="proyecto.fotos_oficina_remodelada.length > 1"
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm"
    >
      {{ currentReformaPhotoIndex + 1 }} / {{ proyecto.fotos_oficina_remodelada.length }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProyectos } from '@/composables/useProyectos'
import type { Proyecto } from '@/types/proyecto'
import { supabase } from '@/config/supabase'
import { loadGoogleMapsPlaces } from '@/utils/loadGoogleMaps'
import { amenityGroups, getAmenityIconSvg } from '@/utils/amenities'
import AdminLayout from '@/components/layout/AdminLayout.vue'

const route = useRoute()
const router = useRouter()
const { fetchProyectoById, deleteProyecto: deleteProyectoFunc } = useProyectos()

const proyecto = ref<Proyecto | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const lightboxOpen = ref(false)
const currentPhotoIndex = ref(0)
const reformaLightboxOpen = ref(false)
const currentReformaPhotoIndex = ref(0)
const facturacionAnual = ref<number>(80000)
const mapContainer = ref<HTMLDivElement | null>(null)
const streetViewContainer = ref<HTMLDivElement | null>(null)
const mapState = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const mapErrorMessage = ref<string | null>(null)
const projectLocation = ref<{ lat: number; lng: number } | null>(null)
const streetViewAvailable = ref(false)
const streetViewChecked = ref(false)
const nearbyPlacesCategories = ref<
  Array<{ type: string; label: string; places: Array<{ name: string; lat?: number; lng?: number }> }>
>([])
let map: any = null
let geocoder: any = null
let marker: any = null
let streetViewPanorama: any = null

// Manejar navegación con teclado en lightbox
let keyPressHandler: ((e: KeyboardEvent) => void) | null = null

// Cargar comprador 100% cuando proyecto vendido y cerrado
watch(
  () => proyecto.value,
  async (p) => {
    if (!p?.id || !p.vendido_cerrado || !p.objetivo_inversion_total) {
      comprador100.value = null
      return
    }
    loadingComprador.value = true
    comprador100.value = null
    try {
      const { data } = await supabase
        .from('usuarios_compradores')
        .select('nombre, correo, monto_invertido')
        .eq('proyecto_id', p.id)
        .gte('monto_invertido', Number(p.objetivo_inversion_total))
        .limit(1)
      if (data?.[0]) {
        comprador100.value = { nombre: data[0].nombre || 'Sin nombre', correo: data[0].correo }
      }
    } catch {
      comprador100.value = null
    } finally {
      loadingComprador.value = false
    }
  },
  { immediate: true }
)

onMounted(async () => {
  const proyectoId = route.params.id as string
  if (proyectoId) {
    await loadProyecto(proyectoId)
  } else {
    error.value = 'ID de proyecto no válido'
    loading.value = false
  }
  
  // Configurar manejador de teclado para lightbox
  keyPressHandler = (e: KeyboardEvent) => {
    if (reformaLightboxOpen.value) {
      if (e.key === 'Escape') closeReformaLightbox()
      else if (e.key === 'ArrowRight') nextReformaPhoto()
      else if (e.key === 'ArrowLeft') previousReformaPhoto()
    } else if (lightboxOpen.value) {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight') nextPhoto()
      else if (e.key === 'ArrowLeft') previousPhoto()
    }
  }
  window.addEventListener('keydown', keyPressHandler)
})

const loadProyecto = async (id: string) => {
  loading.value = true
  error.value = null
  try {
    const data = await fetchProyectoById(id)
    if (data) {
      proyecto.value = data
      // Cargar mapa después de que el proyecto esté cargado
      await nextTick()
      if (data.localizacion) {
        await loadGoogleMaps()
      }
    } else {
      error.value = 'Proyecto no encontrado'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al cargar el proyecto'
  } finally {
    loading.value = false
  }
}

const loadGoogleMaps = async () => {
  try {
    mapState.value = 'loading'
    mapErrorMessage.value = null
    await loadGoogleMapsPlaces()
    initMap()

    // Si por cualquier motivo no llega callback de geocode, pasamos a fallback
    window.setTimeout(() => {
      if (mapState.value === 'loading') {
        mapState.value = 'error'
        mapErrorMessage.value = 'No se pudo cargar el mapa interactivo (mostrando mapa básico)'
      }
    }, 6000)
  } catch (e) {
    console.warn('Google Places API Key no configurada o fallo cargando Maps. Se usará fallback.', e)
    mapState.value = 'error'
    mapErrorMessage.value = 'Mapa interactivo no disponible (mostrando mapa básico)'
  }
}

const initMap = () => {
  if (!mapContainer.value || !proyecto.value?.localizacion) return

  // Inicializar geocoder
  const g = (window as any).google
  if (!g?.maps) {
    mapState.value = 'error'
    mapErrorMessage.value = 'Google Maps no cargó'
    return
  }
  geocoder = new g.maps.Geocoder()

  // Configuración inicial del mapa
  const mapOptions: any = {
    zoom: 15,
    center: { lat: 40.4168, lng: -3.7038 }, // Centro por defecto (Madrid)
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  }

  map = new g.maps.Map(mapContainer.value, mapOptions)

  // Geocodificar la dirección
  geocoder.geocode(
    { address: proyecto.value.localizacion },
    (results: any, status: any) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location
        const lat = location.lat()
        const lng = location.lng()
        projectLocation.value = { lat, lng }

        // Centrar el mapa en la ubicación
        map?.setCenter(location)

        // Añadir marcador
        marker = new g.maps.Marker({
          map: map,
          position: location,
          title: proyecto.value?.nombre_proyecto || 'Proyecto',
          animation: g.maps.Animation.DROP
        })

        // Info window con información del proyecto
        const infoWindow = new g.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #0D0D0D;">
                ${proyecto.value?.nombre_proyecto || 'Proyecto'}
              </h3>
              <p style="margin: 0; color: #666; font-size: 14px;">
                ${proyecto.value?.localizacion || ''}
              </p>
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })

        mapState.value = 'ready'

        // Inicializar Street View y lugares cercanos
        nextTick(() => {
          initStreetView(lat, lng)
          fetchNearbyPlaces(lat, lng)
        })
      } else {
        console.error('Geocodificación fallida:', status)
        mapState.value = 'error'
        mapErrorMessage.value = `Mapa interactivo: no se pudo localizar (${status})`
      }
    }
  )
}

const PLACE_CATEGORIES = [
  { type: 'subway_station', label: 'Metro' },
  { type: 'supermarket', label: 'Supermercados' },
  { type: 'pharmacy', label: 'Farmacias' },
  { type: 'bus_station', label: 'Autobús' },
  { type: 'school', label: 'Colegios' },
] as const

function initStreetView(lat: number, lng: number) {
  const g = (window as any).google
  if (!g?.maps?.StreetViewService) return

  const streetViewService = new g.maps.StreetViewService()
  const pos = new g.maps.LatLng(lat, lng)

  streetViewService.getPanorama({ location: pos, radius: 100 }, (data: any, status: any) => {
    streetViewChecked.value = true
    if (status === 'OK' && data?.location?.latLng) {
      nextTick(() => {
        if (!streetViewContainer.value) return
        streetViewAvailable.value = true
        const panoLocation = data.location.latLng
        streetViewPanorama = new g.maps.StreetViewPanorama(streetViewContainer.value, {
          position: panoLocation,
          pov: { heading: 34, pitch: 10 },
          zoom: 1,
        })
      })
    }
  })
}

function fetchNearbyPlaces(lat: number, lng: number) {
  const g = (window as any).google
  if (!g?.maps?.places?.PlacesService || !map) return

  const placesService = new g.maps.places.PlacesService(map)
  const location = new g.maps.LatLng(lat, lng)
  const resultsMap: Record<string, { type: string; label: string; places: Array<{ name: string; lat?: number; lng?: number }> }> = {}
  PLACE_CATEGORIES.forEach(({ type, label }) => {
    resultsMap[type] = { type, label, places: [] }
  })
  let pending = PLACE_CATEGORIES.length

  PLACE_CATEGORIES.forEach(({ type, label }) => {
    placesService.nearbySearch(
      {
        location,
        radius: 1500,
        type,
      },
      (places: any[], status: any) => {
        const items =
          status === 'OK' && Array.isArray(places)
            ? places.map((p) => ({
                name: p.name || 'Sin nombre',
                lat: p.geometry?.location?.lat?.(),
                lng: p.geometry?.location?.lng?.(),
              }))
            : []
        resultsMap[type] = { type, label, places: items }
        pending--
        if (pending === 0) {
          nearbyPlacesCategories.value = PLACE_CATEGORIES.map((c) => resultsMap[c.type])
        }
      }
    )
  })
}

function getPlaceCategoryIcon(type: string): string {
  const icons: Record<string, string> = {
    subway_station: '🚇',
    supermarket: '🛒',
    school: '🏫',
    pharmacy: '💊',
    bus_station: '🚌',
  }
  return icons[type] ?? '📍'
}

function getPlaceMapUrl(place: { name: string; lat?: number; lng?: number }): string {
  if (place.lat != null && place.lng != null) {
    return `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`
}

const mapsEmbedUrl = computed(() => {
  const q = encodeURIComponent(proyecto.value?.localizacion || '')
  return `https://www.google.com/maps?q=${q}&output=embed`
})

const mapsOpenUrl = computed(() => {
  const q = encodeURIComponent(proyecto.value?.localizacion || '')
  return `https://www.google.com/maps?q=${q}`
})

const mainPhotoPath = computed(() => {
  const p = proyecto.value
  return p?.fotos?.[0] ?? p?.fotos_oficina_remodelada?.[0] ?? p?.fotos_oficina_actual?.[0] ?? ''
})

const ticketSize = computed(() => Number(proyecto.value?.precio_ticket) || 5000)
const ticketsRestantes = computed(() =>
  Math.max(0, Math.floor((Number(proyecto.value?.monto_restante) || 0) / ticketSize.value))
)
const valorInmueble = computed(() => Number(proyecto.value?.precio_unidad || 0))
const ivaRecuperableOficina = computed(() =>
  Math.round(valorInmueble.value * 0.8 * 0.21)
)
const baseReducidaAutonomo = computed(() => {
  const f = Number(facturacionAnual.value || 0)
  const deducibleOficina = 12000
  const deducibleVivienda = Math.round(200 * 12 * 0.3)
  return Math.max(0, f - deducibleOficina - deducibleVivienda)
})
const ahorroIrpfAprox = computed(() => {
  const f = Number(facturacionAnual.value || 0)
  const baseReducida = baseReducidaAutonomo.value
  const diferencia = f - baseReducida
  const tipoMedioAprox = 0.35
  return Math.round(diferencia * tipoMedioAprox)
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A'
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateString))
}

const getPhotoUrl = (photoPath: string): string => {
  if (photoPath.startsWith('http')) {
    return photoPath
  }
  const { data } = supabase.storage.from('photos').getPublicUrl(photoPath)
  return data.publicUrl
}

const openLightbox = (index: number) => {
  currentPhotoIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextPhoto = () => {
  if (proyecto.value?.fotos && currentPhotoIndex.value < proyecto.value.fotos.length - 1) {
    currentPhotoIndex.value++
  } else if (proyecto.value?.fotos) {
    currentPhotoIndex.value = 0
  }
}

const previousPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  } else if (proyecto.value?.fotos) {
    currentPhotoIndex.value = proyecto.value.fotos.length - 1
  }
}

const openReformaLightbox = (index: number) => {
  currentReformaPhotoIndex.value = index
  reformaLightboxOpen.value = true
}
const closeReformaLightbox = () => {
  reformaLightboxOpen.value = false
}
const nextReformaPhoto = () => {
  const fotos = proyecto.value?.fotos_oficina_remodelada
  if (fotos && currentReformaPhotoIndex.value < fotos.length - 1) currentReformaPhotoIndex.value++
  else if (fotos) currentReformaPhotoIndex.value = 0
}
const previousReformaPhoto = () => {
  if (currentReformaPhotoIndex.value > 0) currentReformaPhotoIndex.value--
  else if (proyecto.value?.fotos_oficina_remodelada?.length)
    currentReformaPhotoIndex.value = proyecto.value.fotos_oficina_remodelada.length - 1
}

const editProyecto = () => {
  if (proyecto.value?.id) {
    // Volver a la lista de proyectos y abrir el modal de edición
    router.push({
      path: '/proyectos',
      query: { edit: proyecto.value.id }
    })
  }
}

const deleteProyecto = async () => {
  if (!proyecto.value?.id) return
  
  if (confirm('¿Estás seguro de que quieres eliminar este proyecto? Esta acción no se puede deshacer.')) {
    try {
      await deleteProyectoFunc(proyecto.value.id)
      router.push('/proyectos')
    } catch (err) {
      console.error('Error al eliminar proyecto:', err)
      alert('Error al eliminar el proyecto')
    }
  }
}

onUnmounted(() => {
  if (keyPressHandler) {
    window.removeEventListener('keydown', keyPressHandler)
  }
  if (marker) {
    marker.setMap(null)
  }
  if (streetViewPanorama) {
    streetViewPanorama = null
  }
  map = null
  geocoder = null
  marker = null
})
</script>

<style scoped>
/* Animaciones suaves para el lightbox */
img {
  transition: transform 0.3s ease;
}

/* Galería oficina remodelada: como referencia (70% + 2 apiladas 30%, imagen ancha, thumbnails) */
.fotos-reforma-wrapper {
  margin-bottom: 1.5rem;
}
.fotos-reforma-gallery {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;
}
.fotos-reforma-main {
  grid-column: 1;
  min-height: 280px;
}
.fotos-reforma-main img,
.fotos-reforma-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fotos-reforma-side {
  min-height: 200px;
}
.fotos-reforma-wide {
  margin-top: 8px;
  width: 100%;
  aspect-ratio: 21/9;
  max-height: 320px;
  overflow: hidden;
  background: #f3f4f6;
}
.fotos-reforma-wide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fotos-reforma-thumbs {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  padding: 8px 0 0;
  flex-wrap: wrap;
}
.fotos-reforma-thumb {
  width: 80px;
  height: 60px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid #C8D9B0;
  padding: 0;
  cursor: pointer;
  background: #f3f4f6;
  transition: border-color 0.2s, opacity 0.2s;
}
.fotos-reforma-thumb:hover {
  border-color: #2793F2;
  opacity: 0.95;
}
.fotos-reforma-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (min-width: 640px) {
  .fotos-reforma-gallery {
    grid-template-columns: 7fr 3fr;
    grid-auto-rows: minmax(200px, 1fr);
  }
  .fotos-reforma-main {
    grid-row: 1 / -1;
    min-height: 0;
  }
  .fotos-reforma-side {
    grid-column: 2;
  }
}
</style>
