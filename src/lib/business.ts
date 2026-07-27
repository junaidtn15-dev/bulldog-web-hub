export const BUSINESS = {
  name: "Bull Dog Junk Cars",
  tagline: "Cash for Junk Cars in Calgary — Fast Pickup. Instant Payment.",
  phone: "403-607-8563",
  phoneHref: "tel:+14036078563",
  hours: "9 AM – 9 PM, 7 days a week",
  area: "Calgary + 100 km radius",
  priceRange: "$250 – $20,000",
  years: "20+",
};

export type City = {
  slug: string;
  name: string;
  blurb: string;
  drive: string;
  faq: { q: string; a: string }[];
};

export const CITIES: City[] = [
  {
    slug: "calgary",
    name: "Calgary",
    blurb:
      "Our home base. From Beltline condos to Rocky Ridge driveways, we buy junk, scrap and damaged vehicles anywhere in Calgary with free same-day towing.",
    drive: "Same-day pickup across all quadrants",
    faq: [
      {
        q: "How fast is pickup in Calgary?",
        a: "Most Calgary pickups happen the same day you accept your offer, often within 2–4 hours during our 9 AM – 9 PM window.",
      },
      {
        q: "Do you buy cars from Calgary apartment parkades?",
        a: "Yes. Let us know the parkade access details when you book and our driver will arrange entry with building management.",
      },
    ],
  },
  {
    slug: "airdrie",
    name: "Airdrie",
    blurb:
      "We run the QEII corridor daily, so Airdrie sellers get the same top-dollar offers and free towing as Calgary customers.",
    drive: "20 minutes north of Calgary",
    faq: [
      {
        q: "Is towing still free in Airdrie?",
        a: "Yes — towing is always free, and it never comes out of your quoted offer.",
      },
      {
        q: "Can you pick up an Airdrie acreage vehicle?",
        a: "Absolutely. We handle rural driveways, fields and shops with flat deck and winch equipment.",
      },
    ],
  },
  {
    slug: "chestermere",
    name: "Chestermere",
    blurb:
      "Lakeside Chestermere pickups are quick and paperwork-light. Running or not, we pay cash on the spot.",
    drive: "15 minutes east of Calgary",
    faq: [
      {
        q: "Do you buy seasonal or stored vehicles in Chestermere?",
        a: "Yes, including cars that have sat for years, as long as you hold the registration or ownership document.",
      },
      { q: "Do I need to be home?", a: "An adult with the keys and paperwork needs to meet our driver." },
    ],
  },
  {
    slug: "okotoks",
    name: "Okotoks",
    blurb:
      "Okotoks and the Foothills are part of our daily route south of Calgary — fast quotes, instant payment, zero fees.",
    drive: "30 minutes south of Calgary",
    faq: [
      { q: "How much is my Okotoks truck worth?", a: "Trucks and SUVs often land in the higher end of our $250–$20,000 range because of weight and parts demand." },
      { q: "Do you buy fleet vehicles?", a: "Yes — we buy commercial vans and small fleets, with volume pricing." },
    ],
  },
  {
    slug: "olds",
    name: "Olds",
    blurb:
      "Olds sellers get the same instant valuation and free towing — we schedule northern runs several times a week.",
    drive: "80 minutes north of Calgary",
    faq: [
      { q: "Is Olds inside your service radius?", a: "Yes, Olds falls inside our roughly 100 km service radius from Calgary." },
      { q: "How do I get paid?", a: "Cash or e-transfer at the moment of pickup — before the vehicle is loaded." },
    ],
  },
  {
    slug: "cochrane",
    name: "Cochrane",
    blurb:
      "From Sunset Ridge to Bow Valley acreages, Cochrane junk cars are picked up free and paid for on the spot.",
    drive: "25 minutes northwest of Calgary",
    faq: [
      { q: "Do you buy winter-damaged vehicles?", a: "Yes. Rust, hail, collision and flood damage are all fine." },
      { q: "Can you tow from a rural road?", a: "Yes, our flat decks handle gravel and rural access." },
    ],
  },
  {
    slug: "crossfield",
    name: "Crossfield",
    blurb:
      "Crossfield is on our northern corridor, so pickups are usually scheduled within 24 hours of your accepted offer.",
    drive: "35 minutes north of Calgary",
    faq: [
      { q: "Do you buy farm trucks?", a: "We buy pickup trucks and commercial vans, but not tractors or heavy equipment." },
      { q: "What documents do I need?", a: "Registration or proof of ownership plus valid photo ID." },
    ],
  },
  {
    slug: "carseland",
    name: "Carseland",
    blurb:
      "Rural Carseland pickups are no problem — we bring the equipment to load non-running vehicles from anywhere on your property.",
    drive: "45 minutes east of Calgary",
    faq: [
      { q: "Will you come out for one vehicle?", a: "Yes, single-vehicle rural pickups are welcome at no charge." },
      { q: "Do you buy scrap-only cars?", a: "Yes — scrap value is calculated on weight and current Alberta metal prices." },
    ],
  },
  {
    slug: "banff",
    name: "Banff",
    blurb:
      "Mountain pickups in Banff and Canmore are arranged on scheduled runs with the same free towing and instant payment.",
    drive: "90 minutes west of Calgary",
    faq: [
      { q: "Do you service Banff National Park?", a: "Yes, with scheduled runs. Park access permits are handled by our driver." },
      { q: "Is there a mountain surcharge?", a: "No. Your quoted offer is the amount you receive." },
    ],
  },
];

export const FAQS = [
  { q: "Do you buy non-running cars?", a: "Yes. Running or not, wrecked, seized engine, missing parts — we buy vehicles in any condition and tow them free." },
  { q: "Do you offer free towing?", a: "Always. Towing is included on every purchase and is never deducted from your offer." },
  { q: "How fast is pickup?", a: "Most Calgary-area pickups happen same day. Outlying communities are usually scheduled within 24–48 hours." },
  { q: "Can I negotiate the offer?", a: "Our offers are based on real market and scrap data, but if you have documentation of new parts or value, tell us — we will re-evaluate." },
  { q: "Do you buy cars with liens?", a: "A lien must be discharged before ownership transfers. We can walk you through the Alberta process." },
  { q: "What documents are required?", a: "Registration or proof of ownership and valid government photo ID that matches the owner's name." },
  { q: "How is my vehicle valued?", a: "We weigh make, model, year, condition, curb weight, current scrap metal prices, and parts demand in Alberta." },
  { q: "What payment methods do you use?", a: "Cash or e-transfer, paid at pickup before the vehicle is loaded." },
  { q: "What happens after you buy my car?", a: "Vehicles are drained of fluids and recycled responsibly. Reusable parts are salvaged and metals are returned to the supply chain." },
];

export const WE_BUY = [
  "Cars & Sedans",
  "Hatchbacks & Coupes",
  "Convertibles",
  "SUVs & Crossovers",
  "Pickup Trucks",
  "Commercial Vans",
  "Fleet Vehicles",
  "Damaged & Scrap Cars",
  "Non-running Vehicles",
];

export const WE_DONT_BUY = ["Motorcycles", "RVs", "Boats", "Heavy Equipment", "Tractors"];