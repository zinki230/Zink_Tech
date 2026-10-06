import { Metadata } from "next";
import Link from "next/link";
import { Laptop, SlidersHorizontal, ArrowRight, ChevronRight, Star, BadgeCheck, Truck, MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, StaggerWrapper, StaggerItem } from "@/lib/animations";
import { getStoreProducts } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Ordinateurs Portables au Cameroun - HP, Dell, Lenovo | Zink Tech",
  description:
    "Découvrez notre sélection d'ordinateurs portables des meilleures marques. HP ProBook, Dell Latitude, Lenovo ThinkPad, MacBook et plus. Livraison à Douala et Yaoundé.",
  keywords:
    "ordinateur portable Cameroun, laptop Douala, HP ProBook, Dell Latitude, Lenovo ThinkPad, MacBook Air",
};

export default async function LaptopsPage() {
  const products = [
    {
      id: "1", slug: "hp-probook-450-g10", name: "ProBook 450 G10", brand: "HP",
      price: 749900, originalPrice: 849900, image: "/products/hp-probook-450.jpg",
      rating: 4.8, reviewCount: 24, inStock: true,
      shortDescription: "Intel Core i5-1335U, 16GB RAM, 512GB SSD, 15.6\" FHD",
    },
    {
      id: "2", slug: "lenovo-thinkpad-e14-gen-5", name: "ThinkPad E14 Gen 5", brand: "Lenovo",
      price: 899000, image: "/products/lenovo-thinkpad-e14.jpg",
      rating: 4.9, reviewCount: 18, inStock: true,
      shortDescription: "Intel Core i7-1355U, 16GB RAM, 512GB SSD, 14\" FHD",
    },
    {
      id: "3", slug: "dell-latitude-3420", name: "Latitude 3420", brand: "Dell",
      price: 675000, originalPrice: 750000, image: "/products/dell-latitude-3420.jpg",
      rating: 4.7, reviewCount: 31, inStock: true,
      shortDescription: "Intel Core i5-1135G7, 8GB RAM, 256GB SSD, 14\" FHD",
    },
    {
      id: "4", slug: "macbook-air-m2", name: "MacBook Air M2", brand: "Apple",
      price: 1450000, image: "/products/macbook-air-m2.jpg",
      rating: 4.9, reviewCount: 56, inStock: true,
      shortDescription: "Apple M2, 8GB RAM, 256GB SSD, 13.6\" Liquid Retina",
    },
    {
      id: "5", slug: "asus-vivobook-15", name: "VivoBook 15 OLED", brand: "Asus",
      price: 589000, image: "/products/asus-vivobook-15.jpg",
      rating: 4.6, reviewCount: 42, inStock: true,
      shortDescription: "Intel Core i5-13500H, 8GB RAM, 512GB SSD, 15.6\" OLED",
    },
    {
      id: "6", slug: "hp-elitebook-840-g9", name: "EliteBook 840 G9", brand: "HP",
      price: 1250000, originalPrice: 1350000, image: "/products/hp-elitebook-840.jpg",
      rating: 4.9, reviewCount: 15, inStock: true,
      shortDescription: "Intel Core i7-1265U, 16GB RAM, 512GB SSD, 14\" FHD",
    },
    {
      id: "7", slug: "lenovo-ideapad-3", name: "IdeaPad 3 15", brand: "Lenovo",
      price: 425000, image: "/products/lenovo-ideapad-3.jpg",
      rating: 4.4, reviewCount: 67, inStock: true,
      shortDescription: "AMD Ryzen 5 5500U, 8GB RAM, 256GB SSD, 15.6\" FHD",
    },
    {
      id: "8", slug: "dell-xps-13-plus", name: "XPS 13 Plus", brand: "Dell",
      price: 1899000, image: "/products/dell-xps-13-plus.jpg",
      rating: 4.8, reviewCount: 28, inStock: true,
      shortDescription: "Intel Core i7-1360P, 16GB RAM, 512GB SSD, 13.4\" FHD+",
    },
  ];

  const categories = [
    { name: "Tous", count: 700, active: true },
    { name: "Étudiant", count: 245 },
    { name: "Professionnel", count: 320 },
    { name: "Entreprise", count: 180 },
    { name: "Développeur", count: 95 },
  ];

  const brands = [
    { name: "HP", count: 235 },
    { name: "Dell", count: 198 },
    { name: "Lenovo", count: 187 },
    { name: "Apple", count: 45 },
    { name: "Asus", count: 156 },
    { name: "Acer", count: 89 },
    { name: "MSI", count: 67 },
  ];

  const priceRanges = [
    { label: "Moins de 400 000 FCFA", min: 0, max: 400000 },
    { label: "400 000 - 700 000 FCFA", min: 400000, max: 700000 },
    { label: "700 000 - 1 000 000 FCFA", min: 700000, max: 1000000 },
    { label: "1 000 000 - 1 500 000 FCFA", min: 1000000, max: 1500000 },
    { label: "Plus de 1 500 000 FCFA", min: 1500000, max: 999999999 },
  ];

  const liveProducts = await getStoreProducts({ categorySlug: "ordinateurs-portables" });
  const displayProducts = liveProducts ?? products;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#17201e]">
      {/* ─── Breadcrumb ─── */}
      <ScrollReveal>
        <div className="border-b border-[#e8e7e1] bg-white py-3">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
            <div className="flex items-center gap-2 text-xs text-[#727873]">
              <Link href="/" className="hover:text-[#289844] transition">Accueil</Link>
              <ChevronRight size={12} />
              <span className="text-[#17201e] font-medium">Ordinateurs Portables</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ─── Header ─── */}
      <ScrollReveal>
        <div className="bg-white border-b border-[#e8e7e1]">
          <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef6ef]">
                <Laptop className="h-7 w-7 text-[#289844]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-[-.04em] sm:text-4xl lg:text-5xl">
                  Ordinateurs Portables
                </h1>
                <p className="mt-2 text-sm text-[#727873] max-w-2xl">
                  Des modèles des grandes marques, sélectionnés pour vous. Prix et disponibilité confirmés avec notre équipe sur WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ─── Main Layout ─── */}
      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-14 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
          {/* ─── Sidebar ─── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              {/* Categories */}
              <Card className="border-[#e4e4dc] rounded-2xl overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="mb-4 text-sm font-semibold text-[#17201e]">Catégories</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                          category.active
                            ? "bg-[#289844]/10 text-[#289844] font-semibold"
                            : "text-[#43534a] hover:bg-[#f0f5f0]"
                        }`}
                      >
                        <span>{category.name}</span>
                        <Badge variant={category.active ? "default" : "outline"} className="text-[10px] px-2 py-0.5">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Brands */}
              <Card className="border-[#e4e4dc] rounded-2xl overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="mb-4 text-sm font-semibold text-[#17201e]">Marques</h3>
                  <div className="space-y-1">
                    {brands.map((brand) => (
                      <label
                        key={brand.name}
                        className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition hover:bg-[#f0f5f0]"
                      >
                        <div className="flex items-center gap-2.5">
                          <input type="checkbox" className="rounded accent-[#289844]" />
                          <span className="text-[#43534a]">{brand.name}</span>
                        </div>
                        <span className="text-xs text-[#9ca39b]">{brand.count}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Price */}
              <Card className="border-[#e4e4dc] rounded-2xl overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="mb-4 text-sm font-semibold text-[#17201e]">Prix</h3>
                  <div className="space-y-1">
                    {priceRanges.map((range, index) => (
                      <label
                        key={index}
                        className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition hover:bg-[#f0f5f0]"
                      >
                        <input type="radio" name="price" className="accent-[#289844]" />
                        <span className="text-[#43534a]">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Processor */}
              <Card className="border-[#e4e4dc] rounded-2xl overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="mb-4 text-sm font-semibold text-[#17201e]">Processeur</h3>
                  <div className="space-y-1">
                    {["Intel Core i5", "Intel Core i7", "AMD Ryzen 5", "AMD Ryzen 7", "Apple M1/M2"].map((cpu) => (
                      <label
                        key={cpu}
                        className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition hover:bg-[#f0f5f0]"
                      >
                        <input type="checkbox" className="rounded accent-[#289844]" />
                        <span className="text-[#43534a]">{cpu}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* RAM */}
              <Card className="border-[#e4e4dc] rounded-2xl overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="mb-4 text-sm font-semibold text-[#17201e]">RAM</h3>
                  <div className="space-y-1">
                    {["8 GB", "16 GB", "32 GB"].map((ram) => (
                      <label
                        key={ram}
                        className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition hover:bg-[#f0f5f0]"
                      >
                        <input type="checkbox" className="rounded accent-[#289844]" />
                        <span className="text-[#43534a]">{ram}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* ─── Products Area ─── */}
          <div>
            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-[#727873]">
                <strong className="text-[#17201e]">{displayProducts.length}</strong> modèles présentés
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="lg:hidden border-[#e4e4dc] rounded-full">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtres
                </Button>
                <select className="rounded-xl border border-[#e4e4dc] bg-white px-3 py-2 text-sm text-[#43534a] outline-none focus:border-[#54b948]">
                  <option>Pertinence</option>
                  <option>Prix croissant</option>
                  <option>Prix décroissant</option>
                  <option>Nouveautés</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <StaggerWrapper className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {displayProducts.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard {...product} />
                </StaggerItem>
              ))}
            </StaggerWrapper>

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled className="border-[#e4e4dc] rounded-full">Précédent</Button>
                <Button variant="default" size="sm" className="rounded-full bg-[#289844] hover:bg-[#207c3b]">1</Button>
                <Button variant="outline" size="sm" className="border-[#e4e4dc] rounded-full">2</Button>
                <Button variant="outline" size="sm" className="border-[#e4e4dc] rounded-full">3</Button>
                <Button variant="outline" size="sm" className="border-[#e4e4dc] rounded-full">Suivant</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Trust Bar ─── */}
      <ScrollReveal>
        <div className="border-t border-[#e8e7e1] bg-white py-10">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-[#727873]">
              <span className="inline-flex items-center gap-2"><BadgeCheck size={16} className="text-[#289844]" /> Conseils personnalisés</span>
              <span className="inline-flex items-center gap-2"><Truck size={16} className="text-[#289844]" /> Livraison au Cameroun</span>
              <span className="inline-flex items-center gap-2"><MessageCircle size={16} className="text-[#289844]" /> Commande WhatsApp</span>
              <Link href="/marques" className="inline-flex items-center gap-1 font-semibold text-[#289844] hover:underline">
                Voir toutes les marques <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ─── SEO Section ─── */}
      <ScrollReveal>
        <div className="border-t border-[#e8e7e1] bg-[#f7f7f2] py-12">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold tracking-[-.03em]">Acheter un ordinateur portable au Cameroun</h2>
              <p className="mt-3 text-sm leading-6 text-[#68716a]">
                Zink Tech vous propose une sélection d&apos;ordinateurs portables des meilleures marques au Cameroun. Que vous recherchiez un laptop pour étudiant, un PC professionnel pour votre entreprise, ou un ultrabook haute performance, notre équipe vous aide à choisir le modèle adapté à votre usage et à votre budget. Livraison à Douala, Yaoundé et partout au Cameroun.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}