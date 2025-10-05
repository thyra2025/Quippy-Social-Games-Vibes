import { useParams, useNavigate } from 'react-router-dom';
import { LogOut, Trophy, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeSelector } from '@/components/ThemeSelector';
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton';
import { generateRoomLink } from '@/utils/whatsapp';

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const handleLeave = () => {
    navigate('/');
  };

  const roomLink = generateRoomLink(roomId || '');
  const shareMessage = `🎉 Playing Quippy!\nRoom: ${roomId}\nJoin us!`;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center border-b border-border">
        <Button variant="ghost" onClick={handleLeave}>
          <LogOut className="h-5 w-5 mr-2" />
          Leave Game
        </Button>
        <ThemeSelector />
      </header>

      <main className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
        {/* Game Header */}
        <Card className="card-game text-center">
          <div className="space-y-2">
            <div className="inline-block px-6 py-2 rounded-xl theme-gradient">
              <p className="text-xl font-bold text-white">Room: {roomId}</p>
            </div>
            <p className="text-sm text-muted-foreground">Game in Progress</p>
          </div>
        </Card>

        {/* Game Area */}
        <Card className="card-game min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="inline-block p-8 rounded-full theme-gradient">
              <Trophy className="h-16 w-16 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Game Starting Soon!</h2>
              <p className="text-muted-foreground max-w-md">
                The game interface will be built with your custom game logic.
                For now, invite more friends to join the fun!
              </p>
            </div>
          </div>
        </Card>

        {/* Share Card */}
        <Card className="card-game">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Invite More Players</h3>
            </div>
            <WhatsAppShareButton
              text={shareMessage}
              url={roomLink}
            />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Room;
