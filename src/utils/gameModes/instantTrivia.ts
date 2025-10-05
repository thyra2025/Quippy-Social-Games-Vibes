import { TriviaQuestion } from '@/types/game';

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    question: "What's the most spoken language in the world?",
    options: ["English", "Mandarin Chinese", "Spanish", "Hindi"],
    correctAnswer: 1,
  },
  {
    question: "Which planet is closest to the sun?",
    options: ["Venus", "Mars", "Mercury", "Earth"],
    correctAnswer: 2,
  },
  {
    question: "What year did the iPhone first release?",
    options: ["2005", "2007", "2009", "2010"],
    correctAnswer: 1,
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
  },
  {
    question: "What's the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: 2,
  },
  {
    question: "Which animal is the fastest on land?",
    options: ["Lion", "Cheetah", "Horse", "Gazelle"],
    correctAnswer: 1,
  },
  {
    question: "How many hearts does an octopus have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
  },
  {
    question: "What's the smallest country in the world?",
    options: ["Monaco", "Vatican City", "Malta", "Luxembourg"],
    correctAnswer: 1,
  },
  {
    question: "Which element has the symbol 'Au'?",
    options: ["Silver", "Aluminum", "Gold", "Argon"],
    correctAnswer: 2,
  },
  {
    question: "How many keys are on a standard piano?",
    options: ["66", "76", "88", "98"],
    correctAnswer: 2,
  },
];

export function getRandomQuestions(count: number = 3): TriviaQuestion[] {
  const shuffled = [...TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function shouldSimulatedPlayerAnswerCorrectly(): boolean {
  // 40-60% chance of getting it right
  return Math.random() < 0.4 + Math.random() * 0.2;
}
