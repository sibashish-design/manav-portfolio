"use client";

import { useEffect } from "react";
import type { PortfolioProject } from "./portfolioData";

type QuickPlayModalProps = {
  project: PortfolioProject | null;
  onClose: () => void;
};

export default function QuickPlayModal({ project, onClose }: QuickPlayModalProps) {
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, project]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/82 px-4 py-6 backdrop-blur-xl sm:px-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} quick play`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl overflow-hidden border border-white/12 bg-[#080806] shadow-[0_30px_120px_rgba(0,0,0,0.72)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <div>
            <p className="text-[10px] uppercase tracking-cinema text-[#d7c39a]/82">{project.category} / Quick Play</p>
            <h3 className="mt-1 text-sm font-semibold uppercase tracking-[0.04em] text-[#f4efe5] sm:text-base">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center border border-white/12 text-xl leading-none text-[#f4efe5]/78 transition-colors duration-300 hover:border-[#d7c39a] hover:text-[#d7c39a]"
            onClick={onClose}
            aria-label="Close video"
          >
            x
          </button>
        </div>

        <div className="relative aspect-video bg-black">
          <video className="h-full w-full object-contain" controls autoPlay playsInline poster={project.poster}>
            <source src={project.video} type="video/mp4" />
          </video>
        </div>

        <div className="grid gap-4 px-4 py-5 sm:grid-cols-[1fr_0.35fr] sm:px-5">
          <p className="max-w-3xl text-sm font-light leading-7 text-[#f4efe5]/68">{project.description}</p>
          <p className="text-[10px] uppercase tracking-cinema text-[#f4efe5]/42 sm:text-right">
            {project.role} / {project.year}
          </p>
        </div>
      </div>
    </div>
  );
}
