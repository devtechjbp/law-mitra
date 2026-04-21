"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Scale } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

export default function CivilPage() {
  const { language } = useLanguageStore();
  const t = translations[language].library;

  const acts = useMemo(() => [
    {
      title: language === 'hi' ? "सिविल प्रक्रिया संहिता (CPC) 1908" : "Code of Civil Procedure (CPC) 1908",
      color: "#f59e0b",
      sections: language === 'hi' ? "158 धाराएं + आदेश" : "158 Sections + Orders",
      desc: language === 'hi' 
        ? "यह नियंत्रित करता है कि भारत में नागरिक मुकदमे कैसे दायर, परखे और तय किए जाते हैं। इसमें अपील, डिक्री के निष्पादन, अंतरिम आदेश और संपत्ति की जब्ती के प्रावधान शामिल हैं।"
        : "Governs how civil suits are filed, tried, and decided in India.",
      keyPoints: language === 'hi' ? ["आदेश 7 — वाद की आवश्यकताएं", "आदेश 8 — लिखित कथन", "आदेश 39 — अस्थायी निषेधाज्ञा", "धारा 9 — दीवानी न्यायालय का क्षेत्राधिकार"] : ["Order 7 — Plaint requirements", "Order 8 — Written statement", "Order 39 — Temporary injunctions", "Section 9 — Civil court jurisdiction"],
    },
    {
      title: language === 'hi' ? "भारतीय अनुबंध अधिनियम 1872" : "Indian Contract Act 1872",
      color: "#00d4ff",
      sections: language === 'hi' ? "238 धाराएं" : "238 Sections",
      desc: language === 'hi'
        ? "भारत में अनुबंधों के गठन, प्रदर्शन और उल्लंघन को नियंत्रित करता है। वैध अनुबंधों, शून्य समझौतों और उल्लंघन के उपचारों को परिभाषित करता है।"
        : "Governs formation, performance, and breach of contracts in India.",
      keyPoints: language === 'hi' ? ["प्रस्ताव + स्वीकृति + प्रतिफल = अनुबंध", "स्वतंत्र सहमति — कोई जबरदस्ती, धोखाधड़ी नहीं", "उपचार — हर्जाना, विशिष्ट प्रदर्शन"] : ["Offer + Acceptance + Consideration = Contract", "Free consent — no coercion, fraud", "Remedies — damages, specific performance"],
    },
    {
      title: language === 'hi' ? "संपत्ति हस्तांतरण अधिनियम 1882" : "Transfer of Property Act 1882",
      color: "#4ade80",
      sections: language === 'hi' ? "137 धाराएं" : "137 Sections",
      desc: language === 'hi'
        ? "भारत में अचल संपत्ति के हस्तांतरण को नियंत्रित करता है। इसमें संपत्ति की बिक्री, बंधक, पट्टा, विनिमय और उपहार शामिल हैं।"
        : "Governs transfer of immovable property in India.",
      keyPoints: language === 'hi' ? ["धारा 54 — अचल संपत्ति की बिक्री", "धारा 58 — बंधक के प्रकार", "धारा 105 — अचल संपत्ति का पट्टा", "धारा 122 — संपत्ति का उपहार"] : ["Section 54 — Sale of property", "Section 58 — Mortgage types", "Section 105 — Lease of property", "Section 122 — Gift of property"],
    },
    {
      title: language === 'hi' ? "सीमा अधिनियम (Limitation Act) 1963" : "Limitation Act 1963",
      color: "#ff4d6d",
      sections: language === 'hi' ? "32 धाराएं + अनुसूची" : "32 Sections + Schedule",
      desc: language === 'hi'
        ? "उन समय सीमाओं को निर्धारित करता है जिनके भीतर कानूनी कार्यवाही शुरू की जानी चाहिए। अवधि समाप्त होने के बाद मुकदमा करने का अधिकार समाप्त हो जाता है।"
        : "Prescribes time limits within which legal proceedings must be initiated.",
      keyPoints: language === 'hi' ? ["3 साल — अधिकांश दीवानी मुकदमे", "12 साल — अचल संपत्ति से संबंधित मुकदमे", "30 साल — सरकार द्वारा मुकदमे"] : ["3 years — most civil suits", "12 years — immovable property suits", "30 years — suits by government"],
    },
    {
      title: language === 'hi' ? "उपभोक्ता संरक्षण अधिनियम 2019" : "Consumer Protection Act 2019",
      color: "#0066ff",
      sections: language === 'hi' ? "107 धाराएं" : "107 Sections",
      desc: language === 'hi'
        ? "उपभोक्ता अधिकारों की रक्षा करता है और जिला, राज्य और राष्ट्रीय उपभोक्ता विवाद निवारण आयोगों की स्थापना करता है।"
        : "Protects consumer rights and establishes Consumer Disputes Redressal Commissions.",
      keyPoints: language === 'hi' ? ["जिला आयोग — ₹1 करोड़ तक के दावे", "राज्य आयोग — ₹1 करोड़ से ₹10 करोड़", "ई-कॉमर्स प्लेटफॉर्म उत्तरदायी"] : ["District Commission — up to ₹1 crore", "State Commission — ₹1 crore to ₹10 crore", "E-commerce platforms liable"],
    },
  ], [language]);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px 80px" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", fontSize: "0.85rem" }}>
        <Link href="/library" style={{ display: "flex", alignItems: "center", gap: "4px", color: "#7ea8c9", textDecoration: "none" }}>
          <ArrowLeft size={14} /> {t.title}
        </Link>
        <ChevronRight size={14} color="#4a6a8a" />
        <span style={{ color: "#f59e0b" }}>{language === 'hi' ? 'दीवानी कानून' : 'Civil Laws'}</span>
      </div>

      {/* Header Card */}
      <div style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "20px", padding: "28px", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Scale size={26} color="#f59e0b" />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#e8f4fd", marginBottom: "8px" }}>{language === 'hi' ? 'भारत के दीवानी कानून' : 'Civil Laws of India'}</h1>
            <p style={{ fontSize: "0.82rem", color: "#f59e0b", marginBottom: "10px", fontWeight: 600 }}>{language === 'hi' ? 'सीपीसी 1908 · अनुबंध अधिनियम 1872 · संपत्ति हस्तांतरण अधिनियम 1882' : 'CPC 1908 · Contract Act 1872 · Transfer of Property Act 1882'}</p>
            <p style={{ fontSize: "0.9rem", color: "#7ea8c9", lineHeight: 1.7 }}>
              {language === 'hi' 
                ? "दीवानी कानून निजी पक्षों के बीच विवादों को नियंत्रित करता है। इसमें अनुबंध विवाद, संपत्ति के मामले, उपभोक्ता अधिकार और नागरिक प्रक्रिया शामिल है। ये कानून गैर-आपराधिक मामलों में नागरिकों को उपलब्ध अधिकारों और उपचारों को परिभाषित करते हैं।"
                : "Civil law governs disputes between private parties such as contract disputes and property matters."}
            </p>
          </div>
        </div>
      </div>

      {/* Acts */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {acts.map(({ title, color, sections, desc, keyPoints }) => (
          <div key={title} style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(16px)", border: `1px solid ${color}25`, borderRadius: "16px", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color }}>{title}</h3>
              <span style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: "50px", background: `${color}15`, color, border: `1px solid ${color}30`, flexShrink: 0 }}>{sections}</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#7ea8c9", lineHeight: 1.7, marginBottom: "14px" }}>{desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {keyPoints.map((point) => (
                <span key={point} style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "8px", background: `${color}10`, color: "#7ea8c9", border: `1px solid ${color}20` }}>
                  ✓ {point}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
