import { Player } from '@/pages/Lobby';

const SIMULATED_NAMES = [
  'Sofia', 'Marcus', 'Aisha', 'Chen', 'Diego', 'Priya',
  'Omar', 'Yuki', 'Amara', 'Liam', 'Zara', 'Kwame'
];

export const SIMULATED_ANSWERS = [
  "My cat literally deleted my alarm app",
  "I got stuck in a Wikipedia loop about ancient bread",
  "I was perfecting my ratio of milk to cereal",
  "My neighbor's karaoke session was too fascinating",
  "I accidentally walked into the wrong Zoom meeting",
  "My coffee machine staged a rebellion",
  "I was debugging why my plant was sad",
  "I got distracted ranking all the Chrises in Marvel",
  "My sock drawer needed immediate reorganization",
  "I was teaching my dog quantum physics",
  "I fell into a TikTok hole about medieval times",
  "I was calculating the optimal pillow arrangement"
];

const AVATAR_COLORS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #f8b500 0%, #fceabb 100%)',
];

export const generateSimulatedPlayers = (): Player[] => {
  const count = 2 + Math.floor(Math.random() * 3); // 2-4 players
  const shuffledNames = [...SIMULATED_NAMES].sort(() => Math.random() - 0.5);
  const shuffledColors = [...AVATAR_COLORS].sort(() => Math.random() - 0.5);

  return shuffledNames.slice(0, count).map((name, index) => ({
    id: `sim-${Math.random().toString(36).substring(2, 9)}`,
    name,
    isHost: false,
    isSimulated: true,
    avatarColor: shuffledColors[index],
  }));
};

export const getRandomSimulatedAnswer = (usedIndices: number[] = []): { answer: string; index: number } => {
  const availableIndices = SIMULATED_ANSWERS.map((_, idx) => idx).filter(
    idx => !usedIndices.includes(idx)
  );

  if (availableIndices.length === 0) {
    // Reset if all answers used
    const index = Math.floor(Math.random() * SIMULATED_ANSWERS.length);
    return { answer: SIMULATED_ANSWERS[index], index };
  }

  const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  return { answer: SIMULATED_ANSWERS[randomIdx], index: randomIdx };
};
