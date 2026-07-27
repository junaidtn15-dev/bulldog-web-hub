import { useCallback, useEffect, useRef, useState } from "react";
import { Banknote, MousePointer2, RotateCcw, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

type Bill = { id: number; dx: string; dy: string; rot: string; delay: number };

const RIVALS = [
  { name: "Scrapyard A", offer: 410 },
  { name: "Online buyer", offer: 560 },
  { name: "Local tow guy", offer: 300 },
];
const BULLDOG = 940;

/**
 * "Load the truck" — drag the car onto the flatbed. On drop the winch fires,
 * cash bursts out, and Bull Dog's offer races past every rival quote.
 */
export function LoadTheTruck() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(6); // % position of car (left edge)
  const [dragging, setDragging] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [bills, setBills] = useState<Bill[]>([]);
  const [payout, setPayout] = useState(0);
  const [hint, setHint] = useState(true);

  const DROP_ZONE = 58; // % beyond which the car is "on the bed"

  const burst = useCallback(() => {
    const next: Bill[] = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      dx: `${(Math.random() - 0.5) * 260}px`,
      dy: `${-90 - Math.random() * 180}px`,
      rot: `${(Math.random() - 0.5) * 520}deg`,
      delay: i * 45,
    }));
    setBills(next);
    setTimeout(() => setBills([]), 1900);
  }, []);

  const settle = useCallback(
    (pos: number) => {
      if (pos >= DROP_ZONE) {
        setX(72);
        setLoaded(true);
        burst();
      } else {
        setX(6);
      }
    },
    [burst],
  );

  const onMove = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const pct = ((clientX - r.left) / r.width) * 100 - 9;
      setX(Math.max(2, Math.min(76, pct)));
    },
    [],
  );

  // payout roll-up once loaded
  useEffect(() => {
    if (!loaded) {
      setPayout(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setPayout(Math.round(BULLDOG * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loaded]);

  // nudge animation until first interaction
  useEffect(() => {
    if (!hint || dragging || loaded) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      setX(6 + Math.abs(Math.sin((now - start) / 900)) * 3);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hint, dragging, loaded]);

  const reset = () => {
    setLoaded(false);
    setX(6);
    setHint(true);
  };

  const near = !loaded && x >= DROP_ZONE - 12;

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-4 sm:p-6">
      <div className="relative z-20 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">Pickup simulator</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {loaded ? "Loaded. Cash handed over before the wheels leave the ground." : "Drag the car onto our flatbed."}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Cash on pickup</p>
          <p className="font-display text-3xl font-extrabold tabular-nums text-foreground">
            ${payout.toLocaleString()}
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerMove={(e) => dragging && onMove(e.clientX)}
        onPointerUp={() => {
          if (dragging) {
            setDragging(false);
            settle(x);
          }
        }}
        onPointerLeave={() => {
          if (dragging) {
            setDragging(false);
            settle(x);
          }
        }}
        className="relative h-56 w-full touch-none select-none overflow-hidden rounded-2xl border border-border/60 bg-card/50 sm:h-64"
      >
        {/* horizon grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--primary) 12%, transparent) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />

        {/* drop zone */}
        <div
          className={cn(
            "absolute bottom-10 rounded-xl border-2 border-dashed transition-colors duration-300",
            near ? "border-primary/80 bg-primary/10" : "border-border/70",
          )}
          style={{ left: `${DROP_ZONE}%`, width: "30%", height: "42%" }}
        >
          <span
            className={cn(
              "absolute inset-x-0 top-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] transition",
              near ? "text-primary" : "text-muted-foreground",
            )}
          >
            {loaded ? "Secured" : "Drop here"}
          </span>
        </div>

        {/* truck */}
        <TruckSvg
          className="absolute bottom-4 right-2 h-auto w-[46%] text-muted-foreground"
          style={loaded ? { animation: "truckPull 700ms ease-out" } : undefined}
        />

        {/* road */}
        <div className="absolute inset-x-0 bottom-6 h-px bg-border" />

        {/* car */}
        <div
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setHint(false);
            setLoaded(false);
            setDragging(true);
          }}
          role="button"
          tabIndex={0}
          aria-label="Drag your car onto the flatbed"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setHint(false);
              setX(72);
              setLoaded(true);
              burst();
            }
          }}
          className={cn(
            "absolute w-[22%] cursor-grab active:cursor-grabbing",
            dragging ? "z-30" : "z-20 transition-all duration-500 ease-out",
          )}
          style={{ left: `${x}%`, bottom: loaded ? "22%" : "8%" }}
        >
          <CarSvg
            className={cn("h-auto w-full", loaded ? "text-success" : near ? "text-primary" : "text-foreground")}
          />
          {hint && !loaded ? (
            <MousePointer2 className="absolute -bottom-1 right-0 size-5 animate-bounce text-primary" />
          ) : null}
        </div>

        {/* cash burst */}
        {bills.map((b) => (
          <span
            key={b.id}
            className="pointer-events-none absolute z-40 grid size-7 place-items-center rounded-sm bg-success/20 text-success"
            style={{
              left: "78%",
              top: "48%",
              // @ts-expect-error css vars
              "--dx": b.dx,
              "--dy": b.dy,
              "--rot": b.rot,
              animation: `cashFly 1500ms ease-out ${b.delay}ms forwards`,
            }}
          >
            <Banknote className="size-4" />
          </span>
        ))}

        {loaded ? (
          <button
            type="button"
            onClick={reset}
            className="absolute left-3 top-3 z-40 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
          >
            <RotateCcw className="size-3.5" /> Run it again
          </button>
        ) : null}
      </div>

      {/* offer race */}
      <div className="relative z-20 mt-5 space-y-2.5">
        {[...RIVALS, { name: "Bull Dog Junk Cars", offer: BULLDOG }].map((r, i) => {
          const isUs = r.offer === BULLDOG;
          return (
            <div key={r.name} className="flex items-center gap-3">
              <span
                className={cn(
                  "w-32 shrink-0 text-xs",
                  isUs ? "font-display font-bold text-foreground" : "text-muted-foreground",
                )}
              >
                {isUs ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="size-3.5 text-primary" /> {r.name}
                  </span>
                ) : (
                  r.name
                )}
              </span>
              <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-border/70">
                <span
                  className="block h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    width: loaded ? `${(r.offer / BULLDOG) * 100}%` : "0%",
                    transitionDelay: `${i * 160}ms`,
                    background: isUs ? "var(--gradient-crimson)" : "color-mix(in oklab, var(--muted-foreground) 45%, transparent)",
                  }}
                />
              </span>
              <span
                className={cn(
                  "w-16 text-right text-xs tabular-nums",
                  isUs ? "font-bold text-primary" : "text-muted-foreground",
                )}
              >
                {loaded ? `$${r.offer}` : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CarSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 90" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M12 62 L28 62 Q34 36 56 34 L106 30 Q140 30 158 46 L184 52 Q194 56 194 64 L176 64" />
        <path d="M12 62 Q10 50 20 48 L28 62" />
        <path d="M58 35 L74 16 L114 15 L134 32" />
        <path d="M92 16 L94 34" />
        <circle cx="56" cy="66" r="11" />
        <circle cx="158" cy="66" r="11" />
      </g>
    </svg>
  );
}

function TruckSvg({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 260 110" className={className} style={style} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* flatbed */}
        <path d="M30 74 L188 74 L188 66 L30 66 Z" />
        <path d="M188 74 L214 74 L214 40 L192 40 L188 66" />
        <path d="M214 74 L246 74 L246 58 L226 52 L214 40" />
        <circle cx="72" cy="86" r="12" />
        <circle cx="196" cy="86" r="12" />
        <circle cx="232" cy="86" r="10" />
        {/* ramp */}
        <path d="M30 66 L6 86" strokeDasharray="7 6" />
      </g>
    </svg>
  );
}
