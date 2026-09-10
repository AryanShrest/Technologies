create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 2 and 100),
  description text not null check (char_length(description) between 10 and 600),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  position integer not null default 0 check (position >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  description text not null check (char_length(description) between 10 and 600),
  goal text not null check (goal in ('launch', 'grow', 'transform')),
  timeline text not null check (char_length(timeline) between 2 and 100),
  price_label text not null default 'Custom proposal' check (char_length(price_label) between 2 and 100),
  features text[] not null default '{}',
  position integer not null default 0 check (position >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists services_active_position_idx on public.services(active, position);
create index if not exists pricing_plans_active_position_idx on public.pricing_plans(active, position);

alter table public.services enable row level security;
alter table public.pricing_plans enable row level security;

create policy "Anyone can read active services" on public.services
  for select to anon, authenticated using (active = true);
create policy "Anyone can read active pricing plans" on public.pricing_plans
  for select to anon, authenticated using (active = true);

insert into public.services (title, description, slug, position)
select * from (values
  ('Website Development', 'Modern, responsive websites designed around your business goals and customers.', 'website-development', 0),
  ('Digital Marketing', 'SEO, social media, and advertising strategies that turn attention into measurable growth.', 'digital-marketing', 1),
  ('UI/UX & Graphic Design', 'Clear user experiences and distinctive visual systems that strengthen your brand.', 'ui-ux-graphic-design', 2),
  ('Mobile App Development', 'Reliable Android and iOS applications built for real users and long-term growth.', 'mobile-app-development', 3),
  ('Software Development', 'Secure, scalable custom software that removes friction from business operations.', 'software-development', 4),
  ('Cloud & Hosting Services', 'Managed cloud infrastructure, hosting, domains, and dependable production support.', 'cloud-hosting-services', 5)
) as seed(title, description, slug, position)
where not exists (select 1 from public.services);

insert into public.pricing_plans (name, description, goal, timeline, price_label, features, position)
select * from (values
  ('Launch Sprint', 'For a focused website, campaign, prototype, or first digital product.', 'launch', 'Focused delivery', 'Custom proposal', array['Discovery workshop','Focused scope and roadmap','Design and development','Launch readiness review'], 0),
  ('Growth Partnership', 'For businesses ready to strengthen an existing platform and accelerate growth.', 'grow', 'Ongoing collaboration', 'Custom proposal', array['Experience and technical audit','Prioritized growth roadmap','Iterative product delivery','Measurement and optimization'], 1),
  ('Digital Transformation', 'For custom software, connected workflows, and complex digital transformation.', 'transform', 'Phased program', 'Custom proposal', array['Stakeholder discovery','Solution architecture','Phased implementation','Enablement and long-term support'], 2)
) as seed(name, description, goal, timeline, price_label, features, position)
where not exists (select 1 from public.pricing_plans);

grant select on public.services, public.pricing_plans to anon, authenticated;
grant all on public.services, public.pricing_plans to service_role;
