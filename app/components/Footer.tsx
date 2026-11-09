/**
 * Footer — Server Component
 *
 * Bottom section of the Eatsuki landing page.
 * Content:
 *   - Brand logo + tagline
 *   - Quick navigation links (anchor-based)
 *   - Copyright notice
 *   - Decorative top gradient border
 */

const FOOTER_LINKS = [
  { label: "Tentang", href: "#tentang" },
  { label: "Menu", href: "#menu" },
  { label: "Komentar", href: "#komentar" },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1C1917",
        color: "#E7E5E4",
      }}
    >
      {/* ── Solid top accent bar — no gradient ── */}
      <div
        aria-hidden
        style={{
          height: "5px",
          backgroundColor: "#DC2626",
        }}
      />

      {/* ── Main footer content ── */}
      <div
        className="max-w-6xl mx-auto px-6"
        style={{ padding: "64px 24px 40px" }}
      >
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-16">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-4" style={{ maxWidth: "340px" }}>
            {/* Logo */}
            <a
              href="#"
              className="font-heading font-extrabold text-3xl tracking-tight"
              aria-label="Eatsuki — Beranda"
            >
              <span style={{ color: "#DC2626" }}>Eat</span>
              <span style={{ color: "#FFFFFF" }}>suki</span>
            </a>

            {/* Tagline */}
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "#A8A29E" }}
            >
              Solusi cepat dan tepat di waktu lapar. Makan enak nggak perlu
              tunggu nanti — temukan menu favoritmu bersama Eatsuki!
            </p>

            {/* Mascot quote */}
            <div
              className="flex items-center gap-3 rounded-xl"
              style={{
                backgroundColor: "#292524",
                padding: "12px 16px",
                border: "1px solid #44403C",
              }}
            >
              <span style={{ fontSize: "24px" }}>🍔</span>
              <p
                className="font-body text-xs italic"
                style={{ color: "#D6D3D1" }}
              >
                &ldquo;Memakai otakku membuatku lapar!&rdquo; — Itsuki
              </p>
            </div>
          </div>

          {/* ── Navigation column ── */}
          <div>
            <h4
              className="font-heading font-bold text-sm uppercase tracking-widest mb-5"
              style={{ color: "#DC2626" }}
            >
              Navigasi
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm transition-colors duration-200 hover:text-primary"
                    style={{ color: "#A8A29E" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact / info column ── */}
          <div>
            <h4
              className="font-heading font-bold text-sm uppercase tracking-widest mb-5"
              style={{ color: "#DC2626" }}
            >
              Info
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { icon: "📍", text: "Banjarmasin, Indonesia" },
                { icon: "🕐", text: "Buka: 09.00 – 22.00 WIB" },
                { icon: "📱", text: "0812-3456-7890" },
                { icon: "✉️", text: "halo@eatsuki.id" },
              ].map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-2 font-body text-sm"
                  style={{ color: "#A8A29E" }}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar: copyright ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-12 pt-6"
          style={{ borderTop: "1px solid #292524" }}
        >
          <p
            className="font-body text-xs"
            style={{ color: "#78716C" }}
          >
            © {CURRENT_YEAR} Eatsuki. All rights reserved.
          </p>
          <p
            className="font-body text-xs"
            style={{ color: "#57534E" }}
          >
            Made by Abdi Prayuda (AbdiCytus)
          </p>
        </div>
      </div>
    </footer>
  );
}
