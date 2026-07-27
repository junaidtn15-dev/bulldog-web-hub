import { createFileRoute } from "@tanstack/react-router";
import { PageHero, FinalCta, Prose } from "@/components/site/sections";
import { Counter, Reveal } from "@/components/site/fx";
import { BUSINESS } from "@/lib/business";

const T = "About Bull Dog Junk Cars | 20+ Years in Calgary";
const D =
  "Bull Dog Junk Cars has bought and recycled vehicles across Calgary and southern Alberta for more than 20 years. Fair offers, free towing, responsible recycling.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Twenty years of paying Calgary fairly"
        sub="One tow truck, one promise: show up on time, pay what we quote, recycle responsibly."
        breadcrumb={[{ to: "/", label: "Home" }, { to: "/about", label: "About" }]}
      />
      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { v: <Counter to={20} suffix="+" />, l: "Years in business" },
            { v: <Counter to={12000} suffix="+" />, l: "Vehicles recycled" },
            { v: <Counter to={100} suffix="%" />, l: "Free towing" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 80}>
              <div className="glass rounded-2xl p-7 text-center">
                <p className="font-display text-4xl font-extrabold text-primary">{s.v}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Reveal>
        <Prose>
          <h2>Built in Calgary, for Calgary</h2>
          <p>
            {BUSINESS.name} started with a single flat deck and a phone number. Two decades later we still answer
            that phone ourselves, {BUSINESS.hours}, because the fastest way to get a fair price on a junk car is to
            talk to someone who actually buys them for a living.
          </p>
          <h2>Fair, transparent pricing</h2>
          <p>
            Every offer is calculated from real inputs: curb weight, live Alberta scrap metal pricing, salvageable
            parts demand, and the make, model and year of the vehicle. That's why offers range from{" "}
            {BUSINESS.priceRange} instead of a flat lowball rate. The number we quote is the number you are paid — no
            towing fee, no admin fee, no surprise deduction when the driver arrives.
          </p>
          <h2>Environmentally responsible recycling</h2>
          <p>
            End-of-life vehicles leak fuel, oil, coolant and refrigerants. Every vehicle we buy is drained and
            de-polluted before dismantling. Reusable components are salvaged and resold, and the remaining steel and
            aluminum re-enter the supply chain instead of a landfill or a back alley.
          </p>
          <h2>Where we work</h2>
          <p>
            Calgary is home, and our service radius reaches roughly 100 km in every direction — Airdrie,
            Chestermere, Okotoks, Olds, Cochrane, Crossfield, Carseland and Banff included.
          </p>
        </Prose>
      </Reveal>
      <FinalCta />
    </>
  );
}