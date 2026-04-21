"use client";

import Link from "next/link";
import { Gavel, ArrowRight, Calendar, User } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

export default function LandmarkCases() {
  const { language } = useLanguageStore();
  const t = translations[language].home.cases;

  const cases = [
    {
      title: "Kesavananda Bharati v. State of Kerala",
      year: "1973",
      court: language === 'hi' ? "उच्चतम न्यायालय" : "Supreme Court",
      judge: language === 'hi' ? "मुख्य न्यायाधीश एस.एम. सीकरी (13 जजों की पीठ)" : "CJ S.M. Sikri (13-Judge Bench)",
      summary: language === 'hi' 
        ? "बुनियादी संरचना सिद्धांत की स्थापना की — संसद संविधान में संशोधन करके इसकी बुनियादी संरचना को नष्ट नहीं कर सकती।"
        : "Established the Basic Structure Doctrine — Parliament cannot amend the Constitution to destroy its basic structure.",
      category: language === 'hi' ? "संवैधानिक" : "Constitutional",
      href: "/cases",
      color: "#00d4ff",
    },
    {
      title: "Maneka Gandhi v. Union of India",
      year: "1978",
      court: language === 'hi' ? "उच्चतम न्यायालय" : "Supreme Court",
      judge: language === 'hi' ? "मुख्य न्यायाधीश एम.एच. बेग" : "CJ M.H. Beg",
      summary: language === 'hi'
        ? "अनुच्छेद 21 का विस्तार किया — प्रक्रिया निष्पक्ष, न्यायपूर्ण और तर्कसंगत होनी चाहिए। अनुच्छेद 14, 19 और 21 को जोड़ा।"
        : "Expanded Article 21 — procedure must be fair, just, and reasonable. Linked Articles 14, 19, and 21.",
      category: language === 'hi' ? "मौलिक अधिकार" : "Fundamental Rights",
      href: "/cases",
      color: "#0066ff",
    },
    {
      title: "K.S. Puttaswamy v. Union of India",
      year: "2017",
      court: language === 'hi' ? "उच्चतम न्यायालय" : "Supreme Court",
      judge: language === 'hi' ? "9 जजों की पीठ" : "9-Judge Bench",
      summary: language === 'hi'
        ? "निजता के अधिकार को अनुच्छेद 21 के तहत मौलिक अधिकार घोषित किया गया। डिजिटल युग में एक ऐतिहासिक निर्णय।"
        : "Right to Privacy declared a Fundamental Right under Article 21. Landmark judgment in the digital age.",
      category: language === 'hi' ? "निजता" : "Privacy",
      href: "/cases",
      color: "#7c3aed",
    },
    {
      title: "Navtej Singh Johar v. Union of India",
      year: "2018",
      court: language === 'hi' ? "उच्चतम न्यायालय" : "Supreme Court",
      judge: language === 'hi' ? "मुख्य न्यायाधीश दीपक मिश्रा" : "CJ Dipak Misra",
      summary: language === 'hi'
        ? "वयस्कों के बीच सहमति से समलैंगिक संबंधों के लिए आईपीसी की धारा 377 को अपराध की श्रेणी से बाहर किया गया। ऐतिहासिक LGBTQ+ अधिकार निर्णय।"
        : "Section 377 IPC decriminalized for consensual same-sex relations between adults. Historic LGBTQ+ rights judgment.",
      category: language === 'hi' ? "नागरिक अधिकार" : "Civil Rights",
      href: "/cases",
      color: "#f472b6",
    },
  ];

  return (
    <section style={{ padding: "80px 16px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="badge-cyan" style={{ marginBottom: "16px" }}>
            <Gavel size={13} />
            {t.badge}
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "16px" }}>
            <span style={{ color: "var(--text-primary)" }}>{language === 'hi' ? "ऐतिहासिक " : "Landmark "}</span>
            <span className="text-cyan-gradient">{language === 'hi' ? "निर्णय" : "Judgments"}</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            {language === 'hi' 
              ? "वे मामले जिन्होंने भारतीय कानून और समाज को आकार दिया। उन उदाहरणों को समझें जो आज आपके अधिकारों को परिभाषित करते हैं।"
              : "Cases that shaped Indian law and society. Understand the precedents that define your rights today."}
          </p>
        </div>

        <div className="cyan-divider" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {cases.map(({ title, year, judge, summary, category, href, color }) => (
            <Link
              key={title}
              href={href}
              className="glass-card law-card"
              style={{ padding: "24px", display: "block", textDecoration: "none" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "50px",
                    background: `${color}15`,
                    color,
                    border: `1px solid ${color}35`,
                    letterSpacing: "0.05em",
                  }}
                >
                  {category}
                </span>
                <Gavel size={16} style={{ color, opacity: 0.5 }} />
              </div>

              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "10px", lineHeight: 1.4 }}>
                {title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
                {summary}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "16px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Calendar size={11} style={{ color }} /> {year}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <User size={11} style={{ color }} /> {judge}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 600, color }}>
                {language === 'hi' ? "निर्णय पढ़ें" : "Read Judgment"} <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link href="/cases" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            {language === 'hi' ? "सभी मामले ब्राउज़ करें" : "Browse All Cases"} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
