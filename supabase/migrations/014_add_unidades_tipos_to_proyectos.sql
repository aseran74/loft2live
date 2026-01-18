-- Añadir tipos de unidad (hasta 4) con datos y planos
-- Estructura esperada (JSONB):
-- [
--   { "nombre": "Tipo 1", "precio": 166666, "m2": 55, "planos": ["<storage-path>", ...] },
--   ...
-- ]
ALTER TABLE proyectos
ADD COLUMN IF NOT EXISTS unidades_tipos JSONB DEFAULT '[]'::jsonb;

-- Índice opcional para consultas por contenido JSON
CREATE INDEX IF NOT EXISTS idx_proyectos_unidades_tipos ON proyectos USING GIN (unidades_tipos);

