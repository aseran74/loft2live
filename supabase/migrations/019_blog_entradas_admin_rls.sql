-- RPCs para que admins (vía users.firebase_uid) puedan gestionar blog_entradas.
-- Requiere que exista la función check_user_is_admin(p_firebase_uid TEXT) (migración 009 o similar).

CREATE OR REPLACE FUNCTION insert_blog_entrada(
  p_firebase_uid TEXT,
  p_titulo TEXT,
  p_resumen TEXT,
  p_fuente_url TEXT DEFAULT NULL,
  p_orden INTEGER DEFAULT 0
)
RETURNS blog_entradas AS $$
DECLARE
  v_entrada blog_entradas;
BEGIN
  IF NOT check_user_is_admin(p_firebase_uid) THEN
    RAISE EXCEPTION 'Solo los administradores pueden crear noticias';
  END IF;
  INSERT INTO blog_entradas (titulo, resumen, fuente_url, orden)
  VALUES (p_titulo, p_resumen, p_fuente_url, COALESCE(p_orden, 0))
  RETURNING * INTO v_entrada;
  RETURN v_entrada;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_blog_entrada(
  p_firebase_uid TEXT,
  p_id UUID,
  p_titulo TEXT DEFAULT NULL,
  p_resumen TEXT DEFAULT NULL,
  p_fuente_url TEXT DEFAULT NULL,
  p_orden INTEGER DEFAULT NULL
)
RETURNS blog_entradas AS $$
DECLARE
  v_entrada blog_entradas;
BEGIN
  IF NOT check_user_is_admin(p_firebase_uid) THEN
    RAISE EXCEPTION 'Solo los administradores pueden editar noticias';
  END IF;
  UPDATE blog_entradas
  SET
    titulo = COALESCE(p_titulo, titulo),
    resumen = COALESCE(p_resumen, resumen),
    fuente_url = COALESCE(p_fuente_url, fuente_url),
    orden = COALESCE(p_orden, orden),
    updated_at = NOW()
  WHERE id = p_id
  RETURNING * INTO v_entrada;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Entrada no encontrada';
  END IF;
  RETURN v_entrada;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION delete_blog_entrada(
  p_firebase_uid TEXT,
  p_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  IF NOT check_user_is_admin(p_firebase_uid) THEN
    RAISE EXCEPTION 'Solo los administradores pueden eliminar noticias';
  END IF;
  DELETE FROM blog_entradas WHERE id = p_id;
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
