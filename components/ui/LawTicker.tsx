"use client";

import { useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";

const amendmentsEn = [
  "🔴 BNS 2023 — Bharatiya Nyaya Sanhita fully effective from July 1, 2024 (Replaces IPC 1860)",
  "⚡ BNSS 2023 — Zero FIR provision now mandatory across all states",
  "🔵 Supreme Court: Right to Privacy is a Fundamental Right under Article 21",
  "📋 BSA 2023 — Electronic evidence admissible without physical certification",
  "🏠 RERA Amendment — Builder penalty doubled, homebuyers rights strengthened",
  "⚖️ Motor Vehicles Act — Hit-and-run compensation increased to ₹2 Lakh",
  "📜 RTI Act — Response time reduced to 15 days for life/liberty matters",
  "🛡️ Companies Act Amendment 2024 — New CSR compliance norms effective Q1 2025",
  "👨‍⚖️ Fast Track Courts — POCSO cases must conclude within 6 months",
  "🔔 Consumer Protection — E-commerce return policy rules strengthened 2024",
];

const amendmentsHi = [
  "🔴 बीएनएस 2023 — भारतीय न्याय संहिता 1 जुलाई, 2024 से पूरी तरह प्रभावी (आईपीसी 1860 का स्थान लेती है)",
  "⚡ बीएनएसएस 2023 — ज़ीरो एफआईआर का प्रावधान अब सभी राज्यों में अनिवार्य",
  "🔵 सुप्रीम कोर्ट: निजता का अधिकार अनुच्छेद 21 के तहत एक मौलिक अधिकार है",
  "📋 बीएसए 2023 — भौतिक प्रमाणीकरण के बिना इलेक्ट्रॉनिक साक्ष्य स्वीकार्य",
  "🏠 रेरा (RERA) संशोधन — बिल्डर पर जुर्माना दोगुना, घर खरीदारों के अधिकार मजबूत",
  "⚖️ मोटर वाहन अधिनियम — हिट-एंड-रन मुआवजा बढ़ाकर ₹2 लाख किया गया",
  "📜 आरटीआई अधिनियम — जीवन/स्वतंत्रता मामलों के लिए जवाब देने का समय घटाकर 15 दिन किया गया",
  "🛡️ कंपनी अधिनियम संशोधन 2024 — नए सीएसआर अनुपालन मानक Q1 2025 से प्रभावी",
  "👨‍⚖️ फास्ट ट्रैक कोर्ट — पॉक्सो (POCSO) मामलों को 6 महीने के भीतर समाप्त किया जाना चाहिए",
  "🔔 उपभोक्ता संरक्षण — ई-कॉमर्स रिटर्न पॉलिसी नियम 2024 में और मजबूत किए गए",
];

export default function LawTicker() {
  const { language } = useLanguageStore();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const currentAmendments = language === 'hi' ? amendmentsHi : amendmentsEn;
  const labelText = language === 'hi' ? 'लाइव अपडेट' : 'Live Updates';

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: "40px",
        display: "flex",
        alignItems: "center",
        background: "rgba(5, 11, 24, 0.98)",
        borderBottom: "1px solid rgba(0, 212, 255, 0.2)",
        overflow: "hidden",
      }}
    >
      {/* Label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0 16px",
          height: "100%",
          background: "linear-gradient(135deg, #0066ff, #00d4ff)",
          flexShrink: 0,
          minWidth: "140px",
        }}
      >
        <span style={{ fontSize: "8px", color: "#fff", animation: "pulse-cyan 1s ease-in-out infinite" }}>●</span>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {labelText}
        </span>
      </div>

      {/* Scrolling text */}
      <div className="ticker-wrapper" style={{ flex: 1 }}>
        <div className="ticker-content">
          {currentAmendments.map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: "80px",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "rgba(126, 168, 201, 0.9)",
              }}
            >
              <span style={{ color: "#00d4ff", marginRight: "8px" }}>◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Close */}
      <button
        onClick={() => setVisible(false)}
        style={{
          padding: "0 14px",
          height: "100%",
          background: "transparent",
          border: "none",
          color: "rgba(74, 106, 138, 1)",
          cursor: "pointer",
          fontSize: "14px",
          flexShrink: 0,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(74, 106, 138, 1)")}
        aria-label="Close ticker"
      >
        ✕
      </button>
    </div>
  );
}
