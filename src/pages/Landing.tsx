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

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [roomCode, setRoomCode] = useState('');

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleStartParty = () => {
    const roomId = generateRoomId();
    navigate(`/lobby/${roomId}`);
  };

  const handleJoinParty = () => {
    if (roomCode.trim()) {
      navigate(`/lobby/${roomCode.toUpperCase()}`);
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
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleJoinParty()}
                    className="text-center text-2xl font-bold tracking-wider h-14"
                    maxLength={6}
                  />
                  <Button 
                    onClick={handleJoinParty}
                    disabled={!roomCode.trim()}
                    variant="outline"
                    className="w-full py-6 text-lg rounded-xl"
                  >
                    {t('join')}
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
    </div>
  );
};

export default Landing;
