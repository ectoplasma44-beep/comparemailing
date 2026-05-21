import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import LongTailLayout, { ToolCard } from "@/components/meilleur-emailing/LongTailLayout";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Meilleur outil emailing gratuit en 2026 — Comparatif des plans gratuits",
  description:
    "Comparatif des meilleurs outils emailing gratuits en 2026 : MailerLite, Brevo, Moosend… Contacts offerts, emails/mois, fonctionnalités incluses. Trouvez le plan 0€ le plus généreux.",
  alternates: { canonical: "/meilleur-emailing/gratuit" },
  openGraph: {
    title: "Meilleur outil emailing gratuit en 2026 — Comparatif des plans gratuits",
    description: "Quel outil emailing offre le meilleur plan gratuit en 2026 ? Comparatif complet des offres 0€.",
    type: "article",
  },
};

const FAQ = [
  {
    question: "Quel est le meilleur outil emailing gratuit en 2026 ?",
    answer:
      "MailerLite est le meilleur outil emailing gratuit en 2026 avec jusqu'à 1 000 abonnés et 12 000 emails par mois. Brevo est une alternative solide avec envois illimités (300/jour) sans limite de contacts.",
  },
  {
    question: "Les plans gratuits d'emailing sont-ils vraiment gratuits ?",
    answer:
      "Oui, les plans gratuits des outils comme MailerLite, Brevo ou Moosend sont gratuits sans limite de durée. Aucune carte bancaire n'est requise pour s'inscrire. Les limitations portent sur le nombre de contacts, d'envois mensuels ou les fonctionnalités disponibles.",
  },
  {
    question: "Peut-on démarrer une vraie stratégie emailing avec un plan gratuit ?",
    answer:
      "Absolument. Un plan gratuit suffit pour envoyer une newsletter mensuelle à moins de 1 000 abonnés, mettre en place un email de bienvenue automatique et collecter des leads via un formulaire. C'est le point de départ idéal avant de passer à un plan payant.",
  },
];

export default function GratuitPage() {
  const tools = getAllTools()
    .filter((t) => t.planGratuit)
    .sort((a, b) => {
      const cA = a.pricing.find((p) => p.prixMois === 0)?.contacts ?? 0;
      const cB = b.pricing.find((p) => p.prixMois === 0)?.contacts ?? 0;
      return cB - cA;
    });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Meilleur outil emailing gratuit en 2026",
    url: `${BASE_URL}/meilleur-emailing/gratuit`,
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
        h1="Meilleur outil emailing gratuit"
        subtitle={`${tools.length} outils avec un plan 0€ permanent — triés par nombre de contacts offerts.`}
        breadcrumbLabel="Emailing gratuit"
      >
        {/* Tableau comparatif des plans gratuits */}
        <div className="mb-12 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-3 pl-4 pr-2 text-left font-semibold text-gray-600">Outil</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-600">Contacts</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-600">Emails/mois</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-600">Automation</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-600">Support FR</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-600">Note</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, idx) => {
                const freeTier = tool.pricing.find((p) => p.prixMois === 0);
                return (
                  <tr key={tool.slug} className={`border-b border-gray-100 ${idx % 2 !== 0 ? "bg-gray-50/50" : ""}`}>
                    <td className="py-3 pl-4 pr-2 font-semibold text-gray-900">
                      <a href={`/alternative/${tool.slug}`} className="hover:underline">{tool.nom}</a>
                    </td>
                    <td className="px-3 py-3 text-center text-gray-700">
                      {freeTier?.contacts ? freeTier.contacts.toLocaleString("fr-FR") : "Illimité"}
                    </td>
                    <td className="px-3 py-3 text-center text-gray-700">
                      {freeTier?.emailsMois ? freeTier.emailsMois.toLocaleString("fr-FR") : freeTier?.note ?? "—"}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {tool.features.automation ? <span className="text-green-600">✓</span> : <span className="text-gray-300">✗</span>}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {tool.features.supportFrancais ? <span className="text-green-600">✓</span> : <span className="text-gray-300">✗</span>}
                    </td>
                    <td className="px-3 py-3 text-center font-semibold text-gray-900">{tool.noteGlobale}/5</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cards */}
        <div className="mb-12 space-y-4">
          {tools.map((tool, idx) => (
            <ToolCard key={tool.slug} tool={tool} rank={idx + 1} highlight="Plan gratuit" />
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
