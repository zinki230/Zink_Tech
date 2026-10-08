import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, MessageCircle, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getStoreProductBySlug } from "@/lib/catalogue";
import { ProductImageGallery } from "@/components/product-image-gallery";

type Props = { params: Promise<{ slug: string }> };

const prettify = (slug: string) => slug.split("-").map((part) => {
  const known: Record<string, string> = { hp: "HP", dell: "Dell", lenovo: "Lenovo", apple: "Apple", iphone: "iPhone", macbook: "MacBook", thinkpad: "ThinkPad", ideapad: "IdeaPad", galaxy: "Galaxy", xiaomi: "Xiaomi", tecno: "Tecno", infinix: "Infinix", asus: "Asus", vivobook: "VivoBook", samsung: "Samsung", probook: "ProBook", elitebook: "EliteBook", latitude: "Latitude" };
  return known[part.toLowerCase()] || part[0]?.toUpperCase() + part.slice(1);
}).join(" ");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const record = await getStoreProductBySlug(slug);
  const productName = record ? `${record.brand} ${record.name}` : prettify(slug);
  const description = record?.shortDescription || record?.description || `Contactez Zink Tech pour connaître les caractéristiques, le prix actuel et la disponibilité de ${productName} au Cameroun.`;
  return {
    title: `${productName} au Cameroun`,
    description: description.slice(0, 160),
    openGraph: { type: "website", title: productName, description: description.slice(0, 160), ...(record?.images[0] ? { images: [record.images[0]] } : {}) },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const record = await getStoreProductBySlug(slug);
  const productName = record ? `${record.brand} ${record.name}` : prettify(slug);
  const brand = record?.brand || productName.split(" ")[0];
  const isPhone = /iphone|galaxy|xiaomi|tecno|infinix|smartphone/i.test(slug) || record?.categorySlug === "smartphones";
  const categoryHref = record?.categorySlug === "smartphones" || isPhone ? "/smartphones" : record?.categorySlug === "tablettes" ? "/tablettes" : record?.categorySlug === "equipements" ? "/equipements" : "/ordinateurs-portables";
  const categoryLabel = isPhone ? "Retour aux smartphones" : record?.categorySlug === "tablettes" ? "Retour aux tablettes" : record?.categorySlug === "equipements" ? "Retour aux équipements" : "Retour aux ordinateurs";
  const whatsappMessage = `Bonjour Zink Tech, je suis intéressé(e) par ${productName}.${record?.price ? ` Prix affiché : ${new Intl.NumberFormat("fr-FR").format(record.price)} FCFA.` : ""} Pouvez-vous me confirmer la disponibilité et les options de livraison ?`;
  const productSchema = record ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: record.shortDescription || record.description || undefined,
    image: record.images.length ? record.images : undefined,
    sku: record.sku || undefined,
    brand: { "@type": "Brand", name: record.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "XAF",
      price: record.price,
      availability: record.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `https://zinktech.cm/produits/${record.slug}`,
    },
  } : null;
  const formattedPrice = record ? `${new Intl.NumberFormat("fr-FR").format(record.price)} FCFA` : "Prix sur demande";

  return (
    <div className="min-h-[65vh] bg-[#faf9f6]">
      {productSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }} />}
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <Link href={categoryHref} className="inline-flex items-center gap-2 text-sm text-[#305786] hover:text-[#10245d]"><ArrowLeft size={16}/> {categoryLabel}</Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            {record?.images[0] ? <ProductImageGallery images={record.images} productName={productName} /> : <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[28px] bg-[#edf3fb] sm:min-h-[470px]">
              <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full border border-[#d9e4f2]"/><div className="absolute -bottom-16 -left-10 h-72 w-72 rounded-full border border-[#d9e4f2]"/>
              <div className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full bg-white shadow-[0_20px_60px_rgba(20,40,80,.08)]"><span className="text-5xl font-semibold tracking-[-.08em] text-[#184ca5]">{brand.slice(0,2).toUpperCase()}</span></div>
              <span className="absolute bottom-4 rounded-full bg-white/85 px-3 py-1 text-[10px] text-[#667187]">Visuel d’illustration</span>
            </div>}
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-[.2em] text-[#1768b7]">{record?.category || "PRODUIT"} · ZINK TECH CAMEROUN</span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.055em] text-[#142451] sm:text-5xl">{productName}</h1>
            {(record?.shortDescription || record?.description) && <p className="mt-5 text-base leading-7 text-[#68716a]">{record.shortDescription || record.description}</p>}
            {!record && <p className="mt-5 text-base leading-7 text-[#68716a]">Vous recherchez ce modèle ? Écrivez à notre équipe pour recevoir les informations à jour et choisir la configuration adaptée à votre besoin.</p>}
            <div className="mt-7 rounded-2xl border border-[#e4e7df] bg-white p-5">
              <div className="flex items-center justify-between gap-4"><span className="text-xs font-semibold uppercase tracking-[.15em] text-[#7a847b]">{record ? "Prix affiché" : "Prix & disponibilité"}</span>{record && <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${record.inStock ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{record.inStock ? `Disponible · ${record.stockQuantity}` : "Disponibilité à confirmer"}</span>}</div>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-[#142451]">{formattedPrice}</p>
              <p className="mt-2 text-xs leading-5 text-[#737a74]">Le prix final, la configuration et la livraison sont confirmés avec vous avant commande.</p>
            </div>
            <WhatsAppButton message={whatsappMessage} size="lg" className="mt-6 min-h-14 w-full rounded-full bg-[#289844] text-base hover:bg-[#207c3b]">{record?.inStock ? "Commander sur WhatsApp" : "Vérifier la disponibilité"}</WhatsAppButton>
            <div className="mt-5 grid gap-3 text-xs text-[#66716a] sm:grid-cols-2"><span className="flex items-center gap-2"><BadgeCheck size={16} className="text-[#349044]"/> Conseil personnalisé</span><span className="flex items-center gap-2"><Truck size={16} className="text-[#349044]"/> Livraison à confirmer</span><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#349044]"/> Détails confirmés avant achat</span><span className="flex items-center gap-2"><MessageCircle size={16} className="text-[#349044]"/> Échange direct avec l’équipe</span></div>
          </div>
        </div>
        {record?.specifications.length ? <section className="mt-14 rounded-2xl border border-[#e5e8ee] bg-white p-6 sm:p-8"><div className="flex items-center gap-2"><PackageCheck size={19} className="text-[#2363b5]"/><h2 className="text-lg font-semibold text-[#142451]">Caractéristiques</h2></div><div className="mt-6 grid gap-x-10 sm:grid-cols-2">{record.specifications.map((spec) => <div key={spec.name} className="flex justify-between gap-5 border-b border-[#edf0f4] py-3 text-sm"><span className="text-[#7a8493]">{spec.name}</span><span className="text-right font-medium text-[#384760]">{spec.value}</span></div>)}</div></section> : null}
      </div>
    </div>
  );
}
