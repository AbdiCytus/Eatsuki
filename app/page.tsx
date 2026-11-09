import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

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
      {/* More sections will be added in subsequent milestones */}
    </main>
  );
}
