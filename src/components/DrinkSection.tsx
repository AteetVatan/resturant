import { Beer, Coffee, Sparkles, Wine } from "lucide-react";
import beverages from "@/assets/beverages.jpg";
import yogurtDrink from "@/assets/drink-yogurt.png";
import { useDrinkCategories } from "@/hooks/useRestaurantData";

const DrinkSection = () => {
  const drinkCategories = useDrinkCategories();

  return (
    <section id="drink" className="section-band section-band-drink relative isolate overflow-hidden">
      <div className="absolute inset-0 depth-pattern opacity-40" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div className="order-2 depth-stage lg:order-1">
            <div className="feature-plate relative min-h-[560px] overflow-hidden rounded-xl border border-white/12 shadow-[0_40px_120px_hsl(var(--comorin-teal-dark)/0.42)]">
              <img
                src={beverages}
                alt="Craft drinks at Rouin Safi"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--comorin-teal-dark)/0.24)_0%,hsl(var(--comorin-teal-dark)/0.78)_100%)]" />
              <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-comorin-teal-dark/30 p-3 backdrop-blur-md">
                <img src={yogurtDrink} alt="Afghan yogurt drink" loading="lazy" decoding="async" className="h-28 w-28 rounded-full object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="max-w-md">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light">House drinks</p>
                  <h3 className="mt-3 text-4xl font-semibold leading-tight text-white">Shir Chai warmth, doogh freshness, wine for the long table.</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 text-white lg:order-2">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light backdrop-blur-md">
              <Wine className="h-4 w-4" />
              Bar
            </div>
            <h2 className="text-[clamp(4rem,10vw,8.5rem)] font-light leading-none tracking-normal">
              DRINK
            </h2>
            <p className="mt-6 max-w-xl text-xl leading-8 text-white/76">
              A compact bar list shaped around Afghan classics, easy dinners, and crisp refreshment between courses.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                <Beer className="h-6 w-6 text-comorin-teal-light" />
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">Beer</p>
                <p className="mt-1 text-2xl font-semibold">Crisp</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                <Coffee className="h-6 w-6 text-comorin-teal-light" />
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">Chai</p>
                <p className="mt-1 text-2xl font-semibold">Spiced</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                <Sparkles className="h-6 w-6 text-comorin-teal-light" />
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">Doogh</p>
                <p className="mt-1 text-2xl font-semibold">Velvet</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {drinkCategories.map((category) => (
            <article key={category.id} className="menu-category-card group">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={category.image_url}
                  alt={category.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--comorin-teal-dark)/0)_0%,hsl(var(--comorin-teal-dark)/0.7)_100%)]" />
                <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-semibold text-white">
                  {category.name}
                </h3>
              </div>

              <div className="space-y-3 p-5">
                {category.drink_items.map((item) => (
                  <div key={item.id} className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                    <p className="text-sm leading-5 text-white/86">{item.name}</p>
                    <p className="text-sm font-semibold text-comorin-teal-light">EUR {item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DrinkSection;
