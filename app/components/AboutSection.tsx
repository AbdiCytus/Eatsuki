/**
 * AboutSection — Server Component
 *
 * Brand story + three selling points.
 * Background: itsuki_1.jpg as section background image (left side),
 * with a white shadow layer on the right to blend into the content area.
 * Heroicons replace emoji in feature cards.
 * No decorative gradients — the white right-shadow is a functional overlay.
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
    icon: <BoltIcon style={{ width: "24px", height: "24px" }} />,
    title: "Cepat & Praktis",
    description:
      "Nggak perlu nunggu lama. Menu kami disiapkan dengan cepat tanpa mengorbankan cita rasa.",
  },
  {
    icon: <FaceSmileIcon style={{ width: "24px", height: "24px" }} />,
    title: "Rasa yang Autentik",
    description:
      "Dibuat dari bahan pilihan berkualitas tinggi, setiap gigitan menghadirkan kelezatan yang nyata.",
  },
  {
    icon: <BanknotesIcon style={{ width: "24px", height: "24px" }} />,
    title: "Harga Bersahabat",
    description:
      "Makan enak nggak harus mahal. Nikmati menu favorit dengan harga yang tetap di kantong.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", padding: "96px 0" }}
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

      {/* ── itsuki_1.jpg as background — left side ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "45%",
          bottom: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/itsuki_1.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* White shadow layer on the RIGHT side of the image — fades into section bg */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "60%",
            background: "linear-gradient(to right, transparent, #FFFFFF)",
            zIndex: 1,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* ── Left: spacer (image shows through) ── */}
          <div className="hidden lg:block flex-1" />

          {/* ── Right: Brand story + feature cards ── */}
          <div className="flex-1">
            <ScrollAnimationWrapper delay={0}>
              <span
                className="inline-block font-body font-semibold text-sm uppercase tracking-widest mb-4"
                style={{ color: "#DC2626" }}
              >
                Tentang Kami
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
                Kenapa Harus{" "}
                <span style={{ color: "#DC2626" }}>Eatsuki?</span>
              </h2>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={160}>
              <p
                className="font-body text-lg leading-relaxed mb-6"
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
                className="font-body text-lg leading-relaxed mb-10"
                style={{ color: "#78716C", maxWidth: "480px" }}
              >
                Dari burger juicy, kebab gurih, hingga side dish yang
                ngangenin — semua ada di Eatsuki. Karena kami percaya,{" "}
                <strong style={{ color: "#1C1917" }}>
                  makan enak adalah hak semua orang.
                </strong>
              </p>
            </ScrollAnimationWrapper>

            {/* Feature cards */}
            <div className="flex flex-col gap-5">
              {FEATURES.map((feature, index) => (
                <ScrollAnimationWrapper
                  key={feature.title}
                  direction="right"
                  delay={index * 120}
                >
                  <div
                    className="flex items-start gap-5 rounded-3xl"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "2px solid #E7E5E4",
                      padding: "24px",
                      boxShadow: "0 4px 0px #D1D0CF, 0 6px 16px rgba(28,25,23,0.07)",
                    }}
                  >
                    {/* Icon badge */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-2xl"
                      style={{
                        width: "52px",
                        height: "52px",
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
                        className="font-heading font-bold text-lg mb-1"
                        style={{ color: "#1C1917" }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="font-body text-sm leading-relaxed"
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
