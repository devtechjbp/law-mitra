"use client";

import { useState, useEffect } from "react";
import { Eye, Type, Sun } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

type FontSize = "text-sm" | "text-md" | "text-lg" | "text-xl";

export default function AccessibilityBar() {
  const { language } = useLanguageStore();
  const t = translations[language].accessibility;

  const [fontSize, setFontSize] = useState<FontSize>("text-md");
  const [highContrast, setHighContrast] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("text-sm", "text-md", "text-lg", "text-xl");
    html.classList.add(fontSize);
  }, [fontSize]);

  useEffect(() => {
    const html = document.documentElement;
    if (highContrast) html.classList.add("high-contrast");
    else html.classList.remove("high-contrast");
  }, [highContrast]);

  return (
    <div style={{ position: "fixed", bottom: "140px", right: "32px", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: open ? "rgba(0, 212, 255, 0.2)" : "rgba(0, 212, 255, 0.08)",
          border: "1px solid rgba(0, 212, 255, 0.3)",
          color: "#00d4ff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          boxShadow: open ? "0 0 15px rgba(0, 212, 255, 0.3)" : "none",
        }}
        aria-label="Accessibility options"
        title="Accessibility"
      >
        <Eye size={17} />
      </button>

      {open && (
        <div
          style={{
            background: "rgba(5, 11, 24, 0.97)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 212, 255, 0.2)",
            borderRadius: "16px",
            padding: "16px",
            minWidth: "180px",
            animation: "scale-in 0.2s ease",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          }}
        >
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d4ff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
            {t.title}
          </p>

          {/* Font Size */}
          <div style={{ marginBottom: "12px" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
              <Type size={12} /> {t.fontSize}
            </p>
            <div style={{ display: "flex", gap: "4px" }}>
              {(["text-sm", "text-md", "text-lg", "text-xl"] as FontSize[]).map((size, i) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    background: fontSize === size ? "linear-gradient(135deg, #0066ff, #00d4ff)" : "rgba(0, 212, 255, 0.08)",
                    color: fontSize === size ? "#ffffff" : "#00d4ff",
                    border: "1px solid rgba(0, 212, 255, 0.2)",
                    cursor: "pointer",
                    fontSize: `${11 + i * 2}px`,
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  aria-label={`Font size ${size}`}
                >
                  A
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "10px",
              background: highContrast ? "linear-gradient(135deg, #0066ff, #00d4ff)" : "rgba(0, 212, 255, 0.08)",
              color: highContrast ? "#ffffff" : "#00d4ff",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            <Sun size={13} />
            {highContrast ? t.normalMode : t.highContrast}
          </button>
        </div>
      )}
    </div>
  );
}
