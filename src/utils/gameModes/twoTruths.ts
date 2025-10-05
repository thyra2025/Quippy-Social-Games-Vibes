export type Language = 'en' | 'es' | 'fr' | 'pt' | 'pidgin';

const AI_STATEMENTS_BY_LANGUAGE: Record<Language, string[]> = {
  en: [
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
  ],
  es: [
    "He conocido a una celebridad en un aeropuerto",
    "Puedo hablar tres idiomas con fluidez",
    "He visitado cuatro países diferentes",
    "Una vez gané una competencia local",
    "Puedo tocar dos instrumentos"
  ],
  fr: [
    "J'ai rencontré une célébrité dans un aéroport",
    "Je parle couramment trois langues",
    "J'ai visité quatre pays différents",
    "J'ai gagné un concours local",
    "Je joue de deux instruments"
  ],
  pt: [
    "Conheci uma celebridade no aeroporto",
    "Falo três idiomas fluentemente",
    "Visitei quatro países diferentes",
    "Já ganhei uma competição local",
    "Toco dois instrumentos"
  ],
  pidgin: [
    "I don meet celebrity for airport",
    "I fit speak three language well well",
    "I don visit four different country",
    "I win competition for my area before",
    "I fit play two instrument"
  ]
};

const SIMULATED_STATEMENTS_BY_LANGUAGE: Record<Language, string[]> = {
  en: [
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
  ],
  es: [
    "Tengo miedo a la oscuridad",
    "Nunca he comido sushi",
    "No me gusta el chocolate",
    "Nunca he visto Star Wars",
    "No sé andar en bicicleta"
  ],
  fr: [
    "J'ai peur du noir",
    "Je n'ai jamais mangé de sushi",
    "Je n'aime pas le chocolat",
    "Je n'ai jamais vu Star Wars",
    "Je ne sais pas faire du vélo"
  ],
  pt: [
    "Tenho medo do escuro",
    "Nunca comi sushi",
    "Não gosto de chocolate",
    "Nunca vi Star Wars",
    "Não sei andar de bicicleta"
  ],
  pidgin: [
    "I dey fear darkness",
    "I never chop sushi before",
    "I no like chocolate",
    "I never watch Star Wars",
    "I no fit ride bicycle"
  ]
};

export function getRandomAIStatement(language: Language = 'en'): string {
  console.log('🤖 getRandomAIStatement called with language:', language);
  console.log('🤖 Available languages in AI_STATEMENTS:', Object.keys(AI_STATEMENTS_BY_LANGUAGE));
  
  const statements = AI_STATEMENTS_BY_LANGUAGE[language];
  if (!statements || statements.length === 0) {
    console.error('❌ No AI statements found for language:', language, '- falling back to English');
    const englishStatements = AI_STATEMENTS_BY_LANGUAGE.en;
    const selectedStatement = englishStatements[Math.floor(Math.random() * englishStatements.length)];
    console.log('✅ Selected AI statement (English fallback):', selectedStatement.substring(0, 50));
    return selectedStatement;
  }
  
  const selectedStatement = statements[Math.floor(Math.random() * statements.length)];
  console.log('✅ Selected AI statement:', selectedStatement.substring(0, 50));
  console.log('✅ Language match confirmed - AI statement is in', language);
  return selectedStatement;
}

export function getRandomStatement(language: Language = 'en'): string {
  console.log('🎭 getRandomStatement called with language:', language);
  console.log('🎭 Available languages in SIMULATED_STATEMENTS:', Object.keys(SIMULATED_STATEMENTS_BY_LANGUAGE));
  
  const statements = SIMULATED_STATEMENTS_BY_LANGUAGE[language];
  if (!statements || statements.length === 0) {
    console.error('❌ No simulated statements found for language:', language, '- falling back to English');
    const englishStatements = SIMULATED_STATEMENTS_BY_LANGUAGE.en;
    const selectedStatement = englishStatements[Math.floor(Math.random() * englishStatements.length)];
    console.log('✅ Selected simulated statement (English fallback):', selectedStatement.substring(0, 50));
    return selectedStatement;
  }
  
  const selectedStatement = statements[Math.floor(Math.random() * statements.length)];
  console.log('✅ Selected simulated statement:', selectedStatement.substring(0, 50));
  console.log('✅ Language match confirmed - simulated statement is in', language);
  return selectedStatement;
}
