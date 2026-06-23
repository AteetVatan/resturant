import { Award, Flame, Mountain } from "lucide-react";
import grillStory from "@/assets/karahi.jpg";
import { useTranslation } from "@/i18n/LanguageContext";

const TeamSection = () => {
  const { t } = useTranslation();

  return (
    <section id="team" className="section-band section-band-team relative isolate overflow-hidden">
      <div className="absolute inset-0 depth-pattern opacity-35" />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8 lg:py-32">
        <div className="text-white">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light backdrop-blur-md">
            <Mountain className="h-4 w-4" />
            {t.team.badge}
          </div>
          <h2 className="max-w-3xl font-heading text-[clamp(3rem,8vw,7rem)] font-semibold uppercase leading-[0.9] tracking-tight">
            {t.team.title}
          </h2>

          <div className="mt-8 max-w-xl">
            <div className="space-y-5 text-lg leading-8 text-white/76">
              <p>{t.team.p1}</p>
              <p>{t.team.p2}</p>
            </div>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur-md">
              <Flame className="h-6 w-6 text-comorin-teal-light" />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">{t.team.craftLabel}</p>
              <p className="mt-1 text-2xl font-semibold">{t.team.craftValue}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur-md">
              <Award className="h-6 w-6 text-comorin-teal-light" />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">{t.team.standardLabel}</p>
              <p className="mt-1 text-2xl font-semibold">{t.team.standardValue}</p>
            </div>
          </div>
        </div>

        <div className="depth-stage">
          <div className="chef-portrait-wrap relative mx-auto min-h-[660px] max-w-[520px] overflow-hidden rounded-xl border border-white/12 shadow-[0_50px_130px_hsl(var(--comorin-teal-dark)/0.5)]">
            <img
              src={grillStory}
              alt="Würzige Karahi-Pfanne von Kabul Street Kitchen"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,hsl(var(--comorin-teal-dark)/0.9)_100%)]" />
            <div className="absolute bottom-7 left-6 right-6 rounded-lg border border-white/12 bg-comorin-teal-dark/45 p-5 text-white shadow-[0_22px_70px_hsl(var(--comorin-teal-dark)/0.45)] backdrop-blur-xl sm:left-12 sm:right-12">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light">{t.team.grillLabel}</p>
              <p className="mt-2 text-2xl font-semibold leading-tight">{t.team.grillValue}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
