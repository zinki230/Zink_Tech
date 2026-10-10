import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Smartphone } from "lucide-react";
import { CatalogueBrowser } from "@/components/catalogue-browser";
import { getStoreProducts } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Smartphones au Cameroun - iPhone, Samsung, Xiaomi | Zink Tech",
  description: "Achetez les meilleurs smartphones au Cameroun. iPhone, Samsung Galaxy, Xiaomi, Tecno, Infinix et plus. Prix en FCFA, livraison à Yaoundé.",
  keywords: "smartphone Cameroun, iPhone Yaoundé, Samsung Galaxy, Xiaomi, Tecno, Infinix, téléphone portable Yaoundé",
};

export default async function SmartphonesPage() {
  const products = await getStoreProducts({ categorySlug: "smartphones", take: 200 });
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#17201e]">
      <div className="border-b border-[#e8e7e1] bg-white py-3"><div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14"><div className="flex items-center gap-2 text-xs text-[#727873]"><Link href="/" className="hover:text-[#289844]">Accueil</Link><ChevronRight size={12} /><span className="font-medium text-[#17201e]">Smartphones</span></div></div></div>
      <section className="border-b border-[#e8e7e1] bg-white"><div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-14 lg:py-14"><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef6ef]"><Smartphone className="h-7 w-7 text-[#289844]" /></div><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#567364]">La boutique Zink Tech</p><h1 className="mt-1 text-3xl font-bold tracking-[-.04em] sm:text-4xl">Smartphones</h1></div></div><p className="mt-5 max-w-2xl text-sm leading-6 text-[#68716a]">Filtrez les modèles par marque, budget ou caractéristiques.</p></div></section>
      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-14 lg:py-14"><CatalogueBrowser products={products} emptyMessage="Aucun smartphone ne correspond à ces filtres." /></section>
    </main>
  );
}
