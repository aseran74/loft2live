-- Respuesta del admin en solicitudes
alter table public.solicitudes_informacion
  add column if not exists respuesta_admin text;

-- Tabla mensajes (admin -> usuarios/compradores/perfiles)
create table if not exists public.mensajes (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid not null references public.users(id) on delete cascade,
  to_user_id uuid references public.users(id) on delete cascade,
  to_comprador_id uuid references public.usuarios_compradores(id) on delete cascade,
  to_perfil_id uuid references public.usuarios_profile(id) on delete cascade,
  solicitud_id uuid references public.solicitudes_informacion(id) on delete set null,
  contenido text not null,
  leido boolean default false,
  created_at timestamptz default now(),
  check (
    (to_user_id is not null)::int + (to_comprador_id is not null)::int + (to_perfil_id is not null)::int = 1
  )
);
create index if not exists idx_mensajes_to_user on public.mensajes(to_user_id);
create index if not exists idx_mensajes_to_comprador on public.mensajes(to_comprador_id);
create index if not exists idx_mensajes_solicitud on public.mensajes(solicitud_id);
