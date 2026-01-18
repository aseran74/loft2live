import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics, type Analytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyD1xDERTeiWqUKTbxdMC1e6P3yXT8eVbZg',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'holydeo-89035.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'holydeo-89035',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'holydeo-89035.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '148552538042',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:148552538042:web:5b5ff3b7a12c1155956f83',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-B63BPR3W3F'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Initialize Analytics (solo en el cliente, no en SSR)
let analytics: Analytics | null = null
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app)
  } catch (error) {
    console.warn('Firebase Analytics initialization failed:', error)
  }
}

export { analytics }
export default app
