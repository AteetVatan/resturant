export interface OpeningHour {
  id: string;
  day_of_week: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  display_order: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  image_url: string;
  description?: string;
  display_order: number;
  menu_items: MenuItem[];
}

export interface DrinkItem {
  id: string;
  name: string;
  price: number;
  display_order: number;
}

export interface DrinkCategory {
  id: string;
  name: string;
  image_url: string;
  display_order: number;
  drink_items: DrinkItem[];
}

export interface ContactInfo {
  id: string;
  type: string;
  label: string;
  value: string;
  display_order: number;
}

const legacyIndianTerms = [
  "indian",
  "india",
  "namaste",
  "curry",
  "butter chicken",
  "vindaloo",
  "palak",
  "dal maharani",
  "biryani",
  "pakora",
  "paneer",
  "tandoori",
  "gulab",
  "kulfi",
  "ras malai",
  "lassi",
  "masala chai",
  "kingfisher",
  "cobra",
  "bella india",
  "bella-india",
  "bellaindia",
];

const hasLegacyIndianText = (value?: string | null) => {
  if (!value) return false;
  const normalized = value.toLowerCase();

  return legacyIndianTerms.some((term) => normalized.includes(term));
};

export const fallbackOpeningHours: OpeningHour[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
].map((day, index) => ({
  id: `fallback-hours-${index}`,
  day_of_week: day,
  open_time: "17:00:00",
  close_time: "23:30:00",
  is_closed: false,
}));

export const fallbackMenuCategories: MenuCategory[] = [
  {
    id: "fallback-appetizers",
    name: "Afghan Starters",
    image_url: "/assets/menu-appetizers.jpg",
    display_order: 1,
    description: "Warm bread, herbs, dumplings, and slow-roasted vegetables.",
    menu_items: [
      { id: "bolani-kachaloo", name: "Bolani Kachaloo", price: 6.5, display_order: 1 },
      { id: "mantu", name: "Mantu", price: 9.9, display_order: 2 },
      { id: "ashak", name: "Ashak", price: 9.5, display_order: 3 },
      { id: "borani-banjan", name: "Borani Banjan", price: 8.9, display_order: 4 },
    ],
  },
  {
    id: "fallback-salads",
    name: "Salads",
    image_url: "/assets/menu-salads.jpg",
    display_order: 2,
    description: "Bright herbs, cucumber, tomato, yogurt, and lemon.",
    menu_items: [
      { id: "salata-afghani", name: "Salata Afghani", price: 7.5, display_order: 1 },
      { id: "mast-o-khiar", name: "Mast-o-Khiar", price: 6.9, display_order: 2 },
      { id: "sabzi-salad", name: "Sabzi Salad", price: 8.9, display_order: 3 },
    ],
  },
  {
    id: "fallback-afghan-mains",
    name: "Afghan Mains",
    image_url: "/assets/menu-afghan-mains.jpg",
    display_order: 3,
    description: "Kabuli rice, tender kebab, qorma, and family-style comfort.",
    menu_items: [
      { id: "kabuli-pulao", name: "Kabuli Pulao", price: 17.9, display_order: 1 },
      { id: "qorma-sabzi", name: "Qorma Sabzi", price: 16.5, display_order: 2 },
      { id: "chapli-kebab", name: "Chapli Kebab", price: 18.5, display_order: 3 },
      { id: "kofta-challow", name: "Kofta Challow", price: 16.9, display_order: 4 },
      { id: "qabili-lamb", name: "Qabili Lamb", price: 20.5, display_order: 5 },
      { id: "sabzi-challow", name: "Sabzi Challow", price: 15.9, display_order: 6 },
    ],
  },
  {
    id: "fallback-pasta",
    name: "Pasta",
    image_url: "/assets/menu-pasta.jpg",
    display_order: 4,
    description: "Italian comfort with Afghan herbs, yogurt, and spice.",
    menu_items: [
      { id: "mantu-ravioli", name: "Mantu Ravioli", price: 13.9, display_order: 1 },
      { id: "qorma-linguine", name: "Qorma Linguine", price: 14.5, display_order: 2 },
      { id: "sabzi-tagliatelle", name: "Sabzi Tagliatelle", price: 13.5, display_order: 3 },
    ],
  },
  {
    id: "fallback-desserts",
    name: "Desserts",
    image_url: "/assets/menu-desserts.jpg",
    display_order: 5,
    description: "Cardamom, rosewater, cream, and pistachio finishes.",
    menu_items: [
      { id: "firni", name: "Firni", price: 5.9, display_order: 1 },
      { id: "sheer-yakh", name: "Sheer Yakh", price: 6.5, display_order: 2 },
      { id: "baklava", name: "Pistachio Baklava", price: 6.9, display_order: 3 },
      { id: "shir-berenj", name: "Shir Berenj", price: 5.9, display_order: 4 },
    ],
  },
];

export const fallbackDrinkCategories: DrinkCategory[] = [
  {
    id: "fallback-beer",
    name: "Beer",
    image_url: "/assets/drink-beer.jpg",
    display_order: 1,
    drink_items: [
      { id: "pilsner", name: "Pilsner", price: 4.5, display_order: 1 },
      { id: "wheat-beer", name: "Wheat Beer", price: 4.9, display_order: 2 },
      { id: "bitburger", name: "Bitburger", price: 3.9, display_order: 3 },
    ],
  },
  {
    id: "fallback-wine",
    name: "Wine",
    image_url: "/assets/drink-wine.jpg",
    display_order: 2,
    drink_items: [
      { id: "sauvignon", name: "Sauvignon Blanc", price: 24.9, display_order: 1 },
      { id: "pinot-noir", name: "Pinot Noir", price: 28.5, display_order: 2 },
      { id: "house-red", name: "House Red", price: 19.9, display_order: 3 },
    ],
  },
  {
    id: "fallback-yogurt-drinks",
    name: "Yogurt Drinks",
    image_url: "/assets/drink-yogurt.png",
    display_order: 3,
    drink_items: [
      { id: "doogh", name: "Doogh", price: 4.5, display_order: 1 },
      { id: "mint-doogh", name: "Mint Doogh", price: 4.9, display_order: 2 },
      { id: "rose-yogurt-drink", name: "Rose Yogurt Drink", price: 5.5, display_order: 3 },
    ],
  },
  {
    id: "fallback-tea",
    name: "Tea & Coffee",
    image_url: "/assets/drink-tea.jpg",
    display_order: 4,
    drink_items: [
      { id: "shir-chai", name: "Shir Chai", price: 3.9, display_order: 1 },
      { id: "kahwah", name: "Kahwah", price: 3.7, display_order: 2 },
      { id: "espresso", name: "Espresso", price: 2.5, display_order: 3 },
      { id: "cappuccino", name: "Cappuccino", price: 3.5, display_order: 4 },
    ],
  },
  {
    id: "fallback-soft",
    name: "Soft Drinks",
    image_url: "/assets/drink-soft.jpg",
    display_order: 5,
    drink_items: [
      { id: "coca-cola", name: "Coca Cola", price: 3.5, display_order: 1 },
      { id: "sprite", name: "Sprite", price: 3.5, display_order: 2 },
      { id: "orange-juice", name: "Orange Juice", price: 4.5, display_order: 3 },
      { id: "mango-juice", name: "Mango Juice", price: 4.9, display_order: 4 },
    ],
  },
];

export const fallbackContactInfo: ContactInfo[] = [
  { id: "phone", type: "phone", label: "Telefon", value: "+49 123 456 789", display_order: 1 },
  { id: "address", type: "address", label: "Adresse", value: "Musterstrasse 123, 12345 Berlin", display_order: 2 },
  { id: "email", type: "email", label: "E-Mail", value: "info@rouin-safi.de", display_order: 3 },
  { id: "instagram", type: "social", label: "Instagram", value: "@rouinsafi_berlin", display_order: 4 },
  { id: "facebook", type: "social", label: "Facebook", value: "Rouin Safi Berlin", display_order: 5 },
  { id: "imprint", type: "imprint", label: "Impressum", value: "Rouin Safi Restaurant GmbH", display_order: 6 },
  { id: "delivery", type: "delivery_time", label: "Lieferzeit", value: "30-45 Minuten", display_order: 7 },
];

export const hasLegacyIndianMenu = (categories: MenuCategory[]) =>
  categories.some(
    (category) =>
      hasLegacyIndianText(category.name) ||
      hasLegacyIndianText(category.description) ||
      category.menu_items.some((item) => hasLegacyIndianText(item.name) || hasLegacyIndianText(item.description)),
  );

export const hasLegacyIndianDrinks = (categories: DrinkCategory[]) =>
  categories.some(
    (category) =>
      hasLegacyIndianText(category.name) ||
      category.drink_items.some((item) => hasLegacyIndianText(item.name)),
  );

export const hasLegacyIndianContact = (items: ContactInfo[]) =>
  items.some((item) => hasLegacyIndianText(item.label) || hasLegacyIndianText(item.value));

export const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
