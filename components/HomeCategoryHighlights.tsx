import Image from "next/image";
import Link from "next/link";
import { getWorkCategories } from "@/lib/workLibrary";

const preferred = ["events", "wedding", "food-drinks", "artist", "property-architecture"];

export default function HomeCategoryHighlights() {
  const categories = getWorkCategories()
    .sort((a, b) => preferred.indexOf(a.slug) - preferred.indexOf(b.slug))
    .filter((category) => preferred.includes(category.slug))
    .slice(0, 5);

  return (
    <section id="works" className="bg-[#050505] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1520px]">
        <div data-reveal className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-cinema text-[#d7c39a]/78">Selected Categories</p>
            <h2 className="max-w-5xl text-[clamp(2.8rem,6vw,7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em]">
              A broader body of cinematic work.
            </h2>
          </div>
          <p className="max-w-md text-lg font-light leading-8 text-[#f4efe5]/62">
            Events are one part of the work. Explore films across weddings, artists, food, architecture, hospitality,
            and brand-led productions.
          </p>
        </div>

        <div className="grid auto-rows-[220px] gap-4 md:grid-cols-5 lg:gap-5">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/works/${category.slug}`}
              className={`group relative overflow-hidden border border-white/10 bg-[#0c0b09] p-5 transition-colors duration-500 hover:border-[#d7c39a]/60 ${
                index === 0 ? "md:col-span-2 md:row-span-2" : index === 3 ? "md:col-span-2" : ""
              }`}
            >
              <Image
                src={category.poster}
                alt={`${category.name} work thumbnail`}
                fill
                sizes="(min-width: 1024px) 28vw, 100vw"
                className="object-cover opacity-78 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/28 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-cinema text-[#d7c39a]/76">
                  <span>{category.count} films</span>
                  <span>Open</span>
                </div>
                <div>
                  <h3 className="max-w-[13ch] text-[clamp(1.8rem,3.2vw,3.4rem)] font-semibold uppercase leading-[0.96] tracking-[-0.04em]">
                    {category.name}
                  </h3>
                  <p className="mt-4 max-w-sm overflow-hidden text-sm font-light leading-6 text-[#f4efe5]/62 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div data-reveal className="mt-10">
          <Link
            href="/works"
            className="inline-flex border border-[#d7c39a] px-7 py-4 text-[11px] font-semibold uppercase tracking-cinema text-[#d7c39a] transition-colors duration-300 hover:bg-[#d7c39a] hover:text-black"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
