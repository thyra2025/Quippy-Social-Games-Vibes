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
  {
    question: "What's the largest ocean on Earth?",
    options: ["Atlantic", "Pacific", "Indian", "Arctic"],
    correctAnswer: 1,
  },
  {
    question: "How many strings does a standard guitar have?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 2,
  },
  {
    question: "What's the smallest planet in our solar system?",
    options: ["Mars", "Mercury", "Venus", "Pluto"],
    correctAnswer: 1,
  },
  {
    question: "How many minutes are in a day?",
    options: ["1,440", "1,640", "1,240", "1,840"],
    correctAnswer: 0,
  },
  {
    question: "What year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
  },
  {
    question: "What's the hardest natural substance?",
    options: ["Gold", "Iron", "Diamond", "Titanium"],
    correctAnswer: 2,
  },
  {
    question: "How many bones are in the human body?",
    options: ["186", "206", "226", "246"],
    correctAnswer: 1,
  },
  {
    question: "What's the capital of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    correctAnswer: 2,
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
  },
  {
    question: "What's the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1,
  },
  {
    question: "How many colors in a rainbow?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
  },
  {
    question: "What's the freezing point of water in Celsius?",
    options: ["-5°C", "0°C", "5°C", "10°C"],
    correctAnswer: 1,
  },
  {
    question: "How many legs does a spider have?",
    options: ["6", "8", "10", "12"],
    correctAnswer: 1,
  },
  {
    question: "What's the speed of light?",
    options: ["186,000 mph", "186,000 km/h", "299,792 km/s", "299,792 mph"],
    correctAnswer: 2,
  },
  {
    question: "How many teeth does an adult human have?",
    options: ["28", "30", "32", "34"],
    correctAnswer: 2,
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
