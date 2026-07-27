import { createFileRoute } from "@tanstack/react-router";
import { Banknote, Gauge, ScanLine } from "lucide-react";
import { PageHero, FinalCta } from "@/components/site/sections";
import { Reveal, TiltCard } from "@/components/site/fx";

const T = "How It Works | Sell Your Junk Car in 3 Steps | Bull Dog";
const D =
  "Selling a junk car in Calgary takes three steps with Bull Dog: submit vehicle details, receive a cash offer, get paid at free pickup.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:url", content: "/how-it-works" },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
  }),
  component: Page,
});

const STEPS = [
  {
    icon: ScanLine,
    title: "Enter Vehicle Details",
    text: "Tell us the make, model, year, VIN and condition. No inspection appointment, no yard visit, no obligation.",
    bullets: ["Takes about 60 seconds", "VIN optional but improves accuracy", "Photos welcome but never required"],
  },
  {
    icon: Gauge,
    title: "Receive Your Offer",
    text: "We evaluate curb weight, live Alberta scrap metal pricing, parts demand and market value, then call you with a firm number.",
    bullets: ["Offers from $250 to $20,000", "Firm quote, not an estimate range", "Valid for scheduling within days"],
  },
  {
    icon: Banknote,
    title: "Get Paid At Pickup",
    text: "Accept the offer, pick a time between 9 AM and 9 PM, and our driver arrives with your payment and handles the paperwork.",
    bullets: ["Cash or e-transfer", "Free towing, always", "Paid before the vehicle is loaded"],
  },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="From junk car to cash in three steps"
        sub="No haggling, no towing bill, no waiting around. Here is exactly what happens after you request an offer."
        breadcrumb={[{ to: "/", label: "Home" }, { to: "/how-it-works", label: "How It Works" }]}
      />
      <section className="mx-auto max-w-5xl space-y-6 px-4 pb-12 sm:px-6">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 100}>
            <TiltCard className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
              <div className="grid size-14 place-items-center rounded-2xl bg-primary/15 text-primary">
                <s.icon className="size-6" />
              </div>
              <div>
                <p className="font-display text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Step {i + 1}
                </p>
                <h2 className="mt-1 text-2xl">{s.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-success">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </section>
      <FinalCta />
    </>
  );
}