<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="flex items-center text-gray-700 dark:text-gray-400"
      @click.prevent="toggleDropdown"
    >
      <span class="mr-3 overflow-hidden rounded-full h-11 w-11">
        <img v-if="userPhoto" :src="userPhoto" alt="Usuario" class="h-11 w-11 object-cover" />
        <div
          v-else
          class="h-11 w-11 flex items-center justify-center text-sm font-bold bg-white dark:bg-gray-800"
          style="color:#79358D"
        >
          {{ userInitials }}
        </div>
      </span>

      <span class="block mr-1 font-medium text-theme-sm max-w-[140px] truncate">{{ userName }}</span>

      <ChevronDownIcon :class="{ 'rotate-180': dropdownOpen }" />
    </button>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
    >
      <div>
        <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
          {{ userName }}
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
          {{ userEmail }}
        </span>
      </div>

      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <li v-for="item in menuItems" :key="item.href">
          <router-link
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <!-- SVG icon would go here -->
            <component
              :is="item.icon"
              class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
            />
            {{ item.text }}
          </router-link>
        </li>
      </ul>
      <button
        type="button"
        @click="handleSignOut"
        class="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 w-full text-left"
      >
        <LogoutIcon
          class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
        />
        Cerrar sesión
      </button>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup>
import { UserCircleIcon, ChevronDownIcon, LogoutIcon, SettingsIcon, InfoCircleIcon } from '@/icons'
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

const dropdownOpen = ref(false)
const dropdownRef = ref(null)
const router = useRouter()
const { currentUser, userProfile, signOut } = useAuth()

const menuItems = [
  { href: '/dashboard', icon: UserCircleIcon, text: 'Dashboard' },
  { href: '/proyectos', icon: SettingsIcon, text: 'Proyectos' },
  { href: '/profile', icon: UserCircleIcon, text: 'Edit profile' },
  { href: '/profile', icon: InfoCircleIcon, text: 'Support' },
]

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

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

const handleSignOut = async () => {
  try {
    await signOut()
    closeDropdown()
    router.push('/signin')
  } catch (e) {
    console.error('Error al cerrar sesión:', e)
  }
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
