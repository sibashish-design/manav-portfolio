"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuickPlayModal from "./QuickPlayModal";
import { portfolioCategories, portfolioProjects, type PortfolioProject } from "./portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<(typeof portfolioCategories)[number]>("Events");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const visibleProjects = useMemo(
    () => portfolioProjects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-work-card]").forEach((card) => {
        gsap.fromTo(
          card.querySelector("[data-work-media]"),
          { clipPath: "inset(18% 0 18% 0)", scale: 1.08 },
          {
            clipPath: "inset(0% 0 0% 0)",
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 76%" },
          },
        );

        gsap.fromTo(
          card.querySelectorAll("[data-work-copy]"),
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 70%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section id="works" ref={sectionRef} className="relative bg-[#050505] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1520px]">
        <div data-reveal className="mb-20 grid gap-8 md:grid-cols-[0.72fr_1fr] md:items-end">
          <p className="text-[11px] uppercase tracking-cinema text-[#d7c39a]/80">Featured Projects</p>
          <h2 className="font-cinema max-w-5xl text-[clamp(2.8rem,6.4vw,7.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.035em]">
            Films with atmosphere, tension, and intent.
          </h2>
        </div>

        <div data-reveal className="mb-14 flex gap-2 overflow-x-auto border-y border-white/10 py-3">
          {portfolioCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`shrink-0 border px-5 py-3 text-[11px] uppercase tracking-cinema transition-colors duration-300 ${
                activeCategory === category
                  ? "border-[#d7c39a] bg-[#d7c39a] text-black"
                  : "border-white/12 text-[#f4efe5]/58 hover:border-[#d7c39a]/70 hover:text-[#f4efe5]"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
          <Link
            href="/works"
            className="ml-auto hidden shrink-0 border border-white/12 px-5 py-3 text-[11px] uppercase tracking-cinema text-[#f4efe5]/58 transition-colors duration-300 hover:border-[#d7c39a]/70 hover:text-[#f4efe5] sm:inline-flex"
          >
            All Works
          </Link>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {visibleProjects.map((work, index) => (
            <article key={work.title} data-work-card className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:col-start-7" : ""}`}>
                <button
                  type="button"
                  data-work-media
                  className="group relative block aspect-[4/5] w-full overflow-hidden bg-[#0b0b0d] text-left sm:aspect-[16/10] lg:aspect-[4/5]"
                  onClick={() => setSelectedProject(work)}
                  aria-label={`Play ${work.title}`}
                >
                  <Image
                    src={work.poster}
                    alt={`${work.title} visual still`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <video
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-85"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={work.poster}
                    onMouseEnter={(event) => void event.currentTarget.play()}
                    onMouseLeave={(event) => {
                      event.currentTarget.pause();
                      event.currentTarget.currentTime = 0;
                    }}
                  >
                    <source src={work.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/72 via-[#050505]/8 to-transparent" />
                  <span className="absolute bottom-5 right-5 border border-[#d7c39a]/70 bg-black/40 px-4 py-3 text-[10px] uppercase tracking-cinema text-[#d7c39a] backdrop-blur-md">
                    Quick Play
                  </span>
                </button>
              </div>

              <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8"}`}>
                <p data-work-copy className="mb-5 text-[11px] uppercase tracking-cinema text-[#d7c39a]/80">
                  {work.role} / {work.year}
                </p>
                <h3 data-work-copy className="font-cinema text-[clamp(2.5rem,5vw,6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.035em]">
                  {work.title}
                </h3>
                <p data-work-copy className="mt-8 max-w-xl text-lg font-light leading-8 text-[#f4efe5]/66">
                  {work.description}
                </p>
                <button
                  type="button"
                  data-work-copy
                  className="mt-8 border border-white/14 px-6 py-4 text-[11px] uppercase tracking-cinema text-[#f4efe5] transition-colors duration-300 hover:border-[#d7c39a] hover:bg-[#d7c39a] hover:text-black"
                  onClick={() => setSelectedProject(work)}
                >
                  Watch Project
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <QuickPlayModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
