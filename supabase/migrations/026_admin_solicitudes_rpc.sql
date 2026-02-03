-- RPC para que el admin vea todas las solicitudes de información
create or replace function public.get_admin_solicitudes()
returns table (
  id uuid,
  user_email varchar,
  user_name varchar,
  proyecto_id uuid,
  nombre_proyecto varchar,
  mensaje text,
  telefono varchar,
  fecha_hora_llamada timestamptz,
  tipo_consulta varchar,
  estado varchar,
  created_at timestamptz
)
language sql security definer set search_path = public
as $$
  select s.id, u.email, u.name, s.proyecto_id, p.nombre_proyecto, s.mensaje,
    s.telefono, s.fecha_hora_llamada, s.tipo_consulta, s.estado, s.created_at
  from solicitudes_informacion s
  join users u on u.id = s.user_id
  left join proyectos p on p.id = s.proyecto_id
  order by s.created_at desc;
$$;

grant execute on function public.get_admin_solicitudes() to anon, authenticated;
