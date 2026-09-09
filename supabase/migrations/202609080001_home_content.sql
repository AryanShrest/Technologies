create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 2 and 80),
  subtitle text not null default '' check (char_length(subtitle) <= 120),
  alt_text text not null check (char_length(alt_text) between 5 and 180),
  image_url text not null,
  storage_path text,
  position integer not null default 0 check (position >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  logo_url text not null,
  storage_path text,
  website_url text,
  position integer not null default 0 check (position >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists hero_slides_active_position_idx on public.hero_slides(active, position);
create index if not exists partners_active_position_idx on public.partners(active, position);

create or replace function public.enforce_four_active_hero_slides()
returns trigger
language plpgsql
as $$
begin
  if new.active and (
    select count(*) from public.hero_slides
    where active and id <> new.id
  ) >= 4 then
    raise exception 'Only four hero slides can be active';
  end if;
  return new;
end;
$$;

drop trigger if exists hero_slides_active_limit on public.hero_slides;
create trigger hero_slides_active_limit
before insert or update of active on public.hero_slides
for each row execute function public.enforce_four_active_hero_slides();

alter table public.admin_profiles enable row level security;
alter table public.hero_slides enable row level security;
alter table public.partners enable row level security;

create policy "Admins can read their profile"
on public.admin_profiles for select to authenticated
using (user_id = auth.uid());

create policy "Anyone can read active hero slides"
on public.hero_slides for select to anon, authenticated
using (active = true);

create policy "Anyone can read active partners"
on public.partners for select to anon, authenticated
using (active = true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into public.hero_slides (title, subtitle, alt_text, image_url, position)
select * from (values
  ('Strategic Planning', 'Kathmandu, Nepal', 'Strategic planning meeting', '/images/images/financial-planing-meeting.webp', 0),
  ('Our Team at Work', 'CoreCraft HQ', 'CoreCraft team collaborating at work', '/images/images/pexels-photo-6424588.avif', 1),
  ('Collaborative Development', 'Building the future', 'Team collaborating around a table', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', 2),
  ('Creative Solutions', 'Design & Innovation', 'Creative team developing digital solutions', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', 3)
) as seed(title, subtitle, alt_text, image_url, position)
where not exists (select 1 from public.hero_slides);

insert into public.partners (name, logo_url, position)
select * from (values
  ('Zyra Cosmic', '/images/clients/Zyra cosmic.png', 0),
  ('Nepali Pasal', '/images/clients/nepali pasal.png', 1),
  ('B&C Consultancy', '/images/clients/b and c consultancy .png', 2),
  ('CDHR Nepal', '/images/clients/CDHR Nepal.png', 3),
  ('Sanyukta Mutu', '/images/clients/sanyukta mutu .png', 4),
  ('Zymo Wine', '/images/clients/Zymo wine .png', 5)
) as seed(name, logo_url, position)
where not exists (select 1 from public.partners);

-- After creating the first user in Supabase Auth, grant admin access explicitly:
-- insert into public.admin_profiles (user_id) values ('AUTH-USER-UUID');
