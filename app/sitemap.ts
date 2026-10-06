import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zinktech.cm";
  const paths = ["", "/ordinateurs-portables", "/smartphones", "/marques", "/marques/hp", "/marques/dell", "/marques/lenovo", "/marques/apple", "/marques/samsung", "/marques/xiaomi", "/entreprises"];
  return paths.map((path, index) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : path.startsWith("/marques/") ? 0.65 : 0.8,
  }));
}
