import { GameRecap } from '@/types/partyFeed';
import { Card } from '@/components/ui/card';
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton';
import { generateRoomLink } from '@/utils/whatsapp';
import { Trophy, Clock } from 'lucide-react';

interface RecapCardProps {
  recap: GameRecap;
  onClick: () => void;
}

const getTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export const RecapCard = ({ recap, onClick }: RecapCardProps) => {
  const roomLink = generateRoomLink(recap.roomId);
  const shareMessage = `🎉 Check out our ${recap.gameModeName} results!\n\n${recap.winnerInfo}\n\nJoin us:`;

  return (
    <Card className="card-game cursor-pointer hover:scale-[1.02] transition-transform" onClick={onClick}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{recap.gameModeIcon}</span>
            <div>
              <h4 className="font-semibold text-sm">{recap.gameModeName}</h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {getTimeAgo(recap.timestamp)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Trophy className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="line-clamp-2">{recap.winnerInfo}</p>
        </div>

        <div className="pt-2 border-t border-border" onClick={(e) => e.stopPropagation()}>
          <WhatsAppShareButton
            text={shareMessage}
            url={roomLink}
            showCopyFallback={false}
          />
        </div>
      </div>
    </Card>
  );
};
