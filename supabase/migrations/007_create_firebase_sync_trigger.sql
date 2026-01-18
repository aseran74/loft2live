-- Función para sincronizar usuarios de Firebase con Supabase
-- Esta función se llamará desde un webhook o Edge Function cuando un usuario se registre en Firebase

CREATE OR REPLACE FUNCTION sync_firebase_user(
  p_firebase_uid TEXT,
  p_email TEXT,
  p_name TEXT DEFAULT NULL,
  p_photo_url TEXT DEFAULT NULL,
  p_role TEXT DEFAULT 'user'
)
RETURNS users AS $$
DECLARE
  v_user users;
BEGIN
  -- Insertar o actualizar usuario
  INSERT INTO users (firebase_uid, email, name, photo_url, role, is_active)
  VALUES (p_firebase_uid, p_email, p_name, p_photo_url, p_role, true)
  ON CONFLICT (firebase_uid)
  DO UPDATE SET
    email = EXCLUDED.email,
    name = COALESCE(EXCLUDED.name, users.name),
    photo_url = COALESCE(EXCLUDED.photo_url, users.photo_url),
    updated_at = NOW()
  WHERE users.firebase_uid = p_firebase_uid;
  
  -- Retornar el usuario
  SELECT * INTO v_user
  FROM users
  WHERE firebase_uid = p_firebase_uid;
  
  RETURN v_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para crear usuario admin inicial
-- Esta función debe ejecutarse manualmente para crear el primer admin
CREATE OR REPLACE FUNCTION create_admin_user(
  p_firebase_uid TEXT,
  p_email TEXT,
  p_name TEXT DEFAULT NULL,
  p_photo_url TEXT DEFAULT NULL
)
RETURNS users AS $$
DECLARE
  v_user users;
BEGIN
  INSERT INTO users (firebase_uid, email, name, photo_url, role, is_active)
  VALUES (p_firebase_uid, p_email, p_name, p_photo_url, 'admin', true)
  ON CONFLICT (firebase_uid)
  DO UPDATE SET
    role = 'admin',
    email = EXCLUDED.email,
    name = COALESCE(EXCLUDED.name, users.name),
    photo_url = COALESCE(EXCLUDED.photo_url, users.photo_url),
    updated_at = NOW()
  WHERE users.firebase_uid = p_firebase_uid;
  
  SELECT * INTO v_user
  FROM users
  WHERE firebase_uid = p_firebase_uid;
  
  RETURN v_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comentarios
COMMENT ON FUNCTION sync_firebase_user IS 'Sincroniza un usuario de Firebase con la tabla users. Se debe llamar desde un webhook o Edge Function cuando un usuario se registra en Firebase.';
COMMENT ON FUNCTION create_admin_user IS 'Crea o actualiza un usuario como admin. Ejecutar manualmente para crear el primer administrador.';
