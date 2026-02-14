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
    slug: "where-critair-sticker-required",
    title: "Where Crit’Air is required in 2025",
    excerpt:
      "A practical city-by-city overview of French low-emission zones (ZFE) and how to avoid fines.",
    tags: ["critair", "zfe", "france-driving"],
    publishedAt: "2025-01-08",
    contentMarkdown: `## Quick answer

If you drive into **French low-emission zones (ZFE-m)**, you should assume a Crit’Air sticker is required.

## Major cities visitors ask about

### Paris
Paris and the wider metropolitan area enforce some of the most visible restrictions, with controls that can tighten during pollution episodes.

### Lyon
Lyon applies ZFE restrictions across key urban sectors. Drivers should verify the latest rules before entering central routes.

### Grenoble
Grenoble has long-running low-emission controls and is frequently cited for active enforcement.

### Other metros with active or evolving rules
Strasbourg, Toulouse, Montpellier, Nice, and Reims have implemented, expanded, or announced low-emission controls.

## GEO/SEO travel checklist

- Check your exact destination postcode, not only the city name.
- Re-check rules 24–48 hours before travel (especially in winter/summer pollution peaks).
- Keep proof of application/payment while your physical sticker is in transit.

## FAQ

**Do all roads in France require Crit’Air?**  
No. Requirements are focused on designated low-emission zones and temporary pollution-control measures.

**Can rules change during my trip?**  
Yes. Temporary restrictions can be activated during pollution events.`,
  },
  {
    slug: "paris-driving-2025",
    title: "What to know before driving into Paris",
    excerpt:
      "Your visitor-friendly checklist for entering Paris with the right Crit’Air category and documents.",
    tags: ["paris", "critair", "visitor-guide"],
    publishedAt: "2025-01-15",
    contentMarkdown: `## Paris driving essentials

Paris is one of the most common destinations where visitors are checked for Crit’Air compliance.

### Before you go

1. Confirm your vehicle category eligibility.
2. Make sure your registration details match your application exactly.
3. Save digital proof of your application and payment confirmation.

### During your trip

- Avoid assuming hotel parking is outside restricted zones.
- Build extra time for route changes if access controls are active.
- Monitor local alerts if air-quality restrictions tighten.

## FAQ

**Can I enter central Paris without a sticker if I am a tourist?**  
Tourist status does not exempt vehicles from low-emission rules.

**Is a temporary PDF confirmation useful?**  
Yes, it can help show that your application has been submitted while waiting for physical delivery.`,
  },
  {
    slug: "critair-sticker-categories",
    title: "How to pick your Crit’Air category",
    excerpt:
      "Understand category numbers, fuel types, and registration dates so you avoid application mistakes.",
    tags: ["critair-categories", "vehicle-classification"],
    publishedAt: "2025-01-22",
    contentMarkdown: `## Why categories matter

Your Crit’Air category determines where and when you can drive in restricted zones.

## Inputs that affect classification

- Vehicle type (car, van, motorcycle, etc.)
- Fuel/energy type
- First registration date

## Common mistakes to avoid

- Entering the wrong first registration date format.
- Uploading unreadable registration scans.
- Mixing up model year with registration date.

## FAQ

**Can two similar cars get different categories?**  
Yes. Fuel type and registration date can create different outcomes.

**Can I change details after payment?**  
If you contact support quickly, corrections may be possible before submission.`,
  },
  {
    slug: "how-to-order-critair-sticker",
    title: "How to order a Crit’Air sticker online",
    excerpt:
      "A step-by-step guide to completing your form, uploading documents, and paying securely.",
    tags: ["apply", "how-to", "checklist"],
    publishedAt: "2025-01-29",
    contentMarkdown: `## Step-by-step process

### Step 1: Vehicle details
Enter registration number, country, vehicle type, and fuel type exactly as shown on your documents.

### Step 2: Upload document
Provide a clear registration document (PDF/JPG/PNG).

### Step 3: Contact + payment
Use a valid email for updates, then complete secure checkout.

## After payment

You should receive confirmation and then submission updates by email.

## FAQ

**What file types are accepted?**  
PDF, JPG, and PNG.

**How long does the form take?**  
Most applicants complete it in a few minutes when documents are ready.`,
  },
  {
    slug: "driving-tips-critair-france",
    title: "Driving in France with Crit’Air: practical tips",
    excerpt:
      "Route planning, city access, and document best practices for stress-free driving in France.",
    tags: ["travel-tips", "france-roadtrip", "critair"],
    publishedAt: "2025-02-05",
    contentMarkdown: `## Practical planning tips

- Plan city entries before you leave the motorway.
- Keep a digital copy of registration and confirmation emails.
- Check parking locations: many are inside restricted urban zones.

## On-the-road risk reduction

- Avoid last-minute city-center detours.
- Re-check local restrictions for weekends and holiday periods.
- Keep support contact details handy in case you need a quick correction.

## FAQ

**Do motorways require Crit’Air?**  
Rules are usually focused on designated urban zones, not every motorway segment.

**Should I print confirmations?**  
Keeping both digital and printed proof is a sensible backup while traveling.`,
  },
  {
    slug: "what-is-critair-sticker",
    title: "What is a Crit’Air sticker?",
    excerpt:
      "A plain-English explanation of France’s emissions sticker system for UK and international drivers.",
    tags: ["basics", "critair", "first-time-drivers"],
    publishedAt: "2025-02-12",
    contentMarkdown: `## Crit’Air explained

Crit’Air is France’s emissions classification sticker used to control vehicle access in low-emission areas.

## Who needs it?

French and foreign-registered vehicles can both be affected when entering controlled zones.

## Why it matters

Without the correct sticker, drivers risk fines and access restrictions.

## FAQ

**Is Crit’Air only for diesel vehicles?**  
No. It applies across multiple vehicle and fuel types.

**Do I need one for short trips?**  
If your route enters a restricted zone, yes—even for short visits.`,
  },
  {
    slug: "critair-overview",
    title: "Crit’Air overview: cities, rules, and visitor essentials",
    excerpt:
      "An at-a-glance overview of how Crit’Air rules work across France and what travelers should prepare.",
    tags: ["overview", "zfe", "visitor-guide"],
    publishedAt: "2025-02-18",
    contentMarkdown: `## 60-second overview

Crit’Air rules are tied to low-emission zones and can vary by city and by temporary pollution controls.

## What travelers should prepare

- Vehicle registration details
- Correct classification inputs
- Proof of application/payment
- A route plan that accounts for restricted areas

## Best-practice reminder

Treat Crit’Air as part of trip planning, not an afterthought at the city boundary.

## FAQ

**Are rules the same in every city?**  
No. Local authorities can define and update zone boundaries and enforcement windows.

**Can restrictions be temporary?**  
Yes. Pollution episodes can trigger additional temporary measures.`,
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
