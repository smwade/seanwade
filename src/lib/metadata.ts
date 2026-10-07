import type { Metadata } from "next";

const siteUrl = "https://seanwade.com";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/sean-wade.jpeg",
): Metadata {
  const socialTitle = path === "/" ? title : `${title} | Sean Wade`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      title: socialTitle,
      description,
      url: `${siteUrl}${path}`,
      type: "website",
      images: [{ url: `${siteUrl}${image}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [`${siteUrl}${image}`],
    },
  };
}
