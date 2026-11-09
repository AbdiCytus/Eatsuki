/**
 * HeroSection — Server Component
 *
 * The main landing hero for Eatsuki.
 * Background: itsuki_banner.webp image (via next/image fill + absolute position).
 * Semi-transparent overlay ensures all existing text remains readable.
 * No decorative blobs, no gradients — claymorphism badge & stat chips.
 *
 * Layout (desktop): two-column — text on the left.
 * Layout (mobile): stacked, full banner background.
 *
 * Content (preserved exactly):
 *   - Badge label
 *   - Headline
 *   - Tagline / subheadline
 *   - Two CTA buttons
 *   - Stats row
 */

import Image from "next/image";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(540px, 80vh, 760px)" }}
    >
      {/* ── Background banner image ── */}
      <Image
        src="/itsuki_banner.webp"
        alt="Eatsuki banner"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
      />

      {/* ── Dark overlay for text readability (no gradient — solid) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(28, 25, 23, 0.58)",
          zIndex: 1,
        }}
      />

      {/* ── Main content ── */}
      <div
        className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 lg:py-32 flex flex-col justify-center"
        style={{ zIndex: 2, minHeight: "inherit" }}
      >
        <div className="max-w-2xl">

          {/* Badge */}
          <ScrollAnimationWrapper delay={0}>
            <span
              className="inline-flex items-center gap-2 font-body font-bold text-sm rounded-full mb-6"
              style={{
                backgroundColor: "#DC2626",
                color: "#FFFFFF",
                padding: "7px 18px",
                boxShadow: "0 3px 0px #B91C1C",
              }}
            >
              🍔 Makanan Favoritmu Ada di Sini
            </span>
          </ScrollAnimationWrapper>

          {/* Headline */}
          <ScrollAnimationWrapper delay={80}>
            <h1
              className="font-heading font-extrabold leading-tight mb-4"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                textShadow: "0 2px 8px rgba(0,0,0,0.40)",
              }}
            >
              Eatsuki —{" "}
              <span style={{ color: "#FCA5A5" }}>Solusi Cepat</span>
              <br />
              dan Tepat di Waktu Lapar.
            </h1>
          </ScrollAnimationWrapper>

          {/* Tagline */}
          <ScrollAnimationWrapper delay={160}>
            <p
              className="font-body text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: "#E7E5E4" }}
            >
              Makan Enak Nggak Perlu Tunggu Nanti. Temukan Menu Favoritmu
              dan Nikmati Tiap Gigitannya Bersama Eatsuki!
            </p>
          </ScrollAnimationWrapper>

          {/* CTA Buttons */}
          <ScrollAnimationWrapper delay={240}>
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Primary CTA */}
              <a
                href="#menu"
                className="btn-cta-primary inline-flex items-center justify-center font-body font-bold text-base text-white bg-primary hover:bg-primary-dark rounded-full"
                style={{ padding: "14px 32px" }}
              >
                🍽️ Lihat Menu
              </a>

              {/* Secondary CTA — solid border, no gradient */}
              <a
                href="#bundle"
                className="inline-flex items-center justify-center font-body font-semibold text-base rounded-full transition-colors duration-200"
                style={{
                  padding: "14px 32px",
                  border: "2px solid rgba(255,255,255,0.60)",
                  color: "#FFFFFF",
                  backgroundColor: "rgba(255,255,255,0.10)",
                }}
              >
                🎁 Paket Hemat
              </a>
            </div>
          </ScrollAnimationWrapper>

          {/* Stats row */}
          <ScrollAnimationWrapper delay={320}>
            <div className="flex items-center gap-4 mt-10 flex-wrap">
              {[
                { value: "50+", label: "Menu Pilihan" },
                { value: "1000+", label: "Pelanggan Puas" },
                { value: "⭐ 4.9", label: "Rating" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center rounded-2xl"
                  style={{
                    minWidth: "86px",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    border: "1.5px solid rgba(255,255,255,0.30)",
                    padding: "10px 16px",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                  }}
                >
                  <p className="font-heading font-bold text-xl" style={{ color: "#FFFFFF" }}>
                    {stat.value}
                  </p>
                  <p className="font-body text-xs" style={{ color: "#E7E5E4" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollAnimationWrapper>

        </div>
      </div>
    </section>
  );
}
