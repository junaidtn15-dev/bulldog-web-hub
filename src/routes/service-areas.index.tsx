import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { PageHero, FinalCta } from "@/components/site/sections";
import { Reveal, TiltCard } from "@/components/site/fx";
import { CITIES } from "@/lib/business";

const T = "Service Areas | Junk Car Removal Calgary & Area | Bull Dog";
const D =
  "Bull Dog Junk Cars buys vehicles in Calgary, Airdrie, Chestermere, Okotoks, Olds, Cochrane, Crossfield, Carseland and Banff with free towing.";

export const Route = createFileRoute("/service-areas/")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:url", content: "/service-areas" },
    ],
    links: [{ rel: "canonical", href: "/service-areas" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="Serving Calgary and 100 km beyond"
        sub="Nine communities on our pickup routes, all with free towing and payment on the spot."
        breadcrumb={[{ to: "/", label: "Home" }, { to: "/service-areas", label: "Service Areas" }]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70}>
              <Link to="/service-areas/$city" params={{ city: c.slug }} className="block h-full">
                <TiltCard className="h-full">
                  <MapPin className="size-5 text-primary" />
                  <h2 className="mt-3 text-xl">Junk Car Removal in {c.name}</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.drive}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{c.blurb}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-primary">View {c.name} details →</span>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}