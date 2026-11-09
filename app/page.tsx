import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MainProductsSection from "./components/MainProductsSection";
import SideProductsSection from "./components/SideProductsSection";
import BundleSection from "./components/BundleSection";
import CommentsSection from "./components/CommentsSection";
import Footer from "./components/Footer";

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
      <BundleSection />
      <CommentsSection />
      <Footer />
    </main>
  );
}
