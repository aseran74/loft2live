-- Añadir campos a solicitudes_informacion
alter table public.solicitudes_informacion
  add column if not exists telefono varchar(50),
  add column if not exists fecha_hora_llamada timestamptz,
  add column if not exists tipo_consulta varchar(100);
