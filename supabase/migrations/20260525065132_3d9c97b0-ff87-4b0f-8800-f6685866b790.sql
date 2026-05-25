
CREATE TABLE public.profile (
  id text PRIMARY KEY DEFAULT 'me',
  name text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  photo_url text,
  github_url text,
  linkedin_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Anyone can insert profile" ON public.profile FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update profile" ON public.profile FOR UPDATE USING (true);

CREATE TRIGGER profile_set_updated_at
BEFORE UPDATE ON public.profile
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.profile (id, name, title, tagline, bio, github_url, linkedin_url)
VALUES (
  'me',
  'Noluthando Masemula',
  'Software Developer · AI & Tech Enthusiast',
  'I design and build modern web applications with a focus on clean code, thoughtful UX, and emerging AI technologies.',
  'I''m a software developer who enjoys turning ideas into clean, reliable products that people actually love using. My focus is modern web development with React, TypeScript and Node.js. I''m also deeply curious about AI and prompt engineering, and how they shape the next generation of software.',
  'https://github.com/',
  'https://www.linkedin.com/'
);
