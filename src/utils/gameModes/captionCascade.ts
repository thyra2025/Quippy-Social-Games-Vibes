import catLaptop from '@/assets/caption-cat-laptop.jpg';
import dogSunglasses from '@/assets/caption-dog-sunglasses.jpg';
import surprisedFace from '@/assets/caption-surprised-face.jpg';

export interface CaptionImage {
  id: string;
  src: string;
  alt: string;
}

export const CAPTION_IMAGES: CaptionImage[] = [
  {
    id: 'cat-laptop',
    src: catLaptop,
    alt: 'A confused cat looking at a laptop',
  },
  {
    id: 'dog-sunglasses',
    src: dogSunglasses,
    alt: 'A dog wearing sunglasses',
  },
  {
    id: 'surprised-face',
    src: surprisedFace,
    alt: 'A person making an exaggerated surprised face',
  },
];

export const SIMULATED_CAPTIONS = [
  "When you realize it's Monday",
  "My face when they say 'quick meeting'",
  "POV: You just remembered what you forgot",
  "Me pretending to understand the presentation",
  "That feeling when the WiFi dies",
  "When someone says 'we need to talk'",
  "My brain at 3am solving problems",
  "When the code finally works",
  "Me avoiding responsibilities like",
  "When you see your ex in public",
  "My last brain cell working overtime",
  "When they ask if I'm okay",
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
