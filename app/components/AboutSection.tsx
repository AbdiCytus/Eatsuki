/**
 * AboutSection — Server Component
 *
 * Presents the Eatsuki brand story and three key selling points.
 * Layout: heading + description on the left, feature cards on the right.
 * AOS: each element fades in with a staggered delay.
 */

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
      {/* Subtle decorative accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #F97316, #DC2626)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* ── Left: Brand story ── */}
          <div className="flex-1">
            <ScrollAnimationWrapper delay={0}>
              <span
                className="inline-block font-body font-semibold text-sm uppercase tracking-widest mb-4"
                style={{ color: "#F97316" }}
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
                <span style={{ color: "#F97316" }}>Eatsuki?</span>
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
                className="font-body text-lg leading-relaxed"
                style={{ color: "#78716C", maxWidth: "480px" }}
              >
                Dari burger juicy, kebab gurih, hingga side dish yang
                ngangenin — semua ada di Eatsuki. Karena kami percaya,{" "}
                <strong style={{ color: "#1C1917" }}>
                  makan enak adalah hak semua orang.
                </strong>
              </p>
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
                  className="flex items-start gap-5 rounded-2xl transition-shadow duration-200"
                  style={{
                    backgroundColor: "#FAFAF9",
                    border: "1px solid #E7E5E4",
                    padding: "24px",
                  }}
                >
                  {/* Icon badge */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-xl text-2xl"
                    style={{
                      width: "52px",
                      height: "52px",
                      backgroundColor: "#FFF7ED",
                      border: "1px solid #FED7AA",
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

