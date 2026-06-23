import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  fallbackContactInfo,
  fallbackDrinkCategories,
  fallbackMenuCategories,
  fallbackOpeningHours,
  hasStaleContact,
  hasStaleDrinks,
  hasStaleMenu,
  type ContactInfo,
  type DrinkCategory,
  type DrinkItem,
  type MenuCategory,
  type MenuItem,
  type OpeningHour,
} from "@/data/restaurantData";

// Stable query keys for every piece of restaurant content.
export const restaurantKeys = {
  menu: ["menu-categories"] as const,
  drinks: ["drink-categories"] as const,
  contact: ["contact-info"] as const,
  hours: ["opening-hours"] as const,
};

// Contract for all hooks below: the bundled fallback content shows instantly,
// and live Supabase rows replace it only once they load and pass the legacy
// check. With no database (env vars missing) the site keeps the fallbacks.

const fetchMenuCategories = async (): Promise<MenuCategory[]> => {
  if (!supabase) return fallbackMenuCategories;

  const { data, error } = await supabase
    .from("menu_categories")
    .select(`*, menu_items (*)`)
    .order("display_order");

  if (error) throw error;
  if (!data?.length) return fallbackMenuCategories;

  const sorted = data.map((category) => ({
    ...category,
    menu_items: [...category.menu_items].sort(
      (a: MenuItem, b: MenuItem) => a.display_order - b.display_order,
    ),
  })) as MenuCategory[];

  return hasStaleMenu(sorted) ? fallbackMenuCategories : sorted;
};

export function useMenuCategories(): MenuCategory[] {
  const { data } = useQuery({
    queryKey: restaurantKeys.menu,
    queryFn: fetchMenuCategories,
    placeholderData: fallbackMenuCategories,
    enabled: !!supabase,
  });

  return data ?? fallbackMenuCategories;
}

const fetchDrinkCategories = async (): Promise<DrinkCategory[]> => {
  if (!supabase) return fallbackDrinkCategories;

  const { data, error } = await supabase
    .from("drink_categories")
    .select(`*, drink_items (*)`)
    .order("display_order");

  if (error) throw error;
  if (!data?.length) return fallbackDrinkCategories;

  const sorted = data.map((category) => ({
    ...category,
    drink_items: [...category.drink_items].sort(
      (a: DrinkItem, b: DrinkItem) => a.display_order - b.display_order,
    ),
  })) as DrinkCategory[];

  return hasStaleDrinks(sorted) ? fallbackDrinkCategories : sorted;
};

export function useDrinkCategories(): DrinkCategory[] {
  const { data } = useQuery({
    queryKey: restaurantKeys.drinks,
    queryFn: fetchDrinkCategories,
    placeholderData: fallbackDrinkCategories,
    enabled: !!supabase,
  });

  return data ?? fallbackDrinkCategories;
}

const fetchContactInfo = async (): Promise<ContactInfo[]> => {
  if (!supabase) return fallbackContactInfo;

  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .order("display_order");

  if (error) throw error;
  if (!data?.length) return fallbackContactInfo;

  return hasStaleContact(data) ? fallbackContactInfo : (data as ContactInfo[]);
};

export function useContactInfo(): ContactInfo[] {
  const { data } = useQuery({
    queryKey: restaurantKeys.contact,
    queryFn: fetchContactInfo,
    placeholderData: fallbackContactInfo,
    enabled: !!supabase,
  });

  return data ?? fallbackContactInfo;
}

const fetchOpeningHours = async (): Promise<OpeningHour[]> => {
  if (!supabase) return fallbackOpeningHours;

  const { data, error } = await supabase
    .from("opening_hours")
    .select("*")
    .order("day_of_week");

  if (error) throw error;
  if (!data?.length) return fallbackOpeningHours;

  return data as OpeningHour[];
};

export function useOpeningHours(): OpeningHour[] {
  const { data } = useQuery({
    queryKey: restaurantKeys.hours,
    queryFn: fetchOpeningHours,
    placeholderData: fallbackOpeningHours,
    enabled: !!supabase,
  });

  return data ?? fallbackOpeningHours;
}
