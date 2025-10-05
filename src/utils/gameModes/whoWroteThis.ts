export const PROMPTS = [
  "What's the worst excuse for being late?",
  "What's the most ridiculous thing you've ever Googled?",
  "What would your autobiography be titled?",
  "What's your superhero name and power?",
  "What's the weirdest thing in your search history?",
  "What's the most embarrassing thing you've Googled?",
  "What would your warning label say?",
  "What's your go-to karaoke song?",
  "What's the weirdest compliment you've received?",
  "What's your biggest irrational fear?",
  "What would you do with a time machine?",
  "What's your secret talent?",
  "What's the worst gift you've ever received?",
  "What's your unpopular opinion?",
  "What job would you be terrible at?",
  "What's your comfort food at 2am?",
  "What would you name your pet rock?",
  "What's your most used emoji?",
  "What's the last thing you do before sleep?",
  "What's your celebrity doppelgänger?",
  "What's your signature dance move?",
  "What's the strangest thing in your camera roll?",
  "What app do you waste the most time on?",
  "What's your superpower in the group chat?",
  "What's your most rewatched movie?"
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
  "What's the most embarrassing thing you've Googled?": [
    "Probably how to fake my own death for insurance purposes",
    "How to tell if someone is a vampire without being obvious",
    "Can you legally change your name to a symbol",
  ],
  "What would your warning label say?": [
    "Warning: may spontaneously break into song",
    "Caution: talks to plants and expects responses",
    "Alert: will make everything about their pets",
  ],
  "What's your go-to karaoke song?": [
    "The alphabet song but I make it dramatic",
    "Happy Birthday in 7 different languages",
    "The Pokémon theme song with full commitment",
  ],
  "What's the weirdest compliment you've received?": [
    "Someone said I have symmetrical nostrils",
    "You smell like a memory I can't quite place",
    "Your handwriting looks aggressively confident",
  ],
  "What's your biggest irrational fear?": [
    "Heights. And butterflies. Especially flying butterflies.",
    "That someone will discover I don't know left from right",
    "Escalators gaining sentience and seeking revenge",
  ],
  "What would you do with a time machine?": [
    "I'd go back and invest in Bitcoin, obviously",
    "Witness the extinction of dinosaurs from a safe distance",
    "Tell my past self the lottery numbers but forget to write them down",
  ],
  "What's your secret talent?": [
    "Professional napper with a minor in procrastination",
    "I can recite the entire Bee Movie script",
    "Perfectly timing the microwave to stop at 0:01",
  ],
  "What's the worst gift you've ever received?": [
    "A singing fish. It still haunts me.",
    "A self-help book titled 'How to Accept Criticism'",
    "Socks with my face printed on them from my ex",
  ],
  "What's your unpopular opinion?": [
    "Cereal is just a breakfast soup",
    "The middle seat on flights is actually the best",
    "Room temperature water is superior to cold water",
  ],
  "What job would you be terrible at?": [
    "Professional napper with a minor in procrastination",
    "Anything requiring me to be awake before 10am",
    "Literally any job involving numbers or responsibility",
  ],
  "What's your comfort food at 2am?": [
    "Ramen at 2am hits different",
    "Shredded cheese straight from the bag",
    "Whatever I can eat in the dark without making noise",
  ],
  "What would you name your pet rock?": [
    "Sir Pebbles the Third, Esquire",
    "Dwayne 'The Rock' Johnson Jr.",
    "Boulder Dash (it's a pun)",
  ],
  "What's your most used emoji?": [
    "The laughing emoji that's actually crying",
    "The upside down smiley because chaos",
    "The eyes emoji for passive aggressive judgment",
  ],
  "What's the last thing you do before sleep?": [
    "Count sheep backwards in Spanish",
    "Replay every embarrassing moment from 2009",
    "Remember something I forgot to do and panic",
  ],
  "What's your celebrity doppelgänger?": [
    "Ryan Gosling's less attractive cousin",
    "A young Danny DeVito mixed with a potato",
    "That one extra in the background of every movie",
  ],
  "What's your signature dance move?": [
    "The awkward shuffle when someone's watching",
    "The shopping cart but I pretend it's intentional",
    "Standing completely still and calling it 'minimalist'",
  ],
  "What's the strangest thing in your camera roll?": [
    "That screenshot I took to remember something but forgot why",
    "47 pictures of my cat doing absolutely nothing",
    "A blurry photo of a parking spot number from 3 years ago",
  ],
  "What app do you waste the most time on?": [
    "TikTok. It's a problem.",
    "Google Maps exploring places I'll never visit",
    "Calculator app because I can't do mental math anymore",
  ],
  "What's your superpower in the group chat?": [
    "I'm the GIF master. No caption needed.",
    "Sending memes at exactly the right moment",
    "Reading messages and forgetting to respond for 3 days",
  ],
  "What's your most rewatched movie?": [
    "The Notebook. I'm not crying, you're crying.",
    "Shrek. All of them. Don't judge me.",
    "Any Marvel movie where stuff explodes",
  ],
};

export function getRandomPrompt(): string {
  return PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
}

export function getAIAnswer(prompt: string): string {
  const answers = AI_ANSWERS_BY_PROMPT[prompt] || [];
  return answers[Math.floor(Math.random() * answers.length)];
}
