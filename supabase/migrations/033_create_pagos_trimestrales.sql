-- Tabla de pagos trimestrales a compradores por proyecto
create table if not exists public.pagos_trimestrales (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid not null references public.proyectos(id) on delete cascade,
  comprador_id uuid not null references public.usuarios_compradores(id) on delete cascade,
  anio int not null,
  trimestre int not null check (trimestre between 1 and 4),
  monto numeric(15, 2) not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'pagado', 'incidencia')),
  notas text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(proyecto_id, comprador_id, anio, trimestre)
);

create index idx_pagos_trimestrales_proyecto on public.pagos_trimestrales(proyecto_id);
create index idx_pagos_trimestrales_comprador on public.pagos_trimestrales(comprador_id);
create index idx_pagos_trimestrales_periodo on public.pagos_trimestrales(anio, trimestre);

comment on table public.pagos_trimestrales is 'Pagos trimestrales a compradores por proyecto. Estado: pendiente, pagado, incidencia.';
comment on column public.pagos_trimestrales.estado is 'pendiente | pagado | incidencia';

alter table public.pagos_trimestrales enable row level security;

create policy "Admin puede gestionar pagos"
  on public.pagos_trimestrales for all
  using (exists (select 1 from public.users u where u.firebase_uid = auth.jwt()->>'sub' and u.role = 'admin'))
  with check (exists (select 1 from public.users u where u.firebase_uid = auth.jwt()->>'sub' and u.role = 'admin'));
