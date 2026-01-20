# Loft2live

Plataforma para **comprar y vender lofts** y **maximizar ventajas fiscales** (Ley Startups) con un dashboard de gestión.

Incluye:
- **Landing** pública con secciones animadas.
- **Dashboard** (Proyectos / Usuarios).
- **Proyectos**: CRUD, fotos (Supabase Storage), tipos de unidad (planos), vista detalle con mapa y simulador fiscal.
- **Usuarios**: perfiles y compradores.
- **Autenticación**: Firebase (Google Sign-In) + sincronización con Supabase.

## ¿Qué es Loft2live?

**Loft2live** es una aplicación web orientada a inversión/operación inmobiliaria centrada en lofts. Combina una **landing**
de marketing con un **dashboard** para gestionar proyectos, captación de usuarios y seguimiento, incorporando componentes
de valor añadido como:

- **Mapa y localización**: visualización de proyectos y detalle con mapa.
- **Gestión de documentación**: subida de fotos y planos por tipo de unidad.
- **Simulación fiscal**: cálculo orientativo de desgravación (Ley Startups) a partir del precio de unidad y distribución por años.

## Stack

- **Vue 3** + **Vite** + **TypeScript**
- **Tailwind CSS**
- **Supabase** (DB + Storage + migrations en `supabase/migrations/`)
- **Firebase Auth** (Google)
- **Google Maps / Places** (autocomplete + mapas)

## Arquitectura (alto nivel)

- **Frontend**: Vue (SPA) con rutas para landing y dashboard.
- **Backend**: Supabase como BaaS:
  - **DB**: tablas para proyectos y usuarios.
  - **Storage**: bucket `photos` para imágenes y planos.
  - **RLS**: políticas de seguridad por tabla/bucket (revisar si algo “no carga”).
- **Auth**: Firebase Google Sign-In en cliente + sincronización del usuario a Supabase (tabla `users`).

## Requisitos

- Node.js 18+ (recomendado 20+)
- Supabase project + credenciales
- Firebase project + credenciales
- (Opcional) Google Maps/Places API key

## Instalación

```bash
npm install
```

## Variables de entorno

Crea un `.env` (no se sube a git) con:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# Google Maps / Places (opcional)
VITE_GOOGLE_PLACES_API_KEY=...

# Firebase (según tu configuración)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

## Scripts

```bash
# desarrollo
npm run dev

# build producción
npm run build
```

## Desarrollo

```bash
npm run dev
```

App: `http://localhost:5173`

## Build

```bash
npm run build
```

## Modelo de datos (Supabase)

Tablas principales:

- **`proyectos`**
  - Campos típicos: `nombre_proyecto`, `localizacion`, `num_lofts`, `precio_unidad`, `objetivo_inversion_total`,
    `fotos` (array), `comodidades` (array), `unidades_tipos` (jsonb).
- **`users`**
  - Perfil sincronizado desde Firebase: `firebase_uid`, `email`, `name`, `photo_url`, `role`.
- **`usuarios_profile`**
  - Perfiles gestionados desde el módulo de Usuarios (CRM).
- **`usuarios_compradores`**
  - Compradores vinculables a `proyectos` (FK `proyecto_id`).

Storage:

- **Bucket `photos`**: imágenes de proyecto y planos por tipo de unidad.

## Autenticación (Firebase + Supabase)

- El usuario inicia sesión con **Google (Firebase Auth)** en el cliente.
- La app sincroniza/crea el registro del usuario en Supabase (tabla **`users`**).
- Si algo falla, suele ser por:
  - tabla inexistente/no accesible,
  - **RLS** bloqueando lecturas/escrituras,
  - políticas de **Storage** bloqueando subidas.

## Estructura rápida

- `src/components/landing/`: landing
- `src/views/Proyectos.vue`: listado / creación / edición (modal)
- `src/views/ProyectoDetalle.vue`: detalle del proyecto (mapa, galerías, simulador)
- `src/components/layout/`: layout del dashboard (sidebar/header)
- `src/composables/`: `useAuth`, `useProyectos`, `useUsuarios`
- `supabase/migrations/`: migraciones SQL (tablas, RLS, storage)

## Notas importantes

- **No subas `.env`**: está ignorado por `.gitignore`.
- Si no se ven métricas o no puedes escribir/leer datos, revisa **RLS** en Supabase y las políticas de Storage.
