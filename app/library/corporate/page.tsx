"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Briefcase } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

export default function CorporatePage() {
  const { language } = useLanguageStore();
  const t = translations[language].library;

  const acts = useMemo(() => [
    {
      title: language === 'hi' ? "कंपनी अधिनियम 2013" : "Companies Act 2013",
      color: "#7c3aed",
      sections: language === 'hi' ? "470 धाराएं" : "470 Sections",
      desc: language === 'hi' 
        ? "भारत में कंपनियों के निगमन, प्रबंधन, खातों, ऑडिट, विलय और समापन को नियंत्रित करता है। इसमें कॉर्पोरेट सामाजिक उत्तरदायित्व (CSR), नेशनल कंपनी लॉ ट्रिब्यूनल (NCLT) और क्लास एक्शन सूट के प्रावधान शामिल हैं।"
        : "Governs incorporation, management, accounts, and winding up of companies in India.",
      keyPoints: language === 'hi' ? ["शुद्ध लाभ ≥ ₹5 करोड़ वाली कंपनियों के लिए अनिवार्य CSR", "NCLT ने कंपनी लॉ बोर्ड का स्थान लिया", "एक व्यक्ति कंपनी (OPC) की शुरुआत", "सूचीबद्ध कंपनियों के लिए स्वतंत्र निदेशक अनिवार्य"] : ["Mandatory CSR for companies with net profit ≥ ₹5cr", "NCLT replaces Company Law Board", "One Person Company (OPC) introduced", "Independent Directors mandatory"],
    },
    {
      title: language === 'hi' ? "दिवाला और दिवालियापन संहिता 2016" : "Insolvency & Bankruptcy Code 2016",
      color: "#ff4d6d",
      sections: language === 'hi' ? "255 धाराएं" : "255 Sections",
      desc: language === 'hi'
        ? "कंपनियों और व्यक्तियों के लिए दिवाला के समयबद्ध समाधान का प्रावधान करता है। भारतीय दिवाला और दिवालियापन बोर्ड (IBBI) और समाधान पेशेवरों की स्थापना करता है।"
        : "Provides for time-bound resolution of insolvency for companies and individuals.",
      keyPoints: language === 'hi' ? ["180-दिवसीय समाधान समय सीमा", "NCLT/NCLAT क्षेत्राधिकार", "लेनदार-इन-कंट्रोल मॉडल", "व्यक्तिगत दिवाला प्रावधान"] : ["180-day resolution timeline", "NCLT/NCLAT jurisdiction", "Creditor-in-control model", "Personal insolvency provisions"],
    },
    {
      title: language === 'hi' ? "सेबी (SEBI) अधिनियम और विनियम" : "SEBI Act & Regulations",
      color: "#00d4ff",
      sections: language === 'hi' ? "एकाधिक विनियम" : "Multiple Regulations",
      desc: language === 'hi'
        ? "भारतीय प्रतिभूति और विनिमय बोर्ड प्रतिभूति बाजार को नियंत्रित करता है। इसमें इनसाइडर ट्रेडिंग, टेकओवर कोड, म्यूचुअल फंड और निवेशक सुरक्षा शामिल है।"
        : "Securities and Exchange Board of India regulates the securities market.",
      keyPoints: language === 'hi' ? ["इनसाइडर ट्रेडिंग विनियमों का निषेध", "सूचीबद्ध कंपनियों के लिए SEBI (LODR) विनियम", "टेकओवर कोड — 26% पर अनिवार्य ओपन ऑफर", "निवेशक शिकायत निवारण तंत्र"] : ["Prohibition of Insider Trading", "SEBI (LODR) for listed companies", "Takeover Code - 26% mandatory offer", "Investor grievance redressal"],
    },
    {
      title: language === 'hi' ? "जीएसटी (GST) अधिनियम 2017" : "GST Act 2017",
      color: "#4ade80",
      sections: language === 'hi' ? "CGST + SGST + IGST" : "CGST + SGST + IGST",
      desc: language === 'hi'
        ? "माल और सेवा कर — माल और सेवाओं की आपूर्ति पर एक व्यापक अप्रत्यक्ष कर। कई केंद्रीय और राज्य करों का स्थान लिया।"
        : "Goods and Services Tax — a comprehensive indirect tax on supply of goods and services.",
      keyPoints: language === 'hi' ? ["इनपुट टैक्स क्रेडिट (ITC) तंत्र", "दर निर्णयों के लिए GST परिषद", "माल की आवाजाही के लिए ई-वे बिल", "वार्षिक रिटर्न फाइलिंग (GSTR-9)"] : ["Input Tax Credit (ITC) mechanism", "GST Council for rates", "E-way bill for goods movement", "Annual return (GSTR-9)"],
    },
    {
      title: language === 'hi' ? "विदेशी मुद्रा प्रबंधन अधिनियम (FEMA) 1999" : "Foreign Exchange Management Act (FEMA) 1999",
      color: "#f59e0b",
      sections: language === 'hi' ? "49 धाराएं" : "49 Sections",
      desc: language === 'hi'
        ? "भारत में विदेशी मुद्रा लेनदेन को नियंत्रित करता है। FERA 1973 का स्थान लिया। FDI, FPI, ECB और विदेशी निवेश को नियंत्रित करता है।"
        : "Regulates foreign exchange transactions in India. Replaces FERA 1973.",
      keyPoints: language === 'hi' ? ["RBI पूंजी खाता लेनदेन को नियंत्रित करती है", "चालू खाता लेनदेन की स्वतंत्र अनुमति", "अपराधों के कंपाउंडिंग की अनुमति", "उल्लंघनों के लिए निर्णायक प्राधिकरण"] : ["RBI regulates capital accounts", "Current account freedom", "Compounding of offences", "Adjudicating Authority"],
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
        <span style={{ color: "#7c3aed" }}>{language === 'hi' ? 'कॉर्पोरेट कानून' : 'Corporate Laws'}</span>
      </div>

      {/* Header Card */}
      <div style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: "20px", padding: "28px", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Briefcase size={26} color="#7c3aed" />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#e8f4fd", marginBottom: "8px" }}>{language === 'hi' ? 'कॉर्पोरेट और व्यावसायिक कानून' : 'Corporate & Business Laws'}</h1>
            <p style={{ fontSize: "0.82rem", color: "#7c3aed", marginBottom: "10px", fontWeight: 600 }}>{language === 'hi' ? 'कंपनी अधिनियम 2013 · IBC 2016 · सेबी · जीएसटी' : 'Companies Act 2013 · IBC 2016 · SEBI · GST'}</p>
            <p style={{ fontSize: "0.9rem", color: "#7ea8c9", lineHeight: 1.7 }}>
              {language === 'hi' 
                ? "कंपनी गठन, शासन, अनुपालन, दिवाला, प्रतिभूति विनियमन और प्रतिस्पर्धा कानून सहित भारतीय कॉर्पोरेट कानून की व्यापक कवरेज।"
                : "Comprehensive coverage of Indian corporate law including company formation, governance, compliance, and securities regulation."}
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
