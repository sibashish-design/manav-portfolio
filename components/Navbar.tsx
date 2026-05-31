"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const navLinks = [
  ["Works", "/works"],
  ["Reels", "/#reels"],
  ["Studio", "/#studio"],
  ["Contact", "/#contact"],
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { autoAlpha: 0, y: -26 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 },
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const ctx = gsap.context(() => {
      if (menuOpen) {
        gsap.fromTo(
          "[data-mobile-link]",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08, ease: "power3.out" },
        );
      }
    }, menuRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [menuOpen]);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 top-0 z-[3000] w-full px-5 py-5 text-[11px] uppercase tracking-cinema text-[#f4efe5]/80 transition-colors duration-500 sm:px-8 lg:px-12 ${
        scrolled || menuOpen ? "bg-[#050505]/94 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.32)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 font-semibold">
          <span className="h-2 w-2 rounded-full bg-[#d7c39a] shadow-[0_0_34px_rgba(215,195,154,0.7)] transition-transform duration-500 group-hover:scale-[1.8]" />
          <span className="font-futura text-[12px] tracking-[0.16em]">Manav Dabral</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(([label, href]) => {
            const sectionHash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
            const isActive = label === "Works" ? pathname.startsWith("/works") : pathname === "/" && hash === sectionHash;

            return (
            <Link
              key={label}
              href={href}
              className={`group relative py-2 transition-colors duration-300 hover:text-[#f4efe5] ${
                isActive ? "text-[#f4efe5]" : "text-[#f4efe5]/58"
              }`}
            >
              {label}
              <span
                className={`absolute bottom-0 left-0 h-px bg-[#d7c39a] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          )})}
        </div>

        <Link
          href="/#contact"
          className="hidden border border-[#f4efe5]/18 px-4 py-3 text-[#f4efe5] transition-colors duration-300 hover:border-[#d7c39a] hover:bg-[#d7c39a] hover:text-black md:inline-flex"
        >
          Book
        </Link>

        <button
          type="button"
          className="group relative z-[1100] grid h-11 w-11 place-items-center transition-colors duration-300 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-[#f4efe5] transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px bg-[#d7c39a] transition-all duration-300 ${
                menuOpen ? "w-0 opacity-0" : "w-5 opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 right-0 h-px w-5 bg-[#f4efe5] transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {mounted &&
        menuOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed inset-0 z-[2500] px-5 pb-6 pt-24 text-[11px] uppercase tracking-cinema text-[#f4efe5] md:hidden"
            style={{ background: "#050505" }}
          >
            <div className="absolute inset-0 bg-[#050505]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,195,154,0.08),transparent_28rem),linear-gradient(180deg,#050505_0%,#020202_100%)]" />
            <div className="absolute inset-x-5 top-20 h-px bg-gradient-to-r from-transparent via-[#d7c39a]/48 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-5">
              <div>
                {navLinks.map(([label, href], index) => {
                  const sectionHash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
                  const isActive =
                    label === "Works" ? pathname.startsWith("/works") : pathname === "/" && hash === sectionHash;

                  return (
                    <Link
                      key={label}
                      data-mobile-link
                      href={href}
                      className={`group flex items-end justify-between border-b py-3.5 ${
                        isActive ? "border-[#d7c39a]/55" : "border-white/12"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span
                        className={`text-[clamp(2.45rem,11vw,4rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] ${
                          isActive ? "text-[#d7c39a]" : "text-[#f4efe5]"
                        }`}
                      >
                        {label}
                      </span>
                      <span className="pb-2 text-[10px] uppercase tracking-cinema text-[#d7c39a]/76">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div data-mobile-link className="grid gap-4 border-t border-white/10 pt-5">
                <p className="max-w-xs text-xs font-light uppercase leading-5 tracking-[0.08em] text-[#f4efe5]/56">
                  Cinematic event films, reels, and story-led edits available for select productions.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center border border-[#d7c39a] bg-[#d7c39a] px-6 py-4 text-[11px] font-semibold uppercase tracking-cinema text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  Book Production
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </nav>
  );
}
