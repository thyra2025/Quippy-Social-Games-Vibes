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
  },
  pidgin: {
    startGame: "Start Game",
    joinParty: "Join di Party",
    submitAnswer: "Send Your Answer",
    submitCaption: "Send Your Caption",
    submitStatement: "Send Your Talk",
    timeRemaining: "Time Wey Remain",
    yourAnswer: "Your Answer",
    waiting: "We dey wait for other players...",
    voting: "Vote for di one wey you like",
    winner: "Winner",
    playAgain: "Play Again",
    shareWhatsApp: "Share for WhatsApp",
    partyFeed: "Game History",
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
    playerName: "Player Name",
    enterName: "Put your name",
    viewPartyFeed: "See Game History",
    noRecaps: "No game recap yet. Start play make you see am here!",
    backToLobby: "Go Back",
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
