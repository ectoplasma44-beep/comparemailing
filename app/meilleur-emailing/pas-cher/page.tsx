import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import LongTailLayout, { ToolCard } from "@/components/meilleur-emailing/LongTailLayout";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Outil emailing pas cher en 2026 — Les moins chers du marché",
  description:
    "Comparatif des outils emailing les moins chers en 2026. Plans gratuits, tarifs d'entrée et rapport qualité/prix analysés pour tous les budgets.",
  alternates: { canonical: "/meilleur-emailing/pas-cher" },
  openGraph: {
    title: "Outil emailing pas cher en 2026 — Les moins chers du marché",
    description: "Quel outil emailing est le moins cher ? Comparatif complet des tarifs et plans gratuits en 2026.",
    type: "article",
  },
};

const FAQ = [
  {
    question: "Quel est l'outil emailing le moins cher en 2026 ?",
    answer:
      "MailerLite est l'outil emailing le moins cher avec des plans payants démarrant à 9€/mois pour 500 contacts. Brevo propose aussi un excellent rapport qualité/prix avec une facturation à l'envoi plutôt qu'au nombre de contacts.",
  },
  {
    question: "Y a-t-il des outils emailing vraiment gratuits ?",
    answer:
      "Oui. MailerLite, Brevo et Moosend proposent des plans 0€ permanents sans carte bancaire. MailerLite offre jusqu'à 1 000 contacts et 12 000 emails/mois gratuitement. Ces plans suffisent pour démarrer une stratégie emailing sérieuse.",
  },
  {
    question: "Comment réduire son budget emailing sans sacrifier la qualité ?",
    answer:
      "Choisissez un outil qui facture à l'envoi plutôt qu'au nombre de contacts si vous avez une grosse liste mais envoyez peu souvent. Nettoyez régulièrement vos listes pour éviter de payer pour des contacts inactifs. Démarrez sur le plan gratuit et passez au payant uniquement quand vous en avez besoin.",
  },
];

export default function PasCherPage() {
  const tools = getAllTools().sort((a, b) => {
    const priceA = a.planGratuit ? 0 : (a.prixDepart ?? Infinity);
    const priceB = b.planGratuit ? 0 : (b.prixDepart ?? Infinity);
    if (priceA !== priceB) return priceA - priceB;
    return b.noteGlobale - a.noteGlobale;
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Meilleur outil emailing pas cher en 2026",
    url: `${BASE_URL}/meilleur-emailing/pas-cher`,
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "ToolPick" },
    publisher: { "@type": "Organization", name: "ToolPick" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <LongTailLayout
        h1="Meilleur outil emailing pas cher"
        subtitle="10 outils comparés — du gratuit au premium, triés du moins cher au plus cher."
        breadcrumbLabel="Emailing pas cher"
      >
        {/* Tableau prix */}
        <div className="mb-12 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-3 pl-4 pr-2 text-left font-semibold text-gray-600">Outil</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-600">Prix départ</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-600">Plan gratuit</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-600">Note</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-600">Idéal pour</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, idx) => (
                <tr key={tool.slug} className={`border-b border-gray-100 ${idx % 2 !== 0 ? "bg-gray-50/50" : ""}`}>
                  <td className="py-3 pl-4 pr-2 font-semibold text-gray-900">
                    <a href={`/alternative/${tool.slug}`} className="hover:underline">{tool.nom}</a>
                  </td>
                  <td className="px-3 py-3 text-center font-medium text-gray-800">
                    {tool.planGratuit ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">Gratuit</span>
                    ) : tool.prixDepart === null ? (
                      "Sur devis"
                    ) : (
                      `${tool.prixDepart} €/mois`
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {tool.planGratuit ? <span className="text-green-600">✓</span> : <span className="text-gray-300">✗</span>}
                  </td>
                  <td className="px-3 py-3 text-center font-semibold text-gray-900">{tool.noteGlobale}/5</td>
                  <td className="px-3 py-3 text-xs text-gray-600">{tool.idealPour.slice(0, 2).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards */}
        <div className="mb-12 space-y-4">
          {tools.map((tool, idx) => (
            <ToolCard
              key={tool.slug}
              tool={tool}
              rank={idx + 1}
              highlight={tool.planGratuit ? "Gratuit" : tool.prixDepart ? `${tool.prixDepart}€/mois` : undefined}
            />
          ))}
        </div>

        {/* FAQ */}
        <section>
          <h2 className="mb-6 text-xl font-bold text-gray-900">Questions fréquentes</h2>
          <dl className="space-y-4">
            {FAQ.map((f) => (
              <div key={f.question} className="rounded-xl border border-gray-200 p-5">
                <dt className="mb-2 font-semibold text-gray-900">{f.question}</dt>
                <dd className="text-sm leading-relaxed text-gray-700">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </LongTailLayout>
    </>
  );
}
