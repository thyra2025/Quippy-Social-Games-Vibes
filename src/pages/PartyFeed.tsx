import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeSelector } from '@/components/ThemeSelector';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { RecapCard } from '@/components/RecapCard';
import { getRecaps } from '@/utils/partyFeedStorage';
import { GameRecap } from '@/types/partyFeed';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const PartyFeed = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [recaps, setRecaps] = useState<GameRecap[]>([]);
  const [selectedRecap, setSelectedRecap] = useState<GameRecap | null>(null);

  useEffect(() => {
    if (roomId) {
      const loadedRecaps = getRecaps(roomId);
      setRecaps(loadedRecaps);
    }
  }, [roomId]);

  const handleBack = () => {
    navigate(`/lobby/${roomId}`);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center border-b border-border">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('backToLobby')}
        </Button>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeSelector />
        </div>
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">🎊 {t('partyFeed')}</h1>
            <p className="text-muted-foreground">
              Relive your best moments from this room
            </p>
          </div>

          {recaps.length === 0 ? (
            <Card className="card-game text-center py-12">
              <div className="space-y-4">
                <div className="text-6xl">🎮</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{t('noRecaps')}</h3>
                  <p className="text-muted-foreground">
                    Start your first round to see recaps here!
                  </p>
                </div>
                <Button onClick={handleBack} className="theme-gradient text-white rounded-xl">
                  {t('startGame')}
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recaps.map((recap) => (
                <RecapCard
                  key={recap.id}
                  recap={recap}
                  onClick={() => setSelectedRecap(recap)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Recap Detail Modal */}
      <Dialog open={!!selectedRecap} onOpenChange={() => setSelectedRecap(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedRecap && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <span>{selectedRecap.gameModeIcon}</span>
                  {selectedRecap.gameModeName}
                </DialogTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selectedRecap.timestamp)}
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Prompt/Question */}
                <Card className="p-4 bg-muted/50">
                  <p className="font-medium">{selectedRecap.prompt}</p>
                  {selectedRecap.triviaQuestion && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Correct Answer: {selectedRecap.triviaCorrectAnswer}
                    </p>
                  )}
                </Card>

                {/* Winner */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Trophy className="h-6 w-6 text-amber-500" />
                  <div>
                    <p className="font-semibold text-amber-500">{t('winner')}</p>
                    <p>{selectedRecap.winnerInfo}</p>
                  </div>
                </div>

                {/* Submissions or Trivia Results */}
                {selectedRecap.triviaAnswers ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <h4 className="font-semibold">{t('players')}</h4>
                    </div>
                    {selectedRecap.triviaAnswers.map((answer, idx) => (
                      <Card
                        key={idx}
                        className={`p-4 ${
                          answer.isCorrect ? 'bg-green-500/10 border-green-500/20' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{answer.playerName}</span>
                          {answer.isCorrect && (
                            <span className="text-green-500 text-sm font-semibold">✓ Correct</span>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <h4 className="font-semibold">All Submissions</h4>
                    </div>
                    {selectedRecap.submissions.map((submission) => (
                      <Card key={submission.id} className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{submission.playerName}</span>
                            {submission.isAI && (
                              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                AI
                              </span>
                            )}
                          </div>
                          <p className="text-sm">{submission.text}</p>
                          {submission.votes !== undefined && (
                            <p className="text-xs text-muted-foreground">
                              {submission.votes} vote{submission.votes !== 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartyFeed;
