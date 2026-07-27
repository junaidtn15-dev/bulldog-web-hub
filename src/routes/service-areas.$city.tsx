import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageHero, FinalCta, Prose } from "@/components/site/sections";
import { QuoteForm } from "@/components/site/quote-form";
import { Reveal } from "@/components/site/fx";
import { BUSINESS, CITIES, type City } from "@/lib/business";

export const Route = createFileRoute("/service-areas/$city")({
  loader: ({ params }) => {
    const city = CITIES.find((c) => c.slug === params.city);
    if (!city) throw notFound();
    return { city };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service area not found" }, { name: "robots", content: "noindex" }] };
    }
    const name = loaderData.city.name;
    const title = `Cash for Junk Cars ${name} | Free Towing | Bull Dog`;
    const description = `Sell your junk, scrap or damaged car in ${name}. Bull Dog Junk Cars pays $250–$20,000 cash with free towing and same-day pickup. Call 403-607-8563.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/service-areas/${params.city}` },
      ],
      links: [{ rel: "canonical", href: `/service-areas/${params.city}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `Bull Dog Junk Cars — ${name}`,
            telephone: "+1-403-607-8563",
            priceRange: "$250 - $20,000",
            areaServed: { "@type": "City", name, addressRegion: "AB", addressCountry: "CA" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: loaderData.city.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: CityPage,
});

function CityPage() {
  const { city } = Route.useLoaderData() as { city: City };
  const others = CITIES.filter((c) => c.slug !== city.slug).slice(0, 5);

  return (
    <>
      <PageHero
        eyebrow={city.drive}
        title={`Cash For Junk Cars in ${city.name}`}
        sub={city.blurb}
        breadcrumb={[
          { to: "/", label: "Home" },
          { to: "/service-areas", label: "Service Areas" },
        ]}
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <Prose>
            <h2>Selling a junk car in {city.name}</h2>
            <p>
              {BUSINESS.name} has bought vehicles across southern Alberta for over 20 years, and {city.name} sellers
              get the exact same deal as our Calgary customers: a firm cash offer, free towing, and payment handed
              over before the vehicle is loaded. Offers typically land between {BUSINESS.priceRange} depending on
              make, model, year, condition and current scrap metal pricing.
            </p>
            <h3>What we buy in {city.name}</h3>
            <p>
              Cars, sedans, hatchbacks, coupes, convertibles, SUVs, pickup trucks, commercial vans, fleet vehicles,
              collision write-offs, scrap cars and non-running vehicles. We do not buy motorcycles, RVs, boats,
              tractors or heavy equipment.
            </p>
            <h3>{city.name} pickup and payment</h3>
            <p>
              Our dispatch window runs {BUSINESS.hours}. Once you accept an offer we schedule a pickup time that
              works for you, arrive with a flat deck or tow truck, complete the Alberta paperwork on site, and pay by
              cash or e-transfer immediately.
            </p>
            <h3>{city.name} questions</h3>
            {city.faq.map((f) => (
              <div key={f.q}>
                <p>
                  <strong>{f.q}</strong>
                </p>
                <p>{f.a}</p>
              </div>
            ))}
          </Prose>
        </Reveal>
        <Reveal delay={120}>
          <div className="lg:sticky lg:top-24">
            <QuoteForm compact />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-8 text-center sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Nearby service areas</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {others.map((c) => (
            <Link
              key={c.slug}
              to="/service-areas/$city"
              params={{ city: c.slug }}
              className="glass rounded-full px-4 py-2 text-sm transition hover:text-primary"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}