import HeroVideo from "@/components/HeroVideo";
import Showreel from "@/components/Showreel";
import AboutSection from "@/components/AboutSection";
import Contact from "@/components/Contact";
import CinematographerIntro from "@/components/CinematographerIntro";
import HomeCategoryHighlights from "@/components/HomeCategoryHighlights";
import SeoVideoSchema from "@/components/SeoVideoSchema";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-[#f4efe5]">
      <SeoVideoSchema />
      <HeroVideo />
      <CinematographerIntro />
      <HomeCategoryHighlights />
      <Showreel />
      <AboutSection />
      <Contact />
    </main>
  );
}
