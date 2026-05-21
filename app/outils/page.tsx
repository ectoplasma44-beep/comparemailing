import type { Metadata } from "next";
import { getAllTools, VS_COMBINATIONS, getVsPageSlug } from "@/data/tools";

const BASE_URL = "https://toolpick.fr";
const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Tous les outils emailing comparés en ${year} — ToolPick`,
  description:
    "Liste complète des 10 outils emailing comparés sur ToolPick : Brevo, Mailchimp, MailerLite, GetResponse, ActiveCampaign et plus. Notes, prix, plans gratuits.",
  alternates: { canonical: "/outils" },
  openGraph: {
    title: `Tous les outils emailing comparés en ${year}`,
    description:
      "Découvrez les 10 outils emailing comparés sur ToolPick avec leurs notes, tarifs et fonctionnalités clés.",
    type: "website",
  },
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

export default function OutilsPage() {
  const tools = getAllTools().sort((a, b) => b.noteGlobale - a.noteGlobale);
  const nameMap = Object.fromEntries(tools.map((t) => [t.slug, t.nom]));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Outils emailing comparés",
    url: `${BASE_URL}/outils`,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.nom,
      url: `${BASE_URL}/alternative/${tool.slug}`,
      description: tool.descriptionCourte,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
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
              {tools.length} outils analysés — prix, fonctionnalités, plans
              gratuits et comparatifs détaillés.
            </p>
          </div>
        </section>

        {/* ── GRID ─────────────────────────────────────────────────────────── */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => {
                const vsLinks = VS_COMBINATIONS.filter(
                  ([a, b]) => a === tool.slug || b === tool.slug
                ).slice(0, 3);

                return (
                  <div
                    key={tool.slug}
                    className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm"
                  >
                    {/* Header */}
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <p className="text-lg font-bold text-gray-900">
                        {tool.nom}
                      </p>
                      {tool.planGratuit && (
                        <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                          Gratuit
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                      {tool.descriptionCourte}
                    </p>

                    {/* Rating + price */}
                    <div className="mb-1 flex flex-wrap items-center gap-3">
                      <StarRating note={tool.noteGlobale} />
                    </div>
                    <p className="mb-4 text-sm font-medium text-gray-700">
                      {tool.prixDepart === null
                        ? "Prix sur devis"
                        : tool.prixDepart === 0
                        ? "Gratuit"
                        : `À partir de ${tool.prixDepart} €/mois`}
                    </p>

                    {/* VS links */}
                    {vsLinks.length > 0 && (
                      <div className="mb-4">
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Comparatifs
                        </p>
                        <ul className="space-y-1">
                          {vsLinks.map(([a, b]) => {
                            const slug = getVsPageSlug(a, b);
                            const other = a === tool.slug ? b : a;
                            return (
                              <li key={slug}>
                                <a
                                  href={`/${slug}`}
                                  className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                >
                                  → {tool.nom} vs {nameMap[other] ?? other}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {/* CTA */}
                    <a
                      href={`/alternative/${tool.slug}`}
                      className="mt-auto flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      Alternatives à {tool.nom} →
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
