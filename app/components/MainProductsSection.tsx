/**
 * MainProductsSection — Server Component
 *
 * Displays Eatsuki's main fast food product lineup in a responsive grid.
 * Products: burger, kebab, kentucky-style fried chicken, hot dog, pizza slice.
 * Each card is wrapped with ScrollAnimationWrapper for AOS effect.
 */

import ProductCard from "./ProductCard";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const MAIN_PRODUCTS = [
  {
    emoji: "🍔",
    name: "Burger Jumbo",
    description: "Daging sapi pilihan, selada segar, keju leleh, saus spesial. Double patty, double nikmat.",
    price: "Rp 35.000",
    badge: "Best Seller",
    badgeColor: "orange" as const,
  },
  {
    emoji: "🌯",
    name: "Kebab Spesial",
    description: "Daging panggang berbumbu rempah, sayuran segar, saus garlic mayo dalam tortilla lembut.",
    price: "Rp 28.000",
  },
  {
    emoji: "🍗",
    name: "Ayam Krispy",
    description: "Ayam goreng crispy dengan bumbu rahasia, kulit renyah di luar, juicy di dalam.",
    price: "Rp 25.000",
    badge: "Favorit",
    badgeColor: "red" as const,
  },
  {
    emoji: "🌭",
    name: "Hot Dog Jumbo",
    description: "Sosis besar berkualitas, topping bawang karamel, mustard, dan saus keju spesial.",
    price: "Rp 22.000",
  },
  {
    emoji: "🍕",
    name: "Pizza Mini",
    description: "Personal pizza dengan topping mozarella melimpah, pepperoni, dan saus tomat homemade.",
    price: "Rp 32.000",
    badge: "New",
    badgeColor: "red" as const,
  },
  {
    emoji: "🥪",
    name: "Sandwich Club",
    description: "Roti panggang lapis tiga, isi dada ayam, telur, selada, tomat, dan mayo.",
    price: "Rp 27.000",
  },
];

export default function MainProductsSection() {
  return (
    <section
      id="menu"
      style={{ backgroundColor: "#FAFAF9", padding: "96px 0" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <ScrollAnimationWrapper delay={0}>
            <span
              className="inline-block font-body font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ color: "#F97316" }}
            >
              Menu Utama
            </span>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper delay={80}>
            <h2
              className="font-heading font-extrabold leading-tight"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                color: "#1C1917",
                letterSpacing: "-0.02em",
              }}
            >
              Makanan Cepat Saji{" "}
              <span style={{ color: "#F97316" }}>Terbaik</span>
            </h2>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper delay={160}>
            <p
              className="font-body text-lg leading-relaxed mt-4 mx-auto"
              style={{ color: "#78716C", maxWidth: "520px" }}
            >
              Pilihan menu fast food premium yang siap memuaskan laparmu.
              Diolah segar, disajikan cepat.
            </p>
          </ScrollAnimationWrapper>
        </div>

        {/* ── Product grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAIN_PRODUCTS.map((product, index) => (
            <ScrollAnimationWrapper
              key={product.name}
              delay={index * 80}
              direction="up"
            >
              <ProductCard {...product} />
            </ScrollAnimationWrapper>
          ))}
        </div>

      </div>
    </section>
  );
}

