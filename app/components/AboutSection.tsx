/**
 * AboutSection — Server Component
 *
 * Presents the Eatsuki brand story and three key selling points.
 * Layout: heading + itsuki_1.jpg photo on the left, feature cards on the right.
 * Claymorphism cards: solid fill, puffy box-shadow, no gradient.
 */

import Image from "next/image";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const FEATURES = [
  {
    icon: "⚡",
    title: "Cepat & Praktis",
    description:
      "Nggak perlu nunggu lama. Menu kami disiapkan dengan cepat tanpa mengorbankan cita rasa.",
  },
  {
    icon: "😋",
    title: "Rasa yang Autentik",
    description:
      "Dibuat dari bahan pilihan berkualitas tinggi, setiap gigitan menghadirkan kelezatan yang nyata.",
  },
  {
    icon: "💰",
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
      {/* Solid accent bar — no gradient */}
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

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* ── Left: Brand story + photo ── */}
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
                className="font-body text-lg leading-relaxed mb-8"
                style={{ color: "#78716C", maxWidth: "480px" }}
              >
                Dari burger juicy, kebab gurih, hingga side dish yang
                ngangenin — semua ada di Eatsuki. Karena kami percaya,{" "}
                <strong style={{ color: "#1C1917" }}>
                  makan enak adalah hak semua orang.
                </strong>
              </p>
            </ScrollAnimationWrapper>

            {/* itsuki_1.jpg — decorative photo */}
            <ScrollAnimationWrapper delay={300}>
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  maxWidth: "420px",
                  border: "3px solid #E7E5E4",
                  boxShadow: "0 6px 0px #D1D0CF, 0 10px 24px rgba(28,25,23,0.10)",
                }}
              >
                <Image
                  src="/itsuki_1.jpg"
                  alt="Suasana seru bersama Eatsuki"
                  width={420}
                  height={260}
                  style={{ objectFit: "cover", width: "100%", height: "auto" }}
                />
              </div>
            </ScrollAnimationWrapper>
          </div>

          {/* ── Right: Feature cards ── */}
          <div className="flex-1 flex flex-col gap-6">
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
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-2xl text-2xl"
                    style={{
                      width: "52px",
                      height: "52px",
                      backgroundColor: "#FFF1F2",
                      border: "2px solid #FECACA",
                      boxShadow: "0 3px 0px #FECACA",
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
    </section>
  );
}

