export const generateRoomLink = (roomId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/room/${roomId}`;
};

export const generateWhatsAppShareUrl = (text: string, url?: string): string => {
  const message = url ? `${text} ${url}` : text;
  const encodedMessage = encodeURIComponent(message);
  
  // Check if on mobile for app link vs web link
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  if (isMobile) {
    return `whatsapp://send?text=${encodedMessage}`;
  }
  
  return `https://wa.me/?text=${encodedMessage}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

export const isWhatsAppAvailable = (): boolean => {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};
