"use client";

/**
 * ProductsSection — Client Component
 *
 * Merges MainProductsSection and SideProductsSection into a single
 * section with a toggle tab (Menu Utama / Side Dish).
 * - itsuki.png mascot displayed beside the toggle/grid header
 * - Claymorphism toggle pills (solid fill, puffy shadow)
 * - No gradients used anywhere
 */

import { useState } from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import { TableCellsIcon, SparklesIcon } from "@heroicons/react/24/solid";

// ── Product data ─────────────────────────────────────────────────────────────

const MAIN_PRODUCTS = [
  {
    emoji: "🍔",
    name: "Burger Jumbo",
    description:
      "Daging sapi pilihan, selada segar, keju leleh, saus spesial. Double patty, double nikmat.",
    price: "Rp 35.000",
    badge: "Best Seller",
    badgeColor: "orange" as const,
  },
  {
    emoji: "🌯",
    name: "Kebab Spesial",
    description:
      "Daging panggang berbumbu rempah, sayuran segar, saus garlic mayo dalam tortilla lembut.",
    price: "Rp 28.000",
  },
  {
    emoji: "🍗",
    name: "Ayam Krispy",
    description:
      "Ayam goreng crispy dengan bumbu rahasia, kulit renyah di luar, juicy di dalam.",
    price: "Rp 25.000",
    badge: "Favorit",
    badgeColor: "red" as const,
  },
  {
    emoji: "🌭",
    name: "Hot Dog Jumbo",
    description:
      "Sosis besar berkualitas, topping bawang karamel, mustard, dan saus keju spesial.",
    price: "Rp 22.000",
  },
  {
    emoji: "🍕",
    name: "Pizza Mini",
    description:
      "Personal pizza dengan topping mozarella melimpah, pepperoni, dan saus tomat homemade.",
    price: "Rp 32.000",
    badge: "New",
    badgeColor: "red" as const,
  },
  {
    emoji: "🥪",
    name: "Sandwich Club",
    description:
      "Roti panggang lapis tiga, isi dada ayam, telur, selada, tomat, dan mayo.",
    price: "Rp 27.000",
  },
];

const SIDE_PRODUCTS = [
  {
    emoji: "🍚",
    name: "Rice Bowl Spesial",
    description:
      "Nasi putih hangat dengan topping ayam/sapi berbumbu, telur onsen, dan saus teriyaki.",
    price: "Rp 20.000",
    badge: "Best Seller",
    badgeColor: "orange" as const,
  },
  {
    emoji: "🍟",
    name: "Kentang Goreng",
    description:
      "Kentang goreng crispy seasoning keju, disajikan dengan saus sambal dan mayo.",
    price: "Rp 15.000",
  },
  {
    emoji: "🥟",
    name: "Dimsum Mix",
    description:
      "5 pcs dimsum pilihan: hakau, siomay, dan chiu chow, dikukus sempurna dengan saus ponzu.",
    price: "Rp 18.000",
    badge: "Favorit",
    badgeColor: "red" as const,
  },
  {
    emoji: "🫘",
    name: "Tempe Mendoan",
    description:
      "Tempe tipis berlapis tepung bumbu renyah, digoreng setengah matang, disajikan hangat.",
    price: "Rp 12.000",
  },
  {
    emoji: "🍄",
    name: "Jamur Krispi",
    description:
      "Jamur tiram pilihan dibalut tepung krispi berbumbu, gurih dan renyah di setiap gigitan.",
    price: "Rp 14.000",
    badge: "New",
    badgeColor: "red" as const,
  },
  {
    emoji: "🥚",
    name: "Telur Gulung",
    description:
      "Tamagoyaki ala Jepang dengan isian keju dan sayuran, manis gurih, lembut di dalam.",
    price: "Rp 13.000",
  },
  {
    emoji: "🍢",
    name: "Sate Usus",
    description:
      "Usus ayam dibersihkan dan dibakar dengan kecap manis berbumbu rempah pilihan.",
    price: "Rp 10.000",
  },
  {
    emoji: "🥦",
    name: "Brokoli Crispy",
    description:
      "Brokoli segar dibalut tepung bumbu renyah dan digoreng sempurna. Sehat tapi tetap enak!",
    price: "Rp 13.000",
  },
];

type Tab = "main" | "side";

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("main");

  const products = activeTab === "main" ? MAIN_PRODUCTS : SIDE_PRODUCTS;
  const gridCols =
    activeTab === "main"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section
      id="menu"
      style={{ backgroundColor: "#FAFAF9", padding: "96px 0" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section header with mascot ── */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-14">

          {/* Mascot — itsuki.png, bebas tanpa kotak */}
          <ScrollAnimationWrapper direction="right" delay={0}>
            <div className="flex-shrink-0 flex items-center justify-center">
              <Image
                src="/itsuki.png"
                alt="Itsuki — Maskot Eatsuki"
                width={240}
                height={240}
                style={{
                  objectFit: "contain",
                  width: "clamp(160px, 22vw, 240px)",
                  height: "auto",
                  filter: "drop-shadow(0 8px 16px rgba(220,38,38,0.20))",
                }}
              />
            </div>
          </ScrollAnimationWrapper>

          {/* Text + toggle */}
          <div className="flex-1 text-center lg:text-left">
            <ScrollAnimationWrapper delay={0}>
              <span
                className="inline-block font-body font-bold text-sm uppercase tracking-widest mb-4"
                style={{ color: "#DC2626" }}
              >
                Menu Kami
              </span>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={80}>
              <h2
                className="font-heading font-extrabold leading-tight mb-6"
                style={{
                  fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                  color: "#1C1917",
                  letterSpacing: "-0.02em",
                }}
              >
                Pilihan Menu{" "}
                <span style={{ color: "#DC2626" }}>Favoritmu</span>
              </h2>
            </ScrollAnimationWrapper>

            {/* Toggle tabs — claymorphism pills */}
            <ScrollAnimationWrapper delay={160}>
              <div
                className="inline-flex rounded-2xl p-1.5"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #E7E5E4",
                  boxShadow: "0 3px 0px #D1D0CF",
                }}
              >
                <button
                  onClick={() => setActiveTab("main")}
                  className="font-body font-bold text-sm rounded-xl transition-all duration-200 inline-flex items-center gap-2"
                  style={{
                    padding: "10px 24px",
                    backgroundColor: activeTab === "main" ? "#DC2626" : "transparent",
                    color: activeTab === "main" ? "#FFFFFF" : "#78716C",
                    boxShadow: activeTab === "main" ? "0 3px 0px #B91C1C" : "none",
                    transform: activeTab === "main" ? "translateY(-1px)" : "none",
                  }}
                >
                  <TableCellsIcon style={{ width: "16px", height: "16px" }} />
                  Menu Utama
                </button>
                <button
                  onClick={() => setActiveTab("side")}
                  className="font-body font-bold text-sm rounded-xl transition-all duration-200 inline-flex items-center gap-2"
                  style={{
                    padding: "10px 24px",
                    backgroundColor: activeTab === "side" ? "#DC2626" : "transparent",
                    color: activeTab === "side" ? "#FFFFFF" : "#78716C",
                    boxShadow: activeTab === "side" ? "0 3px 0px #B91C1C" : "none",
                    transform: activeTab === "side" ? "translateY(-1px)" : "none",
                  }}
                >
                  <SparklesIcon style={{ width: "16px", height: "16px" }} />
                  Side Dish
                </button>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>

        {/* ── Subtitle per tab ── */}
        <div className="text-center mb-10">
          <p
            className="font-body text-lg leading-relaxed mx-auto"
            style={{ color: "#78716C", maxWidth: "520px" }}
          >
            {activeTab === "main"
              ? "Pilihan menu fast food premium yang siap memuaskan laparmu. Diolah segar, disajikan cepat."
              : "Nikmati aneka side dish lezat sebagai teman makan atau camilan di waktu santai. Murah, enak, bikin nagih!"}
          </p>
        </div>

        {/* ── Product grid ── */}
        <div className={`grid ${gridCols} gap-6`}>
          {products.map((product, index) => (
            <ScrollAnimationWrapper
              key={product.name}
              delay={index * 70}
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

