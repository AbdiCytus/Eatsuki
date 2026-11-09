/**
 * SideProductsSection — Server Component
 *
 * Displays Eatsuki's side dish lineup in a responsive grid.
 * Products: rice bowl, kentang goreng, dimsum, tempe mendoan, jamur krispi, dll.
 * Each card is wrapped with ScrollAnimationWrapper for AOS effect.
 */

import ProductCard from "./ProductCard";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const SIDE_PRODUCTS = [
  {
    emoji: "🍚",
    name: "Rice Bowl Spesial",
    description: "Nasi putih hangat dengan topping ayam/sapi berbumbu, telur onsen, dan saus teriyaki.",
    price: "Rp 20.000",
    badge: "Best Seller",
    badgeColor: "orange" as const,
  },
  {
    emoji: "🍟",
    name: "Kentang Goreng",
    description: "Kentang goreng crispy seasoning keju, disajikan dengan saus sambal dan mayo.",
    price: "Rp 15.000",
  },
  {
    emoji: "🥟",
    name: "Dimsum Mix",
    description: "5 pcs dimsum pilihan: hakau, siomay, dan chiu chow, dikukus sempurna dengan saus ponzu.",
    price: "Rp 18.000",
    badge: "Favorit",
    badgeColor: "red" as const,
  },
  {
    emoji: "🫘",
    name: "Tempe Mendoan",
    description: "Tempe tipis berlapis tepung bumbu renyah, digoreng setengah matang, disajikan hangat.",
    price: "Rp 12.000",
  },
  {
    emoji: "🍄",
    name: "Jamur Krispi",
    description: "Jamur tiram pilihan dibalut tepung krispi berbumbu, gurih dan renyah di setiap gigitan.",
    price: "Rp 14.000",
    badge: "New",
    badgeColor: "red" as const,
  },
  {
    emoji: "🥚",
    name: "Telur Gulung",
    description: "Tamagoyaki ala Jepang dengan isian keju dan sayuran, manis gurih, lembut di dalam.",
    price: "Rp 13.000",
  },
  {
    emoji: "🍢",
    name: "Sate Usus",
    description: "Usus ayam dibersihkan dan dibakar dengan kecap manis berbumbu rempah pilihan.",
    price: "Rp 10.000",
  },
  {
    emoji: "🥦",
    name: "Brokoli Crispy",
    description: "Brokoli segar dibalut tepung bumbu renyah dan digoreng sempurna. Sehat tapi tetap enak!",
    price: "Rp 13.000",
  },
];

export default function SideProductsSection() {
  return (
    <section
      id="side-dish"
      style={{ backgroundColor: "#FFFFFF", padding: "96px 0" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <ScrollAnimationWrapper delay={0}>
            <span
              className="inline-block font-body font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ color: "#DC2626" }}
            >
              Side Dish
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
              Pelengkap yang{" "}
              <span style={{ color: "#DC2626" }}>Ngangenin</span>
            </h2>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper delay={160}>
            <p
              className="font-body text-lg leading-relaxed mt-4 mx-auto"
              style={{ color: "#78716C", maxWidth: "520px" }}
            >
              Nikmati aneka side dish lezat sebagai teman makan atau camilan
              di waktu santai. Murah, enak, bikin nagih!
            </p>
          </ScrollAnimationWrapper>
        </div>

        {/* ── Product grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SIDE_PRODUCTS.map((product, index) => (
            <ScrollAnimationWrapper
              key={product.name}
              delay={index * 60}
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

