export interface GameRecap {
  id: string;
  roomId: string;
  gameMode: string;
  gameModeName: string;
  gameModeIcon: string;
  prompt: string;
  winnerInfo: string;
  timestamp: number;
  submissions: Array<{
    id: string;
    text: string;
    playerId: string;
    playerName: string;
    isAI?: boolean;
    votes?: number;
  }>;
  triviaQuestion?: string;
  triviaCorrectAnswer?: string;
  triviaAnswers?: Array<{
    playerId: string;
    playerName: string;
    isCorrect: boolean;
  }>;
}
