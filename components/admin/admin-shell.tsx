"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Activity, ChevronRight, LayoutDashboard, LogOut, Package, ShoppingCart, Store, Tags } from "lucide-react";
import { logoutAdmin } from "@/app/admin/auth-actions";

const items = [
  { href: "/admin", label: "Vue d’ensemble", icon: LayoutDashboard },
  { href: "/admin/produits", label: "Produits", icon: Package },
  { href: "/admin/commandes", label: "Commandes WhatsApp", icon: ShoppingCart },
  { href: "/admin/catalogue", label: "Marques & catégories", icon: Tags },
];

export function AdminShell({ children, databaseConnected }: { children: React.ReactNode; databaseConnected: boolean }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#f3f5f9] text-[#1c2740]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[252px] flex-col border-r border-[#e5e9f0] bg-white lg:flex">
        <Link href="/admin" className="flex h-[78px] items-center border-b border-[#edf0f5] px-5">
          <Image src="/brand/zink-tech-wordmark.jpg" alt="Zink Tech" width={170} height={39} priority className="h-auto w-[158px]" />
        </Link>
        <div className="px-4 pt-6">
          <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[.19em] text-[#9aa3b2]">GESTION DE LA BOUTIQUE</p>
          <nav className="space-y-1">
            {items.map(({ href, label, icon: Icon }) => {
              const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
              return <Link key={href} href={href} className={`group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${active ? "bg-[#eef3ff] text-[#194caa]" : "text-[#59657a] hover:bg-[#f5f7fb] hover:text-[#173986]"}`}>
                <Icon size={18} strokeWidth={1.8} /> {label}
                {active && <ChevronRight size={14} className="ml-auto opacity-60" />}
              </Link>;
            })}
          </nav>
          <p className="px-3 pb-3 pt-8 text-[10px] font-semibold uppercase tracking-[.19em] text-[#9aa3b2]">ACCÈS RAPIDE</p>
          <Link href="/" target="_blank" className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#59657a] transition hover:bg-[#f5f7fb] hover:text-[#173986]"><Store size={18} strokeWidth={1.8}/> Voir la boutique <ChevronRight size={14} className="ml-auto rotate-[-45deg] opacity-50" /></Link>
        </div>
        <div className="mt-auto p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#f6f8fb] p-3">
            <span className={`h-2.5 w-2.5 rounded-full ${databaseConnected ? "bg-[#37a74a]" : "bg-[#e0a229]"}`} />
            <div><div className="text-xs font-semibold">{databaseConnected ? "URL de base configurée" : "Base à configurer"}</div><div className="mt-0.5 text-[10px] text-[#8791a0]">État de la boutique</div></div>
          </div>
          <form action={logoutAdmin}><button className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm text-[#657084] hover:bg-red-50 hover:text-red-700"><LogOut size={17}/> Déconnexion</button></form>
        </div>
      </aside>
      <div className="lg:pl-[252px]">
        <header className="sticky top-0 z-20 flex h-[66px] items-center justify-between border-b border-[#e5e9f0] bg-white/95 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-2 text-sm text-[#788397]"><Activity size={16} className="text-[#2872bf]"/> <span className="hidden sm:inline">Administration</span> <ChevronRight size={14}/> <span className="font-semibold text-[#23304a]">Zink Tech</span></div>
          <div className="flex items-center gap-3"><span className="hidden text-xs text-[#738096] sm:inline">Votre partenaire digital</span><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef3ff] text-xs font-bold text-[#173986]">ZT</span></div>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-[#e5e9f0] bg-white px-4 py-2 lg:hidden">
          {items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#536078] hover:bg-[#eef3ff] hover:text-[#194caa]"><Icon size={15}/>{label}</Link>)}
          <form action={logoutAdmin} className="ml-auto"><button className="flex h-8 items-center gap-1 px-2 text-xs text-[#657084]"><LogOut size={15}/> Quitter</button></form>
        </nav>
        <main className="mx-auto max-w-[1450px] px-5 py-7 sm:px-8 sm:py-9">{children}</main>
      </div>
    </div>
  );
}
