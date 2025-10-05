export const PROMPTS = [
  "What's the worst excuse for being late?",
  "What's the most ridiculous thing you've ever Googled?",
  "What would your autobiography be titled?",
  "What's your superhero name and power?",
  "What's the weirdest thing in your search history?"
];

export const AI_ANSWERS_BY_PROMPT: Record<string, string[]> = {
  "What's the worst excuse for being late?": [
    "I got stuck in a parallel universe for a bit",
    "My alarm clock joined a union and went on strike",
    "I was abducted by aliens who needed directions",
  ],
  "What's the most ridiculous thing you've ever Googled?": [
    "How to train my pet rock to do tricks",
    "Do fish get thirsty",
    "Can you get a refund on a bad haircut from yourself",
  ],
  "What would your autobiography be titled?": [
    "The Chronicles of Procrastination: A Work in Progress",
    "Accidentally Adult: A Survival Guide",
    "I Thought There'd Be More Naps: My Story",
  ],
  "What's your superhero name and power?": [
    "Captain Obvious with the power of stating the obvious",
    "The Procrastinator with the power of doing it tomorrow",
    "Snooze Button Man with the power of five more minutes",
  ],
  "What's the weirdest thing in your search history?": [
    "How many calories are in a crayon",
    "Do penguins have knees",
    "Why does my cat stare at the wall",
  ],
};

export function getRandomPrompt(): string {
  return PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
}

export function getAIAnswer(prompt: string): string {
  const answers = AI_ANSWERS_BY_PROMPT[prompt] || [];
  return answers[Math.floor(Math.random() * answers.length)];
}
