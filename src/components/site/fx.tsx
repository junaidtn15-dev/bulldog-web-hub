import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Ambient aurora + grid backdrop used behind dark sections. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute -left-1/4 top-[-20%] h-[70vh] w-[70vh] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: "var(--primary)", animation: "auroraShift 18s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-1/5 bottom-[-25%] h-[60vh] w-[60vh] rounded-full opacity-[0.10] blur-[130px]"
        style={{ background: "var(--accent)", animation: "auroraShift 24s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--primary) 14%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--primary) 14%, transparent) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black, transparent 75%)",
        }}
      />
    </div>
  );
}

function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return { ref, inView };
}

/** Scroll-triggered reveal. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[6px]",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Animated numeric counter that runs when scrolled into view. */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

/** Glass card with 3D pointer tilt. */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-6px) scale(1.015)`;
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "";
      }}
      className={cn(
        "glass spotlight ring-glow relative rounded-2xl p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Infinite marquee strip. */
export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-card/40 py-4">
      <div className="flex w-max gap-10" style={{ animation: "marquee 28s linear infinite" }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full transition-[width] duration-150"
        style={{ width: `${pct}%`, background: "var(--gradient-crimson)" }}
      />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
      ) : null}
      <Tag className="text-balance text-3xl leading-tight sm:text-4xl md:text-5xl">{title}</Tag>
      {sub ? <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">{sub}</p> : null}
    </div>
  );
}