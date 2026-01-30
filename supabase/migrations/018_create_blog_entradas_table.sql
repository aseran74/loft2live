-- Tabla de entradas del blog (noticias persistentes)
CREATE TABLE IF NOT EXISTS public.blog_entradas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  resumen text NOT NULL,
  fuente_url text,
  orden integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Índice para ordenar por orden y fecha
CREATE INDEX IF NOT EXISTS idx_blog_entradas_orden ON public.blog_entradas (orden, created_at DESC);

-- RLS: permitir lectura pública (anon) para listar entradas
ALTER TABLE public.blog_entradas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura pública de blog_entradas"
  ON public.blog_entradas
  FOR SELECT
  TO anon
  USING (true);
