-- Funciones públicas para leer proyectos (sin abrir SELECT público en tablas con RLS)
-- Uso desde frontend: supabase.rpc('public_proyectos_list') / supabase.rpc('public_proyecto_by_id', { p_id })
-- Actualizado para incluir mostrar_en_landing y filtrar por él en la lista

drop function if exists public.public_proyectos_list();
drop function if exists public.public_proyecto_by_id(uuid);

create or replace function public.public_proyectos_list()
returns table (
  id uuid,
  nombre_proyecto varchar,
  objetivo_inversion_total numeric,
  localizacion varchar,
  num_lofts int,
  precio_unidad numeric,
  tipo_inversion varchar,
  porcentaje_llegado numeric,
  monto_restante numeric,
  alquiler boolean,
  precio_alquiler_mes numeric,
  mostrar_en_landing boolean,
  fotos text[],
  comodidades text[],
  unidades_tipos jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    p.id,
    p.nombre_proyecto,
    p.objetivo_inversion_total,
    p.localizacion,
    p.num_lofts,
    p.precio_unidad,
    p.tipo_inversion,
    p.porcentaje_llegado,
    p.monto_restante,
    p.alquiler,
    p.precio_alquiler_mes,
    p.mostrar_en_landing,
    p.fotos,
    p.comodidades,
    p.unidades_tipos,
    p.created_at,
    p.updated_at
  from public.proyectos p
  where p.mostrar_en_landing = true
  order by p.created_at desc;
$$;

create or replace function public.public_proyecto_by_id(p_id uuid)
returns table (
  id uuid,
  nombre_proyecto varchar,
  objetivo_inversion_total numeric,
  localizacion varchar,
  num_lofts int,
  precio_unidad numeric,
  tipo_inversion varchar,
  porcentaje_llegado numeric,
  monto_restante numeric,
  alquiler boolean,
  precio_alquiler_mes numeric,
  mostrar_en_landing boolean,
  fotos text[],
  comodidades text[],
  unidades_tipos jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    p.id,
    p.nombre_proyecto,
    p.objetivo_inversion_total,
    p.localizacion,
    p.num_lofts,
    p.precio_unidad,
    p.tipo_inversion,
    p.porcentaje_llegado,
    p.monto_restante,
    p.alquiler,
    p.precio_alquiler_mes,
    p.mostrar_en_landing,
    p.fotos,
    p.comodidades,
    p.unidades_tipos,
    p.created_at,
    p.updated_at
  from public.proyectos p
  where p.id = p_id
  limit 1;
$$;

grant execute on function public.public_proyectos_list() to anon, authenticated;
grant execute on function public.public_proyecto_by_id(uuid) to anon, authenticated;

