import { createFileRoute } from "@tanstack/react-router";
import { PageHero, FinalCta } from "@/components/site/sections";
import { Reveal } from "@/components/site/fx";
import { FAQS } from "@/lib/business";

const T = "Junk Car FAQ | Towing, Payment & Paperwork | Bull Dog";
const D =
  "Answers about selling a junk car in Calgary: free towing, pickup speed, liens, required documents, valuation and payment methods.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        sub="Everything Calgary sellers ask before booking a pickup."
        breadcrumb={[{ to: "/", label: "Home" }, { to: "/faq", label: "FAQ" }]}
      />
      <section className="mx-auto max-w-3xl space-y-3 px-4 pb-16 sm:px-6">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 50}>
            <details className="glass rounded-xl p-5 transition hover:shadow-[var(--shadow-glow)]">
              <summary className="cursor-pointer list-none font-display text-base font-bold">{f.q}</summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </section>
      <FinalCta />
    </>
  );
}