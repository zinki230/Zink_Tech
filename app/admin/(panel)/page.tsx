import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Boxes, CircleAlert, Package, Plus, ShoppingBag, Tags } from "lucide-react";
import { getAdminOverview } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Vue d’ensemble | Administration Zink Tech", robots: { index: false, follow: false } };

const number = (value: number) => new Intl.NumberFormat("fr-FR").format(value);
const statusLabels: Record<string, string> = { DRAFT: "Brouillon", WHATSAPP_PENDING: "À traiter", CONTACTED: "Client contacté", CONFIRMED: "Confirmée", PROCESSING: "En préparation", DELIVERED: "Livrée", CANCELLED: "Annulée" };

export default async function AdminDashboardPage() {
  const overview = await getAdminOverview();
  const metrics = overview.connected
    ? [
        { label: "Produits", value: number(overview.counts.products), detail: "Dans le catalogue", icon: Package, color: "blue" },
        { label: "Demandes clients", value: number(overview.counts.orders), detail: "Reçues sur WhatsApp", icon: ShoppingBag, color: "green" },
        { label: "Marques", value: number(overview.counts.brands), detail: "Dans votre catalogue", icon: Tags, color: "violet" },
        { label: "Catégories", value: number(overview.counts.categories), detail: "Pour organiser l’offre", icon: Boxes, color: "amber" },
      ]
    : [
        { label: "Produits", value: "—", detail: "Connexion requise", icon: Package, color: "blue" },
        { label: "Demandes clients", value: "—", detail: "Connexion requise", icon: ShoppingBag, color: "green" },
        { label: "Marques", value: "—", detail: "Connexion requise", icon: Tags, color: "violet" },
        { label: "Catégories", value: "—", detail: "Connexion requise", icon: Boxes, color: "amber" },
      ];

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#2872bf]">ESPACE ADMINISTRATEUR</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-.05em] text-[#142451]">Vue d’ensemble</h1>
          <p className="mt-2 text-sm text-[#737e91]">Pilotez votre catalogue et vos demandes depuis cet espace.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/produits/nouveau" className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#173986] px-4 text-xs font-semibold text-white transition hover:bg-[#10245d]"><Plus size={15}/> Ajouter un produit</Link>
          <Link href="/" target="_blank" className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#dfe4ed] bg-white px-4 text-xs font-semibold text-[#536078] hover:bg-[#f7f9fc]">Ouvrir la boutique <ArrowUpRight size={14}/></Link>
        </div>
      </div>

      {!overview.connected && <div className="mt-7 flex gap-3 rounded-2xl border border-[#f0d99b] bg-[#fff8e4] p-4 sm:p-5"><CircleAlert size={19} className="mt-0.5 shrink-0 text-[#b57d11]"/><div><p className="text-sm font-semibold text-[#624c1c]">Connectez votre base de données</p><p className="mt-1 text-sm leading-6 text-[#796a43]">{overview.error}</p><p className="mt-2 text-xs text-[#796a43]">Les formulaires d’administration sont prêts. Les modifications seront disponibles après la configuration PostgreSQL.</p></div></div>}

      <section aria-label="Indicateurs de la boutique" className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, icon: Icon, color }) => (
          <article key={label} className="rounded-2xl border border-[#e7eaf0] bg-white p-5 shadow-[0_3px_12px_rgba(20,36,81,.025)]">
            <div className="flex items-center justify-between"><span className="text-xs font-medium text-[#778297]">{label}</span><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${color === "blue" ? "bg-blue-50 text-[#2872bf]" : color === "green" ? "bg-green-50 text-[#299a47]" : color === "violet" ? "bg-violet-50 text-violet-600" : "bg-amber-50 text-amber-600"}`}><Icon size={17}/></span></div>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-[#19294e]">{value}</p><p className="mt-1 text-[11px] text-[#8b94a3]">{detail}</p>
          </article>
        ))}
      </section>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_.8fr]">
        <section className="overflow-hidden rounded-2xl border border-[#e7eaf0] bg-white">
          <div className="flex items-center justify-between border-b border-[#edf0f4] px-5 py-4"><div><h2 className="text-sm font-semibold text-[#22304c]">Demandes récentes</h2><p className="mt-1 text-xs text-[#8993a3]">Suivez les commandes issues de WhatsApp</p></div><Link href="/admin/commandes" className="inline-flex items-center gap-1 text-xs font-semibold text-[#2363b5]">Toutes les demandes <ArrowRight size={14}/></Link></div>
          {!overview.connected || overview.recentOrders.length === 0 ? (
            <div className="px-5 py-12 text-center"><span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f4fb] text-[#7b8eae]"><ShoppingBag size={19}/></span><p className="mt-4 text-sm font-medium text-[#566176]">{overview.connected ? "Aucune demande pour le moment" : "Les données apparaîtront ici après connexion"}</p><p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#8b94a3]">{overview.connected ? "Les nouvelles demandes WhatsApp seront listées ici." : "Configurez PostgreSQL pour afficher vos commandes, vos produits et vos indicateurs réels."}</p></div>
          ) : (
            <div className="overflow-x-auto"><table className="w-full min-w-[540px] text-left text-xs"><thead className="bg-[#fafbfd] text-[10px] uppercase tracking-wide text-[#939cac]"><tr><th className="px-5 py-3 font-semibold">Référence</th><th className="px-4 py-3 font-semibold">Client</th><th className="px-4 py-3 font-semibold">Montant</th><th className="px-4 py-3 font-semibold">Statut</th><th className="px-5 py-3 font-semibold">Date</th></tr></thead><tbody>{overview.recentOrders.map((order) => <tr key={order.id} className="border-t border-[#f0f2f6]"><td className="px-5 py-3.5 font-semibold text-[#34537f]">{order.orderNumber}</td><td className="px-4 py-3.5 text-[#46536a]">{order.customerName || "Client"}</td><td className="px-4 py-3.5 text-[#46536a]">{number(order.total)} FCFA</td><td className="px-4 py-3.5"><span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-[#315da0]">{statusLabels[order.status] || order.status}</span></td><td className="px-5 py-3.5 text-[#7f8999]">{new Date(order.createdAt).toLocaleDateString("fr-FR")}</td></tr>)}</tbody></table></div>
          )}
        </section>
        <section className="rounded-2xl border border-[#e7eaf0] bg-white p-5">
          <h2 className="text-sm font-semibold text-[#22304c]">Actions rapides</h2><p className="mt-1 text-xs text-[#8993a3]">Les tâches les plus courantes</p>
          <div className="mt-4 space-y-2">
            {[
              ["/admin/produits/nouveau", "Ajouter un produit", "Compléter le catalogue", Package],
              ["/admin/produits", "Mettre à jour les stocks", "Vérifier les fiches produits", ArrowDownRight],
              ["/admin/catalogue", "Gérer les catégories", "Organiser la boutique", Tags],
              ["/admin/commandes", "Traiter les demandes", "Faire le suivi client", ShoppingBag],
            ].map(([href, title, subtitle, Icon]: any) => <Link key={title} href={href} className="group flex items-center gap-3 rounded-xl border border-[#eff1f5] p-3 transition hover:border-[#d6e1f4] hover:bg-[#f9fbff]"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef3ff] text-[#2763b3]"><Icon size={16}/></span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-[#35425a]">{title}</span><span className="mt-0.5 block truncate text-[10px] text-[#8993a3]">{subtitle}</span></span><ArrowRight size={14} className="text-[#b2bdcd] transition group-hover:translate-x-0.5 group-hover:text-[#2763b3]"/></Link>)}
          </div>
        </section>
      </div>
    </div>
  );
}
