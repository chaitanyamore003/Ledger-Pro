import NavBar from "../components/layout/NavBar";

import Hero from "../components/home/Hero";
import TrustSection from "../components/home/TrustSection";
import Features from "../components/home/Features";
import StatsSection from "../components/home/StatsSection";
import CTASection from "../components/home/CTASection";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <NavBar />

      <main>
        <Hero />

        <TrustSection />

        <Features />

        <StatsSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
