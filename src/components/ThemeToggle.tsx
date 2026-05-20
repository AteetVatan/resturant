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
      <PopoverContent className="w-80 p-4 bg-white/95 backdrop-blur-sm border border-white/20 shadow-xl">
        <div className="space-y-3">
          <h3 className="text-lg font-logo text-center text-gray-800 mb-4">
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
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: theme.preview }}
                />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-800 group-hover:text-gray-900">
                    {theme.name}
                  </div>
                  <div className="text-sm text-gray-600 group-hover:text-gray-700">
                    {theme.description}
                  </div>
                </div>
                {currentTheme === theme.id && (
                  <Check className="h-5 w-5 text-green-600" />
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