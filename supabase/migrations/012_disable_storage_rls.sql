-- Deshabilitar RLS en el bucket 'photos' para permitir subida de archivos
-- Esta es una solución temporal para desarrollo
-- Para producción, considera usar Edge Functions

-- Nota: No se puede deshabilitar RLS directamente en Storage mediante SQL
-- Debes hacerlo manualmente desde el Dashboard de Supabase:
-- 1. Ve a Storage > Buckets
-- 2. Selecciona el bucket 'photos'
-- 3. Ve a Settings
-- 4. Desactiva "Row Level Security"

-- Alternativamente, podemos eliminar todas las políticas para que funcione sin RLS
-- (esto efectivamente deshabilita RLS si no hay políticas)

-- Eliminar todas las políticas existentes
DROP POLICY IF EXISTS "Public read access to photos bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow insert to photos bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow update to photos bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete from photos bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete photos" ON storage.objects;

-- Crear políticas muy permisivas (efectivamente sin restricciones)
-- Esto permite acceso completo al bucket 'photos'
-- IMPORTANTE: Estas políticas solo funcionan si el usuario está autenticado en Supabase Auth
-- Como estamos usando Firebase Auth, necesitamos deshabilitar RLS manualmente

-- Política para lectura (pública)
CREATE POLICY "Allow public read photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos');

-- Política para inserción (sin restricciones)
-- NOTA: Esto solo funcionará si RLS está deshabilitado o si el usuario está autenticado en Supabase
CREATE POLICY "Allow public insert photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'photos');

-- Política para actualización
CREATE POLICY "Allow public update photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'photos')
WITH CHECK (bucket_id = 'photos');

-- Política para eliminación
CREATE POLICY "Allow public delete photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'photos');

-- INSTRUCCIONES IMPORTANTES:
-- Como estas políticas requieren Supabase Auth y estamos usando Firebase Auth,
-- DEBES deshabilitar RLS manualmente en el bucket:
-- 
-- 1. Ve a Supabase Dashboard > Storage > Buckets
-- 2. Selecciona el bucket 'photos' (o créalo si no existe)
-- 3. Ve a Settings
-- 4. DESACTIVA "Row Level Security" (toggle off)
-- 5. Guarda los cambios
--
-- Alternativamente, marca el bucket como "Public bucket" en Settings
