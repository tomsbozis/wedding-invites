-- Wedding Invites — datubāzes shēma
-- Palaist Supabase SQL editorā

create extension if not exists "uuid-ossp";

-- Pāri / lietotāji (izmanto papildus Supabase Auth, glabā profila datus)
create table if not exists couples (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz default now()
);

-- Ielūgumi
create table if not exists invitations (
  id uuid primary key default uuid_generate_v4(),
  couple_id uuid references couples(id) on delete cascade,
  slug text unique not null,               -- piem. "anna-janis"
  couple_names text not null,              -- piem. "Anna & Jānis"
  wedding_date date not null,
  cover_image_url text,
  theme text default 'classic',            -- šablona nosaukums
  language text default 'lv',              -- lv / ru / en
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Dienas plāna pieturas (ceremonija, foto, banketa, afterparty utt.)
create table if not exists locations (
  id uuid primary key default uuid_generate_v4(),
  invitation_id uuid references invitations(id) on delete cascade,
  title text not null,                     -- "Ceremonija"
  address text not null,                   -- pilna adrese, ko lieto kartes saitēm
  time text,                               -- "13:00" (teksta lauks, elastīgs formāts)
  description text,
  icon text default 'ti-map-pin',          -- Tabler ikonas nosaukums
  order_index int not null default 0,
  created_at timestamptz default now()
);

-- RSVP atbildes
create table if not exists rsvps (
  id uuid primary key default uuid_generate_v4(),
  invitation_id uuid references invitations(id) on delete cascade,
  guest_name text not null,
  attending boolean not null,
  guest_count int default 1,
  dietary_notes text,
  message text,
  submitted_at timestamptz default now()
);

-- Indeksi ātrai meklēšanai pēc slug un invitation_id
create index if not exists idx_invitations_slug on invitations(slug);
create index if not exists idx_locations_invitation on locations(invitation_id, order_index);
create index if not exists idx_rsvps_invitation on rsvps(invitation_id);

-- Row Level Security (RLS) — pāris redz tikai savus datus, viesi var lasīt publicētos ielūgumus
alter table invitations enable row level security;
alter table locations enable row level security;
alter table rsvps enable row level security;

-- Publicēts ielūgums ir lasāms visiem (viesiem nav jābūt kontam)
create policy "Public can view published invitations"
  on invitations for select
  using (is_published = true);

create policy "Public can view locations of published invitations"
  on locations for select
  using (invitation_id in (select id from invitations where is_published = true));

-- Viesi var iesniegt RSVP publicētiem ielūgumiem
create policy "Public can insert rsvp for published invitations"
  on rsvps for insert
  with check (invitation_id in (select id from invitations where is_published = true));

-- Pāris pilnībā pārvalda savus datus (pieņemot, ka auth_user_id = auth.uid())
create policy "Couples manage own invitations"
  on invitations for all
  using (couple_id in (select id from couples where auth_user_id = auth.uid()));

create policy "Couples manage own locations"
  on locations for all
  using (invitation_id in (
    select i.id from invitations i
    join couples c on c.id = i.couple_id
    where c.auth_user_id = auth.uid()
  ));

create policy "Couples view own rsvps"
  on rsvps for select
  using (invitation_id in (
    select i.id from invitations i
    join couples c on c.id = i.couple_id
    where c.auth_user_id = auth.uid()
  ));
