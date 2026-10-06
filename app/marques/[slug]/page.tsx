import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";

type Props = { params: Promise<{ slug: string }> };
const titleCase = (slug: string) => slug.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ");
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const brand = titleCase(slug);
  return { title: `Produits ${brand} au Cameroun`, description: `Renseignez-vous sur les produits ${brand} proposés par Zink Tech au Cameroun. Écrivez à notre équipe pour connaître les modèles et disponibilités actuels.` };
}
export default async function BrandPage({ params }: Props) {
  const { slug } = await params; const brand = titleCase(slug);
  return <div className="min-h-[60vh] bg-[#faf9f6] px-5 py-12 sm:py-20"><div className="mx-auto max-w-5xl"><Link href="/marques" className="inline-flex items-center gap-2 text-sm text-[#567364]"><ArrowLeft size={16}/> Toutes les marques</Link><div className="mt-8 grid gap-10 rounded-[28px] border border-[#e5e7df] bg-white p-7 sm:p-12 lg:grid-cols-[1fr_.8fr] lg:items-center"><div><span className="eyebrow">MARQUE DISPONIBLE SUR DEMANDE</span><h1 className="mt-3 text-5xl font-semibold tracking-[-.06em]">{brand}</h1><p className="mt-5 max-w-xl text-base leading-7 text-[#68716a]">Vous recherchez un produit {brand} ? Contactez Zink Tech pour découvrir les modèles disponibles, comparer les options et confirmer les prix en cours.</p><WhatsAppButton size="lg" message={`Bonjour Zink Tech, je recherche un produit ${brand}. Pouvez-vous m'indiquer les modèles, prix et disponibilités actuels ?`} className="mt-7 min-h-14 rounded-full bg-[#1f6b53] px-7 hover:bg-[#174d40]">Demander les modèles disponibles</WhatsAppButton></div><div className="rounded-2xl bg-[#eff1eb] p-7 sm:p-9"><BadgeCheck size={25} className="text-[#34705e]"/><h2 className="mt-5 text-xl font-semibold">Un choix qui vous convient.</h2><p className="mt-3 text-sm leading-6 text-[#68716a]">Précisez votre usage et votre budget. Notre équipe vous aide à trouver une option adaptée, puis confirme les informations avant commande.</p><Link href="/ordinateurs-portables" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#34705e]">Explorer les ordinateurs <ArrowRight size={15}/></Link></div></div></div></div>;
}
