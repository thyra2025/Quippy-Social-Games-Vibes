import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Crown, LogOut, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ThemeSelector } from '@/components/ThemeSelector';
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton';
import { generateRoomLink } from '@/utils/whatsapp';
import { toast } from '@/hooks/use-toast';

interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

const Lobby = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState('');

  useEffect(() => {
    // Simulate initial host
    if (!hasJoined && players.length === 0) {
      const hostId = Math.random().toString(36).substring(2, 9);
      setPlayers([{ id: hostId, name: 'Host', isHost: true }]);
    }
  }, []);

  const handleJoinLobby = () => {
    if (playerName.trim()) {
      const playerId = Math.random().toString(36).substring(2, 9);
      const newPlayer: Player = {
        id: playerId,
        name: playerName,
        isHost: players.length === 0,
      };
      setPlayers([...players, newPlayer]);
      setCurrentPlayerId(playerId);
      setHasJoined(true);
      toast({
        title: "Joined!",
        description: `Welcome to the party, ${playerName}!`,
      });
    }
  };

  const handleStartGame = () => {
    navigate(`/room/${roomId}`);
  };

  const handleLeave = () => {
    navigate('/');
  };

  const roomLink = generateRoomLink(roomId || '');
  const shareMessage = `🎉 Join my Quippy party!\nRoom Code: ${roomId}`;

  const isHost = players.find(p => p.id === currentPlayerId)?.isHost;

  if (!hasJoined) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="p-4 flex justify-between items-center border-b border-border">
          <Button variant="ghost" onClick={handleLeave}>
            <LogOut className="h-5 w-5 mr-2" />
            Leave
          </Button>
          <ThemeSelector />
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="card-game max-w-md w-full space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Join the Party!</h2>
              <p className="text-muted-foreground">Room Code</p>
              <div className="inline-block px-8 py-4 rounded-xl theme-gradient">
                <p className="text-4xl font-bold text-white tracking-wider">{roomId}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinLobby()}
                  className="h-12 text-lg"
                />
              </div>

              <Button 
                onClick={handleJoinLobby}
                disabled={!playerName.trim()}
                className="w-full theme-gradient text-white font-semibold py-6 text-lg rounded-xl"
              >
                Join Lobby
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
          Leave
        </Button>
        <ThemeSelector />
      </header>

      <main className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
        {/* Room Info */}
        <Card className="card-game text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Room Code</p>
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

        {/* Players */}
        <Card className="card-game">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Players ({players.length})
              </h3>
              {isHost && (
                <Button
                  onClick={handleStartGame}
                  disabled={players.length < 2}
                  className="theme-gradient text-white font-semibold gap-2 rounded-xl"
                >
                  <Play className="h-4 w-4" />
                  Start Game
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
                    <div className="w-10 h-10 rounded-full theme-gradient flex items-center justify-center text-white font-bold">
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{player.name}</span>
                    {player.id === currentPlayerId && (
                      <span className="text-xs text-muted-foreground">(You)</span>
                    )}
                  </div>
                  {player.isHost && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Crown className="h-4 w-4" />
                      <span className="text-xs font-medium">Host</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {players.length < 2 && (
              <p className="text-center text-sm text-muted-foreground">
                Waiting for more players to join...
              </p>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Lobby;
