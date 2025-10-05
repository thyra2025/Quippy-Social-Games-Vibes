export interface CaptionImage {
  url: string;
  alt: string;
}

export const CAPTION_IMAGES: CaptionImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    alt: 'A confused cat looking at a laptop'
  },
  {
    url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    alt: 'A dog wearing sunglasses'
  },
  {
    url: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400',
    alt: 'A person making an exaggerated surprised face'
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
