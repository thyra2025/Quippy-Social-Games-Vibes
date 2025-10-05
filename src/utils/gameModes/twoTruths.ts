const AI_STATEMENTS = [
  "I once met a celebrity at a coffee shop",
  "I can speak three languages fluently",
  "I've visited 15 different countries",
  "I was on a game show once",
  "I collect vintage postcards",
  "I've run a marathon",
  "I've broken the same bone twice",
  "I can recite the alphabet backwards",
  "I've met someone famous at the airport",
  "I have a scar from a childhood adventure",
  "I once won a local competition",
  "I'm related to someone semi-famous",
  "I've been to four different countries",
  "I can play two instruments",
  "I've appeared in a commercial",
  "I once shook hands with a politician",
];

const SIMULATED_STATEMENTS = [
  "I'm allergic to cats",
  "I've never broken a bone",
  "I can't whistle",
  "I sleep with socks on",
  "I talk to my plants",
  "I've watched the same movie 20+ times",
  "I can't swim",
  "I hate the smell of coffee",
  "I'm afraid of the dark",
  "I've never eaten sushi",
  "I can touch my nose with my tongue",
  "I've read the same book 5 times",
  "I don't like chocolate",
  "I've never watched Star Wars",
  "I collect bottle caps",
  "I can't ride a bike",
  "I've met all my cousins only once",
  "I sleep with a night light",
];

export function getRandomAIStatement(): string {
  return AI_STATEMENTS[Math.floor(Math.random() * AI_STATEMENTS.length)];
}

export function getRandomStatement(usedIndices: number[]): { statement: string; index: number } {
  const availableIndices = SIMULATED_STATEMENTS.map((_, i) => i).filter(
    i => !usedIndices.includes(i)
  );
  
  if (availableIndices.length === 0) {
    const index = Math.floor(Math.random() * SIMULATED_STATEMENTS.length);
    return { statement: SIMULATED_STATEMENTS[index], index };
  }
  
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  return { statement: SIMULATED_STATEMENTS[randomIndex], index: randomIndex };
}
