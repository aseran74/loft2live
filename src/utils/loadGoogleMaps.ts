let googleMapsLoaderPromise: Promise<void> | null = null

function getApiKey(): string | undefined {
  // Preferimos Places, pero aceptamos una alternativa si ya la tienes definida
  return (
    import.meta.env.VITE_GOOGLE_PLACES_API_KEY ||
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  )
}

export async function loadGoogleMapsPlaces(): Promise<void> {
  if (typeof window === 'undefined') return

  // Ya disponible
  if ((window as any).google?.maps?.places) return

  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error(
      'Falta VITE_GOOGLE_PLACES_API_KEY (o VITE_GOOGLE_MAPS_API_KEY) en el .env'
    )
  }

  if (googleMapsLoaderPromise) return googleMapsLoaderPromise

  googleMapsLoaderPromise = new Promise<void>((resolve, reject) => {
    // Si el script ya existe, esperamos a que window.google esté listo
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="maps.googleapis.com/maps/api/js"]'
    )
    if (existing) {
      const startedAt = Date.now()
      const interval = window.setInterval(() => {
        if ((window as any).google?.maps?.places) {
          window.clearInterval(interval)
          resolve()
        } else if (Date.now() - startedAt > 10000) {
          window.clearInterval(interval)
          reject(new Error('Timeout esperando Google Maps Places API'))
        }
      }, 100)
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () =>
      reject(new Error('No se pudo cargar Google Maps JavaScript API'))
    document.head.appendChild(script)
  })

  return googleMapsLoaderPromise
}

