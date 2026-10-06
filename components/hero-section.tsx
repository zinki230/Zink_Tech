"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BadgeCheck, MessageCircle, Truck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

  return (
    <section className="relative isolate min-h-[650px] overflow-hidden bg-[#10245d] text-white lg:min-h-[700px]">
      {/* ── Background Image with Parallax ── */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2200&q=90"
          alt="Espace de travail moderne avec ordinateur portable"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
      </motion.div>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,36,32,.95)_0%,rgba(9,36,32,.84)_48%,rgba(9,36,32,.16)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b1b43]/70 via-transparent to-transparent" />

      {/* ── Decorative Elements ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/5"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full border border-white/5"
      />

      {/* ── Grid Pattern ── */}
      <div className="absolute inset-0 -z-5 grid-pattern opacity-40" />

      {/* ── Content ── */}
      <motion.div style={{ y }} className="relative z-10">
        <div className="mx-auto flex min-h-[650px] max-w-[1400px] flex-col justify-center px-5 pb-16 pt-20 sm:px-8 lg:min-h-[700px] lg:px-14">
          <div className="max-w-[1050px]">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide backdrop-blur-sm"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-[#54b948]"
              />
              TECHNOLOGIE & CONSEIL · CAMEROUN
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,6.4vw,5.8rem)] font-semibold leading-[.98] tracking-[-.065em]"
            >
              Le bon choix.<br /><span className="font-light italic text-[#54b948]">La bonne technologie.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-lg text-base leading-7 text-white/75 sm:text-lg"
            >
              Ordinateurs, smartphones et équipements pro des grandes marques. Choisissez en ligne, échangez avec un conseiller et commandez simplement sur WhatsApp.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/ordinateurs-portables"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#54b948] px-7 text-sm font-semibold text-[#17392f] transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(84,185,72,0.35)]"
                >
                  Explorer la boutique <ArrowRight size={17} />
                </Link>
              </motion.div>
              <WhatsAppButton size="lg" className="min-h-14 rounded-full border border-white/35 bg-white/10 px-7 text-white backdrop-blur-sm transition hover:bg-white/20 hover:-translate-y-0.5">
                Parler à un conseiller
              </WhatsAppButton>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-white/70"
            >
              <span className="inline-flex items-center gap-2">
                <BadgeCheck size={16} className="text-[#54b948]" /> Conseil personnalisé
              </span>
              <span className="inline-flex items-center gap-2">
                <Truck size={16} className="text-[#54b948]" /> Livraison au Cameroun
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageCircle size={16} className="text-[#54b948]" /> Commande directe WhatsApp
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#boutique"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs text-white/65 lg:flex"
      >
        DÉCOUVRIR LA SÉLECTION
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>

      {/* Vertical line */}
      <div className="absolute bottom-0 right-[8%] hidden h-[82%] w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent lg:block" />
    </section>
  );
}