import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import LongTailLayout, { ToolCard } from "@/components/meilleur-emailing/LongTailLayout";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Meilleur outil emailing auto-entrepreneur — Gratuit et simple",
  description:
    "Quel outil emailing choisir en tant qu'auto-entrepreneur ? Comparatif des meilleures solutions gratuites et abordables avec éditeur drag-and-drop pour démarrer sans budget.",
  alternates: { canonical: "/meilleur-emailing/auto-entrepreneur" },
  openGraph: {
    title: "Meilleur outil emailing auto-entrepreneur — Gratuit et simple",
    description: "Les meilleurs outils emailing pour auto-entrepreneurs : plans gratuits, prise en main rapide, sans compétences techniques.",
    type: "article",
  },
};

const FAQ = [
  {
    question: "Quel outil emailing choisir en tant qu'auto-entrepreneur ?",
    answer:
      "MailerLite est le choix numéro un pour les auto-entrepreneurs : plan gratuit jusqu'à 1 000 abonnés, éditeur drag-and-drop intuitif, automations incluses. Brevo est une excellente alternative avec un plan gratuit sans limite de contacts.",
  },
  {
    question: "Existe-t-il des outils emailing gratuits pour auto-entrepreneurs ?",
    answer:
      "Oui. MailerLite, Brevo et Moosend proposent des plans 0€ permanents, parfaits pour démarrer. MailerLite offre le meilleur rapport contacts/fonctionnalités sur son plan gratuit avec 1 000 abonnés et 12 000 emails par mois.",
  },
  {
    question: "Quel budget emailing prévoir en tant qu'auto-entrepreneur ?",
    answer:
      "Commencez gratuitement et passez à un plan payant uniquement quand votre liste dépasse 1 000 contacts. Les plans d'entrée de gamme coûtent entre 9 € et 15 €/mois pour 1 000 à 2 500 contacts, ce qui représente moins de 2 % du CA mensuel pour la plupart des auto-entrepreneurs.",
  },
];

export default function AutoEntrepreneurPage() {
  const tools = getAllTools()
    .filter((t) => t.planGratuit && t.features.dragAndDrop)
    .sort((a, b) => b.noteGlobale - a.noteGlobale);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Meilleur outil emailing pour auto-entrepreneur en 2026",
    url: `${BASE_URL}/meilleur-emailing/auto-entrepreneur`,
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
        h1="Meilleur outil emailing pour auto-entrepreneur"
        subtitle={`${tools.length} outils gratuits avec éditeur drag-and-drop — démarrez à 0€ sans compétences techniques.`}
        breadcrumbLabel="Emailing auto-entrepreneur"
      >
        {/* Bloc budget 0€ */}
        <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="mb-1 text-sm font-semibold text-green-800">Budget 0€ — c&apos;est possible</p>
          <p className="text-sm leading-relaxed text-green-700">
            Tous les outils ci-dessous proposent un plan gratuit permanent. Pas de carte bancaire requise pour
            démarrer. Montez en gamme uniquement quand votre liste grandit ou que vos besoins évoluent.
          </p>
        </div>

        {/* Cards */}
        <div className="mb-12 space-y-4">
          {tools.map((tool, idx) => (
            <ToolCard key={tool.slug} tool={tool} rank={idx + 1} highlight="Gratuit" />
          ))}
        </div>

        {/* Lien profil similaire */}
        <div className="mb-12 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <p className="mb-2 text-sm font-semibold text-gray-800">Vous êtes freelance ou solopreneur ?</p>
          <p className="mb-3 text-sm text-gray-600">
            Consultez notre guide dédié avec des recommandations adaptées à votre situation.
          </p>
          <a href="/meilleur-emailing/freelance" className="text-sm font-medium text-gray-800 hover:underline">
            Meilleur outil emailing pour freelances →
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
