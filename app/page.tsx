import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BundleSection from "./components/BundleSection";
import ProductsSection from "./components/ProductsSection";
import AboutSection from "./components/AboutSection";
import CommentsSection from "./components/CommentsSection";
import Footer from "./components/Footer";

/**
 * Root landing page for Eatsuki.
 * Server Component — composes all landing page sections.
 * Interactive child components declare "use client" individually.
 *
 * Section order (per adjustment plan):
 *   Hero → Bundle → Menu (toggle) → About → Comments → Footer
 */
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "#FAFAF9" }}>
      <Navbar />
      <HeroSection />
      <div className="section-divider" />
      <BundleSection />
      <div className="section-divider" />
      <ProductsSection />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <CommentsSection />
      <Footer />
    </main>
  );
}
