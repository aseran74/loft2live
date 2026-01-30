-- Campo Características (texto)
ALTER TABLE proyectos
ADD COLUMN IF NOT EXISTS caracteristicas TEXT DEFAULT '';

-- Fotos oficina actual y oficina remodelada (arrays de rutas)
ALTER TABLE proyectos
ADD COLUMN IF NOT EXISTS fotos_oficina_actual TEXT[] DEFAULT '{}';

ALTER TABLE proyectos
ADD COLUMN IF NOT EXISTS fotos_oficina_remodelada TEXT[] DEFAULT '{}';
