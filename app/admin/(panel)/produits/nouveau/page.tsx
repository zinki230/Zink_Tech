import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";
import { getAdminProductOptions } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Ajouter un produit | Administration Zink Tech", robots: { index: false, follow: false } };

export default async function NewProductPage() {
  const options = await getAdminProductOptions();
  return <div className="mx-auto max-w-4xl"><Link href="/admin/produits" className="inline-flex items-center gap-2 text-xs font-medium text-[#64738b] hover:text-[#2363b5]"><ArrowLeft size={15}/> Retour aux produits</Link><div className="mb-6 mt-5"><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#2872bf]">CATALOGUE</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.05em] text-[#142451]">Ajouter un produit</h1><p className="mt-2 text-sm text-[#737e91]">Créez une fiche qui pourra être présentée dans votre boutique.</p></div><ProductForm options={options}/></div>;
}
