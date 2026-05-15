"use client";

import type { Tool, Feature } from "@/data/tools";
import { getVsPageSlug } from "@/data/tools";
import AffiliateButton from "@/components/AffiliateButton";

type Props = {
  tool: Tool;
  allTools: Tool[];
  year: number;
};

// ─── Feature labels ───────────────────────────────────────────────────────────

const FEATURE_LABELS: Record<keyof Feature, string> = {
  automation: "Automation marketing",
  landingPages: "Pages de destination",
  sms: "SMS marketing",
  crmIntegre: "CRM intégré",
  abTesting: "A/B Testing",
  templates: "Templates email",
  api: "API disponible",
  supportFrancais: "Support en français",
  rgpd: "Conformité RGPD",
  dragAndDrop: "Éditeur drag-and-drop",
  segmentation: "Segmentation avancée",
  rapportsAvances: "Rapports avancés",
};

const FEATURE_KEYS = Object.keys(FEATURE_LABELS) as (keyof Feature)[];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ note }: { note: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${note} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i <= Math.round(note) ? "#FACC15" : "none"}
          stroke={i <= Math.round(note) ? "#FACC15" : "#D1D5DB"}
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-semibold text-gray-700">{note}/5</span>
    </span>
  );
}

function FeatureIcon({ value }: { value: boolean }) {
  return value ? (
    <span className="flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#16A34A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="Disponible"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  ) : (
    <span className="flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#D1D5DB"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="Non disponible"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  );
}

function formatPrice(prixDepart: number | null, planGratuit: boolean): string {
  if (planGratuit && prixDepart === null) return "Gratuit";
  if (prixDepart === null) return "Sur devis";
  if (prixDepart === 0) return "Gratuit";
  return `À partir de ${prixDepart} €/mois`;
}

// Find the best tool for a given feature criterion among a list
function bestForFeature(
  tools: Tool[],
  predicate: (t: Tool) => boolean
): Tool | null {
  return (
    tools
      .filter(predicate)
      .sort((a, b) => b.noteGlobale - a.noteGlobale)[0] ?? null
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function AlternativePageClient({ tool, allTools, year }: Props) {
  const alternatives = allTools
    .filter((t) => t.slug !== tool.slug)
    .sort((a, b) => b.noteGlobale - a.noteGlobale);

  const recommended = alternatives[0];

  // Features that differ between at least two tools (current + alternatives)
  const allInComparison = [tool, ...alternatives];
  const differingFeatures = FEATURE_KEYS.filter((key) => {
    const values = allInComparison.map((t) => t.features[key]);
    return values.some((v) => v !== values[0]);
  });

  // "Comment choisir" recommendations — from alternatives only
  const budgetPick = bestForFeature(
    alternatives,
    (t) => t.planGratuit || t.prixDepart === 0
  );
  const smsPick = bestForFeature(alternatives, (t) => t.features.sms);
  const frenchPick = bestForFeature(
    alternatives,
    (t) => t.features.supportFrancais
  );
  const automationPick = bestForFeature(
    alternatives,
    (t) => t.features.automation
  );

  const choiceBlocs = [
    {
      icon: "💰",
      titre: "Budget serré ou démarrage",
      description: "Vous voulez commencer gratuitement ou limiter vos coûts.",
      pick: budgetPick,
      reason: budgetPick?.planGratuit
        ? `${budgetPick.nom} offre un plan gratuit permanent.`
        : `${budgetPick?.nom} propose le prix de départ le plus bas.`,
    },
    {
      icon: "📱",
      titre: "Besoin de SMS marketing",
      description:
        "Vous souhaitez combiner email et SMS dans un seul outil.",
      pick: smsPick,
      reason: `${smsPick?.nom} intègre nativement le SMS marketing.`,
    },
    {
      icon: "🇫🇷",
      titre: "Support en français indispensable",
      description: "Vous préférez un support client francophone.",
      pick: frenchPick,
      reason: `${frenchPick?.nom} propose un support en français.`,
    },
    {
      icon: "⚡",
      titre: "Automation marketing avancée",
      description:
        "Vous avez besoin de workflows complexes et de segmentation poussée.",
      pick: automationPick,
      reason: `${automationPick?.nom} est reconnu pour ses capacités d'automation.`,
    },
  ].filter((b) => b.pick !== null) as {
    icon: string;
    titre: string;
    description: string;
    pick: Tool;
    reason: string;
  }[];

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-200 bg-white px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
              <li>
                <a href="/" className="hover:text-gray-800 hover:underline">
                  Accueil
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a
                  href="/alternatives"
                  className="hover:text-gray-800 hover:underline"
                >
                  Alternatives
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-gray-800">
                Alternative à {tool.nom}
              </li>
            </ol>
          </nav>

          {/* H1 */}
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
            Meilleure alternative à {tool.nom} en {year}
          </h1>
          <p className="mb-8 text-gray-500">
            Vous envisagez de quitter {tool.nom} ? Voici les{" "}
            {alternatives.length} meilleures alternatives selon votre profil.
          </p>

          {/* Current tool summary */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Outil actuel
            </p>
            <p className="mb-1 text-lg font-bold text-gray-900">{tool.nom}</p>
            <p className="mb-3 text-sm text-gray-600">{tool.descriptionCourte}</p>
            <div className="flex flex-wrap items-center gap-3">
              <StarRating note={tool.noteGlobale} />
              <span className="text-sm text-gray-700">
                {formatPrice(tool.prixDepart, tool.planGratuit)}
              </span>
              {tool.planGratuit && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  Plan gratuit
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── POURQUOI CHANGER ? ────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Pourquoi chercher une alternative à {tool.nom} ?
          </h2>
          <p className="mb-5 text-sm text-gray-500">
            Si vous reconnaissez l&apos;un de ces points, une alternative s&apos;impose.
          </p>
          <ul className="space-y-2">
            {tool.inconvenients.map((inc) => (
              <li
                key={inc}
                className="flex gap-3 rounded-lg border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-gray-700"
              >
                <span className="mt-0.5 shrink-0 text-orange-500">⚠</span>
                {inc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── ALTERNATIVES CARDS ───────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Les meilleures alternatives à {tool.nom}
          </h2>
          <div className="space-y-4">
            {alternatives.map((alt) => {
              const isRecommended = alt.slug === recommended.slug;
              const vsSlug = getVsPageSlug(alt.slug, tool.slug);
              return (
                <div
                  key={alt.slug}
                  className={`relative rounded-xl border p-5 ${
                    isRecommended
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute right-4 top-4 rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                      Recommandé
                    </span>
                  )}

                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {alt.nom}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-600">
                        {alt.descriptionCourte}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <StarRating note={alt.noteGlobale} />
                    <span className="text-sm text-gray-700">
                      {formatPrice(alt.prixDepart, alt.planGratuit)}
                    </span>
                    {alt.planGratuit && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                        Plan gratuit
                      </span>
                    )}
                  </div>

                  <ul className="mb-4 space-y-1">
                    {alt.avantages.slice(0, 3).map((a) => (
                      <li
                        key={a}
                        className="flex gap-2 text-sm text-gray-700"
                      >
                        <span className="mt-0.5 shrink-0 text-green-600">
                          ✓
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="flex-1">
                      <AffiliateButton tool={alt} variant="primary" />
                    </div>
                    <a
                      href={`/${vsSlug}`}
                      className="flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      {alt.nom} vs {tool.nom} →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TABLEAU COMPARATIF ───────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Tableau comparatif des alternatives
          </h2>
          <p className="mb-5 text-sm text-gray-500">
            Seules les fonctionnalités qui diffèrent entre les outils sont
            affichées.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-max text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="sticky left-0 z-10 min-w-[160px] bg-gray-50 py-3 pl-4 pr-2 text-left font-semibold text-gray-600">
                    Fonctionnalité
                  </th>
                  {/* Current tool column — muted */}
                  <th className="min-w-[110px] px-4 py-3 text-center font-semibold text-gray-400">
                    {tool.nom}
                    <span className="ml-1 text-[10px] font-normal">(actuel)</span>
                  </th>
                  {alternatives.map((alt) => (
                    <th
                      key={alt.slug}
                      className={`min-w-[110px] px-4 py-3 text-center font-semibold ${
                        alt.slug === recommended.slug
                          ? "text-green-700"
                          : "text-gray-900"
                      }`}
                    >
                      {alt.nom}
                      {alt.slug === recommended.slug && (
                        <span className="ml-1 text-[10px] font-normal text-green-600">
                          ★
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {differingFeatures.map((key, idx) => (
                  <tr
                    key={key}
                    className={
                      idx % 2 === 0
                        ? "border-b border-gray-100"
                        : "border-b border-gray-100 bg-gray-50/50"
                    }
                  >
                    <td className="sticky left-0 z-10 bg-inherit py-3 pl-4 pr-2 font-medium text-gray-700">
                      {FEATURE_LABELS[key]}
                    </td>
                    <td className="px-4 py-3 opacity-50">
                      <FeatureIcon value={tool.features[key]} />
                    </td>
                    {alternatives.map((alt) => (
                      <td key={alt.slug} className="px-4 py-3">
                        <FeatureIcon value={alt.features[key]} />
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Score row */}
                <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
                  <td className="sticky left-0 z-10 bg-gray-50 py-3 pl-4 pr-2 text-gray-800">
                    Note globale
                  </td>
                  <td className="px-4 py-3 text-center opacity-50">
                    <span className="text-sm text-gray-600">
                      {tool.noteGlobale}/5
                    </span>
                  </td>
                  {alternatives.map((alt) => (
                    <td key={alt.slug} className="px-4 py-3 text-center">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-sm font-bold ${
                          alt.slug === recommended.slug
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {alt.noteGlobale}/5
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── COMMENT CHOISIR ──────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Comment choisir votre alternative ?
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {choiceBlocs.map((bloc) => (
              <div
                key={bloc.titre}
                className="rounded-xl border border-gray-200 p-5"
              >
                <p className="mb-1 text-2xl">{bloc.icon}</p>
                <p className="mb-1 font-semibold text-gray-900">{bloc.titre}</p>
                <p className="mb-2 text-sm text-gray-500">{bloc.description}</p>
                <p className="mb-4 text-sm text-gray-700">
                  <span className="font-medium">Notre choix :</span>{" "}
                  {bloc.reason}
                </p>
                <AffiliateButton tool={bloc.pick} variant="outline" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGAL DISCLOSURE ─────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-gray-50 px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs leading-relaxed text-gray-400">
            <strong className="font-medium text-gray-500">
              Disclosure affiliation :
            </strong>{" "}
            Certains liens présents sur cette page sont des liens affiliés. Si
            vous cliquez sur un lien affilié et souscrivez à un service, nous
            pouvons percevoir une commission — sans coût supplémentaire pour
            vous. Cette rémunération n&apos;influence pas nos comparatifs, qui
            reposent sur des critères objectifs. Conformément à l&apos;article L.
            121-1 du Code de la consommation et aux règles de Google sur les
            liens sponsorisés, tous les liens affiliés sont signalés par
            l&apos;attribut{" "}
            <code className="rounded bg-gray-100 px-1 text-gray-500">
              rel=&quot;sponsored&quot;
            </code>
            .
          </p>
        </div>
      </footer>
    </main>
  );
}
