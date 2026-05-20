-- Create opening hours table
CREATE TABLE public.opening_hours (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week TEXT NOT NULL,
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu categories table
CREATE TABLE public.menu_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu items table
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create drink categories table
CREATE TABLE public.drink_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create drink items table
CREATE TABLE public.drink_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.drink_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact info table
CREATE TABLE public.contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL, -- 'phone', 'address', 'email', 'social', 'imprint', 'delivery_time'
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) - making all tables publicly readable since this is restaurant data
ALTER TABLE public.opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drink_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drink_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Opening hours are publicly readable" ON public.opening_hours FOR SELECT USING (true);
CREATE POLICY "Menu categories are publicly readable" ON public.menu_categories FOR SELECT USING (true);
CREATE POLICY "Menu items are publicly readable" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Drink categories are publicly readable" ON public.drink_categories FOR SELECT USING (true);
CREATE POLICY "Drink items are publicly readable" ON public.drink_items FOR SELECT USING (true);
CREATE POLICY "Contact info is publicly readable" ON public.contact_info FOR SELECT USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_opening_hours_updated_at BEFORE UPDATE ON public.opening_hours FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_menu_categories_updated_at BEFORE UPDATE ON public.menu_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_drink_categories_updated_at BEFORE UPDATE ON public.drink_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_drink_items_updated_at BEFORE UPDATE ON public.drink_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON public.contact_info FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample opening hours data
INSERT INTO public.opening_hours (day_of_week, open_time, close_time) VALUES
('Monday', '17:00', '23:30'),
('Tuesday', '17:00', '23:30'),
('Wednesday', '17:00', '23:30'),
('Thursday', '17:00', '23:30'),
('Friday', '17:00', '23:30'),
('Saturday', '17:00', '23:30'),
('Sunday', '17:00', '23:30');

-- Insert menu categories
INSERT INTO public.menu_categories (name, image_url, display_order) VALUES
('Afghan Starters', '/assets/menu-appetizers.jpg', 1),
('Salads', '/assets/menu-salads.jpg', 2),
('Afghan Mains', '/assets/menu-afghan-mains.jpg', 3),
('Pasta', '/assets/menu-pasta.jpg', 4),
('Desserts', '/assets/menu-desserts.jpg', 5);

-- Insert menu items
INSERT INTO public.menu_items (category_id, name, price, display_order) VALUES
-- Afghan Starters
((SELECT id FROM public.menu_categories WHERE name = 'Afghan Starters'), 'Bolani Kachaloo', 6.50, 1),
((SELECT id FROM public.menu_categories WHERE name = 'Afghan Starters'), 'Mantu', 9.90, 2),
((SELECT id FROM public.menu_categories WHERE name = 'Afghan Starters'), 'Ashak', 9.50, 3),
((SELECT id FROM public.menu_categories WHERE name = 'Afghan Starters'), 'Borani Banjan', 8.90, 4),

-- Salads
((SELECT id FROM public.menu_categories WHERE name = 'Salads'), 'Salata Afghani', 7.50, 1),
((SELECT id FROM public.menu_categories WHERE name = 'Salads'), 'Mast-o-Khiar', 6.90, 2),
((SELECT id FROM public.menu_categories WHERE name = 'Salads'), 'Sabzi Salad', 8.90, 3),

-- Afghan Mains
((SELECT id FROM public.menu_categories WHERE name = 'Afghan Mains'), 'Kabuli Pulao', 17.90, 1),
((SELECT id FROM public.menu_categories WHERE name = 'Afghan Mains'), 'Qorma Sabzi', 16.50, 2),
((SELECT id FROM public.menu_categories WHERE name = 'Afghan Mains'), 'Chapli Kebab', 18.50, 3),
((SELECT id FROM public.menu_categories WHERE name = 'Afghan Mains'), 'Kofta Challow', 16.90, 4),
((SELECT id FROM public.menu_categories WHERE name = 'Afghan Mains'), 'Qabili Lamb', 20.50, 5),
((SELECT id FROM public.menu_categories WHERE name = 'Afghan Mains'), 'Sabzi Challow', 15.90, 6),

-- Pasta
((SELECT id FROM public.menu_categories WHERE name = 'Pasta'), 'Mantu Ravioli', 13.90, 1),
((SELECT id FROM public.menu_categories WHERE name = 'Pasta'), 'Qorma Linguine', 14.50, 2),
((SELECT id FROM public.menu_categories WHERE name = 'Pasta'), 'Sabzi Tagliatelle', 13.50, 3),

-- Desserts
((SELECT id FROM public.menu_categories WHERE name = 'Desserts'), 'Firni', 5.90, 1),
((SELECT id FROM public.menu_categories WHERE name = 'Desserts'), 'Sheer Yakh', 6.50, 2),
((SELECT id FROM public.menu_categories WHERE name = 'Desserts'), 'Pistachio Baklava', 6.90, 3),
((SELECT id FROM public.menu_categories WHERE name = 'Desserts'), 'Shir Berenj', 5.90, 4);

-- Insert drink categories
INSERT INTO public.drink_categories (name, image_url, display_order) VALUES
('Beer', '/assets/drink-beer.jpg', 1),
('Wine', '/assets/drink-wine.jpg', 2),
('Yogurt Drinks', '/assets/drink-yogurt.png', 3),
('Tea & Coffee', '/assets/drink-tea.jpg', 4),
('Soft Drinks', '/assets/drink-soft.jpg', 5);

-- Insert drink items
INSERT INTO public.drink_items (category_id, name, price, display_order) VALUES
-- Beer
((SELECT id FROM public.drink_categories WHERE name = 'Beer'), 'Pilsner', 4.50, 1),
((SELECT id FROM public.drink_categories WHERE name = 'Beer'), 'Wheat Beer', 4.90, 2),
((SELECT id FROM public.drink_categories WHERE name = 'Beer'), 'Bitburger', 3.90, 3),

-- Wine
((SELECT id FROM public.drink_categories WHERE name = 'Wine'), 'Sauvignon Blanc', 24.90, 1),
((SELECT id FROM public.drink_categories WHERE name = 'Wine'), 'Pinot Noir', 28.50, 2),
((SELECT id FROM public.drink_categories WHERE name = 'Wine'), 'House Red', 19.90, 3),

-- Yogurt Drinks
((SELECT id FROM public.drink_categories WHERE name = 'Yogurt Drinks'), 'Doogh', 4.50, 1),
((SELECT id FROM public.drink_categories WHERE name = 'Yogurt Drinks'), 'Mint Doogh', 4.90, 2),
((SELECT id FROM public.drink_categories WHERE name = 'Yogurt Drinks'), 'Rose Yogurt Drink', 5.50, 3),

-- Tea & Coffee
((SELECT id FROM public.drink_categories WHERE name = 'Tea & Coffee'), 'Shir Chai', 3.90, 1),
((SELECT id FROM public.drink_categories WHERE name = 'Tea & Coffee'), 'Kahwah', 3.70, 2),
((SELECT id FROM public.drink_categories WHERE name = 'Tea & Coffee'), 'Espresso', 2.50, 3),
((SELECT id FROM public.drink_categories WHERE name = 'Tea & Coffee'), 'Cappuccino', 3.50, 4),

-- Soft Drinks
((SELECT id FROM public.drink_categories WHERE name = 'Soft Drinks'), 'Coca Cola', 3.50, 1),
((SELECT id FROM public.drink_categories WHERE name = 'Soft Drinks'), 'Sprite', 3.50, 2),
((SELECT id FROM public.drink_categories WHERE name = 'Soft Drinks'), 'Orange Juice', 4.50, 3),
((SELECT id FROM public.drink_categories WHERE name = 'Soft Drinks'), 'Mango Juice', 4.90, 4);

-- Insert contact information
INSERT INTO public.contact_info (type, label, value, display_order) VALUES
('phone', 'Telefon', '+49 123 456 789', 1),
('address', 'Adresse', 'Musterstrasse 123, 12345 Berlin', 2),
('email', 'E-Mail', 'info@rouin-safi.de', 3),
('social', 'Instagram', '@rouinsafi_berlin', 4),
('social', 'Facebook', 'Rouin Safi Berlin', 5),
('imprint', 'Impressum', 'Rouin Safi Restaurant GmbH', 6),
('delivery_time', 'Lieferzeit', '30-45 Minuten', 7);
