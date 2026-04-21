"use client";

import Link from "next/link";
import { Shield, Home, Briefcase, Heart, GraduationCap, Users, Car, ShoppingCart, ArrowRight } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

export default function KnowYourRights() {
  const { language } = useLanguageStore();
  const t = translations[language].home.rights;

  const rights = [
    {
      icon: Shield,
      title: language === 'hi' ? "मौलिक अधिकार" : "Fundamental Rights",
      description: language === 'hi' 
        ? "अनुच्छेद 12-35: समानता, स्वतंत्रता, शोषण के विरुद्ध, धर्म, संस्कृति और शिक्षा, और संवैधानिक उपचार का अधिकार।"
        : "Articles 12–35: Right to Equality, Freedom, Against Exploitation, Religion, Culture & Education, and Constitutional Remedies.",
      href: "/library/constitution",
      color: "#00d4ff",
    },
    {
      icon: Home,
      title: language === 'hi' ? "संपत्ति के अधिकार" : "Property Rights",
      description: language === 'hi'
        ? "संपत्ति का अधिकार, किरायेदार के अधिकार, रेरा (RERA) संरक्षण और भूमि अधिग्रहण कानूनों को सरल भाषा में समझाया गया है।"
        : "Right to property, tenant rights, RERA protections, and land acquisition laws explained simply.",
      href: "/rights",
      color: "#0066ff",
    },
    {
      icon: Briefcase,
      title: language === 'hi' ? "श्रम अधिकार" : "Labour Rights",
      description: language === 'hi'
        ? "न्यूनतम वेतन, पीएफ, ग्रेच्युटी, मातृत्व लाभ और गलत तरीके से सेवा समाप्ति के खिलाफ सुरक्षा।"
        : "Minimum wage, PF, gratuity, maternity benefits, and protection against wrongful termination.",
      href: "/rights",
      color: "#00b4d8",
    },
    {
      icon: Heart,
      title: language === 'hi' ? "महिलाओं के अधिकार" : "Women's Rights",
      description: language === 'hi'
        ? "घरेलू हिंसा अधिनियम, दहेज निषेध, पॉक्सो (POCSO), मातृत्व लाभ अधिनियम और समान वेतन के अधिकार।"
        : "Domestic Violence Act, Dowry Prohibition, POCSO, Maternity Benefit Act, and equal pay rights.",
      href: "/rights",
      color: "#f472b6",
    },
    {
      icon: GraduationCap,
      title: language === 'hi' ? "शिक्षा का अधिकार" : "Right to Education",
      description: language === 'hi'
        ? "आरटीई अधिनियम 2009: 6-14 वर्ष की आयु के बच्चों के लिए मुफ्त और अनिवार्य शिक्षा। प्रवेश के अधिकार।"
        : "RTE Act 2009: Free and compulsory education for children aged 6–14. Admission rights.",
      href: "/rights",
      color: "#7c3aed",
    },
    {
      icon: Users,
      title: language === 'hi' ? "उपभोक्ता अधिकार" : "Consumer Rights",
      description: language === 'hi'
        ? "उपभोक्ता संरक्षण अधिनियम 2019: सुरक्षा, सूचना, चयन, निवारण और उपभोक्ता अदालतों का अधिकार।"
        : "Consumer Protection Act 2019: Right to safety, information, choice, redressal, and consumer courts.",
      href: "/rights",
      color: "#f59e0b",
    },
    {
      icon: Car,
      title: language === 'hi' ? "गिरफ्तारी के दौरान अधिकार" : "Rights During Arrest",
      description: language === 'hi'
        ? "बीएनएसएस की धारा 50: आधार जानने का अधिकार, जमानत का अधिकार, वकील का अधिकार और चिकित्सा परीक्षण।"
        : "Section 50 BNSS: Right to know grounds, right to bail, right to lawyer, and medical examination.",
      href: "/rights",
      color: "#ff4d6d",
    },
    {
      icon: ShoppingCart,
      title: language === 'hi' ? "डिजिटल अधिकार" : "Digital Rights",
      description: language === 'hi'
        ? "आईटी अधिनियम 2000, डेटा संरक्षण विधेयक, ऑनलाइन गोपनीयता का अधिकार और साइबर अपराध सुरक्षा।"
        : "IT Act 2000, Data Protection Bill, right to privacy online, and cyber crime protections.",
      href: "/rights",
      color: "#4f46e5",
    },
  ];

  return (
    <section style={{ padding: "80px 16px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="badge-cyan" style={{ marginBottom: "16px" }}>
            <Shield size={13} />
            {language === 'hi' ? "नागरिक सशक्तिकरण" : "Citizen Empowerment"}
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
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "18px",
            marginTop: "40px",
          }}
        >
          {rights.map(({ icon: Icon, title, description, href, color }) => (
            <Link
              key={title}
              href={href}
              className="glass-card law-card"
              style={{ padding: "24px", display: "block", textDecoration: "none" }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "12px",
                  background: `${color}15`,
                  border: `1px solid ${color}35`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  transition: "all 0.3s ease",
                }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                {title}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
                {description}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 600, color }}>
                {language === 'hi' ? "अधिक जानें" : "Learn More"} <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link href="/rights" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            {language === 'hi' ? "सभी अधिकार देखें" : "View All Rights"} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
