import { useState } from "react";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";
import { BUSINESS } from "@/lib/business";

const schema = z.object({
  year: z.string().trim().min(2, "Enter a vehicle year").max(4),
  make: z.string().trim().min(1, "Enter the make").max(60),
  model: z.string().trim().min(1, "Enter the model").max(60),
  vin: z.string().trim().max(24).optional().or(z.literal("")),
  condition: z.string().trim().min(1, "Select a condition"),
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(24),
  email: z.string().trim().email("Enter a valid email").max(160).optional().or(z.literal("")),
  pickup: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(800).optional().or(z.literal("")),
  company: z.string().max(0).optional(),
});

const FIELD =
  "w-full rounded-lg border border-input bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_25%,transparent)] placeholder:text-muted-foreground/70";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  if (state === "done") {
    return (
      <div className="glass flex min-h-80 flex-col items-center justify-center rounded-2xl p-8 text-center shadow-[var(--shadow-glow)]">
        <div className="grid size-16 place-items-center rounded-full bg-success/15 text-success">
          <Check className="size-8" />
        </div>
        <h3 className="mt-5 text-2xl">Offer request received</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          A Bull Dog specialist will call you with your cash offer shortly. Need it faster? Call{" "}
          <a className="font-semibold text-primary" href={BUSINESS.phoneHref}>
            {BUSINESS.phone}
          </a>
          .
        </p>
        <button onClick={() => setState("idle")} className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
          Submit another vehicle
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement));
        const parsed = schema.safeParse(data);
        if (!parsed.success) {
          const next: Record<string, string> = {};
          for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
          setErrors(next);
          return;
        }
        setErrors({});
        setState("sending");
        setTimeout(() => setState("done"), 900);
      }}
      className="glass rounded-2xl p-6 shadow-[var(--shadow-glow)] sm:p-7"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Instant valuation</p>
      <h3 className="mt-2 text-2xl">Get My Cash Offer</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Takes 60 seconds. Free towing included on every offer.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Field name="year" label="Year" placeholder="2008" error={errors.year} />
        <Field name="make" label="Make" placeholder="Honda" error={errors.make} />
        <Field name="model" label="Model" placeholder="Civic" error={errors.model} />
        <Field name="vin" label="VIN (optional)" placeholder="1HGBH41JXMN" error={errors.vin} />
        <label className="col-span-2 block text-left">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Condition</span>
          <select name="condition" defaultValue="" className={FIELD}>
            <option value="" disabled>
              Select condition
            </option>
            <option>Running &amp; drivable</option>
            <option>Non-running</option>
            <option>Collision damaged</option>
            <option>Scrap / parts only</option>
          </select>
          {errors.condition ? <span className="mt-1 block text-xs text-destructive">{errors.condition}</span> : null}
        </label>
        <Field name="name" label="Your name" placeholder="Alex Doe" error={errors.name} className="col-span-2 sm:col-span-1" />
        <Field name="phone" label="Phone" type="tel" placeholder="403-000-0000" error={errors.phone} className="col-span-2 sm:col-span-1" />
        <Field name="email" label="Email (optional)" type="email" placeholder="you@email.com" error={errors.email} className="col-span-2" />
        {!compact ? (
          <>
            <Field name="pickup" label="Preferred pickup time" placeholder="Today after 4 PM" error={errors.pickup} className="col-span-2" />
            <label className="col-span-2 block text-left">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Message</span>
              <textarea name="message" rows={3} placeholder="Anything we should know?" className={FIELD} />
            </label>
          </>
        ) : null}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground transition hover:brightness-110 disabled:opacity-70"
        style={{ background: "var(--gradient-crimson)", boxShadow: "var(--shadow-glow)" }}
      >
        {state === "sending" ? <Loader2 className="size-4 animate-spin" /> : null}
        Get My Cash Offer
      </button>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        ✓ Free Towing · ✓ Paid On Pickup · ✓ No Hidden Fees
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  error,
  type = "text",
  className = "",
}: {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block text-left ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input name={name} type={type} placeholder={placeholder} className={FIELD} />
      {error ? <span className="mt-1 block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}