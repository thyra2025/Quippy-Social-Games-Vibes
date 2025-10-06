import catLaptop from '@/assets/caption-cat-laptop.jpg';
import dogSunglasses from '@/assets/caption-dog-sunglasses.jpg';
import surprisedFace from '@/assets/caption-surprised-face.jpg';
import confusedDog from '@/assets/caption-confused-dog.jpg';
import catBox from '@/assets/caption-cat-box.jpg';
import stressedWorker from '@/assets/caption-stressed-worker.jpg';
import babyLaughing from '@/assets/caption-baby-laughing.jpg';
import confusedLaptop from '@/assets/caption-confused-laptop.jpg';

export interface CaptionImage {
  id: string;
  url: string;
  alt: string;
}

export const CAPTION_IMAGES: CaptionImage[] = [
  {
    id: 'cat-laptop',
    url: catLaptop,
    alt: 'A confused cat looking at a laptop'
  },
  {
    id: 'dog-sunglasses',
    url: dogSunglasses,
    alt: 'A dog wearing sunglasses'
  },
  {
    id: 'surprised-face',
    url: surprisedFace,
    alt: 'A person making an exaggerated surprised face'
  },
  {
    id: 'confused-dog',
    url: confusedDog,
    alt: 'A confused dog'
  },
  {
    id: 'cat-box',
    url: catBox,
    alt: 'A cat sitting in a box'
  },
  {
    id: 'stressed-worker',
    url: stressedWorker,
    alt: 'A stressed office worker'
  },
  {
    id: 'baby-laughing',
    url: babyLaughing,
    alt: 'A baby laughing'
  },
  {
    id: 'confused-laptop',
    url: confusedLaptop,
    alt: 'A person confused at laptop'
  }
];

export type Language = 'en' | 'es' | 'fr' | 'pt' | 'pidgin';

export const CAPTIONS_BY_IMAGE: Record<string, Record<Language, string[]>> = {
  'cat-laptop': {
    en: [
      "When someone explains cryptocurrency",
      "Me pretending to understand the meeting",
      "Trying to look busy at work",
      "When the code works but you have no idea why",
      "My brain during technical interviews",
      "Researching at 2am like it'll make sense",
      "Me Googling 'how to look smart'",
      "When WiFi is slower than my career growth",
      "Staring at my problems until they fix themselves",
      "When they ask me to explain my own code"
    ],
    es: [
      "Cuando alguien explica criptomonedas",
      "Yo fingiendo entender la reunión",
      "Tratando de parecer ocupado en el trabajo",
      "Cuando el código no tiene sentido",
      "Mi cara en entrevistas técnicas",
      "Investigando a las 2am",
      "Yo buscando preguntas obvias en Google",
      "Cuando el WiFi está lento"
    ],
    fr: [
      "Quand quelqu'un explique la crypto",
      "Moi qui fais semblant de comprendre la réunion",
      "Essayer d'avoir l'air occupé au travail",
      "Quand le code n'a pas de sens",
      "Ma tête en entretien technique",
      "Rechercher à 2h du matin",
      "Moi qui Google des questions évidentes",
      "Quand le WiFi est lent"
    ],
    pt: [
      "Quando alguém explica criptomoedas",
      "Eu fingindo entender a reunião",
      "Tentando parecer ocupado no trabalho",
      "Quando o código não faz sentido",
      "Minha cara em entrevistas técnicas",
      "Pesquisando às 2h da manhã",
      "Eu pesquisando perguntas óbvias no Google",
      "Quando o WiFi está lento"
    ],
    pidgin: [
      "When person dey explain crypto",
      "Me wey dey form say I sabi for meeting",
      "Me dey try look like say I dey work",
      "When di code no make sense",
      "My face for technical interview",
      "Me dey research for 2am",
      "Me dey Google simple question",
      "When WiFi slow"
    ]
  },
  'dog-sunglasses': {
    en: [
      "Too cool for Monday",
      "When you finally get the joke from 3 days ago",
      "Living my best life on $47",
      "Me after one compliment from a stranger",
      "Feeling myself after 8 hours of sleep",
      "When the weekend hits and responsibilities don't",
      "Zero thoughts, just vibes",
      "Main character who peaked in this moment",
      "When you wear sunglasses indoors and own it",
      "Me pretending I have my life together"
    ],
    es: [
      "Demasiado cool para el lunes",
      "Cuando finalmente entiendes el chiste",
      "Viviendo mi mejor vida",
      "Yo después de un cumplido",
      "Sintiéndome bien hoy",
      "Cuando llega el fin de semana",
      "Solo disfrutando",
      "Energía de protagonista"
    ],
    fr: [
      "Trop cool pour lundi",
      "Quand tu captes enfin la blague",
      "Vivre ma meilleure vie",
      "Moi après un compliment",
      "Je me sens bien aujourd'hui",
      "Quand le week-end arrive",
      "Juste en train de profiter",
      "Énergie de personnage principal"
    ],
    pt: [
      "Legal demais para segunda-feira",
      "Quando você finalmente entende a piada",
      "Vivendo minha melhor vida",
      "Eu depois de um elogio",
      "Me sentindo bem hoje",
      "Quando o fim de semana chega",
      "Só aproveitando",
      "Energia de protagonista"
    ],
    pidgin: [
      "Too cool for Monday",
      "When you finally get di joke",
      "Me dey live my best life",
      "Me after one compliment",
      "I dey feel myself today",
      "When weekend come",
      "Just dey vibe",
      "Main character energy"
    ]
  },
  'surprised-face': {
    en: [
      "When they say 'it's on the house'",
      "Me seeing my exam results were actually good",
      "The plot twist nobody saw coming",
      "Wait, people actually like me?",
      "When you check your bank account and it's positive",
      "My face when plans work out for once",
      "They said WHAT about me?",
      "When the date doesn't ghost you",
      "Finding money in old jacket pockets",
      "When autocorrect actually helps instead of ruins"
    ],
    es: [
      "Cuando dicen que es gratis",
      "Yo viendo mis resultados del examen",
      "Giro argumental del siglo",
      "Espera, ¿qué acaba de pasar?",
      "Cuando recibes buenas noticias inesperadas",
      "Mi cara cuando los planes funcionan",
      "¿Escuché bien?",
      "Cuando el precio es menor de lo esperado"
    ],
    fr: [
      "Quand ils disent que c'est gratuit",
      "Moi en voyant mes résultats d'examen",
      "Rebondissement du siècle",
      "Attends, que s'est-il passé?",
      "Quand tu reçois de bonnes nouvelles inattendues",
      "Ma tête quand les plans marchent",
      "J'ai bien entendu?",
      "Quand le prix est plus bas que prévu"
    ],
    pt: [
      "Quando dizem que é grátis",
      "Eu vendo meus resultados de exame",
      "Reviravolta do século",
      "Espera, o que aconteceu?",
      "Quando você recebe boas notícias inesperadas",
      "Minha cara quando os planos funcionam",
      "Eu ouvi direito?",
      "Quando o preço é menor do que esperado"
    ],
    pidgin: [
      "When dem talk say e free",
      "Me dey check my exam result",
      "Big surprise of di century",
      "Wait, wetin just happen?",
      "When you get surprise good news",
      "My face when plan work",
      "I hear well so?",
      "When di price lower pass wetin you think"
    ]
  },
  'confused-dog': {
    en: [
      "When someone explains blockchain for the third time",
      "Me trying to understand why I'm broke",
      "Waiting for the bad news after 'so...'",
      "When they text 'we need to talk' at 11pm",
      "My brain during literally any Zoom meeting",
      "Trying to remember if I locked the door",
      "What did I just agree to sign?",
      "Still processing what happened in 2020",
      "When someone says 'make it make sense'",
      "Me understanding modern dating"
    ],
    es: [
      "Cuando alguien explica las criptomonedas",
      "Yo tratando de entender mi estado de cuenta",
      "Esperando que digan 'buenas noticias'",
      "Cuando dicen 'tenemos que hablar'",
      "Mi cara durante reuniones de Zoom",
      "Tratando de recordar dónde estacioné",
      "¿A qué acabo de acceder?",
      "Procesando lo que acaban de decir"
    ],
    fr: [
      "Quand quelqu'un explique la crypto",
      "Moi essayant de comprendre mon relevé bancaire",
      "En attendant qu'ils disent 'bonne nouvelle'",
      "Quand ils disent 'on doit parler'",
      "Ma tête pendant les réunions Zoom",
      "Essayer de me rappeler où j'ai garé",
      "À quoi je viens d'accepter?",
      "En train de traiter ce qu'ils viennent de dire"
    ],
    pt: [
      "Quando alguém explica criptomoedas",
      "Eu tentando entender meu extrato bancário",
      "Esperando eles dizerem 'boas notícias'",
      "Quando dizem 'precisamos conversar'",
      "Minha cara durante reuniões no Zoom",
      "Tentando lembrar onde estacionei",
      "Com o que eu acabei de concordar?",
      "Processando o que eles acabaram de dizer"
    ],
    pidgin: [
      "When person dey explain crypto",
      "Me wey dey try understand my bank statement",
      "Me dey wait make dem talk good news",
      "When dem talk say 'make we talk'",
      "My face for Zoom meeting",
      "Me dey try remember where I park",
      "Wetin I just agree to?",
      "Me dey process wetin dem just talk"
    ]
  },
  'cat-box': {
    en: [
      "If I fits, I sits and quits",
      "This is my life now and I'm at peace",
      "Peak comfort achieved, do not disturb",
      "Hiding from responsibilities like a pro",
      "My emotional support box",
      "Introvert paradise: population me",
      "Found my vibe, staying forever",
      "Don't talk to me I'm in my zone of denial",
      "Living my best life in 2 square feet",
      "When you find the perfect hiding spot from adulting"
    ],
    es: [
      "Si quepo, me siento",
      "Esta es mi vida ahora",
      "Comodidad máxima alcanzada",
      "Escondiéndome de responsabilidades",
      "Mi espacio seguro",
      "Paraíso introvertido",
      "Encontré mi lugar",
      "No me hablen, estoy en mi zona"
    ],
    fr: [
      "Si ça rentre, je m'assois",
      "C'est ma vie maintenant",
      "Confort maximum atteint",
      "Me cacher des responsabilités",
      "Mon espace sûr",
      "Paradis d'introverti",
      "J'ai trouvé ma place",
      "Ne me parlez pas, je suis dans ma zone"
    ],
    pt: [
      "Se eu couber, eu sento",
      "Esta é minha vida agora",
      "Conforto máximo alcançado",
      "Me escondendo das responsabilidades",
      "Meu espaço seguro",
      "Paraíso dos introvertidos",
      "Encontrei meu lugar",
      "Não falem comigo, estou na minha zona"
    ],
    pidgin: [
      "If I fit, I go siddon",
      "Na so my life be now",
      "I don reach maximum comfort",
      "Me dey hide from responsibility",
      "Na my safe space be this",
      "Introvert paradise",
      "I don find my spot",
      "Make una no talk to me, I dey for my zone"
    ]
  },
  'stressed-worker': {
    en: [
      "When she asks if I read the 47-page report",
      "Explaining my raise using only vibes",
      "Her: serious discussion. Me: thinking about lunch",
      "Nodding like I understand the budget spreadsheet",
      "Realizing you're in the wrong meeting",
      "Pretending my idea wasn't Googled 5 minutes ago",
      "When she says 'quick question' at 4:59pm",
      "Acting like I wasn't on mute the whole time",
      "The moment you realize you replied-all",
      "My face when Teams crashes mid-presentation"
    ],
    es: [
      "Cuando te das cuenta de que solo es martes",
      "Leyendo el chat del proyecto grupal",
      "Yo haciendo mis impuestos",
      "Ese correo se pudo haber evitado",
      "Revisando mi cuenta bancaria",
      "Cuando se va el WiFi durante el trabajo",
      "Reuniones del lunes por la mañana",
      "Cuando la fecha límite fue ayer"
    ],
    fr: [
      "Quand tu réalises que c'est seulement mardi",
      "En lisant le chat du projet de groupe",
      "Moi faisant mes impôts",
      "Cet email aurait pu être évité",
      "Vérifier mon compte bancaire",
      "Quand le WiFi coupe pendant le travail",
      "Réunions du lundi matin",
      "Quand la deadline était hier"
    ],
    pt: [
      "Quando você percebe que é só terça-feira",
      "Lendo o chat do projeto em grupo",
      "Eu fazendo meu imposto de renda",
      "Esse e-mail poderia ter sido evitado",
      "Verificando minha conta bancária",
      "Quando a internet cai durante o trabalho",
      "Reuniões de segunda de manhã",
      "Quando o prazo foi ontem"
    ],
    pidgin: [
      "When you know say na only Tuesday",
      "Me dey read group project chat",
      "Me dey do my tax",
      "Dat email for no happen",
      "Me dey check my bank account",
      "When WiFi die for work time",
      "Monday morning meeting",
      "When di deadline been yesterday"
    ]
  },
  'baby-laughing': {
    en: [
      "When you cause chaos and everyone blames someone else",
      "Me after 8 hours of uninterrupted sleep",
      "Pure unfiltered joy before bills existed",
      "When the food delivery arrives early",
      "Laughing at my own jokes because I'm hilarious",
      "Zero thoughts, maximum vibes, living the dream",
      "When plans get cancelled and you're secretly relieved",
      "Me enjoying the simple things like breathing air",
      "When you get away with something ridiculous",
      "Living proof that ignorance is bliss"
    ],
    es: [
      "Cuando causas caos y te sales con la tuya",
      "Yo después de una buena siesta",
      "Alegría pura y sin filtro",
      "Cuando llega la comida",
      "Riéndome de mis propios chistes",
      "Sin pensamientos, solo vibras",
      "Cuando se cancelan los planes",
      "Yo disfrutando las cosas simples"
    ],
    fr: [
      "Quand tu causes le chaos et t'en sors",
      "Moi après une bonne sieste",
      "Joie pure et sans filtre",
      "Quand la nourriture arrive",
      "Rire de mes propres blagues",
      "Pas de pensées, juste des bonnes vibes",
      "Quand les plans sont annulés",
      "Moi qui profite des choses simples"
    ],
    pt: [
      "Quando você causa caos e se safou",
      "Eu depois de uma boa soneca",
      "Alegria pura e sem filtro",
      "Quando a comida chega",
      "Rindo das minhas próprias piadas",
      "Sem pensamentos, só vibrações",
      "Quando os planos são cancelados",
      "Eu aproveitando as coisas simples"
    ],
    pidgin: [
      "When you cause wahala and e work for you",
      "Me after good sleep",
      "Pure joy wey no get filter",
      "When di food come",
      "Me dey laugh my own joke",
      "No thinking, just dey vibe",
      "When dem cancel plans",
      "Me dey enjoy small small things"
    ]
  },
  'confused-laptop': {
    en: [
      "Trying to understand why my code hates me",
      "When code works but Stack Overflow can't explain why",
      "Me pretending I read those 47 terms and conditions",
      "Googling 'how to adult without crying'",
      "My brain during every single online meeting",
      "Why isn't this working when it worked yesterday",
      "Reading documentation at 3am like it'll suddenly click",
      "When the tutorial skips the exact step you needed",
      "Me understanding my own code from 2 weeks ago",
      "When you realize you've been spelling it wrong for hours"
    ],
    es: [
      "Tratando de entender este mensaje de error",
      "Cuando el código funciona pero no sabes por qué",
      "Yo fingiendo que leí los términos",
      "Buscando en Google cómo ser adulto",
      "Mi cara durante reuniones en línea",
      "Por qué no está funcionando esto",
      "Leyendo documentación a las 3am",
      "Cuando el tutorial se salta pasos"
    ],
    fr: [
      "Essayer de comprendre ce message d'erreur",
      "Quand le code marche mais tu sais pas pourquoi",
      "Moi qui fais semblant d'avoir lu les conditions",
      "Googler comment être adulte",
      "Ma tête pendant les réunions en ligne",
      "Pourquoi ça ne marche pas",
      "Lire la documentation à 3h du matin",
      "Quand le tutoriel saute des étapes"
    ],
    pt: [
      "Tentando entender esta mensagem de erro",
      "Quando o código funciona mas você não sabe por quê",
      "Eu fingindo que li os termos",
      "Pesquisando no Google como ser adulto",
      "Minha cara durante reuniões online",
      "Por que isso não está funcionando",
      "Lendo documentação às 3h da manhã",
      "Quando o tutorial pula etapas"
    ],
    pidgin: [
      "Me dey try understand dis error message",
      "When code work but you no sabi why",
      "Me wey dey form say I read di terms",
      "Me dey Google how to be adult",
      "My face for online meeting",
      "Why e no dey work",
      "Me dey read documentation for 3am",
      "When di tutorial skip steps"
    ]
  }
};

export function getRandomImage(): CaptionImage {
  return CAPTION_IMAGES[Math.floor(Math.random() * CAPTION_IMAGES.length)];
}

export function getRandomCaption(imageId: string, language: Language = 'en'): string {
  console.log('💬 getRandomCaption called with imageId:', imageId, 'language:', language);
  
  const imageCaptions = CAPTIONS_BY_IMAGE[imageId];
  if (!imageCaptions) {
    console.error('❌ No captions found for image:', imageId, '- using first image as fallback');
    const fallbackImageId = Object.keys(CAPTIONS_BY_IMAGE)[0];
    const fallbackCaptions = CAPTIONS_BY_IMAGE[fallbackImageId][language] || CAPTIONS_BY_IMAGE[fallbackImageId].en;
    const selectedCaption = fallbackCaptions[Math.floor(Math.random() * fallbackCaptions.length)];
    console.log('✅ Selected caption (image fallback):', selectedCaption.substring(0, 50));
    return selectedCaption;
  }
  
  const captions = imageCaptions[language] || imageCaptions.en;
  if (!captions || captions.length === 0) {
    console.error('❌ No captions found for language:', language, '- falling back to English');
    const englishCaptions = imageCaptions.en;
    const selectedCaption = englishCaptions[Math.floor(Math.random() * englishCaptions.length)];
    console.log('✅ Selected caption (English fallback):', selectedCaption.substring(0, 50));
    return selectedCaption;
  }
  
  const selectedCaption = captions[Math.floor(Math.random() * captions.length)];
  console.log('✅ Selected caption:', selectedCaption.substring(0, 50));
  console.log('✅ Image and language match confirmed - caption is for', imageId, 'in', language);
  return selectedCaption;
}
