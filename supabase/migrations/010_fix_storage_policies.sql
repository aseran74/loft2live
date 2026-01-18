-- Eliminar políticas anteriores de Storage
DROP POLICY IF EXISTS "Authenticated users can read photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete photos" ON storage.objects;

-- Nota: Las políticas de Storage en Supabase no pueden acceder directamente a tablas personalizadas
-- Para trabajar con Firebase Auth, tenemos dos opciones:

-- OPCIÓN 1: Políticas permisivas (temporal, para desarrollo)
-- Permitir lectura pública de fotos
CREATE POLICY "Public read access to photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos');

-- Permitir inserción/actualización/eliminación para usuarios autenticados
-- Esto requiere que el usuario esté autenticado en Supabase Auth
-- Como estamos usando Firebase, necesitamos una solución alternativa

-- OPCIÓN 2: Usar Service Role desde un Edge Function (recomendado para producción)
-- Esto requiere crear un Edge Function que valide el token de Firebase

-- OPCIÓN 3: Políticas más permisivas temporalmente (solo para desarrollo)
-- ADVERTENCIA: Esto permite que cualquier usuario autenticado suba fotos
-- En producción, deberías usar Edge Functions o sincronizar con Supabase Auth

-- Por ahora, usaremos políticas que permitan acceso a usuarios autenticados
-- Nota: Esto requiere que el usuario tenga una sesión en Supabase Auth
-- Para producción, considera usar Edge Functions

-- Política temporal: Permitir lectura pública
CREATE POLICY "Allow public read photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos');

-- Política temporal: Permitir inserción para usuarios autenticados
-- IMPORTANTE: Esto solo funciona si el usuario está autenticado en Supabase Auth
-- Como estamos usando Firebase, necesitamos una solución alternativa
CREATE POLICY "Allow authenticated upload photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'photos' AND
  auth.role() = 'authenticated'
);

-- Política temporal: Permitir actualización
CREATE POLICY "Allow authenticated update photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'photos' AND
  auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'photos' AND
  auth.role() = 'authenticated'
);

-- Política temporal: Permitir eliminación
CREATE POLICY "Allow authenticated delete photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'photos' AND
  auth.role() = 'authenticated'
);

-- ALTERNATIVA: Si las políticas anteriores no funcionan porque no hay Supabase Auth,
-- puedes deshabilitar RLS temporalmente en el bucket (NO RECOMENDADO PARA PRODUCCIÓN):
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY WHERE bucket_id = 'photos';
