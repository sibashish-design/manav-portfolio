"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CinematographerIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-intro-image]",
        { autoAlpha: 0, y: 70, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        },
      );

      gsap.fromTo(
        "[data-intro-line]",
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 62%" },
        },
      );

      gsap.fromTo(
        "[data-intro-copy]",
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 58%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050505] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1520px] gap-10 lg:grid-cols-12 lg:items-end">
        <div data-intro-image className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#0c0b09] lg:col-span-4">
          <Image src="/images/manav.png" alt="Manav Dabral" fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/36 via-transparent to-transparent" />
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p data-intro-copy className="mb-6 text-[11px] uppercase tracking-cinema text-[#d7c39a]/78">
            Manav Dabral / Cinematographer
          </p>
          <h2 className="text-[clamp(3rem,7.5vw,8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.045em]">
            {["I chase the", "moment before", "it disappears."].map((line) => (
              <span key={line} className="block overflow-hidden pb-1">
                <span data-intro-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <div className="mt-10 grid gap-7 md:grid-cols-2">
            <p data-intro-copy className="text-lg font-light leading-8 text-[#f4efe5]/68">
              I am Manav Dabral, a cinematographer and editor building films around rhythm, emotion, and the kind of
              visual detail people remember after the screen goes dark.
            </p>
            <p data-intro-copy className="text-lg font-light leading-8 text-[#f4efe5]/56">
              My work moves through events, artists, weddings, food, architecture, and brand stories, but the obsession
              stays the same: make every frame feel deliberate, alive, and worth watching again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
