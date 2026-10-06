import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Fingerprint, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { adminPasswordSetupState } from "@/lib/admin-auth";
import { createInitialAdminPassword, loginAdmin } from "@/app/admin/auth-actions";

export const metadata: Metadata = {
  title: "Connexion à l’administration",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ erreur?: string; configuration?: string; creation?: string; verrouille?: string; cree?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const query = await searchParams;
  const setupState = adminPasswordSetupState();

  return (
    <main className="min-h-screen bg-[#f4f6fa] px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto grid min-h-[min(760px,calc(100vh-6rem))] max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_100px_rgba(15,34,85,.12)] lg:grid-cols-[1.05fr_.95fr]">
        <section className="flex flex-col justify-between bg-[#10245d] p-8 text-white sm:p-12">
          <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm text-white/75 hover:text-white">
            <ArrowLeft size={16} /> Retour à la boutique
          </Link>
          <div className="my-10">
            <div className="inline-flex rounded-2xl bg-white p-3 shadow-xl">
              <Image src="/brand/zink-tech-logo.jpg" alt="Logo Zink Tech : votre partenaire digital" width={420} height={372} priority className="h-auto w-[min(100%,390px)]" />
            </div>
            <p className="mt-8 max-w-md text-sm leading-7 text-white/75">
              Gérez le catalogue, suivez les demandes clients et gardez votre boutique à jour depuis un seul espace.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/65">
            <ShieldCheck size={16} className="text-[#54b948]" />
            Espace privé protégé par authentification
          </div>
        </section>

        <section className="flex flex-col justify-center px-7 py-10 sm:px-12 lg:px-14">
          <span className="text-xs font-semibold uppercase tracking-[.2em] text-[#2872bf]">ESPACE ADMINISTRATEUR</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-.045em] text-[#142451]">{setupState === "setup" ? "Créez votre accès." : "Content de vous revoir."}</h1>
          <p className="mt-3 text-sm leading-6 text-[#6b7382]">{setupState === "setup" ? "Choisissez votre mot de passe administrateur personnel." : "Connectez-vous pour administrer votre boutique Zink Tech."}</p>

          {setupState === "unconfigured" ? (
            <div className="mt-8 rounded-2xl border border-[#f0d99b] bg-[#fff8e4] p-5 text-sm leading-6 text-[#715418]">
              <div className="font-semibold">Configuration nécessaire avant connexion</div>
              <p className="mt-2">Ajoutez une clé aléatoire <code className="rounded bg-white/70 px-1">ADMIN_SESSION_SECRET</code> (32 caractères minimum) à votre fichier <code className="rounded bg-white/70 px-1">.env.local</code>, puis redémarrez le serveur.</p>
            </div>
          ) : setupState === "setup" ? (
            <form action={createInitialAdminPassword} className="mt-8 space-y-4">
              {query.creation === "confirmation" && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">Les deux nouveaux mots de passe ne correspondent pas.</p>}
              {query.creation === "longueur" && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">Choisissez au moins 12 caractères.</p>}
              {query.creation === "erreur" && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">Impossible d’enregistrer votre mot de passe. Réessayez.</p>}
              {query.creation === "local" && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">La création initiale est autorisée uniquement depuis ce site ouvert en local.</p>}
              {query.verrouille && <p role="alert" className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">La création du mot de passe a déjà été verrouillée.</p>}
              <div>
                <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-[#30394b]">Choisissez votre mot de passe</label>
                <input id="newPassword" name="password" type="password" autoComplete="new-password" minLength={12} required autoFocus className="h-12 w-full rounded-xl border border-[#dfe4ed] bg-white px-4 text-sm outline-none transition focus:border-[#2872bf] focus:ring-4 focus:ring-[#2872bf]/10" placeholder="12 caractères minimum" />
              </div>
              <div>
                <label htmlFor="confirmation" className="mb-2 block text-sm font-medium text-[#30394b]">Confirmez votre nouveau mot de passe</label>
                <input id="confirmation" name="confirmation" type="password" autoComplete="new-password" minLength={12} required className="h-12 w-full rounded-xl border border-[#dfe4ed] bg-white px-4 text-sm outline-none transition focus:border-[#2872bf] focus:ring-4 focus:ring-[#2872bf]/10" placeholder="Saisissez-le une seconde fois" />
              </div>
              <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#173986] text-sm font-semibold text-white transition hover:bg-[#10245d]">
                <KeyRound size={16} /> Créer mon mot de passe unique
              </button>
              <div className="flex gap-3 rounded-xl border border-[#dce8f5] bg-[#f5f9ff] p-4 text-xs leading-5 text-[#51617a]">
                <Fingerprint size={18} className="mt-0.5 shrink-0 text-[#2872bf]" />
                <p>Créez votre mot de passe maintenant. Cette étape est définitive : aucun autre mot de passe ne pourra ensuite être créé depuis l’interface.</p>
              </div>
            </form>
          ) : (
            <form action={loginAdmin} className="mt-8 space-y-5">
              {query.cree && <p role="status" className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">Votre mot de passe unique est créé. La création est désormais verrouillée.</p>}
              {query.verrouille && <p role="status" className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">Un mot de passe administrateur a déjà été créé. La création d’un autre mot de passe est désactivée.</p>}
              {query.erreur && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">Mot de passe incorrect. Réessayez.</p>}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#30394b]">Mot de passe administrateur</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus className="h-12 w-full rounded-xl border border-[#dfe4ed] bg-white px-4 text-sm outline-none transition focus:border-[#2872bf] focus:ring-4 focus:ring-[#2872bf]/10" placeholder="Saisissez votre mot de passe" />
              </div>
              <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#173986] text-sm font-semibold text-white transition hover:bg-[#10245d]">
                <LockKeyhole size={16} /> Ouvrir ma session
              </button>
            </form>
          )}
          {query.configuration && setupState !== "unconfigured" && <p role="alert" className="mt-4 text-sm text-red-700">La configuration administrateur n’est pas valide. Vérifiez les deux variables dans <code>.env.local</code>.</p>}
          <p className="mt-8 text-xs leading-5 text-[#8a92a0]">{setupState === "setup" ? "Seule une empreinte sécurisée du mot de passe est conservée. La session expirera après 8 heures." : "Les identifiants ne sont pas enregistrés dans le navigateur. La session expire après 8 heures."}</p>
        </section>
      </div>
    </main>
  );
}
