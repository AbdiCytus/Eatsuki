/**
 * BundleSection — Server Component
 *
 * Showcases Eatsuki's one special bundle deal.
 * Background: solid Crimson Red (#DC2626) — no gradients.
 * Claymorphism card: solid white fill, puffy multi-layer shadow.
 * Features:
 *   - "HEMAT 35%" label badge (solid)
 *   - Original price (strikethrough) vs discounted price
 *   - Bundle item list with emoji
 *   - Mascot image (itsuki_chibi.png) as companion visual
 */

import Image from "next/image";
import { TagIcon, SparklesIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const BUNDLE_ITEMS = [
  { emoji: "🍔", name: "Burger Jumbo", note: "1 pcs" },
  { emoji: "🍟", name: "Kentang Goreng", note: "Regular" },
  { emoji: "🥟", name: "Dimsum Mix", note: "3 pcs" },
  { emoji: "🧃", name: "Minuman Pilihan", note: "Es / Hangat" },
  { emoji: "🍄", name: "Jamur Krispi", note: "Bonus!" },
];

export default function BundleSection() {
  return (
    <section
      id="bundle"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#DC2626", padding: "96px 0" }}
    >
      {/* Subtle dot-pattern overlay for texture (no gradient) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="max-w-6xl mx-auto px-6 relative"
        style={{ zIndex: 1 }}
      >
        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <ScrollAnimationWrapper delay={0}>
            <span
              className="inline-flex items-center gap-2 font-body font-bold text-sm uppercase tracking-widest mb-4 rounded-full"
              style={{
                color: "#DC2626",
                backgroundColor: "#FFFFFF",
                padding: "6px 18px",
              }}
            >
              <TagIcon style={{ width: "14px", height: "14px" }} />
              Penawaran Spesial
            </span>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper delay={80}>
            <h2
              className="font-heading font-extrabold leading-tight"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              Paket Bundle{" "}
              <span style={{ color: "#FEF2F2" }}>Hemat</span> Spesial
            </h2>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper delay={160}>
            <p
              className="font-body text-lg leading-relaxed mt-4 mx-auto"
              style={{ color: "#FECACA", maxWidth: "500px" }}
            >
              Dapatkan lebih banyak dengan harga yang lebih hemat.
              Paket komplit untuk kamu dan keluarga!
            </p>
          </ScrollAnimationWrapper>
        </div>

        {/* ── Bundle card — claymorphism ── */}
        <div className="flex justify-center">
          <ScrollAnimationWrapper delay={200}>
            <div
              className="relative flex flex-col lg:flex-row items-center gap-10 rounded-3xl overflow-hidden w-full"
              style={{
                maxWidth: "900px",
                backgroundColor: "#FFFFFF",
                border: "3px solid #FECACA",
                boxShadow:
                  "0 8px 0px #B91C1C, 0 16px 48px rgba(28,25,23,0.20)",
                padding: "clamp(28px, 5vw, 48px)",
              }}
            >
              {/* HEMAT badge — solid, no gradient */}
              <div
                className="absolute top-0 right-0 font-heading font-extrabold text-white text-sm"
                style={{
                  backgroundColor: "#DC2626",
                  padding: "10px 24px",
                  borderBottomLeftRadius: "16px",
                  letterSpacing: "0.05em",
                  boxShadow: "0 3px 0px #B91C1C",
                }}
              >
                HEMAT 35%
              </div>

              {/* ── Left: Mascot ── */}
              <div className="flex-shrink-0 flex flex-col items-center gap-4">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: "200px",
                    height: "200px",
                    backgroundColor: "#FFF1F2",
                    border: "3px solid #FECACA",
                    boxShadow: "0 4px 0px #FECACA",
                  }}
                >
                  <Image
                    src="/itsuki_chibi.png"
                    alt="Itsuki merekomendasikan paket hemat"
                    width={170}
                    height={170}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p
                  className="font-body font-bold text-sm text-center inline-flex items-center gap-1"
                  style={{ color: "#DC2626" }}
                >
                  <SparklesIcon style={{ width: "14px", height: "14px" }} />
                  Rekomendasi Itsuki!
                </p>
              </div>

              {/* ── Right: Bundle details ── */}
              <div className="flex-1 w-full">
                {/* Bundle name */}
                <h3
                  className="font-heading font-extrabold mb-2"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    color: "#1C1917",
                  }}
                >
                  Paket Eatsuki Komplit 🎉
                </h3>
                <p
                  className="font-body text-sm mb-6"
                  style={{ color: "#78716C" }}
                >
                  Satu paket lengkap untuk kenyang maksimal. Cocok buat
                  makan siang atau nongkrong bareng!
                </p>

                {/* Item list */}
                <ul className="flex flex-col gap-3 mb-8">
                  {BUNDLE_ITEMS.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.emoji}</span>
                        <span
                          className="font-body font-medium text-sm"
                          style={{ color: "#1C1917" }}
                        >
                          {item.name}
                        </span>
                      </div>
                      <span
                        className="font-body text-xs rounded-full"
                        style={{
                          color:
                            item.note === "Bonus!"
                              ? "#DC2626"
                              : "#78716C",
                          backgroundColor:
                            item.note === "Bonus!"
                              ? "#FEF2F2"
                              : "#F5F5F4",
                          padding: "3px 10px",
                          fontWeight: item.note === "Bonus!" ? 700 : 400,
                        }}
                      >
                        {item.note}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#E7E5E4",
                    marginBottom: "20px",
                  }}
                />

                {/* Price + CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    {/* Original price strikethrough */}
                    <p
                      className="font-body text-sm line-through"
                      style={{ color: "#A8A29E" }}
                    >
                      Rp 95.000
                    </p>
                    {/* Discounted price */}
                    <p
                      className="font-heading font-extrabold"
                      style={{
                        fontSize: "2rem",
                        color: "#DC2626",
                        lineHeight: 1,
                      }}
                    >
                      Rp 62.000
                    </p>
                    <p
                      className="font-body text-xs mt-1"
                      style={{ color: "#78716C" }}
                    >
                      Per paket · Sudah termasuk pajak
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href="#komentar"
                    className="btn-cta-primary inline-flex items-center justify-center font-body font-bold text-base text-white bg-primary hover:bg-primary-dark rounded-full whitespace-nowrap"
                    style={{ padding: "14px 36px" }}
                  >
                    <ShoppingCartIcon style={{ width: "24px", height: "24px", marginRight: "8px" }} />
                    Pesan Sekarang
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
