import NavBar from "../components/layout/NavBar";

import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import StatsSection from "../components/home/StatsSection";
import CTASection from "../components/home/CTASection";
import Footer from "../components/layout/Footer";
import DashBoardShowcase from "../components/home/DashBoardShowcase";
import SecuritySection from "../components/home/SecuritySection";

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavBar />

      <main>
        <Hero />

        <Features />

        <DashBoardShowcase />

        <SecuritySection />

        <StatsSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
