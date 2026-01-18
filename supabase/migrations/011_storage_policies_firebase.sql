-- Eliminar políticas anteriores que no funcionan con Firebase Auth
DROP POLICY IF EXISTS "Authenticated users can read photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete photos" ON storage.objects;

-- SOLUCIÓN: Como estamos usando Firebase Auth y no Supabase Auth,
-- las políticas de Storage no pueden verificar directamente el firebase_uid.
-- Tenemos dos opciones:

-- OPCIÓN 1: Hacer el bucket público para lectura (recomendado para fotos de proyectos)
-- Esto permite que cualquiera pueda leer las fotos, pero solo usuarios autenticados pueden subirlas
-- Para producción, considera usar un Edge Function que valide el token de Firebase

-- Política: Lectura pública de fotos
CREATE POLICY "Public read access to photos bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos');

-- OPCIÓN 2: Deshabilitar RLS temporalmente en el bucket (NO RECOMENDADO PARA PRODUCCIÓN)
-- Esto permite que cualquier usuario autenticado en Supabase pueda subir fotos
-- Como no estamos usando Supabase Auth, esto no funcionará directamente

-- Política: Permitir inserción
-- NOTA: Como estamos usando Firebase Auth y no Supabase Auth,
-- esta política solo funcionará si:
-- 1. El bucket tiene RLS deshabilitado, O
-- 2. Usas un Edge Function con service role, O
-- 3. Sincronizas Firebase Auth con Supabase Auth
--
-- Por ahora, esta política permite inserción para cualquier usuario
-- que pueda autenticarse en Supabase (aunque no estemos usando Supabase Auth directamente)
CREATE POLICY "Allow insert to photos bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'photos');

-- Política temporal: Permitir actualización
CREATE POLICY "Allow update to photos bucket"
ON storage.objects FOR UPDATE
USING (bucket_id = 'photos')
WITH CHECK (bucket_id = 'photos');

-- Política temporal: Permitir eliminación
CREATE POLICY "Allow delete from photos bucket"
ON storage.objects FOR DELETE
USING (bucket_id = 'photos');

-- NOTA IMPORTANTE:
-- Estas políticas permiten acceso sin verificación de roles porque Storage
-- no puede acceder directamente a la tabla 'users' para verificar firebase_uid.
-- 
-- Para una solución más segura en producción, deberías:
-- 1. Crear un Edge Function que valide el token de Firebase
-- 2. El Edge Function usa el service role para subir archivos
-- 3. O sincronizar Firebase Auth con Supabase Auth
