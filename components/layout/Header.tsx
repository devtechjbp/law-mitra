"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";
import { Scale, Menu, X, ChevronDown, Languages } from "lucide-react";

export default function Header() {
  const { language, toggleLanguage } = useLanguageStore();
  const t = translations[language].header;
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const navLinks = [
    { label: t.home, href: "/" },
    {
      label: t.library,
      href: "/library",
      children: [
        { label: t.sublinks.constitution, href: "/library/constitution" },
        { label: t.sublinks.bns, href: "/library/bns" },
        { label: t.sublinks.bnss, href: "/library/bnss" },
        { label: t.sublinks.bsa, href: "/library/bsa" },
        { label: t.sublinks.corporate, href: "/library/corporate" },
        { label: t.sublinks.civil, href: "/library/civil" },
      ],
    },
    { label: t.consultation, href: "/consultation" },
    { label: t.documents, href: "/documents" },
    { label: t.cases, href: "/cases" },
    { label: t.rights, href: "/rights" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Delayed close so mouse can travel from trigger to dropdown without it disappearing
  const openDropdown = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: "40px",
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(5, 11, 24, 0.95)" : "rgba(5, 11, 24, 0.4)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0, 212, 255, 0.1)",
        boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.5)" : "none",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px",
              background: "linear-gradient(135deg, #0066ff, #00d4ff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 15px rgba(0, 212, 255, 0.4)",
            }}>
              <Scale size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{
                fontSize: "1.2rem", fontWeight: 800,
                background: "linear-gradient(135deg, #00d4ff, #0066ff)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", lineHeight: 1.2,
              }}>
                Law Mitra
              </div>
              <div style={{ fontSize: "0.65rem", color: "rgba(0,212,255,0.6)", letterSpacing: "0.1em" }}>
                {language === 'hi' ? 'कानूनी विश्वकोश' : 'LEGAL ENCYCLOPEDIA'}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2px" }} className="hidden lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.href}
                style={{ position: "relative" }}
                onMouseEnter={() => link.children ? openDropdown(link.label) : undefined}
                onMouseLeave={() => link.children ? closeDropdown() : undefined}
              >
                <Link
                  href={link.href}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "4px",
                    padding: "8px 14px", borderRadius: "8px",
                    fontSize: "0.875rem", fontWeight: 500, textDecoration: "none",
                    transition: "all 0.2s ease",
                    color: pathname === link.href ? "#00d4ff" : "#7ea8c9",
                    background: pathname === link.href ? "rgba(0, 212, 255, 0.08)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                    (e.currentTarget as HTMLElement).style.background = "rgba(0, 212, 255, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = pathname === link.href ? "#00d4ff" : "#7ea8c9";
                    (e.currentTarget as HTMLElement).style.background = pathname === link.href ? "rgba(0, 212, 255, 0.08)" : "transparent";
                  }}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={13}
                      style={{
                        transition: "transform 0.2s ease",
                        transform: activeDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  )}
                </Link>

                {/* Dropdown — bridge gap with padding-top so mouse can travel */}
                {link.children && activeDropdown === link.label && (
                  <div
                    style={{ position: "absolute", top: "100%", left: 0, paddingTop: "8px", zIndex: 100 }}
                    onMouseEnter={cancelClose}
                    onMouseLeave={closeDropdown}
                  >
                    <div
                      style={{
                        width: "230px",
                        background: "rgba(5, 11, 24, 0.98)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(0, 212, 255, 0.25)",
                        borderRadius: "14px",
                        overflow: "hidden",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,212,255,0.05)",
                        animation: "slide-down 0.15s ease",
                      }}
                    >
                      {link.children.map((child, i) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setActiveDropdown(null)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "12px 18px",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            textDecoration: "none",
                            color: "#7ea8c9",
                            borderBottom: i < link.children!.length - 1 ? "1px solid rgba(0, 212, 255, 0.07)" : "none",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.color = "#00d4ff";
                            el.style.background = "rgba(0, 212, 255, 0.08)";
                            el.style.paddingLeft = "22px";
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.color = "#7ea8c9";
                            el.style.background = "transparent";
                            el.style.paddingLeft = "18px";
                          }}
                        >
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(0,212,255,0.4)", flexShrink: 0 }} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button 
              onClick={toggleLanguage}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 12px", borderRadius: "8px",
                fontSize: "0.85rem", fontWeight: 600,
                color: "#00d4ff", background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                cursor: "pointer", transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0, 212, 255, 0.12)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0, 212, 255, 0.05)"}
            >
              <Languages size={16} />
              {language === 'en' ? 'हिन्दी' : 'English'}
            </button>
            <Link href="/consultation" className="btn-secondary" style={{ fontSize: "0.85rem", padding: "9px 20px" }}>
              {t.freeConsult}
            </Link>
            <Link href="/library" className="btn-primary" style={{ fontSize: "0.85rem", padding: "9px 20px" }}>
              {t.exploreLaws}
            </Link>
          </div>

          {/* Mobile Toggle & Lang Toggle */}
          <div className="lg:hidden" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
             <button 
              onClick={toggleLanguage}
              style={{
                padding: "8px", borderRadius: "8px",
                background: "rgba(0, 212, 255, 0.08)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                color: "#00d4ff", cursor: "pointer",
              }}
              aria-label="Toggle language"
            >
              <Languages size={20} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                padding: "8px", borderRadius: "8px",
                background: "rgba(0, 212, 255, 0.08)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                color: "#00d4ff", cursor: "pointer",
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: "rgba(5, 11, 24, 0.99)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0, 212, 255, 0.15)",
          padding: "16px 24px 24px",
          animation: "slide-down 0.3s ease",
          maxHeight: "80vh",
          overflowY: "auto",
        }}>
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block", padding: "12px 8px",
                  fontSize: "0.95rem", fontWeight: 500, textDecoration: "none",
                  color: pathname === link.href ? "#00d4ff" : "#7ea8c9",
                  borderBottom: "1px solid rgba(0, 212, 255, 0.06)",
                }}
              >
                {link.label}
              </Link>
              {link.children && (
                <div style={{ paddingLeft: "16px", paddingBottom: "4px" }}>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block", padding: "9px 8px",
                        fontSize: "0.85rem", textDecoration: "none",
                        color: "#4a6a8a",
                        borderBottom: "1px solid rgba(0, 212, 255, 0.04)",
                      }}
                    >
                      → {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
            <Link href="/consultation" className="btn-secondary" onClick={() => setMobileOpen(false)} style={{ textAlign: "center" }}>
              {t.freeConsult}
            </Link>
            <Link href="/library" className="btn-primary" onClick={() => setMobileOpen(false)} style={{ textAlign: "center" }}>
              {t.exploreLaws}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
