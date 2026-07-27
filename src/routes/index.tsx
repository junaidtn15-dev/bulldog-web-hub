import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeDollarSign,
  Banknote,
  Car,
  Clock,
  Gauge,
  Recycle,
  ScanLine,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import { Aurora, Counter, Marquee, Reveal, SectionHeading, TiltCard } from "@/components/site/fx";
import { ScannerHero } from "@/components/site/scanner-hero";
import { QuoteForm } from "@/components/site/quote-form";
import { CtaPair, FinalCta, TrustBadges } from "@/components/site/sections";
import { BulldogLogo } from "@/components/site/logo";
import { ValueCalculator } from "@/components/site/value-calculator";
import { XrayTeardown } from "@/components/site/xray-teardown";
import { LoadTheTruck } from "@/components/site/load-the-truck";
import { BUSINESS, CITIES, FAQS, WE_BUY, WE_DONT_BUY } from "@/lib/business";

const TITLE = "Cash for Junk Cars Calgary | Bull Dog Junk Cars";
const DESC =
  "Bull Dog Junk Cars pays $250–$20,000 cash for junk, scrap and damaged cars in Calgary. Free towing, paid on pickup, open 9 AM–9 PM daily. Call 403-607-8563.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.slice(0, 6).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const BENEFITS = [
  { icon: Truck, title: "Free Towing", text: "Every pickup is free, city or acreage. Never deducted from your offer." },
  { icon: Wrench, title: "Any Condition", text: "Wrecked, seized, rusted or missing parts — we still buy it." },
  { icon: BadgeDollarSign, title: "Top Dollar", text: "Live scrap and parts pricing means offers up to $20,000." },
  { icon: Banknote, title: "Instant Payment", text: "Cash or e-transfer handed over before the car is loaded." },
  { icon: ShieldCheck, title: "20+ Years Experience", text: "Two decades buying vehicles across southern Alberta." },
  { icon: Clock, title: "No Hidden Fees", text: "The number we quote is the number you are paid. Period." },
];

const STEPS = [
  { icon: ScanLine, title: "Enter Vehicle Details", text: "Make, model, year, VIN and condition. Sixty seconds, no obligation." },
  { icon: Gauge, title: "Receive Your Offer", text: "We evaluate weight, market demand and live Alberta scrap prices." },
  { icon: Banknote, title: "Get Paid", text: "Accept, schedule pickup, and get paid on the spot when we arrive." },
];

const TESTIMONIALS = [
  { name: "Jordan M.", city: "Calgary NE", text: "Called at 10 AM, car was gone and cash in hand by 2 PM. Offer was higher than two other yards." },
  { name: "Priya S.", city: "Airdrie", text: "The old van hadn't run in three years. They winched it out of the yard and paid exactly what they quoted." },
  { name: "Dale R.", city: "Cochrane", text: "Zero pressure, no hidden towing fee, and the driver handled all the paperwork for me." },
  { name: "Amanda T.", city: "Okotoks", text: "Best experience selling a write-off. Straight answers and instant e-transfer." },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <Aurora />
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div style={{ animation: "riseIn 0.8s ease-out both" }}>
            <div className="mb-6 flex items-center gap-4">
              <BulldogLogo className="size-20 sm:size-24" spin priority />
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.4em] text-primary">Bull Dog</p>
                <p className="font-display text-xl font-extrabold uppercase tracking-tight text-chrome sm:text-2xl">
                  Junk Cars
                </p>
              </div>
            </div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-success" /> Open now · {BUSINESS.hours}
            </p>
            <h1 className="text-balance text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
              <span className="text-chrome">Get Cash For Your</span>{" "}
              <span className="text-gradient">Junk Car</span> Today
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-muted-foreground sm:text-lg">
              {BUSINESS.name} pays top dollar for unwanted vehicles across Calgary and surrounding communities.
              Free towing. Instant payment. No hidden fees. Running or not.
            </p>
            <CtaPair className="mt-8" />
            <TrustBadges className="mt-6" />
          </div>
          <div className="relative">
            <ScannerHero />
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "20+ Years Experience",
          "Free Towing",
          "Paid On Pickup",
          "Top Cash Offers",
          "No Hidden Fees",
          "Same Day Pickup",
          "Serving Calgary",
        ]}
      />

      {/* QUOTE PANEL */}
      <section className="relative overflow-hidden py-24">
        <Aurora />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="X-ray teardown"
              title="Scan your car. Watch the money appear."
              sub="Drag the scanner lens across the vehicle to reveal what's underneath, then tap each glowing component to see exactly where your payout comes from."
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <XrayTeardown />
          </Reveal>
        </div>
      </section>

      {/* PICKUP SIMULATOR */}
      <section className="relative overflow-hidden py-24">
        <Aurora />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Pickup simulator"
              title="Drag your car onto our flatbed"
              sub="Load it up and watch the cash come out — then see how Bull Dog's offer stacks against every other quote in the city."
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <LoadTheTruck />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <Aurora />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Calculator"
              title="See what your car is worth in 10 seconds"
              sub="Pick your vehicle type, condition and year — the estimator does the rest, no email required."
            />
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                "Live estimate based on type, age, condition and completeness",
                "Real offers range from $250 to $20,000",
                "Zero obligation — the number is yours to keep",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="text-primary">▸</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <ValueCalculator />
          </Reveal>
        </div>
      </section>

      <section id="quote" className="relative scroll-mt-24 overflow-hidden py-24">
        <Aurora />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Control panel</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Your vehicle, valued in minutes</h2>
            <p className="mt-4 text-muted-foreground">
              Submit your vehicle details and a Bull Dog specialist calls you back with a firm cash offer based on
              real market data — not a lowball guess. Offers range from {BUSINESS.priceRange} depending on make,
              model, year, condition and current metal prices.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {["No obligation, no fees to request an offer", "We buy running and non-running vehicles", "Pickup across Calgary + 100 km"].map(
                (t) => (
                  <li key={t} className="flex gap-3">
                    <span className="text-primary">▸</span>
                    {t}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Three steps from junk to cash" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <TiltCard className="h-full">
                  <span className="font-display text-5xl font-extrabold text-primary/25">0{i + 1}</span>
                  <s.icon className="mt-2 size-7 text-primary" />
                  <h3 className="mt-4 text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="relative overflow-hidden py-24">
        <Aurora />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Why Bull Dog" title="Built to be the easiest sale you'll ever make" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <TiltCard className="h-full">
                  <div className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
                    <b.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUY */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="What we buy"
              title="Nine vehicle categories, one flat answer: yes"
              sub="If it has four wheels and a title, Bull Dog will make you an offer."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WE_BUY.map((v, i) => (
              <Reveal key={v} delay={i * 60}>
                <TiltCard className="flex h-full items-center gap-4">
                  <Car className="size-6 shrink-0 text-primary" />
                  <span className="font-display text-base font-bold">{v}</span>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="glass mx-auto mt-10 max-w-3xl rounded-2xl p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Vehicles we don't buy
              </p>
              <p className="mt-3 font-display text-lg font-bold">{WE_DONT_BUY.join(" · ")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUE */}
      <section className="relative overflow-hidden py-24">
        <Aurora />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Valuation"
              title="How much is your vehicle worth?"
              sub="Offers depend on make, model, year, condition, curb weight, current scrap metal prices and parts demand across Alberta."
            />
            <div className="glass mx-auto mt-10 flex max-w-2xl flex-col items-center gap-2 rounded-2xl p-10">
              <p className="font-display text-5xl font-extrabold text-primary sm:text-6xl">
                <Counter to={250} prefix="$" /> – <Counter to={20000} prefix="$" />
              </p>
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Typical offer range</p>
            </div>
            <CtaPair className="mt-8 justify-center" />
          </Reveal>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Service areas"
              title="Calgary plus 100 kilometres in every direction"
              sub="Nine communities on our daily and scheduled routes — all with the same free towing."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal>
              <div className="glass relative aspect-square overflow-hidden rounded-2xl p-6">
                <div
                  className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
                  style={{ boxShadow: "inset 0 0 60px color-mix(in oklab, var(--primary) 25%, transparent)" }}
                />
                <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[var(--shadow-glow)]" />
                {CITIES.map((c, i) => {
                  const angle = (i / CITIES.length) * Math.PI * 2;
                  const r = c.slug === "calgary" ? 0 : 34;
                  return (
                    <Link
                      key={c.slug}
                      to="/service-areas/$city"
                      params={{ city: c.slug }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card/70 px-2.5 py-1 text-[11px] font-semibold transition hover:border-primary hover:text-primary"
                      style={{
                        left: `${50 + Math.cos(angle) * r}%`,
                        top: `${50 + Math.sin(angle) * r}%`,
                        animation: `floaty ${5 + i * 0.3}s ease-in-out infinite`,
                      }}
                    >
                      {c.name}
                    </Link>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CITIES.map((c) => (
                  <Link
                    key={c.slug}
                    to="/service-areas/$city"
                    params={{ city: c.slug }}
                    className="glass rounded-xl px-4 py-3 text-sm font-semibold transition hover:shadow-[var(--shadow-glow)]"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative overflow-hidden py-20">
        <Aurora />
        <div className="relative mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            { value: <Counter to={20} suffix="+" />, label: "Years in business" },
            { value: <Counter to={12000} suffix="+" />, label: "Vehicles purchased" },
            { value: <Counter to={100} suffix="%" />, label: "Free towing" },
            { value: <>9AM–9PM</>, label: "Open daily" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="glass rounded-2xl p-7 text-center">
                <p className="font-display text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Reviews" title="Calgary sellers say it best" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <TiltCard className="h-full">
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">“{t.text}”</p>
                  <p className="mt-4 font-display text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.city}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden py-24">
        <Aurora />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Answers before you call" />
          </Reveal>
          <div className="mt-10 space-y-3">
            {FAQS.slice(0, 6).map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="glass group rounded-xl p-5 transition hover:shadow-[var(--shadow-glow)]">
                  <summary className="cursor-pointer list-none font-display text-base font-bold">{f.q}</summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/faq" className="text-sm font-semibold text-primary hover:underline">
              See all frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <Recycle className="mx-auto size-8 text-success" />
            <h2 className="mt-4 text-3xl">Recycling Calgary's vehicles for 20+ years</h2>
            <p className="mt-4 text-muted-foreground">
              Bull Dog Junk Cars began as a single tow truck and a promise: pay fairly, show up on time, and recycle
              responsibly. Two decades later, thousands of Alberta vehicles have been drained, dismantled and
              returned to the metal supply chain instead of leaking into the ground.
            </p>
            <Link to="/about" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
              Read our story →
            </Link>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
