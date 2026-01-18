-- Políticas de Storage para el bucket 'photos'

-- Nota: Estas políticas se aplican al bucket 'photos' en Supabase Storage
-- Asegúrate de que el bucket existe y está configurado correctamente

-- Política: Usuarios autenticados pueden leer fotos
CREATE POLICY "Authenticated users can read photos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'photos' AND
  EXISTS (
    SELECT 1 FROM users
    WHERE firebase_uid = auth.uid()::text
    AND is_active = true
  )
);

-- Política: Solo admins pueden subir fotos
CREATE POLICY "Admins can upload photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'photos' AND
  EXISTS (
    SELECT 1 FROM users
    WHERE firebase_uid = auth.uid()::text
    AND role = 'admin'
    AND is_active = true
  )
);

-- Política: Solo admins pueden actualizar fotos
CREATE POLICY "Admins can update photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'photos' AND
  EXISTS (
    SELECT 1 FROM users
    WHERE firebase_uid = auth.uid()::text
    AND role = 'admin'
    AND is_active = true
  )
);

-- Política: Solo admins pueden eliminar fotos
CREATE POLICY "Admins can delete photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'photos' AND
  EXISTS (
    SELECT 1 FROM users
    WHERE firebase_uid = auth.uid()::text
    AND role = 'admin'
    AND is_active = true
  )
);
