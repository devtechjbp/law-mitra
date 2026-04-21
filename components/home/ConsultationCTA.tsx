"use client";

import Link from "next/link";
import { MessageCircle, FileText, Scale, ArrowRight, Zap } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

export default function ConsultationCTA() {
  const { language } = useLanguageStore();
  const t_home = translations[language].home.consultation;
  const t_cons = translations[language].consultation;
  
  const options = [
    { 
      icon: MessageCircle, 
      title: language === 'hi' ? "त्वरित चैट" : "Quick Chat", 
      desc: language === 'hi' ? "कानूनी सवालों के तुरंत जवाब पाएं" : "Get instant answers to legal queries", 
      color: "#00d4ff" 
    },
    { 
      icon: FileText, 
      title: language === 'hi' ? "धारा खोजक" : "Section Finder", 
      desc: language === 'hi' ? "अपनी समस्या के लिए सही कानून खोजें" : "Find the right law for your issue", 
      color: "#0066ff" 
    },
    { 
      icon: Scale, 
      title: language === 'hi' ? "अधिकार स्पष्टीकरण" : "Rights Clarity", 
      desc: language === 'hi' ? "अपनी स्थिति में अपने अधिकार समझें" : "Understand your rights in your situation", 
      color: "#7c3aed" 
    },
  ];

  return (
    <section style={{ padding: "80px 16px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            background: "rgba(10, 22, 40, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 212, 255, 0.2)",
            borderRadius: "24px",
            padding: "60px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow effect */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "400px",
              height: "300px",
              background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="badge-cyan" style={{ marginBottom: "20px" }}>
            <Zap size={13} />
            {language === 'hi' ? "एआई द्वारा संचालित मुफ्त सहायता" : "Free AI-Powered Guidance"}
          </div>

          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, marginBottom: "16px" }}>
            <span style={{ color: "var(--text-primary)" }}>{language === 'hi' ? "कानूनी उलझन " : "Legal "}</span>
            <span className="text-cyan-gradient">{language === 'hi' ? "में हैं?" : "Confused?"}</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: "40px", maxWidth: "500px", margin: "0 auto 40px", lineHeight: 1.7 }}>
            {t_home.description}
          </p>

          {/* Options */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            {options.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="glass-card"
                style={{ padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: `${color}15`,
                    border: `1px solid ${color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>{title}</p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px" }}>
            <Link href="/consultation" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              {language === 'hi' ? "मुफ्त एआई मार्गदर्शन शुरू करें" : "Start Free AI Guidance"} <ArrowRight size={16} />
            </Link>
            <Link href="/library" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              {language === 'hi' ? "अधिनियम ब्राउज़ करें" : "Browse Acts"} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
