"use client";

import { useEffect, useRef } from "react";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const effectRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import heavy libs only on client, after paint
    const loadVanta = async () => {
      if (!vantaRef.current) return;
      try {
        const [THREE, { default: NET }] = await Promise.all([
          import("three"),
          // @ts-expect-error - Vanta does not have full TypeScript declarations
          import("vanta/dist/vanta.net.min"),
        ]);
        if (!vantaRef.current) return; // component may have unmounted
        effectRef.current = NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x00d4ff,
          backgroundColor: 0x050b18,
          points: 10.0,
          maxDistance: 0.0,
          spacing: 20.0,
        });
      } catch (error) {
        console.warn("Vanta background failed to load:", error);
      }
    };

    // Use requestIdleCallback so Vanta loads after critical content renders
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadVanta);
      } else {
        setTimeout(loadVanta, 200);
      }
    }

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Vanta NET container */}
      <div
        ref={vantaRef}
        id="vanta-bg"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
        }}
      />

      {/* Deep overlay for readability */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(0,102,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.06) 0%, transparent 60%), linear-gradient(to bottom, rgba(5,11,24,0.5) 0%, rgba(5,11,24,0.75) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              borderRadius: "50%",
              background: i % 2 === 0 ? "rgba(0, 212, 255, 0.7)" : "rgba(124, 58, 237, 0.7)",
              left: `${10 + i * 11}%`,
              top: `${15 + i * 9}%`,
              animation: `float-particle ${7 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
              boxShadow: i % 2 === 0
                ? "0 0 8px rgba(0, 212, 255, 0.9)"
                : "0 0 8px rgba(124, 58, 237, 0.9)",
            }}
          />
        ))}
      </div>
    </>
  );
}
