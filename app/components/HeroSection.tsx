/**
 * HeroSection — Server Component
 *
 * The main landing hero for Eatsuki.
 * Layout (desktop): two-column — text on the left, mascot image on the right.
 * Layout (mobile): stacked, mascot above the text.
 *
 * Content:
 *   - Badge label
 *   - Headline (from brief)
 *   - Tagline / subheadline
 *   - Two CTA buttons (hover effects via CSS — no event handlers needed)
 *   - Mascot image (Itsuki Nakano from /public)
 *   - Decorative stat badges
 */

import Image from "next/image";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-bg"
    >
      {/* ── Decorative background blobs (CSS blur, no interactivity) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          backgroundColor: "#F97316",
          opacity: 0.08,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-8%",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          backgroundColor: "#DC2626",
          opacity: 0.06,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 lg:py-28">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8 lg:gap-16">

          {/* ── Left: Text content ── */}
          <div className="flex-1 text-center md:text-left">

            {/* Badge */}
            <ScrollAnimationWrapper delay={0}>
              <span
                className="inline-flex items-center gap-2 font-body font-semibold text-sm rounded-full mb-6"
                style={{
                  backgroundColor: "#FFF7ED",
                  color: "#EA580C",
                  padding: "6px 16px",
                  border: "1px solid #FED7AA",
                }}
              >
                🍔 Makanan Favoritmu Ada di Sini
              </span>
            </ScrollAnimationWrapper>

            {/* Headline */}
            <ScrollAnimationWrapper delay={80}>
              <h1
                className="font-heading font-extrabold leading-tight mb-4 text-text"
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Eatsuki —{" "}
                <span className="text-primary">Solusi Cepat</span>
                <br />
                dan Tepat di Waktu Lapar.
              </h1>
            </ScrollAnimationWrapper>

            {/* Tagline */}
            <ScrollAnimationWrapper delay={160}>
              <p
                className="font-body text-lg leading-relaxed mb-8 max-w-lg mx-auto md:mx-0 text-text-muted"
              >
                Makan Enak Nggak Perlu Tunggu Nanti. Temukan Menu Favoritmu
                dan Nikmati Tiap Gigitannya Bersama Eatsuki!
              </p>
            </ScrollAnimationWrapper>

            {/* CTA Buttons */}
            <ScrollAnimationWrapper delay={240}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

                {/* Primary CTA — hover via CSS class .btn-cta-primary */}
                <a
                  href="#menu"
                  className="btn-cta-primary inline-flex items-center justify-center font-body font-semibold text-base text-white bg-primary hover:bg-primary-dark rounded-full"
                  style={{ padding: "14px 32px" }}
                >
                  🍽️ Lihat Menu
                </a>

                {/* Secondary CTA — hover via Tailwind classes */}
                <a
                  href="#bundle"
                  className="inline-flex items-center justify-center font-body font-semibold text-base text-text hover:text-primary rounded-full transition-colors duration-200"
                  style={{
                    padding: "14px 32px",
                    border: "2px solid #E7E5E4",
                  }}
                >
                  🎁 Paket Hemat
                </a>
              </div>
            </ScrollAnimationWrapper>

            {/* Stats row */}
            <ScrollAnimationWrapper delay={320}>
              <div className="flex items-center gap-6 mt-10 justify-center md:justify-start flex-wrap">
                {[
                  { value: "50+", label: "Menu Pilihan" },
                  { value: "1000+", label: "Pelanggan Puas" },
                  { value: "⭐ 4.9", label: "Rating" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center"
                    style={{ minWidth: "72px" }}
                  >
                    <p className="font-heading font-bold text-xl text-text">
                      {stat.value}
                    </p>
                    <p className="font-body text-xs text-text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollAnimationWrapper>
          </div>

          {/* ── Right: Mascot image ── */}
          <div className="flex-shrink-0 relative w-full md:w-auto flex justify-center">
            <ScrollAnimationWrapper direction="right" delay={100}>
              {/* Decorative circle behind mascot */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  backgroundColor: "#FFF7ED",
                  transform: "scale(0.9)",
                  zIndex: 0,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <Image
                  src="/itsuki.png"
                  alt="Itsuki — Maskot Eatsuki"
                  width={420}
                  height={420}
                  priority
                  className="drop-shadow-2xl"
                  style={{
                    objectFit: "contain",
                    width: "clamp(260px, 40vw, 420px)",
                    height: "auto",
                  }}
                />
              </div>
            </ScrollAnimationWrapper>
          </div>

        </div>
      </div>
    </section>
  );
}

