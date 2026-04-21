import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingBot from "@/components/ui/FloatingBot";
import LawTicker from "@/components/ui/LawTicker";
import VantaBackground from "@/components/ui/VantaBackground";
import AccessibilityBar from "@/components/ui/AccessibilityBar";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Law Mitra — Your Legal Encyclopedia",
  description:
    "India's most comprehensive legal encyclopedia. Search laws, read acts, get AI legal guidance, and access legal documents — all in one place. Free and accessible for all citizens.",
  keywords: ["Indian Law", "Legal Encyclopedia", "IPC", "BNS", "Constitution of India", "AI Legal Assistant", "Law Mitra", "Free Legal Guidance"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Law Mitra — Your Legal Encyclopedia",
    description: "India's most comprehensive free legal encyclopedia and AI assistant.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="text-md">
      <body className={`${inter.variable} font-sans antialiased`}>
        <VantaBackground />
        <AccessibilityBar />
        <LawTicker />
        <Header />

        {/*
          main gets a top padding equal to:
          ticker (40px) + header (64px) + extra breathing room (24px) = 128px
        */}
        <main style={{ position: "relative", zIndex: 10, paddingTop: "128px" }}>
          {children}
        </main>

        <Footer />
        <FloatingBot />

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(5, 11, 24, 0.97)",
              color: "#e8f4fd",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              backdropFilter: "blur(10px)",
            },
          }}
        />
      </body>
    </html>
  );
}
