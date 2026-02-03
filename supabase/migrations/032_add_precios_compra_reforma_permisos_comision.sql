-- Precios del proyecto: compra, reforma, permisos, comisión 2%, total y tickets de 5000€
alter table public.proyectos
  add column if not exists precio_compra numeric(15, 2);
alter table public.proyectos
  add column if not exists precio_reforma numeric(15, 2);
alter table public.proyectos
  add column if not exists precio_permisos numeric(15, 2);
alter table public.proyectos
  add column if not exists comision_porcentaje numeric(5, 2) default 2;

comment on column public.proyectos.precio_compra is 'Precio de compra del proyecto (EUR)';
comment on column public.proyectos.precio_reforma is 'Precio de reforma (EUR)';
comment on column public.proyectos.precio_permisos is 'Coste de permisos (EUR)';
comment on column public.proyectos.comision_porcentaje is 'Porcentaje de comisión (ej: 2). Total = (compra+reforma+permisos) * (1 + comision/100)';

-- Incluir en RPC pública de detalle (para mostrar en ficha si se desea)
drop function if exists public.public_proyecto_by_id(uuid);
create or replace function public.public_proyecto_by_id(p_id uuid)
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
  vendido_cerrado boolean,
  caracteristicas text,
  fotos text[],
  fotos_oficina_actual text[],
  fotos_oficina_remodelada text[],
  videos text[],
  street_view_embed text,
  comodidades text[],
  unidades_tipos jsonb,
  precio_compra numeric,
  precio_reforma numeric,
  precio_permisos numeric,
  comision_porcentaje numeric,
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
    coalesce(p.vendido_cerrado, false),
    p.caracteristicas, p.fotos, p.fotos_oficina_actual, p.fotos_oficina_remodelada,
    coalesce(p.videos, '{}'), p.street_view_embed,
    p.comodidades, p.unidades_tipos,
    p.precio_compra, p.precio_reforma, p.precio_permisos, coalesce(p.comision_porcentaje, 2),
    p.created_at, p.updated_at
  from public.proyectos p
  where p.id = p_id
  limit 1;
$$;
grant execute on function public.public_proyecto_by_id(uuid) to anon, authenticated;
