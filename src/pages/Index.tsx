import Navigation from "@/components/Navigation";
import WelcomeSection from "@/components/WelcomeSection";
import EatSection from "@/components/EatSection";
import DrinkSection from "@/components/DrinkSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-comorin-gradient">
      <Navigation />
      <WelcomeSection />
      <EatSection />
      <DrinkSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
};

export default Index;
