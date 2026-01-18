# Configuración de Firebase y Autenticación

## 📋 Pasos de Configuración

### 1. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita **Authentication** > **Sign-in method** > **Google**
4. Obtén las credenciales de configuración:
   - Ve a **Project Settings** > **General**
   - En "Your apps", selecciona la app web o crea una nueva
   - Copia las credenciales

### 2. Configurar Variables de Entorno

Agrega las siguientes variables a tu archivo `.env`:

```env
# Firebase
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

# Supabase (ya existentes)
VITE_SUPABASE_URL=https://tu_proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

### 3. Aplicar Migraciones de Supabase

Ejecuta las siguientes migraciones en orden:

1. `005_create_users_table.sql` - Crea la tabla de usuarios
2. `006_update_rls_policies.sql` - Actualiza políticas RLS
3. `007_create_firebase_sync_trigger.sql` - Crea funciones de sincronización
4. `008_storage_policies.sql` - Políticas de Storage
5. `009_fix_rls_for_firebase.sql` - Funciones helper para Firebase

**Opción A: SQL Editor de Supabase**
- Ve a Supabase Dashboard > SQL Editor
- Ejecuta cada migración en orden

**Opción B: Supabase CLI**
```bash
supabase db push
```

### 4. Crear Usuario Admin Inicial

Después de iniciar sesión por primera vez con Google, ejecuta en Supabase SQL Editor:

```sql
-- Reemplaza 'TU_FIREBASE_UID' con el UID de Firebase del usuario que quieres hacer admin
SELECT create_admin_user(
  'TU_FIREBASE_UID',
  'tu_email@ejemplo.com',
  'Tu Nombre',
  'https://url_de_tu_foto.com'
);
```

Para obtener tu Firebase UID:
1. Inicia sesión en la aplicación
2. Abre la consola del navegador
3. El UID se mostrará en los logs o puedes obtenerlo desde Firebase Console > Authentication

### 5. Configurar Storage Bucket

1. Ve a Supabase Dashboard > Storage
2. Crea un bucket llamado `photos` si no existe
3. Configura las políticas (ya están en la migración `008_storage_policies.sql`)

### 6. Configurar Storage Bucket

1. Ve a Supabase Dashboard > Storage
2. Crea un bucket llamado `photos` si no existe
3. **IMPORTANTE**: Configura el bucket como público para lectura (Settings > Public bucket)
4. Ejecuta la migración `011_storage_policies_firebase.sql` para configurar las políticas

**Nota sobre Storage**: Como estamos usando Firebase Auth y no Supabase Auth, las políticas de Storage tienen limitaciones. La migración `011_storage_policies_firebase.sql` configura políticas permisivas. Para producción, considera usar Edge Functions que validen tokens de Firebase.

### 7. Verificar Configuración

1. Inicia sesión con Google en la aplicación
2. Verifica que el usuario se crea en la tabla `users` de Supabase
3. Verifica que puedes acceder a las rutas protegidas
4. Verifica que puedes subir fotos (las políticas actuales permiten subida a usuarios autenticados)

## 🔐 Sistema de Roles

- **user**: Usuario normal, puede leer proyectos
- **admin**: Administrador, puede crear, editar y eliminar proyectos

Los usuarios se crean automáticamente como `user` al iniciar sesión por primera vez. Para hacer un usuario admin, usa la función `create_admin_user()`.

## 🚨 Solución de Problemas

### Error: "Usuario no autenticado"
- Verifica que las migraciones se ejecutaron correctamente
- Verifica que el usuario existe en la tabla `users`
- Verifica que `is_active = true`

### Error al subir fotos
- Verifica que el bucket `photos` existe
- Verifica que las políticas de Storage están aplicadas
- Verifica que el usuario tiene rol `admin`

### Error: "Solo los administradores pueden..."
- El usuario no tiene rol `admin`
- Ejecuta `create_admin_user()` para asignar el rol
