import { useMemo, useState } from "react";
import { Calculator, Gauge, Phone, Sparkles } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { CtaPair } from "./sections";

const TYPES = [
  { id: "sedan", label: "Car / Sedan", base: 420 },
  { id: "hatch", label: "Hatchback", base: 380 },
  { id: "suv", label: "SUV / Crossover", base: 620 },
  { id: "truck", label: "Pickup Truck", base: 780 },
  { id: "van", label: "Van / Commercial", base: 700 },
] as const;

const CONDITIONS = [
  { id: "running", label: "Runs & drives", mult: 1.55 },
  { id: "starts", label: "Starts, not roadworthy", mult: 1.2 },
  { id: "dead", label: "Not running", mult: 0.9 },
  { id: "wrecked", label: "Wrecked / stripped", mult: 0.7 },
] as const;

const CURRENT_YEAR = new Date().getFullYear();

function money(n: number) {
  return `$${(Math.round(n / 10) * 10).toLocaleString()}`;
}

export function ValueCalculator() {
  const [type, setType] = useState<string>("sedan");
  const [condition, setCondition] = useState<string>("dead");
  const [year, setYear] = useState(2010);
  const [complete, setComplete] = useState(true);

  const { low, high, score } = useMemo(() => {
    const t = TYPES.find((x) => x.id === type) ?? TYPES[0];
    const c = CONDITIONS.find((x) => x.id === condition) ?? CONDITIONS[2];
    const age = Math.max(0, CURRENT_YEAR - year);
    const ageFactor = Math.max(0.55, 1.9 - age * 0.055);
    const base = t.base * c.mult * ageFactor * (complete ? 1 : 0.78);
    return {
      low: Math.max(220, base * 0.85),
      high: Math.max(360, base * 1.35),
      score: Math.min(100, Math.round((base / 2200) * 100)),
    };
  }, [type, condition, year, complete]);

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full blur-3xl"
        style={{ background: "oklch(0.52 0.21 258 / 25%)" }}
      />
      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <Calculator className="size-3.5 text-primary" /> Instant estimator
        </p>
        <h3 className="mt-4 text-2xl sm:text-3xl">Estimate your payout</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Move the controls — the estimate updates live. Final offers are confirmed by phone.
        </p>

        <div className="mt-6 space-y-5">
          <Field label="Vehicle type">
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <Chip key={t.id} active={type === t.id} onClick={() => setType(t.id)}>
                  {t.label}
                </Chip>
              ))}
            </div>
          </Field>

          <Field label="Condition">
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map((c) => (
                <Chip key={c.id} active={condition === c.id} onClick={() => setCondition(c.id)}>
                  {c.label}
                </Chip>
              ))}
            </div>
          </Field>

          <Field label={`Model year — ${year}`}>
            <input
              type="range"
              min={1985}
              max={CURRENT_YEAR}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              aria-label="Model year"
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
            />
          </Field>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={complete}
              onChange={(e) => setComplete(e.target.checked)}
              className="size-4 accent-primary"
            />
            All major parts present (engine, transmission, catalytic converter, wheels)
          </label>
        </div>

        <div className="mt-7 rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            Estimated cash range
          </p>
          <p className="mt-2 font-display text-4xl font-extrabold text-primary transition-all duration-300 sm:text-5xl">
            {money(low)} – {money(high)}
          </p>
          <div className="mx-auto mt-5 h-2 max-w-sm overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(8, score)}%`, background: "var(--gradient-crimson)" }}
            />
          </div>
          <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Gauge className="size-3.5 text-accent" /> Value index {score}/100
          </p>
        </div>

        <CtaPair className="mt-6 justify-center" />
        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          Estimates only — call{" "}
          <a href={BUSINESS.phoneHref} className="font-semibold text-primary hover:underline">
            <Phone className="mr-1 inline size-3" />
            {BUSINESS.phone}
          </a>{" "}
          for a firm offer.
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
        active
          ? "border-primary bg-primary/20 text-foreground shadow-[var(--shadow-glow)]"
          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
