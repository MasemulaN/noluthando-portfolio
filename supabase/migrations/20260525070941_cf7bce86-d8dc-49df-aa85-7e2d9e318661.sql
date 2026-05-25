
-- Add email column to profile
ALTER TABLE public.profile ADD COLUMN IF NOT EXISTS email text;

-- Replace permissive profile policies with auth-gated writes
DROP POLICY IF EXISTS "Anyone can insert profile" ON public.profile;
DROP POLICY IF EXISTS "Anyone can update profile" ON public.profile;

CREATE POLICY "Authenticated users can insert profile"
ON public.profile FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update profile"
ON public.profile FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Replace permissive projects policies with auth-gated writes
DROP POLICY IF EXISTS "Anyone can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Anyone can update projects" ON public.projects;
DROP POLICY IF EXISTS "Anyone can delete projects" ON public.projects;

CREATE POLICY "Authenticated users can insert projects"
ON public.projects FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
ON public.projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
ON public.projects FOR DELETE TO authenticated USING (true);

-- Storage policies for project-images bucket: public read, authenticated write/update/delete
DROP POLICY IF EXISTS "Public can read project-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload project-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update project-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete project-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload project-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update project-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete project-images" ON storage.objects;

CREATE POLICY "Public can read project-images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated can upload project-images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Authenticated can update project-images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated can delete project-images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'project-images');
