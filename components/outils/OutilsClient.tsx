"use client";

import type { Tool } from "@/data/tools";
import { VS_COMBINATIONS, getVsPageSlug } from "@/data/tools";
import AffiliateButton from "@/components/AffiliateButton";

type Props = {
  tools: Tool[];
};

function StarRating({ note }: { note: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${note} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
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

export default function OutilsClient({ tools }: Props) {
  const sorted = [...tools].sort((a, b) => b.noteGlobale - a.noteGlobale);
  const nameMap = Object.fromEntries(sorted.map((t) => [t.slug, t.nom]));

  function firstVsLink(slug: string): { vsSlug: string; otherName: string } | null {
    const pair = VS_COMBINATIONS.find(([a, b]) => a === slug || b === slug);
    if (!pair) return null;
    const [a, b] = pair;
    const otherSlug = a === slug ? b : a;
    return { vsSlug: getVsPageSlug(a, b), otherName: nameMap[otherSlug] ?? otherSlug };
  }

  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Fil d'Ariane" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
              <li>
                <a href="/" className="hover:text-gray-800 hover:underline">
                  Accueil
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-gray-800">
                Outils
              </li>
            </ol>
          </nav>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
            Tous les outils emailing comparés
          </h1>
          <p className="text-gray-500">
            10 outils analysés en détail — prix, fonctionnalités, avis et
            alternatives
          </p>
        </div>
      </section>

      {/* ── GRID OUTILS ────────────────────────────────────────────────────── */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sorted.map((tool) => {
              const vs = firstVsLink(tool.slug);
              return (
                <div
                  key={tool.slug}
                  className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-sm"
                >
                  {/* Nom + pays */}
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <p className="text-xl font-bold text-gray-900">{tool.nom}</p>
                    <span className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                      {tool.pays}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                    {tool.descriptionCourte}
                  </p>

                  {/* Note + prix */}
                  <div className="mb-1">
                    <StarRating note={tool.noteGlobale} />
                  </div>
                  <div className="mb-4 flex flex-wrap items-center gap-2">
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

                  {/* 3 liens */}
                  <div className="mb-5 flex flex-wrap gap-3">
                    <a
                      href={`/alternative/${tool.slug}`}
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                    >
                      Alternatives →
                    </a>
                    <a
                      href={`/alternative/${tool.slug}`}
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                    >
                      Avis complet →
                    </a>
                    {vs && (
                      <a
                        href={`/${vs.vsSlug}`}
                        className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                      >
                        vs {vs.otherName} →
                      </a>
                    )}
                  </div>

                  {/* CTA affilié */}
                  <AffiliateButton tool={tool} variant="outline" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPARER DEUX OUTILS ────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Comparer deux outils
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            18 comparatifs détaillés — fonctionnalités, tarifs et verdict.
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {VS_COMBINATIONS.map(([a, b]) => {
              const slug = getVsPageSlug(a, b);
              return (
                <a
                  key={slug}
                  href={`/${slug}`}
                  className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-all hover:border-gray-300 hover:shadow-sm"
                >
                  <span className="text-gray-800">
                    <span className="font-medium">{nameMap[a] ?? a}</span>
                    <span className="mx-1.5 text-gray-400">vs</span>
                    <span className="font-medium">{nameMap[b] ?? b}</span>
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-gray-300 group-hover:text-gray-500"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
