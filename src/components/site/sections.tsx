import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { Aurora, Reveal } from "./fx";

export function PageHero({
  eyebrow,
  title,
  sub,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  breadcrumb?: { to: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden pb-10 pt-24 sm:pb-16 sm:pt-40">
      <Aurora />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-muted-foreground">
            {breadcrumb.map((b, i) => (
              <span key={b.to}>
                {i > 0 ? <span className="px-2">/</span> : null}
                <Link to={b.to} className="hover:text-primary">
                  {b.label}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{title}</h1>
        {sub ? <p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg">{sub}</p> : null}
        <CtaPair className="mt-8 justify-center" />
      </div>
    </section>
  );
}

export function CtaPair({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap ${className}`}>
      <Link
        to="/contact"
        hash="quote"
        className="shine group inline-flex items-center justify-center rounded-lg px-5 py-3.5 font-display text-[13px] font-bold uppercase tracking-wide text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-110 sm:px-6 sm:text-sm"
        style={{ background: "var(--gradient-crimson)", boxShadow: "var(--shadow-glow)" }}
      >
        Get My Cash Offer
      </Link>
      <a
        href={BUSINESS.phoneHref}
        className="glass ring-glow inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-display text-[13px] font-bold uppercase tracking-wide text-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] sm:px-6 sm:text-sm"
      >
        <Phone className="size-4 shrink-0 transition-transform duration-500 group-hover:rotate-12" /> Call {BUSINESS.phone}
      </a>
    </div>
  );
}

export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground sm:text-sm ${className}`}>
      {["Free Towing", "Paid On Pickup", "Open Daily", "Any Condition"].map((b) => (
        <li key={b} className="flex items-center gap-2">
          <span className="text-success">✓</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-24">
      <Aurora />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
        <h2 className="text-balance text-3xl sm:text-5xl">Ready To Sell Your Junk Car?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Get a real cash offer in minutes. Free towing, instant payment, {BUSINESS.hours}.
          </p>
          <CtaPair className="mx-auto mt-8 justify-center" />
          <TrustBadges className="mt-6 justify-center" />
        </Reveal>
      </div>
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 text-pretty leading-relaxed text-muted-foreground sm:px-6 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
      {children}
    </div>
  );
}