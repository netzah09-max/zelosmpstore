import heroBanner from "@/assets/hero-banner.jpg";
import storeCard from "@/assets/store-card.jpg";
import statsCard from "@/assets/stats-card.jpg";
import joinCard from "@/assets/join-card.jpg";
import DiscordBadge from "@/components/DiscordBadge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServerIPBadge from "@/components/ServerIPBadge";
import LinkCard from "@/components/LinkCard";
import { Twitch } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroBanner}
          alt="ZeloSMP Server"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-background/50" />
        <div className="relative z-10 text-center space-y-6">
          <h1 className="font-pixel text-3xl md:text-5xl text-primary glow-text animate-float">
            ZELOSMP
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            The ultimate Minecraft experience awaits
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <ServerIPBadge />
            <DiscordBadge />
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="container py-12 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <LinkCard
            title="Store"
            subtitle="Browse ranks & crate keys"
            image={storeCard}
            to="/store"
          />
          <LinkCard
            title="Stats"
            subtitle="Coming soon..."
            image={statsCard}
            to="/"
          />
          <LinkCard
            title="How To Join"
            subtitle="zelosmp.serv.cx"
            image={joinCard}
            to="/"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
