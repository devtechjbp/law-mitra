"use client";

import Link from "next/link";
import { MoveLeft, AlertTriangle } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function NotFound() {
  const { language } = useLanguageStore();

  return (
    <div style={{ 
      minHeight: "70vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      textAlign: "center",
      padding: "24px"
    }}>
      <div style={{ 
        width: "80px", 
        height: "80px", 
        borderRadius: "24px", 
        background: "rgba(245, 158, 11, 0.1)", 
        border: "1px solid rgba(245, 158, 11, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "32px",
        animation: "pulse-cyan 2s infinite"
      }}>
        <AlertTriangle size={40} color="#f59e0b" />
      </div>

      <h1 style={{ 
        fontSize: "clamp(3rem, 10vw, 6rem)", 
        fontWeight: 900, 
        color: "#e8f4fd", 
        lineHeight: 1,
        marginBottom: "16px"
      }}>
        404
      </h1>
      
      <h2 style={{ 
        fontSize: "1.25rem", 
        fontWeight: 700, 
        color: "#00d4ff", 
        marginBottom: "16px" 
      }}>
        {language === 'hi' ? 'पृष्ठ नहीं मिला' : 'Page Not Found'}
      </h2>

      <p style={{ 
        fontSize: "1rem", 
        color: "#7ea8c9", 
        maxWidth: "400px", 
        lineHeight: 1.6,
        marginBottom: "40px"
      }}>
        {language === 'hi' 
          ? "क्षमा करें, जिस पृष्ठ को आप खोज रहे हैं वह मौजूद नहीं है या हटा दिया गया है।" 
          : "Sorry, the page you are looking for doesn't exist or has been moved."}
      </p>

      <Link 
        href="/" 
        className="btn-primary"
        style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
      >
        <MoveLeft size={18} />
        {language === 'hi' ? 'मुखपृष्ठ पर वापस जाएं' : 'Back to Home'}
      </Link>
    </div>
  );
}
