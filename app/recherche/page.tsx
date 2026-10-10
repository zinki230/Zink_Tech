import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getStoreProducts } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Rechercher un produit", description: "Recherchez un ordinateur, smartphone ou équipement informatique chez Zink Tech au Cameroun." };
const categories = [
  { name: "Ordinateurs portables", text: "HP, Dell, Lenovo, Apple et plus", href: "/ordinateurs-portables" },
  { name: "Smartphones", text: "iPhone, Samsung, Xiaomi, Tecno et Infinix", href: "/smartphones" },
  { name: "Tablettes", text: "iPad et autres tablettes disponibles", href: "/tablettes" },
  { name: "Équipements et accessoires", text: "Accessoires informatiques et mises à niveau", href: "/equipements" },
];
type Props = { searchParams: Promise<{ q?: string }> };
function normalize(value: string) {
  return value.toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/(\d)\s*gb\b/g, "$1 go").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const catalogue = query ? await getStoreProducts({ take: 200 }) : [];
  const products = catalogue.filter((product) => {
    const searchable = normalize([product.name, product.brand, product.shortDescription ?? "", ...(product.specifications ?? []).flatMap((spec) => [spec.name, spec.value])].join(" "));
    return terms.every((term) => searchable.includes(term));
  });

  if (products.length === 1) redirect(`/produits/${products[0].slug}`);

  return <div className="min-h-[60vh] bg-[#faf9f6] px-5 py-12 sm:py-20"><div className="mx-auto max-w-6xl"><span className="eyebrow">RECHERCHE ZINK TECH</span><h1 className="mt-3 text-4xl font-semibold tracking-[-.055em]">Trouvez ce qu’il vous faut.</h1><form action="/recherche" method="get" className="mt-7 flex h-14 items-center gap-3 rounded-full border border-[#e1e4dc] bg-white px-5"><Search size={19} className="text-[#708276]"/><input autoFocus name="q" defaultValue={q} placeholder="Ordinateur, smartphone, marque…" className="w-full bg-transparent text-sm outline-none"/><button className="rounded-full bg-[#173f36] px-5 py-2 text-xs font-semibold text-white">Rechercher</button></form>
    {query ? <><p className="mt-8 text-sm text-[#727a72]">{products.length} produit{products.length === 1 ? "" : "s"} trouvé{products.length === 1 ? "" : "s"} pour « {query} »{products.length === 1 ? " — ouverture de sa fiche…" : ""}</p>{products.length ? <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product.id} {...product} />)}</div> : <div className="mt-5 rounded-2xl border border-[#e5e7df] bg-white p-7"><p className="text-sm text-[#68716a]">Aucun produit correspondant. Parcourez nos catégories ou demandez conseil à notre équipe.</p><div className="mt-5 flex flex-wrap gap-3">{categories.map((category) => <Link key={category.href} href={category.href} className="rounded-full border border-[#e1e4dc] px-4 py-2 text-xs font-medium text-[#34705e]">{category.name}</Link>)}</div><WhatsAppButton className="mt-5 rounded-full">Demander à un conseiller</WhatsAppButton></div>}{products.length > 1 && <p className="mt-6 text-sm text-[#68716a]">Choisissez un résultat pour ouvrir directement sa fiche produit.</p>}</> : <><p className="mt-8 text-sm text-[#727a72]">Parcourez nos catégories principales.</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{categories.map((item) => <Link key={item.href} href={item.href} className="group rounded-2xl border border-[#e5e7df] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg"><span className="text-lg font-semibold">{item.name}</span><p className="mt-2 text-sm text-[#727a72]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#34705e]">Explorer <ArrowRight size={15} className="transition group-hover:translate-x-1"/></span></Link>)}</div></>}</div></div>;
}
