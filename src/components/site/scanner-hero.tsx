import { useEffect, useRef, useState } from "react";

const READOUTS = [
  { label: "Vehicle Value", value: "$4,820" },
  { label: "Curb Weight", value: "1,486 kg" },
  { label: "Engine Condition", value: "Non-running" },
  { label: "Metal Value", value: "$1,190" },
  { label: "Market Demand", value: "High" },
  { label: "Scrap Value", value: "$960" },
];

/**
 * Cinematic scanning-chamber visual: canvas particle field + CSS holographic
 * chassis wireframe, laser sweep, and cash-burst loop. Purely decorative.
 */
export function ScannerHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"scan" | "cash">("scan");

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p === "scan" ? "cash" : "scan")), 4200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2,
      s: Math.random() * 1.6 + 0.4,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= 0.0007 * p.z;
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${140 + p.z * 60},${120 + p.z * 90},${0.12 + p.z * 0.35})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      onPointerMove={(e) => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", `${-y * 7}deg`);
        el.style.setProperty("--ry", `${x * 10}deg`);
      }}
      className="relative aspect-4/3 w-full select-none"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative h-[62%] w-[82%] transition-transform duration-300"
          style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))" }}
        >
          {/* chamber floor */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 rounded-[50%] opacity-60 blur-xl"
            style={{ background: "radial-gradient(ellipse at center, var(--primary), transparent 70%)" }}
          />
          {/* chassis silhouette */}
          <svg
            viewBox="0 0 400 170"
            className="absolute inset-0 m-auto h-auto w-full drop-shadow-[0_0_28px_rgba(198,40,40,0.55)]"
            style={{ animation: "floaty 6s ease-in-out infinite" }}
          >
            <defs>
              <linearGradient id="bdChassis" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff5a5a" />
                <stop offset="100%" stopColor="#5ad2ff" />
              </linearGradient>
            </defs>
            <g
              fill="none"
              stroke="url(#bdChassis)"
              strokeWidth="1.6"
              opacity={phase === "cash" ? 0.25 : 0.95}
              style={{ transition: "opacity 700ms" }}
            >
              <path d="M30 120 L60 120 Q70 82 108 78 L200 70 Q252 68 288 92 L348 104 Q372 108 372 120 L340 120" />
              <path d="M30 120 Q28 100 44 96 L60 120" />
              <path d="M112 80 L136 46 L214 44 L246 74" />
              <path d="M172 46 L176 76" />
              <circle cx="108" cy="124" r="20" />
              <circle cx="108" cy="124" r="9" />
              <circle cx="308" cy="124" r="20" />
              <circle cx="308" cy="124" r="9" />
              <path d="M60 120 L288 120" strokeDasharray="6 8" />
            </g>
          </svg>
          {/* laser sweep */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="h-16 w-full opacity-80"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--accent) 70%, transparent), transparent)",
                animation: "scanline 4.2s linear infinite",
              }}
            />
          </div>
          {/* cash burst */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
            style={{ opacity: phase === "cash" ? 1 : 0 }}
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-[3px] border border-success/60 bg-success/15"
                style={{
                  width: 34,
                  height: 18,
                  transform: `translate(${(i % 7) * 34 - 100}px, ${Math.sin(i) * 46}px) rotate(${i * 23}deg)`,
                  animation: `floaty ${3 + (i % 4)}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* holographic readouts */}
      <div className="pointer-events-none absolute inset-0 hidden place-items-center sm:grid">
        <div className="grid w-full grid-cols-2 gap-2 px-2">
          {READOUTS.map((r, i) => (
            <div
              key={r.label}
              className="glass rounded-lg px-3 py-2 text-left"
              style={{
                gridColumn: i % 2 === 0 ? 1 : 2,
                justifySelf: i % 2 === 0 ? "start" : "end",
                animation: `floaty ${5 + i * 0.4}s ease-in-out infinite`,
                opacity: 0.9,
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{r.label}</p>
              <p className="font-display text-sm font-bold text-foreground">{r.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}