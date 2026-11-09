/**
 * HeroSection — Server Component
 *
 * Background: itsuki_banner.webp with solid dark overlay.
 * Uses Heroicons for action/badge icons. No gradients.
 * All original text content preserved exactly.
 */

import Image from "next/image";
import {
  FireIcon,
  GiftIcon,
  StarIcon,
  UserGroupIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
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
              <FireIcon style={{ width: "16px", height: "16px" }} />
              Makanan Favoritmu Ada di Sini
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
                className="btn-cta-primary inline-flex items-center justify-center gap-2 font-body font-bold text-base text-white bg-primary hover:bg-primary-dark rounded-full"
                style={{ padding: "14px 32px" }}
              >
                <Squares2X2Icon style={{ width: "20px", height: "20px" }} />
                Lihat Menu
              </a>

              {/* Secondary CTA */}
              <a
                href="#bundle"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-base rounded-full transition-colors duration-200"
                style={{
                  padding: "14px 32px",
                  border: "2px solid rgba(255,255,255,0.60)",
                  color: "#FFFFFF",
                  backgroundColor: "rgba(255,255,255,0.10)",
                }}
              >
                <GiftIcon style={{ width: "20px", height: "20px" }} />
                Paket Hemat
              </a>
            </div>
          </ScrollAnimationWrapper>

          {/* Stats row */}
          <ScrollAnimationWrapper delay={320}>
            <div className="flex items-center gap-4 mt-10 flex-wrap">
              {[
                { icon: <Squares2X2Icon style={{ width: "16px", height: "16px" }} />, value: "50+", label: "Menu Pilihan" },
                { icon: <UserGroupIcon style={{ width: "16px", height: "16px" }} />, value: "1000+", label: "Pelanggan Puas" },
                { icon: <StarIcon style={{ width: "16px", height: "16px" }} />, value: "4.9", label: "Rating" },
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
                  <div className="flex items-center justify-center gap-1 mb-1" style={{ color: "#FCA5A5" }}>
                    {stat.icon}
                    <p className="font-heading font-bold text-lg" style={{ color: "#FFFFFF" }}>
                      {stat.value}
                    </p>
                  </div>
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
