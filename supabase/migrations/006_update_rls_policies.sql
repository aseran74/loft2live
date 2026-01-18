-- Actualizar políticas RLS para proyectos (requerir autenticación)

-- Eliminar políticas públicas existentes
DROP POLICY IF EXISTS "Permitir lectura pública de proyectos" ON proyectos;
DROP POLICY IF EXISTS "Permitir inserción de proyectos" ON proyectos;
DROP POLICY IF EXISTS "Permitir actualización de proyectos" ON proyectos;
DROP POLICY IF EXISTS "Permitir eliminación de proyectos" ON proyectos;

-- Nueva política: Todos los usuarios autenticados pueden leer proyectos
CREATE POLICY "Authenticated users can read proyectos"
  ON proyectos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE firebase_uid = auth.uid()::text
      AND is_active = true
    )
  );

-- Nueva política: Solo admins pueden crear proyectos
CREATE POLICY "Admins can create proyectos"
  ON proyectos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE firebase_uid = auth.uid()::text
      AND role = 'admin'
      AND is_active = true
    )
  );

-- Nueva política: Solo admins pueden actualizar proyectos
CREATE POLICY "Admins can update proyectos"
  ON proyectos FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE firebase_uid = auth.uid()::text
      AND role = 'admin'
      AND is_active = true
    )
  );

-- Nueva política: Solo admins pueden eliminar proyectos
CREATE POLICY "Admins can delete proyectos"
  ON proyectos FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE firebase_uid = auth.uid()::text
      AND role = 'admin'
      AND is_active = true
    )
  );

-- Actualizar políticas para usuarios_profile
DROP POLICY IF EXISTS "Permitir lectura pública de usuarios_profile" ON usuarios_profile;
DROP POLICY IF EXISTS "Permitir inserción de usuarios_profile" ON usuarios_profile;
DROP POLICY IF EXISTS "Permitir actualización de usuarios_profile" ON usuarios_profile;
DROP POLICY IF EXISTS "Permitir eliminación de usuarios_profile" ON usuarios_profile;

-- Usuarios autenticados pueden leer perfiles
CREATE POLICY "Authenticated users can read usuarios_profile"
  ON usuarios_profile FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE firebase_uid = auth.uid()::text
      AND is_active = true
    )
  );

-- Solo admins pueden crear/actualizar/eliminar perfiles
CREATE POLICY "Admins can manage usuarios_profile"
  ON usuarios_profile FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE firebase_uid = auth.uid()::text
      AND role = 'admin'
      AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE firebase_uid = auth.uid()::text
      AND role = 'admin'
      AND is_active = true
    )
  );
