import { Palette } from 'lucide-react';
import { useTheme, ThemeType } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const themes: { value: ThemeType; label: string; colors: string }[] = [
  { value: 'party', label: '🎉 Party', colors: 'Purple & Magenta' },
  { value: 'neon', label: '⚡ Neon', colors: 'Electric Blue & Cyan' },
  { value: 'campus', label: '🎓 Campus', colors: 'Navy & Orange' },
  { value: 'sunset', label: '🌅 Sunset', colors: 'Orange & Coral' },
  { value: 'jungle', label: '🌿 Jungle', colors: 'Green & Teal' },
  { value: 'minimal', label: '✨ Minimal', colors: 'Clean Slate' },
];

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const currentTheme = themes.find(t => t.value === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full border-2">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`cursor-pointer ${theme === t.value ? 'bg-primary/10' : ''}`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{t.label}</span>
              <span className="text-xs text-muted-foreground">{t.colors}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
