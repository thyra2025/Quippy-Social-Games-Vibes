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

export type Language = 'en' | 'es' | 'fr' | 'pt' | 'pidgin';

export const SIMULATED_CAPTIONS_BY_LANGUAGE: Record<Language, string[]> = {
  en: [
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
  ],
  es: [
    "Cuando te dicen que la reunión es rápida",
    "Yo fingiendo que entiendo",
    "Mi cara cuando se va el WiFi",
    "Cuando recuerdo algo vergonzoso de hace años",
    "Tratando de actuar normal en la reunión familiar",
    "Cuando alguien dice 'tenemos que hablar'",
    "Mi cerebro a las 3am resolviendo problemas",
    "Cuando finalmente funciona el código",
    "Yo evitando responsabilidades",
    "Cuando veo el saldo de mi cuenta"
  ],
  fr: [
    "Quand ils disent que la réunion sera rapide",
    "Moi qui fais semblant de comprendre",
    "Ma tête quand le WiFi coupe",
    "Quand je me souviens d'un truc gênant d'il y a des années",
    "Essayer d'avoir l'air normal à la réunion de famille",
    "Quand quelqu'un dit 'il faut qu'on parle'",
    "Mon cerveau à 3h du matin résolvant des problèmes",
    "Quand le code fonctionne enfin",
    "Moi évitant mes responsabilités",
    "Quand je vois mon solde bancaire"
  ],
  pt: [
    "Quando dizem que a reunião vai ser rápida",
    "Eu fingindo que entendo",
    "Minha cara quando a internet cai",
    "Quando lembro de algo constrangedor de anos atrás",
    "Tentando agir normal na reunião de família",
    "Quando alguém diz 'precisamos conversar'",
    "Meu cérebro às 3h resolvendo problemas",
    "Quando o código finalmente funciona",
    "Eu evitando responsabilidades",
    "Quando vejo o saldo da conta"
  ],
  pidgin: [
    "When dem say di meeting go short",
    "Me wey dey form say I understand",
    "My face when WiFi die",
    "When I remember embarrassing thing wey happen long time",
    "Me dey try act normal for family gathering",
    "When person talk say 'make we talk'",
    "My brain for 3am dey solve problem",
    "When di code finally work",
    "Me wey dey dodge responsibility",
    "When I check my bank balance"
  ]
};

export function getRandomImage(): CaptionImage {
  return CAPTION_IMAGES[Math.floor(Math.random() * CAPTION_IMAGES.length)];
}

export function getRandomCaption(language: Language = 'en'): string {
  const captions = SIMULATED_CAPTIONS_BY_LANGUAGE[language] || SIMULATED_CAPTIONS_BY_LANGUAGE.en;
  return captions[Math.floor(Math.random() * captions.length)];
}
