"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import QuickPlayModal from "./QuickPlayModal";
import type { WorkCategory, WorkItem } from "@/lib/workLibrary";
import type { PortfolioProject } from "./portfolioData";

function toProject(work: WorkItem): PortfolioProject {
  return {
    id: work.id,
    title: work.title,
    category: "Events",
    year: "2026",
    role: work.category,
    description: `A quick-play preview from Manav Dabral's ${work.category} portfolio.`,
    video: work.video,
    poster: work.poster,
  };
}

export function CategoryBento({ categories }: { categories: WorkCategory[] }) {
  return (
    <div className="grid grid-cols-2 auto-rows-[minmax(190px,auto)] gap-3 md:auto-rows-[minmax(260px,auto)] md:grid-cols-4 lg:gap-5">
      {categories.map((category, index) => (
        <Link
          key={category.slug}
          href={`/works/${category.slug}`}
          className={`group relative overflow-hidden border border-white/10 bg-[#0c0b09] p-4 transition-colors duration-500 hover:border-[#d7c39a]/60 sm:p-5 md:p-6 ${
            index === 0 ? "md:col-span-2 md:row-span-2" : index === 3 ? "md:col-span-2" : ""
          }`}
        >
          <Image
            src={category.poster}
            alt={`${category.name} poster`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/92 via-[#050505]/34 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-cinema text-[#d7c39a]/76">
              <span>{category.count} films</span>
              <span>View Category</span>
            </div>
            <div>
              <h2 className="max-w-[12ch] text-[clamp(1.35rem,7vw,3.9rem)] font-semibold uppercase leading-[0.96] tracking-[-0.04em]">
                {category.name}
              </h2>
              <p className="mt-3 max-w-xl overflow-hidden text-xs font-light leading-5 text-[#f4efe5]/62 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:text-sm sm:leading-6 md:mt-5 md:[-webkit-line-clamp:3]">
                {category.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function WorkGrid({ works }: { works: WorkItem[] }) {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 auto-rows-[190px] gap-3 sm:auto-rows-[230px] md:auto-rows-[260px] md:grid-cols-4 lg:gap-5">
        {works.map((work, index) => (
          <button
            key={work.id}
            type="button"
            className={`group relative overflow-hidden border border-white/10 bg-[#0c0b09] text-left transition-colors duration-500 hover:border-[#d7c39a]/60 ${
              index % 9 === 0
                ? "md:col-span-2 md:row-span-2"
                : index % 7 === 0
                  ? "md:col-span-2"
                  : work.format === "landscape"
                    ? "md:col-span-2"
                    : ""
            }`}
            onClick={() => setSelectedWork(work)}
          >
            <Image
              src={work.poster}
              alt={`${work.title} poster`}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-78"
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/82 via-[#050505]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="mb-3 text-[10px] uppercase tracking-cinema text-[#d7c39a]/76">{work.category}</p>
              <h3 className="text-xl font-semibold uppercase leading-[1.02] tracking-[-0.03em] sm:text-2xl">
                {work.title}
              </h3>
            </div>
          </button>
        ))}
      </div>
      <QuickPlayModal project={selectedWork ? toProject(selectedWork) : null} onClose={() => setSelectedWork(null)} />
    </>
  );
}
