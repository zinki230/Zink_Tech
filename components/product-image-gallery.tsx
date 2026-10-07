"use client";

import { useState } from "react";
import Image from "next/image";

type Props = { images: string[]; productName: string };

export function ProductImageGallery({ images, productName }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  if (!selectedImage) return null;

  return (
    <div>
      <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[28px] bg-[#edf3fb] sm:min-h-[470px]">
        <Image
          key={selectedImage}
          src={selectedImage}
          alt={`${productName} — vue ${selectedIndex + 1}`}
          fill
          unoptimized
          priority={selectedIndex === 0}
          className="object-contain p-8"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[10px] text-[#667187]">
          Vue {selectedIndex + 1} / {images.length}
        </span>
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-6 gap-2" aria-label="Vues du produit">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Afficher la vue ${index + 1} de ${productName}`}
              aria-pressed={selectedIndex === index}
              className={`relative aspect-square overflow-hidden rounded-xl border bg-white p-1 transition ${selectedIndex === index ? "border-[#289844] ring-2 ring-[#289844]/20" : "border-[#e2e7ed] hover:border-[#9cb5a0]"}`}
            >
              <Image src={image} alt="" fill unoptimized className="object-contain p-1" sizes="100px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
