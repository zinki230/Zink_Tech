"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Search, ShoppingBag, Menu, X, Phone, MapPin, MessageCircle,
  Laptop, Smartphone, Tablet, Package, Building2, ChevronRight, ChevronDown,
  BadgeCheck, Star, ArrowRight, Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppButton } from "@/components/whatsapp-button";

const navItems = [
  { label: "Ordinateurs", href: "/ordinateurs-portables", icon: Laptop },
  { label: "Tablettes", href: "/tablettes", icon: Tablet },
  { label: "Équipements et accessoires", href: "/equipements", icon: Package },
  { label: "Smartphones", href: "/smartphones", icon: Smartphone },
  { label: "Marques", href: "/marques", icon: Award },
  { label: "Entreprises", href: "/entreprises", icon: Building2 },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[#e8e7e1] bg-[#faf9f6]/98 shadow-[0_1px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl"
          : "border-b border-transparent bg-[#faf9f6]/95 backdrop-blur-xl"
      }`}
    >
      {/* ── Top Bar ── */}
      <div className="hidden bg-[#10245d] text-white md:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-2 text-[11px] tracking-wide lg:px-14">
          <span className="flex items-center gap-2 text-white/80">
            <MapPin size={13} className="text-[#54b948]" />
            Conseil et livraison au Cameroun
          </span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/70">
              <BadgeCheck size={12} className="text-[#54b948]" />
              Produits authentiques garantis
            </span>
            <a
              href="tel:+237657413164"
              className="flex items-center gap-2 text-white/80 transition hover:text-white"
            >
              <Phone size={13} /> +237 657 413 164
            </a>
            <Link
              href="/entreprises"
              className="text-[#54b948] transition hover:text-white"
            >
              Solutions entreprises
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Bar ── */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-14">
        <Link
          href="/"
          aria-label="Zink Tech, accueil"
          className="relative flex shrink-0 items-center"
        >
          <Image
            src="/brand/zink-tech-wordmark.jpg"
            alt="Zink Tech, votre partenaire digital"
            width={160}
            height={37}
            priority
            className="h-auto w-[128px] transition-all sm:w-[160px]"
          />
        </Link>

        {/* ── Search Bar Desktop ── */}
        <form
          action="/recherche"
          method="get"
          className="hidden flex-1 md:block md:max-w-xl"
        >
          <label className="flex h-11 items-center gap-3 rounded-full border border-[#e6e7df] bg-white px-4 transition-all focus-within:border-[#54b948] focus-within:shadow-[0_0_0_3px_rgba(84,185,72,0.12)]">
            <Search size={17} className="shrink-0 text-[#778079]" />
            <input
              type="search"
              name="q"
              placeholder="Que recherchez-vous ?"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#959a94]"
            />
          </label>
        </form>

        {/* ── Actions ── */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Ouvrir la recherche"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#43534a] transition hover:bg-[#edf3fb] md:hidden"
          >
            <Search size={19} />
          </button>

          <Link
            href="/panier"
            aria-label="Voir ma demande"
            className="group relative flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-[#43534a] transition hover:bg-[#edf3fb]"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Ma demande</span>
          </Link>

          <a
            href="https://wa.me/237657413164?text=Bonjour%20Zink%20Tech%2C%20j%E2%80%99aimerais%20un%20conseil."
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 items-center gap-2 rounded-full bg-[#289844] px-4 text-xs font-semibold text-white transition hover:bg-[#207c3b] sm:flex"
          >
            <MessageCircle size={15} /> Nous écrire
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#43534a] transition hover:bg-[#edf3fb] md:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Search ── */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[#e8e7e1] px-5 py-3 md:hidden"
          >
            <form action="/recherche" method="get">
              <label className="flex h-11 items-center gap-3 rounded-full border border-[#e6e7df] bg-white px-4 transition focus-within:border-[#54b948]">
                <Search size={17} className="text-[#778079]" />
                <input
                  autoFocus
                  type="search"
                  name="q"
                  placeholder="Ordinateur, smartphone, marque…"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </label>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop Navigation ── */}
      <nav className="hidden border-t border-[#efeee9] md:block">
        <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-8 py-2.5 text-[13px] font-medium lg:px-14">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex items-center gap-2 rounded-lg px-3 py-2 text-[#43534a] transition hover:bg-[#f0f5f0] hover:text-[#173986]"
            >
              <item.icon size={16} className="transition group-hover:scale-110" />
              <span>{item.label}</span>
              {item.label === "Ordinateurs" && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#54b948] text-[7px] font-bold text-white">
                  {">"}
                </span>
              )}
            </Link>
          ))}
          <div className="ml-auto flex items-center gap-3 text-xs text-[#838981]">
            <span>Besoin d&apos;un conseil ?</span>
            <a
              href="tel:+237657413164"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#54b948]/10 px-3 py-1.5 font-semibold text-[#289844] transition hover:bg-[#54b948]/20"
            >
              <Phone size={13} /> Appelez-nous
            </a>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[#e8e7e1] bg-[#faf9f6]"
          >
            <div className="px-5 pb-6 pt-3">
              <div className="grid gap-1">
                {([
                  ["Ordinateurs portables", "/ordinateurs-portables", Laptop],
                  ["Smartphones", "/smartphones", Smartphone],
                  ["Tablettes", "/tablettes", Tablet],
                  ["Équipements et accessoires", "/equipements", Package],
                  ["Nos marques", "/marques", Award],
                  ["Solutions entreprises", "/entreprises", Building2],
                  ["Ma demande", "/panier", ShoppingBag],
                ] as [string, string, typeof Laptop][]).map(([label, href, Icon]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-12 items-center justify-between border-b border-[#ecebe5] px-1 text-sm font-medium transition hover:bg-[#f0f5f0]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={17} className="text-[#43534a]" />
                      <span>{label}</span>
                    </span>
                    <ChevronRight size={16} className="text-[#809080]" />
                  </Link>
                ))}
              </div>
              <div className="mt-5 space-y-3">
                <a
                  href="tel:+237657413164"
                  className="flex items-center gap-2 text-sm text-[#1768b7]"
                >
                  <Phone size={16} /> +237 657 413 164
                </a>
                <WhatsAppButton size="sm" className="w-full rounded-full">
                  Écrire sur WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
