import { useState } from 'react';
import { MessageCircle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { shareOnWhatsApp, copyToClipboard, isWhatsAppAvailable } from '@/utils/whatsapp';
import { toast } from '@/hooks/use-toast';

interface WhatsAppShareButtonProps {
  text: string;
  url?: string;
  className?: string;
  showCopyFallback?: boolean;
}

export const WhatsAppShareButton = ({ 
  text, 
  url, 
  className = '',
  showCopyFallback = true 
}: WhatsAppShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const hasWhatsApp = isWhatsAppAvailable();

  const handleShare = () => {
    shareOnWhatsApp(text, url);
    toast({
      title: "Opening WhatsApp",
      description: "Share with your friends!",
    });
  };

  const handleCopy = async () => {
    const fullText = url ? `${text} ${url}` : text;
    const success = await copyToClipboard(fullText);
    
    if (success) {
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button 
        onClick={handleShare}
        className="btn-whatsapp flex-1 gap-2"
      >
        <MessageCircle className="h-5 w-5" />
        Share on WhatsApp
      </Button>
      
      {showCopyFallback && (
        <Button
          onClick={handleCopy}
          variant="outline"
          size="icon"
          className="rounded-xl"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </Button>
      )}
    </div>
  );
};
