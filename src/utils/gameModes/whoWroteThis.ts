export type Language = 'en' | 'es' | 'fr' | 'pt' | 'pidgin';

export const PROMPTS_BY_LANGUAGE: Record<Language, string[]> = {
  en: [
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
  ],
  es: [
    "¿Cuál es tu excusa más ridícula para llegar tarde?",
    "¿Qué superpoder tendrías en el chat grupal?",
    "¿Cuál es tu comida de madrugada favorita?",
    "¿Qué aplicación te hace perder más tiempo?",
    "¿Cuál es tu miedo más irracional?"
  ],
  fr: [
    "Quelle est votre excuse la plus ridicule pour être en retard?",
    "Quel serait votre super-pouvoir dans un chat de groupe?",
    "Quelle est votre nourriture de fin de soirée préférée?",
    "Quelle application vous fait perdre le plus de temps?",
    "Quelle est votre peur la plus irrationnelle?"
  ],
  pt: [
    "Qual é sua desculpa mais ridícula para chegar atrasado?",
    "Qual seria seu superpoder no grupo?",
    "Qual é sua comida favorita de madrugada?",
    "Qual app faz você perder mais tempo?",
    "Qual é seu medo mais irracional?"
  ],
  pidgin: [
    "Wetin be your most foolish excuse wey you dey give when you late?",
    "If na superpower you get for group chat, wetin e go be?",
    "Wetin you dey chop for midnight?",
    "Which app dey waste your time pass?",
    "Wetin you dey fear wey no make sense?"
  ]
};

export const AI_ANSWERS_BY_LANGUAGE: Record<Language, Record<string, string[]>> = {
  en: {
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
  },
  es: {
    "¿Cuál es tu excusa más ridícula para llegar tarde?": [
      "El tráfico estaba imposible",
      "Mi gato borró mi alarma",
      "Estaba viendo TikToks",
      "Se me olvidó que era lunes",
      "Netflix me atrapó"
    ],
    "¿Qué superpoder tendrías en el chat grupal?": [
      "Enviar el meme perfecto en el momento exacto",
      "Leer mensajes sin que aparezca el visto",
      "Silenciar gente con la mente"
    ],
    "¿Cuál es tu comida de madrugada favorita?": [
      "Tacos al pastor a las 3am",
      "Cualquier cosa que encuentre en el refri",
      "Pizza fría del día anterior"
    ],
    "¿Qué aplicación te hace perder más tiempo?": [
      "TikTok, obviamente",
      "Instagram viendo vidas ajenas",
      "WhatsApp leyendo chismes"
    ],
    "¿Cuál es tu miedo más irracional?": [
      "Que me caiga un meteorito justo a mí",
      "Que alguien descubra que no sé multiplicar",
      "Las escaleras eléctricas"
    ]
  },
  fr: {
    "Quelle est votre excuse la plus ridicule pour être en retard?": [
      "Les transports étaient en retard",
      "Mon chat a supprimé mon réveil",
      "J'étais sur TikTok",
      "J'ai oublié qu'on était lundi",
      "Netflix m'a piégé"
    ],
    "Quel serait votre super-pouvoir dans un chat de groupe?": [
      "Envoyer le mème parfait au bon moment",
      "Lire les messages sans être vu",
      "Faire taire les gens par la pensée"
    ],
    "Quelle est votre nourriture de fin de soirée préférée?": [
      "Kebab à 3h du matin",
      "Tout ce que je trouve dans le frigo",
      "Pizza froide de la veille"
    ],
    "Quelle application vous fait perdre le plus de temps?": [
      "TikTok, évidemment",
      "Instagram à regarder la vie des autres",
      "WhatsApp à lire les potins"
    ],
    "Quelle est votre peur la plus irrationnelle?": [
      "Qu'un météorite me tombe dessus",
      "Que quelqu'un découvre que je ne sais pas multiplier",
      "Les escalators"
    ]
  },
  pt: {
    "Qual é sua desculpa mais ridícula para chegar atrasado?": [
      "O trânsito estava impossível",
      "Meu gato apagou meu alarme",
      "Estava no TikTok",
      "Esqueci que era segunda",
      "Netflix me prendeu"
    ],
    "Qual seria seu superpoder no grupo?": [
      "Mandar o meme perfeito na hora certa",
      "Ler mensagens sem aparecer online",
      "Silenciar pessoas com a mente"
    ],
    "Qual é sua comida favorita de madrugada?": [
      "Miojo às 3 da manhã",
      "Qualquer coisa que acho na geladeira",
      "Pizza fria do dia anterior"
    ],
    "Qual app faz você perder mais tempo?": [
      "TikTok, obviamente",
      "Instagram vendo a vida dos outros",
      "WhatsApp lendo fofoca"
    ],
    "Qual é seu medo mais irracional?": [
      "Que um meteorito caia bem em cima de mim",
      "Que alguém descubra que não sei multiplicar",
      "Escada rolante"
    ]
  },
  pidgin: {
    "Wetin be your most foolish excuse wey you dey give when you late?": [
      "Traffic hold me for road",
      "My cat delete my alarm",
      "TikTok hold me",
      "I forget say na Monday",
      "Netflix catch me"
    ],
    "If na superpower you get for group chat, wetin e go be?": [
      "I go send correct meme for correct time",
      "I fit read message without blue tick",
      "I fit mute person with my mind"
    ],
    "Wetin you dey chop for midnight?": [
      "Indomie for 3am",
      "Anything wey I see for fridge",
      "Yesterday cold pizza"
    ],
    "Which app dey waste your time pass?": [
      "TikTok, na im bad pass",
      "Instagram dey look people life",
      "WhatsApp dey read gossip"
    ],
    "Wetin you dey fear wey no make sense?": [
      "Say meteor go fall ontop my head",
      "Say person go know say I no sabi multiply",
      "Escalator"
    ]
  }
};

export const SIMULATED_ANSWERS_BY_LANGUAGE: Record<Language, Record<string, string[]>> = {
  en: {
    "What's the worst excuse for being late?": [
      "I was choosing the perfect outfit",
      "My alarm went off but I didn't hear it",
      "I stopped for coffee",
      "I couldn't find my keys",
      "My Uber cancelled"
    ]
  },
  es: {
    "¿Cuál es tu excusa más ridícula para llegar tarde?": [
      "Estaba eligiendo el outfit perfecto",
      "Mi alarma sonó pero no escuché",
      "Paré por café",
      "No encontraba mis llaves",
      "El Uber canceló"
    ]
  },
  fr: {
    "Quelle est votre excuse la plus ridicule pour être en retard?": [
      "Je cherchais la tenue parfaite",
      "Mon réveil a sonné mais je n'ai pas entendu",
      "Je me suis arrêté pour un café",
      "Je ne trouvais pas mes clés",
      "L'Uber a annulé"
    ]
  },
  pt: {
    "Qual é sua desculpa mais ridícula para chegar atrasado?": [
      "Estava escolhendo a roupa perfeita",
      "Meu alarme tocou mas não ouvi",
      "Parei pra café",
      "Não achei minhas chaves",
      "O Uber cancelou"
    ]
  },
  pidgin: {
    "Wetin be your most foolish excuse wey you dey give when you late?": [
      "I dey find correct cloth to wear",
      "My alarm ring but I no hear",
      "I stop buy coffee",
      "I no fit find my key",
      "Uber cancel"
    ]
  }
};

export function getRandomPrompt(language: Language = 'en'): string {
  console.log('🌐 getRandomPrompt called with language:', language);
  console.log('🌐 Available languages in PROMPTS_BY_LANGUAGE:', Object.keys(PROMPTS_BY_LANGUAGE));
  console.log('🌐 Prompts available for', language, ':', PROMPTS_BY_LANGUAGE[language]?.length || 0, 'prompts');
  
  const prompts = PROMPTS_BY_LANGUAGE[language];
  if (!prompts || prompts.length === 0) {
    console.error('❌ No prompts found for language:', language, '- falling back to English');
    const englishPrompts = PROMPTS_BY_LANGUAGE.en;
    const selectedPrompt = englishPrompts[Math.floor(Math.random() * englishPrompts.length)];
    console.log('📝 Selected prompt (English fallback):', selectedPrompt);
    return selectedPrompt;
  }
  
  const selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  console.log('📝 Selected prompt:', selectedPrompt);
  console.log('✅ Language match confirmed - prompt is in', language);
  return selectedPrompt;
}

export function getAIAnswer(prompt: string, language: Language = 'en'): string {
  console.log('🤖 getAIAnswer called with language:', language, 'prompt:', prompt.substring(0, 50));
  console.log('🤖 Available languages in AI_ANSWERS:', Object.keys(AI_ANSWERS_BY_LANGUAGE));
  
  const languageAnswers = AI_ANSWERS_BY_LANGUAGE[language];
  if (!languageAnswers) {
    console.error('❌ No AI answers dictionary found for language:', language);
    const englishAnswers = AI_ANSWERS_BY_LANGUAGE.en[prompt] || [];
    const selected = englishAnswers[Math.floor(Math.random() * englishAnswers.length)] || '';
    console.log('⚠️ Falling back to English AI answer:', selected.substring(0, 50));
    return selected;
  }
  
  const answers = languageAnswers[prompt] || [];
  console.log('🤖 Answers found for this prompt in', language, ':', answers.length);
  
  if (answers.length === 0) {
    console.warn('⚠️ No answers found for prompt in', language);
    const englishAnswers = AI_ANSWERS_BY_LANGUAGE.en[prompt] || [];
    const selected = englishAnswers[Math.floor(Math.random() * englishAnswers.length)] || '';
    console.log('⚠️ Falling back to English AI answer:', selected.substring(0, 50));
    return selected;
  }
  
  const selectedAnswer = answers[Math.floor(Math.random() * answers.length)] || '';
  console.log('✅ Selected AI answer:', selectedAnswer.substring(0, 50));
  console.log('✅ Language match confirmed - AI answer is in', language);
  return selectedAnswer;
}

export function getSimulatedAnswer(prompt: string, language: Language = 'en'): string {
  console.log('🎭 getSimulatedAnswer called with language:', language, 'prompt:', prompt.substring(0, 50));
  const languageAnswers = SIMULATED_ANSWERS_BY_LANGUAGE[language] || SIMULATED_ANSWERS_BY_LANGUAGE.en;
  let answers = languageAnswers[prompt] || [];

  // Prefer simulated answers for the SAME prompt in the SAME language
  if (answers.length > 0) {
    const selectedAnswer = answers[Math.floor(Math.random() * answers.length)] || '';
    console.log('✅ Selected simulated answer:', selectedAnswer.substring(0, 50));
    return selectedAnswer;
  }

  // Fallback 1: Use AI answers for the SAME prompt in the SAME language (keeps localization)
  const aiSameLang = AI_ANSWERS_BY_LANGUAGE[language]?.[prompt] || [];
  if (aiSameLang.length > 0) {
    const selected = aiSameLang[Math.floor(Math.random() * aiSameLang.length)] || '';
    console.log('↩️ Falling back to AI answers in same language for simulated:', selected.substring(0, 50));
    return selected;
  }

  // Fallback 2: Try English simulated answers for this prompt
  const englishSim = SIMULATED_ANSWERS_BY_LANGUAGE.en[prompt] || [];
  if (englishSim.length > 0) {
    const selected = englishSim[Math.floor(Math.random() * englishSim.length)] || '';
    console.log('⚠️ No simulated answers in', language, '- falling back to English simulated:', selected.substring(0, 50));
    return selected;
  }

  // Fallback 3: English AI answers for the same prompt
  const aiEnglish = AI_ANSWERS_BY_LANGUAGE.en[prompt] || [];
  if (aiEnglish.length > 0) {
    const selected = aiEnglish[Math.floor(Math.random() * aiEnglish.length)] || '';
    console.log('↩️ Falling back to English AI answers for simulated:', selected.substring(0, 50));
    return selected;
  }

  // Final fallback: empty string (shouldn't usually happen)
  console.warn('❌ No answers found for prompt in any language');
  return '';
}
