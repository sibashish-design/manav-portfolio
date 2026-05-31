"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("manav-preloader-seen") === "true";
    if (alreadySeen) return;

    sessionStorage.setItem("manav-preloader-seen", "true");
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        delay: 0.25,
        onComplete: () => {
          document.body.style.overflow = "";
          setVisible(false);
        },
      });

      timeline
        .fromTo("[data-lens-ring]", { scale: 0.74, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.9, ease: "power3.out" })
        .fromTo("[data-lens-name]", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.35")
        .to("[data-lens-blade]", { rotate: "+=42", scale: 0.28, duration: 0.85, stagger: 0.035, ease: "power4.inOut" }, "+=0.35")
        .to("[data-lens-name]", { autoAlpha: 0, letterSpacing: "0.45em", duration: 0.45, ease: "power2.inOut" }, "-=0.45")
        .to("[data-lens-left]", { xPercent: -102, duration: 0.85, ease: "power4.inOut" }, "-=0.12")
        .to("[data-lens-right]", { xPercent: 102, duration: 0.85, ease: "power4.inOut" }, "<")
        .to("[data-preloader]", { autoAlpha: 0, duration: 0.28, ease: "power2.out" }, "-=0.18");
    });

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div data-preloader className="fixed inset-0 z-[2000] overflow-hidden bg-[#050505] text-[#f4efe5]">
      <div data-lens-left className="absolute inset-y-0 left-0 w-1/2 bg-[#050505]" />
      <div data-lens-right className="absolute inset-y-0 right-0 w-1/2 bg-[#050505]" />

      <div className="absolute inset-0 grid place-items-center">
        <div data-lens-ring className="relative grid aspect-square w-[min(72vw,420px)] place-items-center rounded-full border border-[#d7c39a]/35 shadow-[0_0_90px_rgba(215,195,154,0.18)]">
          {Array.from({ length: 8 }).map((_, index) => (
            <span
              key={index}
              data-lens-blade
              className="lens-blade"
              style={{ transform: `rotate(${index * 45}deg)` }}
            />
          ))}
          <div className="absolute inset-[18%] rounded-full border border-white/12 bg-black/54" />
          <span data-lens-name className="relative z-10 font-futura text-2xl font-semibold uppercase tracking-[0.28em] text-[#f4efe5] sm:text-4xl">
            Manav
          </span>
        </div>
      </div>
    </div>
  );
}
