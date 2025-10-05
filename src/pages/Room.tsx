import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Trophy, MessageCircle, Clock, Send, Bot, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ThemeSelector } from '@/components/ThemeSelector';
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton';
import { generateRoomLink } from '@/utils/whatsapp';
import { useCountdown } from '@/hooks/useCountdown';
import { toast } from '@/hooks/use-toast';
import { Player } from '@/pages/Lobby';
import { getRandomSimulatedAnswer } from '@/utils/simulatedPlayers';
import { GameMode, Submission, Vote } from '@/types/game';
import { getRandomPrompt, getAIAnswer } from '@/utils/gameModes/whoWroteThis';
import { getRandomImage, getRandomCaption, CaptionImage } from '@/utils/gameModes/captionCascade';

type GamePhase = 'lobby' | 'playing' | 'voting' | 'recap';

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const gameMode: GameMode = location.state?.gameMode || 'who-wrote-this';
  const players = (location.state?.players as Player[]) || [];
  const currentPlayerId = location.state?.currentPlayerId || Math.random().toString(36).substring(2, 9);
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  const currentPlayerName = currentPlayer?.name || 'Player';
  const simulatedPlayers = players.filter(p => p.isSimulated);

  const [gamePhase, setGamePhase] = useState<GamePhase>('lobby');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [currentImage, setCurrentImage] = useState<CaptionImage | null>(null);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [usedAnswerIndices, setUsedAnswerIndices] = useState<number[]>([]);

  const { seconds, start: startTimer, reset: resetTimer } = useCountdown(45, () => {
    if (gamePhase === 'playing') {
      handlePlayingPhaseEnd();
    }
  });

  useEffect(() => {
    if (gamePhase === 'lobby') {
      const timer = setTimeout(() => startGame(), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const startGame = () => {
    if (gameMode === 'who-wrote-this') {
      setCurrentPrompt(getRandomPrompt());
    } else if (gameMode === 'caption-cascade') {
      setCurrentImage(getRandomImage());
    }
    setGamePhase('playing');
    startTimer();
  };

  // Simulated players auto-submit answers
  useEffect(() => {
    if (gamePhase !== 'playing' || simulatedPlayers.length === 0) return;

    simulatedPlayers.forEach((player) => {
      const delay = 15000 + Math.random() * 20000;
      
      const timerId = setTimeout(() => {
        let answerText = '';
        
        if (gameMode === 'who-wrote-this') {
          const { answer, index: answerIndex } = getRandomSimulatedAnswer(usedAnswerIndices);
          setUsedAnswerIndices(prev => [...prev, answerIndex]);
          answerText = answer;
        } else if (gameMode === 'caption-cascade') {
          const { caption, index: captionIndex } = getRandomCaption(usedAnswerIndices);
          setUsedAnswerIndices(prev => [...prev, captionIndex]);
          answerText = caption;
        }
        
        const submission: Submission = {
          id: Math.random().toString(36).substring(2, 9),
          text: answerText,
          playerId: player.id,
          playerName: player.name,
          isAI: false,
          avatarColor: player.avatarColor,
        };

        setSubmissions(prev => [...prev, submission]);
      }, delay);

      return () => clearTimeout(timerId);
    });
  }, [gamePhase, simulatedPlayers.length, gameMode]);

  const handleSubmitAnswer = () => {
    if (!playerAnswer.trim()) return;

    const newSubmission: Submission = {
      id: Math.random().toString(36).substring(2, 9),
      text: playerAnswer,
      playerId: currentPlayerId,
      playerName: currentPlayerName,
      isAI: false,
      avatarColor: currentPlayer?.avatarColor,
    };

    setSubmissions(prev => [...prev, newSubmission]);
    setHasSubmitted(true);
    setPlayerAnswer('');
    
    toast({
      title: "Submitted!",
      description: "Waiting for other players...",
    });

    const totalPlayers = 1 + simulatedPlayers.length;
    if (submissions.length + 1 >= totalPlayers) {
      setTimeout(() => {
        handlePlayingPhaseEnd();
      }, 2000);
    }
  };

  const handlePlayingPhaseEnd = () => {
    // Add AI submission only for Who Wrote This mode
    if (gameMode === 'who-wrote-this') {
      const aiSubmission: Submission = {
        id: 'ai-' + Math.random().toString(36).substring(2, 9),
        text: getAIAnswer(currentPrompt),
        playerId: 'ai',
        playerName: 'AI',
        isAI: true
      };
      console.log('🤖 AI submission created:', { text: aiSubmission.text, isAI: aiSubmission.isAI });
      setSubmissions(prev => {
        const allSubmissions = [...prev, aiSubmission];
        return allSubmissions.sort(() => Math.random() - 0.5);
      });
    } else if (gameMode === 'caption-cascade') {
      // No AI for caption cascade, just shuffle
      setSubmissions(prev => [...prev].sort(() => Math.random() - 0.5));
    }

    resetTimer();
    setGamePhase('voting');
  };

  // Simulated players auto-vote
  useEffect(() => {
    if (gamePhase !== 'voting' || simulatedPlayers.length === 0 || submissions.length === 0) return;

    console.log('🤖 Setting up simulated voting for', simulatedPlayers.length, 'players');

    simulatedPlayers.forEach((player) => {
      const delay = 8000 + Math.random() * 7000;
      
      const timerId = setTimeout(() => {
        console.log('🗳️', player.name, 'checking submissions:', submissions.map(s => ({ 
          text: s.text.substring(0, 20), 
          isAI: s.isAI, 
          playerId: s.playerId 
        })));

        // Filter out AI and own submissions
        const votableSubmissions = submissions.filter(s => !s.isAI && s.playerId !== player.id);

        console.log('✅', player.name, 'votable options:', votableSubmissions.length, 'submissions');

        if (votableSubmissions.length === 0) {
          console.log('⚠️ No votable submissions for', player.name);
          return;
        }

        // Slightly favor longer/funnier answers
        const weights = votableSubmissions.map(s => {
          let weight = 1;
          if (s.text.length > 50) weight += 0.3;
          if (/cat|coffee|dog|quantum|wikipedia|tiktok/i.test(s.text)) weight += 0.4;
          return weight;
        });

        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        let random = Math.random() * totalWeight;
        let selectedIndex = 0;

        for (let i = 0; i < weights.length; i++) {
          random -= weights[i];
          if (random <= 0) {
            selectedIndex = i;
            break;
          }
        }

        const chosenSubmission = votableSubmissions[selectedIndex];

        // DEFENSIVE CHECK
        if (chosenSubmission.isAI) {
          console.error('🚨 BUG DETECTED:', player.name, 'tried to vote for AI answer!');
          return;
        }
        
        const vote: Vote = {
          voterId: player.id,
          voterName: player.name,
          submissionId: chosenSubmission.id,
          isSimulated: true,
        };

        console.log('✅', player.name, 'voted for:', chosenSubmission.text.substring(0, 30) + '... (isAI:', chosenSubmission.isAI, ')');
        setVotes(prev => {
          const newVotes = [...prev, vote];
          console.log('📊 Vote count:', newVotes.length);
          return newVotes;
        });
      }, delay);

      return () => clearTimeout(timerId);
    });
  }, [gamePhase, submissions.length, simulatedPlayers.length]);

  // Auto-advance to recap when all votes are in
  useEffect(() => {
    if (gamePhase !== 'voting') return;

    const totalPlayers = 1 + simulatedPlayers.length;
    const currentVoteCount = votes.length;

    console.log('🗳️ Voting status:', currentVoteCount, '/', totalPlayers, 'votes');

    if (currentVoteCount >= totalPlayers) {
      console.log('✨ All votes collected! Advancing to recap...');
      setTimeout(() => {
        setGamePhase('recap');
      }, 1500);
    }
  }, [votes.length, gamePhase, simulatedPlayers.length]);

  const handleVote = (submissionId: string) => {
    const submission = submissions.find(s => s.id === submissionId);
    
    // Prevent voting for yourself
    if (submission?.playerId === currentPlayerId) {
      toast({
        title: "Can't vote for yourself!",
        variant: "destructive",
      });
      return;
    }

    const newVote: Vote = {
      voterId: currentPlayerId,
      voterName: currentPlayerName,
      submissionId,
      isSimulated: false,
    };

    console.log('👤 Real player voted for:', submission?.text.substring(0, 30) + '...');
    setVotes(prev => {
      const newVotes = [...prev, newVote];
      console.log('📊 Vote count after player vote:', newVotes.length);
      return newVotes;
    });
    setHasVoted(true);

    toast({
      title: "Vote recorded!",
      description: "Waiting for other players...",
    });
  };

  const handlePlayAgain = () => {
    setSubmissions([]);
    setVotes([]);
    setHasSubmitted(false);
    setHasVoted(false);
    setPlayerAnswer('');
    setUsedAnswerIndices([]);
    startGame();
  };

  const handleLeave = () => {
    navigate('/');
  };

  const getWinner = () => {
    const voteCounts = votes.reduce((acc, vote) => {
      acc[vote.submissionId] = (acc[vote.submissionId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let maxVotes = 0;
    let winnerId = '';
    
    Object.entries(voteCounts).forEach(([id, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        winnerId = id;
      }
    });

    return {
      submission: submissions.find(s => s.id === winnerId),
      votes: maxVotes
    };
  };

  const roomLink = generateRoomLink(roomId || '');

  // Lobby Phase
  if (gamePhase === 'lobby') {
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
          <Card className="card-game text-center">
            <div className="space-y-2">
              <div className="inline-block px-6 py-2 rounded-xl theme-gradient">
                <p className="text-xl font-bold text-white">Room: {roomId}</p>
              </div>
              <p className="text-sm text-muted-foreground">Starting game...</p>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  // Playing Phase
  if (gamePhase === 'playing') {
    let promptText = '';
    if (gameMode === 'who-wrote-this') promptText = currentPrompt;
    else if (gameMode === 'caption-cascade') promptText = 'Write the funniest caption for this image';

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
          {/* Timer */}
          <Card className="card-game">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-semibold">Time Remaining</span>
              </div>
              <div className="text-3xl font-bold text-primary">{seconds}s</div>
            </div>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full theme-gradient transition-all duration-1000"
                style={{ width: `${(seconds / 45) * 100}%` }}
              />
            </div>
          </Card>

          {/* Prompt */}
          <Card className="card-game text-center">
            <h2 className="text-2xl font-bold mb-4">
              {gameMode === 'who-wrote-this' ? 'Who Wrote This?' : 'Caption Cascade'}
            </h2>
            <div className="inline-block px-6 py-4 rounded-xl theme-gradient">
              <p className="text-xl font-bold text-white">{promptText}</p>
            </div>
            
            {/* Show image for caption mode */}
            {gameMode === 'caption-cascade' && currentImage && (
              <div className="mt-6">
                <img 
                  src={currentImage.url} 
                  alt={currentImage.alt}
                  className="max-w-full max-h-96 mx-auto rounded-xl shadow-lg"
                />
              </div>
            )}
          </Card>

          {/* Answer Input */}
          {!hasSubmitted ? (
            <Card className="card-game">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {gameMode === 'caption-cascade' ? 'Your Caption' : 'Your Answer'}
                  </label>
                  <Textarea
                    placeholder={gameMode === 'caption-cascade' ? 'Write a funny caption...' : 'Type your answer here...'}
                    value={playerAnswer}
                    onChange={(e) => setPlayerAnswer(e.target.value.slice(0, 200))}
                    className="min-h-[120px]"
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {playerAnswer.length}/200 characters
                  </p>
                </div>
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!playerAnswer.trim()}
                  className="w-full theme-gradient text-white font-semibold py-6 text-lg rounded-xl"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Submit {gameMode === 'caption-cascade' ? 'Caption' : 'Answer'}
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="card-game text-center">
              <div className="py-8">
                <Trophy className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
                <h3 className="text-xl font-bold">{gameMode === 'caption-cascade' ? 'Caption' : 'Answer'} Submitted!</h3>
                <p className="text-muted-foreground mt-2">Waiting for other players...</p>
              </div>
            </Card>
          )}
        </main>
      </div>
    );
  }

  // Voting Phase
  if (gamePhase === 'voting') {
    let votingPrompt = '';
    if (gameMode === 'who-wrote-this') votingPrompt = 'Vote for the Best Answer!';
    else if (gameMode === 'caption-cascade') votingPrompt = 'Vote for the Funniest Caption!';

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
          <Card className="card-game text-center">
            <h2 className="text-2xl font-bold mb-2">{votingPrompt}</h2>
            <p className="text-muted-foreground">
              {gameMode === 'caption-cascade' && currentImage && (
                <img 
                  src={currentImage.url} 
                  alt={currentImage.alt}
                  className="max-w-full max-h-64 mx-auto rounded-xl shadow-lg mt-4"
                />
              )}
            </p>
          </Card>

          <div className="grid gap-4">
            {submissions.map((submission) => {
              const isOwn = submission.playerId === currentPlayerId;
              const hasVotedFor = votes.some(v => v.submissionId === submission.id && v.voterId === currentPlayerId);
              const submissionVotes = votes.filter(v => v.submissionId === submission.id);
              const player = players.find(p => p.id === submission.playerId);

              return (
                <Card key={submission.id} className={`card-game ${hasVotedFor ? 'border-primary border-2' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      {player && (
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                          style={{
                            background: submission.avatarColor || 'linear-gradient(135deg, hsl(var(--theme-primary)), hsl(var(--theme-secondary)))'
                          }}
                        >
                          {submission.playerName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <p className="text-lg flex-1">{submission.text}</p>
                    </div>
                    
                    {submissionVotes.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {submissionVotes.map((vote, idx) => {
                          const voter = players.find(p => p.id === vote.voterId);
                          return (
                            <div 
                              key={idx}
                              className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              <span>{vote.voterName}</span>
                              {voter?.isSimulated && <Bot className="h-3 w-3" />}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <Button
                      onClick={() => handleVote(submission.id)}
                      disabled={isOwn || hasVoted}
                      variant={hasVotedFor ? "default" : "outline"}
                      className="w-full"
                    >
                      {isOwn ? `Your ${gameMode === 'caption-cascade' ? 'Caption' : 'Answer'}` : hasVotedFor ? 'Voted!' : 'Vote for This'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Recap Phase
  const winner = getWinner();
  const aiSubmission = submissions.find(s => s.isAI);

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
        {/* Winner */}
        <Card className="card-game text-center">
          <div className="inline-block p-6 rounded-full theme-gradient mb-4">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            {gameMode === 'caption-cascade' ? 'Funniest Caption!' : 'Winning Answer!'}
          </h2>
          <div className="bg-primary/10 rounded-xl p-6 mb-4">
            <p className="text-xl font-semibold">{winner.submission?.text}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {winner.votes} vote{winner.votes !== 1 ? 's' : ''}
            </p>
          </div>
          {winner.submission?.isAI && (
            <p className="text-primary font-semibold">🤖 This was the AI answer!</p>
          )}
        </Card>

        {/* AI Reveal for Who Wrote This */}
        {gameMode === 'who-wrote-this' && aiSubmission && (
          <Card className="card-game">
            <h3 className="font-bold mb-2">AI Answer Revealed:</h3>
            <div className="bg-muted rounded-xl p-4">
              <p className="text-lg">{aiSubmission.text}</p>
            </div>
          </Card>
        )}

        {/* All Captions for Caption Cascade */}
        {gameMode === 'caption-cascade' && currentImage && (
          <Card className="card-game">
            <h3 className="font-bold mb-4">All Captions</h3>
            <div className="mb-4">
              <img 
                src={currentImage.url} 
                alt={currentImage.alt}
                className="max-w-full max-h-64 mx-auto rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-3">
              {submissions.map((submission) => {
                const submissionVotes = votes.filter(v => v.submissionId === submission.id);
                return (
                  <div key={submission.id} className="bg-muted rounded-xl p-4">
                    <p className="text-lg mb-2">{submission.text}</p>
                    <p className="text-sm text-muted-foreground">
                      by {submission.playerName} • {submissionVotes.length} vote{submissionVotes.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <Button
            onClick={handlePlayAgain}
            className="w-full theme-gradient text-white font-semibold py-6 text-lg rounded-xl"
          >
            Play Again
          </Button>

          <Card className="card-game">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Share Your Results</h3>
              </div>
              <WhatsAppShareButton
                text={
                  gameMode === 'caption-cascade'
                    ? `🎉 Caption Cascade Results! 🎉\n\nWinning Caption: "${winner.submission?.text}"\nby ${winner.submission?.playerName}\n\n${winner.votes} vote${winner.votes !== 1 ? 's' : ''}!\n\nWant to play? ${roomLink}`
                    : `🎉 Quippy Game Results! 🎉\n\nPrompt: ${currentPrompt}\n\nWinner: ${winner.submission?.playerName}\nAnswer: "${winner.submission?.text}"\n\nAI Answer: "${aiSubmission?.text}"\n\nWant to play? ${roomLink}`
                }
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Room;
