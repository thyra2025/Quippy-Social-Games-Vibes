export type GameMode = 'who-wrote-this' | 'caption-cascade' | 'two-truths' | 'instant-trivia';

export interface GameModeConfig {
  id: GameMode;
  name: string;
  description: string;
  icon: string;
}

export const GAME_MODES: GameModeConfig[] = [
  {
    id: 'who-wrote-this',
    name: 'Who Wrote This?',
    description: 'Spot the AI-generated answer among real responses',
    icon: '🤔',
  },
  {
    id: 'caption-cascade',
    name: 'Caption Cascade',
    description: 'Write the funniest caption for a hilarious image',
    icon: '📸',
  },
  {
    id: 'two-truths',
    name: 'Two Truths and a Bot',
    description: 'Guess which statement was written by AI',
    icon: '🤖',
  },
  {
    id: 'instant-trivia',
    name: 'Instant Trivia',
    description: 'Answer trivia questions and rack up points',
    icon: '🧠',
  },
];

export interface Submission {
  id: string;
  text: string;
  playerId: string;
  playerName: string;
  isAI: boolean;
  avatarColor?: string;
}

export interface Vote {
  voterId: string;
  voterName: string;
  submissionId: string;
  isSimulated?: boolean;
}

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct answer (0-3)
}

export interface TriviaAnswer {
  playerId: string;
  playerName: string;
  selectedAnswer: number;
  isCorrect: boolean;
  isSimulated?: boolean;
}
