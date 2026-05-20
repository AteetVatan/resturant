import { Award, ChefHat, Flame } from "lucide-react";
import chefPortrait from "@/assets/chef-afghan-portrait.png";

const TeamSection = () => {
  return (
    <section id="team" className="section-band section-band-team relative isolate overflow-hidden">
      <div className="absolute inset-0 depth-pattern opacity-35" />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8 lg:py-32">
        <div className="text-white">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light backdrop-blur-md">
            <ChefHat className="h-4 w-4" />
            Chef
          </div>
          <h2 className="max-w-3xl text-[clamp(3.5rem,8vw,7.5rem)] font-light leading-[0.92] tracking-normal">
            MEET OUR TEAM
          </h2>

          <div className="mt-8 max-w-xl">
            <h3 className="text-3xl font-semibold">Rouin Safi</h3>
            <p className="mt-2 text-lg font-medium text-comorin-teal-light">Brand Chef - Rouin Safi</p>
            <div className="mt-7 space-y-5 text-lg leading-8 text-white/74">
              <p>
                Chef Safi leads the kitchen with a clear point of view: regional Afghan depth, contemporary plating, and an easy welcome for every table.
              </p>
              <p>
                The result is food that feels familiar at first glance and more layered with every bite.
              </p>
            </div>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur-md">
              <Flame className="h-6 w-6 text-comorin-teal-light" />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">House style</p>
              <p className="mt-1 text-2xl font-semibold">Spice with restraint</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur-md">
              <Award className="h-6 w-6 text-comorin-teal-light" />
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">Focus</p>
              <p className="mt-1 text-2xl font-semibold">Warm, precise service</p>
            </div>
          </div>
        </div>

        <div className="depth-stage">
          <div className="chef-portrait-wrap relative mx-auto min-h-[660px] max-w-[520px] overflow-hidden rounded-xl border border-white/12 shadow-[0_50px_130px_hsl(var(--comorin-teal-dark)/0.44)]">
            <img
              src={chefPortrait}
              alt="Afghan-dressed man representing Chef Rouin Safi"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,hsl(var(--comorin-teal-dark)/0.86)_100%)]" />
            <div className="absolute bottom-7 left-6 right-6 rounded-lg border border-white/12 bg-comorin-teal-dark/35 p-5 text-white shadow-[0_22px_70px_hsl(var(--comorin-teal-dark)/0.35)] backdrop-blur-xl sm:left-12 sm:right-12">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light">At the pass</p>
              <p className="mt-2 text-2xl font-semibold leading-tight">Afghan heritage, city energy, dinner that lingers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
