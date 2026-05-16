
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  tech text[] not null default '{}',
  github text,
  demo text,
  image_url text,
  case_study text,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Anyone can view projects"
  on public.projects for select
  using (true);

create policy "Anyone can insert projects"
  on public.projects for insert
  with check (true);

create policy "Anyone can update projects"
  on public.projects for update
  using (true);

create policy "Anyone can delete projects"
  on public.projects for delete
  using (true);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Public can view project images"
  on storage.objects for select
  using (bucket_id = 'project-images');

create policy "Anyone can upload project images"
  on storage.objects for insert
  with check (bucket_id = 'project-images');

create policy "Anyone can update project images"
  on storage.objects for update
  using (bucket_id = 'project-images');

create policy "Anyone can delete project images"
  on storage.objects for delete
  using (bucket_id = 'project-images');
