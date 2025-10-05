import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeSelector } from '@/components/ThemeSelector';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [roomCode, setRoomCode] = useState('');
  const [roomError, setRoomError] = useState('');
  const [showHostDialog, setShowHostDialog] = useState(false);
  const [hostName, setHostName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleStartParty = () => {
    setShowHostDialog(true);
  };

  const handleCreateRoom = async () => {
    if (!hostName.trim()) return;
    
    setIsCreating(true);
    try {
      const roomId = generateRoomId();
      const playerId = crypto.randomUUID();
      
      // Create room in Supabase
      const { error: roomError } = await supabase
        .from('rooms')
        .insert({
          id: roomId,
          host_id: playerId,
          game_phase: 'lobby',
          mode: 'who-wrote-this',
        });

      if (roomError) throw roomError;

      // Generate secret token on client side
      const secretToken = crypto.randomUUID();

      // Create secret token for the room
      const { error: secretError } = await supabase
        .from('room_secrets')
        .insert({
          room_id: roomId,
          secret_token: secretToken,
        });

      if (secretError) throw secretError;

      // Store the secret token in localStorage for host authentication
      localStorage.setItem(`room_token_${roomId}`, secretToken);

      // Create host player object
      const hostPlayer = {
        id: playerId,
        name: hostName.trim(),
        isHost: true,
        isSimulated: false,
      };
      
      // Navigate to lobby with host info
      navigate(`/lobby/${roomId}`, { 
        state: { 
          autoJoin: true,
          player: hostPlayer
        } 
      });
    } catch (error) {
      console.error('Error creating room:', error);
      toast({
        title: t('error'),
        description: 'Failed to create room. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinParty = async () => {
    const trimmedCode = roomCode.trim().toUpperCase();
    
    if (!trimmedCode) {
      return;
    }

    setIsJoining(true);
    setRoomError('');

    try {
      // Check if room exists in Supabase
      const { data, error } = await supabase
        .from('rooms')
        .select('id')
        .eq('id', trimmedCode)
        .single();

      if (error || !data) {
        setRoomError(t('roomNotFound'));
      } else {
        navigate(`/lobby/${trimmedCode}`);
      }
    } catch (error) {
      console.error('Error checking room:', error);
      setRoomError(t('roomNotFound'));
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Quippy</h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeSelector />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl w-full space-y-8">
          {/* Logo and Title */}
          <div className="space-y-4">
            <div className="inline-block p-6 rounded-full theme-gradient">
              <Sparkles className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              {t('welcomeToQuippy')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('tagline')}
            </p>
          </div>

          {/* How to Play Instructions */}
          <div className="text-center space-y-2 pt-4">
            <h3 className="text-sm font-semibold text-muted-foreground">{t('howToPlay')}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{t('step1')}</p>
              <p>{t('step2')}</p>
              <p>{t('step3')}</p>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-4 pt-8">
            {/* Start Party Card */}
            <Card className="card-game text-left hover:scale-105 cursor-pointer" onClick={handleStartParty}>
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{t('startParty')}</h3>
                  <p className="text-muted-foreground">
                    {t('createRoomDesc')}
                  </p>
                </div>
                <Button className="w-full theme-gradient text-white font-semibold py-6 text-lg rounded-xl">
                  {t('startParty')}
                </Button>
              </div>
            </Card>

            {/* Join Party Card */}
            <Card className="card-game text-left">
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-secondary/10">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{t('joinAParty')}</h3>
                  <p className="text-muted-foreground">
                    {t('enterRoomDesc')}
                  </p>
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder={t('enterRoomCode')}
                    value={roomCode}
                    onChange={(e) => {
                      setRoomCode(e.target.value.toUpperCase());
                      setRoomError('');
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleJoinParty()}
                    className={`text-center text-2xl font-bold tracking-wider h-14 ${roomError ? 'border-destructive' : ''}`}
                    maxLength={6}
                  />
                  {roomError && (
                    <p className="text-sm text-destructive text-center">{roomError}</p>
                  )}
                  <Button 
                    onClick={handleJoinParty}
                    disabled={!roomCode.trim() || isJoining}
                    variant="outline"
                    className="w-full py-6 text-lg rounded-xl"
                  >
                    {isJoining ? t('joining') : t('join')}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="space-y-2">
              <div className="text-3xl">🎮</div>
              <div className="text-sm font-medium">{t('quickGames')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">💬</div>
              <div className="text-sm font-medium">{t('whatsappFirst')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🎨</div>
              <div className="text-sm font-medium">{t('customThemes')}</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>{t('shareTheFun')}</p>
      </footer>

      {/* Host Name Dialog */}
      <Dialog open={showHostDialog} onOpenChange={setShowHostDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('startParty')}</DialogTitle>
            <DialogDescription>
              {t('enterName')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder={t('playerName')}
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateRoom()}
              className="h-12 text-lg"
              autoFocus
            />
            <Button
              onClick={handleCreateRoom}
              disabled={!hostName.trim() || isCreating}
              className="w-full theme-gradient text-white font-semibold py-6 text-lg rounded-xl"
            >
              {isCreating ? t('creating') : t('createRoom')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Landing;
