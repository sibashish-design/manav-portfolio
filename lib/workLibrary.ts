import fs from "node:fs";
import path from "node:path";

export type WorkItem = {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  video: string;
  poster: string;
  format: "landscape" | "portrait" | "square";
};

export type WorkCategory = {
  name: string;
  slug: string;
  count: number;
  description: string;
  poster: string;
  featured: WorkItem[];
};

const optimizedRoot = path.join(process.cwd(), "public", "videos-optimized", "My Work");
const categoryDescriptions: Record<string, string> = {
  "artist": "Concert, artist, and stage-led films shaped around presence, sound, movement, and crowd emotion.",
  "club-djs": "Nightlife, DJ, and club edits with kinetic pacing, rich contrast, and social-first energy.",
  "events": "Event highlight films built for fast client review, atmosphere, and memorable recap storytelling.",
  "food-drinks": "Food, drink, and hospitality films focused on texture, appetite, product rhythm, and ambience.",
  "promotions": "Promotional reels for brands, services, launches, and campaigns that need immediate visual clarity.",
  "property-architecture": "Real estate, hotel, and architecture films with clean movement, space, light, and scale.",
  "wedding": "Wedding and pre-wedding films with cinematic pacing, emotional continuity, and elegant detail.",
  "younick-brand-video": "Brand-led product and identity films created with polished framing and premium presentation.",
};

const categoryNames: Record<string, string> = {
  "Club & Djs": "Club & DJs",
  "Food & Drinks": "Food & Drinks",
  "Property & Arct": "Property & Architecture",
  "Younick Brand video": "Younick Brand Video",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace("property-and-arct", "property-architecture")
    .replace("club-and-djs", "club-djs")
    .replace("food-and-drinks", "food-drinks");
}

function titleCase(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bDj\b/g, "DJ")
    .replace(/\bToni Guy\b/g, "Toni & Guy")
    .replace(/\bNd\b/g, "ND")
    .trim();
}

function duplicateKey(filePath: string) {
  const relative = path.relative(optimizedRoot, filePath).split(path.sep);
  const category = relative[0] ?? "";
  const title = path
    .basename(filePath)
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/\blogo\b/g, "")
    .replace(/\bfinal\b/g, "")
    .replace(/\bcopy\b/g, "")
    .replace(/\(\d+\)/g, "")
    .replace(/[_\-\s]+/g, " ")
    .trim();

  return `${category.toLowerCase()}::${title}`;
}

function toPublicUrl(filePath: string) {
  const relative = path.relative(path.join(process.cwd(), "public"), filePath).split(path.sep).join("/");
  return `/${relative.split("/").map(encodeURIComponent).join("/")}`;
}

function thumbnailFor(filePath: string) {
  const relative = path.relative(path.join(process.cwd(), "public", "videos-optimized"), filePath);
  const parsed = path.parse(relative);
  const thumbnailPath = path.join(process.cwd(), "public", "video-thumbnails", parsed.dir, `${parsed.name}.jpg`);
  return fs.existsSync(thumbnailPath) ? toPublicUrl(thumbnailPath) : "/images/hero-poster.svg";
}

function collectVideos(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectVideos(fullPath);
    return /\.(mp4|mov)$/i.test(entry.name) ? [fullPath] : [];
  });
}

export function getAllWorks(): WorkItem[] {
  const seen = new Set<string>();
  const uniqueVideos = collectVideos(optimizedRoot).filter((filePath) => {
    const key = duplicateKey(filePath);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return uniqueVideos.map((filePath, index) => {
    const relative = path.relative(optimizedRoot, filePath).split(path.sep);
    const rawCategory = relative[0] ?? "Selected Work";
    const category = categoryNames[rawCategory] ?? rawCategory;
    const categorySlug = slugify(category);
    const title = titleCase(path.basename(filePath));

    return {
      id: `${categorySlug}-${slugify(title)}-${index}`,
      title,
      category,
      categorySlug,
      video: toPublicUrl(filePath),
      poster: thumbnailFor(filePath),
      format: index % 5 === 0 ? "landscape" : index % 3 === 0 ? "square" : "portrait",
    };
  });
}

export function getWorkCategories(): WorkCategory[] {
  const works = getAllWorks();
  const grouped = works.reduce<Record<string, WorkItem[]>>((acc, work) => {
    acc[work.categorySlug] = [...(acc[work.categorySlug] ?? []), work];
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([slug, items]) => ({
      name: items[0].category,
      slug,
      count: items.length,
      description:
        categoryDescriptions[slug] ??
        "A curated collection of cinematic work across commercial, social, and client-facing formats.",
      poster: items[0].poster,
      featured: items.slice(0, 4),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getWorksByCategory(slug: string) {
  return getAllWorks().filter((work) => work.categorySlug === slug);
}
