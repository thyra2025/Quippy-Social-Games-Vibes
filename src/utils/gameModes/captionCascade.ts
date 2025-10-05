export interface CaptionImage {
  url: string;
  alt: string;
}

export const CAPTION_IMAGES: CaptionImage[] = [
  {
    url: 'https://via.placeholder.com/400x300/FF69B4/FFFFFF?text=Funny+Image',
    alt: 'A funny meme image'
  }
];

export const SIMULATED_CAPTIONS = [
  "When you realize it's Monday",
  "My face when they say 'quick meeting'",
  "POV: You just remembered what you forgot",
  "Me pretending to understand",
  "That feeling when the WiFi dies",
  "My brain at 3am",
  "When the code finally works",
  "Me avoiding responsibilities",
];

export function getRandomImage(): CaptionImage {
  return CAPTION_IMAGES[Math.floor(Math.random() * CAPTION_IMAGES.length)];
}

export function getRandomCaption(usedIndices: number[]): { caption: string; index: number } {
  const availableIndices = SIMULATED_CAPTIONS.map((_, i) => i).filter(
    i => !usedIndices.includes(i)
  );
  
  if (availableIndices.length === 0) {
    const index = Math.floor(Math.random() * SIMULATED_CAPTIONS.length);
    return { caption: SIMULATED_CAPTIONS[index], index };
  }
  
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  return { caption: SIMULATED_CAPTIONS[randomIndex], index: randomIndex };
}
