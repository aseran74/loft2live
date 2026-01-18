import { ref, computed } from 'vue'
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth'
import { auth, googleProvider } from '@/config/firebase'
import { supabase } from '@/config/supabase'

export interface User {
  id: string
  firebase_uid: string
  email: string
  name: string | null
  photo_url: string | null
  role: 'admin' | 'user'
  is_active: boolean
}

const currentUser = ref<FirebaseUser | null>(null)
const userProfile = ref<User | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Escuchar cambios en el estado de autenticación de Firebase
onAuthStateChanged(auth, async (firebaseUser) => {
  currentUser.value = firebaseUser
  loading.value = true
  
  if (firebaseUser) {
    // Sincronizar usuario con Supabase
    await syncUserWithSupabase(firebaseUser)
    // Obtener perfil del usuario desde Supabase
    await fetchUserProfile(firebaseUser.uid)
  } else {
    userProfile.value = null
  }
  
  loading.value = false
})

// Sincronizar usuario de Firebase con Supabase
const syncUserWithSupabase = async (firebaseUser: FirebaseUser) => {
  try {
    // Usar la función RPC directamente (más confiable con SECURITY DEFINER)
    const { data: syncedUser, error: rpcError } = await supabase.rpc('sync_firebase_user', {
      p_firebase_uid: firebaseUser.uid,
      p_email: firebaseUser.email || '',
      p_name: firebaseUser.displayName || null,
      p_photo_url: firebaseUser.photoURL || null,
      p_role: 'user'
    })

    if (rpcError) {
      // Si la función no existe
      if (rpcError.code === '42883' || rpcError.message.includes('function') || rpcError.message.includes('does not exist')) {
        console.warn('La función sync_firebase_user no existe. Intentando insertar directamente...')
        
        // Fallback: intentar insertar directamente
        const { data: insertedUser, error: insertError } = await supabase
          .from('users')
          .insert({
            firebase_uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || null,
            photo_url: firebaseUser.photoURL || null,
            role: 'user',
            is_active: true
          })
          .select()
          .single()

        if (insertError) {
          // Si la tabla no existe
          if (insertError.code === 'PGRST205' || insertError.message.includes('schema cache') || insertError.message.includes('relation') || insertError.message.includes('does not exist')) {
            console.warn('La tabla users no existe aún. Por favor ejecuta las migraciones de Supabase.')
            error.value = 'La tabla de usuarios no está configurada. Por favor ejecuta las migraciones.'
            return
          }
          
          console.error('Error inserting user:', insertError)
          error.value = `Error al crear usuario: ${insertError.message}`
        } else if (insertedUser) {
          console.log('Usuario creado directamente:', insertedUser)
          error.value = null
        }
      } else {
        console.error('Error en función RPC:', rpcError)
        error.value = `Error al sincronizar usuario: ${rpcError.message}`
      }
    } else if (syncedUser) {
      console.log('Usuario sincronizado correctamente:', syncedUser)
      error.value = null
    }
  } catch (err) {
    console.error('Error in syncUserWithSupabase:', err)
    error.value = err instanceof Error ? err.message : 'Error desconocido al sincronizar usuario'
  }
}

// Obtener perfil del usuario desde Supabase
const fetchUserProfile = async (firebaseUid: string) => {
  try {
    const { data, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('firebase_uid', firebaseUid)
      .maybeSingle()

    if (fetchError) {
      // Si la tabla no existe, no es un error crítico
      if (fetchError.code === 'PGRST205' || fetchError.message.includes('schema cache')) {
        console.warn('La tabla users no existe aún. Por favor ejecuta las migraciones de Supabase.')
        error.value = null // No mostrar error si la tabla no existe aún
        userProfile.value = null
        return
      }
      console.error('Error fetching user profile:', fetchError)
      error.value = fetchError.message
      userProfile.value = null
    } else if (data) {
      userProfile.value = data
    } else {
      // Usuario no encontrado, pero no es un error si la tabla existe
      userProfile.value = null
    }
  } catch (err) {
    console.error('Error in fetchUserProfile:', err)
    // No establecer error si es un problema de tabla no existente
    if (err instanceof Error && !err.message.includes('schema cache')) {
      error.value = err.message
    }
    userProfile.value = null
  }
}

// Iniciar sesión con Google
const signInWithGoogle = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await signInWithPopup(auth, googleProvider)
    // El onAuthStateChanged se encargará de sincronizar
    return result.user
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al iniciar sesión'
    throw err
  } finally {
    loading.value = false
  }
}

// Cerrar sesión
const signOut = async () => {
  loading.value = true
  error.value = null
  try {
    await firebaseSignOut(auth)
    userProfile.value = null
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al cerrar sesión'
    throw err
  } finally {
    loading.value = false
  }
}

// Computed properties
const isAuthenticated = computed(() => !!currentUser.value)
const isAdmin = computed(() => userProfile.value?.role === 'admin')

export function useAuth() {
  return {
    currentUser,
    userProfile,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    signInWithGoogle,
    signOut,
    fetchUserProfile
  }
}
