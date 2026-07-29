import { useEffect, useRef, useState } from "react";
import { Banknote, Cog, Disc3, Fuel, Sparkles } from "lucide-react";

const PARTS = [
  { label: "Catalytic converter", value: 420, icon: Cog, x: "27%", y: "22%" },
  { label: "Aluminum wheels", value: 260, icon: Disc3, x: "26%", y: "82%" },
  { label: "Engine block", value: 540, icon: Fuel, x: "50%", y: "42%" },
  { label: "Battery + wiring", value: 180, icon: Sparkles, x: "63%", y: "68%" },
  { label: "Steel body weight", value: 380, icon: Banknote, x: "72%", y: "20%" },
];

const TOTAL = PARTS.reduce((s, p) => s + p.value, 0);

/** Scroll-driven teardown: the car dissolves into itemized value as you scroll. */
export function ScrapLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      setP(Math.min(1, Math.max(0, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const unlocked = Math.round(p * PARTS.length * 1.15);
  const payout = Math.round(
    PARTS.slice(0, Math.min(PARTS.length, unlocked)).reduce((s, x) => s + x.value, 0) +
      (unlocked < PARTS.length ? (PARTS[unlocked]?.value ?? 0) * ((p * PARTS.length * 1.15) % 1) : 0),
  );

  return (
    <div ref={ref} className="grid gap-6 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div className="glass ring-glow relative aspect-4/3 overflow-hidden rounded-3xl sm:aspect-[16/10]">
        <div aria-hidden className="grid-bg absolute inset-0 opacity-70" />
        {/* scan sweep tied to scroll */}
        <div
          aria-hidden
          className="absolute inset-y-0 w-24 blur-md"
          style={{
            left: `${p * 100}%`,
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 45%, transparent), transparent)",
          }}
        />

        {/* car silhouette */}
        <svg viewBox="0 0 400 200" className="absolute inset-0 size-full p-4 sm:p-8" aria-hidden>
          <defs>
            <linearGradient id="scrapBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.52 0.21 258)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="oklch(0.68 0.15 232)" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <g
            fill="none"
            stroke="url(#scrapBody)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              opacity: 1 - p * 0.55,
              transform: `scale(${1 - p * 0.04})`,
              transformOrigin: "center",
              transition: "opacity 0.2s linear",
            }}
          >
            <path d="M40 140 L60 100 Q80 78 130 74 L250 74 Q300 78 330 108 L360 118 Q372 124 370 140" />
            <path d="M40 140 L370 140" />
            <path d="M120 76 L128 118 L250 118 L246 76" />
            <circle cx="120" cy="146" r="20" />
            <circle cx="292" cy="146" r="20" />
            <path
              d="M40 140 L370 140"
              stroke="oklch(0.68 0.15 232)"
              strokeDasharray="6 10"
              style={{ strokeDashoffset: -p * 200 }}
            />
          </g>
        </svg>

        {/* itemized part pops */}
        {PARTS.map((part, i) => {
          const on = p * PARTS.length * 1.15 > i + 0.4;
          return (
            <div
              key={part.label}
              className="absolute max-w-[70%] -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `clamp(30%, ${part.x}, 70%)`,
                top: part.y,
                opacity: on ? 1 : 0,
                transform: `translate(-50%,-50%) scale(${on ? 1 : 0.6})`,
                transition: "opacity .45s ease, transform .45s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <span className="glass flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1 text-[9px] font-semibold shadow-[var(--shadow-glow)] sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]">
                <part.icon className="size-3 shrink-0 text-primary sm:size-3.5" />
                <span className="truncate">{part.label}</span>
                <span className="text-primary">+${part.value}</span>
              </span>
              {on ? (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-0 size-2 rounded-full bg-primary"
                  style={{ animation: "coinRise 2.4s ease-out infinite", animationDelay: `${i * 0.3}s` }}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="glass hover-lift rounded-3xl p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Live teardown value</p>
        <p className="mt-3 font-display text-4xl font-extrabold tabular-nums text-chrome sm:text-5xl">
          ${payout.toLocaleString()}
        </p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-[width] duration-150"
            style={{ width: `${p * 100}%`, background: "var(--gradient-crimson)" }}
          />
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-[0.2em]">
          {Math.round(p * 100)}% torn down · {Math.min(PARTS.length, unlocked)}/{PARTS.length} components valued
        </p>
        <ul className="mt-5 space-y-2 text-[13px] sm:mt-6 sm:text-sm">
          {PARTS.map((part, i) => {
            const on = p * PARTS.length * 1.15 > i + 0.4;
            return (
              <li
                key={part.label}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-colors"
                style={{
                  background: on ? "color-mix(in oklab, var(--primary) 8%, transparent)" : "transparent",
                  color: on ? "var(--foreground)" : "var(--muted-foreground)",
                }}
              >
                <span>{part.label}</span>
                <span className="font-display font-bold">{on ? `$${part.value}` : "—"}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-xs text-muted-foreground">
          Sample teardown on a mid-size sedan. Real offers up to ${TOTAL.toLocaleString()}+ depending on condition.
        </p>
      </div>
    </div>
  );
}