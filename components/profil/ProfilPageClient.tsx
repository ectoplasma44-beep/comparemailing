"use client";

import type { Tool } from "@/data/tools";
import { getVsPageSlug } from "@/data/tools";
import type { Profile } from "@/data/profiles";
import AffiliateButton from "@/components/AffiliateButton";
import { generateProfilFaqItems } from "@/lib/profil-faq";

type Props = {
  profil: Profile;
  tools: Tool[];
  allTools: Tool[];
  year: number;
};

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

function formatPrice(prixDepart: number | null, planGratuit: boolean): string {
  if (planGratuit && prixDepart === null) return "Gratuit";
  if (prixDepart === null) return "Sur devis";
  if (prixDepart === 0) return "Gratuit";
  return `${prixDepart} €/mois`;
}

function bestTool(
  candidates: Tool[],
  predicate: (t: Tool) => boolean
): Tool | null {
  return (
    candidates
      .filter(predicate)
      .sort((a, b) => b.noteGlobale - a.noteGlobale)[0] ?? null
  );
}

const BUDGET_LABEL: Record<Profile["budgetMensuel"], string> = {
  gratuit: "Gratuit",
  faible: "< 15 €/mois",
  moyen: "15 – 50 €/mois",
  élevé: "> 50 €/mois",
};

const TAILLE_LABEL: Record<Profile["tailleListeMoyenne"], string> = {
  petite: "< 1 000 contacts",
  moyenne: "1 000 – 10 000 contacts",
  grande: "> 10 000 contacts",
};

// ─── Main component ────────────────────────────────────────────────────────────

export default function ProfilPageClient({ profil, tools, allTools, year }: Props) {
  // Sorted tools for this profile
  const sortedTools = [...tools].sort((a, b) => b.noteGlobale - a.noteGlobale);

  // Fallback pool includes allTools when profile list is small
  const pool = sortedTools.length >= 3 ? sortedTools : [...allTools].sort((a, b) => b.noteGlobale - a.noteGlobale);

  const topTool = pool[0] ?? null;

  // VS combinations from top 3 tools
  const vsCombos: [Tool, Tool][] = [];
  for (let i = 0; i < Math.min(pool.length, 3); i++) {
    for (let j = i + 1; j < Math.min(pool.length, 3); j++) {
      vsCombos.push([pool[i], pool[j]]);
    }
  }

  // Recommendation sub-profiles
  const budgetPick = bestTool(pool, (t) => t.planGratuit);
  const debutantPick = bestTool(pool, (t) => t.planGratuit);
  const frenchPick = bestTool(pool, (t) => t.features.supportFrancais);
  const growthPick = bestTool(pool, (t) => t.features.automation);

  const recoBlocs = [
    {
      icon: "💸",
      titre: "Budget 0 €",
      description: "Vous démarrez et voulez tester sans engagement financier.",
      pick: budgetPick,
      reason: budgetPick
        ? `${budgetPick.nom} offre le meilleur plan gratuit permanent.`
        : null,
    },
    {
      icon: "🌱",
      titre: "Débutant en emailing",
      description: "Vous n'avez jamais utilisé d'outil emailing et voulez démarrer simplement.",
      pick: debutantPick,
      reason: debutantPick
        ? `${debutantPick.nom} est reconnu pour sa prise en main rapide.`
        : null,
    },
    {
      icon: "🇫🇷",
      titre: "Support en français indispensable",
      description: "Vous avez besoin d'aide en français en cas de problème.",
      pick: frenchPick,
      reason: frenchPick
        ? `${frenchPick.nom} propose un support francophone inclus.`
        : null,
    },
    {
      icon: "🚀",
      titre: "En phase de croissance",
      description: "Votre liste grandit et vous avez besoin d'automatisations puissantes.",
      pick: growthPick,
      reason: growthPick
        ? `${growthPick.nom} propose l'automation la mieux notée de notre sélection.`
        : null,
    },
  ].filter((b) => b.pick !== null && b.reason !== null) as {
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
                  href="/meilleur-emailing"
                  className="hover:text-gray-800 hover:underline"
                >
                  Par profil
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-gray-800">
                {profil.nom}
              </li>
            </ol>
          </nav>

          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
            Meilleur outil emailing pour {profil.nomPluriel} en {year}
          </h1>
          <p className="mb-6 text-gray-500">{profil.description}</p>

          {/* Priority badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            {profil.priorites.map((p) => (
              <span
                key={p}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
              >
                ✦ {p}
              </span>
            ))}
          </div>

          {/* Profile meta */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>
              💰 Budget :{" "}
              <strong className="text-gray-700">
                {BUDGET_LABEL[profil.budgetMensuel]}
              </strong>
            </span>
            <span>
              👥 Liste :{" "}
              <strong className="text-gray-700">
                {TAILLE_LABEL[profil.tailleListeMoyenne]}
              </strong>
            </span>
          </div>
        </div>
      </section>

      {/* ── CE DONT VOUS AVEZ BESOIN ─────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Ce dont vous avez besoin
          </h2>
          <p className="mb-5 text-sm text-gray-500">
            Voici les outils qui correspondent le mieux à ces critères.
          </p>
          <ul className="space-y-2">
            {profil.besoins.map((b) => (
              <li
                key={b}
                className="flex gap-3 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-gray-700"
              >
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
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SÉLECTION ────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Notre sélection pour {profil.nomPluriel}
          </h2>
          <div className="space-y-4">
            {sortedTools.map((tool, idx) => {
              const isTop = idx === 0;
              return (
                <div
                  key={tool.slug}
                  className={`relative rounded-xl border p-5 ${
                    isTop
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {isTop && (
                    <span className="absolute right-4 top-4 rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                      Meilleur choix
                    </span>
                  )}

                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={`text-xs font-bold ${
                        isTop ? "text-green-700" : "text-gray-400"
                      }`}
                    >
                      #{idx + 1}
                    </span>
                    <p className="text-lg font-bold text-gray-900">{tool.nom}</p>
                  </div>

                  <p className="mb-3 text-sm text-gray-600">
                    {tool.descriptionCourte}
                  </p>

                  <div className="mb-3 flex flex-wrap items-center gap-3">
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

                  <ul className="mb-4 space-y-1">
                    {tool.avantages.slice(0, 3).map((a) => (
                      <li key={a} className="flex gap-2 text-sm text-gray-700">
                        <span className="mt-0.5 shrink-0 text-green-600">✓</span>
                        {a}
                      </li>
                    ))}
                  </ul>

                  <AffiliateButton tool={tool} variant="primary" />
                </div>
              );
            })}

            {sortedTools.length === 0 && (
              <p className="rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-500">
                Aucun outil spécifiquement recommandé pour ce profil — consultez notre{" "}
                <a href="/" className="underline">
                  comparatif général
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── COMPARATIF RAPIDE ────────────────────────────────────────────── */}
      {pool.length >= 2 && (
        <section className="border-b border-gray-100 bg-white px-4 py-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Comparatif rapide
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-3 pl-4 pr-2 text-left font-semibold text-gray-600">
                      Outil
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-600">
                      Prix départ
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-600">
                      Gratuit
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-600">
                      Support FR
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-600">
                      Automation
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-600">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pool.map((tool, idx) => (
                    <tr
                      key={tool.slug}
                      className={`border-b border-gray-100 ${
                        idx % 2 !== 0 ? "bg-gray-50/50" : ""
                      }`}
                    >
                      <td className="py-3 pl-4 pr-2 font-medium text-gray-900">
                        {tool.nom}
                        {idx === 0 && (
                          <span className="ml-2 text-xs text-green-600">★</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center text-gray-700">
                        {formatPrice(tool.prixDepart, tool.planGratuit)}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {tool.planGratuit ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-gray-300">✗</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {tool.features.supportFrancais ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-gray-300">✗</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {tool.features.automation ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-gray-300">✗</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center font-semibold text-gray-900">
                        {tool.noteGlobale}/5
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* VS links */}
            {vsCombos.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="self-center text-xs text-gray-500">
                  Comparatifs complets :
                </span>
                {vsCombos.map(([a, b]) => {
                  const slug = getVsPageSlug(a.slug, b.slug);
                  return (
                    <a
                      key={slug}
                      href={`/${slug}`}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      {a.nom} vs {b.nom} →
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── NOTRE RECOMMANDATION ─────────────────────────────────────────── */}
      {recoBlocs.length > 0 && (
        <section className="border-b border-gray-100 bg-white px-4 py-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Notre recommandation selon votre situation
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Votre choix final dépend de votre point de départ et de vos
              priorités.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {recoBlocs.map((bloc) => (
                <div
                  key={bloc.titre}
                  className="rounded-xl border border-gray-200 p-5"
                >
                  <p className="mb-1 text-2xl">{bloc.icon}</p>
                  <p className="mb-1 font-semibold text-gray-900">
                    {bloc.titre}
                  </p>
                  <p className="mb-2 text-sm text-gray-500">{bloc.description}</p>
                  <p className="mb-4 text-sm text-gray-700">
                    <span className="font-medium">Notre choix :</span>{" "}
                    {bloc.reason}
                  </p>
                  <AffiliateButton tool={bloc.pick} variant="outline" />
                </div>
              ))}
            </div>

            {/* Top pick CTA */}
            {topTool && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
                <p className="mb-1 text-sm font-semibold text-green-800">
                  Notre meilleur choix pour {profil.nomPluriel}
                </p>
                <p className="mb-4 text-sm text-gray-600">
                  {topTool.descriptionCourte}
                </p>
                <AffiliateButton tool={topTool} variant="primary" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            Questions fréquentes sur l&apos;emailing pour {profil.nomPluriel}
          </h2>
          <dl className="space-y-6">
            {generateProfilFaqItems(profil, allTools).map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-gray-200 p-6"
              >
                <dt className="mb-2 font-semibold text-gray-900">
                  {item.question}
                </dt>
                <dd className="text-sm leading-relaxed text-gray-700">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
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
            reposent sur des critères objectifs. Conformément à l&apos;article
            L. 121-1 du Code de la consommation et aux règles de Google sur les
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
