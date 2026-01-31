<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <!-- Nombre del proyecto -->
      <div>
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Nombre del proyecto *
        </label>
        <input
          v-model="formData.nombre_proyecto"
          type="text"
          required
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Objetivo de inversión total -->
      <div>
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Objetivo de inversión total (EUR) *
        </label>
        <input
          v-model.number="formData.objetivo_inversion_total"
          type="number"
          step="0.01"
          required
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Localización -->
      <div>
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Localización *
        </label>
        <input
          ref="localizacionInput"
          v-model="formData.localizacion"
          type="text"
          required
          autocomplete="off"
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Google Street View (iframe embed) -->
      <div class="md:col-span-2">
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Vista de calle (Google Street View)
        </label>
        <textarea
          v-model="formData.street_view_embed"
          rows="3"
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 resize-y font-mono"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
          placeholder="Pega el iframe de Google Maps (Share > Embed a map > Vista de calle) o solo la URL src"
        ></textarea>
        <p class="mt-1 text-xs text-gray-500">
          Ejemplo: &lt;iframe src="https://www.google.com/maps/embed?pb=..." ...&gt;&lt;/iframe&gt;
        </p>
      </div>

      <!-- Permisos -->
      <div>
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Permisos
        </label>
        <textarea
          v-model="formData.permisos"
          rows="3"
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 resize-y"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        ></textarea>
      </div>

      <!-- Características -->
      <div class="md:col-span-2">
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Características
        </label>
        <textarea
          v-model="formData.caracteristicas"
          rows="4"
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 resize-y"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
          placeholder="Descripción de las características del proyecto..."
        ></textarea>
      </div>

      <!-- Nº de lofts -->
      <div>
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Nº de lofts *
        </label>
        <input
          v-model.number="formData.num_lofts"
          type="number"
          min="1"
          required
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Precio unidad -->
      <div>
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Precio unidad (EUR) *
        </label>
        <input
          v-model.number="formData.precio_unidad"
          type="number"
          step="0.01"
          required
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Alquiler disponible -->
      <div>
        <label class="flex items-center gap-2 text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          <input
            v-model="formData.alquiler"
            type="checkbox"
            class="w-4 h-4 rounded border-gray-300"
            style="accent-color: #2793F2"
          />
          Disponible para alquiler
        </label>
      </div>

      <!-- Mostrar en landing page -->
      <div>
        <label class="flex items-center gap-2 text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          <input
            v-model="formData.mostrar_en_landing"
            type="checkbox"
            class="w-4 h-4 rounded border-gray-300"
            style="accent-color: #2793F2"
          />
          Mostrar en landing page
        </label>
      </div>

      <!-- Consulta vinculante urbanística -->
      <div>
        <label class="flex items-center gap-2 text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          <input
            v-model="formData.consulta_vinculante_urbanistica"
            type="checkbox"
            class="w-4 h-4 rounded border-gray-300"
            style="accent-color: #2793F2"
          />
          Consulta vinculante urbanística
        </label>
      </div>

      <!-- Precio alquiler mensual -->
      <div v-if="formData.alquiler">
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Precio alquiler (EUR/mes)
        </label>
        <input
          v-model.number="formData.precio_alquiler_mes"
          type="number"
          step="0.01"
          min="0"
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Gasto estimado comunidad -->
      <div>
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Gasto estimado comunidad (EUR)
        </label>
        <input
          v-model.number="formData.gasto_estimado_comunidad"
          type="number"
          step="0.01"
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Tipo de inversión -->
      <div>
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Tipo de inversión *
        </label>
        <select
          v-model="formData.tipo_inversion"
          required
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        >
          <option value="Quarterly Bullet">Quarterly Bullet</option>
          <option value="Monthly">Monthly</option>
          <option value="Annual">Annual</option>
        </select>
      </div>

      <!-- Porcentaje llegado -->
      <div>
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Porcentaje llegado (%)
        </label>
        <input
          v-model.number="formData.porcentaje_llegado"
          type="number"
          min="0"
          max="100"
          step="0.01"
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>

      <!-- Mín. término (meses) -->
      <div>
        <label class="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style="color: #0D0D0D">
          Mín. término (meses) *
        </label>
        <input
          v-model.number="formData.min_termino_meses"
          type="number"
          min="1"
          required
          class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2"
          style="border-color: #C8D9B0; focus:ring-color: #2793F2"
        />
      </div>
    </div>

    <!-- Unidades disponibles (hasta 4 tipos) -->
    <div class="mt-4 sm:mt-6">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3">
        <div>
          <label class="block text-xs sm:text-sm font-medium" style="color:#0D0D0D">
            Unidades disponibles (hasta 4 tipos)
          </label>
          <p class="text-xs text-gray-500 mt-1">
            Define variantes (p.ej. ático con terraza) con su precio, m² y planos (PDF/imagen).
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="(tipo, idx) in unidadTipos"
          :key="idx"
          class="rounded-xl border bg-white p-4"
          style="border-color:#C8D9B0"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <h3 class="text-sm sm:text-base font-semibold" style="color:#0D0D0D">
              Tipo {{ idx + 1 }}
            </h3>
            <span class="text-xs text-gray-500">
              {{ tipo.planos.length }} plano(s) guardado(s) · {{ tipo.nuevosPlanos.length }} nuevo(s)
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-medium mb-1" style="color:#0D0D0D">Nombre</label>
              <input
                v-model="tipo.nombre"
                type="text"
                class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none"
                style="border-color:#C8D9B0"
                placeholder="Ej: Estándar / Ático / Terraza"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1" style="color:#0D0D0D">Precio (EUR)</label>
              <input
                v-model.number="tipo.precio"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none"
                style="border-color:#C8D9B0"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1" style="color:#0D0D0D">m²</label>
              <input
                v-model.number="tipo.m2"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none"
                style="border-color:#C8D9B0"
              />
            </div>
          </div>

          <div class="mt-4">
            <div class="flex items-center justify-between gap-3">
              <label class="block text-xs font-medium" style="color:#0D0D0D">Planos (PDF / imagen)</label>
              <label
                class="inline-flex items-center px-3 py-2 rounded-lg text-xs font-semibold border cursor-pointer hover:opacity-80"
                style="border-color:#2793F2;color:#2793F2"
              >
                + Adjuntar planos
                <input
                  type="file"
                  class="hidden"
                  accept="application/pdf,image/*"
                  multiple
                  @change="handlePlanosSelect(idx, $event)"
                />
              </label>
            </div>

            <div v-if="tipo.planos.length > 0 || tipo.nuevosPlanos.length > 0" class="mt-3 space-y-2">
              <!-- existentes -->
              <div v-for="(p, pIdx) in tipo.planos" :key="`e-${pIdx}`" class="flex items-center justify-between gap-3 rounded-lg border px-3 py-2" style="border-color:#C8D9B0">
                <a
                  class="text-sm hover:opacity-80"
                  style="color:#2793F2"
                  :href="getPhotoUrl(p)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plano {{ pIdx + 1 }}
                </a>
                <button
                  type="button"
                  class="text-xs text-red-600 hover:opacity-80"
                  @click="removePlanoExistente(idx, pIdx)"
                >
                  Quitar
                </button>
              </div>

              <!-- nuevos -->
              <div v-for="(f, fIdx) in tipo.nuevosPlanos" :key="`n-${fIdx}`" class="flex items-center justify-between gap-3 rounded-lg border px-3 py-2" style="border-color:#C8D9B0">
                <span class="text-sm text-gray-800 truncate">{{ f.name }}</span>
                <button
                  type="button"
                  class="text-xs text-red-600 hover:opacity-80"
                  @click="removeNuevoPlano(idx, fIdx)"
                >
                  Quitar
                </button>
              </div>
            </div>

            <p v-else class="mt-2 text-xs text-gray-500">
              Opcional. Si no adjuntas planos, este tipo igualmente puede tener precio y m².
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Comodidades / Complementos -->
    <div class="mt-4 sm:mt-6">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3">
        <div>
          <label class="block text-xs sm:text-sm font-medium" style="color: #0D0D0D">
            Comodidades / complementos
          </label>
          <p class="text-xs text-gray-500 mt-1">
            Selecciona las comodidades disponibles en este proyecto.
          </p>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="text-xs px-3 py-1 rounded-lg border hover:opacity-80"
            style="border-color: #C8D9B0; color: #0D0D0D"
            @click="selectAllAmenities"
          >
            Seleccionar todo
          </button>
          <button
            type="button"
            class="text-xs px-3 py-1 rounded-lg border hover:opacity-80"
            style="border-color: #C8D9B0; color: #0D0D0D"
            @click="clearAmenities"
          >
            Limpiar
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="group in amenityGroups"
          :key="group.title"
          class="rounded-xl border bg-white p-4"
          style="border-color: #C8D9B0"
        >
          <div class="mb-3">
            <h3 class="text-sm sm:text-base font-semibold" style="color: #0D0D0D">{{ group.title }}</h3>
            <p v-if="group.subtitle" class="text-xs text-gray-500 mt-1">{{ group.subtitle }}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <label
              v-for="item in group.items"
              :key="item.key"
              class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
              style="border-color: #C8D9B0"
            >
              <input
                type="checkbox"
                class="mt-1"
                :checked="isAmenitySelected(item.key)"
                @change="toggleAmenity(item.key)"
              />
              <span class="mt-0.5 w-5 h-5 shrink-0" style="color: #2793F2" v-html="getAmenityIconSvg(item.key)"></span>
              <span class="text-sm text-gray-800 leading-snug">{{ item.label }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Fotos oficina actual -->
    <div class="mt-4 sm:mt-6">
      <label class="block text-xs sm:text-sm font-medium mb-2 sm:mb-3" style="color: #0D0D0D">
        Fotos oficina actual
      </label>
      <div class="mb-4">
        <input
          ref="fileInputOficinaActual"
          type="file"
          accept="image/*"
          multiple
          @change="(e) => handleFileSelectOficina(e, 'actual')"
          class="hidden"
        />
        <button
          type="button"
          @click="fileInputOficinaActual?.click()"
          class="w-full sm:w-auto px-4 py-2 border-2 border-dashed rounded-lg transition-colors font-medium hover:opacity-70 text-sm sm:text-base"
          style="border-color: #2793F2; color: #2793F2"
        >
          + Agregar fotos oficina actual
        </button>
      </div>
      <div v-if="uploadedPhotosOficinaActual.length > 0 || existingPhotosOficinaActual.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mt-4">
        <div v-for="(photo, index) in existingPhotosOficinaActual" :key="`ea-${index}`" class="relative group">
          <img :src="getPhotoUrl(photo)" :alt="`Oficina actual ${index + 1}`" class="w-full h-24 sm:h-32 object-cover rounded-lg" />
          <button type="button" @click="removeExistingPhotoOficina(index, 'actual')" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
        </div>
        <div v-for="(photo, index) in uploadedPhotosOficinaActual" :key="`na-${index}`" class="relative group">
          <img :src="photo.preview" :alt="`Nueva oficina actual ${index + 1}`" class="w-full h-24 sm:h-32 object-cover rounded-lg" />
          <button type="button" @click="removePhotoOficina(index, 'actual')" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
        </div>
      </div>
    </div>

    <!-- Fotos oficina remodelada -->
    <div class="mt-4 sm:mt-6">
      <label class="block text-xs sm:text-sm font-medium mb-2 sm:mb-3" style="color: #0D0D0D">
        Fotos oficina remodelada
      </label>
      <div class="mb-4">
        <input
          ref="fileInputOficinaRemodelada"
          type="file"
          accept="image/*"
          multiple
          @change="(e) => handleFileSelectOficina(e, 'remodelada')"
          class="hidden"
        />
        <button
          type="button"
          @click="fileInputOficinaRemodelada?.click()"
          class="w-full sm:w-auto px-4 py-2 border-2 border-dashed rounded-lg transition-colors font-medium hover:opacity-70 text-sm sm:text-base"
          style="border-color: #2793F2; color: #2793F2"
        >
          + Agregar fotos oficina remodelada
        </button>
      </div>
      <div v-if="uploadedPhotosOficinaRemodelada.length > 0 || existingPhotosOficinaRemodelada.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mt-4">
        <div v-for="(photo, index) in existingPhotosOficinaRemodelada" :key="`er-${index}`" class="relative group">
          <img :src="getPhotoUrl(photo)" :alt="`Oficina remodelada ${index + 1}`" class="w-full h-24 sm:h-32 object-cover rounded-lg" />
          <button type="button" @click="removeExistingPhotoOficina(index, 'remodelada')" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
        </div>
        <div v-for="(photo, index) in uploadedPhotosOficinaRemodelada" :key="`nr-${index}`" class="relative group">
          <img :src="photo.preview" :alt="`Nueva oficina remodelada ${index + 1}`" class="w-full h-24 sm:h-32 object-cover rounded-lg" />
          <button type="button" @click="removePhotoOficina(index, 'remodelada')" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
        </div>
      </div>
    </div>

    <!-- Fotos del proyecto (galería general) -->
    <div class="mt-4 sm:mt-6">
      <label class="block text-xs sm:text-sm font-medium mb-2 sm:mb-3" style="color: #0D0D0D">
        Fotos del proyecto (galería)
      </label>
      <div class="mb-4">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          multiple
          @change="handleFileSelect"
          class="hidden"
        />
        <button
          type="button"
          @click="fileInput?.click()"
          class="w-full sm:w-auto px-4 py-2 border-2 border-dashed rounded-lg transition-colors font-medium hover:opacity-70 text-sm sm:text-base"
          style="border-color: #2793F2; color: #2793F2"
        >
          + Agregar fotos
        </button>
      </div>
      <div v-if="uploadedPhotos.length > 0 || existingPhotos.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mt-4">
        <div v-for="(photo, index) in existingPhotos" :key="`existing-${index}`" class="relative group">
          <img :src="getPhotoUrl(photo)" :alt="`Foto ${index + 1}`" class="w-full h-24 sm:h-32 object-cover rounded-lg" />
          <button type="button" @click="removeExistingPhoto(index)" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
        </div>
        <div v-for="(photo, index) in uploadedPhotos" :key="`new-${index}`" class="relative group">
          <img :src="photo.preview" :alt="`Nueva foto ${index + 1}`" class="w-full h-24 sm:h-32 object-cover rounded-lg" />
          <button type="button" @click="removePhoto(index)" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
          <div v-if="photo.uploading" class="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center"><span class="text-white text-sm">Subiendo...</span></div>
        </div>
      </div>
    </div>

    <!-- Videos del proyecto (URLs o rutas) -->
    <div class="mt-4 sm:mt-6">
      <label class="block text-xs sm:text-sm font-medium mb-2 sm:mb-3" style="color: #0D0D0D">
        Videos del proyecto
      </label>
      <p class="text-xs text-gray-500 mb-3">Añade URLs de vídeos (enlace directo .mp4 o ruta en storage) o de YouTube/Vimeo.</p>
      <div class="flex flex-wrap gap-2 mb-3">
        <input
          v-model="newVideoUrl"
          type="url"
          placeholder="https://... o ruta del vídeo"
          class="flex-1 min-w-[200px] px-3 py-2 border rounded-lg text-sm"
          style="border-color: #C8D9B0"
          @keydown.enter.prevent="addVideo"
        />
        <button
          type="button"
          @click="addVideo"
          class="px-4 py-2 rounded-lg font-medium text-sm transition-colors hover:opacity-70"
          style="background-color: #2793F2; color: white"
        >
          + Añadir vídeo
        </button>
      </div>
      <div v-if="formData.videos && formData.videos.length > 0" class="space-y-2">
        <div
          v-for="(url, index) in formData.videos"
          :key="index"
          class="flex items-center gap-2 py-2 px-3 rounded-lg border text-sm"
          style="border-color: #C8D9B0; background: #FAFAFA"
        >
          <span class="flex-1 truncate text-gray-700" :title="url">{{ url }}</span>
          <button
            type="button"
            @click="removeVideo(index)"
            class="shrink-0 w-7 h-7 flex items-center justify-center rounded text-red-600 hover:bg-red-50"
            title="Quitar vídeo"
          >
            ×
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
      <button
        type="button"
        @click="$emit('cancel')"
        class="w-full sm:w-auto px-6 py-2 border-2 rounded-lg transition-colors font-semibold hover:opacity-70"
        style="border-color: #C8D9B0; color: #0D0D0D"
      >
        Cancelar
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="w-full sm:w-auto px-6 py-2 text-white rounded-lg transition-colors font-semibold hover:opacity-90 disabled:opacity-50"
        style="background-color: #2793F2"
      >
        {{ loading ? 'Guardando...' : (proyecto?.id ? 'Actualizar' : 'Crear') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'
import type { Proyecto, UnidadTipo } from '@/types/proyecto'
import { supabase } from '@/config/supabase'
import { loadGoogleMapsPlaces } from '@/utils/loadGoogleMaps'
import { amenityGroups, getAmenityIconSvg, type AmenityKey } from '@/utils/amenities'

const props = defineProps<{
  proyecto?: Proyecto
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [
    data: Omit<Proyecto, 'id' | 'created_at' | 'updated_at'>,
    photos: File[],
    planosPorTipo: File[][],
    photosOficinaActual: File[],
    photosOficinaRemodelada: File[]
  ]
  cancel: []
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const fileInputOficinaActual = ref<HTMLInputElement | null>(null)
const fileInputOficinaRemodelada = ref<HTMLInputElement | null>(null)
const localizacionInput = ref<HTMLInputElement | null>(null)
const uploadedPhotos = ref<Array<{ file: File; preview: string; uploading: boolean; url?: string }>>([])
const existingPhotos = ref<string[]>([])
const uploadedPhotosOficinaActual = ref<Array<{ file: File; preview: string }>>([])
const existingPhotosOficinaActual = ref<string[]>([])
const uploadedPhotosOficinaRemodelada = ref<Array<{ file: File; preview: string }>>([])
const existingPhotosOficinaRemodelada = ref<string[]>([])
const newVideoUrl = ref('')
const uploading = ref(false)
let placesAutocomplete: any = null
let placesListener: any = null

type UnidadTipoForm = {
  nombre: string
  precio: number
  m2: number | null
  planos: string[]
  nuevosPlanos: File[]
}

const formData = ref<Omit<Proyecto, 'id' | 'created_at' | 'updated_at'>>({
  nombre_proyecto: '',
  objetivo_inversion_total: 0,
  localizacion: '',
  permisos: '',
  num_lofts: 0,
  precio_unidad: 0,
  gasto_estimado_comunidad: 0,
  tipo_inversion: 'Quarterly Bullet',
  porcentaje_llegado: 0,
  min_termino_meses: 24,
  monto_restante: 0,
  alquiler: false,
  precio_alquiler_mes: undefined,
  mostrar_en_landing: false,
  consulta_vinculante_urbanistica: false,
  caracteristicas: '',
  fotos: [],
  fotos_oficina_actual: [],
  fotos_oficina_remodelada: [],
  videos: [],
  street_view_embed: '',
  comodidades: [],
  unidades_tipos: []
})

const unidadTipos = ref<UnidadTipoForm[]>([
  { nombre: 'Tipo 1', precio: 0, m2: null, planos: [], nuevosPlanos: [] },
  { nombre: 'Tipo 2', precio: 0, m2: null, planos: [], nuevosPlanos: [] },
  { nombre: 'Tipo 3', precio: 0, m2: null, planos: [], nuevosPlanos: [] },
  { nombre: 'Tipo 4', precio: 0, m2: null, planos: [], nuevosPlanos: [] },
])

const hasAnyUnidadTipo = computed(() => {
  return unidadTipos.value.some((t) => (t.precio || 0) > 0 || (t.m2 || 0) > 0 || (t.planos?.length || 0) > 0 || (t.nuevosPlanos?.length || 0) > 0)
})

// Cargar datos del proyecto si existe
watch(() => props.proyecto, (newProyecto) => {
  if (newProyecto) {
    formData.value = {
      nombre_proyecto: newProyecto.nombre_proyecto,
      objetivo_inversion_total: newProyecto.objetivo_inversion_total,
      localizacion: newProyecto.localizacion,
      permisos: newProyecto.permisos || '',
      num_lofts: newProyecto.num_lofts,
      precio_unidad: newProyecto.precio_unidad,
      gasto_estimado_comunidad: newProyecto.gasto_estimado_comunidad || 0,
      tipo_inversion: newProyecto.tipo_inversion,
      porcentaje_llegado: newProyecto.porcentaje_llegado,
      min_termino_meses: newProyecto.min_termino_meses,
      monto_restante: newProyecto.monto_restante || 0,
      alquiler: newProyecto.alquiler || false,
      precio_alquiler_mes: newProyecto.precio_alquiler_mes,
      mostrar_en_landing: newProyecto.mostrar_en_landing || false,
      consulta_vinculante_urbanistica: newProyecto.consulta_vinculante_urbanistica || false,
      caracteristicas: newProyecto.caracteristicas || '',
      fotos: Array.isArray(newProyecto.fotos) ? newProyecto.fotos : [],
      fotos_oficina_actual: Array.isArray(newProyecto.fotos_oficina_actual) ? newProyecto.fotos_oficina_actual : [],
      fotos_oficina_remodelada: Array.isArray(newProyecto.fotos_oficina_remodelada) ? newProyecto.fotos_oficina_remodelada : [],
      videos: Array.isArray(newProyecto.videos) ? newProyecto.videos : [],
      street_view_embed: newProyecto.street_view_embed || '',
      comodidades: Array.isArray(newProyecto.comodidades) ? newProyecto.comodidades : [],
      unidades_tipos: Array.isArray(newProyecto.unidades_tipos) ? (newProyecto.unidades_tipos as UnidadTipo[]) : []
    }
    existingPhotos.value = Array.isArray(newProyecto.fotos) ? newProyecto.fotos : []
    existingPhotosOficinaActual.value = Array.isArray(newProyecto.fotos_oficina_actual) ? newProyecto.fotos_oficina_actual : []
    existingPhotosOficinaRemodelada.value = Array.isArray(newProyecto.fotos_oficina_remodelada) ? newProyecto.fotos_oficina_remodelada : []

    // Cargar tipos de unidad en el editor (hasta 4)
    const incoming = Array.isArray(newProyecto.unidades_tipos) ? (newProyecto.unidades_tipos as any[]) : []
    unidadTipos.value = [0, 1, 2, 3].map((idx) => {
      const u = incoming[idx] || {}
      return {
        nombre: u.nombre || `Tipo ${idx + 1}`,
        precio: Number(u.precio || 0),
        m2: u.m2 === null || u.m2 === undefined || u.m2 === '' ? null : Number(u.m2),
        planos: Array.isArray(u.planos) ? u.planos : [],
        nuevosPlanos: [],
      }
    })
  } else {
    // Resetear formulario
    formData.value = {
      nombre_proyecto: '',
      objetivo_inversion_total: 0,
      localizacion: '',
      permisos: '',
      num_lofts: 0,
      precio_unidad: 0,
      gasto_estimado_comunidad: 0,
      tipo_inversion: 'Quarterly Bullet',
      porcentaje_llegado: 0,
      min_termino_meses: 24,
      monto_restante: 0,
      alquiler: false,
      precio_alquiler_mes: undefined,
      mostrar_en_landing: false,
      consulta_vinculante_urbanistica: false,
      caracteristicas: '',
      fotos: [],
      fotos_oficina_actual: [],
      fotos_oficina_remodelada: [],
      videos: [],
      street_view_embed: '',
      comodidades: [],
      unidades_tipos: []
    }
    existingPhotos.value = []
    existingPhotosOficinaActual.value = []
    existingPhotosOficinaRemodelada.value = []
    uploadedPhotos.value = []
    uploadedPhotosOficinaActual.value = []
    uploadedPhotosOficinaRemodelada.value = []
    newVideoUrl.value = ''

    unidadTipos.value = [
      { nombre: 'Tipo 1', precio: 0, m2: null, planos: [], nuevosPlanos: [] },
      { nombre: 'Tipo 2', precio: 0, m2: null, planos: [], nuevosPlanos: [] },
      { nombre: 'Tipo 3', precio: 0, m2: null, planos: [], nuevosPlanos: [] },
      { nombre: 'Tipo 4', precio: 0, m2: null, planos: [], nuevosPlanos: [] },
    ]
  }
}, { immediate: true })

const isAmenitySelected = (key: AmenityKey) => {
  return Array.isArray(formData.value.comodidades) && formData.value.comodidades.includes(key)
}

const toggleAmenity = (key: AmenityKey) => {
  const current = Array.isArray(formData.value.comodidades) ? [...formData.value.comodidades] : []
  const idx = current.indexOf(key)
  if (idx >= 0) current.splice(idx, 1)
  else current.push(key)
  formData.value.comodidades = current
}

const selectAllAmenities = () => {
  const all = amenityGroups.flatMap((g) => g.items.map((i) => i.key))
  formData.value.comodidades = all
}

const clearAmenities = () => {
  formData.value.comodidades = []
}

const initPlacesAutocomplete = async () => {
  if (!localizacionInput.value) return

  try {
    await loadGoogleMapsPlaces()
  } catch (e) {
    // Si la key no está bien o la API no carga, dejamos el input normal
    console.warn('No se pudo cargar Google Places:', e)
    return
  }

  // google lo deja en window
  const g = (window as any).google
  if (!g?.maps?.places?.Autocomplete) return

  // Evitar doble init
  if (placesAutocomplete) return

  placesAutocomplete = new g.maps.places.Autocomplete(localizacionInput.value, {
    fields: ['formatted_address', 'name', 'geometry'],
    types: ['geocode'],
  })

  placesListener = placesAutocomplete.addListener('place_changed', () => {
    const place = placesAutocomplete.getPlace?.()
    const address =
      place?.formatted_address ||
      place?.name ||
      localizacionInput.value?.value ||
      ''

    formData.value.localizacion = address
  })
}

onMounted(async () => {
  await nextTick()
  await initPlacesAutocomplete()
})

onUnmounted(() => {
  if (placesListener?.remove) {
    placesListener.remove()
  }
  placesListener = null
  placesAutocomplete = null
})

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    Array.from(target.files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          uploadedPhotos.value.push({
            file,
            preview: e.target?.result as string,
            uploading: false
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }
  // Reset input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removePhoto = (index: number) => {
  uploadedPhotos.value.splice(index, 1)
}

const addVideo = () => {
  const url = (newVideoUrl.value || '').trim()
  if (!url) return
  const list = Array.isArray(formData.value.videos) ? [...formData.value.videos] : []
  list.push(url)
  formData.value.videos = list
  newVideoUrl.value = ''
}

const removeVideo = (index: number) => {
  const list = Array.isArray(formData.value.videos) ? [...formData.value.videos] : []
  list.splice(index, 1)
  formData.value.videos = list
}

const removeExistingPhoto = (index: number) => {
  existingPhotos.value.splice(index, 1)
  formData.value.fotos = [...existingPhotos.value]
}

const handleFileSelectOficina = (event: Event, tipo: 'actual' | 'remodelada') => {
  const target = event.target as HTMLInputElement
  if (!target.files) return
  const list = tipo === 'actual' ? uploadedPhotosOficinaActual : uploadedPhotosOficinaRemodelada
  Array.from(target.files).forEach((file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        list.value.push({ file, preview: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  })
  target.value = ''
}

const removePhotoOficina = (index: number, tipo: 'actual' | 'remodelada') => {
  if (tipo === 'actual') uploadedPhotosOficinaActual.value.splice(index, 1)
  else uploadedPhotosOficinaRemodelada.value.splice(index, 1)
}

const removeExistingPhotoOficina = (index: number, tipo: 'actual' | 'remodelada') => {
  if (tipo === 'actual') {
    existingPhotosOficinaActual.value.splice(index, 1)
    formData.value.fotos_oficina_actual = [...existingPhotosOficinaActual.value]
  } else {
    existingPhotosOficinaRemodelada.value.splice(index, 1)
    formData.value.fotos_oficina_remodelada = [...existingPhotosOficinaRemodelada.value]
  }
}

// Exponer función para obtener fotos existentes que se mantienen
const getRemainingPhotos = () => {
  return existingPhotos.value
}

const getPhotoUrl = (photoPath: string): string => {
  // Si ya es una URL completa, devolverla
  if (photoPath.startsWith('http')) {
    return photoPath
  }
  // Si es una ruta de Supabase Storage, construir la URL
  const { data } = supabase.storage.from('photos').getPublicUrl(photoPath)
  return data.publicUrl
}

const handlePlanosSelect = (tipoIndex: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files ? Array.from(target.files) : []
  if (files.length === 0) return
  unidadTipos.value[tipoIndex].nuevosPlanos.push(...files)
  // reset input
  target.value = ''
}

const removeNuevoPlano = (tipoIndex: number, fileIndex: number) => {
  unidadTipos.value[tipoIndex].nuevosPlanos.splice(fileIndex, 1)
}

const removePlanoExistente = (tipoIndex: number, planoIndex: number) => {
  unidadTipos.value[tipoIndex].planos.splice(planoIndex, 1)
}

const buildUnidadesTiposPayload = (): UnidadTipo[] => {
  return unidadTipos.value.map((t, idx) => ({
    nombre: (t.nombre || `Tipo ${idx + 1}`).trim(),
    precio: Number(t.precio || 0),
    m2: t.m2 === null ? undefined : Number(t.m2 || 0),
    planos: Array.isArray(t.planos) ? t.planos : [],
  }))
}

function extractStreetViewSrc(value: string | undefined): string {
  if (!value || !value.trim()) return ''
  const v = value.trim()
  const srcMatch = v.match(/src=["']([^"']+)["']/i)
  if (srcMatch) return srcMatch[1]
  if (v.startsWith('http')) return v
  return v
}

const handleSubmit = async () => {
  formData.value.fotos_oficina_actual = [...existingPhotosOficinaActual.value]
  formData.value.fotos_oficina_remodelada = [...existingPhotosOficinaRemodelada.value]
  formData.value.street_view_embed = extractStreetViewSrc(formData.value.street_view_embed)
  const photosToUpload = uploadedPhotos.value.map(p => p.file)
  const photosOficinaActual = uploadedPhotosOficinaActual.value.map(p => p.file)
  const photosOficinaRemodelada = uploadedPhotosOficinaRemodelada.value.map(p => p.file)
  formData.value.unidades_tipos = buildUnidadesTiposPayload()
  const planosPorTipo = unidadTipos.value.map((t) => t.nuevosPlanos)
  emit('submit', formData.value, photosToUpload, planosPorTipo, photosOficinaActual, photosOficinaRemodelada)
}
</script>
