export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  description: string;
  video: string;
  poster: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "event-highlight",
    title: "Day 3 Event Highlight",
    category: "Events",
    year: "2026",
    role: "Event Highlight",
    description: "A premium final-day event film built around scale, emotion, and closing-moment impact.",
    video: "/videos-featured/Day%203%20%20Event%20Highlight.mp4",
    poster: "/video-thumbnails/Day%203%20%20Event%20Highlight.jpg",
  },
  {
    id: "wedding-film",
    title: "Mitali and Anuj Cinematic",
    category: "Wedding",
    year: "2026",
    role: "Wedding Film",
    description: "A cinematic wedding story shaped around emotion, detail, family, and elegant pacing.",
    video: "/videos-optimized/My%20Work/Wedding/Mitali%20and%20Anuj%20Cinematic%20Final.mp4",
    poster: "/video-thumbnails/My%20Work/Wedding/Mitali%20and%20Anuj%20Cinematic%20Final.jpg",
  },
  {
    id: "artist-reel",
    title: "Vilen",
    category: "Artist",
    year: "2026",
    role: "Artist Reel",
    description: "A performance-led artist reel with stage energy, crowd movement, and cinematic concert texture.",
    video: "/videos-optimized/My%20Work/Artist/Vilen%2002.mp4",
    poster: "/video-thumbnails/My%20Work/Artist/Vilen%2002.jpg",
  },
  {
    id: "food-film",
    title: "Bourbon Food",
    category: "Food & Drinks",
    year: "2026",
    role: "Food Film",
    description: "A hospitality-focused food film built on texture, appetite, color, and product rhythm.",
    video: "/videos-optimized/My%20Work/Food%20%26%20Drinks/Bourbon%20Food00-%20A08.mp4",
    poster: "/video-thumbnails/My%20Work/Food%20%26%20Drinks/Bourbon%20Food00-%20A08.jpg",
  },
  {
    id: "property-film",
    title: "Real Estate All",
    category: "Property & Architecture",
    year: "2026",
    role: "Property Film",
    description: "A clean architecture and property walkthrough focused on space, light, materials, and movement.",
    video: "/videos-optimized/My%20Work/Property%20%26%20Arct/REAL%20ESTATE%20-%2010%20All.mp4",
    poster: "/video-thumbnails/My%20Work/Property%20%26%20Arct/REAL%20ESTATE%20-%2010%20All.jpg",
  },
  {
    id: "club-film",
    title: "Bourbon DJ Mariya",
    category: "Club & DJs",
    year: "2026",
    role: "Nightlife Reel",
    description: "A nightlife reel with kinetic cuts, club lighting, crowd movement, and DJ-led energy.",
    video: "/videos-optimized/My%20Work/Club%20%26%20Djs/Bourbon%20Dj%20Mariya%2000-%20A01.mp4",
    poster: "/video-thumbnails/My%20Work/Club%20%26%20Djs/Bourbon%20Dj%20Mariya%2000-%20A01.jpg",
  },
  {
    id: "promotion-film",
    title: "Toni & Guy",
    category: "Promotions",
    year: "2026",
    role: "Brand Promotion",
    description: "A polished promotional edit for a service-led brand with clean pacing and premium presentation.",
    video: "/videos-optimized/My%20Work/Promotions/Toni%20%26%20Guy%20Final%20005.mp4",
    poster: "/video-thumbnails/My%20Work/Promotions/Toni%20%26%20Guy%20Final%20005.jpg",
  },
  {
    id: "brand-film",
    title: "Younick Brand Video",
    category: "Brand",
    year: "2026",
    role: "Brand Film",
    description: "A brand-led film with polished framing, identity-driven rhythm, and strong visual recall.",
    video: "/videos-optimized/My%20Work/Younick%20Brand%20video/001.mp4",
    poster: "/video-thumbnails/My%20Work/Younick%20Brand%20video/001.jpg",
  },
  {
    id: "recap-film",
    title: "ASIAN Recap",
    category: "Recaps",
    year: "2026",
    role: "Recap Film",
    description: "A polished recap edit designed for fast client review, social momentum, and post-event storytelling.",
    video: "/videos-featured/ASIAN%20Recap.mp4",
    poster: "/video-thumbnails/ASIAN%20Recap.jpg",
  },
];

export const portfolioCategories = ["Events", "Wedding", "Artist", "Food & Drinks", "Property"] as const;
