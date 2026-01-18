# Configuración de Storage para Firebase Auth

## Problema

Las políticas de Storage en Supabase usan `auth.uid()` que es de Supabase Auth, pero estamos usando Firebase Auth. Esto causa que las políticas RLS no funcionen correctamente.

## Soluciones

### Opción 1: Deshabilitar RLS en el bucket (Más simple, menos seguro)

1. Ve a Supabase Dashboard > Storage
2. Selecciona el bucket `photos`
3. Ve a Settings
4. **Deshabilita "Row Level Security"** (toggle off)

**Ventajas**: Funciona inmediatamente
**Desventajas**: Cualquier usuario autenticado puede subir/eliminar fotos

### Opción 2: Hacer el bucket público (Recomendado para lectura)

1. Ve a Supabase Dashboard > Storage
2. Selecciona el bucket `photos`
3. Ve a Settings
4. **Marca "Public bucket"** (esto permite lectura pública)
5. Ejecuta la migración `011_storage_policies_firebase.sql`

**Ventajas**: Las fotos son accesibles públicamente (útil para proyectos)
**Desventajas**: Las políticas de escritura aún requieren Supabase Auth

### Opción 3: Edge Function (Más seguro, más complejo)

Crea un Edge Function que:
1. Valida el token de Firebase
2. Verifica que el usuario es admin en la tabla `users`
3. Usa el service role para subir el archivo

**Ventajas**: Control total y seguro
**Desventajas**: Requiere crear y mantener un Edge Function

### Opción 4: Sincronizar Firebase Auth con Supabase Auth

Crea usuarios en Supabase Auth cuando se registren en Firebase.

**Ventajas**: Las políticas RLS funcionan correctamente
**Desventajas**: Requiere mantener dos sistemas de autenticación sincronizados

## Recomendación Actual

Para desarrollo rápido, usa la **Opción 1** (deshabilitar RLS).

Para producción, implementa la **Opción 3** (Edge Function).

## Pasos para Opción 1 (Desarrollo)

1. Ve a Supabase Dashboard > Storage > Buckets
2. Selecciona `photos` (o créalo si no existe)
3. Ve a Settings
4. Desactiva "Row Level Security"
5. Guarda los cambios

Ahora deberías poder subir fotos sin problemas.
