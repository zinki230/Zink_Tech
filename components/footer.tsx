"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Phone, Mail, ArrowUpRight, ArrowRight, MessageCircle, BadgeCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic (WhatsApp redirect for now)
    window.open(`https://wa.me/237657413164?text=Bonjour%20Zink%20Tech%2C%20je%20souhaite%20recevoir%20vos%20offres%20et%20nouveaut%C3%A9s.%20Mon%20email%20%3A%20${encodeURIComponent(email)}`, "_blank");
    setEmail("");
  };

  return (
    <footer className="bg-[#10245d] text-white">
      {/* ─── Newsletter / CTA Section ─── */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-14 lg:py-16">
          <div className="relative overflow-hidden rounded-[24px] bg-[#1a3a6e] px-7 py-10 sm:px-10 sm:py-12 lg:px-14">
            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/5" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full border border-white/5" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-[.17em] text-[#54b948]">
                  RESTONS EN CONTACT
                </span>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-.03em] sm:text-3xl">
                  Des questions ? On est là.
                </h2>
                <p className="mt-2 text-sm text-white/65">
                  Recevez nos offres exclusives et les nouveautés directement. Ou écrivez-nous sur WhatsApp, on répond sous 5 minutes.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <form onSubmit={handleNewsletterSubmit} className="flex overflow-hidden rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    required
                    className="min-w-[200px] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/40"
                  />
                  <button
                    type="submit"
                    className="bg-[#54b948] px-5 py-3 text-sm font-semibold text-[#17392f] transition hover:bg-white"
                  >
                    S&apos;inscrire
                  </button>
                </form>
                <WhatsAppButton
                  size="sm"
                  className="rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Footer Grid ─── */}
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.8fr_.7fr] lg:px-14 lg:py-16">
        {/* Brand */}
        <div>
          <Link href="/" aria-label="Zink Tech, accueil" className="inline-flex rounded-lg bg-white px-2 py-1">
            <Image
              src="/brand/zink-tech-wordmark.jpg"
              alt="Zink Tech, votre partenaire digital"
              width={180}
              height={42}
              className="h-auto w-[165px]"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
            Votre partenaire technologique au Cameroun. Trouvez votre équipement et échangez avec notre équipe pour faire le bon choix.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-white/50">
              <BadgeCheck size={12} className="text-[#54b948]" />
              Produits 100% authentiques
            </span>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[.17em] text-[#54b948]">
            La boutique
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li><Link className="transition hover:text-white hover:translate-x-1 inline-flex items-center gap-1" href="/ordinateurs-portables">Ordinateurs portables <ChevronRight size={10} /></Link></li>
            <li><Link className="transition hover:text-white hover:translate-x-1 inline-flex items-center gap-1" href="/equipements">Équipements et accessoires <ChevronRight size={10} /></Link></li>
            <li><Link className="transition hover:text-white hover:translate-x-1 inline-flex items-center gap-1" href="/smartphones">Smartphones <ChevronRight size={10} /></Link></li>
            <li><Link className="transition hover:text-white hover:translate-x-1 inline-flex items-center gap-1" href="/marques">Nos marques <ChevronRight size={10} /></Link></li>
            <li><Link className="transition hover:text-white hover:translate-x-1 inline-flex items-center gap-1" href="/entreprises">Solutions entreprises <ChevronRight size={10} /></Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[.17em] text-[#54b948]">
            Nous contacter
          </h2>
          <ul className="mt-5 space-y-4 text-sm text-white/75">
            <li className="flex items-center gap-3">
              <MapPin size={16} className="shrink-0 text-[#54b948]" />
              <span>Douala, Cameroun</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-[#54b948]" />
              <a href="tel:+237657413164" className="transition hover:text-white">+237 657 413 164</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-[#54b948]" />
              <a href="mailto:contact@zinktech.cm" className="transition hover:text-white">contact@zinktech.cm</a>
            </li>
          </ul>
        </div>

        {/* Hours & CTA */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[.17em] text-[#54b948]">
            Conseils
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#54b948]" />
              Lun - Ven : 8h - 18h
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#54b948]" />
              Sam : 9h - 15h
            </li>
          </ul>
          <WhatsAppButton size="sm" className="mt-5 rounded-full bg-[#54b948] text-[#17392f] transition hover:bg-white">
            <MessageCircle size={15} />
            Écrire sur WhatsApp
          </WhatsAppButton>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-5 text-xs text-white/50 sm:flex-row sm:px-8 lg:px-14">
          <span>&copy; {new Date().getFullYear()} Zink Tech. Tous droits réservés.</span>
          <span className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2"><MapPin size={12} /> Douala, Cameroun</span>
            <Link href="/entreprises" className="flex items-center gap-1 text-[#54b948] transition hover:text-white">
              Solutions entreprises <ArrowUpRight size={12} />
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
