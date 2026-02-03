-- RPCs para que el admin gestione usuarios (tabla users)

create or replace function public.get_admin_users()
returns table (
  id uuid,
  firebase_uid varchar,
  email varchar,
  name varchar,
  photo_url text,
  role varchar,
  is_active boolean,
  created_at timestamptz
)
language sql security definer set search_path = public
as $$
  select u.id, u.firebase_uid, u.email, u.name, u.photo_url, u.role, u.is_active, u.created_at
  from users u
  order by u.created_at desc;
$$;

create or replace function public.update_user_admin(
  p_user_id uuid,
  p_name varchar default null,
  p_role varchar default null,
  p_is_active boolean default null
)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  update users
  set
    name = coalesce(nullif(trim(p_name), ''), name),
    role = case when p_role is not null then p_role else role end,
    is_active = coalesce(p_is_active, is_active),
    updated_at = now()
  where id = p_user_id;
end;
$$;

create or replace function public.delete_user_admin(p_user_id uuid)
returns void
language plpgsql security definer set search_path = public
as $$
declare v_email varchar;
begin
  select email into v_email from users where id = p_user_id;
  if v_email = 'alvaroserr@gmail.com' then
    raise exception 'No se puede eliminar al administrador principal';
  end if;
  delete from users where id = p_user_id;
end;
$$;

create or replace function public.create_user_admin(
  p_email varchar,
  p_name varchar default null,
  p_role varchar default 'user'
)
returns uuid
language plpgsql security definer set search_path = public
as $$
declare v_id uuid; v_uid text;
begin
  if nullif(trim(p_email), '') is null then
    raise exception 'El email es obligatorio';
  end if;
  if exists (select 1 from users where lower(email) = lower(trim(p_email))) then
    raise exception 'Ya existe un usuario con ese email';
  end if;
  v_uid := 'pending_' || gen_random_uuid()::text;
  insert into users (firebase_uid, email, name, role, is_active)
  values (v_uid, trim(p_email), nullif(trim(p_name), ''),
    case when lower(trim(p_email)) = 'alvaroserr@gmail.com' then 'admin' else p_role end,
    true)
  returning id into v_id;
  return v_id;
end;
$$;

grant execute on function public.get_admin_users() to anon, authenticated;
grant execute on function public.update_user_admin(uuid, varchar, varchar, boolean) to anon, authenticated;
grant execute on function public.delete_user_admin(uuid) to anon, authenticated;
grant execute on function public.create_user_admin(varchar, varchar, varchar) to anon, authenticated;
