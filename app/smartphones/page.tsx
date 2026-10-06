import { Metadata } from "next";
import Link from "next/link";
import { Smartphone, SlidersHorizontal, ArrowRight, ChevronRight, BadgeCheck, Truck, MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, StaggerWrapper, StaggerItem } from "@/lib/animations";
import { getStoreProducts } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Smartphones au Cameroun - iPhone, Samsung, Xiaomi | Zink Tech",
  description:
    "Achetez les meilleurs smartphones au Cameroun. iPhone, Samsung Galaxy, Xiaomi, Tecno, Infinix et plus. Prix en FCFA, livraison à Douala et Yaoundé.",
  keywords:
    "smartphone Cameroun, iPhone Douala, Samsung Galaxy, Xiaomi, Tecno, Infinix, téléphone portable Yaoundé",
};

export default async function SmartphonesPage() {
  const products = [
    {
      id: "1", slug: "iphone-15-pro", name: "iPhone 15 Pro", brand: "Apple",
      price: 1299000, image: "/products/iphone-15-pro.jpg",
      rating: 4.9, reviewCount: 142, inStock: true,
      shortDescription: "A17 Pro, 256GB, Titane Noir, iOS 17",
    },
    {
      id: "2", slug: "samsung-galaxy-s24-ultra", name: "Galaxy S24 Ultra", brand: "Samsung",
      price: 1450000, image: "/products/samsung-s24-ultra.jpg",
      rating: 4.8, reviewCount: 98, inStock: true,
      shortDescription: "Snapdragon 8 Gen 3, 256GB, Titane Gris",
    },
    {
      id: "3", slug: "xiaomi-13t-pro", name: "13T Pro", brand: "Xiaomi",
      price: 549000, originalPrice: 649000, image: "/products/xiaomi-13t-pro.jpg",
      rating: 4.7, reviewCount: 156, inStock: true,
      shortDescription: "Dimensity 9200+, 12GB RAM, 256GB, 144Hz",
    },
    {
      id: "4", slug: "tecno-phantom-x2-pro", name: "Phantom X2 Pro", brand: "Tecno",
      price: 389000, image: "/products/tecno-phantom-x2-pro.jpg",
      rating: 4.5, reviewCount: 203, inStock: true,
      shortDescription: "Dimensity 9000, 12GB RAM, 256GB, Retractable Camera",
    },
    {
      id: "5", slug: "samsung-galaxy-a55", name: "Galaxy A55 5G", brand: "Samsung",
      price: 289900, originalPrice: 329900, image: "/products/samsung-a55.jpg",
      rating: 4.6, reviewCount: 187, inStock: true,
      shortDescription: "Exynos 1480, 8GB RAM, 256GB, 120Hz Super AMOLED",
    },
    {
      id: "6", slug: "infinix-note-40-pro", name: "Note 40 Pro", brand: "Infinix",
      price: 189900, image: "/products/infinix-note-40-pro.jpg",
      rating: 4.4, reviewCount: 312, inStock: true,
      shortDescription: "Dimensity 7020, 8GB RAM, 256GB, 108MP Camera",
    },
    {
      id: "7", slug: "google-pixel-8", name: "Pixel 8", brand: "Google",
      price: 799000, image: "/products/google-pixel-8.jpg",
      rating: 4.7, reviewCount: 89, inStock: true,
      shortDescription: "Tensor G3, 8GB RAM, 128GB, AI Photo Editing",
    },
    {
      id: "8", slug: "honor-magic-6-pro", name: "Magic 6 Pro", brand: "Honor",
      price: 945000, image: "/products/honor-magic-6-pro.jpg",
      rating: 4.6, reviewCount: 67, inStock: true,
      shortDescription: "Snapdragon 8 Gen 3, 12GB RAM, 512GB",
    },
  ];

  const brands = [
    { name: "Apple", count: 45 },
    { name: "Samsung", count: 156 },
    { name: "Xiaomi", count: 98 },
    { name: "Tecno", count: 134 },
    { name: "Infinix", count: 112 },
    { name: "Google", count: 23 },
    { name: "Honor", count: 45 },
    { name: "Realme", count: 67 },
  ];

  const priceRanges = [
    { label: "Moins de 100 000 FCFA", min: 0, max: 100000 },
    { label: "100 000 - 200 000 FCFA", min: 100000, max: 200000 },
    { label: "200 000 - 400 000 FCFA", min: 200000, max: 400000 },
    { label: "400 000 - 700 000 FCFA", min: 400000, max: 700000 },
    { label: "Plus de 700 000 FCFA", min: 700000, max: 999999999 },
  ];

  const liveProducts = await getStoreProducts({ categorySlug: "smartphones" });
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
              <span className="text-[#17201e] font-medium">Smartphones</span>
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
                <Smartphone className="h-7 w-7 text-[#289844]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-[-.04em] sm:text-4xl lg:text-5xl">
                  Smartphones
                </h1>
                <p className="mt-2 text-sm text-[#727873] max-w-2xl">
                  Les meilleurs smartphones des plus grandes marques. iPhone, Samsung, Xiaomi, Tecno, Infinix et plus. Prix et disponibilité confirmés avec notre équipe.
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

              {/* RAM */}
              <Card className="border-[#e4e4dc] rounded-2xl overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="mb-4 text-sm font-semibold text-[#17201e]">RAM</h3>
                  <div className="space-y-1">
                    {["4 GB", "6 GB", "8 GB", "12 GB", "16 GB+"].map((ram) => (
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

              {/* Storage */}
              <Card className="border-[#e4e4dc] rounded-2xl overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="mb-4 text-sm font-semibold text-[#17201e]">Stockage</h3>
                  <div className="space-y-1">
                    {["64 GB", "128 GB", "256 GB", "512 GB"].map((storage) => (
                      <label
                        key={storage}
                        className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition hover:bg-[#f0f5f0]"
                      >
                        <input type="checkbox" className="rounded accent-[#289844]" />
                        <span className="text-[#43534a]">{storage}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Network */}
              <Card className="border-[#e4e4dc] rounded-2xl overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="mb-4 text-sm font-semibold text-[#17201e]">Réseau</h3>
                  <div className="space-y-1">
                    {["5G", "4G LTE"].map((network) => (
                      <label
                        key={network}
                        className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition hover:bg-[#f0f5f0]"
                      >
                        <input type="checkbox" className="rounded accent-[#289844]" />
                        <span className="text-[#43534a]">{network}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* ─── Products Area ─── */}
          <div>
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

            <StaggerWrapper className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {displayProducts.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard {...product} />
                </StaggerItem>
              ))}
            </StaggerWrapper>

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
              <h2 className="text-xl font-semibold tracking-[-.03em]">Pourquoi acheter son smartphone chez Zink Tech ?</h2>
              <p className="mt-3 text-sm leading-6 text-[#68716a]">
                Zink Tech est votre spécialiste smartphones au Cameroun. Nous proposons les derniers modèles iPhone, Samsung Galaxy, Xiaomi, Tecno, Infinix et Google Pixel avec garantie officielle et support local. Tous nos smartphones sont débloqués, prêts à l&apos;emploi avec tous les opérateurs camerounais (MTN, Orange, Camtel). Configuration gratuite et transfert de données si besoin.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}