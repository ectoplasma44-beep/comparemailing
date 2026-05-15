"use client";

import { useState } from "react";
import type { Tool, Feature } from "@/data/tools";
import AffiliateButton from "@/components/AffiliateButton";

type Props = {
  toolA: Tool;
  toolB: Tool;
  year: number;
};

type Tab = "features" | "pricing" | "verdict";

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function countFeatures(features: Feature): number {
  return FEATURE_KEYS.filter((k) => features[k]).length;
}

function getVerdict(
  toolA: Tool,
  toolB: Tool
): { winner: Tool | null; reason: string } {
  const scoreA = countFeatures(toolA.features);
  const scoreB = countFeatures(toolB.features);
  const weightedA = toolA.noteGlobale * 10 + scoreA;
  const weightedB = toolB.noteGlobale * 10 + scoreB;
  const delta = Math.abs(weightedA - weightedB);

  if (delta < 2) {
    return {
      winner: null,
      reason: `${toolA.nom} et ${toolB.nom} sont très proches en note globale et en fonctionnalités. Le choix final dépend de vos priorités spécifiques (budget, langue de support, intégrations).`,
    };
  }

  const winner = weightedA >= weightedB ? toolA : toolB;
  const loser = winner === toolA ? toolB : toolA;
  const parts: string[] = [];

  if (winner.noteGlobale > loser.noteGlobale) {
    parts.push(
      `une meilleure note globale (${winner.noteGlobale}/5 contre ${loser.noteGlobale}/5)`
    );
  }
  if (countFeatures(winner.features) > countFeatures(loser.features)) {
    parts.push(
      `un score fonctionnel supérieur (${countFeatures(winner.features)}/12 contre ${countFeatures(loser.features)}/12)`
    );
  }
  if (winner.planGratuit && !loser.planGratuit) {
    parts.push("un plan gratuit disponible");
  }

  const reason =
    parts.length > 0
      ? `${winner.nom} l'emporte grâce à ${parts.join(" et ")}.`
      : `${winner.nom} obtient un score légèrement supérieur dans notre évaluation globale.`;

  return { winner, reason };
}

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
        width="18"
        height="18"
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
        width="18"
        height="18"
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

// ─── Sections ─────────────────────────────────────────────────────────────────

function FeaturesTab({ toolA, toolB }: { toolA: Tool; toolB: Tool }) {
  const scoreA = countFeatures(toolA.features);
  const scoreB = countFeatures(toolB.features);

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="py-3 pl-4 pr-2 text-left font-semibold text-gray-600">
                Fonctionnalité
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-900">
                {toolA.nom}
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-900">
                {toolB.nom}
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURE_KEYS.map((key, idx) => (
              <tr
                key={key}
                className={
                  idx % 2 === 0
                    ? "border-b border-gray-100"
                    : "border-b border-gray-100 bg-gray-50/50"
                }
              >
                <td className="py-3 pl-4 pr-2 text-gray-700">
                  {FEATURE_LABELS[key]}
                </td>
                <td className="px-4 py-3">
                  <FeatureIcon value={toolA.features[key]} />
                </td>
                <td className="px-4 py-3">
                  <FeatureIcon value={toolB.features[key]} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
              <td className="py-3 pl-4 pr-2 text-gray-800">Score total</td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-sm font-bold ${
                    scoreA >= scoreB
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {scoreA}/12
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-sm font-bold ${
                    scoreB >= scoreA
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {scoreB}/12
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[toolA, toolB].map((tool) => (
          <div key={tool.slug} className="rounded-xl border border-gray-200 p-5">
            <h3 className="mb-4 font-semibold text-gray-900">{tool.nom}</h3>
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-700">
                Avantages
              </p>
              <ul className="space-y-1.5">
                {tool.avantages.map((a) => (
                  <li key={a} className="flex gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 shrink-0 text-green-600">✓</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-600">
                Inconvénients
              </p>
              <ul className="space-y-1.5">
                {tool.inconvenients.map((inc) => (
                  <li key={inc} className="flex gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 shrink-0 text-red-400">✗</span>
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingTab({ toolA, toolB }: { toolA: Tool; toolB: Tool }) {
  return (
    <div>
      <p className="mb-5 text-center text-xs text-gray-400">
        💡 Prix vérifiés sur les sites officiels — susceptibles d&apos;évoluer.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[toolA, toolB].map((tool) => (
          <div key={tool.slug}>
            <h3 className="mb-3 font-semibold text-gray-900">{tool.nom}</h3>
            <div className="space-y-3">
              {tool.pricing.map((tier) => (
                <div
                  key={tier.nom}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {tier.nom}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {tier.prixMois === 0
                        ? "Gratuit"
                        : tier.prixMois === null
                        ? "Sur devis"
                        : `${tier.prixMois} €/mois`}
                    </span>
                  </div>
                  {tier.contacts !== null && (
                    <p className="text-xs text-gray-500">
                      Jusqu&apos;à {tier.contacts.toLocaleString("fr-FR")} contacts
                    </p>
                  )}
                  {tier.emailsMois !== null && (
                    <p className="text-xs text-gray-500">
                      {tier.emailsMois.toLocaleString("fr-FR")} emails/mois
                    </p>
                  )}
                  {tier.note && (
                    <p className="mt-1.5 text-xs text-gray-600">{tier.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerdictTab({ toolA, toolB }: { toolA: Tool; toolB: Tool }) {
  const { winner, reason } = getVerdict(toolA, toolB);

  const contextualCriteria: { label: string; conditionA: boolean; conditionB: boolean; msgA: string; msgB: string }[] = [
    {
      label: "Budget serré",
      conditionA: toolA.planGratuit,
      conditionB: toolB.planGratuit,
      msgA: `${toolA.nom} propose un plan gratuit.`,
      msgB: `${toolB.nom} propose un plan gratuit.`,
    },
    {
      label: "Support en français",
      conditionA: toolA.features.supportFrancais,
      conditionB: toolB.features.supportFrancais,
      msgA: `${toolA.nom} offre un support en français.`,
      msgB: `${toolB.nom} offre un support en français.`,
    },
    {
      label: "Automation avancée",
      conditionA: toolA.features.automation,
      conditionB: toolB.features.automation,
      msgA: `${toolA.nom} inclut l'automation.`,
      msgB: `${toolB.nom} inclut l'automation.`,
    },
    {
      label: "SMS marketing",
      conditionA: toolA.features.sms,
      conditionB: toolB.features.sms,
      msgA: `${toolA.nom} intègre les SMS.`,
      msgB: `${toolB.nom} intègre les SMS.`,
    },
    {
      label: "CRM intégré",
      conditionA: toolA.features.crmIntegre,
      conditionB: toolB.features.crmIntegre,
      msgA: `${toolA.nom} inclut un CRM natif.`,
      msgB: `${toolB.nom} inclut un CRM natif.`,
    },
  ];

  const relevantCriteria = contextualCriteria.filter(
    (c) => c.conditionA !== c.conditionB
  );

  return (
    <div className="space-y-8">
      <div
        className={`rounded-xl p-6 ${
          winner
            ? "border border-green-200 bg-green-50"
            : "border border-blue-200 bg-blue-50"
        }`}
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Notre verdict
        </p>
        {winner ? (
          <p className="mb-2 text-xl font-bold text-green-800">
            🏆 {winner.nom} remporte ce comparatif
          </p>
        ) : (
          <p className="mb-2 text-xl font-bold text-blue-800">
            🤝 Match nul — deux excellents choix
          </p>
        )}
        <p className="text-gray-700">{reason}</p>
      </div>

      {relevantCriteria.length > 0 && (
        <div>
          <h3 className="mb-4 font-semibold text-gray-900">
            Critères différenciants
          </h3>
          <div className="space-y-3">
            {relevantCriteria.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-4"
              >
                <span className="mt-0.5 shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  {c.label}
                </span>
                <p className="text-sm text-gray-700">
                  {c.conditionA ? (
                    <>
                      <strong>{toolA.nom}</strong> ✓ —{" "}
                      <strong>{toolB.nom}</strong> ✗
                    </>
                  ) : (
                    <>
                      <strong>{toolA.nom}</strong> ✗ —{" "}
                      <strong>{toolB.nom}</strong> ✓
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-4 font-semibold text-gray-900">
          Prêt à choisir ?
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="mb-3 text-sm font-medium text-gray-700">
              {toolA.nom}
            </p>
            <AffiliateButton
              tool={toolA}
              variant={winner?.slug === toolA.slug ? "primary" : "outline"}
            />
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="mb-3 text-sm font-medium text-gray-700">
              {toolB.nom}
            </p>
            <AffiliateButton
              tool={toolB}
              variant={winner?.slug === toolB.slug ? "primary" : "outline"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function VsPageClient({ toolA, toolB, year }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("features");
  const { winner } = getVerdict(toolA, toolB);

  const tabs: { id: Tab; label: string }[] = [
    { id: "features", label: "Fonctionnalités" },
    { id: "pricing", label: "Tarifs" },
    { id: "verdict", label: "Verdict" },
  ];

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
                  href="/comparatifs"
                  className="hover:text-gray-800 hover:underline"
                >
                  Comparatifs
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li
                aria-current="page"
                className="font-medium text-gray-800"
              >
                {toolA.nom} vs {toolB.nom}
              </li>
            </ol>
          </nav>

          {/* H1 + subtitle */}
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
            {toolA.nom} vs {toolB.nom}
          </h1>
          <p className="mb-8 text-gray-500">
            Comparatif complet {year} — Prix, fonctionnalités, avantages et
            verdict
          </p>

          {/* Tool cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[toolA, toolB].map((tool) => {
              const isWinner = winner?.slug === tool.slug;
              return (
                <div
                  key={tool.slug}
                  className={`relative rounded-xl border p-5 ${
                    isWinner
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {isWinner && (
                    <span className="absolute right-3 top-3 rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                      Notre choix
                    </span>
                  )}
                  <p className="mb-1 text-lg font-bold text-gray-900">
                    {tool.nom}
                  </p>
                  <p className="mb-3 text-sm text-gray-600">
                    {tool.descriptionCourte}
                  </p>
                  <StarRating note={tool.noteGlobale} />
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {tool.prixDepart === null
                        ? "Prix sur devis"
                        : tool.prixDepart === 0
                        ? "Gratuit"
                        : `À partir de ${tool.prixDepart} €/mois`}
                    </span>
                    {tool.planGratuit && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                        Plan gratuit
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <AffiliateButton tool={tool} variant="outline" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TABS ─────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4">
        <div className="mx-auto flex max-w-4xl gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ──────────────────────────────────────────────────── */}
      <div className="px-4 py-10">
        <div className="mx-auto max-w-4xl">
          {activeTab === "features" && (
            <FeaturesTab toolA={toolA} toolB={toolB} />
          )}
          {activeTab === "pricing" && (
            <PricingTab toolA={toolA} toolB={toolB} />
          )}
          {activeTab === "verdict" && (
            <VerdictTab toolA={toolA} toolB={toolB} />
          )}
        </div>
      </div>

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
