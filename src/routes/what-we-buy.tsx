import { createFileRoute } from "@tanstack/react-router";
import { Car, XCircle } from "lucide-react";
import { PageHero, FinalCta } from "@/components/site/sections";
import { Reveal, TiltCard, SectionHeading } from "@/components/site/fx";
import { WE_BUY, WE_DONT_BUY } from "@/lib/business";

const T = "What We Buy | Junk Cars, Trucks, SUVs & Vans | Bull Dog";
const D =
  "Bull Dog Junk Cars buys cars, SUVs, pickup trucks, commercial vans, fleet vehicles, scrap and non-running vehicles in Calgary. Any condition, free towing.";

export const Route = createFileRoute("/what-we-buy")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:url", content: "/what-we-buy" },
    ],
    links: [{ rel: "canonical", href: "/what-we-buy" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Inventory"
        title="Every vehicle we buy for cash"
        sub="Running or not, insured or written off, one car or a whole fleet — if it has four wheels and paperwork, we will make an offer."
        breadcrumb={[{ to: "/", label: "Home" }, { to: "/what-we-buy", label: "What We Buy" }]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WE_BUY.map((v, i) => (
            <Reveal key={v} delay={i * 60}>
              <TiltCard className="flex h-full items-center gap-4">
                <Car className="size-6 shrink-0 text-primary" />
                <span className="font-display text-base font-bold">{v}</span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Out of scope"
            title="Vehicles we don't buy"
            sub="We stay focused on passenger and light commercial vehicles so we can pay the strongest prices on them."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-5">
            {WE_DONT_BUY.map((v) => (
              <div key={v} className="glass flex items-center gap-2 rounded-xl px-4 py-3 text-sm">
                <XCircle className="size-4 text-muted-foreground" />
                {v}
              </div>
            ))}
          </div>
        </Reveal>
      </section>
      <FinalCta />
    </>
  );
}