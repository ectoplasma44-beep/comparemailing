import type { Tool } from "@/data/tools";
import AffiliateButton from "@/components/AffiliateButton";

type Props = {
  h1: string;
  subtitle: string;
  tools: Tool[];
  breadcrumbLabel: string;
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

export default function LongTailPageLayout({
  h1,
  subtitle,
  tools,
  breadcrumbLabel,
}: Props) {
  const top = tools[0] ?? null;

  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white px-4 py-10">
        <div className="mx-auto max-w-4xl">
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
                  href="/alternative/mailchimp"
                  className="hover:text-gray-800 hover:underline"
                >
                  Alternatives
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-gray-800">
                {breadcrumbLabel}
              </li>
            </ol>
          </nav>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
            {h1}
          </h1>
          <p className="text-gray-500">{subtitle}</p>
        </div>
      </section>

      {/* ── TOP PICK ─────────────────────────────────────────────────────── */}
      {top && (
        <section className="border-b border-gray-100 bg-green-50 px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-green-700">
              Notre meilleur choix
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-bold text-gray-900">{top.nom}</p>
                <p className="mt-1 text-sm text-gray-600">
                  {top.descriptionCourte}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <StarRating note={top.noteGlobale} />
                  {top.planGratuit && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                      Plan gratuit
                    </span>
                  )}
                  {top.prixDepart !== null && top.prixDepart > 0 && (
                    <span className="text-sm text-gray-600">
                      À partir de {top.prixDepart} €/mois
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full sm:w-48 sm:shrink-0">
                <AffiliateButton tool={top} variant="primary" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── LISTE ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-4xl space-y-4">
          {tools.map((tool, idx) => (
            <div
              key={tool.slug}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">
                    #{idx + 1}
                  </span>
                  <p className="text-lg font-bold text-gray-900">{tool.nom}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tool.planGratuit && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                      Gratuit
                    </span>
                  )}
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-500">
                    {tool.pays}
                  </span>
                </div>
              </div>

              <p className="mb-3 mt-2 text-sm leading-relaxed text-gray-600">
                {tool.descriptionCourte}
              </p>

              <div className="mb-4 flex flex-wrap items-center gap-3">
                <StarRating note={tool.noteGlobale} />
                <span className="text-sm font-medium text-gray-700">
                  {tool.prixDepart === null
                    ? "Prix sur devis"
                    : tool.prixDepart === 0
                    ? "Gratuit"
                    : `À partir de ${tool.prixDepart} €/mois`}
                </span>
              </div>

              <ul className="mb-4 space-y-1">
                {tool.avantages.slice(0, 3).map((a) => (
                  <li key={a} className="flex gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 shrink-0 text-green-600">✓</span>
                    {a}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex-1">
                  <AffiliateButton tool={tool} variant="primary" />
                </div>
                <a
                  href={`/alternative/${tool.slug}`}
                  className="flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Toutes les alternatives à {tool.nom} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DISCLOSURE ───────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-gray-50 px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs leading-relaxed text-gray-400">
            <strong className="font-medium text-gray-500">
              Disclosure affiliation :
            </strong>{" "}
            Certains liens présents sur cette page sont des liens affiliés. Si
            vous cliquez et souscrivez, nous pouvons percevoir une commission
            sans coût supplémentaire pour vous. Cette rémunération
            n&apos;influence pas nos recommandations, fondées sur des critères
            objectifs. Tous les liens affiliés portent l&apos;attribut{" "}
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
