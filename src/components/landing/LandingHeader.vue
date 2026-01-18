<template>
  <header class="fixed top-0 left-0 right-0 z-50 shadow-md backdrop-blur-md" style="background-color: rgba(255, 255, 255, 0.6); transform: scale(1); will-change: auto;">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <img 
            src="/images/logo/Logodefi.png" 
            alt="Loft2live Logo" 
            :style="logoStyle"
          />
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <a href="#oportunidades" class="transition-colors font-medium text-gray-900 hover:opacity-70">
            Oportunidades de inversión
          </a>
          <a href="#preguntas" class="transition-colors font-medium text-gray-900 hover:opacity-70">
            Preguntas frecuentes
          </a>
          <a href="#nosotros" class="transition-colors font-medium text-gray-900 hover:opacity-70">
            Quiénes somos
          </a>
          <a href="#blog" class="transition-colors font-medium text-gray-900 hover:opacity-70">
            Blog
          </a>
        </nav>

        <!-- Acceso + Usuario (Desktop) -->
        <div class="hidden md:flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <span class="font-medium text-gray-900">ES</span>
            <svg class="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

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
                <div v-else class="h-9 w-9 flex items-center justify-center text-xs font-bold" style="color:#79358D">
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
          <a href="#oportunidades" class="transition-colors text-gray-900 hover:opacity-70">Oportunidades de inversión</a>
          <a href="#preguntas" class="transition-colors text-gray-900 hover:opacity-70">Preguntas frecuentes</a>
          <a href="#nosotros" class="transition-colors text-gray-900 hover:opacity-70">Quiénes somos</a>
          <a href="#blog" class="transition-colors text-gray-900 hover:opacity-70">Blog</a>
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
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const mobileMenuOpen = ref(false)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

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
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>
