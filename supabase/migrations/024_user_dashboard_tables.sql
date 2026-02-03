-- Dashboard usuario: favoritos, solicitudes de información, user_id en compradores

create table if not exists public.user_favoritos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  proyecto_id uuid not null references public.proyectos(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, proyecto_id)
);
create index if not exists idx_user_favoritos_user on public.user_favoritos(user_id);
create index if not exists idx_user_favoritos_proyecto on public.user_favoritos(proyecto_id);

create table if not exists public.solicitudes_informacion (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  proyecto_id uuid references public.proyectos(id) on delete set null,
  mensaje text not null,
  estado varchar(50) default 'pendiente' check (estado in ('pendiente', 'respondida')),
  created_at timestamptz default now()
);
create index if not exists idx_solicitudes_user on public.solicitudes_informacion(user_id);

alter table public.usuarios_compradores
  add column if not exists user_id uuid references public.users(id) on delete set null;
create index if not exists idx_usuarios_compradores_user on public.usuarios_compradores(user_id);
