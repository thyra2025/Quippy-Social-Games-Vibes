-- Create a separate table for room secret tokens with strict RLS
CREATE TABLE public.room_secrets (
  room_id text NOT NULL PRIMARY KEY REFERENCES public.rooms(id) ON DELETE CASCADE,
  secret_token text NOT NULL DEFAULT gen_random_uuid()::text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on room_secrets
ALTER TABLE public.room_secrets ENABLE ROW LEVEL SECURITY;

-- Nobody can read secret tokens directly (only edge functions with service role can access)
CREATE POLICY "No direct access to secret tokens"
ON public.room_secrets
FOR SELECT
USING (false);

-- Allow inserting secret tokens when creating rooms
CREATE POLICY "Anyone can create secret tokens"
ON public.room_secrets
FOR INSERT
WITH CHECK (true);

-- No updates or deletes allowed (cascade handles deletes)
CREATE POLICY "No secret token updates"
ON public.room_secrets
FOR UPDATE
USING (false);

CREATE POLICY "No secret token deletes"
ON public.room_secrets
FOR DELETE
USING (false);

-- Migrate existing secret tokens to the new table
INSERT INTO public.room_secrets (room_id, secret_token)
SELECT id, secret_token FROM public.rooms
ON CONFLICT (room_id) DO NOTHING;

-- Remove secret_token column from rooms table
ALTER TABLE public.rooms DROP COLUMN secret_token;