import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkGrid } from "@/components/WorksBento";
import { getWorkCategories, getWorksByCategory } from "@/lib/workLibrary";

export function generateStaticParams() {
  return getWorkCategories().map((category) => ({ category: category.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categories = getWorkCategories();
  const current = categories.find((item) => item.slug === category);
  const works = getWorksByCategory(category);

  if (!current || works.length === 0) notFound();

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f4efe5] sm:px-8 lg:px-12">
      <section className="mx-auto max-w-[1520px]">
        <Link href="/works" className="mb-8 inline-flex text-[11px] uppercase tracking-cinema text-[#d7c39a]/78">
          Back to categories
        </Link>
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-cinema text-[#d7c39a]/78">
              {current.count} selected films
            </p>
            <h1 className="text-[clamp(4rem,12vw,12rem)] font-semibold uppercase leading-[0.82] tracking-[-0.05em]">
              {current.name}
            </h1>
          </div>
          <p className="max-w-lg text-lg font-light leading-8 text-[#f4efe5]/62">{current.description}</p>
        </div>
        <WorkGrid works={works} />
      </section>
    </main>
  );
}
