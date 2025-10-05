import { TriviaQuestion } from '@/types/game';

export const TRIVIA_QUESTIONS_BY_LANGUAGE: Record<string, TriviaQuestion[]> = {
  en: [
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
  ],
  es: [
    {
      question: "¿Cuál es el océano más grande del mundo?",
      options: ["Atlántico", "Pacífico", "Índico", "Ártico"],
      correctAnswer: 1,
    },
    {
      question: "¿Cuántos continentes hay?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
    },
    {
      question: "¿Cuál es el animal terrestre más rápido?",
      options: ["León", "Guepardo", "Caballo", "Gacela"],
      correctAnswer: 1,
    },
    {
      question: "¿Cuántos corazones tiene un pulpo?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
    },
    {
      question: "¿Cuál es la capital de Brasil?",
      options: ["São Paulo", "Río de Janeiro", "Brasília", "Salvador"],
      correctAnswer: 2,
    },
  ],
  fr: [
    {
      question: "Quel est le plus grand océan du monde?",
      options: ["Atlantique", "Pacifique", "Indien", "Arctique"],
      correctAnswer: 1,
    },
    {
      question: "Combien y a-t-il de continents?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
    },
    {
      question: "Quel est l'animal terrestre le plus rapide?",
      options: ["Lion", "Guépard", "Cheval", "Gazelle"],
      correctAnswer: 1,
    },
    {
      question: "Combien de cœurs a une pieuvre?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
    },
    {
      question: "Quelle est la capitale du Nigeria?",
      options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
      correctAnswer: 1,
    },
  ],
  pt: [
    {
      question: "Qual é o maior oceano do mundo?",
      options: ["Atlântico", "Pacífico", "Índico", "Ártico"],
      correctAnswer: 1,
    },
    {
      question: "Quantos continentes existem?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
    },
    {
      question: "Qual é o animal terrestre mais rápido?",
      options: ["Leão", "Guepardo", "Cavalo", "Gazela"],
      correctAnswer: 1,
    },
    {
      question: "Quantos corações tem um polvo?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
    },
    {
      question: "Qual é a capital do Brasil?",
      options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
      correctAnswer: 2,
    },
  ],
  pidgin: [
    {
      question: "Which ocean big pass for this world?",
      options: ["Atlantic", "Pacific", "Indian", "Arctic"],
      correctAnswer: 1,
    },
    {
      question: "How many continent we get for world?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
    },
    {
      question: "Which animal dey run fast pass for land?",
      options: ["Lion", "Cheetah", "Horse", "Gazelle"],
      correctAnswer: 1,
    },
    {
      question: "How many heart octopus get?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
    },
    {
      question: "Wetin be the capital of Nigeria?",
      options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
      correctAnswer: 1,
    },
  ],
};

export function getRandomQuestion(language: string = 'en'): TriviaQuestion {
  const questions = TRIVIA_QUESTIONS_BY_LANGUAGE[language] || TRIVIA_QUESTIONS_BY_LANGUAGE.en;
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

export function shouldSimulatedPlayerAnswerCorrectly(): boolean {
  // 50% chance of getting it right
  return Math.random() < 0.5;
}
