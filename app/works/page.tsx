import { CategoryBento } from "@/components/WorksBento";
import { getWorkCategories } from "@/lib/workLibrary";

export default function WorksPage() {
  const categories = getWorkCategories();

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f4efe5] sm:px-8 lg:px-12">
      <section className="mx-auto max-w-[1520px]">
        <p className="mb-6 text-[11px] uppercase tracking-cinema text-[#d7c39a]/78">My Works</p>
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <h1 className="text-[clamp(4rem,12vw,12rem)] font-semibold uppercase leading-[0.82] tracking-[-0.05em]">
            Select a category.
          </h1>
          <p className="max-w-lg text-lg font-light leading-8 text-[#f4efe5]/62">
            Each collection opens into only that body of work, so clients can review the exact style they came for.
          </p>
        </div>
        <CategoryBento categories={categories} />
      </section>
    </main>
  );
}
