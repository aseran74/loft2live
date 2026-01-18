-- Crear tabla de proyectos
CREATE TABLE IF NOT EXISTS proyectos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_proyecto VARCHAR(255) NOT NULL,
  objetivo_inversion_total DECIMAL(15, 2) NOT NULL,
  localizacion VARCHAR(255) NOT NULL,
  permisos TEXT,
  num_lofts INTEGER NOT NULL,
  precio_unidad DECIMAL(15, 2) NOT NULL,
  gasto_estimado_comunidad DECIMAL(15, 2),
  tipo_inversion VARCHAR(50) NOT NULL DEFAULT 'Quarterly Bullet',
  porcentaje_llegado DECIMAL(5, 2) DEFAULT 0,
  min_termino_meses INTEGER DEFAULT 24,
  monto_restante DECIMAL(15, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas por nombre
CREATE INDEX IF NOT EXISTS idx_proyectos_nombre ON proyectos(nombre_proyecto);

-- Crear índice para búsquedas por localización
CREATE INDEX IF NOT EXISTS idx_proyectos_localizacion ON proyectos(localizacion);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_proyectos_updated_at
  BEFORE UPDATE ON proyectos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (ajustar según necesidades)
CREATE POLICY "Permitir lectura pública de proyectos"
  ON proyectos FOR SELECT
  USING (true);

-- Política para permitir inserción (ajustar según necesidades de autenticación)
CREATE POLICY "Permitir inserción de proyectos"
  ON proyectos FOR INSERT
  WITH CHECK (true);

-- Política para permitir actualización (ajustar según necesidades de autenticación)
CREATE POLICY "Permitir actualización de proyectos"
  ON proyectos FOR UPDATE
  USING (true);

-- Política para permitir eliminación (ajustar según necesidades de autenticación)
CREATE POLICY "Permitir eliminación de proyectos"
  ON proyectos FOR DELETE
  USING (true);
