import { useEffect, useState } from "react";
import { ArrowDown, Clock, ExternalLink, ShoppingBag, Sparkles, Utensils } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ThreeDiningScene from "@/components/ThreeDiningScene";
import restaurantInterior from "@/assets/restaurant-interior.jpg";
import {
  dayOrder,
  fallbackOpeningHours,
  type OpeningHour,
} from "@/data/restaurantData";

const WelcomeSection = () => {
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>(fallbackOpeningHours);

  useEffect(() => {
    let isMounted = true;

    const fetchOpeningHours = async () => {
      if (!supabase) return;

      const { data, error } = await supabase
        .from("opening_hours")
        .select("*")
        .order("day_of_week");

      if (!isMounted) return;

      if (error) {
        console.error("Error fetching opening hours:", error);
        return;
      }

      if (data?.length) {
        setOpeningHours(data);
      }
    };

    fetchOpeningHours();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortedOpeningHours = [...openingHours]
    .sort((a, b) => dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week))
    .map((hour) => ({
      day: hour.day_of_week.slice(0, 3),
      time: hour.is_closed ? "Closed" : `${hour.open_time.slice(0, 5)} - ${hour.close_time.slice(0, 5)}`,
      isClosed: hour.is_closed,
    }));

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="welcome" className="luxury-hero relative isolate min-h-screen overflow-hidden bg-comorin-gradient">
      <img
        src={restaurantInterior}
        alt="Rouin Safi dining room"
        className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-comorin-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--comorin-teal-dark)/0.98)_0%,hsl(var(--comorin-teal-dark)/0.92)_42%,hsl(var(--comorin-teal-dark)/0.45)_72%,hsl(var(--comorin-teal-dark)/0.16)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--comorin-teal-dark)/0.42)_0%,hsl(var(--comorin-teal-dark)/0.16)_45%,hsl(var(--comorin-teal-dark)/0.72)_100%)]" />
      <div className="absolute inset-0 depth-pattern opacity-70" />

      <ThreeDiningScene />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pt-28 sm:px-6 lg:px-8">
        <div className="grid flex-1 items-center gap-10 pb-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.7fr)]">
          <div className="hero-copy-contrast relative max-w-3xl text-white">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-comorin-teal-light">
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
                Afghan soul
              </span>
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 backdrop-blur-md">
                <Utensils className="h-4 w-4" />
                Pasta craft
              </span>
            </div>

            <h1 className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text font-logo text-[clamp(4.5rem,12vw,10.5rem)] font-black leading-[0.82] tracking-wider text-transparent text-balance drop-shadow-[0_20px_70px_hsl(var(--comorin-teal-dark)/0.65)]">
              Rouin Safi
            </h1>

            <p className="hero-subtitle mt-8 max-w-2xl text-2xl font-light leading-tight tracking-wide sm:text-3xl lg:text-4xl">
              Food where the heart of the city beats.
            </p>

            <p className="hero-support-copy mt-6 max-w-xl text-base font-normal leading-8 sm:text-lg">
              A cinematic table of Afghan comfort, Italian familiarity, and warm hospitality, served in a dining room built for long evenings.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollToSection("#eat")}
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-comorin-teal px-7 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-elegant transition duration-300 hover:-translate-y-0.5 hover:bg-comorin-teal-light"
              >
                Explore Menu
                <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
              </button>
              <button
                onClick={() => window.open("https://www.lieferando.de", "_blank")}
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/22 bg-white/10 px-7 text-sm font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-comorin-teal-dark"
              >
                <ShoppingBag className="h-4 w-4" />
                Order Online
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>

          <aside className="depth-stage hidden justify-self-end lg:block">
            <div className="hero-hours-panel w-[360px] rounded-lg border border-white/16 bg-comorin-teal-dark/35 p-5 text-white shadow-[0_32px_100px_hsl(var(--comorin-teal-dark)/0.4)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-comorin-teal-light">Tonight</p>
                  <h2 className="mt-2 text-2xl font-semibold">Open for dinner</h2>
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
                    <span className={item.isClosed ? "font-semibold text-red-200" : "font-semibold text-white"}>
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
