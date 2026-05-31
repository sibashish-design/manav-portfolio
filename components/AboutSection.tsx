export default function AboutSection() {
  const stats = [
    ["01", "End-to-end production"],
    ["4K", "Delivery-ready edits"],
    ["24h", "Fast event turnarounds"],
  ];

  return (
    <section id="studio" className="bg-[#050505] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1520px] gap-14 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-5">
          <p className="mb-6 text-[11px] uppercase tracking-cinema text-[#d7c39a]/78">Studio Method</p>
          <h2 className="font-cinema text-[clamp(2.9rem,6.4vw,7.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.035em]">
            Crafted like cinema. Built for modern attention.
          </h2>
        </div>

        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <p className="text-xl font-light leading-9 text-[#f4efe5]/72 sm:text-2xl sm:leading-10">
            I shape films around rhythm, light, and emotional clarity. From event highlights to campaign edits, every
            shot is designed to feel premium, sharp, and memorable.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden border border-[#f4efe5]/10 bg-[#f4efe5]/10 sm:grid-cols-3">
            {stats.map(([value, label]) => (
              <div key={label} className="bg-[#050505] p-7">
                <p className="font-cinema text-6xl font-semibold leading-none tracking-[-0.04em] text-[#d7c39a]">{value}</p>
                <p className="mt-3 text-xs uppercase tracking-cinema text-[#f4efe5]/48">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
