import type { Metadata } from "next";
import { getVsPageSlug, VS_COMBINATIONS, getAllTools } from "@/data/tools";
import { getAllProfiles } from "@/data/profiles";

export const metadata: Metadata = {
  title: "Comparatif outils emailing — Trouvez le meilleur pour votre profil",
  description:
    "Comparatifs détaillés, recommandations par profil et simulateurs de coût pour choisir le meilleur outil emailing en 2026.",
  alternates: { canonical: "/" },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const POPULAR_VS = [
  { slugA: "brevo", slugB: "mailchimp", labelA: "Brevo", labelB: "Mailchimp" },
  { slugA: "mailchimp", slugB: "mailerlite", labelA: "Mailchimp", labelB: "MailerLite" },
  { slugA: "brevo", slugB: "mailerlite", labelA: "Brevo", labelB: "MailerLite" },
  { slugA: "getresponse", slugB: "mailerlite", labelA: "MailerLite", labelB: "GetResponse" },
  { slugA: "getresponse", slugB: "systemeio", labelA: "Systeme.io", labelB: "GetResponse" },
  { slugA: "activecampaign", slugB: "mailchimp", labelA: "ActiveCampaign", labelB: "Mailchimp" },
] as const;

const POPULAR_ALTERNATIVES = [
  { slug: "mailchimp", nom: "Mailchimp" },
  { slug: "brevo", nom: "Brevo" },
  { slug: "activecampaign", nom: "ActiveCampaign" },
  { slug: "getresponse", nom: "GetResponse" },
  { slug: "convertkit", nom: "Kit (ConvertKit)" },
];

const PROFILE_EMOJIS: Record<string, string> = {
  freelance: "💼",
  tpe: "🏪",
  ecommerce: "🛒",
  startup: "🚀",
  association: "🤝",
  artisan: "🔨",
  coach: "🎯",
  formateur: "📚",
  createur: "✍️",
  photographe: "📸",
  therapeute: "🌿",
  consultant: "💡",
  infopreneur: "📊",
  agence: "🏢",
  restauration: "🍽️",
};

const FREE_TOOLS = [
  {
    icon: "🎯",
    titre: "Quel outil emailing pour moi ?",
    description: "5 questions pour trouver l'outil adapté à votre profil et budget.",
    href: "/quiz",
    label: "Faire le quiz",
  },
  {
    icon: "🧮",
    titre: "Simulateur de coût",
    description: "Comparez les prix en temps réel selon votre volume d'envoi.",
    href: "/simulateur-cout",
    label: "Simuler mon coût",
  },
  {
    icon: "⚖️",
    titre: "Comparateur d'outils",
    description: "Comparez deux outils côte à côte en détail.",
    href: "/brevo-vs-mailchimp",
    label: "Comparer maintenant",
  },
] as const;

const TRUST_BLOCKS = [
  {
    icon: "✅",
    titre: "Données vérifiées",
    texte:
      "Tous les prix et fonctionnalités sont vérifiés directement sur les sites officiels des outils et mis à jour régulièrement.",
  },
  {
    icon: "⚖️",
    titre: "Indépendant",
    texte:
      "Nos comparatifs reposent sur des critères objectifs. Les liens affiliés ne biaisent pas nos recommandations.",
  },
  {
    icon: "🔄",
    titre: "Mis à jour régulièrement",
    texte:
      "Le marché de l'emailing évolue vite. Nous révisons nos comparatifs à chaque changement tarifaire ou fonctionnel majeur.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const profiles = getAllProfiles();
  const toolNameMap = Object.fromEntries(getAllTools().map((t) => [t.slug, t.nom]));

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500">
            10 outils · 18 comparatifs · 15 profils
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Trouvez le meilleur outil emailing{" "}
            <span className="text-gray-500">pour votre profil</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-500">
            Comparatifs détaillés, simulateurs de coût et recommandations
            personnalisées pour choisir sans se tromper.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#comparatifs"
              className="flex w-full items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 sm:w-auto"
            >
              Voir tous les comparatifs
            </a>
            <a
              href="/meilleur-emailing/freelance"
              className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 sm:w-auto"
            >
              Quel outil pour moi ? →
            </a>
          </div>
        </div>
      </section>

      {/* ── OUTILS GRATUITS ─────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Nos outils gratuits
            </h2>
            <p className="text-sm text-gray-500">
              Des outils interactifs pour choisir sans effort.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {FREE_TOOLS.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-sm"
              >
                <span className="mb-3 text-3xl" aria-hidden="true">{tool.icon}</span>
                <p className="mb-1 font-semibold text-gray-900">{tool.titre}</p>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500">
                  {tool.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {tool.label}
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARATIFS POPULAIRES ───────────────────────────────────────── */}
      <section id="comparatifs" className="border-b border-gray-100 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Comparatifs populaires
            </h2>
            <p className="text-sm text-gray-500">
              Les face-à-face les plus recherchés pour choisir votre outil emailing.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_VS.map(({ slugA, slugB, labelA, labelB }) => {
              const href = `/${getVsPageSlug(slugA, slugB)}`;
              return (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 transition-all hover:border-gray-300 hover:shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {labelA}{" "}
                      <span className="font-normal text-gray-400">vs</span>{" "}
                      {labelB}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      Comparatif complet
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-gray-300 transition-colors group-hover:text-gray-600"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <a
              href="#tous-les-comparatifs"
              className="text-sm text-gray-400 underline underline-offset-2 hover:text-gray-700"
            >
              Voir tous les comparatifs →
            </a>
          </div>
        </div>
      </section>

      {/* ── PAR PROFIL ───────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Recommandations par profil
            </h2>
            <p className="text-sm text-gray-500">
              Des recommandations adaptées à votre activité et votre budget.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {profiles.map((profil) => (
              <a
                key={profil.slug}
                href={`/meilleur-emailing/${profil.slug}`}
                className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-4 text-center transition-all hover:border-gray-300 hover:shadow-sm"
              >
                <span className="text-2xl" aria-hidden="true">
                  {PROFILE_EMOJIS[profil.slug] ?? "📧"}
                </span>
                <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                  {profil.nom}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALTERNATIVES POPULAIRES ──────────────────────────────────────── */}
      <section className="border-b border-gray-100 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Alternatives populaires
            </h2>
            <p className="text-sm text-gray-500">
              Vous envisagez de changer d&apos;outil ? Découvrez les meilleures
              alternatives.
            </p>
          </div>
          <div className="mx-auto max-w-xl divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white">
            {POPULAR_ALTERNATIVES.map(({ slug, nom }) => (
              <a
                key={slug}
                href={`/alternative/${slug}`}
                className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-800">
                  Alternatives à{" "}
                  <span className="font-semibold text-gray-900">{nom}</span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-gray-300 transition-colors group-hover:text-gray-600"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS FAIRE CONFIANCE ───────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Pourquoi nous faire confiance ?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TRUST_BLOCKS.map((b) => (
              <div
                key={b.titre}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <p className="mb-3 text-3xl">{b.icon}</p>
                <p className="mb-2 font-semibold text-gray-900">{b.titre}</p>
                <p className="text-sm leading-relaxed text-gray-500">{b.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOUS LES COMPARATIFS ────────────────────────────────────────── */}
      <section id="tous-les-comparatifs" className="border-b border-gray-100 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Tous les comparatifs
            </h2>
            <p className="text-sm text-gray-500">
              18 face-à-face détaillés entre les principaux outils emailing.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {VS_COMBINATIONS.map(([slugA, slugB]) => {
              const href = `/${getVsPageSlug(slugA, slugB)}`;
              const nomA = toolNameMap[slugA] ?? slugA;
              const nomB = toolNameMap[slugB] ?? slugB;
              return (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-1.5 py-1.5 text-sm text-gray-600 hover:text-gray-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-300 group-hover:text-gray-500" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <span>
                    <span className="font-medium">{nomA}</span>
                    {" "}
                    <span className="text-gray-400">vs</span>
                    {" "}
                    <span className="font-medium">{nomB}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-white px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
            <a href="/mentions-legales" className="hover:text-gray-700 hover:underline">
              Mentions légales
            </a>
            <a href="/politique-confidentialite" className="hover:text-gray-700 hover:underline">
              Politique de confidentialité
            </a>
            <a href="/disclosure" className="hover:text-gray-700 hover:underline">
              Disclosure affiliation
            </a>
          </div>
          <p className="text-center text-xs leading-relaxed text-gray-400">
            <strong className="font-medium text-gray-500">Affiliation :</strong>{" "}
            Certains liens de ce site sont des liens affiliés. Nous percevons une
            commission si vous souscrivez via ces liens, sans surcoût pour vous.
            Tous les liens affiliés portent l&apos;attribut{" "}
            <code className="rounded bg-gray-100 px-1">rel=&quot;sponsored&quot;</code>{" "}
            conformément aux règles Google et à la loi française.
          </p>
        </div>
      </footer>

    </div>
  );
}
