-- Agregar columna de comodidades/complementos a la tabla proyectos
ALTER TABLE proyectos
ADD COLUMN IF NOT EXISTS comodidades TEXT[] DEFAULT '{}';

-- Índice opcional para búsquedas / filtros por comodidades
CREATE INDEX IF NOT EXISTS idx_proyectos_comodidades ON proyectos USING GIN (comodidades);

