import catLaptop from '@/assets/caption-cat-laptop.jpg';
import dogSunglasses from '@/assets/caption-dog-sunglasses.jpg';
import surprisedFace from '@/assets/caption-surprised-face.jpg';
import confusedDog from '@/assets/caption-confused-dog.jpg';
import catBox from '@/assets/caption-cat-box.jpg';
import stressedWorker from '@/assets/caption-stressed-worker.jpg';
import babyLaughing from '@/assets/caption-baby-laughing.jpg';
import confusedLaptop from '@/assets/caption-confused-laptop.jpg';

export interface CaptionImage {
  url: string;
  alt: string;
}

export const CAPTION_IMAGES: CaptionImage[] = [
  {
    url: catLaptop,
    alt: 'A confused cat looking at a laptop'
  },
  {
    url: dogSunglasses,
    alt: 'A dog wearing sunglasses'
  },
  {
    url: surprisedFace,
    alt: 'A person making an exaggerated surprised face'
  },
  {
    url: confusedDog,
    alt: 'A confused dog'
  },
  {
    url: catBox,
    alt: 'A cat sitting in a box'
  },
  {
    url: stressedWorker,
    alt: 'A stressed office worker'
  },
  {
    url: babyLaughing,
    alt: 'A baby laughing'
  },
  {
    url: confusedLaptop,
    alt: 'A person confused at laptop'
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
  "When they explain the group project is due tomorrow",
  "Trying to act normal at the family reunion",
  "When someone asks if I'm listening",
  "Me explaining why I need another streaming subscription",
  "When the WiFi goes out mid-episode",
  "Acting like I understand the instructions",
  "When they say 'let's circle back on that'",
  "My therapist after listening to my week",
  "When I remember that embarrassing thing from 2012",
  "Me pretending I went to the gym",
  "When someone says 'we need to have a quick chat'",
  "Realizing I left the oven on",
  "When my phone dies at 47%",
  "Me at Monday morning meetings",
  "When I see my bank account balance",
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
