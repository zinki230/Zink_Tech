import type { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata: Metadata = { title: "Rechercher un produit", description: "Recherchez un ordinateur, smartphone ou équipement informatique chez Zink Tech au Cameroun." };
const catalog = [
  { name: "Ordinateurs portables", text: "HP, Dell, Lenovo, Apple et plus", href: "/ordinateurs-portables", terms: "ordinateur portable laptop pc hp dell lenovo apple macbook" },
  { name: "Smartphones", text: "iPhone, Samsung, Xiaomi, Tecno et Infinix", href: "/smartphones", terms: "smartphone téléphone iphone samsung xiaomi tecno infinix" },
  { name: "Tablettes", text: "iPad et autres tablettes disponibles", href: "/tablettes", terms: "tablette ipad apple ipad" },
  { name: "Équipements et accessoires", text: "Accessoires informatiques et mises à niveau", href: "/equipements", terms: "équipement accessoire support sac usb stockage mémoire ram ssd" },
  { name: "Solutions informatiques pour entreprises", text: "Équipement, conseil et accompagnement professionnel", href: "/entreprises", terms: "entreprise professionnel informatique devis equipement" },
  { name: "Marques disponibles", text: "Découvrez les marques proposées par Zink Tech", href: "/marques", terms: "marque asus acer msi google" },
];
type Props = { searchParams: Promise<{ q?: string }> };
export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLocaleLowerCase("fr");
  const results = query ? catalog.filter((item) => `${item.name} ${item.terms}`.toLocaleLowerCase("fr").includes(query)) : catalog;
  return <div className="min-h-[60vh] bg-[#faf9f6] px-5 py-12 sm:py-20"><div className="mx-auto max-w-4xl"><span className="eyebrow">RECHERCHE ZINK TECH</span><h1 className="mt-3 text-4xl font-semibold tracking-[-.055em]">Trouvez ce qu’il vous faut.</h1><form action="/recherche" method="get" className="mt-7 flex h-14 items-center gap-3 rounded-full border border-[#e1e4dc] bg-white px-5"><Search size={19} className="text-[#708276]"/><input autoFocus name="q" defaultValue={q} placeholder="Ordinateur, smartphone, marque…" className="w-full bg-transparent text-sm outline-none"/><button className="rounded-full bg-[#173f36] px-5 py-2 text-xs font-semibold text-white">Rechercher</button></form><p className="mt-8 text-sm text-[#727a72]">{query ? `${results.length} catégorie${results.length === 1 ? "" : "s"} trouvée${results.length === 1 ? "" : "s"} pour « ${q} »` : "Parcourez nos catégories principales."}</p>{results.length ? <div className="mt-4 grid gap-3 sm:grid-cols-2">{results.map((item) => <Link key={item.href} href={item.href} className="group rounded-2xl border border-[#e5e7df] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg"><span className="text-lg font-semibold">{item.name}</span><p className="mt-2 text-sm text-[#727a72]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#34705e]">Explorer <ArrowRight size={15} className="transition group-hover:translate-x-1"/></span></Link>)}</div> : <div className="mt-5 rounded-2xl border border-[#e5e7df] bg-white p-7"><p className="text-sm text-[#68716a]">Nous n’avons pas trouvé cette catégorie. Notre équipe peut vous aider à trouver le bon modèle.</p><WhatsAppButton className="mt-5 rounded-full">Demander à un conseiller</WhatsAppButton></div>}</div></div>;
}
