"use client";

import { useEffect } from "react";

export default function FloatingBot() {
  useEffect(() => {
    const d = document;
    const t = "script";
    const v = d.createElement(t) as HTMLScriptElement;
    const s = d.getElementsByTagName(t)[0];

    v.onload = function () {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vf = (window as any).voiceflow;
      vf.chat.load({
        verify: { projectID: "69e28e863cb086e33187a4b0" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        voice: { url: "https://runtime-api.voiceflow.com" },
        assistant: {
          persistence: "memory", // resets conversation on every page reload
        },
      });

      // Auto-open only on consultation page
      if (window.location.pathname === "/consultation") {
        setTimeout(() => {
          vf.chat.open();
        }, 1000);
      }
    };

    v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    v.type = "text/javascript";
    s.parentNode?.insertBefore(v, s);

    return () => {
      // cleanup script on unmount
      if (v.parentNode) v.parentNode.removeChild(v);
    };
  }, []);

  return null;
}
