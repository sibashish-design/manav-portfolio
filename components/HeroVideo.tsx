"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroVideo = "/videos-featured/Day%203%20%20Event%20Highlight.mp4";

export default function HeroVideo() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });

      intro
        .from("[data-hero-line]", {
          yPercent: 112,
          duration: 1.35,
          stagger: 0.12,
          delay: 0.2,
        })
        .from("[data-hero-meta]", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.08 }, "-=0.55")
        .from("[data-hero-rule]", { scaleX: 0, duration: 1, transformOrigin: "left" }, "-=0.58");

      gsap.to("[data-hero-video]", {
        scale: 1.12,
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-screen items-end overflow-hidden px-5 pb-10 sm:px-8 lg:px-12 lg:pb-14">
      <div data-hero-video className="absolute inset-0 video-fallback">
        <video
          className="h-full w-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline
          poster="/video-thumbnails/Day%203%20%20Event%20Highlight.jpg"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.2)_0%,rgba(5,5,5,0.18)_38%,rgba(5,5,5,0.96)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

      <div className="relative z-10 grid w-full gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
        <div>
          <p data-hero-meta className="mb-6 text-[11px] uppercase tracking-cinema text-[#d7c39a]/88">
            Cinematographer / Editor / Motion Storyteller
          </p>
          <h1 className="font-cinema text-[clamp(4.1rem,14vw,13.5rem)] font-semibold uppercase leading-[0.8] tracking-[-0.04em]">
            <span className="block overflow-hidden pb-2">
              <span data-hero-line className="block">Cinema</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-hero-line className="block">In Motion</span>
            </span>
          </h1>
        </div>

        <div className="max-w-md lg:pb-5">
          <div data-hero-rule className="mb-6 h-px w-full bg-[#f4efe5]/24" />
          <p data-hero-meta className="text-balance text-lg font-light leading-8 text-[#f4efe5]/74 sm:text-xl">
            Premium visual stories for brands, events, artists, and founders who need every frame to feel intentional.
          </p>
        </div>
      </div>
    </section>
  );
}
