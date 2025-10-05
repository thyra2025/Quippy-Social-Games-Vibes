import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Users, Crown, LogOut, Play, Bot, History, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ThemeSelector } from '@/components/ThemeSelector';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton';
import { generateRoomLink } from '@/utils/whatsapp';
import { toast } from '@/hooks/use-toast';
import { generateSimulatedPlayers } from '@/utils/simulatedPlayers';
import { GAME_MODES, GameMode } from '@/types/game';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface Player {
  id: string;
  name: string;
  isHost: boolean;
  isSimulated?: boolean;
  avatarColor?: string;
}

const Lobby = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [playerName, setPlayerName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState('');
  const [enableSimulated, setEnableSimulated] = useState(false);
  const [selectedMode, setSelectedMode] = useState<GameMode>('who-wrote-this');
  const [roomExpired, setRoomExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

  // Check if room exists (for shared links) and auto-join for room creators
  useEffect(() => {
    const checkRoomAndAutoJoin = async () => {
      const state = location.state as { autoJoin?: boolean; player?: Player };
      
      // If arriving via room creation, auto-join
      if (state?.autoJoin && state?.player && !hasJoined) {
        try {
          // Add host player to database
          const { error: playerError } = await supabase
            .from('players')
            .insert({
              id: state.player.id,
              room_id: roomId,
              name: state.player.name,
              is_host: true,
              is_simulated: false,
              color: 'linear-gradient(135deg, hsl(var(--theme-primary)), hsl(var(--theme-secondary)))',
            });

          if (playerError) throw playerError;

          setPlayers([state.player]);
          setCurrentPlayerId(state.player.id);
          setHasJoined(true);
          toast({
            title: t('roomCreated'),
            description: `${t('welcomeToParty')}, ${state.player.name}!`,
          });
          
          // Clear navigation state to prevent re-entry on refresh
          navigate(location.pathname, { replace: true, state: {} });
        } catch (error) {
          console.error('Error adding host player:', error);
          toast({
            title: t('error'),
            description: 'Failed to join room',
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
        return;
      }
      
      // If arriving via shared link (no autoJoin state), check if room exists
      if (!state?.autoJoin && roomId) {
        try {
          const { data, error } = await supabase
            .from('rooms')
            .select('id')
            .eq('id', roomId)
            .single();

          if (error || !data) {
            setRoomExpired(true);
          }
        } catch (error) {
          console.error('Error checking room:', error);
          setRoomExpired(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkRoomAndAutoJoin();
  }, []);

  // Fetch players from database and set up real-time subscription
  useEffect(() => {
    if (!roomId || !hasJoined) return;

    let channel: RealtimeChannel;

    const fetchPlayers = async () => {
      try {
        const { data, error } = await supabase
          .from('players')
          .select('*')
          .eq('room_id', roomId)
          .order('created_at', { ascending: true });

        if (error) throw error;

        if (data) {
          const formattedPlayers: Player[] = data.map(p => ({
            id: p.id,
            name: p.name,
            isHost: p.is_host,
            isSimulated: p.is_simulated,
            avatarColor: p.color || undefined,
          }));
          setPlayers(formattedPlayers);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();

    // Set up real-time subscription
    channel = supabase
      .channel(`room:${roomId}:players`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          fetchPlayers();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [roomId, hasJoined]);

  // Handle simulated players toggle
  useEffect(() => {
    const handleSimulatedPlayers = async () => {
      if (hasJoined && enableSimulated && !players.some(p => p.isSimulated)) {
        const simulatedPlayers = generateSimulatedPlayers();
        
        try {
          // Add simulated players to database
          const playersToInsert = simulatedPlayers.map(p => ({
            id: p.id,
            room_id: roomId,
            name: p.name,
            is_host: false,
            is_simulated: true,
            color: p.avatarColor,
          }));

          const { error } = await supabase
            .from('players')
            .insert(playersToInsert);

          if (error) throw error;

          toast({
            title: t('simulatedPlayersAdded'),
            description: `${simulatedPlayers.length} ${t('aiPlayersJoined')}`,
          });
        } catch (error) {
          console.error('Error adding simulated players:', error);
          toast({
            title: t('error'),
            description: 'Failed to add simulated players',
            variant: 'destructive',
          });
        }
      } else if (hasJoined && !enableSimulated && players.some(p => p.isSimulated)) {
        try {
          // Remove simulated players from database
          const simulatedPlayerIds = players.filter(p => p.isSimulated).map(p => p.id);
          const { error } = await supabase
            .from('players')
            .delete()
            .in('id', simulatedPlayerIds);

          if (error) throw error;

          toast({
            title: t('simulatedPlayersRemoved'),
            description: t('realPlayersOnly'),
          });
        } catch (error) {
          console.error('Error removing simulated players:', error);
        }
      }
    };

    handleSimulatedPlayers();
  }, [enableSimulated, hasJoined]);

  const handleJoinLobby = async () => {
    if (!playerName.trim()) return;

    setIsJoining(true);
    try {
      const playerId = crypto.randomUUID();
      const avatarColor = `hsl(${Math.random() * 360}, 70%, 50%)`;

      // Add player to database
      const { error: playerError } = await supabase
        .from('players')
        .insert({
          id: playerId,
          room_id: roomId,
          name: playerName.trim(),
          is_host: players.length === 0,
          is_simulated: false,
          color: avatarColor,
        });

      if (playerError) throw playerError;

      setCurrentPlayerId(playerId);
      setHasJoined(true);
      toast({
        title: t('joined'),
        description: `${t('welcomeToParty')}, ${playerName}!`,
      });
    } catch (error) {
      console.error('Error joining lobby:', error);
      toast({
        title: t('error'),
        description: 'Failed to join lobby',
        variant: 'destructive',
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleStartGame = () => {
    navigate(`/room/${roomId}`, { state: { players, currentPlayerId, gameMode: selectedMode } });
  };

  const handleLeave = () => {
    navigate('/');
  };

  const roomLink = generateRoomLink(roomId || '');
  const shareMessage = `🎉 Join my Quippy party!\nRoom Code: ${roomId}`;

  const isHost = players.find(p => p.id === currentPlayerId)?.isHost;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block p-6 rounded-full theme-gradient">
            <PartyPopper className="h-16 w-16 text-white animate-pulse" />
          </div>
          <p className="text-lg text-muted-foreground">{t('waiting')}</p>
        </div>
      </div>
    );
  }

  // Show friendly message for expired rooms (shared links)
  if (roomExpired) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="p-4 flex justify-between items-center border-b border-border">
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeSelector />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="card-game max-w-md w-full space-y-6 text-center">
            <div className="inline-block p-6 rounded-full theme-gradient mx-auto">
              <PartyPopper className="h-16 w-16 text-white" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">{t('partyEnded')}</h2>
              <p className="text-muted-foreground">
                {t('roomCode')}: <span className="font-mono font-bold">{roomId}</span>
              </p>
            </div>

            <Button
              onClick={() => navigate('/')}
              className="w-full theme-gradient text-white font-semibold py-6 text-lg rounded-xl"
            >
              {t('startNewParty')}
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  if (!hasJoined) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="p-4 flex justify-between items-center border-b border-border">
          <Button variant="ghost" onClick={handleLeave}>
            <LogOut className="h-5 w-5 mr-2" />
            {t('leave')}
          </Button>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeSelector />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="card-game max-w-md w-full space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">{t('joinTheParty')}</h2>
              <p className="text-muted-foreground">{t('roomCode')}</p>
              <div className="inline-block px-8 py-4 rounded-xl theme-gradient">
                <p className="text-4xl font-bold text-white tracking-wider">{roomId}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('playerName')}</label>
                <Input
                  placeholder={t('enterName')}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinLobby()}
                  className="h-12 text-lg"
                />
              </div>

              <Button 
                onClick={handleJoinLobby}
                disabled={!playerName.trim() || isJoining}
                className="w-full theme-gradient text-white font-semibold py-6 text-lg rounded-xl"
              >
                {isJoining ? t('joining') : t('joinParty')}
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center border-b border-border">
        <Button variant="ghost" onClick={handleLeave}>
          <LogOut className="h-5 w-5 mr-2" />
          {t('leave')}
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/party-feed/${roomId}`)}
            className="rounded-xl gap-2"
          >
            <History className="h-4 w-4" />
            {t('partyFeed')}
          </Button>
          <LanguageSelector />
          <ThemeSelector />
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
        {/* Room Info */}
        <Card className="card-game text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{t('roomCode')}</p>
            <div className="inline-block px-6 py-3 rounded-xl theme-gradient">
              <p className="text-3xl font-bold text-white tracking-wider">{roomId}</p>
            </div>
          </div>
          
          <WhatsAppShareButton
            text={shareMessage}
            url={roomLink}
            className="max-w-md mx-auto"
          />
        </Card>

        {/* Game Mode Selection */}
        {isHost && (
          <Card className="card-game">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">{t('selectGameMode')}</Label>
                <p className="text-sm text-muted-foreground">{t('chooseGameMode')}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GAME_MODES.map((mode) => {
                  const titleKey = mode.id === 'who-wrote-this' ? 'whoWroteThis' :
                                  mode.id === 'caption-cascade' ? 'captionCascade' :
                                  mode.id === 'two-truths' ? 'twoTruthsBot' :
                                  'instantTrivia';
                  const descKey = mode.id === 'who-wrote-this' ? 'whoWroteThisDesc' :
                                 mode.id === 'caption-cascade' ? 'captionCascadeDesc' :
                                 mode.id === 'two-truths' ? 'twoTruthsBotDesc' :
                                 'instantTriviaDesc';
                  
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedMode === mode.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{mode.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{t(titleKey as any)}</h4>
                          <p className="text-sm text-muted-foreground">{t(descKey as any)}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Simulated Players Toggle */}
        <Card className="card-game">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="simulated-mode" className="text-base font-semibold">
                {t('addSimulated')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('testWithBots')}
              </p>
            </div>
            <Switch
              id="simulated-mode"
              checked={enableSimulated}
              onCheckedChange={setEnableSimulated}
            />
          </div>
        </Card>

        {/* Players */}
        <Card className="card-game">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t('players')} ({players.length})
              </h3>
              {isHost && (
                <Button
                  onClick={handleStartGame}
                  disabled={players.length < 2}
                  className="theme-gradient text-white font-semibold gap-2 rounded-xl"
                >
                  <Play className="h-4 w-4" />
                  {t('startGame')}
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {players.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    player.id === currentPlayerId
                      ? 'border-primary bg-primary/5'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{
                        background: player.avatarColor || 'linear-gradient(135deg, hsl(var(--theme-primary)), hsl(var(--theme-secondary)))'
                      }}
                    >
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{player.name}</span>
                      {player.isSimulated && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Bot className="h-3 w-3" />
                          {t('bot')}
                        </span>
                      )}
                      {player.id === currentPlayerId && (
                        <span className="text-xs text-muted-foreground">{t('you')}</span>
                      )}
                    </div>
                  </div>
                  {player.isHost && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Crown className="h-4 w-4" />
                      <span className="text-xs font-medium">{t('host')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {players.length < 2 && (
              <p className="text-center text-sm text-muted-foreground">
                {t('waitingForPlayers')}
              </p>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Lobby;
