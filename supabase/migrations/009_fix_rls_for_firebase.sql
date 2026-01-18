-- Actualizar políticas RLS para trabajar con Firebase UID
-- Como Supabase Auth y Firebase Auth son diferentes, necesitamos usar funciones helper

-- Función para verificar autenticación usando Firebase UID
-- Esta función se llamará desde el frontend pasando el firebase_uid
CREATE OR REPLACE FUNCTION check_user_auth(p_firebase_uid TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE firebase_uid = p_firebase_uid
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para verificar si es admin usando Firebase UID
CREATE OR REPLACE FUNCTION check_user_is_admin(p_firebase_uid TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE firebase_uid = p_firebase_uid
    AND role = 'admin'
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Actualizar políticas para proyectos usando funciones helper
-- Nota: Estas políticas necesitarán ser llamadas desde funciones que reciban el firebase_uid
-- Por ahora, deshabilitamos RLS temporalmente y usamos funciones SECURITY DEFINER

-- Deshabilitar RLS temporalmente (se reactivará cuando tengamos el sistema completo)
-- ALTER TABLE proyectos DISABLE ROW LEVEL SECURITY;

-- Crear funciones wrapper que validen el firebase_uid
CREATE OR REPLACE FUNCTION get_proyectos(p_firebase_uid TEXT)
RETURNS SETOF proyectos AS $$
BEGIN
  -- Verificar que el usuario existe y está activo
  IF NOT check_user_auth(p_firebase_uid) THEN
    RAISE EXCEPTION 'Usuario no autenticado o inactivo';
  END IF;
  
  RETURN QUERY SELECT * FROM proyectos ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION create_proyecto_func(
  p_firebase_uid TEXT,
  p_nombre_proyecto VARCHAR(255),
  p_objetivo_inversion_total DECIMAL(15, 2),
  p_localizacion VARCHAR(255),
  p_permisos TEXT DEFAULT NULL,
  p_num_lofts INTEGER,
  p_precio_unidad DECIMAL(15, 2),
  p_gasto_estimado_comunidad DECIMAL(15, 2) DEFAULT NULL,
  p_tipo_inversion VARCHAR(50) DEFAULT 'Quarterly Bullet',
  p_porcentaje_llegado DECIMAL(5, 2) DEFAULT 0,
  p_min_termino_meses INTEGER DEFAULT 24,
  p_monto_restante DECIMAL(15, 2) DEFAULT NULL,
  p_fotos TEXT[] DEFAULT '{}'
)
RETURNS proyectos AS $$
DECLARE
  v_proyecto proyectos;
BEGIN
  -- Verificar que es admin
  IF NOT check_user_is_admin(p_firebase_uid) THEN
    RAISE EXCEPTION 'Solo los administradores pueden crear proyectos';
  END IF;
  
  INSERT INTO proyectos (
    nombre_proyecto, objetivo_inversion_total, localizacion, permisos,
    num_lofts, precio_unidad, gasto_estimado_comunidad, tipo_inversion,
    porcentaje_llegado, min_termino_meses, monto_restante, fotos
  ) VALUES (
    p_nombre_proyecto, p_objetivo_inversion_total, p_localizacion, p_permisos,
    p_num_lofts, p_precio_unidad, p_gasto_estimado_comunidad, p_tipo_inversion,
    p_porcentaje_llegado, p_min_termino_meses, p_monto_restante, p_fotos
  ) RETURNING * INTO v_proyecto;
  
  RETURN v_proyecto;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_proyecto_func(
  p_firebase_uid TEXT,
  p_proyecto_id UUID,
  p_updates JSONB
)
RETURNS proyectos AS $$
DECLARE
  v_proyecto proyectos;
BEGIN
  -- Verificar que es admin
  IF NOT check_user_is_admin(p_firebase_uid) THEN
    RAISE EXCEPTION 'Solo los administradores pueden actualizar proyectos';
  END IF;
  
  UPDATE proyectos
  SET
    nombre_proyecto = COALESCE((p_updates->>'nombre_proyecto')::VARCHAR(255), nombre_proyecto),
    objetivo_inversion_total = COALESCE((p_updates->>'objetivo_inversion_total')::DECIMAL(15, 2), objetivo_inversion_total),
    localizacion = COALESCE((p_updates->>'localizacion')::VARCHAR(255), localizacion),
    permisos = COALESCE((p_updates->>'permisos')::TEXT, permisos),
    num_lofts = COALESCE((p_updates->>'num_lofts')::INTEGER, num_lofts),
    precio_unidad = COALESCE((p_updates->>'precio_unidad')::DECIMAL(15, 2), precio_unidad),
    gasto_estimado_comunidad = COALESCE((p_updates->>'gasto_estimado_comunidad')::DECIMAL(15, 2), gasto_estimado_comunidad),
    tipo_inversion = COALESCE((p_updates->>'tipo_inversion')::VARCHAR(50), tipo_inversion),
    porcentaje_llegado = COALESCE((p_updates->>'porcentaje_llegado')::DECIMAL(5, 2), porcentaje_llegado),
    min_termino_meses = COALESCE((p_updates->>'min_termino_meses')::INTEGER, min_termino_meses),
    monto_restante = COALESCE((p_updates->>'monto_restante')::DECIMAL(15, 2), monto_restante),
    fotos = COALESCE((p_updates->>'fotos')::TEXT[], fotos),
    updated_at = NOW()
  WHERE id = p_proyecto_id
  RETURNING * INTO v_proyecto;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Proyecto no encontrado';
  END IF;
  
  RETURN v_proyecto;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION delete_proyecto_func(
  p_firebase_uid TEXT,
  p_proyecto_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Verificar que es admin
  IF NOT check_user_is_admin(p_firebase_uid) THEN
    RAISE EXCEPTION 'Solo los administradores pueden eliminar proyectos';
  END IF;
  
  DELETE FROM proyectos WHERE id = p_proyecto_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
