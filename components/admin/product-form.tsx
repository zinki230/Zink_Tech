import Link from "next/link";
import { ArrowLeft, CircleAlert, Save } from "lucide-react";
import { createProduct, updateProduct } from "@/app/admin/actions";
import type { getAdminProductOptions } from "@/lib/admin-data";

type Options = Awaited<ReturnType<typeof getAdminProductOptions>>;
export type ProductFormValues = {
  id?: string; name?: string; slug?: string; description?: string; shortDescription?: string;
  price?: string; originalPrice?: string; sku?: string; stockQuantity?: number;
  inStock?: boolean; featured?: boolean; brandId?: string; categoryId?: string; image?: string;
};

const inputClass = "h-11 w-full rounded-xl border border-[#dfe4ed] bg-white px-3.5 text-sm text-[#26344f] outline-none transition placeholder:text-[#a1a9b6] focus:border-[#2872bf] focus:ring-4 focus:ring-[#2872bf]/10";
const labelClass = "mb-1.5 block text-xs font-semibold text-[#47546b]";

export function ProductForm({ options, product }: { options: Options; product?: ProductFormValues }) {
  const editing = Boolean(product?.id);
  const action = editing ? updateProduct : createProduct;
  return <form action={action} className="space-y-5">
    {!options.connected && <div className="flex gap-3 rounded-xl border border-[#f0d99b] bg-[#fff8e4] p-4 text-xs leading-5 text-[#715418]"><CircleAlert size={17} className="mt-0.5 shrink-0"/><span>La base PostgreSQL n’est pas disponible. Connectez-la avant d’enregistrer cette fiche.</span></div>}
    {editing && <input type="hidden" name="id" value={product?.id}/>}
    <section className="rounded-2xl border border-[#e7eaf0] bg-white p-5 sm:p-6"><h2 className="text-sm font-semibold text-[#263652]">Informations du produit</h2><p className="mt-1 text-xs text-[#8791a0]">Les champs marqués d’une astérisque sont obligatoires.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2"><label htmlFor="name" className={labelClass}>Nom du produit *</label><input className={inputClass} id="name" name="name" required defaultValue={product?.name} placeholder="Ex. Ordinateur portable professionnel"/></div>
        <div><label htmlFor="brandId" className={labelClass}>Marque *</label><select className={inputClass} id="brandId" name="brandId" required defaultValue={product?.brandId || ""}><option value="" disabled>Choisir une marque</option>{options.brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}</select></div>
        <div><label htmlFor="categoryId" className={labelClass}>Catégorie *</label><select className={inputClass} id="categoryId" name="categoryId" required defaultValue={product?.categoryId || ""}><option value="" disabled>Choisir une catégorie</option>{options.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
        <div><label htmlFor="slug" className={labelClass}>Adresse de la fiche</label><input className={inputClass} id="slug" name="slug" defaultValue={product?.slug} placeholder="Générée depuis le nom si vide"/></div>
        <div><label htmlFor="sku" className={labelClass}>Référence interne (SKU)</label><input className={inputClass} id="sku" name="sku" defaultValue={product?.sku} placeholder="Optionnel"/></div>
        <div className="sm:col-span-2"><label htmlFor="shortDescription" className={labelClass}>Résumé court</label><input className={inputClass} id="shortDescription" name="shortDescription" defaultValue={product?.shortDescription} placeholder="Processeur, mémoire, capacité…"/></div>
        <div className="sm:col-span-2"><label htmlFor="description" className={labelClass}>Description complète</label><textarea className="min-h-28 w-full rounded-xl border border-[#dfe4ed] bg-white px-3.5 py-3 text-sm text-[#26344f] outline-none transition placeholder:text-[#a1a9b6] focus:border-[#2872bf] focus:ring-4 focus:ring-[#2872bf]/10" id="description" name="description" defaultValue={product?.description} placeholder="Présentez les usages et les caractéristiques confirmées."/></div>
        <div className="sm:col-span-2"><label htmlFor="imageUrl" className={labelClass}>URL de l’image</label><input className={inputClass} id="imageUrl" name="imageUrl" type="url" defaultValue={product?.image} placeholder="https://…"/></div>
      </div>
    </section>
    <section className="rounded-2xl border border-[#e7eaf0] bg-white p-5 sm:p-6"><h2 className="text-sm font-semibold text-[#263652]">Prix & disponibilité</h2><div className="mt-5 grid gap-4 sm:grid-cols-3"><div><label htmlFor="price" className={labelClass}>Prix de vente (FCFA) *</label><input className={inputClass} id="price" name="price" type="number" min="0" step="1" required defaultValue={product?.price} placeholder="0"/></div><div><label htmlFor="originalPrice" className={labelClass}>Ancien prix (optionnel)</label><input className={inputClass} id="originalPrice" name="originalPrice" type="number" min="0" step="1" defaultValue={product?.originalPrice} placeholder="Laisser vide si aucun"/></div><div><label htmlFor="stockQuantity" className={labelClass}>Quantité en stock *</label><input className={inputClass} id="stockQuantity" name="stockQuantity" type="number" min="0" step="1" required defaultValue={product?.stockQuantity ?? 0}/></div></div>
      <div className="mt-5 flex flex-wrap gap-5"><label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-[#566176]"><input type="checkbox" name="inStock" defaultChecked={product?.inStock ?? true} className="h-4 w-4 rounded border-[#cbd3df] accent-[#173986]"/> Disponible à la vente</label><label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-[#566176]"><input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} className="h-4 w-4 rounded border-[#cbd3df] accent-[#173986]"/> Mettre en avant</label></div>
    </section>
    <div className="flex justify-between gap-3"><Link href="/admin/produits" className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#dfe4ed] bg-white px-4 text-xs font-semibold text-[#59657a]"><ArrowLeft size={15}/> Annuler</Link><button disabled={!options.connected || !options.brands.length || !options.categories.length} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#173986] px-5 text-xs font-semibold text-white transition hover:bg-[#10245d] disabled:cursor-not-allowed disabled:opacity-50"><Save size={15}/>{editing ? "Enregistrer les changements" : "Créer la fiche produit"}</button></div>
    {options.connected && (!options.brands.length || !options.categories.length) && <p className="text-right text-xs text-[#8791a0]">Ajoutez d’abord au moins une marque et une catégorie au catalogue.</p>}
  </form>;
}
