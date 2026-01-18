-- Crear tabla de usuarios compradores
CREATE TABLE IF NOT EXISTS usuarios_compradores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  correo VARCHAR(255) NOT NULL UNIQUE,
  direccion TEXT,
  proyecto_id UUID REFERENCES proyectos(id) ON DELETE SET NULL,
  monto_invertido DECIMAL(15, 2) DEFAULT 0,
  fecha_inversion TIMESTAMP WITH TIME ZONE,
  estado VARCHAR(50) DEFAULT 'pendiente', -- pendiente, confirmado, completado, cancelado
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas por correo
CREATE INDEX IF NOT EXISTS idx_usuarios_compradores_correo ON usuarios_compradores(correo);

-- Crear índice para búsquedas por proyecto
CREATE INDEX IF NOT EXISTS idx_usuarios_compradores_proyecto ON usuarios_compradores(proyecto_id);

-- Crear índice para búsquedas por estado
CREATE INDEX IF NOT EXISTS idx_usuarios_compradores_estado ON usuarios_compradores(estado);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_usuarios_compradores_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_usuarios_compradores_updated_at
  BEFORE UPDATE ON usuarios_compradores
  FOR EACH ROW
  EXECUTE FUNCTION update_usuarios_compradores_updated_at();

-- Habilitar Row Level Security (RLS)
ALTER TABLE usuarios_compradores ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "Permitir lectura pública de usuarios_compradores"
  ON usuarios_compradores FOR SELECT
  USING (true);

-- Política para permitir inserción
CREATE POLICY "Permitir inserción de usuarios_compradores"
  ON usuarios_compradores FOR INSERT
  WITH CHECK (true);

-- Política para permitir actualización
CREATE POLICY "Permitir actualización de usuarios_compradores"
  ON usuarios_compradores FOR UPDATE
  USING (true);

-- Política para permitir eliminación
CREATE POLICY "Permitir eliminación de usuarios_compradores"
  ON usuarios_compradores FOR DELETE
  USING (true);
