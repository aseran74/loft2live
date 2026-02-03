-- Tipo de compra: tickets (múltiplos 5000€) o loft entero
alter table public.usuarios_compradores
  add column if not exists tipo_compra varchar default 'tickets' check (tipo_compra in ('tickets', 'loft_completo')),
  add column if not exists num_tickets int;

comment on column public.usuarios_compradores.tipo_compra is 'tickets = nº de tickets (5000€ c/u), loft_completo = loft entero en propiedad';
comment on column public.usuarios_compradores.num_tickets is 'Nº de tickets cuando tipo_compra = tickets (monto = num_tickets * 5000)';
