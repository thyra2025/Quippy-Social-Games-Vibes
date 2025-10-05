import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LogOut, Trophy, MessageCircle, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ThemeSelector } from '@/components/ThemeSelector';
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton';
import { generateRoomLink } from '@/utils/whatsapp';
import { useCountdown } from '@/hooks/useCountdown';
import { toast } from '@/hooks/use-toast';

type GamePhase = 'lobby' | 'playing' | 'voting' | 'recap';

interface Submission {
  id: string;
  text: string;
  playerId: string;
  playerName: string;
  isAI: boolean;
}

interface Vote {
  voterId: string;
  submissionId: string;
}

const PROMPTS = [
  "What's the worst excuse for being late?",
  "What's the most ridiculous thing you've ever Googled?",
  "What would your autobiography be titled?",
  "What's your superhero name and power?",
  "What's the weirdest thing in your search history?"
];

const AI_ANSWERS = [
  "I got stuck in a parallel universe for a bit",
  "How to train my pet rock to do tricks",
  "The Chronicles of Procrastination: A Work in Progress",
  "Captain Obvious with the power of stating the obvious",
  "celebrity name + 'feet pics' (it was for science)"
];

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  
  const [gamePhase, setGamePhase] = useState<GamePhase>('lobby');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [currentPlayerId] = useState(() => Math.random().toString(36).substring(2, 9));
  const [currentPlayerName] = useState('Player'); // Would come from lobby in real implementation

  const { seconds, start: startTimer, reset: resetTimer } = useCountdown(45, () => {
    if (gamePhase === 'playing') {
      handlePlayingPhaseEnd();
    }
  });

  useEffect(() => {
    // Simulate starting game from lobby
    if (gamePhase === 'lobby') {
      const timer = setTimeout(() => startGame(), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const startGame = () => {
    const promptIndex = Math.floor(Math.random() * PROMPTS.length);
    setCurrentPrompt(PROMPTS[promptIndex]);
    setGamePhase('playing');
    startTimer();
  };

  const handleSubmitAnswer = () => {
    if (!playerAnswer.trim()) return;

    const newSubmission: Submission = {
      id: Math.random().toString(36).substring(2, 9),
      text: playerAnswer,
      playerId: currentPlayerId,
      playerName: currentPlayerName,
      isAI: false
    };

    setSubmissions(prev => [...prev, newSubmission]);
    setHasSubmitted(true);
    setPlayerAnswer('');
    
    toast({
      title: "Submitted!",
      description: "Waiting for other players...",
    });

    // Simulate other players finishing
    setTimeout(() => {
      handlePlayingPhaseEnd();
    }, 3000);
  };

  const handlePlayingPhaseEnd = () => {
    // Add AI submission
    const aiIndex = Math.floor(Math.random() * AI_ANSWERS.length);
    const aiSubmission: Submission = {
      id: 'ai-' + Math.random().toString(36).substring(2, 9),
      text: AI_ANSWERS[aiIndex],
      playerId: 'ai',
      playerName: 'AI',
      isAI: true
    };

    setSubmissions(prev => {
      const allSubmissions = [...prev, aiSubmission];
      // Shuffle submissions
      return allSubmissions.sort(() => Math.random() - 0.5);
    });

    resetTimer();
    setGamePhase('voting');
  };

  const handleVote = (submissionId: string) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (submission?.playerId === currentPlayerId) {
      toast({
        title: "Can't vote for yourself!",
        variant: "destructive",
      });
      return;
    }

    const newVote: Vote = {
      voterId: currentPlayerId,
      submissionId
    };

    setVotes(prev => [...prev, newVote]);
    setHasVoted(true);

    toast({
      title: "Vote recorded!",
      description: "Waiting for other players...",
    });

    // Simulate voting end
    setTimeout(() => {
      setGamePhase('recap');
    }, 2000);
  };

  const handlePlayAgain = () => {
    setSubmissions([]);
    setVotes([]);
    setHasSubmitted(false);
    setHasVoted(false);
    setPlayerAnswer('');
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
  const shareMessage = `🎉 Playing Quippy!\nRoom: ${roomId}\nJoin us!`;

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
            <h2 className="text-2xl font-bold mb-2">Who Wrote This?</h2>
            <div className="inline-block px-6 py-4 rounded-xl theme-gradient">
              <p className="text-xl font-bold text-white">{currentPrompt}</p>
            </div>
          </Card>

          {/* Answer Input */}
          {!hasSubmitted ? (
            <Card className="card-game">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Answer</label>
                  <Textarea
                    placeholder="Type your answer here..."
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
                  Submit Answer
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="card-game text-center">
              <div className="py-8">
                <Trophy className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
                <h3 className="text-xl font-bold">Answer Submitted!</h3>
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
            <h2 className="text-2xl font-bold mb-2">Vote for the Best Answer!</h2>
            <p className="text-muted-foreground">Which one did you like the most?</p>
          </Card>

          <div className="grid gap-4">
            {submissions.map((submission) => {
              const isOwn = submission.playerId === currentPlayerId;
              const hasVotedFor = votes.some(v => v.submissionId === submission.id && v.voterId === currentPlayerId);

              return (
                <Card key={submission.id} className={`card-game ${hasVotedFor ? 'border-primary border-2' : ''}`}>
                  <div className="space-y-4">
                    <p className="text-lg">{submission.text}</p>
                    <Button
                      onClick={() => handleVote(submission.id)}
                      disabled={isOwn || hasVoted}
                      variant={hasVotedFor ? "default" : "outline"}
                      className="w-full"
                    >
                      {isOwn ? 'Your Answer' : hasVotedFor ? 'Voted!' : 'Vote for This'}
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
          <h2 className="text-2xl font-bold mb-4">Winning Answer!</h2>
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

        {/* AI Reveal */}
        <Card className="card-game">
          <h3 className="font-bold mb-2">AI Answer Revealed:</h3>
          <div className="bg-muted rounded-xl p-4">
            <p className="text-lg">{aiSubmission?.text}</p>
          </div>
        </Card>

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
                text={`🎉 Just played Quippy!\nWinning answer: "${winner.submission?.text}"\nJoin us!`}
                url={roomLink}
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Room;
