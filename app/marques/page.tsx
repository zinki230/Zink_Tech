import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStoreBrands } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Les Grandes Marques Technologiques au Cameroun | Zink Tech",
  description:
    "Découvrez toutes les grandes marques disponibles chez Zink Tech : HP, Dell, Lenovo, Apple, Samsung, Xiaomi, Asus, Acer, MSI et plus encore.",
  keywords:
    "marques ordinateurs Cameroun, HP Dell Lenovo Apple, marques smartphones Samsung Xiaomi, marques technologie",
};

export default async function BrandsPage() {
  const brands = [
    {
      name: "HP",
      slug: "hp",
      logo: "/brands/hp.svg",
      description:
        "Leader mondial des PC et imprimantes. ProBook, EliteBook, Pavilion, OMEN Gaming.",
      categories: ["Ordinateurs Portables", "PC de Bureau", "Imprimantes", "Écrans"],
      productCount: 235,
      featured: true,
    },
    {
      name: "Dell",
      slug: "dell",
      logo: "/brands/dell.svg",
      description:
        "Innovation et performance. Latitude, XPS, Inspiron, OptiPlex, PowerEdge Servers.",
      categories: ["Ordinateurs Portables", "PC de Bureau", "Serveurs", "Écrans"],
      productCount: 198,
      featured: true,
    },
    {
      name: "Lenovo",
      slug: "lenovo",
      logo: "/brands/lenovo.svg",
      description:
        "Fiabilité légendaire. ThinkPad, IdeaPad, Legion Gaming, ThinkCentre.",
      categories: ["Ordinateurs Portables", "PC de Bureau", "Gaming", "Tablettes"],
      productCount: 187,
      featured: true,
    },
    {
      name: "Apple",
      slug: "apple",
      logo: "/brands/apple.svg",
      description:
        "Design et écosystème premium. MacBook Air, MacBook Pro, iMac, Mac Mini, iPad, iPhone.",
      categories: ["Ordinateurs Portables", "PC de Bureau", "Smartphones", "Tablettes"],
      productCount: 45,
      featured: true,
    },
    {
      name: "Asus",
      slug: "asus",
      logo: "/brands/asus.svg",
      description:
        "Innovation et gaming. VivoBook, ZenBook, ROG Gaming, TUF Gaming.",
      categories: ["Ordinateurs Portables", "Gaming", "Écrans", "Composants"],
      productCount: 156,
      featured: true,
    },
    {
      name: "Acer",
      slug: "acer",
      logo: "/brands/acer.svg",
      description:
        "Rapport qualité-prix. Aspire, Swift, Predator Gaming, Nitro.",
      categories: ["Ordinateurs Portables", "Gaming", "Écrans", "Projecteurs"],
      productCount: 89,
      featured: false,
    },
    {
      name: "MSI",
      slug: "msi",
      logo: "/brands/msi.svg",
      description:
        "Spécialiste gaming. MSI Gaming, Creator, Prestige, composants PC.",
      categories: ["Gaming", "Ordinateurs Portables", "Composants"],
      productCount: 67,
      featured: false,
    },
    {
      name: "Samsung",
      slug: "samsung",
      logo: "/brands/samsung.svg",
      description:
        "Leader smartphones et écrans. Galaxy S, Galaxy A, Galaxy Tab, Écrans professionnels.",
      categories: ["Smartphones", "Tablettes", "Écrans", "SSD"],
      productCount: 156,
      featured: true,
    },
    {
      name: "Xiaomi",
      slug: "xiaomi",
      logo: "/brands/xiaomi.svg",
      description:
        "Innovation accessible. Xiaomi, Redmi, POCO smartphones et accessoires.",
      categories: ["Smartphones", "Tablettes", "Accessoires"],
      productCount: 98,
      featured: true,
    },
    {
      name: "Tecno",
      slug: "tecno",
      logo: "/brands/tecno.svg",
      description:
        "Marque africaine leader. Phantom, Camon, Spark, Pop.",
      categories: ["Smartphones"],
      productCount: 134,
      featured: false,
    },
    {
      name: "Infinix",
      slug: "infinix",
      logo: "/brands/infinix.svg",
      description:
        "Performance et design. Note, Zero, Hot, Smart.",
      categories: ["Smartphones"],
      productCount: 112,
      featured: false,
    },
    {
      name: "Google",
      slug: "google",
      logo: "/brands/google.svg",
      description:
        "Android pur et IA. Google Pixel smartphones.",
      categories: ["Smartphones"],
      productCount: 23,
      featured: false,
    },
  ];

  const liveBrands = await getStoreBrands();
  const brandList = liveBrands !== null
    ? liveBrands.map((brand, index) => ({
        name: brand.name,
        slug: brand.slug,
        logo: brands.find((item) => item.slug === brand.slug)?.logo || `/brands/${brand.slug}.svg`,
        description: brand.description || `Découvrez les produits ${brand.name} proposés par Zink Tech.`,
        categories: [] as string[],
        productCount: 0,
        featured: brand.featured || index < 6,
      }))
    : brands;
  const featuredBrands = brandList.filter((brand) => brand.featured);
  const otherBrands = brandList.filter((brand) => !brand.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-zink-blue">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-gray-900">Marques</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-zink-blue/10 p-4">
              <Award className="h-12 w-12 text-zink-blue" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Les Grandes Marques</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Zink Tech travaille avec les leaders mondiaux de la technologie pour
            vous offrir les meilleurs produits au Cameroun.
          </p>
        </div>
      </div>

      {/* Featured Brands */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Marques Principales</h2>
            <p className="text-gray-600">
              Les marques les plus populaires disponibles chez Zink Tech
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredBrands.map((brand) => (
              <Link key={brand.slug} href={`/marques/${brand.slug}`}>
                <Card className="group h-full transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-16 w-36 items-center justify-start">
                        <Image src={brand.logo} alt={`Logo ${brand.name}`} width={144} height={64} className="max-h-14 w-auto max-w-36 object-contain" />
                      </div>
                      <ArrowRight className="h-6 w-6 text-gray-400 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="mb-4 text-gray-600">{brand.description}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {brand.categories.map((category, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm font-semibold text-zink-blue">
                      Demander les modèles disponibles
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Brands */}
      <section className="border-t bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Autres Marques</h2>
            <p className="text-gray-600">
              Découvrez toutes nos marques partenaires
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {otherBrands.map((brand) => (
              <Link key={brand.slug} href={`/marques/${brand.slug}`}>
                <Card className="group h-full transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-12 w-28 items-center justify-start">
                        <Image src={brand.logo} alt={`Logo ${brand.name}`} width={112} height={48} className="max-h-10 w-auto max-w-28 object-contain" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="mb-3 text-sm text-gray-600">
                      {brand.description}
                    </p>
                    <div className="text-xs font-semibold text-zink-blue">
                      Demander les modèles disponibles
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="border-zink-blue/20 bg-blue-50">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-2xl font-bold">
                Produits Authentiques & Garantis
              </h2>
              <p className="mb-6 text-gray-700">
                Contactez-nous pour connaître les modèles, les conditions de
                garantie et la disponibilité de la marque qui vous intéresse.
              </p>
              <Button variant="default" size="lg" asChild className="bg-zink-blue text-white hover:bg-[#102c68]">
                <Link href="/ordinateurs-portables">
                  Découvrir nos produits
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
