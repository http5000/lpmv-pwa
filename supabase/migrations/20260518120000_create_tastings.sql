-- Carnet de dégustation : table cloud des dégustations utilisateur.
-- Pendant locale : src/lib/storage/carnet.ts (localStorage). Sync v2.
--
-- Règle métier : un user ne voit / écrit / supprime QUE ses propres dégustations.
-- L'id est un UUID v4 généré côté client (depuis localStorage existant), pour
-- préserver l'identité d'une entrée locale lors de sa première remontée cloud.

set check_function_bodies = off;

create table if not exists public.tastings (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  wine_name text not null default '',
  vintage text,
  region text,
  rating numeric(2,1) not null default 0 check (rating >= 0 and rating <= 5),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.tastings is 'Carnet de dégustation. id généré client. Voir src/lib/storage/carnet*.ts.';
comment on column public.tastings.payload is 'Détail dégustation : oeil, nez, bouche, notes — voir type Tasting côté client.';

create index if not exists tastings_user_id_idx on public.tastings (user_id);
create index if not exists tastings_user_created_idx on public.tastings (user_id, created_at desc);

-- RLS
alter table public.tastings enable row level security;

drop policy if exists "tastings_select_own" on public.tastings;
create policy "tastings_select_own"
  on public.tastings for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "tastings_insert_own" on public.tastings;
create policy "tastings_insert_own"
  on public.tastings for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "tastings_update_own" on public.tastings;
create policy "tastings_update_own"
  on public.tastings for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "tastings_delete_own" on public.tastings;
create policy "tastings_delete_own"
  on public.tastings for delete
  to authenticated
  using (auth.uid() = user_id);

-- Trigger : updated_at au moment de l'UPDATE (l'INSERT garde la valeur fournie ou now()).
create or replace function public.tastings_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tastings_set_updated_at on public.tastings;
create trigger tastings_set_updated_at
  before update on public.tastings
  for each row execute function public.tastings_set_updated_at();
