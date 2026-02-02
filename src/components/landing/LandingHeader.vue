<template>
  <header class="fixed top-0 left-0 right-0 z-50 shadow-md backdrop-blur-md" style="background-color: rgba(255, 255, 255, 0.6); transform: scale(1); will-change: auto;">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="flex items-center justify-between h-16">
        <!-- Logo (enlace a landing) -->
        <router-link to="/" class="flex items-center shrink-0" title="Ir a inicio">
          <img 
            src="/images/Logodefi.png" 
            alt="Loft2live Logo" 
            :style="logoStyle"
          />
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <!-- Búsqueda con dropdown -->
          <div class="relative" ref="busquedaDropdownRef">
            <button
              @click.prevent="toggleBusquedaDropdown"
              class="inline-flex items-center gap-2 transition-colors font-medium text-gray-900 hover:opacity-70"
            >
              <svg class="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Búsqueda</span>
              <svg class="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-if="busquedaDropdownOpen"
              class="absolute top-full left-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-xl py-2 z-50"
            >
          <router-link
            to="/inversiones"
            class="block px-4 py-2 text-sm transition-colors dropdown-nav-link"
            @click="closeBusquedaDropdown"
          >
            Compra
          </router-link>
          <router-link
            to="/alquileres"
            class="block px-4 py-2 text-sm transition-colors dropdown-nav-link"
            @click="closeBusquedaDropdown"
          >
            Alquiler
          </router-link>
            </div>
          </div>
          <router-link to="/inversiones#preguntas" class="inline-flex items-center gap-2 transition-colors font-medium nav-link-blue">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9a4 4 0 1 1 7.5 2c-.9.8-1.5 1.3-1.5 2.5V14" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17h.01" />
            </svg>
            <span>Preguntas frecuentes</span>
          </router-link>
          <router-link to="/quienes-somos" class="inline-flex items-center gap-2 transition-colors font-medium nav-link-blue">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 20a8 8 0 0 1 16 0" />
            </svg>
            <span>Quiénes somos</span>
          </router-link>
          <router-link to="/blog" class="inline-flex items-center gap-2 transition-colors font-medium nav-link-blue">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 0-2 2V4z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16" />
            </svg>
            <span>Blog</span>
          </router-link>
        </nav>

        <!-- Acceso + Usuario (Desktop) -->
        <div class="hidden md:flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <span class="font-medium text-gray-900">ES</span>
            <svg class="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- Sign in (cuando NO está autenticado) -->
          <router-link
            v-if="!isAuthenticated"
            to="/signin"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style="background-color: var(--color-landing-primary)"
          >
            <!-- Icono Google -->
            <svg class="w-4 h-4" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.208 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917Z" />
              <path fill="#FF3D00" d="M6.306 14.691 12.88 19.51C14.66 15.108 18.977 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691Z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.147 35.135 26.701 36 24 36c-5.188 0-9.617-3.318-11.282-7.946l-6.52 5.02C9.514 39.556 16.227 44 24 44Z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a11.96 11.96 0 0 1-4.085 5.565l.003-.002 6.191 5.238C36.973 39.205 44 34 44 24c0-1.341-.138-2.651-.389-3.917Z" />
            </svg>
            Iniciar sesión
          </router-link>

          <!-- Usuario -->
          <div v-if="isAuthenticated" class="relative ml-3" ref="dropdownRef">
            <button
              class="flex items-center gap-2 text-gray-900 hover:opacity-80"
              @click.prevent="toggleDropdown"
            >
              <span class="overflow-hidden rounded-full h-9 w-9 border border-gray-200 bg-white">
                <img
                  v-if="userPhoto"
                  :src="userPhoto"
                  alt="Usuario"
                  class="h-9 w-9 object-cover"
                />
                <div v-else class="h-9 w-9 flex items-center justify-center text-xs font-bold" style="color: var(--color-landing-primary)">
                  {{ userInitials }}
                </div>
              </span>
              <span class="text-sm font-medium max-w-[160px] truncate">{{ userName }}</span>
              <svg class="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              v-if="dropdownOpen"
              class="absolute right-0 mt-3 w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-xl"
            >
              <div>
                <div class="font-semibold text-gray-900 text-sm truncate">{{ userName }}</div>
                <div class="text-xs text-gray-500 mt-0.5 truncate">{{ userEmail }}</div>
              </div>
              <div class="mt-3 border-t border-gray-200 pt-3 flex flex-col gap-2">
                <router-link
                  to="/dashboard"
                  class="px-3 py-2 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-100"
                  @click="closeDropdown"
                >
                  Ir al dashboard
                </router-link>
                <button
                  type="button"
                  class="px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 text-left"
                  @click="handleSignOut"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Acceso + Menu button -->
        <div class="flex md:hidden items-center">
          <button class="p-2 text-gray-900" @click="mobileMenuOpen = !mobileMenuOpen">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-3 border-t border-gray-200">
        <nav class="flex flex-col space-y-3">
          <!-- Búsqueda móvil -->
          <div>
            <button
              @click="mobileBusquedaOpen = !mobileBusquedaOpen"
              class="w-full inline-flex items-center justify-between gap-2 transition-colors text-gray-900 hover:opacity-70"
            >
              <div class="inline-flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Búsqueda</span>
              </div>
              <svg class="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileBusquedaOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
              </svg>
            </button>
            <div v-if="mobileBusquedaOpen" class="ml-7 mt-2 space-y-2">
              <router-link
                to="/inversiones"
                class="block py-2 text-sm text-gray-700 hover:opacity-70"
                @click="mobileMenuOpen = false; mobileBusquedaOpen = false"
              >
                Compra
              </router-link>
              <router-link
                to="/alquileres"
                class="block py-2 text-sm text-gray-700 hover:opacity-70"
                @click="mobileMenuOpen = false; mobileBusquedaOpen = false"
              >
                Alquiler
              </router-link>
            </div>
          </div>
          <router-link
            to="/inversiones#preguntas"
            class="inline-flex items-center gap-2 transition-colors text-gray-900 hover:opacity-70"
            @click="mobileMenuOpen = false"
          >
            <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9a4 4 0 1 1 7.5 2c-.9.8-1.5 1.3-1.5 2.5V14" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17h.01" />
            </svg>
            Preguntas frecuentes
          </router-link>
          <router-link
            to="/quienes-somos"
            class="inline-flex items-center gap-2 transition-colors text-gray-900 hover:opacity-70"
            @click="mobileMenuOpen = false"
          >
            <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 20a8 8 0 0 1 16 0" />
            </svg>
            Quiénes somos
          </router-link>
          <router-link
            to="/blog"
            class="inline-flex items-center gap-2 transition-colors text-gray-900 hover:opacity-70"
            @click="mobileMenuOpen = false"
          >
            <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 0-2 2V4z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16" />
            </svg>
            Blog
          </router-link>
          <router-link
            v-if="!isAuthenticated"
            to="/signin"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style="background-color: var(--color-landing-primary)"
            @click="mobileMenuOpen = false"
          >
            <svg class="w-4 h-4" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.208 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917Z" />
              <path fill="#FF3D00" d="M6.306 14.691 12.88 19.51C14.66 15.108 18.977 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691Z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.147 35.135 26.701 36 24 36c-5.188 0-9.617-3.318-11.282-7.946l-6.52 5.02C9.514 39.556 16.227 44 24 44Z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a11.96 11.96 0 0 1-4.085 5.565l.003-.002 6.191 5.238C36.973 39.205 44 34 44 24c0-1.341-.138-2.651-.389-3.917Z" />
            </svg>
            Iniciar sesión
          </router-link>
          <button
            v-if="isAuthenticated"
            type="button"
            class="text-left transition-colors text-red-600 hover:opacity-70"
            @click="handleSignOut"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const mobileMenuOpen = ref(false)
const mobileBusquedaOpen = ref(false)
const dropdownOpen = ref(false)
const busquedaDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const busquedaDropdownRef = ref<HTMLElement | null>(null)

const router = useRouter()
const { currentUser, userProfile, isAuthenticated, signOut } = useAuth()

const logoStyle = computed(() => {
  return {
    height: '101px',
    width: 'auto',
  }
})

const userName = computed(() => {
  return (
    userProfile.value?.name ||
    currentUser.value?.displayName ||
    currentUser.value?.email ||
    'Usuario'
  )
})

const userEmail = computed(() => currentUser.value?.email || userProfile.value?.email || '')

const userPhoto = computed(() => userProfile.value?.photo_url || currentUser.value?.photoURL || '')

const userInitials = computed(() => {
  const base = userName.value || 'U'
  const parts = base.split(' ').filter(Boolean)
  const initials = (parts[0]?.[0] || 'U') + (parts[1]?.[0] || '')
  return initials.toUpperCase()
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const toggleBusquedaDropdown = () => {
  busquedaDropdownOpen.value = !busquedaDropdownOpen.value
}

const closeBusquedaDropdown = () => {
  busquedaDropdownOpen.value = false
}

const handleSignOut = async () => {
  try {
    await signOut()
    closeDropdown()
    mobileMenuOpen.value = false
    router.push('/signin')
  } catch (e) {
    console.error('Error al cerrar sesión:', e)
  }
}

const onClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
  if (busquedaDropdownRef.value && !busquedaDropdownRef.value.contains(event.target as Node)) {
    closeBusquedaDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
.nav-link-blue {
  color: #0D0D0D;
}
.nav-link-blue:hover {
  color: var(--color-landing-primary);
}
.dropdown-nav-link {
  color: #0D0D0D;
}
.dropdown-nav-link:hover {
  color: var(--color-landing-primary);
  background-color: rgba(var(--color-landing-primary-rgb), 0.1);
}
</style>
