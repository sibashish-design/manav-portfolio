"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuickPlayModal from "./QuickPlayModal";
import { portfolioProjects, type PortfolioProject } from "./portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const reels = useMemo(() => portfolioProjects.slice(0, 7), []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 48),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.05,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="reels" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#080806] py-24 lg:py-28">
      <div className="px-5 sm:px-8 lg:px-12">
        <div data-reveal className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-cinema text-[#d7c39a]/78">Horizontal Portfolio</p>
            <h2 className="font-cinema text-[clamp(3rem,7vw,8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.035em]">Showreel Index</h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-[#f4efe5]/58">
            Hover a frame to reveal motion. The pinned section turns vertical scroll into a cinematic horizontal pass.
          </p>
        </div>
      </div>

      <div ref={trackRef} className="mt-16 flex w-max gap-5 pl-5 pr-12 sm:pl-8 lg:mt-20 lg:gap-8 lg:pl-12">
        {reels.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className="group relative h-[62vh] w-[78vw] max-w-[520px] overflow-hidden border border-[#f4efe5]/10 bg-[#0b0b0d] text-left sm:w-[48vw] lg:w-[34vw]"
            onClick={() => setSelectedProject(project)}
            aria-label={`Quick play ${project.title}`}
          >
            <Image
              src={project.poster}
              alt={`${project.title} reel poster`}
              fill
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 48vw, 78vw"
              className="object-cover"
            />
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-85"
              muted
              loop
              playsInline
              preload="metadata"
              poster={project.poster}
              onMouseEnter={(event) => void event.currentTarget.play()}
              onMouseLeave={(event) => {
                event.currentTarget.pause();
                event.currentTarget.currentTime = 0;
              }}
            >
              <source src={project.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/82 via-[#050505]/8 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="mb-4 text-[11px] uppercase tracking-cinema text-[#d7c39a]/78">
                {String(index + 1).padStart(2, "0")} / {project.category}
              </p>
              <h3 className="font-cinema text-5xl font-semibold uppercase leading-none tracking-[-0.03em] sm:text-6xl">
                {project.title}
              </h3>
              <p className="mt-4 text-sm uppercase tracking-cinema text-[#f4efe5]/56">{project.role}</p>
            </div>
          </button>
        ))}
      </div>
      <QuickPlayModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
