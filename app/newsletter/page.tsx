import type { Metadata } from "next";
import { getAllTools, getToolBySlug } from "@/data/tools";
import { generateBreadcrumbJsonLd } from "@/lib/breadcrumb";
import AffiliateButton from "@/components/AffiliateButton";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Créer une newsletter en 2026 — Guide complet et outils recommandés",
  description:
    "Comment créer une newsletter en 2026 : choix de l'outil, étapes de lancement, rédaction du premier email et conseils pour fidéliser vos abonnés. Guide complet et gratuit.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "Créer une newsletter en 2026 — Guide complet et outils recommandés",
    description:
      "Guide complet pour créer votre newsletter en 2026 : outil, niche, landing page, premier email, promotion et analyse. Recommandations incluses.",
    type: "article",
  },
};

const STEPS = [
  {
    titre: "Choisir votre niche",
    description:
      "Définissez précisément le sujet de votre newsletter et votre audience cible. Une newsletter sur « la productivité pour freelances créatifs » convertit mieux qu'une newsletter sur « la productivité » en général. Plus votre niche est précise, plus votre taux d'ouverture sera élevé.",
  },
  {
    titre: "Choisir votre outil d'envoi",
    description:
      "Sélectionnez un outil adapté à votre volume et votre budget. Pour débuter, MailerLite (1 000 abonnés gratuits) ou Brevo (contacts illimités) sont les options les plus accessibles. Pour les créateurs monétisant leur audience, Kit (ConvertKit) est taillé pour ça.",
  },
  {
    titre: "Créer votre landing page d'inscription",
    description:
      "Votre page d'inscription doit expliquer en 3 secondes ce que reçoit l'abonné, à quelle fréquence et pourquoi s'inscrire maintenant. Ajoutez un lead magnet (guide, checklist, template gratuit) pour doubler votre taux de conversion.",
  },
  {
    titre: "Rédiger votre premier email de bienvenue",
    description:
      "L'email de bienvenue est le plus ouvert de toute votre séquence (taux d'ouverture moyen : 50-70 %). Présentez-vous, expliquez ce que vous allez envoyer, tenez votre promesse du lead magnet et posez une question pour engager dès le départ.",
  },
  {
    titre: "Promouvoir votre newsletter",
    description:
      "Partagez le lien d'inscription dans votre bio Instagram, votre signature d'email, vos articles de blog, vos stories et vos groupes Facebook ou LinkedIn. Ajoutez un pop-up d'inscription sur votre site. Les premières centaines d'abonnés viennent toujours de votre réseau existant.",
  },
  {
    titre: "Analyser et améliorer",
    description:
      "Suivez chaque semaine votre taux d'ouverture (objectif : >25 %), votre taux de clic (objectif : >3 %) et votre taux de désinscription (alarme si >0,5 %). Testez vos objets d'email en A/B testing dès que votre liste dépasse 500 abonnés.",
  },
];

const TOOL_RECOMMENDATIONS = [
  {
    profil: "Newsletter créateur",
    slug: "convertkit",
    raison:
      "Kit (ConvertKit) est conçu spécifiquement pour les créateurs de contenu. Il intègre les pages d'abonnement, le contenu payant, les séquences automatisées et un plan gratuit jusqu'à 10 000 abonnés. Idéal si vous comptez monétiser votre audience via des formations, des ebooks ou du coaching.",
  },
  {
    profil: "Newsletter business",
    slug: "brevo",
    raison:
      "Brevo est la solution française tout-en-un la mieux adaptée aux newsletters d'entreprise. CRM intégré, contacts illimités dès le plan gratuit, support francophone et conformité RGPD native. Parfait pour les TPE, agences et consultants qui veulent gérer email, SMS et CRM au même endroit.",
  },
  {
    profil: "Newsletter débutant",
    slug: "mailerlite",
    raison:
      "MailerLite offre le meilleur rapport simplicité/puissance pour démarrer. Interface épurée, templates modernes, 1 000 abonnés gratuits et toutes les fonctionnalités essentielles (automation, landing page, pop-up) incluses. Vous serez opérationnel en moins d'une heure.",
  },
  {
    profil: "Newsletter e-commerce",
    slug: "klaviyo",
    raison:
      "Klaviyo s'impose comme le standard des newsletters e-commerce avec ses intégrations natives Shopify et WooCommerce. Segmentation comportementale, relances de paniers abandonnés, recommandations de produits et analytics avancés font de lui l'outil incontournable pour les marchands en ligne.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Combien coûte la création d'une newsletter ?",
    answer:
      "Créer une newsletter peut être entièrement gratuit grâce aux plans offerts par MailerLite (1 000 abonnés), Brevo (contacts illimités, 300 emails/jour) ou Kit/ConvertKit (10 000 abonnés). Les premiers abonnements payants démarrent entre 9 € et 15 €/mois quand votre liste grossit. Prévoyez entre 0 € et 30 €/mois pour les 1 000 premiers abonnés.",
  },
  {
    question: "Quelle fréquence d'envoi est recommandée pour une newsletter ?",
    answer:
      "Pour une newsletter débutante, commencez par une fréquence hebdomadaire ou bimensuelle. L'essentiel est la régularité : mieux vaut un email par mois publié chaque premier lundi que des envois irréguliers. Augmentez la fréquence seulement quand vous avez un processus de production stable et que votre taux de désinscription reste sous 0,3 %.",
  },
  {
    question: "Quelle est la différence entre une newsletter et une liste email ?",
    answer:
      "Une liste email est la base de données de contacts que vous gérez dans votre outil d'envoi. Une newsletter est le contenu éditorial que vous envoyez régulièrement à cette liste. Vous pouvez avoir une liste email et n'envoyer que des emails promotionnels ; une newsletter implique une ligne éditoriale, une régularité et une valeur informative pour le lecteur.",
  },
  {
    question: "Comment augmenter son taux d'ouverture de newsletter ?",
    answer:
      "Le taux d'ouverture dépend principalement de trois facteurs : la qualité de votre objet d'email (testez des objets courts et intrigants), l'heure d'envoi (mardi-jeudi matin entre 8 h et 10 h est souvent optimal), et la réputation de votre domaine d'envoi. Nettoyez régulièrement votre liste en supprimant les contacts inactifs depuis plus de 6 mois pour améliorer votre délivrabilité.",
  },
  {
    question: "La newsletter est-elle compatible avec le RGPD ?",
    answer:
      "Oui, à condition de recueillir le consentement explicite de vos abonnés (case à cocher, pas pré-cochée), d'inclure un lien de désabonnement dans chaque email, et de stocker les données en Europe si possible. Brevo et MailerLite respectent nativement le RGPD avec des données hébergées en UE. Conservez les preuves de consentement dans votre outil d'envoi.",
  },
];

export default function NewsletterPage() {
  const allTools = getAllTools();
  const toolsWithTemplates = allTools.filter((t) => t.features.templates);

  const kitTool = getToolBySlug("convertkit");
  const brevoTool = getToolBySlug("brevo");
  const mailerliteTool = getToolBySlug("mailerlite");
  const klaviyoTool = getToolBySlug("klaviyo");

  const toolMap: Record<string, ReturnType<typeof getToolBySlug>> = {
    convertkit: kitTool,
    brevo: brevoTool,
    mailerlite: mailerliteTool,
    klaviyo: klaviyoTool,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comment créer une newsletter en 2026 : guide complet",
    description:
      "Guide complet pour créer votre newsletter en 2026 : choix de l'outil, étapes de lancement, promotion et analyse.",
    url: `${BASE_URL}/newsletter`,
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "ToolPick" },
    publisher: { "@type": "Organization", name: "ToolPick" },
  };

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Accueil", url: BASE_URL },
    { name: "Créer une newsletter", url: `${BASE_URL}/newsletter` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-white">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Fil d'Ariane" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
                <li>
                  <a href="/" className="hover:text-gray-800 hover:underline">
                    Accueil
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-gray-800">
                  Créer une newsletter
                </li>
              </ol>
            </nav>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comment créer une newsletter en 2026&nbsp;: guide complet
            </h1>
            <p className="text-lg text-gray-500">
              De la définition de votre niche au choix de l&apos;outil, en passant
              par le lancement et l&apos;analyse — tout ce qu&apos;il faut pour démarrer
              et développer votre newsletter.
            </p>
          </div>
        </section>

        {/* ── CONTENU ──────────────────────────────────────────────────────── */}
        <div className="px-4 py-14">
          <div className="mx-auto max-w-3xl space-y-20">

            {/* ─ Section 1 : Pourquoi créer une newsletter ─────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Pourquoi créer une newsletter en 2026&nbsp;?
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Contrairement aux réseaux sociaux où l&apos;algorithme décide de votre visibilité,{" "}
                  <strong>votre liste email vous appartient entièrement</strong>. Un abonné qui a
                  consenti à recevoir vos emails est un actif durable, indépendant des changements
                  de politique de Meta, de TikTok ou de X. Si demain Instagram supprimait votre
                  compte, votre newsletter continuerait à fonctionner. C&apos;est la différence
                  fondamentale entre louer une audience et en posséder une.
                </p>
                <p>
                  Le ROI de l&apos;email marketing reste sans équivalent dans le marketing digital&nbsp;:{" "}
                  <strong>36 à 42 € de retour pour chaque euro investi</strong>, selon les études
                  de Litmus et de la DMA. Le taux d&apos;ouverture moyen d&apos;une newsletter
                  bien gérée oscille entre 25 % et 40 %, soit 5 à 10 fois le taux d&apos;engagement
                  organique d&apos;une publication sur les réseaux sociaux. Pour une newsletter
                  thématique avec une audience engagée, des taux d&apos;ouverture dépassant 50 %
                  ne sont pas rares.
                </p>
                <p>
                  En 2026, créer une newsletter est plus accessible que jamais. Les outils modernes
                  proposent des plans gratuits généreux, des éditeurs drag-and-drop sans code et
                  des fonctionnalités d&apos;automation qui étaient réservées aux grandes entreprises
                  il y a cinq ans. Un créateur solo avec 300 abonnés peut aujourd&apos;hui envoyer
                  des séquences de bienvenue personnalisées, segmenter son audience et analyser ses
                  performances — pour 0 € par mois.
                </p>
              </div>
            </section>

            {/* ─ Section 2 : Choisir le bon outil ─────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Choisir le bon outil pour votre newsletter
              </h2>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Le tableau suivant regroupe les outils disposant d&apos;un éditeur
                de templates intégré — indispensable pour créer des newsletters
                au design soigné sans coder.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="py-3 pl-4 pr-2 text-left font-semibold text-gray-600">
                        Outil
                      </th>
                      <th className="px-3 py-3 text-center font-semibold text-gray-600">
                        Plan gratuit
                      </th>
                      <th className="px-3 py-3 text-center font-semibold text-gray-600">
                        Contacts gratuits
                      </th>
                      <th className="px-3 py-3 text-center font-semibold text-gray-600">
                        Templates
                      </th>
                      <th className="px-3 py-3 text-center font-semibold text-gray-600">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {toolsWithTemplates.map((tool, idx) => {
                      const freeTier = tool.planGratuit ? tool.pricing[0] : null;
                      const contactsGratuits = freeTier
                        ? freeTier.contacts !== null
                          ? freeTier.contacts.toLocaleString("fr-FR")
                          : "Illimités"
                        : "—";

                      return (
                        <tr
                          key={tool.slug}
                          className={`border-b border-gray-100 ${idx % 2 !== 0 ? "bg-gray-50/50" : ""}`}
                        >
                          <td className="py-3 pl-4 pr-2 font-semibold text-gray-900">
                            <a
                              href={`/alternative/${tool.slug}`}
                              className="hover:underline"
                            >
                              {tool.nom}
                            </a>
                          </td>
                          <td className="px-3 py-3 text-center">
                            {tool.planGratuit ? (
                              <span className="text-green-600">✓</span>
                            ) : (
                              <span className="text-gray-300">✗</span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-center text-gray-700">
                            {contactsGratuits}
                          </td>
                          <td className="px-3 py-3 text-center">
                            <span className="text-green-600">✓</span>
                          </td>
                          <td className="px-3 py-3 text-center font-semibold text-gray-900">
                            {tool.noteGlobale}/5
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-center">
                <a
                  href="/comparatifs"
                  className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-800"
                >
                  Voir tous les comparatifs détaillés →
                </a>
              </p>
            </section>

            {/* ─ Section 3 : Les étapes pour lancer ───────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les étapes pour lancer votre newsletter
              </h2>
              <ol className="space-y-6">
                {STEPS.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="mb-1.5 font-semibold text-gray-900">
                        {step.titre}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ─ Section 4 : Quel outil selon votre objectif ──────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Quel outil choisir selon votre objectif
              </h2>
              <div className="space-y-5">
                {TOOL_RECOMMENDATIONS.map((rec) => {
                  const tool = toolMap[rec.slug];
                  return (
                    <div
                      key={rec.slug}
                      className="rounded-xl border border-gray-200 p-5"
                    >
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-gray-900">{rec.profil}</p>
                        {tool && (
                          <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-800">
                            {tool.nom}
                          </span>
                        )}
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-gray-600">
                        {rec.raison}
                      </p>
                      {tool && (
                        <AffiliateButton tool={tool} variant="outline" />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ─ Section 5 : FAQ ───────────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Questions fréquentes
              </h2>
              <dl className="space-y-5">
                {FAQ_ITEMS.map((item) => (
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
            </section>

          </div>
        </div>

      </main>
    </>
  );
}
