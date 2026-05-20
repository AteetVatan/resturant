import { useEffect, useMemo, useState } from "react";
import { Flame, Leaf, Sparkles, Utensils } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import foodSpread from "@/assets/food-spread.jpg";
import menuSpices from "@/assets/menu-spices.jpg";
import {
  fallbackMenuCategories,
  hasLegacyIndianMenu,
  type MenuCategory,
  type MenuItem,
} from "@/data/restaurantData";

const EatSection = () => {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(fallbackMenuCategories);

  useEffect(() => {
    let isMounted = true;

    const fetchMenuData = async () => {
      try {
        const { data, error } = await supabase
          .from("menu_categories")
          .select(`
            *,
            menu_items (*)
          `)
          .order("display_order");

        if (!isMounted) return;

        if (error) {
          console.error("Error fetching menu data:", error);
          return;
        }

        if (data?.length) {
          const sortedData = data.map((category) => ({
            ...category,
            menu_items: [...category.menu_items].sort(
              (a: MenuItem, b: MenuItem) => a.display_order - b.display_order,
            ),
          }));

          setMenuCategories(hasLegacyIndianMenu(sortedData) ? fallbackMenuCategories : sortedData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMenuData();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredItems = useMemo(
    () =>
      menuCategories
        .flatMap((category) =>
          category.menu_items.slice(0, 1).map((item) => ({
            ...item,
            category: category.name,
          })),
        )
        .slice(0, 4),
    [menuCategories],
  );

  return (
    <section id="eat" className="section-band section-band-eat relative isolate overflow-hidden">
      <div className="absolute inset-0 depth-pattern opacity-50" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-end gap-10 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light backdrop-blur-md">
              <Flame className="h-4 w-4" />
              Kitchen
            </div>
            <h2 className="text-[clamp(4rem,10vw,8.5rem)] font-light leading-none tracking-normal text-white">
              EAT
            </h2>
            <p className="mt-6 max-w-xl text-xl leading-8 text-white/76">
              Afghan comfort dishes arrive with familiar warmth, contemporary restraint, and the house signature: Kabuli rice meets city craft.
            </p>
          </div>

          <div className="depth-stage">
            <div className="feature-plate relative min-h-[520px] overflow-hidden rounded-xl border border-white/12 shadow-[0_40px_120px_hsl(var(--comorin-teal-dark)/0.42)]">
              <img
                src={foodSpread}
                alt="Afghan dishes and pasta served at Rouin Safi"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--comorin-teal-dark)/0.05)_0%,hsl(var(--comorin-teal-dark)/0.78)_100%)]" />
              <img
                src={menuSpices}
                alt="House spices"
                className="absolute right-6 top-6 h-24 w-24 rounded-full border border-white/24 object-cover shadow-[0_18px_45px_hsl(var(--comorin-teal-dark)/0.35)]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  {featuredItems.map((item) => (
                    <div key={`${item.category}-${item.id}`} className="rounded-lg border border-white/12 bg-comorin-teal-dark/35 p-4 text-white backdrop-blur-md">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-comorin-teal-light">{item.category}</p>
                        <p className="font-semibold">EUR {item.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-2 text-lg font-semibold leading-tight">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {menuCategories.map((category) => (
            <article key={category.id} className="menu-category-card group">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--comorin-teal-dark)/0)_0%,hsl(var(--comorin-teal-dark)/0.72)_100%)]" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
                  <Utensils className="h-5 w-5 shrink-0 text-comorin-teal-light" />
                </div>
              </div>

              <div className="space-y-4 p-5">
                <p className="min-h-12 text-sm leading-6 text-white/64">
                  {category.description ?? "House favorites prepared with layered spice and careful timing."}
                </p>
                <div className="space-y-3">
                  {category.menu_items.slice(0, 5).map((item) => (
                    <div key={item.id} className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                      <p className="text-sm leading-5 text-white/86">{item.name}</p>
                      <p className="text-sm font-semibold text-comorin-teal-light">EUR {item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 border-y border-white/12 py-8 text-white md:grid-cols-3">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-comorin-teal text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-comorin-teal-light">Mittagstisch</p>
              <p className="mt-1 text-lg font-semibold">12:00 - 14:30</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/12 text-comorin-teal-light">
              <Leaf className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-comorin-teal-light">Lunch offer</p>
              <p className="mt-1 text-lg font-semibold">Afghan plates, pasta and schnitzel for EUR 8.90</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/12 text-comorin-teal-light">
              <Utensils className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-comorin-teal-light">Service</p>
              <p className="mt-1 text-lg font-semibold">Pickup or dine in</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EatSection;
