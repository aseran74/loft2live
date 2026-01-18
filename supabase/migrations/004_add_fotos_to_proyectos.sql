-- Agregar columna de fotos a la tabla proyectos
ALTER TABLE proyectos 
ADD COLUMN IF NOT EXISTS fotos TEXT[] DEFAULT '{}';

-- Crear índice para búsquedas por fotos (opcional)
CREATE INDEX IF NOT EXISTS idx_proyectos_fotos ON proyectos USING GIN (fotos);
