"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Star, Zap, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp-button";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price?: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  shortDescription?: string;
}

export function ProductCard({
  id,
  slug,
  name,
  brand,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  inStock,
  shortDescription,
}: ProductCardProps) {
  const discount = originalPrice && price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px 0px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-[#e4e4dc] bg-white transition-all duration-300"
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* ── Image Container ── */}
        <Link href={`/produits/${slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-[#f8f9f6]">
            <motion.div
              className="h-full w-full"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={image}
                alt={`${brand} ${name}`}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                unoptimized
                onError={(event) => {
                  event.currentTarget.src = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80";
                }}
              />
            </motion.div>

            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {discount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
                  <Zap size={10} /> -{discount}%
                </span>
              )}
              {rating && rating >= 4.8 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                  <Star size={10} className="fill-white" />{rating}
                </span>
              )}
            </div>

            {/* Quick View Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            >
              <motion.span
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#17392f] shadow-lg"
              >
                <Eye size={14} /> Voir le produit
              </motion.span>
            </motion.div>
          </div>
        </Link>

        {/* ── Content ── */}
        <div className="p-4">
          {/* Brand */}
          <Link href={`/produits/${slug}`}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#289844]">
                {brand}
              </span>
              {inStock ? (
                <span className="flex items-center gap-1 text-[10px] text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  En stock
                </span>
              ) : (
                <span className="text-[10px] text-amber-600">Stock à vérifier</span>
              )}
            </div>

            <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-[#17201e] transition-colors group-hover:text-[#289844]">
              {name}
            </h3>
          </Link>

          {/* Description */}
          {shortDescription && (
            <p className="mt-1.5 line-clamp-1 text-xs text-[#727873]">
              {shortDescription}
            </p>
          )}

          {/* Price */}
          {price && (
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#17201e]">
                {new Intl.NumberFormat("fr-FR").format(price)} FCFA
              </span>
              {originalPrice && (
                <span className="text-xs text-[#9ca39b] line-through">
                  {new Intl.NumberFormat("fr-FR").format(originalPrice)} FCFA
                </span>
              )}
            </div>
          )}

          {!price && (
            <p className="mt-3 text-xs font-medium text-[#289844]">
              Prix sur demande
            </p>
          )}

          {/* Rating */}
          {rating && reviewCount && (
            <div className="mt-2 flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={i < Math.round(rating) ? "fill-[#f5b342] text-[#f5b342]" : "text-[#e0e3db]"}
                  />
                ))}
              </div>
              <span className="text-[10px] text-[#727873]">
                ({reviewCount})
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-2">
            <WhatsAppButton
              message={`Bonjour Zink Tech, je suis intéressé(e) par ${brand} ${name}. Pouvez-vous me confirmer le modèle, le prix actuel et la disponibilité ?`}
              size="sm"
              className="w-full rounded-full"
            >
              Commander maintenant
            </WhatsAppButton>
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-full border-[#e4e4dc] text-[#43534a] transition hover:border-[#54b948] hover:text-[#289844]"
              asChild
            >
              <Link href={`/produits/${slug}`}>
                Voir les détails <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* ── Hover Border Effect ── */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
          whileHover={{ borderColor: "rgba(84,185,72,0.3)" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}