import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUp, Menu, Phone, X } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { ScrollProgress } from "./fx";
import { BulldogLogo, LogoLockup } from "./logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/what-we-buy", label: "What We Buy" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid ? "glass shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <LogoLockup compact />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-md px-3 py-2 text-sm font-medium transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={BUSINESS.phoneHref}
              className="hidden items-center gap-2 rounded-lg px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wide text-primary-foreground transition hover:brightness-110 sm:inline-flex"
              style={{ background: "var(--gradient-crimson)" }}
            >
              <Phone className="size-4" /> Get Cash Offer
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-lg border border-border lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="glass border-t border-border/60 px-4 py-3 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
    </>
  );
}

export function MobileActionBar() {
  return (
    <div className="glass fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border/60 p-2 sm:hidden">
      <a
        href={BUSINESS.phoneHref}
        className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-display text-xs font-bold uppercase text-primary-foreground"
        style={{ background: "var(--gradient-crimson)" }}
      >
        <Phone className="size-4" /> Call Now
      </a>
      <a
        href="/#quote"
        className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-3 font-display text-xs font-bold uppercase text-foreground"
      >
        Get Quote
      </a>
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="glass fixed bottom-20 right-4 z-50 grid size-11 place-items-center rounded-full transition hover:shadow-[var(--shadow-glow)] sm:bottom-6"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/60 bg-card/30">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, white 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, white 10%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-extrabold uppercase">{BUSINESS.name}</p>
          <p className="mt-3 text-sm text-muted-foreground">{BUSINESS.tagline}</p>
          <a href={BUSINESS.phoneHref} className="mt-4 block font-display text-2xl font-extrabold text-primary">
            {BUSINESS.phone}
          </a>
          <p className="mt-2 text-sm text-muted-foreground">{BUSINESS.hours}</p>
          <p className="text-sm text-muted-foreground">{BUSINESS.area}</p>
        </div>
        <FooterCol
          title="Company"
          links={[
            { to: "/about", label: "About" },
            { to: "/how-it-works", label: "How It Works" },
            { to: "/what-we-buy", label: "What We Buy" },
            { to: "/blog", label: "Blog" },
          ]}
        />
        <FooterCol
          title="Support"
          links={[
            { to: "/faq", label: "FAQ" },
            { to: "/contact", label: "Contact" },
            { to: "/service-areas", label: "Service Areas" },
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            { to: "/privacy", label: "Privacy Policy" },
            { to: "/terms", label: "Terms & Conditions" },
          ]}
        />
      </div>
      <div className="relative border-t border-border/60 px-4 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BUSINESS.name}. Calgary, Alberta. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <p className="font-display text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-foreground/80 transition hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}