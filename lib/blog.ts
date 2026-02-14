import { remark } from "remark";
import html from "remark-html";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  content: string;
  publishedAt?: string;
};

type SourcePost = Omit<BlogPost, "content"> & {
  contentMarkdown: string;
};

const SOURCE_POSTS: SourcePost[] = [
  {
    slug: "critair-overview-cities-rules-and-visitor-essentials",
    title: "Crit’Air overview: cities, rules, and visitor essentials",
    excerpt:
      "France’s Crit’Air system regulates vehicle emissions in cities through low-emission zones (Zones à Faibles Émissions or ZFE). If you are driving into France from the UK or Germany.",
    tags: ["critair", "zfe", "uk-drivers", "german-drivers"],
    publishedAt: "2026-01-05",
    contentMarkdown: `France’s Crit’Air system regulates vehicle emissions in cities through low-emission zones (Zones à Faibles Émissions or ZFE). If you are driving into France from the UK or Germany, understanding how Crit’Air works is essential to avoid fines and entry restrictions.

## What is Crit’Air?

Crit’Air is a colour-coded emissions sticker required for driving in many French cities. It applies to:

- Cars
- Vans
- Motorhomes
- Motorbikes

Both French and foreign-registered vehicles must comply. UK and German number plates are not exempt.

## Where is Crit’Air required?

Crit’Air is mandatory in permanent low-emission zones in major cities including:

- Paris
- Lyon
- Marseille
- Toulouse
- Nice
- Strasbourg
- Montpellier
- Grenoble
- Rouen

Some cities also activate temporary restrictions during high pollution events.

## How restrictions work

Each vehicle receives a category from 0 to 5 based on:

- Fuel type
- Euro emissions standard
- First registration date

Cities restrict access based on these categories. Having a sticker does not automatically guarantee entry if your category is banned.

## What visitors must prepare

Before driving in France:

- Confirm your vehicle’s Crit’Air category
- Apply for your sticker in advance
- Allow time for delivery
- Display the sticker correctly on your windscreen

Fines can apply if you enter a ZFE without the correct category or without displaying a valid sticker.

For a step-by-step application guide, see: [How to order a Crit’Air sticker online].

Understanding the basics ensures stress-free travel and avoids unexpected penalties when entering French cities.`,
  },
  {
    slug: "what-is-a-critair-sticker",
    title: "What is a Crit’Air sticker?",
    excerpt:
      "If you are driving in France, you may need a Crit’Air sticker. This emissions certificate is required in many cities and is mandatory for both residents and international drivers.",
    tags: ["critair", "france-driving", "visitor-guide"],
    publishedAt: "2026-01-12",
    contentMarkdown: `If you are driving in France, you may need a Crit’Air sticker. This emissions certificate is required in many cities and is mandatory for both residents and international drivers.

## What does the sticker represent?

The Crit’Air vignette shows your vehicle’s environmental classification. Categories range from:

- Crit’Air 0 (electric and hydrogen vehicles)
- Crit’Air 1–5 (increasing emissions levels)
- Some older vehicles are ineligible

The classification depends on:

- Fuel type (petrol, diesel, hybrid)
- Euro emissions standard
- First registration date

## Why was Crit’Air introduced?

France introduced the system to reduce air pollution in urban areas. Major cities now operate low-emission zones where only approved categories can enter.

## Do UK and German drivers need one?

Yes. Foreign-registered vehicles must apply before entering restricted zones. Automatic number plate recognition does not replace the physical sticker.

## Where must it be displayed?

The sticker must be placed inside the windscreen, bottom right (passenger side). It must be clearly visible.

Without it, you risk fines even if your vehicle technically meets emissions requirements.

For guidance on choosing the right category, read: [How to pick your Crit’Air category].`,
  },
  {
    slug: "driving-in-france-with-critair-practical-tips",
    title: "Driving in France with Crit’Air: practical tips",
    excerpt:
      "Driving in France is straightforward once you understand how Crit’Air low-emission zones operate. Planning ahead avoids fines and unexpected detours.",
    tags: ["critair", "travel-tips", "road-trip"],
    publishedAt: "2026-01-19",
    contentMarkdown: `Driving in France is straightforward once you understand how Crit’Air low-emission zones operate. Planning ahead avoids fines and unexpected detours.

## Check your route

Many ZFE zones cover entire metropolitan areas, not just city centres. Always check:

- Whether your motorway passes through a ZFE
- Whether restrictions apply permanently or only during alerts

Paris, for example, enforces rules daily within the A86 ring road.

## Apply early

Delivery can take 7–14 days internationally. Apply well before departure to avoid driving without the sticker.

## Keep documents accessible

Carry:

- Vehicle registration document
- Application confirmation (if awaiting sticker)
- Valid insurance and licence

## Understand pollution alerts

Temporary restrictions may apply during high pollution days. These can tighten category allowances with little notice.

## Rental vehicles

If hiring in France, confirm the vehicle’s category before entering restricted zones.

Preparation reduces stress and ensures compliance during your road trip.`,
  },
  {
    slug: "how-to-order-a-critair-sticker-online",
    title: "How to order a Crit’Air sticker online",
    excerpt:
      "Ordering a Crit’Air sticker online is straightforward if you have the correct vehicle information ready.",
    tags: ["how-to", "application", "critair"],
    publishedAt: "2026-01-26",
    contentMarkdown: `Ordering a Crit’Air sticker online is straightforward if you have the correct vehicle information ready.

## Step 1: Gather documents

You will need:

- Vehicle registration certificate (V5C for UK drivers)
- Registration number
- Date of first registration
- Fuel type

German drivers should refer to Zulassungsbescheinigung documents.

## Step 2: Confirm your category

Your emissions category is calculated automatically based on your vehicle data.

## Step 3: Submit application and payment

Provide accurate information and complete secure payment online. Ensure your address is correct for delivery.

## Step 4: Wait for delivery

Stickers are posted to your home address. International shipping may take up to two weeks.

## Step 5: Display correctly

Affix the sticker inside the windscreen on the lower passenger side.

Applying in advance avoids last-minute issues before travel.`,
  },
  {
    slug: "how-to-pick-your-critair-category",
    title: "How to pick your Crit’Air category",
    excerpt:
      "Choosing the correct Crit’Air category is essential to avoid application errors and fines.",
    tags: ["critair-category", "application", "compliance"],
    publishedAt: "2026-02-02",
    contentMarkdown: `Choosing the correct Crit’Air category is essential to avoid application errors and fines.

## What determines your category?

Your category depends on:

- Euro emissions standard
- Fuel type
- First registration date

Diesel vehicles often receive higher category numbers than petrol equivalents.

## Common mistakes

- Guessing the category based on age alone
- Confusing petrol and diesel Euro standards
- Assuming UK or German registration affects classification

## Why accuracy matters

Incorrect category selection can:

- Invalidate your sticker
- Prevent entry into ZFE zones
- Result in penalties

If unsure, consult official emissions documentation or apply through a guided service.`,
  },
  {
    slug: "what-to-know-before-driving-into-paris",
    title: "What to know before driving into Paris",
    excerpt:
      "Paris enforces some of France’s strictest Crit’Air regulations. Understanding the rules before entering the capital is essential.",
    tags: ["paris", "critair", "zfe"],
    publishedAt: "2026-02-09",
    contentMarkdown: `Paris enforces some of France’s strictest Crit’Air regulations. Understanding the rules before entering the capital is essential.

## Paris ZFE coverage

The low-emission zone covers:

- Central Paris
- Surrounding suburbs within the A86

Restrictions apply every day.

## Vehicle bans

Older diesel vehicles are permanently banned. Some petrol vehicles below certain Euro standards are restricted.

## Visitor checklist

Before driving into Paris:

- Confirm your Crit’Air category
- Display your sticker
- Plan alternative parking if restricted

Fines are actively enforced. Preparation ensures smooth entry into the city.`,
  },
  {
    slug: "where-critair-is-required-in-2026",
    title: "Where Crit’Air is required in 2026",
    excerpt:
      "Crit’Air requirements continue expanding across France in 2026. More cities are implementing permanent low-emission zones to improve urban air quality.",
    tags: ["2026", "zfe", "city-rules", "critair"],
    publishedAt: "2026-02-16",
    contentMarkdown: `Crit’Air requirements continue expanding across France in 2026. More cities are implementing permanent low-emission zones to improve urban air quality.

## Cities requiring Crit’Air in 2026

Permanent ZFE zones now operate in major metropolitan areas including:

- Paris
- Lyon
- Marseille
- Toulouse
- Nice
- Strasbourg
- Montpellier
- Grenoble
- Rouen

Additional cities may implement restrictions as national environmental policy evolves.

## Permanent vs temporary zones

Permanent ZFE zones operate year-round. Temporary restrictions activate during high pollution episodes.

## For UK and German drivers

Foreign vehicles must:

- Display a valid Crit’Air sticker
- Meet permitted category requirements
- Monitor local restriction updates

Failure to comply may result in fines.

Before planning travel in 2026, confirm requirements for your destination city and apply early to ensure delivery before departure.`,
  },
];

async function markdownToHtml(markdown: string) {
  const processed = await remark().use(html).process(markdown);
  return processed.toString();
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(
    SOURCE_POSTS.map(async (post) => ({
      ...post,
      content: await markdownToHtml(post.contentMarkdown),
    }))
  );

  return posts.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = SOURCE_POSTS.find((item) => item.slug === slug);
  if (!post) return null;

  return {
    ...post,
    content: await markdownToHtml(post.contentMarkdown),
  };
}
