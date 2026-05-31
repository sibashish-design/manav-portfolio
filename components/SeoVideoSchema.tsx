import { portfolioProjects } from "./portfolioData";

const siteUrl = "https://manav-portfolio.vercel.app";

export default function SeoVideoSchema() {
  const videos = portfolioProjects.slice(0, 6).map((project) => ({
    "@type": "VideoObject",
    name: `${project.title} by Manav Dabral`,
    description: `${project.description} Cinematography, event films, brand videos, wedding films, artist reels, and commercial video production by Manav Dabral in Dehradun, Uttarakhand, India.`,
    thumbnailUrl: [`${siteUrl}${project.poster}`],
    uploadDate: "2026-06-01",
    contentUrl: `${siteUrl}${project.video}`,
    creator: {
      "@type": "Person",
      name: "Manav Dabral",
      jobTitle: "Cinematographer and Video Editor",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dehradun",
        addressRegion: "Uttarakhand",
        addressCountry: "IN",
      },
    },
    keywords:
      "cinematographer in Dehradun, videographer in Dehradun, wedding filmmaker Dehradun, event videographer India, brand video production, artist reels, food videography, real estate video",
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Manav Dabral",
        jobTitle: "Cinematographer, Videographer and Video Editor",
        url: siteUrl,
        image: `${siteUrl}/images/manav.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dehradun",
          addressRegion: "Uttarakhand",
          addressCountry: "IN",
        },
        knowsAbout: [
          "Cinematography",
          "Event videography",
          "Wedding films",
          "Brand films",
          "Artist reels",
          "Food and drinks videography",
          "Real estate video production",
        ],
      },
      ...videos,
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
