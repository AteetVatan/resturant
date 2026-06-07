import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#welcome", label: "Welcome" },
    { href: "#eat", label: "Eat" },
    { href: "#drink", label: "Drink" },
    { href: "#team", label: "Team" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-comorin-gradient text-white shadow-elegant backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <button
            onClick={() => scrollToSection("#welcome")}
            className="group text-left"
            aria-label="Rouin Safi home"
          >
            <span className="block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text font-logo text-2xl font-black leading-none tracking-wider text-transparent drop-shadow-lg">
              Rouin Safi
            </span>
            <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.34em] text-comorin-teal-light">
              Essen
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/72 transition duration-300 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a
              href="https://www.lieferando.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-comorin-teal px-5 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-comorin-teal-light"
            >
              <ShoppingBag className="h-4 w-4" />
              Order
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setIsOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/20 bg-comorin-overlay backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-5">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="rounded-lg px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.18em] text-white/78 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://www.lieferando.de"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-comorin-teal px-5 text-sm font-bold uppercase tracking-[0.16em] text-white"
              >
                <ShoppingBag className="h-4 w-4" />
                Order Online
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
