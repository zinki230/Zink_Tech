import type { Metadata } from "next";
import { CalendarDays, CircleAlert, MessageCircle, PackageCheck, Phone, ShoppingCart } from "lucide-react";
import { getAdminOrders } from "@/lib/admin-data";
import { updateOrderStatus } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Commandes WhatsApp | Administration Zink Tech", robots: { index: false, follow: false } };
const states = [
  ["WHATSAPP_PENDING", "À traiter"], ["CONTACTED", "Client contacté"], ["CONFIRMED", "Confirmée"],
  ["PROCESSING", "En préparation"], ["DELIVERED", "Livrée"], ["CANCELLED", "Annulée"],
];
const price = (value: number) => `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;

export default async function AdminOrdersPage() {
  const data = await getAdminOrders();
  return <div>
    <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#2872bf]">RELATION CLIENT</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.05em] text-[#142451]">Commandes WhatsApp</h1><p className="mt-2 text-sm text-[#737e91]">Suivez les demandes et mettez à jour leur état.</p></div>
    {!data.connected && <div className="mt-6 flex gap-3 rounded-xl border border-[#f0d99b] bg-[#fff8e4] p-4 text-sm leading-6 text-[#715418]"><CircleAlert size={18} className="mt-0.5 shrink-0"/><p>Connectez PostgreSQL pour charger les demandes réelles. Aucune commande fictive n’est affichée.</p></div>}
    <section className="mt-6 space-y-3">
      {data.orders.length ? data.orders.map((order) => <article key={order.id} className="rounded-2xl border border-[#e7eaf0] bg-white p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div><div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-semibold text-[#273955]">{order.orderNumber}</h2><span className="rounded-full bg-[#eef3ff] px-2.5 py-1 text-[10px] font-medium text-[#315da0]">{order.status.replaceAll("_", " ")}</span></div><p className="mt-2 text-xs text-[#566176]">{order.customerName} · {order.city || "Ville à confirmer"}</p><p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#8b94a3]"><CalendarDays size={13}/>{new Date(order.createdAt).toLocaleString("fr-FR")}</p></div>
          <form action={updateOrderStatus} className="flex items-center gap-2"><input type="hidden" name="id" value={order.id}/><select name="status" defaultValue={order.status} className="h-10 rounded-lg border border-[#dfe4ed] bg-white px-2.5 text-xs text-[#48566f]">{states.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><button className="h-10 rounded-lg bg-[#173986] px-3 text-xs font-semibold text-white hover:bg-[#10245d]">Mettre à jour</button></form>
        </div>
        <div className="mt-4 grid gap-4 border-t border-[#edf0f4] pt-4 sm:grid-cols-[1fr_auto] sm:items-end"><div className="space-y-1">{order.items.map((item) => <p key={item.id} className="flex items-center gap-2 text-xs text-[#667187]"><PackageCheck size={13} className="text-[#8495ad]"/>{item.quantity} × {item.brandName} {item.productName}</p>)}</div><div className="flex flex-wrap items-center gap-x-4 gap-y-2"><strong className="text-sm text-[#243656]">{price(order.total)}</strong>{order.customerPhone && <a href={`https://wa.me/${order.customerPhone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#eaf7ed] px-3 text-[11px] font-semibold text-[#208542]"><MessageCircle size={13}/> Répondre</a>}{order.customerPhone && <a href={`tel:${order.customerPhone}`} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e4e8ef] px-3 text-[11px] font-medium text-[#58667d]"><Phone size={13}/> Appeler</a>}</div></div>
      </article>) : <div className="rounded-2xl border border-[#e7eaf0] bg-white px-5 py-14 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f4fb] text-[#758bac]"><ShoppingCart size={20}/></span><h2 className="mt-4 text-sm font-semibold text-[#45536b]">{data.connected ? "Aucune commande pour le moment" : "Les demandes apparaîtront ici"}</h2><p className="mt-1 text-xs text-[#8993a3]">Les demandes enregistrées dans la base de données seront affichées ici.</p></div>}
    </section>
  </div>;
}
