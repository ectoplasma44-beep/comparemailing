import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import LongTailLayout, { ToolCard } from "@/components/meilleur-emailing/LongTailLayout";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Meilleur outil emailing français en 2026 — Made in France",
  description:
    "Comparatif des meilleurs logiciels emailing français en 2026 : Brevo, Sarbacane, Mailjet. Support en français, hébergement UE, conformité RGPD native.",
  alternates: { canonical: "/meilleur-emailing/francais" },
  openGraph: {
    title: "Meilleur outil emailing français en 2026 — Made in France",
    description: "Les meilleurs outils emailing avec support français et hébergement européen. RGPD natif inclus.",
    type: "article",
  },
};

const FAQ = [
  {
    question: "Quel est le meilleur logiciel emailing français en 2026 ?",
    answer:
      "Brevo (ex-Sendinblue) est le leader français de l'email marketing avec plus de 500 000 utilisateurs dans le monde. Sarbacane est une alternative 100% française très appréciée des PME. Mailjet, également français, est orienté développeurs et envois transactionnels.",
  },
  {
    question: "Pourquoi choisir un outil emailing français ?",
    answer:
      "Un outil emailing français offre un support client en français, un hébergement des données en Europe (conformité RGPD native) et une facturation en euros sans frais de conversion. C'est aussi un gage de proximité pour les entreprises soumises au droit français.",
  },
  {
    question: "Les outils emailing français sont-ils conformes au RGPD ?",
    answer:
      "Oui. Les outils français comme Brevo, Sarbacane et Mailjet hébergent leurs données en Europe et intègrent nativement les mécanismes requis par le RGPD : gestion des consentements, droit à l'effacement, mécanismes de désabonnement conformes à l'article 13 du RGPD.",
  },
];

export default function FrancaisPage() {
  const tools = getAllTools()
    .filter((t) => t.features.supportFrancais)
    .sort((a, b) => b.noteGlobale - a.noteGlobale);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Meilleur logiciel emailing français en 2026",
    url: `${BASE_URL}/meilleur-emailing/francais`,
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
        h1="Meilleur logiciel emailing français"
        subtitle={`${tools.length} outils avec support en français et hébergement européen — triés par note.`}
        breadcrumbLabel="Emailing français"
      >
        {/* Bloc RGPD */}
        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="mb-1 text-sm font-semibold text-blue-800">Pourquoi c&apos;est important</p>
          <p className="text-sm leading-relaxed text-blue-700">
            Les outils listés ci-dessous proposent un support client en français, hébergent leurs données en Europe
            et intègrent nativement les mécanismes de conformité RGPD : gestion des consentements, double opt-in,
            désabonnement en un clic et droit à l&apos;effacement.
          </p>
        </div>

        {/* Cards */}
        <div className="mb-12 space-y-4">
          {tools.map((tool, idx) => (
            <ToolCard key={tool.slug} tool={tool} rank={idx + 1} highlight={tool.pays === "France" ? "Made in France" : "Support FR"} />
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
