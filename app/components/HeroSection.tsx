/**
 * HeroSection — Server Component
 *
 * Background: itsuki_banner.webp with solid dark overlay.
 * Uses Heroicons for action/badge icons. No gradients.
 * All original text content preserved exactly.
 */

import Image from "next/image";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
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

      {/* ── Dark overlay — solid, no gradient ── */}
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
              Solusi <span style={{ color: "#FCA5A5" }}>Cepat</span>
              <br />
              dan <span style={{ color: "#FCA5A5" }}>Tepat</span> di Waktu
              Lapar.
            </h1>
          </ScrollAnimationWrapper>

          {/* Tagline */}
          <ScrollAnimationWrapper delay={160}>
            <p
              className="font-body text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: "#E7E5E4" }}
            >
              Makan Enak Nggak Perlu Tunggu Nanti. Temukan Menu Favoritmu dan
              Nikmati Tiap Gigitannya Bersama Eatsuki!
            </p>
          </ScrollAnimationWrapper>

          {/* CTA Buttons */}
          <ScrollAnimationWrapper delay={240}>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary CTA */}
              <a
                href="#menu"
                className="btn-cta-primary inline-flex items-center justify-center gap-2 font-body font-bold text-base text-white bg-primary hover:bg-primary-dark rounded-full"
                style={{ padding: "14px 32px" }}
              >
                <Squares2X2Icon style={{ width: "20px", height: "20px" }} />
                Lihat Menu
              </a>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
