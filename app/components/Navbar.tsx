"use client";

/**
 * Navbar
 *
 * Sticky top navigation bar for Eatsuki landing page.
 * Layout: [Brand | NavLinks] ............ [CTA Button] [Hamburger]
 * Nav links sit immediately to the right of the brand name (left-aligned).
 */

import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Tentang", href: "#tentang" },
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

        {/* ── Left side: Brand + Nav Links ── */}
        <div className="flex items-center gap-8">
          {/* Brand Logo */}
          <a
            href="#"
            className="font-heading font-extrabold text-2xl tracking-tight flex-shrink-0"
            style={{ color: "#DC2626" }}
            aria-label="Eatsuki — Beranda"
          >
            Eat<span style={{ color: "#1C1917" }}>suki</span>
          </a>

          {/* Desktop Nav Links — right next to brand */}
          <ul className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-body font-medium text-sm transition-colors duration-200"
                  style={{ color: "#78716C" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#DC2626")
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
        </div>

        {/* ── Right side: CTA + Hamburger ── */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <a
            href="#bundle"
            className="hidden md:inline-flex items-center justify-center font-body font-semibold text-sm text-white rounded-full transition-colors duration-200"
            style={{
              backgroundColor: "#DC2626",
              padding: "10px 24px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#B91C1C")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#DC2626")
            }
          >
            Paket Hemat
          </a>

          {/* Mobile Hamburger — Heroicon */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-xl transition-colors duration-200"
            style={{
              color: "#1C1917",
              backgroundColor: menuOpen ? "#F5F5F4" : "transparent",
            }}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <XMarkIcon style={{ width: "24px", height: "24px" }} />
            ) : (
              <Bars3Icon style={{ width: "24px", height: "24px" }} />
            )}
          </button>
        </div>
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
                backgroundColor: "#DC2626",
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
