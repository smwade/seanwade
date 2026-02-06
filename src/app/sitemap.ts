import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const BASE_URL = "https://seanwade.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogEntries = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/projects`, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, lastModified: new Date() },
    ...blogEntries,
  ];
}
