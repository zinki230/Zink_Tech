import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, BadgeCheck, Building2, ChevronRight, CircleHelp,
  Headphones, Laptop, MapPin, MessageCircle, PackageCheck, ShieldCheck,
  Smartphone, Star, Truck, Zap, Users, Quote,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { HeroSection } from "@/components/hero-section";
import { ScrollReveal, StaggerWrapper, StaggerItem, AnimatedCounter } from "@/lib/animations";
import { getStoreProducts } from "@/lib/catalogue";

const categories = [
  { name: "Ordinateurs", text: "Pour travailler, créer et jouer", href: "/ordinateurs-portables", icon: Laptop, number: "01" },
  { name: "Smartphones", text: "Votre quotidien, en mieux", href: "/smartphones", icon: Smartphone, number: "02" },
  { name: "Équipements pro", text: "Les outils de votre entreprise", href: "/entreprises", icon: Building2, number: "03" },
];

const stats = [
  { value: 15, suffix: "+", label: "Marques premium" },
  { value: 800, suffix: "+", label: "Références disponibles" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
  { value: 24, suffix: "/7", label: "Support conseiller" },
];

const testimonials = [
  { name: "Paul D.", role: "Directeur PME, Yaoundé", text: "Zink Tech nous a équipés de 15 postes ThinkPad en 48h. Le conseil était impeccable et le suivi WhatsApp très réactif.", rating: 5 },
  { name: "Sarah M.", role: "Freelance, Yaoundé", text: "Je cherchais un MacBook Air au meilleur prix. Le conseiller m'a guidée, la livraison a été rapide. Je recommande !", rating: 5 },
  { name: "Jean K.", role: "Étudiant, Yaoundé", text: "J'avais un budget serré, on m'a trouvé l'ordinateur idéal pour mes études. Prix honnête et service exceptionnel.", rating: 5 },
];

export default async function HomePage() {
  const liveProducts = await getStoreProducts({ categorySlug: "ordinateurs-portables", take: 200 });
  const displayProducts = [...liveProducts].sort((a, b) => a.price - b.price).slice(0, 10);

  return (
    <div className="overflow-hidden bg-[#faf9f6] text-[#17201e]">
      {/* ─── HERO ─── */}
      <HeroSection />

      {/* ─── BANDE DE CONFIANCE ─── */}
      <ScrollReveal>
        <section className="border-b border-[#e8e7e1] bg-white">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-[#e8e7e1] px-5 sm:grid-cols-4 sm:divide-y-0 sm:px-8 lg:px-14">
            {[
              [ShieldCheck, "Des choix éclairés", "Un conseiller vous guide"],
              [PackageCheck, "Disponibilité confirmée", "Avant validation WhatsApp"],
              [Truck, "Livraison organisée", "À Yaoundé et ailleurs au Cameroun"],
              [Headphones, "Un vrai interlocuteur", "Échange direct et humain"],
            ].map(([Icon, title, subtitle]: any, i) => (
              <div key={title} className="flex items-center gap-3 px-3 py-5 transition hover:bg-[#faf9f6] sm:gap-4 sm:py-7">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef6ef]">
                  <Icon className="h-5 w-5 text-[#289844] sm:h-6 sm:w-6" strokeWidth={1.6} />
                </div>
                <div>
                  <div className="text-xs font-semibold sm:text-sm">{title}</div>
                  <div className="mt-1 text-[10px] text-[#727873] sm:text-xs">{subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ─── STATISTIQUES ─── */}
      <ScrollReveal>
        <section className="bg-[#10245d] py-14 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-xs font-medium tracking-wide text-white/60 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── CATÉGORIES ─── */}
      <ScrollReveal>
        <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:px-14">
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-12">
            <div>
              <span className="eyebrow">TROUVEZ VOTRE UNIVERS</span>
              <h2 className="section-title mt-3">La technologie<br className="sm:hidden" /> qui vous ressemble.</h2>
            </div>
            <Link href="/marques" className="hidden items-center gap-2 pb-2 text-sm font-medium text-[#1768b7] sm:flex">
              Voir les marques <ArrowRight size={16} />
            </Link>
          </div>
          <StaggerWrapper className="grid gap-4 md:grid-cols-3">
            {categories.map(({ name, text, href, icon: Icon, number }) => (
              <StaggerItem key={name}>
                <Link
                  href={href}
                  className="category-tile group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-[#e4e4dc] bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#54b948]/30 hover:shadow-[0_24px_64px_rgba(24,49,39,0.10)] sm:min-h-[270px] sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs tracking-[.22em] text-[#858a83]">{number} / 03</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef6ef] text-[#289844] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#289844] group-hover:text-white">
                      <Icon size={21} strokeWidth={1.6} />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-.04em]">{name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm text-[#727873]">{text}</p>
                      <ChevronRight className="text-[#289844] transition-all duration-300 group-hover:translate-x-1.5" size={18} />
                    </div>
                  </div>
                  <div className="absolute -bottom-14 -right-6 h-36 w-36 rounded-full border border-[#edf0e9] transition-all duration-500 group-hover:scale-125 group-hover:border-[#54b948]/20" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerWrapper>
        </section>
      </ScrollReveal>

      {/* ─── PRODUITS ─── */}
      <ScrollReveal>
        <section id="boutique" className="bg-[#f0f1eb] py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
            <div className="mb-9 flex items-end justify-between gap-4 sm:mb-12">
              <div>
                <span className="eyebrow">SÉLECTION ZINK TECH</span>
                <h2 className="section-title mt-3">Les 10 ordinateurs les moins chers.</h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[#666f68]">
                  Des ordinateurs fiables pour avancer sereinement, au bureau, en cours ou à la maison.
                </p>
              </div>
              <Link
                href="/ordinateurs-portables"
                className="hidden items-center gap-2 pb-2 text-sm font-medium text-[#1768b7] sm:flex"
              >
                Toute la sélection <ArrowRight size={16} />
              </Link>
            </div>

            {displayProducts.length ? (
              <StaggerWrapper className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayProducts.map((product) => (
                  <StaggerItem key={product.id}>
                    <ProductCard {...product} />
                  </StaggerItem>
                ))}
              </StaggerWrapper>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#cbd5e5] bg-white px-6 py-10 text-center text-sm text-[#65718a]">
                Notre sélection se met à jour. Contactez-nous pour trouver le modèle qu&apos;il vous faut.
              </div>
            )}

            <div className="mt-7 text-center sm:hidden">
              <Link href="/ordinateurs-portables" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1768b7]">
                Voir tous les ordinateurs <ArrowRight size={16} />
              </Link>
            </div>
            <p className="mt-6 text-center text-xs text-[#7b817b]">
              Prix et disponibilité à confirmer avec notre équipe avant commande.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── TÉMOIGNAGES ─── */}
      <ScrollReveal>
        <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:px-14">
          <div className="mb-10 text-center">
            <span className="eyebrow">ILS NOUS FONT CONFIANCE</span>
            <h2 className="section-title mt-3">Ce que disent nos clients.</h2>
          </div>
          <StaggerWrapper className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="group relative rounded-2xl border border-[#e4e4dc] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#54b948]/20 hover:shadow-[0_16px_40px_rgba(24,49,39,0.08)] sm:p-8">
                  <Quote className="mb-3 h-8 w-8 text-[#54b948]/20" />
                  <p className="text-sm leading-6 text-[#5c6862]">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-[#f5b342] text-[#f5b342]" />
                    ))}
                  </div>
                  <div className="mt-4 border-t border-[#f0f1eb] pt-4">
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-[#727873]">{t.role}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerWrapper>
        </section>
      </ScrollReveal>

      {/* ─── PROCESSUS ─── */}
      <ScrollReveal>
        <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-14">
          <div>
            <span className="eyebrow">SIMPLE, HUMAIN, RAPIDE</span>
            <h2 className="section-title mt-3">Acheter votre prochain appareil, sans prise de tête.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#68716a]">
              Vous hésitez entre deux modèles ? Notre équipe vous aide à comparer les options et à choisir ce qui correspond à votre usage et à votre budget.
            </p>
            <WhatsAppButton size="lg" className="mt-7 min-h-13 rounded-full bg-[#289844] px-7 hover:bg-[#207c3b]">
              Décrire mon besoin
            </WhatsAppButton>
          </div>
          <StaggerWrapper className="grid gap-3 sm:grid-cols-2">
            {[["01", "Vous choisissez", "Parcourez les modèles et leurs caractéristiques."],
              ["02", "On vous conseille", "Posez vos questions directement à l&apos;équipe."],
              ["03", "On confirme ensemble", "Stock, prix final et livraison sont précisés."],
              ["04", "Vous commandez", "Finalisez facilement votre demande sur WhatsApp."],
            ].map(([n, title, text]) => (
              <StaggerItem key={n}>
                <div className="group rounded-2xl border border-[#e7e7df] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#54b948]/20 hover:shadow-[0_12px_30px_rgba(24,49,39,0.06)] sm:p-7">
                  <span className="font-mono text-xs text-[#38669b]">ÉTAPE {n}</span>
                  <h3 className="mt-7 text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#737a74]">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerWrapper>
        </section>
      </ScrollReveal>

      {/* ─── CTA ENTREPRISE ─── */}
      <ScrollReveal>
        <section className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14 pb-16 sm:pb-24">
          <div className="relative overflow-hidden rounded-[28px] bg-[#10245d] px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
            <div className="absolute -right-14 -top-28 h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute -right-2 -top-16 h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <span className="text-xs font-medium tracking-[.2em] text-[#54b948]">POUR LES PROFESSIONNELS</span>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-.045em] sm:text-5xl">
                  Votre équipe mérite<br className="hidden sm:block" /> les bons outils.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
                  Équipez votre entreprise en informatique et bénéficiez d&apos;un accompagnement adapté à votre activité.
                </p>
              </div>
              <Link
                href="/entreprises"
                className="group inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-full bg-[#54b948] px-6 text-sm font-semibold text-[#17392f] transition-all hover:bg-white hover:-translate-y-0.5"
              >
                Parlons de votre projet <ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── FAQ ─── */}
      <ScrollReveal>
        <section className="border-t border-[#e8e7e1] bg-white py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-5 sm:px-8 lg:grid-cols-[.65fr_1.35fr] lg:px-14">
            <div>
              <span className="eyebrow">VOS QUESTIONS</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em]">Avant de vous décider.</h2>
            </div>
            <StaggerWrapper className="grid gap-3 sm:grid-cols-2">
              {[["Comment commander ?", "Choisissez un produit et contactez-nous sur WhatsApp. Nous confirmons votre commande avec vous."],
                ["Livrez-vous dans ma ville ?", "Contactez notre équipe pour confirmer les délais et frais selon votre ville."],
                ["Le produit est-il en stock ?", "La disponibilité est confirmée par notre équipe avant validation de votre commande."],
                ["Puis-je demander conseil ?", "Oui, indiquez votre budget et votre usage sur WhatsApp : nous vous aiderons à choisir."],
              ].map(([q, a]) => (
                <StaggerItem key={q}>
                  <details className="group rounded-xl border border-[#e8e9e4] p-5 transition hover:border-[#54b948]/20">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                      {q}
                      <CircleHelp size={17} className="shrink-0 text-[#289844] transition group-open:rotate-12" />
                    </summary>
                    <p className="mt-3 pr-5 text-sm leading-6 text-[#737a74]">{a}</p>
                  </details>
                </StaggerItem>
              ))}
            </StaggerWrapper>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── BOTTOM BAR ─── */}
      <div className="border-t border-[#e8e7e1] bg-[#f7f7f2] py-5">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-7 gap-y-2 px-5 text-xs text-[#747d75] sm:px-8 lg:justify-between lg:px-14">
          <span className="inline-flex items-center gap-2"><MapPin size={14} /> Yaoundé, Cameroun</span>
          <span>Ordinateurs · Smartphones · Solutions informatiques</span>
          <Link href="/entreprises" className="inline-flex items-center gap-2 font-medium text-[#1768b7] transition hover:text-[#289844]">
            Besoin d&apos;équiper une entreprise ? <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
