import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import LongTailLayout, { ToolCard } from "@/components/meilleur-emailing/LongTailLayout";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Meilleur outil emailing PME — Comparatif 2026",
  description:
    "Quel outil emailing choisir pour une PME en 2026 ? Comparatif des solutions avec automation avancée, CRM intégré et scalabilité pour accompagner votre croissance.",
  alternates: { canonical: "/meilleur-emailing/pme" },
  openGraph: {
    title: "Meilleur outil emailing PME — Comparatif 2026",
    description: "Les meilleurs outils emailing pour PME : automation, CRM intégré, segmentation avancée et scalabilité.",
    type: "article",
  },
};

const FAQ = [
  {
    question: "Quel outil emailing choisir pour une PME en 2026 ?",
    answer:
      "Brevo et ActiveCampaign sont les deux meilleurs choix pour une PME. Brevo offre un CRM intégré, les SMS et l'email dans un outil tout-en-un avec un très bon rapport qualité/prix. ActiveCampaign est idéal pour les PME qui ont besoin d'automations complexes et de scoring de leads.",
  },
  {
    question: "Faut-il un CRM intégré à son outil emailing pour une PME ?",
    answer:
      "Un CRM intégré simplifie considérablement la gestion client d'une PME en centralisant contacts, historique d'envoi et pipeline commercial dans un seul outil. Brevo, ActiveCampaign et GetResponse proposent des CRM natifs. Si vous utilisez déjà un CRM externe (Salesforce, HubSpot), privilégiez un outil avec une intégration native.",
  },
  {
    question: "Quel budget emailing prévoir pour une PME ?",
    answer:
      "Pour une PME avec 5 000 à 20 000 contacts, comptez entre 30 € et 100 €/mois selon l'outil et les fonctionnalités. Brevo peut être plus avantageux si vous envoyez moins d'un email par semaine à toute votre liste (facturation à l'envoi). ActiveCampaign et GetResponse facturent au nombre de contacts.",
  },
];

export default function PmePage() {
  const tools = getAllTools()
    .filter((t) => t.features.automation && t.features.crmIntegre)
    .sort((a, b) => b.noteGlobale - a.noteGlobale);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Meilleur outil emailing PME en 2026",
    url: `${BASE_URL}/meilleur-emailing/pme`,
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
        h1="Meilleur outil emailing pour PME"
        subtitle={`${tools.length} outils avec automation avancée et CRM intégré — pour accompagner votre croissance.`}
        breadcrumbLabel="Emailing PME"
      >
        {/* Bloc scalabilité */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: "⚡", titre: "Automation avancée", texte: "Workflows comportementaux, scoring de leads, séquences multi-étapes." },
            { icon: "👥", titre: "CRM intégré", texte: "Gestion des contacts, pipeline commercial et historique centralisés." },
            { icon: "📈", titre: "Scalabilité", texte: "De 1 000 à 100 000+ contacts sans changer d'outil." },
          ].map((b) => (
            <div key={b.titre} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="mb-2 text-2xl">{b.icon}</p>
              <p className="mb-1 font-semibold text-gray-900">{b.titre}</p>
              <p className="text-sm text-gray-500">{b.texte}</p>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="mb-12 space-y-4">
          {tools.map((tool, idx) => (
            <ToolCard key={tool.slug} tool={tool} rank={idx + 1} highlight="CRM intégré" />
          ))}
        </div>

        {/* Lien profil similaire */}
        <div className="mb-12 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <p className="mb-2 text-sm font-semibold text-gray-800">Vous gérez une agence ou une équipe marketing ?</p>
          <p className="mb-3 text-sm text-gray-600">
            Consultez notre guide spécifique avec des critères adaptés aux besoins multi-comptes.
          </p>
          <a href="/meilleur-emailing/agence" className="text-sm font-medium text-gray-800 hover:underline">
            Meilleur outil emailing pour agences →
          </a>
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
