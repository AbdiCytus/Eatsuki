"use client";

/**
 * Navbar
 *
 * Sticky top navigation bar for Eatsuki landing page.
 * Features:
 *   - Brand logo with accent color
 *   - Smooth-scroll anchor links (desktop)
 *   - Hamburger menu (mobile, toggleable)
 *   - Background blur + shadow on scroll
 */

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Tentang", href: "#tentang" },
  { label: "Menu", href: "#menu" },
  { label: "Paket Hemat", href: "#bundle" },
  { label: "Komentar", href: "#komentar" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add shadow + backdrop blur when user scrolls down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on nav link click
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "rgba(250,250,249,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 12px rgba(28,25,23,0.08)" : "none",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ── Brand Logo ── */}
        <a
          href="#"
          className="font-heading font-extrabold text-2xl tracking-tight"
          style={{ color: "#F97316" }}
          aria-label="Eatsuki — Beranda"
        >
          Eat<span style={{ color: "#1C1917" }}>suki</span>
        </a>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body font-medium text-sm transition-colors duration-200"
                style={{ color: "#78716C" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#F97316")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#78716C")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ── */}
        <a
          href="#menu"
          className="hidden md:inline-flex items-center justify-center font-body font-semibold text-sm text-white rounded-full transition-colors duration-200"
          style={{
            backgroundColor: "#F97316",
            padding: "10px 24px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#EA580C")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#F97316")
          }
        >
          Lihat Menu
        </a>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 rounded-lg transition-colors duration-200"
          style={{ color: "#1C1917" }}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
        >
          {/* Three bars → animate to X when open */}
          <span
            className="block h-0.5 w-6 rounded-full transition-all duration-300"
            style={{
              backgroundColor: "#1C1917",
              transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-0.5 w-6 rounded-full transition-all duration-300"
            style={{
              backgroundColor: "#1C1917",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-0.5 w-6 rounded-full transition-all duration-300"
            style={{
              backgroundColor: "#1C1917",
              transform: menuOpen
                ? "translateY(-8px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </nav>

      {/* ── Mobile Dropdown Menu ── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "400px" : "0px",
          opacity: menuOpen ? 1 : 0,
        }}
      >
        <ul
          className="flex flex-col gap-1 px-6 pb-6"
          style={{ backgroundColor: "rgba(250,250,249,0.97)" }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="block font-body font-medium text-base py-3 border-b transition-colors duration-200"
                style={{
                  color: "#1C1917",
                  borderColor: "#E7E5E4",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a
              href="#menu"
              onClick={handleLinkClick}
              className="block text-center font-body font-semibold text-sm text-white rounded-full"
              style={{
                backgroundColor: "#F97316",
                padding: "12px 0",
              }}
            >
              Lihat Menu
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

