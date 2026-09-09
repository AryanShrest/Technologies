create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  inquiry_type text not null,
  budget text,
  message text not null check (char_length(message) between 20 and 4000),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'closed')),
  internal_notes text not null default '' check (char_length(internal_notes) <= 4000),
  delivery_status text not null default 'pending' check (delivery_status in ('pending', 'sent', 'failed', 'not_configured')),
  delivery_error text,
  source text not null default 'website',
  client_fingerprint text,
  assigned_to uuid references auth.users(id) on delete set null,
  last_contacted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);
create index if not exists contact_inquiries_status_idx
  on public.contact_inquiries (status, created_at desc);

alter table public.contact_inquiries enable row level security;

-- Inquiries are written and managed only by trusted server routes. The public
-- browser and ordinary authenticated users receive no direct table access.
revoke all on table public.contact_inquiries from anon, authenticated;
grant all on table public.contact_inquiries to service_role;

comment on table public.contact_inquiries is
  'Durable website leads managed from the protected CoreCraft admin inbox.';
