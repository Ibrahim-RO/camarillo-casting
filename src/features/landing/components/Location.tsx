"use client";

import { useEffect, useRef, useState } from "react";

const READY = { type: "mapa-ubicaciones:ready" };

export default function Location() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // On phones the map reports its stacked-layout height so the iframe matches it.
  // On desktop no height is sent and the 16:9 aspect ratio is used.
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (!data || data.type !== "mapa-ubicaciones:h" || typeof data.h !== "number") return;
      setHeight((prev) => {
        const next = data.h > 0 ? Math.round(data.h) : null;
        if (prev === next) return prev;
        if (prev !== null && next !== null && Math.abs(prev - next) <= 1) return prev;
        return next;
      });
    }
    function ping() {
      iframeRef.current?.contentWindow?.postMessage(READY, "*");
    }
    window.addEventListener("message", onMessage);
    ping();
    const timers = [setTimeout(ping, 300), setTimeout(ping, 1200)];
    return () => {
      window.removeEventListener("message", onMessage);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gold/15 bg-[#131110]">
      <iframe
        ref={iframeRef}
        src="/mapa-ubicaciones.html"
        title="Mapa interactivo de locaciones donde hemos filmado"
        loading="lazy"
        onLoad={() => iframeRef.current?.contentWindow?.postMessage(READY, "*")}
        className={"block w-full border-0 " + (height ? "" : "aspect-[16/9] min-h-[420px]")}
        style={height ? { height: `${height}px` } : undefined}
      />
    </div>
  );
}
