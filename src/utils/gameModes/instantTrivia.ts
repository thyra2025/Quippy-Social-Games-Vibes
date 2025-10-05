import { TriviaQuestion } from '@/types/game';

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    question: "Which planet is closest to the sun?",
    options: ["Venus", "Mercury", "Mars", "Earth"],
    correctAnswer: 1,
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
  },
  {
    question: "What's the fastest land animal?",
    options: ["Lion", "Cheetah", "Horse", "Gazelle"],
    correctAnswer: 1,
  },
  {
    question: "How many hearts does an octopus have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
  },
  {
    question: "What element has symbol 'Au'?",
    options: ["Silver", "Gold", "Copper", "Aluminum"],
    correctAnswer: 1,
  },
];

export function getRandomQuestion(): TriviaQuestion {
  const randomIndex = Math.floor(Math.random() * TRIVIA_QUESTIONS.length);
  return TRIVIA_QUESTIONS[randomIndex];
}

export function shouldSimulatedPlayerAnswerCorrectly(): boolean {
  // 50% chance of getting it right
  return Math.random() < 0.5;
}
