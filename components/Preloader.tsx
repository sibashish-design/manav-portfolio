"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const forcePreview = new URLSearchParams(window.location.search).has("preloader");
    const alreadySeen = sessionStorage.getItem("manav-preloader-seen") === "true";
    if (alreadySeen && !forcePreview) return;

    if (!forcePreview) {
      sessionStorage.setItem("manav-preloader-seen", "true");
    }
    document.body.classList.add("is-preloading");
    const timer = window.setTimeout(() => setVisible(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const siteShell = document.querySelector<HTMLElement>("[data-site-shell]");
    if (siteShell) {
      siteShell.style.opacity = "0";
      siteShell.style.filter = "blur(12px)";
      siteShell.style.transform = "scale(0.965)";
      siteShell.style.pointerEvents = "none";
    }

    document.body.style.overflow = "hidden";
    const revealTimer = window.setTimeout(() => {
      document.body.classList.remove("is-preloading");
      if (siteShell) {
        siteShell.style.opacity = "1";
        siteShell.style.filter = "blur(0px)";
        siteShell.style.transform = "scale(1)";
      }
    }, 1900);
    const doneTimer = window.setTimeout(() => {
      document.body.style.overflow = "";
      if (siteShell) {
        siteShell.style.pointerEvents = "";
        siteShell.style.opacity = "";
        siteShell.style.filter = "";
        siteShell.style.transform = "";
      }
      setVisible(false);
    }, 3250);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("is-preloading");
      if (siteShell) {
        siteShell.style.pointerEvents = "";
        siteShell.style.opacity = "";
        siteShell.style.filter = "";
        siteShell.style.transform = "";
      }
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div data-preloader className="fixed inset-0 z-[10000] overflow-hidden bg-[#050505] text-[#f4efe5]">
      <div data-lens-left className="absolute inset-y-0 left-0 w-1/2 bg-[#050505]" />
      <div data-lens-right className="absolute inset-y-0 right-0 w-1/2 bg-[#050505]" />
      <div data-split-line className="absolute left-1/2 top-0 z-20 h-full w-px origin-center scale-y-0 bg-[#f4efe5]/28" />

      <div className="absolute inset-0 z-30 grid place-items-center">
        <div data-lens className="camera-lens">
          <span className="camera-lens__ring camera-lens__ring--outer" />
          <span className="camera-lens__ring camera-lens__ring--middle" />
          <span className="camera-lens__ring camera-lens__ring--inner" />
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={index}
              data-aperture-line
              className="camera-lens__aperture"
              style={{ "--aperture-rotation": `${index * 60}deg` } as CSSProperties}
            />
          ))}
          <span data-lens-name className="relative z-10 font-futura text-2xl font-semibold uppercase tracking-[0.18em] text-[#f4efe5] sm:text-4xl">
            Manav
          </span>
        </div>
      </div>
    </div>
  );
}
