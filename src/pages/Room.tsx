import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Trophy, MessageCircle, Clock, Send, Bot, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ThemeSelector } from '@/components/ThemeSelector';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton';
import { generateRoomLink } from '@/utils/whatsapp';
import { useCountdown } from '@/hooks/useCountdown';
import { toast } from '@/hooks/use-toast';
import { Player } from '@/pages/Lobby';
import { getRandomSimulatedAnswer } from '@/utils/simulatedPlayers';
import { GameMode, Submission, Vote, TriviaQuestion, TriviaAnswer, GAME_MODES } from '@/types/game';
import { getRandomPrompt, getAIAnswer, getSimulatedAnswer } from '@/utils/gameModes/whoWroteThis';
import { getRandomImage, getRandomCaption, CaptionImage } from '@/utils/gameModes/captionCascade';
import { getRandomAIStatement, getRandomStatement } from '@/utils/gameModes/twoTruths';
import { getRandomQuestion, shouldSimulatedPlayerAnswerCorrectly } from '@/utils/gameModes/instantTrivia';
import { saveRecap } from '@/utils/partyFeedStorage';
import { GameRecap } from '@/types/partyFeed';

type GamePhase = 'lobby' | 'playing' | 'voting' | 'reveal' | 'recap';

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  
  const gameMode: GameMode = location.state?.gameMode || 'who-wrote-this';
  const players = (location.state?.players as Player[]) || [];
  const currentPlayerId = location.state?.currentPlayerId || Math.random().toString(36).substring(2, 9);
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  const currentPlayerName = currentPlayer?.name || 'Player';
  const simulatedPlayers = players.filter(p => p.isSimulated);

  const [gamePhase, setGamePhase] = useState<GamePhase>('lobby');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [currentImage, setCurrentImage] = useState<CaptionImage | null>(null);
  const [currentTriviaQuestion, setCurrentTriviaQuestion] = useState<TriviaQuestion | null>(null);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [usedAnswerIndices, setUsedAnswerIndices] = useState<number[]>([]);
  const [triviaAnswers, setTriviaAnswers] = useState<TriviaAnswer[]>([]);
  const [selectedTriviaAnswer, setSelectedTriviaAnswer] = useState<number | null>(null);

  const timerDuration = gameMode === 'instant-trivia' ? 30 : 45;
  const { seconds, start: startTimer, reset: resetTimer } = useCountdown(timerDuration, () => {
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

  // Save recap when game ends
  useEffect(() => {
    if (gamePhase === 'recap' && roomId) {
      const gameModeConfig = GAME_MODES.find(m => m.id === gameMode);
      const winner = getWinner();
      const aiSubmission = submissions.find(s => s.isAI);
      
      let winnerInfo = '';
      let prompt = '';
      
      if (gameMode === 'instant-trivia' && currentTriviaQuestion) {
        const correctCount = triviaAnswers.filter(a => a.isCorrect).length;
        winnerInfo = correctCount === 0 
          ? 'Nobody got it right!' 
          : `${correctCount} player${correctCount !== 1 ? 's' : ''} answered correctly`;
        prompt = currentTriviaQuestion.question;
      } else if (gameMode === 'two-truths') {
        winnerInfo = `${winner.submission?.playerName} - Everyone believed: "${winner.submission?.text}"`;
        prompt = 'Write one true statement about yourself';
      } else if (gameMode === 'caption-cascade') {
        winnerInfo = `${winner.submission?.playerName} - ${winner.votes} vote${winner.votes !== 1 ? 's' : ''}`;
        prompt = 'Write the funniest caption';
      } else {
        winnerInfo = `${winner.submission?.playerName} - ${winner.votes} vote${winner.votes !== 1 ? 's' : ''}`;
        prompt = currentPrompt;
      }

      const recap: GameRecap = {
        id: Math.random().toString(36).substring(2, 9),
        roomId,
        gameMode,
        gameModeName: gameModeConfig?.name || '',
        gameModeIcon: gameModeConfig?.icon || '🎮',
        prompt,
        winnerInfo,
        timestamp: Date.now(),
        submissions: submissions.map(s => ({
          id: s.id,
          text: s.text,
          playerId: s.playerId,
          playerName: s.playerName,
          isAI: s.isAI,
          votes: votes.filter(v => v.submissionId === s.id).length,
        })),
        ...(gameMode === 'instant-trivia' && currentTriviaQuestion && {
          triviaQuestion: currentTriviaQuestion.question,
          triviaCorrectAnswer: currentTriviaQuestion.options[currentTriviaQuestion.correctAnswer],
          triviaAnswers: triviaAnswers.map(a => ({
            playerId: a.playerId,
            playerName: a.playerName,
            isCorrect: a.isCorrect,
          })),
        }),
      };

      saveRecap(roomId, recap);
      console.log('💾 Recap saved:', recap);
    }
  }, [gamePhase, roomId]);

  const startGame = () => {
    if (gameMode === 'who-wrote-this') {
      setCurrentPrompt(getRandomPrompt(language));
    } else if (gameMode === 'caption-cascade') {
      setCurrentImage(getRandomImage());
    } else if (gameMode === 'two-truths') {
      setCurrentPrompt(t('writeTrueStatement'));
    } else if (gameMode === 'instant-trivia') {
      setCurrentTriviaQuestion(getRandomQuestion(language));
    }
    setGamePhase('playing');
    startTimer();
  };

  // Simulated players auto-submit answers
  useEffect(() => {
    if (gamePhase !== 'playing' || simulatedPlayers.length === 0) return;

    simulatedPlayers.forEach((player) => {
      const delay = gameMode === 'instant-trivia' 
        ? 10000 + Math.random() * 10000  // 10-20 seconds for trivia
        : 15000 + Math.random() * 20000;
      
      const timerId = setTimeout(() => {
        if (gameMode === 'instant-trivia' && currentTriviaQuestion) {
          // Trivia mode: select an answer
          const isCorrect = shouldSimulatedPlayerAnswerCorrectly();
          const selectedAnswer = isCorrect 
            ? currentTriviaQuestion.correctAnswer
            : Math.floor(Math.random() * currentTriviaQuestion.options.length);
          
          const triviaAnswer: TriviaAnswer = {
            playerId: player.id,
            playerName: player.name,
            selectedAnswer,
            isCorrect: selectedAnswer === currentTriviaQuestion.correctAnswer,
            isSimulated: true,
          };
          
          setTriviaAnswers(prev => [...prev, triviaAnswer]);
        } else {
          // Other modes: text submission
          let answerText = '';
          
          if (gameMode === 'who-wrote-this') {
            answerText = getSimulatedAnswer(currentPrompt, language);
          } else if (gameMode === 'caption-cascade') {
            answerText = getRandomCaption(language);
          } else if (gameMode === 'two-truths') {
            answerText = getRandomStatement(language);
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
        }
      }, delay);

      return () => clearTimeout(timerId);
    });
  }, [gamePhase, simulatedPlayers.length, gameMode, currentTriviaQuestion]);

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

  const handleTriviaAnswer = (answerIndex: number) => {
    if (!currentTriviaQuestion || selectedTriviaAnswer !== null) return;

    setSelectedTriviaAnswer(answerIndex);
    
    const isCorrect = answerIndex === currentTriviaQuestion.correctAnswer;
    const triviaAnswer: TriviaAnswer = {
      playerId: currentPlayerId,
      playerName: currentPlayerName,
      selectedAnswer: answerIndex,
      isCorrect,
      isSimulated: false,
    };

    setTriviaAnswers(prev => [...prev, triviaAnswer]);
    
    toast({
      title: "Answer submitted!",
      description: "Waiting for other players...",
    });

    const totalPlayers = 1 + simulatedPlayers.length;
    if (triviaAnswers.length + 1 >= totalPlayers) {
      setTimeout(() => {
        handlePlayingPhaseEnd();
      }, 1000);
    }
  };

  const handlePlayingPhaseEnd = () => {
    if (gameMode === 'instant-trivia') {
      // For trivia, go to reveal phase instead of voting
      resetTimer();
      setGamePhase('reveal');
      // Auto-advance to recap after 5 seconds
      setTimeout(() => {
        setGamePhase('recap');
      }, 5000);
      return;
    }

    // Add AI submission for Who Wrote This and Two Truths modes
    if (gameMode === 'who-wrote-this') {
      const aiSubmission: Submission = {
        id: 'ai-' + Math.random().toString(36).substring(2, 9),
        text: getAIAnswer(currentPrompt, language),
        playerId: 'ai',
        playerName: 'AI',
        isAI: true
      };
      console.log('🤖 AI submission created:', { text: aiSubmission.text, isAI: aiSubmission.isAI });
      setSubmissions(prev => {
        const allSubmissions = [...prev, aiSubmission];
        return allSubmissions.sort(() => Math.random() - 0.5);
      });
    } else if (gameMode === 'two-truths') {
      const aiSubmission: Submission = {
        id: 'ai-' + Math.random().toString(36).substring(2, 9),
        text: getRandomAIStatement(language),
        playerId: 'ai',
        playerName: 'AI',
        isAI: true
      };
      console.log('🤖 AI statement created:', { text: aiSubmission.text, isAI: aiSubmission.isAI });
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

        // For Two Truths mode, bots can vote for AI (trying to guess which is fake)
        // For other modes, filter out AI and own submissions
        let votableSubmissions: Submission[];
        if (gameMode === 'two-truths') {
          votableSubmissions = submissions.filter(s => s.playerId !== player.id);
        } else {
          votableSubmissions = submissions.filter(s => !s.isAI && s.playerId !== player.id);
        }

        console.log('✅', player.name, 'votable options:', votableSubmissions.length, 'submissions');

        if (votableSubmissions.length === 0) {
          console.log('⚠️ No votable submissions for', player.name);
          return;
        }

        // Slightly favor longer/funnier answers, or "too good to be true" for Two Truths
        const weights = votableSubmissions.map(s => {
          let weight = 1;
          if (gameMode === 'two-truths') {
            // Slight bias toward impressive/unusual statements
            if (/celebrity|languages|countries|marathon|game show/i.test(s.text)) weight += 0.5;
            if (s.isAI) weight += 0.3; // Slight bias to vote for AI
          } else {
            if (s.text.length > 50) weight += 0.3;
            if (/cat|coffee|dog|quantum|wikipedia|tiktok/i.test(s.text)) weight += 0.4;
          }
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

        // DEFENSIVE CHECK (only for non-two-truths modes)
        if (gameMode !== 'two-truths' && chosenSubmission.isAI) {
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
    setTriviaAnswers([]);
    setSelectedTriviaAnswer(null);
    setCurrentTriviaQuestion(null);
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

    if (gameMode === 'two-truths') {
      // Winner is the human statement with FEWEST votes (most believed)
      // Also track who voted for AI correctly
      const aiSubmission = submissions.find(s => s.isAI);
      const aiVotes = aiSubmission ? voteCounts[aiSubmission.id] || 0 : 0;
      
      let minVotes = Infinity;
      let winnerId = '';
      
      submissions.filter(s => !s.isAI).forEach((submission) => {
        const voteCount = voteCounts[submission.id] || 0;
        if (voteCount < minVotes) {
          minVotes = voteCount;
          winnerId = submission.id;
        }
      });

      return {
        submission: submissions.find(s => s.id === winnerId),
        votes: minVotes,
        aiVotes,
      };
    } else {
      // Standard: most votes wins
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
    }
  };

  const roomLink = generateRoomLink(roomId || '');

  // Lobby Phase
  if (gamePhase === 'lobby') {
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
    else if (gameMode === 'caption-cascade') promptText = t('writeCaption');
    else if (gameMode === 'two-truths') promptText = t('writeTrueStatement');

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

        <main className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
          {/* Timer */}
          <Card className="card-game">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-semibold">{t('timeRemaining')}</span>
              </div>
              <div className="text-3xl font-bold text-primary">{seconds}s</div>
            </div>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full theme-gradient transition-all duration-1000"
                style={{ width: `${(seconds / timerDuration) * 100}%` }}
              />
            </div>
          </Card>

          {/* Prompt */}
          <Card className="card-game text-center">
            <h2 className="text-2xl font-bold mb-4">
              {gameMode === 'who-wrote-this' ? t('whoWroteThis') : 
               gameMode === 'caption-cascade' ? t('captionCascade') : 
               gameMode === 'instant-trivia' ? t('instantTrivia') :
               t('twoTruthsBot')}
            </h2>
            {gameMode === 'instant-trivia' && currentTriviaQuestion ? (
              <div className="space-y-4">
                <div className="bg-primary/10 rounded-xl p-6">
                  <p className="text-xl font-bold">{currentTriviaQuestion.question}</p>
                </div>
              </div>
            ) : (
              <div className="inline-block px-6 py-4 rounded-xl theme-gradient">
                <p className="text-xl font-bold text-white">{promptText}</p>
              </div>
            )}
            
            {/* Show image for caption mode */}
            {gameMode === 'caption-cascade' && currentImage && (
              <div className="mt-6">
                <img 
                  src={currentImage.url} 
                  alt={currentImage.alt}
                  className="max-w-full max-h-96 mx-auto rounded-xl shadow-lg"
                  onError={(e) => {
                    console.error('Image failed to load:', currentImage.url);
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400';
                  }}
                />
              </div>
            )}
          </Card>

          {/* Answer Input */}
          {gameMode === 'instant-trivia' && currentTriviaQuestion ? (
            /* Trivia Answer Buttons */
            <Card className="card-game">
              <div className="grid grid-cols-1 gap-3">
                {currentTriviaQuestion.options.map((option, index) => {
                  const isSelected = selectedTriviaAnswer === index;
                  const answerLabel = String.fromCharCode(65 + index); // A, B, C, D
                  
                  return (
                    <Button
                      key={index}
                      onClick={() => handleTriviaAnswer(index)}
                      disabled={selectedTriviaAnswer !== null}
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full py-6 text-lg justify-start ${
                        isSelected ? 'theme-gradient text-white font-bold' : ''
                      }`}
                    >
                      <span className="mr-3 font-bold">{answerLabel}.</span>
                      {option}
                      {isSelected && <CheckCircle2 className="ml-auto h-5 w-5" />}
                    </Button>
                  );
                })}
              </div>
              {selectedTriviaAnswer !== null && (
                <p className="text-center text-muted-foreground mt-4">
                  Answer submitted! Waiting for others...
                </p>
              )}
            </Card>
          ) : !hasSubmitted ? (
            <Card className="card-game">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {gameMode === 'caption-cascade' ? t('submitCaption') : 
                     gameMode === 'two-truths' ? t('submitStatement') : 
                     t('yourAnswer')}
                  </label>
                  <Textarea
                    placeholder={
                      gameMode === 'caption-cascade' ? t('placeholderCaption') : 
                      gameMode === 'two-truths' ? t('placeholderTruth') :
                      t('placeholderAnswer')
                    }
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
                  {gameMode === 'caption-cascade' ? t('submitCaption') : 
                   gameMode === 'two-truths' ? t('submitStatement') : 
                   t('submitAnswer')}
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="card-game text-center">
              <div className="py-8">
                <Trophy className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
                <h3 className="text-xl font-bold">
                  {gameMode === 'caption-cascade' ? t('submitCaption') : 
                   gameMode === 'two-truths' ? t('submitStatement') : 
                   t('submitAnswer')}!
                </h3>
                <p className="text-muted-foreground mt-2">{t('waiting')}</p>
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
    let votingInstruction = '';
    if (gameMode === 'who-wrote-this') {
      votingPrompt = 'Vote for the Best Answer!';
      votingInstruction = 'Which one did you like the most?';
    } else if (gameMode === 'caption-cascade') {
      votingPrompt = 'Vote for the Funniest Caption!';
      votingInstruction = 'Which one made you laugh?';
    } else if (gameMode === 'two-truths') {
      votingPrompt = 'Which statement do you think the AI wrote?';
      votingInstruction = 'Vote for the statement you think is fake';
    }

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

        <main className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
          <Card className="card-game text-center">
            <h2 className="text-2xl font-bold mb-2">{votingPrompt}</h2>
            <p className="text-muted-foreground">{t('voting')}</p>
            {gameMode === 'caption-cascade' && currentImage && (
              <div className="mt-4">
                <img 
                  src={currentImage.url} 
                  alt={currentImage.alt}
                  className="max-w-full max-h-64 mx-auto rounded-xl shadow-lg"
                  onError={(e) => {
                    console.error('Image failed to load:', currentImage.url);
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400';
                  }}
                />
              </div>
            )}
          </Card>

          <div className="grid gap-4">
            {submissions.map((submission) => {
              const isOwn = submission.playerId === currentPlayerId && gameMode !== 'two-truths';
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
                      {(() => {
                        const isMySubmission = submission.playerId === currentPlayerId;
                        if (isMySubmission) {
                          switch (gameMode) {
                            case 'caption-cascade': return 'Your Caption';
                            case 'two-truths': return 'Your Statement';
                            case 'who-wrote-this': return 'Your Answer';
                          }
                        }
                        if (hasVotedFor) return 'Voted!';
                        if (gameMode === 'two-truths') return t('voteAsFake');
                        return 'Vote for This';
                      })()}
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

  // Reveal Phase (for Trivia)
  if (gamePhase === 'reveal' && gameMode === 'instant-trivia' && currentTriviaQuestion) {
    const correctAnswers = triviaAnswers.filter(a => a.isCorrect);
    
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

        <main className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
          <Card className="card-game text-center">
            <h2 className="text-2xl font-bold mb-4">Results!</h2>
            <div className="bg-primary/10 rounded-xl p-6 mb-6">
              <p className="text-xl font-bold mb-4">{currentTriviaQuestion.question}</p>
            </div>
          </Card>

          {/* Answer Options with Results */}
          <div className="grid grid-cols-1 gap-3">
            {currentTriviaQuestion.options.map((option, index) => {
              const isCorrect = index === currentTriviaQuestion.correctAnswer;
              const answersForThis = triviaAnswers.filter(a => a.selectedAnswer === index);
              const answerLabel = String.fromCharCode(65 + index); // A, B, C, D
              
              return (
                <Card 
                  key={index}
                  className={`card-game ${
                    isCorrect 
                      ? 'border-green-500 border-2 bg-green-500/10' 
                      : 'bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">{answerLabel}.</span>
                      <span className="text-lg">{option}</span>
                      {isCorrect && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>
                  {answersForThis.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {answersForThis.map((answer, idx) => (
                        <div 
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full ${
                            isCorrect 
                              ? 'bg-green-500/20 text-green-700' 
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {answer.playerName}
                          {answer.isSimulated && <Bot className="inline h-3 w-3 ml-1" />}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <Card className="card-game text-center">
            <p className="text-muted-foreground">
              {correctAnswers.length === 0 
                ? "Nobody got it right!" 
                : `${correctAnswers.length} player${correctAnswers.length !== 1 ? 's' : ''} got it right!`
              }
            </p>
          </Card>
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
          {t('leave')}
        </Button>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeSelector />
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
        {gameMode === 'instant-trivia' && currentTriviaQuestion ? (
          /* Trivia Recap */
          <>
            <Card className="card-game text-center">
              <div className="inline-block p-6 rounded-full theme-gradient mb-4">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Trivia Results!</h2>
              <div className="bg-primary/10 rounded-xl p-6 mb-4">
                <p className="text-lg font-semibold mb-3">{currentTriviaQuestion.question}</p>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <p className="text-xl font-bold text-green-600">
                    {currentTriviaQuestion.options[currentTriviaQuestion.correctAnswer]}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="card-game">
              <h3 className="font-bold mb-3">Correct Answers:</h3>
              {triviaAnswers.filter(a => a.isCorrect).length === 0 ? (
                <p className="text-muted-foreground text-center py-4">Nobody got it right!</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {triviaAnswers.filter(a => a.isCorrect).map((answer, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 bg-green-500/10 text-green-700 px-3 py-2 rounded-full"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="font-medium">{answer.playerName}</span>
                      {answer.isSimulated && <Bot className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </>
        ) : (
          /* Non-Trivia Recap */
          <>
            {/* Winner */}
            <Card className="card-game text-center">
              <div className="inline-block p-6 rounded-full theme-gradient mb-4">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                {gameMode === 'caption-cascade' ? 'Funniest Caption!' : 
                 gameMode === 'two-truths' ? 'Most Believed Statement!' : 
                 'Winning Answer!'}
              </h2>
              <div className="bg-primary/10 rounded-xl p-6 mb-4">
                <p className="text-xl font-semibold">{winner.submission?.text}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {gameMode === 'two-truths' 
                    ? `Only ${winner.votes} vote${winner.votes !== 1 ? 's' : ''} thought this was fake!`
                    : `${winner.votes} vote${winner.votes !== 1 ? 's' : ''}`
                  }
                </p>
                {gameMode === 'two-truths' && winner.submission && (
                  <p className="text-primary font-semibold mt-2">
                    by {winner.submission.playerName}
                  </p>
                )}
              </div>
              {winner.submission?.isAI && gameMode !== 'two-truths' && (
                <p className="text-primary font-semibold">🤖 This was the AI answer!</p>
              )}
            </Card>

            {/* AI Reveal for Who Wrote This and Two Truths */}
            {(gameMode === 'who-wrote-this' || gameMode === 'two-truths') && aiSubmission && (
              <Card className="card-game">
                <h3 className="font-bold mb-2">
                  {gameMode === 'two-truths' ? 'AI Fake Statement Revealed:' : 'AI Answer Revealed:'}
                </h3>
                <div className="bg-muted rounded-xl p-4 mb-2">
                  <p className="text-lg">{aiSubmission.text}</p>
                </div>
                {gameMode === 'two-truths' && (
                  <p className="text-sm text-muted-foreground">
                    {winner.aiVotes || 0} player{(winner.aiVotes || 0) !== 1 ? 's' : ''} correctly guessed this was fake!
                  </p>
                )}
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
                    onError={(e) => {
                      console.error('Image failed to load:', currentImage.url);
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400';
                    }}
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
          </>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <Button
            onClick={handlePlayAgain}
            className="w-full theme-gradient text-white font-semibold py-6 text-lg rounded-xl"
          >
            {t('playAgain')}
          </Button>

          <Card className="card-game">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{t('shareWhatsApp')}</h3>
              </div>
              <WhatsAppShareButton
                text={
                  gameMode === 'instant-trivia' && currentTriviaQuestion
                    ? `⚡ Instant Trivia Results! ⚡\n\nQuestion: ${currentTriviaQuestion.question}\nCorrect: ${currentTriviaQuestion.options[currentTriviaQuestion.correctAnswer]}\n\n${triviaAnswers.filter(a => a.isCorrect).length} player${triviaAnswers.filter(a => a.isCorrect).length !== 1 ? 's' : ''} got it right!\n\nWant to play? ${roomLink}`
                    : gameMode === 'caption-cascade'
                    ? `🎉 Caption Cascade Results! 🎉\n\nWinning Caption: "${winner.submission?.text}"\nby ${winner.submission?.playerName}\n\n${winner.votes} vote${winner.votes !== 1 ? 's' : ''}!\n\nWant to play? ${roomLink}`
                    : gameMode === 'two-truths'
                    ? `🎉 Two Truths and a Bot Results! 🎉\n\nMost Believed: "${winner.submission?.text}"\nby ${winner.submission?.playerName}\n\nAI Fake: "${aiSubmission?.text}"\n${winner.aiVotes || 0} guessed correctly!\n\nWant to play? ${roomLink}`
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
