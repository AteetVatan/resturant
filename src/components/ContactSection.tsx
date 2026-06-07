import { Clock, ExternalLink, Instagram, Mail, MapPin, Phone, ShoppingBag } from "lucide-react";
import restaurantInterior from "@/assets/restaurant-interior.jpg";
import { useContactInfo } from "@/hooks/useRestaurantData";

const ContactSection = () => {
  const contactInfo = useContactInfo();

  const getContactByType = (type: string) => contactInfo.filter((info) => info.type === type);
  const phone = getContactByType("phone")[0];
  const address = getContactByType("address")[0];
  const email = getContactByType("email")[0];
  const deliveryTime = getContactByType("delivery_time")[0];
  const socials = getContactByType("social");

  return (
    <section id="contact" className="section-band section-band-contact relative isolate overflow-hidden">
      <div className="absolute inset-0 depth-pattern opacity-30" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-center">
          <div className="text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light backdrop-blur-md">
              <MapPin className="h-4 w-4" />
              Visit
            </div>
            <h2 className="text-[clamp(3.5rem,8vw,7rem)] font-light leading-[0.92] tracking-normal">
              CONTACT US
            </h2>
            <p className="mt-6 max-w-xl text-xl leading-8 text-white/74">
              Book a table, pick up dinner, or let the evening come to you.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={phone ? `tel:${phone.value.replace(/\s/g, "")}` : undefined}
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-comorin-teal px-7 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-elegant transition duration-300 hover:-translate-y-0.5 hover:bg-comorin-teal-light"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
              <a
                href="https://www.lieferando.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/22 bg-white/10 px-7 text-sm font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-comorin-teal-dark"
              >
                <ShoppingBag className="h-4 w-4" />
                Order
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="depth-stage">
            <div className="contact-scene relative min-h-[640px] overflow-hidden rounded-xl border border-white/12 shadow-[0_40px_120px_hsl(var(--comorin-teal-dark)/0.42)]">
              <img
                src={restaurantInterior}
                alt="Rouin Safi restaurant atmosphere"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--comorin-teal-dark)/0.86)_0%,hsl(var(--comorin-teal-dark)/0.48)_55%,hsl(var(--comorin-teal-dark)/0.18)_100%)]" />

              <div className="absolute inset-x-5 bottom-5 grid gap-4 text-white md:grid-cols-2">
                <div className="contact-tile md:col-span-2">
                  <MapPin className="h-5 w-5 text-comorin-teal-light" />
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">Rouin Safi</span>
                    <span className="mt-1 block text-lg font-semibold">Where Kabuli rice meets city craft.</span>
                  </span>
                </div>
                {phone && (
                  <a href={`tel:${phone.value.replace(/\s/g, "")}`} className="contact-tile">
                    <Phone className="h-5 w-5 text-comorin-teal-light" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">{phone.label}</span>
                      <span className="mt-1 block text-lg font-semibold">{phone.value}</span>
                    </span>
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email.value}`} className="contact-tile">
                    <Mail className="h-5 w-5 text-comorin-teal-light" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">{email.label}</span>
                      <span className="mt-1 block text-lg font-semibold">{email.value}</span>
                    </span>
                  </a>
                )}
                {address && (
                  <div className="contact-tile md:col-span-2">
                    <MapPin className="h-5 w-5 text-comorin-teal-light" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">{address.label}</span>
                      <span className="mt-1 block text-lg font-semibold">{address.value}</span>
                    </span>
                  </div>
                )}
                {deliveryTime && (
                  <div className="contact-tile">
                    <Clock className="h-5 w-5 text-comorin-teal-light" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">{deliveryTime.label}</span>
                      <span className="mt-1 block text-lg font-semibold">{deliveryTime.value}</span>
                    </span>
                  </div>
                )}
                {!!socials.length && (
                  <div className="contact-tile">
                    <Instagram className="h-5 w-5 text-comorin-teal-light" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">Social</span>
                      <span className="mt-1 block text-lg font-semibold">
                        {socials.map((item) => item.value).join(" / ")}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              <div className="absolute left-5 top-5 hidden rounded-lg border border-white/12 bg-comorin-teal-dark/35 p-5 text-white backdrop-blur-xl lg:block">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light">Rouin Safi</p>
                <p className="mt-2 max-w-xs text-3xl font-semibold leading-tight">Where Kabuli rice meets city craft.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
