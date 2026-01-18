-- Crear tabla de usuarios perfil
CREATE TABLE IF NOT EXISTS usuarios_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  correo VARCHAR(255) NOT NULL UNIQUE,
  direccion TEXT,
  analisis_rcp TEXT,
  esta_interesado BOOLEAN DEFAULT false,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas por correo
CREATE INDEX IF NOT EXISTS idx_usuarios_profile_correo ON usuarios_profile(correo);

-- Crear índice para búsquedas por nombre
CREATE INDEX IF NOT EXISTS idx_usuarios_profile_nombre ON usuarios_profile(nombre);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_usuarios_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_usuarios_profile_updated_at
  BEFORE UPDATE ON usuarios_profile
  FOR EACH ROW
  EXECUTE FUNCTION update_usuarios_profile_updated_at();

-- Habilitar Row Level Security (RLS)
ALTER TABLE usuarios_profile ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "Permitir lectura pública de usuarios_profile"
  ON usuarios_profile FOR SELECT
  USING (true);

-- Política para permitir inserción
CREATE POLICY "Permitir inserción de usuarios_profile"
  ON usuarios_profile FOR INSERT
  WITH CHECK (true);

-- Política para permitir actualización
CREATE POLICY "Permitir actualización de usuarios_profile"
  ON usuarios_profile FOR UPDATE
  USING (true);

-- Política para permitir eliminación
CREATE POLICY "Permitir eliminación de usuarios_profile"
  ON usuarios_profile FOR DELETE
  USING (true);
