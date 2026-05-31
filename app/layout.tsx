import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  metadataBase: new URL("https://manav-portfolio.vercel.app"),
  title: "Manav | Cinematic Videographer Portfolio",
  description:
    "Manav Dabral is a cinematographer and videographer in Dehradun, India, creating event films, wedding films, artist reels, brand videos, food films, and real estate video production.",
  keywords: [
    "Manav Dabral",
    "cinematographer in Dehradun",
    "videographer in Dehradun",
    "wedding filmmaker Dehradun",
    "event videographer India",
    "brand video production Dehradun",
    "artist reels India",
    "food videography",
    "real estate video production",
    "Uttarakhand cinematographer",
  ],
  openGraph: {
    title: "Manav Dabral | Cinematographer in Dehradun",
    description:
      "Cinematic event films, wedding films, brand videos, artist reels, food films, and real estate video production by Manav Dabral.",
    images: ["/images/manav.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <SmoothScroll />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
