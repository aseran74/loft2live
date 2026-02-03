-- Campo para marcar proyectos vendidos y cerrados
alter table public.proyectos
  add column if not exists vendido_cerrado boolean default false;

comment on column public.proyectos.vendido_cerrado is 'Si true, el proyecto está vendido/cerrado y aparece en Rentabilidades';

-- Inversiones: solo proyectos activos (no vendidos)
drop function if exists public.public_proyectos_list();
create or replace function public.public_proyectos_list()
returns table (
  id uuid,
  nombre_proyecto varchar,
  objetivo_inversion_total numeric,
  localizacion varchar,
  num_lofts int,
  precio_unidad numeric,
  precio_ticket numeric,
  tipo_inversion varchar,
  porcentaje_llegado numeric,
  monto_restante numeric,
  alquiler boolean,
  precio_alquiler_mes numeric,
  mostrar_en_landing boolean,
  consulta_vinculante_urbanistica boolean,
  caracteristicas text,
  fotos text[],
  fotos_oficina_actual text[],
  fotos_oficina_remodelada text[],
  videos text[],
  street_view_embed text,
  comodidades text[],
  unidades_tipos jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
language sql security definer set search_path = public
as $$
  select
    p.id, p.nombre_proyecto, p.objetivo_inversion_total, p.localizacion,
    p.num_lofts, p.precio_unidad, coalesce(p.precio_ticket, 5000),
    p.tipo_inversion, p.porcentaje_llegado, p.monto_restante, p.alquiler, p.precio_alquiler_mes,
    p.mostrar_en_landing, coalesce(p.consulta_vinculante_urbanistica, false),
    p.caracteristicas, p.fotos, p.fotos_oficina_actual, p.fotos_oficina_remodelada,
    coalesce(p.videos, '{}'), p.street_view_embed,
    p.comodidades, p.unidades_tipos, p.created_at, p.updated_at
  from public.proyectos p
  where p.mostrar_en_landing = true
    and coalesce(p.vendido_cerrado, false) = false
  order by p.created_at desc;
$$;

-- Rentabilidades: solo proyectos vendidos y cerrados
create or replace function public.public_rentabilidades_list()
returns table (
  id uuid,
  nombre_proyecto varchar,
  objetivo_inversion_total numeric,
  localizacion varchar,
  num_lofts int,
  precio_unidad numeric,
  precio_ticket numeric,
  tipo_inversion varchar,
  porcentaje_llegado numeric,
  monto_restante numeric,
  alquiler boolean,
  precio_alquiler_mes numeric,
  mostrar_en_landing boolean,
  consulta_vinculante_urbanistica boolean,
  caracteristicas text,
  fotos text[],
  fotos_oficina_actual text[],
  fotos_oficina_remodelada text[],
  videos text[],
  street_view_embed text,
  comodidades text[],
  unidades_tipos jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
language sql security definer set search_path = public
as $$
  select
    p.id, p.nombre_proyecto, p.objetivo_inversion_total, p.localizacion,
    p.num_lofts, p.precio_unidad, coalesce(p.precio_ticket, 5000),
    p.tipo_inversion, p.porcentaje_llegado, p.monto_restante, p.alquiler, p.precio_alquiler_mes,
    p.mostrar_en_landing, coalesce(p.consulta_vinculante_urbanistica, false),
    p.caracteristicas, p.fotos, p.fotos_oficina_actual, p.fotos_oficina_remodelada,
    coalesce(p.videos, '{}'), p.street_view_embed,
    p.comodidades, p.unidades_tipos, p.created_at, p.updated_at
  from public.proyectos p
  where coalesce(p.vendido_cerrado, false) = true
  order by p.updated_at desc nulls last, p.created_at desc;
$$;

grant execute on function public.public_proyectos_list() to anon, authenticated;
grant execute on function public.public_rentabilidades_list() to anon, authenticated;
