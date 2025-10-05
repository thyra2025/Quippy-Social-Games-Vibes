-- Create rooms table
CREATE TABLE public.rooms (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  mode TEXT NOT NULL DEFAULT 'who-wrote-this',
  game_phase TEXT NOT NULL DEFAULT 'lobby',
  language TEXT NOT NULL DEFAULT 'en',
  host_id TEXT NOT NULL,
  current_prompt TEXT
);

-- Create players table
CREATE TABLE public.players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT,
  is_simulated BOOLEAN NOT NULL DEFAULT false,
  is_host BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create submissions table
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL DEFAULT 1,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_ai BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create votes table
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL DEFAULT 1,
  voter_id UUID NOT NULL,
  submission_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create recaps table
CREATE TABLE public.recaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL DEFAULT 1,
  mode TEXT NOT NULL,
  prompt TEXT,
  winner_name TEXT,
  winner_content TEXT,
  vote_count INTEGER,
  ai_content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recaps ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public access for multiplayer game functionality
CREATE POLICY "Anyone can read rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Anyone can create rooms" ON public.rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update rooms" ON public.rooms FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete rooms" ON public.rooms FOR DELETE USING (true);

CREATE POLICY "Anyone can read players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Anyone can create players" ON public.players FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update players" ON public.players FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete players" ON public.players FOR DELETE USING (true);

CREATE POLICY "Anyone can read submissions" ON public.submissions FOR SELECT USING (true);
CREATE POLICY "Anyone can create submissions" ON public.submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update submissions" ON public.submissions FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete submissions" ON public.submissions FOR DELETE USING (true);

CREATE POLICY "Anyone can read votes" ON public.votes FOR SELECT USING (true);
CREATE POLICY "Anyone can create votes" ON public.votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update votes" ON public.votes FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete votes" ON public.votes FOR DELETE USING (true);

CREATE POLICY "Anyone can read recaps" ON public.recaps FOR SELECT USING (true);
CREATE POLICY "Anyone can create recaps" ON public.recaps FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update recaps" ON public.recaps FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete recaps" ON public.recaps FOR DELETE USING (true);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.players;
ALTER PUBLICATION supabase_realtime ADD TABLE public.submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.votes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.recaps;

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for rooms updated_at
CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON public.rooms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_players_room_id ON public.players(room_id);
CREATE INDEX idx_submissions_room_id ON public.submissions(room_id);
CREATE INDEX idx_submissions_player_id ON public.submissions(player_id);
CREATE INDEX idx_votes_room_id ON public.votes(room_id);
CREATE INDEX idx_votes_submission_id ON public.votes(submission_id);
CREATE INDEX idx_recaps_room_id ON public.recaps(room_id);