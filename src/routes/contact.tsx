import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/sections";
import { QuoteForm } from "@/components/site/quote-form";
import { Reveal } from "@/components/site/fx";
import { BUSINESS } from "@/lib/business";

const T = "Contact Bull Dog Junk Cars | Call 403-607-8563";
const D =
  "Contact Bull Dog Junk Cars for a free cash offer on your junk car in Calgary. Open 9 AM–9 PM, 7 days a week. Call 403-607-8563 or request a quote online.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get your cash offer"
        sub="Call for the fastest answer, or submit your vehicle below and we'll call you back."
        breadcrumb={[{ to: "/", label: "Home" }, { to: "/contact", label: "Contact" }]}
      />
      <section id="quote" className="mx-auto grid max-w-6xl scroll-mt-24 gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Phone", value: BUSINESS.phone, href: BUSINESS.phoneHref },
              { icon: Clock, label: "Hours", value: BUSINESS.hours },
              { icon: MapPin, label: "Service area", value: BUSINESS.area },
            ].map((c) => (
              <div key={c.label} className="glass flex items-center gap-4 rounded-2xl p-5">
                <div className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
                  <c.icon className="size-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="font-display text-xl font-extrabold text-primary">
                      {c.value}
                    </a>
                  ) : (
                    <p className="font-display text-base font-bold">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <QuoteForm />
        </Reveal>
      </section>
    </>
  );
}