import type { Metadata } from "next";
import { getAllTools, VS_COMBINATIONS, getVsPageSlug } from "@/data/tools";
import ComparatifsClient from "@/components/comparatifs/ComparatifsClient";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Comparatifs outils emailing — Tous nos tests 2026",
  description:
    `${VS_COMBINATIONS.length} comparatifs détaillés entre les meilleurs outils emailing en 2026 : Brevo, Mailchimp, MailerLite, GetResponse, ActiveCampaign et plus. Prix, fonctionnalités, verdict.`,
  alternates: { canonical: "/comparatifs" },
  openGraph: {
    title: "Comparatifs outils emailing — Tous nos tests 2026",
    description:
      "Tous nos comparatifs détaillés entre les meilleurs outils emailing. Filtrez par outil et trouvez le face-à-face qui vous intéresse.",
    type: "website",
  },
};

export default function ComparatifsPage() {
  const tools = getAllTools();
  const nameMap = Object.fromEntries(tools.map((t) => [t.slug, t.nom]));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Comparatifs outils emailing 2026",
    url: `${BASE_URL}/comparatifs`,
    numberOfItems: VS_COMBINATIONS.length,
    itemListElement: VS_COMBINATIONS.map(([a, b], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${nameMap[a] ?? a} vs ${nameMap[b] ?? b}`,
      url: `${BASE_URL}/${getVsPageSlug(a, b)}`,
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
                  Comparatifs
                </li>
              </ol>
            </nav>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
              Tous nos comparatifs outils emailing
            </h1>
            <p className="text-gray-500">
              {VS_COMBINATIONS.length} comparatifs détaillés pour choisir sans
              se tromper
            </p>
          </div>
        </section>

        {/* ── CONTENU ──────────────────────────────────────────────────────── */}
        <section className="px-4 py-10">
          <div className="mx-auto max-w-5xl">
            <ComparatifsClient
              combinations={VS_COMBINATIONS}
              nameMap={nameMap}
            />
          </div>
        </section>

      </main>
    </>
  );
}
