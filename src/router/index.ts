import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('../views/LandingPage.vue'),
      meta: {
        title: 'Landing Page',
      },
    },
    {
      path: '/inversiones',
      name: 'Inversiones',
      component: () => import('../views/Inversiones.vue'),
      meta: {
        title: 'Inversiones',
      },
    },
    {
      path: '/inversiones/:id',
      name: 'InversionDetalle',
      component: () => import('../views/InversionDetalle.vue'),
      meta: {
        title: 'Detalle inversión',
      },
    },
    {
      path: '/dashboard',
      name: 'Ecommerce',
      component: () => import('../views/Ecommerce.vue'),
      meta: {
        title: 'eCommerce Dashboard',
      },
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/Others/Calendar.vue'),
      meta: {
        title: 'Calendar',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: {
        title: 'Profile',
      },
    },
    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: {
        title: 'Form Elements',
      },
    },
    {
      path: '/basic-tables',
      name: 'Basic Tables',
      component: () => import('../views/Tables/BasicTables.vue'),
      meta: {
        title: 'Basic Tables',
      },
    },
    {
      path: '/line-chart',
      name: 'Line Chart',
      component: () => import('../views/Chart/LineChart/LineChart.vue'),
    },
    {
      path: '/bar-chart',
      name: 'Bar Chart',
      component: () => import('../views/Chart/BarChart/BarChart.vue'),
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('../views/UiElements/Alerts.vue'),
      meta: {
        title: 'Alerts',
      },
    },
    {
      path: '/avatars',
      name: 'Avatars',
      component: () => import('../views/UiElements/Avatars.vue'),
      meta: {
        title: 'Avatars',
      },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: {
        title: 'Badge',
      },
    },

    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: {
        title: 'Buttons',
      },
    },

    {
      path: '/images',
      name: 'Images',
      component: () => import('../views/UiElements/Images.vue'),
      meta: {
        title: 'Images',
      },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/UiElements/Videos.vue'),
      meta: {
        title: 'Videos',
      },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: {
        title: 'Blank',
      },
    },

    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },

    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
      },
    },
    {
      path: '/proyectos',
      name: 'Proyectos',
      component: () => import('../views/Proyectos.vue'),
      meta: {
        title: 'Gestión de Proyectos',
      },
    },
    {
      path: '/proyectos/nuevo',
      name: 'Nuevo Proyecto',
      component: () => import('../views/Proyectos.vue'),
      meta: {
        title: 'Crear Proyecto',
      },
    },
    {
      path: '/proyectos/:id',
      name: 'Proyecto Detalle',
      component: () => import('../views/ProyectoDetalle.vue'),
      meta: {
        title: 'Detalle del Proyecto',
      },
    },
    {
      path: '/usuarios/perfiles',
      name: 'Usuarios Perfiles',
      component: () => import('../views/UsuariosPerfiles.vue'),
      meta: {
        title: 'Perfiles de Usuarios',
      },
    },
    {
      path: '/usuarios/compradores',
      name: 'Usuarios Compradores',
      component: () => import('../views/UsuariosCompradores.vue'),
      meta: {
        title: 'Usuarios Compradores',
      },
    },
  ],
})

export default router

router.beforeEach(async (to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/', '/signin', '/signup', '/error-404']
  const isPublicRoute = publicRoutes.includes(to.path)
  
  // Rutas que requieren autenticación
  const protectedRoutes = ['/proyectos', '/usuarios', '/dashboard']
  const requiresAuth = protectedRoutes.some(route => to.path.startsWith(route))
  
  if (requiresAuth && !isPublicRoute) {
    try {
      // Importar dinámicamente para evitar problemas de inicialización
      const { useAuth } = await import('@/composables/useAuth')
      const { isAuthenticated, loading } = useAuth()
      
      // Esperar a que termine la carga inicial
      let attempts = 0
      while (loading.value && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        attempts++
      }
      
      if (!isAuthenticated.value) {
        next('/signin')
      } else {
        next()
      }
    } catch (error) {
      console.error('Error in auth guard:', error)
      next('/signin')
    }
  } else {
    // Si está autenticado y va a signin/signup, redirigir al dashboard
    if (to.path === '/signin' || to.path === '/signup') {
      try {
        const { useAuth } = await import('@/composables/useAuth')
        const { isAuthenticated } = useAuth()
        if (isAuthenticated.value) {
          next('/dashboard')
        } else {
          next()
        }
      } catch (error) {
        next()
      }
    } else {
      next()
    }
  }
})
