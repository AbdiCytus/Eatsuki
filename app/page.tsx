import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MainProductsSection from "./components/MainProductsSection";
import SideProductsSection from "./components/SideProductsSection";

/**
 * Root landing page for Eatsuki.
 * Server Component — composes all landing page sections.
 * Interactive child components declare "use client" individually.
 */
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "#FAFAF9" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MainProductsSection />
      <SideProductsSection />
      {/* Bundle, Comments, Footer — coming in next milestones */}
    </main>
  );
}
