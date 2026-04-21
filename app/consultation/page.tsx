"use client";

import { useEffect } from "react";
import { Sparkles, Shield } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function ConsultationPage() {
  const { language } = useLanguageStore();

  useEffect(() => {
    // FloatingBot in layout already loads Voiceflow globally — no duplicate script here
    // Just open the chat widget when this page loads
    const tryOpen = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vf = (window as any).voiceflow;
      if (vf?.chat?.open) {
        vf.chat.open();
      } else {
        setTimeout(tryOpen, 400);
      }
    };
    setTimeout(tryOpen, 800);
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 80px" }}>

      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div className="badge-cyan" style={{ marginBottom: "16px" }}>
          <Sparkles size={13} />
          {language === "hi" ? "मुफ्त कानूनी मार्गदर्शन" : "Free Legal Guidance"}
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "12px", color: "#e8f4fd" }}>
          {language === "hi" ? "एआई कानूनी " : "AI Legal "}
          <span className="text-cyan-gradient">{language === "hi" ? "सहायक" : "Assistant"}</span>
        </h1>
        <p style={{ fontSize: "1rem", color: "#7ea8c9", maxWidth: "600px", margin: "0 auto" }}>
          {language === "hi"
            ? "अपनी कानूनी स्थिति बताएं और तुरंत प्रासंगिक कानूनों और धाराओं पर मार्गदर्शन प्राप्त करें।"
            : "Describe your legal situation and get instant guidance on relevant laws and sections."}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {[
          { icon: "⚖️", title: language === "hi" ? "कानूनी मार्गदर्शन" : "Legal Guidance", desc: language === "hi" ? "BNS, BNSS, BSA और संविधान पर" : "On BNS, BNSS, BSA & Constitution" },
          { icon: "🔒", title: language === "hi" ? "निजी और सुरक्षित" : "Private & Secure", desc: language === "hi" ? "आपकी बातचीत सुरक्षित है" : "Your conversation is secure" },
          { icon: "🆓", title: language === "hi" ? "बिल्कुल मुफ्त" : "Completely Free", desc: language === "hi" ? "सभी नागरिकों के लिए" : "For all citizens" },
        ].map((card) => (
          <div key={card.title} style={{ background: "rgba(10,22,40,0.8)", border: "1px solid rgba(0,212,255,0.12)", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{card.icon}</div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8f4fd", marginBottom: "4px" }}>{card.title}</div>
            <div style={{ fontSize: "0.78rem", color: "#7ea8c9" }}>{card.desc}</div>
          </div>
        ))}
      </div>



      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px", borderRadius: "16px", background: "rgba(245, 158, 11, 0.05)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
        <Shield size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: "2px" }} />
        <p style={{ fontSize: "0.8rem", color: "#f59e0b", lineHeight: 1.5, opacity: 0.8 }}>
          {language === "hi"
            ? "लॉ मित्र एआई कानूनी जानकारी प्रदान करता है, पेशेवर सलाह नहीं। जटिल मामलों के लिए हमेशा किसी योग्य वकील से परामर्श लें।"
            : "Law Mitra AI provides legal information, not professional advice. For complex matters, always consult a qualified lawyer."}
        </p>
      </div>
    </div>
  );
}