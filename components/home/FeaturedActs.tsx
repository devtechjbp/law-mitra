"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, FileText } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

export default function FeaturedActs() {
  const { language } = useLanguageStore();
  const t = translations[language].home.featuredActs;
  const th = translations[language].header;

  const acts = [
    {
      title: th.sublinks.constitution,
      year: "1950",
      sections: language === 'hi' ? "448 अनुच्छेद" : "448 Articles",
      description: language === 'hi' 
        ? "भारत का सर्वोच्च कानून। मौलिक अधिकार, डीपीएसपी और सरकार की संरचना।"
        : "The supreme law of India. Fundamental Rights, DPSP, and the structure of government.",
      href: "/library/constitution",
      badge: language === 'hi' ? "सर्वोच्च कानून" : "Supreme Law",
      color: "#00d4ff",
    },
    {
      title: th.sublinks.bns,
      year: "2023",
      sections: language === 'hi' ? "358 धाराएं" : "358 Sections",
      description: language === 'hi' 
        ? "आईपीसी 1860 का स्थान लेता है। नए अपराधों और सजा के रूप में सामुदायिक सेवा के साथ आधुनिक आपराधिक कानून।"
        : "Replaces IPC 1860. Modernized criminal law with new offences and community service as punishment.",
      href: "/library/bns",
      badge: language === 'hi' ? "नया आईपीसी" : "New IPC",
      color: "#ff4d6d",
    },
    {
      title: th.sublinks.bnss,
      year: "2023",
      sections: language === 'hi' ? "531 धाराएं" : "531 Sections",
      description: language === 'hi' 
        ? "सीआरपीसी 1973 का स्थान लेता है। जीरो एफआईआर, अनुपस्थिति में ट्रायल और पीड़ित के अधिकारों में वृद्धि।"
        : "Replaces CrPC 1973. Zero FIR, trial in absentia, and enhanced victim rights.",
      href: "/library/bnss",
      badge: language === 'hi' ? "नया सीआरपीसी" : "New CrPC",
      color: "#0066ff",
    },
    {
      title: th.sublinks.bsa,
      year: "2023",
      sections: language === 'hi' ? "170 धाराएं" : "170 Sections",
      description: language === 'hi' 
        ? "भारतीय साक्ष्य अधिनियम 1872 का स्थान लेता है। इलेक्ट्रॉनिक साक्ष्य और डिजिटल रिकॉर्ड को मान्यता दी गई।"
        : "Replaces Indian Evidence Act 1872. Electronic evidence and digital records recognized.",
      href: "/library/bsa",
      badge: language === 'hi' ? "नया आईईए" : "New IEA",
      color: "#00b4d8",
    },
    {
      title: th.sublinks.corporate,
      year: "2013",
      sections: language === 'hi' ? "470 धाराएं" : "470 Sections",
      description: language === 'hi' 
        ? "कंपनियों के निगमन, प्रबंधन और समापन को नियंत्रित करता है। इसमें CSR, NCLT शामिल हैं।"
        : "Governs incorporation, management, and winding up of companies. Includes CSR, NCLT.",
      href: "/library/corporate",
      badge: language === 'hi' ? "कॉर्पोरेट" : "Corporate",
      color: "#7c3aed",
    },
    {
      title: th.sublinks.civil,
      year: "1908",
      sections: language === 'hi' ? "158 धाराएं" : "158 Sections",
      description: language === 'hi' 
        ? "दीवानी अदालतों के लिए प्रक्रियात्मक कानून। नियंत्रित करता है कि दीवानी मुकदमे कैसे दायर, विचार और तय किए जाते हैं।"
        : "Procedural law for civil courts. Governs how civil suits are filed, tried, and decided.",
      href: "/library/civil",
      badge: language === 'hi' ? "दीवानी कानून" : "Civil Law",
      color: "#f59e0b",
    },
  ];

  return (
    <section style={{ padding: "80px 16px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="badge-cyan" style={{ marginBottom: "16px" }}>
            <BookOpen size={13} />
            {t.badge}
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "16px" }}>
            <span style={{ color: "var(--text-primary)" }}>{t.title1}</span>
            <span className="text-cyan-gradient">{t.title2}</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            {t.description}
          </p>
        </div>

        <div className="cyan-divider" />

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {acts.map(({ title, year, sections, description, href, badge, color }) => (
            <Link
              key={title}
              href={href}
              className="glass-card law-card"
              style={{ padding: "24px", display: "block", textDecoration: "none" }}
            >
              {/* Top */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: `${color}18`,
                    border: `1px solid ${color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FileText size={18} style={{ color }} />
                </div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "50px",
                    background: `${color}18`,
                    color,
                    border: `1px solid ${color}35`,
                    letterSpacing: "0.05em",
                  }}
                >
                  {badge}
                </span>
              </div>

              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px", lineHeight: 1.3 }}>
                {title}
              </h3>
              <p style={{ fontSize: "0.75rem", color, marginBottom: "10px", fontWeight: 600 }}>
                {year} · {sections}
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px" }}>
                {description}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, color }}>
                {t.readFull} <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link href="/library" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            {t.viewAll} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
