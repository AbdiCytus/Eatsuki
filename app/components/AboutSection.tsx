/**
 * AboutSection — Server Component
 *
 * Brand story + three selling points.
 * Desktop: itsuki_1.jpg as section background image (left side) with a white shadow layer on the left.
 * Mobile: itsuki_1.jpg as an inline rounded hero card, preventing background overlap with text.
 * Responsive padding & cards for mobile-friendly experience.
 */

import Image from "next/image";
import {
  BoltIcon,
  FaceSmileIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const FEATURES = [
  {
    icon: <BoltIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Cepat & Praktis",
    description:
      "Nggak perlu nunggu lama. Menu kami disiapkan dengan cepat tanpa mengorbankan cita rasa.",
  },
  {
    icon: <FaceSmileIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Rasa yang Autentik",
    description:
      "Dibuat dari bahan pilihan berkualitas tinggi, setiap gigitan menghadirkan kelezatan yang nyata.",
  },
  {
    icon: <BanknotesIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Harga Bersahabat",
    description:
      "Makan enak nggak harus mahal. Nikmati menu favorit dengan harga yang tetap di kantong.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="relative overflow-hidden bg-white py-14 lg:py-24"
    >
      {/* ── Solid accent bar ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          backgroundColor: "#DC2626",
        }}
      />

      {/* ── itsuki_1.jpg as background — desktop only (left side) ── */}
      <div
        aria-hidden
        className="hidden lg:block absolute top-0 left-0 w-[45%] bottom-0 z-0"
      >
        <Image
          src="/itsuki_1.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* White shadow layer on the LEFT side of the image */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "60%",
            background: "linear-gradient(to right, #FFFFFF, transparent)",
            zIndex: 1,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative" style={{ zIndex: 2 }}>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

          {/* ── Left spacer for desktop: lets background show through ── */}
          <div className="hidden lg:block flex-1" />

          {/* ── Right: Brand story + feature cards ── */}
          <div className="flex-1 w-full">
            <ScrollAnimationWrapper delay={0}>
              <span
                className="inline-block font-body font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4"
                style={{ color: "#DC2626" }}
              >
                Tentang Kami
              </span>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={80}>
              <h2
                className="font-heading font-extrabold leading-tight mb-4 sm:mb-6"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  color: "#1C1917",
                  letterSpacing: "-0.02em",
                }}
              >
                Kenapa Harus{" "}
                <span style={{ color: "#DC2626" }}>Eatsuki?</span>
              </h2>
            </ScrollAnimationWrapper>

            {/* ── Mobile-only visual: clean image card without text collision ── */}
            <ScrollAnimationWrapper delay={100}>
              <div
                className="block lg:hidden my-5 rounded-2xl overflow-hidden"
                style={{
                  border: "2px solid #E7E5E4",
                  boxShadow: "0 4px 0px #D1D0CF, 0 8px 20px rgba(28,25,23,0.08)",
                }}
              >
                <Image
                  src="/itsuki_1.jpg"
                  alt="Itsuki Eatsuki"
                  width={600}
                  height={320}
                  className="w-full h-48 sm:h-64 object-cover"
                />
              </div>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={160}>
              <p
                className="font-body text-base sm:text-lg leading-relaxed mb-4 sm:mb-6"
                style={{ color: "#78716C", maxWidth: "480px" }}
              >
                Eatsuki hadir untuk kamu yang nggak mau buang waktu tapi tetap
                pengen makan enak. Kami menyajikan makanan cepat saji dan
                aneka side dish pilihan yang diracik dengan penuh semangat
                oleh tim kami.
              </p>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={240}>
              <p
                className="font-body text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
                style={{ color: "#78716C", maxWidth: "480px" }}
              >
                Dari burger juicy, kebab gurih, hingga side dish yang
                ngangenin semua ada di Eatsuki. Karena kami percaya,{" "}
                <strong style={{ color: "#1C1917" }}>
                  makan enak adalah hak semua orang.
                </strong>
              </p>
            </ScrollAnimationWrapper>

            {/* Feature cards */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {FEATURES.map((feature, index) => (
                <ScrollAnimationWrapper
                  key={feature.title}
                  direction="right"
                  delay={index * 120}
                >
                  <div
                    className="flex items-start gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl p-4 sm:p-6"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "2px solid #E7E5E4",
                      boxShadow: "0 4px 0px #D1D0CF, 0 6px 16px rgba(28,25,23,0.07)",
                    }}
                  >
                    {/* Icon badge */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-xl sm:rounded-2xl"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "#FFF1F2",
                        border: "2px solid #FECACA",
                        boxShadow: "0 3px 0px #FECACA",
                        color: "#DC2626",
                      }}
                    >
                      {feature.icon}
                    </div>

                    {/* Text */}
                    <div>
                      <h3
                        className="font-heading font-bold text-base sm:text-lg mb-1"
                        style={{ color: "#1C1917" }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="font-body text-xs sm:text-sm leading-relaxed"
                        style={{ color: "#78716C" }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
