import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Part = {
  id: string;
  label: string;
  value: number;
  x: number; // % of container
  y: number;
};

const PARTS: Part[] = [
  { id: "engine", label: "Engine Block", value: 420, x: 27, y: 47 },
  { id: "cat", label: "Catalytic Converter", value: 310, x: 47, y: 66 },
  { id: "trans", label: "Transmission", value: 260, x: 38, y: 60 },
  { id: "wheels", label: "Alloy Wheels ×4", value: 240, x: 74, y: 72 },
  { id: "battery", label: "Battery", value: 60, x: 20, y: 38 },
  { id: "rad", label: "Radiator", value: 85, x: 15, y: 55 },
  { id: "ecu", label: "ECU + Harness", value: 130, x: 55, y: 40 },
  { id: "body", label: "Body Steel", value: 295, x: 63, y: 30 },
];

const COLS = 14;
const ROWS = 9;

function useAnimatedNumber(target: number) {
  const [display, setDisplay] = useState(target);
  const raf = useRef(0);
  useEffect(() => {
    const from = display;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 650);
      setDisplay(Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return display;
}

/**
 * Interactive X-Ray teardown: drag the scanner lens across the vehicle to
 * reveal internals, then tap a glowing component to add it to the live payout.
 */
export function XrayTeardown() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 34, y: 52 });
  const [active, setActive] = useState(false);
  const [found, setFound] = useState<string[]>([]);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const cells = useRef<Set<number>>(new Set());
  const [coverage, setCoverage] = useState(0);

  const total = useMemo(
    () => PARTS.filter((p) => found.includes(p.id)).reduce((s, p) => s + p.value, 0),
    [found],
  );
  const shown = useAnimatedNumber(total);

  const move = useCallback((clientX: number, clientY: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    const y = ((clientY - r.top) / r.height) * 100;
    setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    const c = Math.floor((x / 100) * COLS);
    const rw = Math.floor((y / 100) * ROWS);
    if (c >= 0 && c < COLS && rw >= 0 && rw < ROWS) {
      const key = rw * COLS + c;
      if (!cells.current.has(key)) {
        cells.current.add(key);
        setCoverage(Math.round((cells.current.size / (COLS * ROWS)) * 100));
      }
    }
  }, []);

  // Idle auto-sweep so the panel feels alive before the user touches it.
  useEffect(() => {
    if (active) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      setPos({ x: 50 + Math.cos(t * 0.55) * 30, y: 52 + Math.sin(t * 0.9) * 16 });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const claim = (p: Part, e: React.MouseEvent) => {
    e.stopPropagation();
    if (found.includes(p.id)) return;
    setFound((f) => [...f, p.id]);
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x: p.x, y: p.y }]);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 900);
  };

  const lensMask = `radial-gradient(circle 17% at ${pos.x}% ${pos.y}%, #000 0%, #000 62%, transparent 100%)`;
  const allFound = found.length === PARTS.length;

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-4 sm:p-6">
      {/* HUD top bar */}
      <div className="relative z-20 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
            Live teardown scan
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {allFound
              ? "Full teardown complete — that's your car, itemised."
              : "Drag the lens over the car, then tap the glowing parts."}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Recovered value</p>
          <p className="font-display text-3xl font-extrabold tabular-nums text-foreground">
            ${shown.toLocaleString()}
          </p>
        </div>
      </div>

      <div
        ref={wrapRef}
        onPointerMove={(e) => {
          setActive(true);
          move(e.clientX, e.clientY);
        }}
        onPointerLeave={() => setActive(false)}
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (t) {
            setActive(true);
            move(t.clientX, t.clientY);
          }
        }}
        className="relative aspect-4/3 w-full cursor-crosshair touch-none overflow-hidden rounded-2xl border border-border/60 bg-card/50 sm:aspect-video"
      >
        {/* blueprint grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--primary) 12%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--primary) 12%, transparent) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* base car outline */}
        <CarSvg className="absolute inset-0 m-auto h-auto w-[86%] opacity-45" strokeWidth={1.4} />

        {/* x-ray layer, revealed only under the lens */}
        <div
          className="absolute inset-0"
          style={{ maskImage: lensMask, WebkitMaskImage: lensMask }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "color-mix(in oklab, var(--accent) 14%, transparent)" }}
          />
          <CarSvg className="absolute inset-0 m-auto h-auto w-[86%]" strokeWidth={2.2} xray />
          {PARTS.map((p) => (
            <div
              key={p.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span
                className={cn(
                  "block size-6 rounded-full border-2",
                  found.includes(p.id)
                    ? "border-success bg-success/40"
                    : "border-accent bg-accent/30",
                )}
                style={{ boxShadow: "0 0 22px color-mix(in oklab, var(--accent) 60%, transparent)" }}
              />
            </div>
          ))}
        </div>

        {/* lens ring */}
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: "34%",
            aspectRatio: "1",
            boxShadow:
              "0 0 40px color-mix(in oklab, var(--primary) 35%, transparent), inset 0 0 40px color-mix(in oklab, var(--accent) 25%, transparent)",
          }}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/30" />
          <span className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-primary/30" />
        </div>

        {/* clickable hotspots (always interactive) */}
        {PARTS.map((p) => {
          const near = Math.hypot(p.x - pos.x, (p.y - pos.y) * 0.75) < 18;
          const claimed = found.includes(p.id);
          return (
            <button
              key={p.id}
              type="button"
              onClick={(e) => claim(p, e)}
              aria-label={`Add ${p.label} — $${p.value}`}
              className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: 44, height: 44 }}
            >
              <span
                className={cn(
                  "pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold transition-all duration-300",
                  claimed
                    ? "bg-success/20 text-success opacity-100"
                    : near
                      ? "glass text-foreground opacity-100"
                      : "opacity-0",
                )}
              >
                {p.label} · ${p.value}
              </span>
              {!claimed && near ? (
                <span className="pointer-events-none absolute inset-0 animate-ping rounded-full border border-accent/70" />
              ) : null}
            </button>
          );
        })}

        {/* claim ripples */}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="pointer-events-none absolute z-20 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-success/70"
            style={{ left: `${r.x}%`, top: `${r.y}%`, animation: "scanPing 900ms ease-out forwards" }}
          />
        ))}

        {/* coverage HUD */}
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scanned</span>
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-border">
            <span
              className="block h-full transition-[width] duration-200"
              style={{ width: `${coverage}%`, background: "var(--gradient-crimson)" }}
            />
          </span>
          <span className="font-display text-xs font-bold tabular-nums text-foreground">{coverage}%</span>
        </div>
      </div>

      {/* itemised list */}
      <div className="relative z-20 mt-4 flex flex-wrap gap-2">
        {PARTS.map((p) => {
          const claimed = found.includes(p.id);
          return (
            <span
              key={p.id}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-all duration-300",
                claimed
                  ? "border-success/50 bg-success/10 text-success"
                  : "border-border/70 text-muted-foreground",
              )}
            >
              {claimed ? `${p.label} +$${p.value}` : "• • • • •"}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function CarSvg({
  className,
  strokeWidth = 1.6,
  xray = false,
}: {
  className?: string;
  strokeWidth?: number;
  xray?: boolean;
}) {
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden>
      <defs>
        <linearGradient id="xrayStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={xray ? "url(#xrayStroke)" : "currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={xray ? undefined : "text-muted-foreground"}
      >
        <path d="M28 140 L62 140 Q74 96 116 92 L214 82 Q272 80 310 106 L364 118 Q388 122 388 140 L352 140" />
        <path d="M28 140 Q26 118 44 114 L62 140" />
        <path d="M120 94 L148 54 L228 52 L262 88" />
        <path d="M182 53 L186 90" />
        <circle cx="116" cy="144" r="24" />
        <circle cx="116" cy="144" r="10" />
        <circle cx="318" cy="144" r="24" />
        <circle cx="318" cy="144" r="10" />
        <path d="M62 140 L294 140" strokeDasharray="6 9" />
        {xray ? (
          <>
            <rect x="78" y="98" width="58" height="34" rx="6" />
            <rect x="140" y="112" width="46" height="20" rx="4" />
            <path d="M186 128 L232 132 L246 126" />
            <rect x="60" y="102" width="14" height="24" rx="3" />
            <path d="M214 84 L246 96 L268 92" />
          </>
        ) : null}
      </g>
    </svg>
  );
}