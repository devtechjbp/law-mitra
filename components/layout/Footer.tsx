"use client";

import Link from "next/link";
import { Scale } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

export default function Footer() {
  const { language } = useLanguageStore();
  const t = translations[language].footer;
  const th = translations[language].header;

  const footerLinks: Record<string, { label: string; href: string }[]> = {
    [t.library]: [
      { label: th.sublinks.constitution, href: "/library/constitution" },
      { label: th.sublinks.bns, href: "/library/bns" },
      { label: th.sublinks.bnss, href: "/library/bnss" },
      { label: th.sublinks.bsa, href: "/library/bsa" },
      { label: th.sublinks.corporate, href: "/library/corporate" },
    ],
    [t.services]: [
      { label: th.consultation, href: "/consultation" },
      { label: th.documents, href: "/documents" },
      { label: th.cases, href: "/cases" },
      { label: th.rights, href: "/rights" },
      { label: language === 'hi' ? "कानूनी एआई बॉट" : "Legal AI Bot", href: "/#bot" },
    ],
  };

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        marginTop: "80px",
        background: "rgba(3, 7, 18, 0.98)",
        borderTop: "1px solid rgba(0, 212, 255, 0.12)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", marginBottom: "16px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #0066ff, #00d4ff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Scale size={20} color="#ffffff" />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #00d4ff, #0066ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Law Mitra
                </div>
                <div style={{ fontSize: "0.6rem", color: "rgba(0,212,255,0.5)", letterSpacing: "0.1em" }}>
                  {language === 'hi' ? 'कानूनी विश्वकोश' : 'LEGAL ENCYCLOPEDIA'}
                </div>
              </div>
            </Link>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "260px" }}>
              {t.description}
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#00d4ff",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "16px",
                }}
              >
                {title}
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                        (e.currentTarget as HTMLElement).style.paddingLeft = "4px";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                        (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="cyan-divider" />

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", paddingTop: "8px" }}>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            {t.copyright}
          </p>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            {t.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
