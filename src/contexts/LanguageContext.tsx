import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export type Language = 'en' | 'es' | 'fr' | 'pt' | 'pidgin';

export const translations = {
  en: {
    startGame: "Start Game",
    joinParty: "Join Party",
    submitAnswer: "Submit Answer",
    submitCaption: "Submit Caption",
    submitStatement: "Submit Statement",
    timeRemaining: "Time Remaining",
    yourAnswer: "Your Answer",
    waiting: "Waiting for other players...",
    voting: "Vote for your favorite",
    winner: "Winner",
    playAgain: "Play Again",
    shareWhatsApp: "Share on WhatsApp",
    partyFeed: "Party Feed",
    addSimulated: "Add simulated players",
    roomCode: "Room Code",
    startParty: "Start a Party",
    joinAParty: "Join a Party",
    enterRoomCode: "Enter room code",
    join: "Join",
    selectGameMode: "Select Game Mode",
    players: "Players",
    host: "Host",
    leave: "Leave",
    shareLink: "Share Link",
    copied: "Copied!",
    playerName: "Player Name",
    enterName: "Enter your name",
    viewPartyFeed: "View Party Feed",
    noRecaps: "No game recaps yet. Start playing to see them here!",
    backToLobby: "Back to Lobby",
    leaveGame: "Leave Game",
    mostBelieved: "Most Believed",
    aiFakeRevealed: "AI Fake Revealed",
    correctAnswers: "Correct Answers",
    writeCaption: "Write a Funny Caption for This Picture",
    whichAIWrote: "Which One Do You Think AI Wrote?",
    voteAsFake: "Vote as Fake",
    joinTheParty: "Join the Party!",
    chooseGameMode: "Choose how you want to play",
    testWithBots: "Test the game solo with AI players",
    you: "(You)",
    bot: "BOT",
    waitingForPlayers: "Waiting for more players to join...",
    welcomeToQuippy: "Welcome to Quippy",
    tagline: "The party game that brings everyone together through WhatsApp!",
    createRoomDesc: "Create a new room and invite your friends via WhatsApp",
    enterRoomDesc: "Enter a room code to join your friends",
    quickGames: "Quick Games",
    whatsappFirst: "WhatsApp First",
    customThemes: "Custom Themes",
    shareTheFun: "Share the fun with your friends on WhatsApp! 🚀",
    simulatedPlayersAdded: "Simulated players added!",
    aiPlayersJoined: "AI players joined the party",
    simulatedPlayersRemoved: "Simulated players removed",
    realPlayersOnly: "Real players only now",
    joined: "Joined!",
    welcomeToParty: "Welcome to the party",
  },
  es: {
    startGame: "Comenzar Juego",
    joinParty: "Unirse a la Fiesta",
    submitAnswer: "Enviar Respuesta",
    submitCaption: "Enviar Título",
    submitStatement: "Enviar Declaración",
    timeRemaining: "Tiempo Restante",
    yourAnswer: "Tu Respuesta",
    waiting: "Esperando a otros jugadores...",
    voting: "Vota por tu favorito",
    winner: "Ganador",
    playAgain: "Jugar de Nuevo",
    shareWhatsApp: "Compartir en WhatsApp",
    partyFeed: "Historial de Partidas",
    addSimulated: "Añadir jugadores simulados",
    roomCode: "Código de Sala",
    startParty: "Comenzar una Fiesta",
    joinAParty: "Unirse a una Fiesta",
    enterRoomCode: "Ingresar código de sala",
    join: "Unirse",
    selectGameMode: "Seleccionar Modo de Juego",
    players: "Jugadores",
    host: "Anfitrión",
    leave: "Salir",
    shareLink: "Compartir Enlace",
    copied: "¡Copiado!",
    playerName: "Nombre del Jugador",
    enterName: "Ingresa tu nombre",
    viewPartyFeed: "Ver Historial",
    noRecaps: "Aún no hay resúmenes. ¡Empieza a jugar para verlos aquí!",
    backToLobby: "Volver al Lobby",
    leaveGame: "Salir del Juego",
    mostBelieved: "Más Creído",
    aiFakeRevealed: "IA Falsa Revelada",
    correctAnswers: "Respuestas Correctas",
    writeCaption: "Escribe un Título Gracioso para Esta Imagen",
    whichAIWrote: "¿Cuál Crees que Escribió la IA?",
    voteAsFake: "Votar como Falso",
    joinTheParty: "¡Únete a la Fiesta!",
    chooseGameMode: "Elige cómo quieres jugar",
    testWithBots: "Prueba el juego solo con jugadores IA",
    you: "(Tú)",
    bot: "BOT",
    waitingForPlayers: "Esperando que se unan más jugadores...",
    welcomeToQuippy: "Bienvenido a Quippy",
    tagline: "¡El juego de fiesta que une a todos a través de WhatsApp!",
    createRoomDesc: "Crea una sala nueva e invita a tus amigos por WhatsApp",
    enterRoomDesc: "Ingresa un código de sala para unirte a tus amigos",
    quickGames: "Juegos Rápidos",
    whatsappFirst: "WhatsApp Primero",
    customThemes: "Temas Personalizados",
    shareTheFun: "¡Comparte la diversión con tus amigos en WhatsApp! 🚀",
    simulatedPlayersAdded: "¡Jugadores simulados añadidos!",
    aiPlayersJoined: "Jugadores IA se unieron a la fiesta",
    simulatedPlayersRemoved: "Jugadores simulados eliminados",
    realPlayersOnly: "Solo jugadores reales ahora",
    joined: "¡Te uniste!",
    welcomeToParty: "Bienvenido a la fiesta",
  },
  fr: {
    startGame: "Commencer le Jeu",
    joinParty: "Rejoindre la Fête",
    submitAnswer: "Soumettre une Réponse",
    submitCaption: "Soumettre une Légende",
    submitStatement: "Soumettre une Déclaration",
    timeRemaining: "Temps Restant",
    yourAnswer: "Votre Réponse",
    waiting: "En attente d'autres joueurs...",
    voting: "Votez pour votre favori",
    winner: "Gagnant",
    playAgain: "Rejouer",
    shareWhatsApp: "Partager sur WhatsApp",
    partyFeed: "Historique des Parties",
    addSimulated: "Ajouter des joueurs simulés",
    roomCode: "Code de Salle",
    startParty: "Commencer une Fête",
    joinAParty: "Rejoindre une Fête",
    enterRoomCode: "Entrer le code de salle",
    join: "Rejoindre",
    selectGameMode: "Sélectionner le Mode de Jeu",
    players: "Joueurs",
    host: "Hôte",
    leave: "Quitter",
    shareLink: "Partager le Lien",
    copied: "Copié!",
    playerName: "Nom du Joueur",
    enterName: "Entrez votre nom",
    viewPartyFeed: "Voir l'Historique",
    noRecaps: "Aucun résumé pour le moment. Commencez à jouer pour les voir ici!",
    backToLobby: "Retour au Lobby",
    leaveGame: "Quitter le Jeu",
    mostBelieved: "Le Plus Cru",
    aiFakeRevealed: "IA Faux Révélé",
    correctAnswers: "Réponses Correctes",
    writeCaption: "Écrivez une Légende Drôle pour Cette Image",
    whichAIWrote: "Lequel Pensez-vous que l'IA a Écrit?",
    voteAsFake: "Voter comme Faux",
    joinTheParty: "Rejoignez la Fête!",
    chooseGameMode: "Choisissez comment vous voulez jouer",
    testWithBots: "Testez le jeu en solo avec des joueurs IA",
    you: "(Vous)",
    bot: "BOT",
    waitingForPlayers: "En attente de plus de joueurs...",
    welcomeToQuippy: "Bienvenue sur Quippy",
    tagline: "Le jeu de fête qui rassemble tout le monde via WhatsApp!",
    createRoomDesc: "Créez une nouvelle salle et invitez vos amis via WhatsApp",
    enterRoomDesc: "Entrez un code de salle pour rejoindre vos amis",
    quickGames: "Jeux Rapides",
    whatsappFirst: "WhatsApp d'Abord",
    customThemes: "Thèmes Personnalisés",
    shareTheFun: "Partagez le plaisir avec vos amis sur WhatsApp! 🚀",
    simulatedPlayersAdded: "Joueurs simulés ajoutés!",
    aiPlayersJoined: "Joueurs IA ont rejoint la fête",
    simulatedPlayersRemoved: "Joueurs simulés supprimés",
    realPlayersOnly: "Seulement des vrais joueurs maintenant",
    joined: "Rejoint!",
    welcomeToParty: "Bienvenue à la fête",
  },
  pt: {
    startGame: "Começar Jogo",
    joinParty: "Entrar na Festa",
    submitAnswer: "Enviar Resposta",
    submitCaption: "Enviar Legenda",
    submitStatement: "Enviar Declaração",
    timeRemaining: "Tempo Restante",
    yourAnswer: "Sua Resposta",
    waiting: "Aguardando outros jogadores...",
    voting: "Vote no seu favorito",
    winner: "Vencedor",
    playAgain: "Jogar Novamente",
    shareWhatsApp: "Compartilhar no WhatsApp",
    partyFeed: "Histórico de Partidas",
    addSimulated: "Adicionar jogadores simulados",
    roomCode: "Código da Sala",
    startParty: "Começar uma Festa",
    joinAParty: "Entrar numa Festa",
    enterRoomCode: "Digite o código da sala",
    join: "Entrar",
    selectGameMode: "Selecionar Modo de Jogo",
    players: "Jogadores",
    host: "Anfitrião",
    leave: "Sair",
    shareLink: "Compartilhar Link",
    copied: "Copiado!",
    playerName: "Nome do Jogador",
    enterName: "Digite seu nome",
    viewPartyFeed: "Ver Histórico",
    noRecaps: "Ainda não há resumos. Comece a jogar para vê-los aqui!",
    backToLobby: "Voltar ao Lobby",
    leaveGame: "Sair do Jogo",
    mostBelieved: "Mais Acreditado",
    aiFakeRevealed: "IA Falso Revelado",
    correctAnswers: "Respostas Corretas",
    writeCaption: "Escreva uma Legenda Engraçada para Esta Imagem",
    whichAIWrote: "Qual Você Acha que a IA Escreveu?",
    voteAsFake: "Votar como Falso",
    joinTheParty: "Entre na Festa!",
    chooseGameMode: "Escolha como você quer jogar",
    testWithBots: "Teste o jogo sozinho com jogadores IA",
    you: "(Você)",
    bot: "BOT",
    waitingForPlayers: "Aguardando mais jogadores...",
    welcomeToQuippy: "Bem-vindo ao Quippy",
    tagline: "O jogo de festa que une todos através do WhatsApp!",
    createRoomDesc: "Crie uma nova sala e convide seus amigos via WhatsApp",
    enterRoomDesc: "Digite um código de sala para se juntar aos seus amigos",
    quickGames: "Jogos Rápidos",
    whatsappFirst: "WhatsApp Primeiro",
    customThemes: "Temas Personalizados",
    shareTheFun: "Compartilhe a diversão com seus amigos no WhatsApp! 🚀",
    simulatedPlayersAdded: "Jogadores simulados adicionados!",
    aiPlayersJoined: "Jogadores IA se juntaram à festa",
    simulatedPlayersRemoved: "Jogadores simulados removidos",
    realPlayersOnly: "Apenas jogadores reais agora",
    joined: "Entrou!",
    welcomeToParty: "Bem-vindo à festa",
  },
  pidgin: {
    startGame: "Start di Game",
    joinParty: "Join di Party",
    submitAnswer: "Send Your Answer",
    submitCaption: "Write Wetin You See",
    submitStatement: "Talk Your Own",
    timeRemaining: "Time Wey Remain",
    yourAnswer: "Your Answer",
    waiting: "We dey wait for other people...",
    voting: "Vote for di one wey sweet you",
    winner: "Winner",
    playAgain: "Make We Play Again",
    shareWhatsApp: "Share am for WhatsApp",
    partyFeed: "All di Games Wey We Don Play",
    addSimulated: "Add fake players",
    roomCode: "Room Code",
    startParty: "Start Party",
    joinAParty: "Join Party",
    enterRoomCode: "Put room code",
    join: "Join",
    selectGameMode: "Choose Game Mode",
    players: "Players",
    host: "Host",
    leave: "Comot",
    shareLink: "Share Link",
    copied: "Don Copy!",
    playerName: "Your Name",
    enterName: "Put your name",
    viewPartyFeed: "See Game History",
    noRecaps: "No game recap yet. Start play make you see am here!",
    backToLobby: "Go Back",
    leaveGame: "Comot for Game",
    mostBelieved: "Person Wey Everybody Believe",
    aiFakeRevealed: "Na AI Write This One",
    correctAnswers: "People Wey Answer Correct",
    writeCaption: "Write Funny Caption for This Picture",
    whichAIWrote: "Which One You Think AI Write?",
    voteAsFake: "Vote Say Na Fake",
    joinTheParty: "Join di Party!",
    chooseGameMode: "Choose how you wan play",
    testWithBots: "Try di game with fake players",
    you: "(Na You)",
    bot: "BOT",
    waitingForPlayers: "We dey wait for more people...",
    welcomeToQuippy: "Welcome to Quippy",
    tagline: "Di party game wey bring everybody together for WhatsApp!",
    createRoomDesc: "Start new room and invite your friends for WhatsApp",
    enterRoomDesc: "Put room code make you join your friends",
    quickGames: "Quick Games",
    whatsappFirst: "WhatsApp First",
    customThemes: "Custom Themes",
    shareTheFun: "Share di fun with your friends for WhatsApp! 🚀",
    simulatedPlayersAdded: "Fake players don add!",
    aiPlayersJoined: "AI players don join di party",
    simulatedPlayersRemoved: "Fake players don comot",
    realPlayersOnly: "Na only real players now",
    joined: "You Don Join!",
    welcomeToParty: "Welcome to di party",
  },
};

export const languageNames: Record<Language, string> = {
  en: "🇺🇸 English",
  es: "🇪🇸 Español",
  fr: "🇫🇷 Français",
  pt: "🇧🇷 Português",
  pidgin: "🇳🇬 Pidgin",
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'userLanguage';
const FIRST_VISIT_KEY = 'languageFirstVisit';

const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('pt')) return 'pt';
  return 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved as Language;
    return detectBrowserLanguage();
  });

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem(FIRST_VISIT_KEY);
    const savedLanguage = localStorage.getItem(STORAGE_KEY);

    if (isFirstVisit && !savedLanguage) {
      const detected = detectBrowserLanguage();
      setLanguageState(detected);
      localStorage.setItem(FIRST_VISIT_KEY, 'true');
      
      if (detected !== 'en') {
        toast({
          title: `Language set to ${languageNames[detected]}`,
          description: "Tap the language selector to change it anytime.",
          duration: 5000,
        });
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
