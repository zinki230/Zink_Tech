import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://zinktech.cm"),
  title: {
    default: "Zink Tech | Ordinateurs & smartphones au Cameroun",
    template: "%s | Zink Tech Cameroun",
  },
  description:
    "Votre partenaire technologique au Cameroun. Découvrez les meilleures marques d'ordinateurs portables, PC de bureau, smartphones et équipements IT. HP, Dell, Lenovo, Apple, Samsung et plus.",
  keywords: ["ordinateur portable Cameroun", "smartphone Yaoundé", "informatique Cameroun", "Zink Tech"],
  icons: { icon: "/brand/zink-tech-mark.png" },
  openGraph: {
    type: "website",
    locale: "fr_CM",
    url: "https://zinktech.cm",
    title: "Zink Tech - Technologie & Innovation au Cameroun",
    description:
      "Ordinateurs, smartphones et équipements technologiques des plus grandes marques",
    siteName: "Zink Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zink Tech - Technologie au Cameroun",
    description: "Ordinateurs, smartphones et équipements technologiques",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zink Tech",
    url: "https://zinktech.cm",
    email: "contact@zinktech.cm",
    telephone: "+237657413164",
    address: { "@type": "PostalAddress", addressLocality: "Yaoundé", addressCountry: "CM" },
    areaServed: { "@type": "Country", name: "Cameroun" },
    contactPoint: { "@type": "ContactPoint", telephone: "+237657413164", contactType: "customer service", availableLanguage: ["French"] },
  };
  return (
    <html lang="fr">
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
