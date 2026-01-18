-- Crear tabla de usuarios para sincronizar con Firebase
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  photo_url TEXT,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_users_updated_at_trigger
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_users_updated_at();

-- Habilitar Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública (temporal, para que funcione con Firebase)
-- En producción, esto debería ser más restrictivo
CREATE POLICY "Allow public read users"
  ON users FOR SELECT
  USING (true);

-- Política: Permitir inserción pública (para que funcione desde el cliente)
-- En producción, esto debería ser más restrictivo
CREATE POLICY "Allow public insert to users"
  ON users FOR INSERT
  WITH CHECK (true);

-- Política: Permitir actualización pública (temporal, para que funcione con Firebase)
-- En producción, esto debería verificar el firebase_uid
CREATE POLICY "Allow public update users"
  ON users FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Función helper para verificar si un usuario es admin
CREATE OR REPLACE FUNCTION is_admin(firebase_uid_param TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE users.firebase_uid = firebase_uid_param
    AND users.role = 'admin'
    AND users.is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener el usuario actual desde Firebase UID
CREATE OR REPLACE FUNCTION get_current_user()
RETURNS users AS $$
DECLARE
  current_user users;
BEGIN
  SELECT * INTO current_user
  FROM users
  WHERE firebase_uid = auth.uid()::text
  AND is_active = true;
  
  RETURN current_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
