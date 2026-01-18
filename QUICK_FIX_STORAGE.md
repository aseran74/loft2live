# Solución Rápida para el Error de Storage

## Problema
Error: "No tienes permisos para subir fotos" al intentar subir imágenes.

## Solución Inmediata (2 minutos)

### Opción 1: Deshabilitar RLS en el bucket (RECOMENDADO)

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a **Storage** > **Buckets**
4. Si el bucket `photos` no existe:
   - Haz clic en "New bucket"
   - Nombre: `photos`
   - Marca "Public bucket" ✅
   - Haz clic en "Create bucket"
5. Si el bucket `photos` ya existe:
   - Haz clic en el bucket `photos`
   - Ve a la pestaña **Settings**
   - **DESACTIVA** "Row Level Security" (toggle off)
   - Guarda los cambios

### Opción 2: Hacer el bucket público

1. Ve a Storage > Buckets > `photos`
2. Ve a Settings
3. Marca **"Public bucket"** ✅
4. Guarda los cambios

## Verificación

Después de hacer esto, intenta subir una foto nuevamente. Debería funcionar.

## Nota sobre Seguridad

Esta solución permite que cualquier usuario autenticado pueda subir fotos. Para producción, considera:
- Usar Edge Functions que validen tokens de Firebase
- Implementar verificación de roles antes de permitir subida
- Usar signed URLs para acceso temporal
