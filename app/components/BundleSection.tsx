/**
 * BundleSection — Server Component
 *
 * Showcases Eatsuki's one special bundle deal with premium visual treatment.
 * Features:
 *   - "Paket Hemat" badge + "HEMAT X%" label
 *   - Original price (strikethrough) vs discounted price
 *   - Bundle item list with emoji
 *   - Mascot image (itsuki_chibi.png) as companion visual
 *   - Decorative gradient background to make the section pop
 */

import Image from "next/image";
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
      style={{ padding: "96px 0" }}
    >
      {/* ── Warm gradient background ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #FFF7ED 0%, #FAFAF9 50%, #FEF2F2 100%)",
          zIndex: 0,
        }}
      />

      {/* ── Decorative top border ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #DC2626, #F97316)",
          zIndex: 1,
        }}
      />

      <div
        className="max-w-6xl mx-auto px-6 relative"
        style={{ zIndex: 2 }}
      >
        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <ScrollAnimationWrapper delay={0}>
            <span
              className="inline-block font-body font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ color: "#DC2626" }}
            >
              Penawaran Spesial
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
              Paket Bundle{" "}
              <span style={{ color: "#DC2626" }}>Hemat</span> Spesial
            </h2>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper delay={160}>
            <p
              className="font-body text-lg leading-relaxed mt-4 mx-auto"
              style={{ color: "#78716C", maxWidth: "500px" }}
            >
              Dapatkan lebih banyak dengan harga yang lebih hemat.
              Paket komplit untuk kamu dan keluarga!
            </p>
          </ScrollAnimationWrapper>
        </div>

        {/* ── Bundle card ── */}
        <div className="flex justify-center">
          <ScrollAnimationWrapper delay={200}>
            <div
              className="relative flex flex-col lg:flex-row items-center gap-10 rounded-3xl overflow-hidden w-full"
              style={{
                maxWidth: "900px",
                backgroundColor: "#FFFFFF",
                border: "2px solid #FED7AA",
                boxShadow:
                  "0 20px 60px rgba(249,115,22,0.12), 0 4px 16px rgba(28,25,23,0.06)",
                padding: "48px",
              }}
            >
              {/* HEMAT badge — absolute top-right */}
              <div
                className="absolute top-0 right-0 font-heading font-extrabold text-white text-sm"
                style={{
                  background: "linear-gradient(135deg, #DC2626, #F97316)",
                  padding: "10px 24px",
                  borderBottomLeftRadius: "16px",
                  letterSpacing: "0.05em",
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
                    backgroundColor: "#FFF7ED",
                    border: "3px solid #FED7AA",
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
                  className="font-body font-semibold text-sm text-center"
                  style={{ color: "#F97316" }}
                >
                  ✨ Rekomendasi Itsuki!
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
                        color: "#F97316",
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
                    🛒 Pesan Sekarang
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
