export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zinktech.cm";
  const content = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /panier\nDisallow: /commande-whatsapp\nDisallow: /recherche\nSitemap: ${baseUrl}/sitemap.xml\n`;
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
