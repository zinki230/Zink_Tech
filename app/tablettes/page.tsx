import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Tablet } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ScrollReveal, StaggerItem, StaggerWrapper } from "@/lib/animations";
import { getStoreProducts } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Tablettes et iPad au Cameroun | Zink Tech",
  description: "Découvrez les tablettes et iPad disponibles chez Zink Tech au Cameroun.",
};

export default async function TabletsPage() {
  const products = (await getStoreProducts({ categorySlug: "tablettes" })) ?? [];

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#17201e]">
      <div className="border-b border-[#e8e7e1] bg-white py-3">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
          <div className="flex items-center gap-2 text-xs text-[#727873]">
            <Link href="/" className="transition hover:text-[#289844]">Accueil</Link>
            <ChevronRight size={12} />
            <span className="font-medium text-[#17201e]">Tablettes</span>
          </div>
        </div>
      </div>
      <ScrollReveal>
        <section className="border-b border-[#e8e7e1] bg-white">
          <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef6ef]">
                <Tablet className="h-7 w-7 text-[#289844]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#567364]">La boutique Zink Tech</p>
                <h1 className="mt-1 text-3xl font-bold tracking-[-.04em] sm:text-4xl">Tablettes</h1>
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#68716a]">Retrouvez ici les iPad et autres tablettes disponibles.</p>
          </div>
        </section>
      </ScrollReveal>
      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
        {products.length ? (
          <StaggerWrapper className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <StaggerItem key={product.id}><ProductCard {...product} /></StaggerItem>
            ))}
          </StaggerWrapper>
        ) : (
          <p className="rounded-2xl border border-[#e4e4dc] bg-white p-8 text-sm text-[#68716a]">Aucune tablette n’est disponible pour le moment.</p>
        )}
      </section>
    </main>
  );
}
