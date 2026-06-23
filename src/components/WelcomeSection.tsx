import { lazy, Suspense } from "react";
import { ArrowDown, Clock, Flame, Utensils } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import grillBackdrop from "@/assets/grill.jpg";
import kabulLogo from "@/assets/kabul-logo.jpg";
import { dayOrder } from "@/data/restaurantData";
import { useOpeningHours } from "@/hooks/useRestaurantData";

// Pulls in three.js — load it on demand so it stays out of the initial bundle.
const ThreeDiningScene = lazy(() => import("@/components/ThreeDiningScene"));

const dayLabels: Record<string, string> = {
  Monday: "Mo",
  Tuesday: "Di",
  Wednesday: "Mi",
  Thursday: "Do",
  Friday: "Fr",
  Saturday: "Sa",
  Sunday: "So",
};

const WelcomeSection = () => {
  const openingHours = useOpeningHours();

  const sortedOpeningHours = [...openingHours]
    .sort((a, b) => dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week))
    .map((hour) => ({
      day: dayLabels[hour.day_of_week] ?? hour.day_of_week.slice(0, 2),
      time: hour.is_closed ? "Geschlossen" : `${hour.open_time.slice(0, 5)} – ${hour.close_time.slice(0, 5)}`,
      isClosed: hour.is_closed,
    }));

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="welcome" className="luxury-hero relative isolate min-h-screen overflow-hidden bg-comorin-gradient">
      <img
        src={grillBackdrop}
        alt="Kabul Street Kitchen vom Holzkohlegrill"
        className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-comorin-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--comorin-teal-dark)/0.98)_0%,hsl(var(--comorin-teal-dark)/0.92)_42%,hsl(var(--comorin-teal-dark)/0.45)_72%,hsl(var(--comorin-teal-dark)/0.16)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--comorin-teal-dark)/0.42)_0%,hsl(var(--comorin-teal-dark)/0.16)_45%,hsl(var(--comorin-teal-dark)/0.72)_100%)]" />
      <div className="absolute inset-0 depth-pattern opacity-70" />

      <ErrorBoundary>
        <Suspense fallback={null}>
          <ThreeDiningScene />
        </Suspense>
      </ErrorBoundary>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pt-28 sm:px-6 lg:px-8">
        <div className="grid flex-1 items-center gap-10 pb-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.7fr)]">
          <div className="hero-copy-contrast relative max-w-3xl text-white">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-comorin-teal-light">
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 backdrop-blur-md">
                <Flame className="h-4 w-4" />
                Holzkohlegrill
              </span>
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 backdrop-blur-md">
                <Utensils className="h-4 w-4" />
                Afghanische Kabul Street Kitchen
              </span>
            </div>

            <div className="mb-7 flex items-center gap-5">
              <img
                src={kabulLogo}
                alt="Kabul Street Kitchen Logo"
                className="h-28 w-28 shrink-0 rounded-2xl border border-white/15 object-cover shadow-[0_24px_70px_hsl(var(--comorin-teal-dark)/0.7)] sm:h-36 sm:w-36"
              />
              <h1 className="font-logo text-[clamp(2.6rem,7vw,5.5rem)] font-black uppercase leading-[0.86] tracking-[0.04em] text-white text-balance drop-shadow-[0_20px_70px_hsl(var(--comorin-teal-dark)/0.7)]">
                <span className="block">Kabul</span>
                <span className="block bg-gradient-to-r from-comorin-teal-light via-comorin-teal to-comorin-teal-light bg-clip-text text-transparent">
                  Street Kitchen
                </span>
              </h1>
            </div>

            <p className="hero-subtitle mt-4 max-w-2xl text-2xl font-light leading-tight tracking-wide sm:text-3xl lg:text-4xl">
              Authentische afghanische Kabul Street Kitchen – vom Holzkohlegrill.
            </p>

            <p className="hero-support-copy mt-6 max-w-xl text-base font-normal leading-8 sm:text-lg">
              Frisch und mit Herz zubereitet: würzige Kebabspieße, Kabuli Palaw, Karahi und Döner –
              die Aromen Kabuls direkt vom Grill auf deinen Teller.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollToSection("#eat")}
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-comorin-teal px-7 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-elegant transition duration-300 hover:-translate-y-0.5 hover:bg-comorin-teal-light"
              >
                Speisekarte ansehen
                <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>

          <aside className="depth-stage hidden justify-self-end lg:block">
            <div className="hero-hours-panel w-[360px] rounded-lg border border-white/16 bg-comorin-teal-dark/35 p-5 text-white shadow-[0_32px_100px_hsl(var(--comorin-teal-dark)/0.5)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-comorin-teal-light">Heute</p>
                  <h2 className="mt-2 text-2xl font-semibold">Geöffnet</h2>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full bg-white/12">
                  <Clock className="h-5 w-5 text-comorin-teal-light" />
                </div>
              </div>

              <div className="space-y-2">
                {sortedOpeningHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.06] px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-white/78">{item.day}</span>
                    <span className={item.isClosed ? "font-semibold text-destructive" : "font-semibold text-white"}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
