-- Add secret_token column to rooms table for host verification
ALTER TABLE public.rooms 
ADD COLUMN secret_token text NOT NULL DEFAULT gen_random_uuid()::text;

-- Create index for faster token lookups
CREATE INDEX idx_rooms_secret_token ON public.rooms(secret_token);

-- Update RLS policies to prevent direct updates/deletes
-- Only allow updates/deletes through the Edge Function

DROP POLICY IF EXISTS "Only host can update room" ON public.rooms;
DROP POLICY IF EXISTS "Only host can delete room" ON public.rooms;

-- Prevent all direct updates and deletes (force through Edge Function)
CREATE POLICY "No direct room updates"
ON public.rooms
FOR UPDATE
USING (false);

CREATE POLICY "No direct room deletes"
ON public.rooms
FOR DELETE
USING (false);