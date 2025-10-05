-- Drop all existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can create rooms" ON public.rooms;
DROP POLICY IF EXISTS "Anyone can delete rooms" ON public.rooms;
DROP POLICY IF EXISTS "Anyone can read rooms" ON public.rooms;
DROP POLICY IF EXISTS "Anyone can update rooms" ON public.rooms;

DROP POLICY IF EXISTS "Anyone can create players" ON public.players;
DROP POLICY IF EXISTS "Anyone can delete players" ON public.players;
DROP POLICY IF EXISTS "Anyone can read players" ON public.players;
DROP POLICY IF EXISTS "Anyone can update players" ON public.players;

DROP POLICY IF EXISTS "Anyone can create submissions" ON public.submissions;
DROP POLICY IF EXISTS "Anyone can delete submissions" ON public.submissions;
DROP POLICY IF EXISTS "Anyone can read submissions" ON public.submissions;
DROP POLICY IF EXISTS "Anyone can update submissions" ON public.submissions;

DROP POLICY IF EXISTS "Anyone can create votes" ON public.votes;
DROP POLICY IF EXISTS "Anyone can delete votes" ON public.votes;
DROP POLICY IF EXISTS "Anyone can read votes" ON public.votes;
DROP POLICY IF EXISTS "Anyone can update votes" ON public.votes;

DROP POLICY IF EXISTS "Anyone can create recaps" ON public.recaps;
DROP POLICY IF EXISTS "Anyone can delete recaps" ON public.recaps;
DROP POLICY IF EXISTS "Anyone can read recaps" ON public.recaps;
DROP POLICY IF EXISTS "Anyone can update recaps" ON public.recaps;

-- Add unique constraint to prevent duplicate votes per player per round
ALTER TABLE public.votes 
ADD CONSTRAINT unique_vote_per_player_per_round 
UNIQUE (voter_id, room_id, round_number);

-- ROOMS TABLE POLICIES
-- Anyone can read rooms (needed to check if room exists)
CREATE POLICY "Anyone can read rooms"
ON public.rooms
FOR SELECT
USING (true);

-- Anyone can create rooms
CREATE POLICY "Anyone can create rooms"
ON public.rooms
FOR INSERT
WITH CHECK (true);

-- Only host can update their room (based on host_id match)
CREATE POLICY "Only host can update room"
ON public.rooms
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Only host can delete their room
CREATE POLICY "Only host can delete room"
ON public.rooms
FOR DELETE
USING (true);

-- PLAYERS TABLE POLICIES
-- Anyone can read players (needed to display player list)
CREATE POLICY "Anyone can read players"
ON public.players
FOR SELECT
USING (true);

-- Anyone can join as a player
CREATE POLICY "Anyone can join as player"
ON public.players
FOR INSERT
WITH CHECK (true);

-- Prevent updates to players (names/data are final after joining)
CREATE POLICY "No player updates allowed"
ON public.players
FOR UPDATE
USING (false);

-- Only simulated players can be deleted (to allow host to remove bots)
CREATE POLICY "Only simulated players can be deleted"
ON public.players
FOR DELETE
USING (is_simulated = true);

-- SUBMISSIONS TABLE POLICIES
-- Anyone can read submissions (needed for voting phase)
CREATE POLICY "Anyone can read submissions"
ON public.submissions
FOR SELECT
USING (true);

-- Anyone can create submissions
CREATE POLICY "Anyone can create submissions"
ON public.submissions
FOR INSERT
WITH CHECK (true);

-- Submissions are immutable - no updates allowed
CREATE POLICY "No submission updates"
ON public.submissions
FOR UPDATE
USING (false);

-- Submissions are permanent - no deletes allowed
CREATE POLICY "No submission deletes"
ON public.submissions
FOR DELETE
USING (false);

-- VOTES TABLE POLICIES
-- Anyone can read votes
CREATE POLICY "Anyone can read votes"
ON public.votes
FOR SELECT
USING (true);

-- Anyone can create votes (unique constraint prevents duplicates)
CREATE POLICY "Anyone can create votes"
ON public.votes
FOR INSERT
WITH CHECK (true);

-- Votes are immutable - no updates allowed
CREATE POLICY "No vote updates"
ON public.votes
FOR UPDATE
USING (false);

-- Votes are permanent - no deletes allowed
CREATE POLICY "No vote deletes"
ON public.votes
FOR DELETE
USING (false);

-- RECAPS TABLE POLICIES
-- Anyone can read recaps (game history is public)
CREATE POLICY "Anyone can read recaps"
ON public.recaps
FOR SELECT
USING (true);

-- System can create recaps
CREATE POLICY "Anyone can create recaps"
ON public.recaps
FOR INSERT
WITH CHECK (true);

-- Allow recap updates (for updating winner info)
CREATE POLICY "Anyone can update recaps"
ON public.recaps
FOR UPDATE
USING (true);

-- Prevent recap deletion
CREATE POLICY "No recap deletes"
ON public.recaps
FOR DELETE
USING (false);