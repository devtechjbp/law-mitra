"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, Scale, Shield, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

export default function HeroSection() {
  const { language } = useLanguageStore();
  const t = translations[language].hero;

  const suggestions = useMemo(() => language === 'hi' ? [
    "अनुच्छेद 21 — जीवन का अधिकार",
    "धारा 302 बीएनएस — हत्या",
    "बंदी प्रत्यक्षीकरण याचिका",
    "आरटीआई अधिनियम 2005",
    "पॉक्सो (POCSO) अधिनियम",
    "उपभोक्ता संरक्षण अधिनियम",
    "मोटर वाहन अधिनियम",
    "घरेलू हिंसा अधिनियम",
    "शिक्षा का अधिकार",
    "जीएसटी अधिनियम",
  ] : [
    "Article 21 — Right to Life",
    "Section 302 BNS — Murder",
    "Habeas Corpus writ",
    "RTI Act 2005",
    "POCSO Act",
    "Consumer Protection Act",
    "Motor Vehicles Act",
    "Domestic Violence Act",
    "Right to Education",
    "GST Act",
  ], [language]);

  const quickTags = useMemo(() => language === 'hi' ? [
    "संविधान", "बीएनएस 2023", "बीएनएसएस 2023", "आरटीआई अधिनियम", "पॉक्सो", "उपभोक्ता अधिकार"
  ] : [
    "Constitution", "BNS 2023", "BNSS 2023", "RTI Act", "POCSO", "Consumer Rights"
  ], [language]);

  const stats = [
    { value: "1,500+", label: t.stats.acts, icon: BookOpen, color: "#00d4ff" },
    { value: "50,000+", label: t.stats.sections, icon: Scale, color: "#0066ff" },
    { value: "10,000+", label: t.stats.cases, icon: Shield, color: "#7c3aed" },
  ];

  const [query, setQuery] = useState("");
  const [liveSuggestions, setLiveSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [pIdx, setPIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter
  useEffect(() => {
    const text = suggestions[pIdx];
    if (cIdx < text.length) {
      const timer = setTimeout(() => {
        setPlaceholder(text.slice(0, cIdx + 1));
        setCIdx((c) => c + 1);
      }, 65);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCIdx(0);
        setPIdx((i) => (i + 1) % suggestions.length);
        setPlaceholder("");
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [cIdx, pIdx, suggestions]);

  // All searchable terms — suggestions + extra keywords that map to library acts
  const allSearchTerms = useMemo(() => {
    const extra = language === 'hi' ? [
      "भारतीय न्याय संहिता", "बीएनएस", "BNS", "आईपीसी", "IPC",
      "भारतीय नागरिक सुरक्षा संहिता", "बीएनएसएस", "BNSS", "सीआरपीसी", "CrPC",
      "भारतीय साक्ष्य अधिनियम", "बीएसए", "BSA",
      "संविधान", "मौलिक अधिकार", "अनुच्छेद 21", "अनुच्छेद 14", "अनुच्छेद 19",
      "सूचना का अधिकार", "आरटीआई", "RTI",
      "पॉक्सो", "POCSO", "घरेलू हिंसा", "दहेज", "बलात्कार",
      "उपभोक्ता संरक्षण", "कंपनी अधिनियम", "जीएसटी", "आयकर",
      "जमानत", "एफआईआर", "FIR", "जीरो एफआईआर", "गिरफ्तारी",
      "हत्या", "चोरी", "धोखाधड़ी", "मानहानि", "अपहरण",
      "श्रम कानून", "न्यूनतम मजदूरी", "भविष्य निधि",
      "पर्यावरण", "वन्यजीव", "साइबर अपराध",
    ] : [
      "Bharatiya Nyaya Sanhita", "BNS", "IPC", "Indian Penal Code",
      "Bharatiya Nagarik Suraksha Sanhita", "BNSS", "CrPC", "Criminal Procedure",
      "Bharatiya Sakshya Adhiniyam", "BSA", "Evidence Act",
      "Constitution", "Fundamental Rights", "Article 21", "Article 14", "Article 19",
      "Right to Information", "RTI",
      "POCSO", "Domestic Violence", "Dowry", "Rape", "Sexual Harassment",
      "Consumer Protection", "Companies Act", "GST", "Income Tax",
      "Bail", "FIR", "Zero FIR", "Arrest", "Chargesheet",
      "Murder", "Theft", "Cheating", "Defamation", "Kidnapping",
      "Labour Law", "Minimum Wages", "Provident Fund", "Gratuity",
      "Environment", "Wildlife", "Cyber Crime", "IT Act",
      "Insolvency", "Bankruptcy", "SEBI", "FEMA", "Competition",
      "Motor Vehicles", "RERA", "Arbitration", "Contract",
      "Transfer of Property", "Limitation", "Civil Procedure",
      "Habeas Corpus", "Mandamus", "PIL", "Writ",
      "SC ST Act", "UAPA", "NDPS", "Terrorism",
    ];
    return [...suggestions, ...extra];
  }, [language, suggestions]);

  // Live search
  useEffect(() => {
    if (query.length > 1) {
      const q = query.toLowerCase();
      const filtered = allSearchTerms.filter((s) =>
        s.toLowerCase().includes(q)
      );
      // Always show dropdown — either matched suggestions or a "search all" option
      setLiveSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query, allSearchTerms]);

  const handleSearch = (q?: string) => {
    const term = q || query;
    if (term.trim()) router.push(`/library?search=${encodeURIComponent(term)}`);
  };

  return (
    <section
      className="hero-section grid-bg"
      style={{ paddingTop: "40px", paddingBottom: "80px", paddingLeft: "16px", paddingRight: "16px" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", width: "100%" }}>

        {/* Badge */}
        <div
          className="badge-cyan"
          style={{ marginBottom: "28px", animation: "fade-in 0.8s ease" }}
        >
          <Scale size={13} />
          {t.badge}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "20px",
            animation: "slide-up 0.8s ease 0.2s both",
          }}
        >
          <span style={{ color: "var(--text-primary)" }}>{t.headline.part1}</span>
          <span className="text-cyan-gradient">{t.headline.part2}</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>{t.headline.part3}</span>
          <span className="text-cyan-gradient">{t.headline.part4}</span>
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            marginBottom: "48px",
            maxWidth: "600px",
            margin: "0 auto 48px",
            lineHeight: 1.7,
            animation: "slide-up 0.8s ease 0.4s both",
          }}
        >
          {t.description}
        </p>

        {/* Search Bar */}
        <div
          style={{
            position: "relative",
            maxWidth: "700px",
            margin: "0 auto 32px",
            animation: "slide-up 0.8s ease 0.6s both",
          }}
        >
          <div
            className="search-bar"
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 8px 8px 20px" }}
          >
            <Search size={20} style={{ color: "#00d4ff", flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onFocus={() => query.length > 1 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={placeholder || t.searchPlaceholder}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "1rem",
                color: "var(--text-primary)",
              }}
              aria-label="Search laws"
            />
            <button
              onClick={() => handleSearch()}
              className="btn-primary"
              style={{ padding: "10px 24px", fontSize: "0.9rem", flexShrink: 0 }}
            >
              {t.searchButton}
            </button>
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: "8px",
                background: "rgba(5, 11, 24, 0.98)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                borderRadius: "16px",
                overflow: "hidden",
                zIndex: 20,
                animation: "slide-down 0.2s ease",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}
            >
              {liveSuggestions.length > 0 ? (
                <>
                  {liveSuggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setQuery(s); handleSearch(s); }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 20px",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(0, 212, 255, 0.07)",
                        color: "var(--text-secondary)",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(0, 212, 255, 0.06)";
                        (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      }}
                    >
                      <Search size={14} style={{ color: "#00d4ff", flexShrink: 0 }} />
                      {s}
                    </button>
                  ))}
                  <button
                    onClick={() => handleSearch()}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 20px",
                      background: "rgba(0, 212, 255, 0.04)",
                      border: "none",
                      color: "#00d4ff",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      textAlign: "left",
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0, 212, 255, 0.1)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0, 212, 255, 0.04)"; }}
                  >
                    <Search size={14} style={{ color: "#00d4ff", flexShrink: 0 }} />
                    {language === 'hi' ? `"${query}" के लिए सभी परिणाम देखें →` : `Search all results for "${query}" →`}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleSearch()}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 20px",
                    background: "transparent",
                    border: "none",
                    color: "#00d4ff",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    textAlign: "left",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0, 212, 255, 0.06)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <Search size={14} style={{ color: "#00d4ff", flexShrink: 0 }} />
                  {language === 'hi' ? `"${query}" को लॉ लाइब्रेरी में खोजें →` : `Search "${query}" in Law Library →`}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Quick Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "64px",
            animation: "slide-up 0.8s ease 0.8s both",
          }}
        >
          {quickTags.map((tag) => (
            <Link
              key={tag}
              href={`/library?search=${tag}`}
              style={{
                padding: "6px 16px",
                borderRadius: "50px",
                fontSize: "0.8rem",
                fontWeight: 500,
                textDecoration: "none",
                color: "var(--text-secondary)",
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.15)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 212, 255, 0.4)";
                (e.currentTarget as HTMLElement).style.background = "rgba(0, 212, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 212, 255, 0.15)";
                (e.currentTarget as HTMLElement).style.background = "rgba(0, 212, 255, 0.05)";
              }}
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            maxWidth: "600px",
            margin: "0 auto 48px",
            animation: "slide-up 0.8s ease 1s both",
          }}
        >
          {stats.map(({ value, label, icon: Icon, color }) => (
            <div
              key={label}
              className="glass-card"
              style={{ padding: "20px 16px", textAlign: "center" }}
            >
              <Icon size={22} style={{ color, margin: "0 auto 8px" }} />
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color, marginBottom: "4px" }}>
                {value}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.3 }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
            animation: "slide-up 0.8s ease 1.2s both",
          }}
        >
          <Link href="/library" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            {t.cta.explore} <ArrowRight size={16} />
          </Link>
          <Link href="/consultation" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            {t.cta.consult} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
