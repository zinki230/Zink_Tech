import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Laptop } from "lucide-react";
import { CatalogueBrowser } from "@/components/catalogue-browser";
import { getStoreProducts } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Ordinateurs Portables au Cameroun - HP, Dell, Lenovo | Zink Tech",
  description: "Découvrez notre sélection d'ordinateurs portables des meilleures marques. HP ProBook, Dell Latitude, Lenovo ThinkPad, MacBook et plus. Livraison à Yaoundé.",
  keywords: "ordinateur portable Cameroun, laptop Yaoundé, HP ProBook, Dell Latitude, Lenovo ThinkPad, MacBook Air",
};

export default async function LaptopsPage() {
  const products = await getStoreProducts({ categorySlug: "ordinateurs-portables", take: 200 });
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#17201e]">
      <div className="border-b border-[#e8e7e1] bg-white py-3"><div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14"><div className="flex items-center gap-2 text-xs text-[#727873]"><Link href="/" className="hover:text-[#289844]">Accueil</Link><ChevronRight size={12} /><span className="font-medium text-[#17201e]">Ordinateurs portables</span></div></div></div>
      <section className="border-b border-[#e8e7e1] bg-white"><div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-14 lg:py-14"><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef6ef]"><Laptop className="h-7 w-7 text-[#289844]" /></div><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#567364]">La boutique Zink Tech</p><h1 className="mt-1 text-3xl font-bold tracking-[-.04em] sm:text-4xl">Ordinateurs portables</h1></div></div><p className="mt-5 max-w-2xl text-sm leading-6 text-[#68716a]">Trouvez votre prochain ordinateur par marque, budget, processeur ou mémoire vive.</p></div></section>
      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-14 lg:py-14"><CatalogueBrowser products={products} computerFilters emptyMessage="Aucun ordinateur ne correspond à ces filtres." /></section>
    </main>
  );
}
