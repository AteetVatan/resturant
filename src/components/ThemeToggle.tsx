import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 transition-colors duration-300"
          aria-label="Change theme"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-popover backdrop-blur-sm border border-border shadow-xl">
        <div className="space-y-3">
          <h3 className="text-lg font-logo text-center text-popover-foreground mb-4">
            Choose Your Theme
          </h3>
          <div className="grid gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setTheme(theme.id);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-all duration-200 group"
              >
                {/* Data-driven swatch: each theme's own colour, all shown at once. */}
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: theme.preview }}
                />
                <div className="flex-1 text-left">
                  <div className="font-medium text-popover-foreground">
                    {theme.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {theme.description}
                  </div>
                </div>
                {currentTheme === theme.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeToggle;