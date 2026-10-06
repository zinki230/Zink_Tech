import { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Users,
  Shield,
  TrendingUp,
  Headphones,
  CheckCircle,
  ArrowRight,
  Laptop,
  Monitor,
  Printer,
  Network,
  Server,
  HardDrive,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata: Metadata = {
  title: "Solutions Informatiques pour Entreprises au Cameroun | Zink Tech",
  description:
    "Équipez votre entreprise avec les meilleures solutions IT. Ordinateurs professionnels, serveurs, réseau, déploiement et maintenance. Devis sur mesure.",
  keywords:
    "solutions IT Cameroun, équipements entreprise, ordinateurs professionnels, serveurs, réseau entreprise, maintenance IT",
};

export default function EntreprisesPage() {
  const solutions = [
    {
      icon: Laptop,
      title: "Ordinateurs Professionnels",
      description:
        "HP EliteBook, Dell Latitude, Lenovo ThinkPad - Les meilleures stations de travail pour vos équipes",
      items: ["Laptops professionnels", "PC de bureau", "Workstations", "Ultrabooks"],
    },
    {
      icon: Monitor,
      title: "Écrans & Périphériques",
      description:
        "Écrans professionnels, claviers, souris, webcams et accessoires pour l'équipement complet de vos bureaux",
      items: ["Écrans 24\" - 27\" - 32\"", "Claviers & souris", "Webcams HD", "Docking stations"],
    },
    {
      icon: Printer,
      title: "Imprimantes & Scanners",
      description:
        "Imprimantes laser, multifonctions, scanners professionnels pour vos besoins d'impression",
      items: ["Imprimantes laser", "Multifonctions", "Scanners réseau", "Photocopieurs"],
    },
    {
      icon: Network,
      title: "Réseau & Connectivité",
      description:
        "Routeurs, switches, points d'accès Wi-Fi professionnels pour une infrastructure réseau fiable",
      items: ["Routeurs enterprise", "Switches managés", "Points d'accès Wi-Fi", "Câblage réseau"],
    },
    {
      icon: HardDrive,
      title: "Stockage & Sauvegarde",
      description:
        "Solutions de stockage NAS, serveurs de fichiers, sauvegardes automatiques pour protéger vos données",
      items: ["NAS Synology / QNAP", "Disques externes", "Solutions cloud", "Sauvegarde automatique"],
    },
    {
      icon: Server,
      title: "Serveurs & Infrastructure",
      description:
        "Serveurs Dell PowerEdge, HP ProLiant pour héberger vos applications et bases de données",
      items: ["Serveurs rack", "Serveurs tour", "Virtualisation", "Infrastructure cloud"],
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Prix Entreprise",
      description:
        "Tarifs dégressifs sur volume et conditions de paiement flexibles pour les entreprises",
    },
    {
      icon: Users,
      title: "Déploiement Clé en Main",
      description:
        "Configuration, installation et déploiement de tous vos équipements par nos techniciens",
    },
    {
      icon: Headphones,
      title: "Support Dédié",
      description:
        "Un interlocuteur unique pour gérer tous vos besoins et un support technique réactif",
    },
    {
      icon: TrendingUp,
      title: "Évolutivité",
      description:
        "Solutions évolutives qui grandissent avec votre entreprise et vos besoins futurs",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zink-blue to-blue-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/10 p-4">
                <Building2 className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Votre Partenaire Technologique & Solutions IT au Cameroun
            </h1>
            <p className="mb-8 text-lg text-blue-100 md:text-xl">
              Équipez votre entreprise avec les meilleures solutions informatiques.
              Ordinateurs, serveurs, réseau, déploiement et maintenance.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <WhatsAppButton
                size="xl"
                className="bg-white text-zink-blue hover:bg-gray-100"
                message={"Bonjour Zink Tech,\n\nJe souhaite obtenir un devis pour mon entreprise.\n\nType de besoin :\nNombre d’équipements :\nVille :\n\nMerci."}
              >
                Demander un devis gratuit
              </WhatsAppButton>
              <WhatsAppButton
                size="xl"
                className="bg-white/10 hover:bg-white/20 border border-white/30"
                message={"Bonjour Zink Tech,\n\nJe souhaite discuter des solutions informatiques pour mon entreprise.\n\nMerci."}
              >
                Parler à un conseiller
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Solutions Informatiques Complètes
            </h2>
            <p className="text-lg text-gray-600">
              Tout l'équipement IT dont votre entreprise a besoin
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <Card key={index} className="group transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-zink-blue/10 transition-colors group-hover:bg-zink-blue">
                    <solution.icon className="h-7 w-7 text-zink-blue transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{solution.title}</h3>
                  <p className="mb-4 text-gray-600">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-zink-green" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Pourquoi les Entreprises Choisissent Zink Tech
            </h2>
            <p className="text-lg text-gray-600">
              Un service professionnel adapté aux besoins des entreprises
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zink-green/10">
                    <benefit.icon className="h-8 w-8 text-zink-green" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Nos Services Complets</h2>
            <p className="text-lg text-gray-600">
              De l'audit à la maintenance, nous gérons votre IT de bout en bout
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 text-4xl font-bold text-zink-blue">01</div>
                <h3 className="mb-3 text-xl font-semibold">Audit & Conseil</h3>
                <p className="mb-4 text-gray-600">
                  Analyse de vos besoins, recommandations et définition de
                  l'architecture IT adaptée à votre activité.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-zink-green" />
                    Audit de l'existant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-zink-green" />
                    Recommandations techniques
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-zink-green" />
                    Devis détaillé
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="mb-4 text-4xl font-bold text-zink-blue">02</div>
                <h3 className="mb-3 text-xl font-semibold">
                  Déploiement & Installation
                </h3>
                <p className="mb-4 text-gray-600">
                  Configuration, installation sur site, mise en réseau et
                  formation de vos équipes par nos techniciens.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-zink-green" />
                    Configuration complète
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-zink-green" />
                    Installation sur site
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-zink-green" />
                    Formation utilisateurs
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="mb-4 text-4xl font-bold text-zink-blue">03</div>
                <h3 className="mb-3 text-xl font-semibold">
                  Support & Maintenance
                </h3>
                <p className="mb-4 text-gray-600">
                  Support technique continu, maintenance préventive et
                  intervention rapide en cas de problème.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-zink-green" />
                    Support téléphonique
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-zink-green" />
                    Maintenance préventive
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-zink-green" />
                    Intervention sur site
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-zink-blue to-blue-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Prêt à Équiper Votre Entreprise ?
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              Contactez-nous pour un devis personnalisé et découvrez comment nous
              pouvons vous aider à optimiser votre infrastructure IT.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <WhatsAppButton
                size="xl"
                className="bg-white text-zink-blue hover:bg-gray-100"
                message={"Bonjour Zink Tech,\n\nJe souhaite obtenir un devis pour mon entreprise.\n\nType de besoin :\nNombre d’équipements :\nVille :\n\nMerci."}
              >
                Demander un devis gratuit
                <ArrowRight className="h-5 w-5" />
              </WhatsAppButton>
              <WhatsAppButton
                size="xl"
                className="bg-white/10 hover:bg-white/20 border border-white/30"
                message={"Bonjour Zink Tech,\n\nJe souhaite obtenir un devis pour mon entreprise.\n\nType de besoin :\nNombre d’équipements :\nVille :\n\nMerci."}
              >
                Parler à un conseiller
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
