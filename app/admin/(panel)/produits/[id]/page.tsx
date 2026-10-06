import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";
import { getAdminProduct, getAdminProductOptions } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Modifier un produit | Administration Zink Tech", robots: { index: false, follow: false } };
type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [options, product] = await Promise.all([getAdminProductOptions(), getAdminProduct(id)]);
  if (!product) notFound();
  return <div className="mx-auto max-w-4xl"><Link href="/admin/produits" className="inline-flex items-center gap-2 text-xs font-medium text-[#64738b] hover:text-[#2363b5]"><ArrowLeft size={15}/> Retour aux produits</Link><div className="mb-6 mt-5"><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#2872bf]">CATALOGUE</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.05em] text-[#142451]">Modifier la fiche</h1><p className="mt-2 text-sm text-[#737e91]">{product.name}</p></div><ProductForm options={options} product={product}/></div>;
}
