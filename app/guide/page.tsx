import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Comment choisir son outil emailing en 2026 — Guide complet",
  description:
    "Guide complet pour choisir votre outil emailing en 2026 : critères essentiels, comparatif des 10 meilleurs outils, recommandations par profil et erreurs à éviter.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "Comment choisir son outil emailing en 2026 — Guide complet",
    description:
      "Tous les critères pour choisir votre outil emailing : budget, taille de liste, automation, RGPD, support français. Comparatif et recommandations inclus.",
    type: "article",
  },
};

const PROFILE_RECOMMENDATIONS = [
  {
    slug: "freelance",
    label: "Freelance ou solopreneur",
    recommendation: "MailerLite ou Brevo",
    raison:
      "Plan gratuit généreux, interface simple, automation de base incluse. Idéal pour une liste de moins de 1 000 contacts sans budget dédié.",
  },
  {
    slug: "ecommerce",
    label: "E-commerçant",
    recommendation: "Brevo ou ActiveCampaign",
    raison:
      "Intégrations Shopify/WooCommerce natives, relances de paniers abandonnés, segmentation comportementale et emails transactionnels dans un seul outil.",
  },
  {
    slug: "startup",
    label: "Startup en croissance",
    recommendation: "ActiveCampaign ou GetResponse",
    raison:
      "API robuste, automation avancée, scoring de leads et scalabilité. Idéal pour des séquences d'onboarding complexes.",
  },
  {
    slug: "createur",
    label: "Créateur de contenu",
    recommendation: "Kit (ConvertKit) ou MailerLite",
    raison:
      "Conçu pour les newsletters, intégration de contenu payant, pages d'abonnement élégantes et plan gratuit pour démarrer.",
  },
  {
    slug: "agence",
    label: "Agence marketing",
    recommendation: "Brevo ou ActiveCampaign",
    raison:
      "Gestion multi-comptes, rapports exportables, API complète et sous-comptes pour gérer plusieurs clients depuis une interface unique.",
  },
];

const ERRORS = [
  {
    titre: "Choisir l'outil le plus connu plutôt que le plus adapté",
    explication:
      "Mailchimp est populaire, mais ses tarifs escaladent rapidement dès que votre liste dépasse 500 contacts. Comparez toujours le coût sur 12 mois en projetant la croissance de votre liste.",
  },
  {
    titre: "Négliger la délivrabilité",
    explication:
      "Un outil bon marché qui finit en spam vous coûte plus cher qu'un abonnement premium. Vérifiez les taux de délivrabilité et la réputation des serveurs d'envoi avant de vous engager.",
  },
  {
    titre: "Sous-estimer le coût de la migration",
    explication:
      "Changer d'outil implique d'exporter/importer vos contacts, recréer vos automations et chauffer un nouveau domaine d'envoi. Choisissez bien dès le départ pour éviter cette friction.",
  },
  {
    titre: "Ignorer la conformité RGPD",
    explication:
      "Pour les entreprises françaises et européennes, l'hébergement des données doit être en Europe. Vérifiez les mentions relatives au RGPD et aux transferts de données hors UE.",
  },
  {
    titre: "Payer pour des fonctionnalités inutilisées",
    explication:
      "L'automation avancée, les A/B tests ou les landing pages ne vous seront utiles que si vous avez les ressources pour les exploiter. Partez du plan le plus simple et montez en gamme selon vos besoins réels.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Quel est le meilleur outil emailing gratuit en 2026 ?",
    answer:
      "MailerLite et Brevo proposent les meilleurs plans gratuits en 2026. MailerLite offre jusqu'à 1 000 abonnés et 12 000 emails par mois. Brevo propose un plan gratuit avec envois illimités vers jusqu'à 300 contacts par jour. Les deux sont RGPD-compatibles.",
  },
  {
    question: "Quelle est la différence entre Mailchimp et Brevo ?",
    answer:
      "Brevo (ex-Sendinblue) est d'origine française, facture à l'envoi plutôt qu'au nombre de contacts, et inclut un CRM et les SMS. Mailchimp est américain, facture au nombre de contacts, et est plus orienté e-commerce avec des intégrations natives plus nombreuses. Brevo est généralement moins cher pour les grandes listes.",
  },
  {
    question: "Comment choisir entre un outil tout-en-un et un outil spécialisé ?",
    answer:
      "Un outil tout-en-un (Brevo, GetResponse) centralise email, SMS, CRM et landing pages. Pratique pour éviter les intégrations multiples. Un outil spécialisé (MailerLite, Kit) excelle dans son domaine mais nécessite des connexions avec d'autres services. Commencez par un tout-en-un si vous démarrez, passez au spécialisé si vous avez des besoins très précis.",
  },
  {
    question: "Quel budget prévoir pour l'emailing en 2026 ?",
    answer:
      "Pour une liste de 500 contacts : gratuit à 10 €/mois. Pour 2 000 contacts : entre 15 € et 30 €/mois. Pour 10 000 contacts : entre 50 € et 100 €/mois selon l'outil. La facturation à l'envoi (Brevo) peut être avantageuse si votre taux d'envoi est faible.",
  },
  {
    question: "L'emailing est-il toujours efficace en 2026 ?",
    answer:
      "Oui. L'email marketing génère en moyenne 36 à 42 € de retour pour chaque euro investi (ROI moyen selon Litmus et DMA). Le taux d'ouverture moyen est de 20 à 30 % selon le secteur, largement supérieur au reach organique des réseaux sociaux. L'email reste le canal de rétention le plus rentable.",
  },
];

export default function GuidePage() {
  const tools = getAllTools().sort((a, b) => b.noteGlobale - a.noteGlobale);

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
    headline: "Comment choisir son outil emailing en 2026 — Guide complet",
    description:
      "Guide complet pour choisir votre outil emailing en 2026 : critères, comparatif, recommandations par profil et erreurs à éviter.",
    url: `${BASE_URL}/guide`,
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "ToolPick" },
    publisher: { "@type": "Organization", name: "ToolPick" },
  };

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
                  Guide
                </li>
              </ol>
            </nav>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comment choisir son outil emailing en 2026&nbsp;: le guide complet
            </h1>
            <p className="text-lg text-gray-500">
              Critères essentiels, comparatif des 10 meilleurs outils,
              recommandations par profil et erreurs à éviter.
            </p>
          </div>
        </section>

        {/* ── CONTENU ──────────────────────────────────────────────────────── */}
        <div className="px-4 py-14">
          <div className="mx-auto max-w-3xl space-y-20">

            {/* ─ Section 1 ─────────────────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Pourquoi l&apos;emailing reste le canal marketing le plus rentable
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  L&apos;email marketing génère en moyenne <strong>36 à 42 € de retour pour chaque euro investi</strong>, selon les études de Litmus et de la DMA. Aucun autre canal digital — ni les réseaux sociaux, ni la publicité payante, ni le SEO seul — n&apos;affiche un ROI aussi constant sur la durée. En 2026, l&apos;email reste la colonne vertébrale de la relation client pour les entreprises qui savent l&apos;exploiter.
                </p>
                <p>
                  Contrairement aux algorithmes des plateformes sociales qui décident de votre visibilité, <strong>votre liste email vous appartient</strong>. Un abonné qui a consenti à recevoir vos messages est un actif durable, indépendant des changements de politique des réseaux. Le taux d&apos;ouverture moyen d&apos;une newsletter bien gérée oscille entre 20 % et 35 %, soit 5 à 10 fois le taux d&apos;engagement organique d&apos;une publication Facebook ou Instagram.
                </p>
                <p>
                  Avec l&apos;essor de l&apos;automatisation et des outils d&apos;IA, il n&apos;a jamais été aussi accessible de mettre en place des séquences d&apos;emails personnalisées qui délivrent le bon message au bon moment. Un freelance avec 300 abonnés peut aujourd&apos;hui automatiser des séquences de bienvenue, de nurturing et de vente aussi sophistiquées que celles d&apos;une grande entreprise — pour moins de 15 €/mois.
                </p>
              </div>
            </section>

            {/* ─ Section 2 ─────────────────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les critères essentiels pour choisir votre outil
              </h2>
              <div className="space-y-5">
                {[
                  {
                    critere: "Taille de votre liste",
                    explication:
                      "La plupart des outils facturent au nombre de contacts. Si votre liste dépasse 1 000 abonnés, comparez le coût mensuel projeté à 2 000, 5 000 et 10 000 contacts. Certains outils (Brevo) facturent à l'envoi, ce qui peut être avantageux si vous n'envoyez pas souvent.",
                    outil: "Petite liste (< 1 000) : MailerLite ou Brevo — plan gratuit disponible.",
                  },
                  {
                    critere: "Budget mensuel",
                    explication:
                      "Entre 0 € et 10 €/mois, les plans gratuits de MailerLite, Brevo et Moosend couvrent les besoins de base. Entre 15 € et 50 €/mois, vous accédez à l'automation avancée et à la segmentation fine. Au-delà de 50 €/mois, les fonctionnalités CRM, scoring et reporting avancé deviennent disponibles.",
                    outil: "Budget 0 € : MailerLite. Budget moyen : GetResponse. Budget élevé : ActiveCampaign.",
                  },
                  {
                    critere: "Besoin d'automation",
                    explication:
                      "L'automation va du simple email de bienvenue aux séquences comportementales complexes. Si vous avez besoin de workflows avancés (scoring, branching, CRM intégré), optez pour ActiveCampaign ou GetResponse. Pour des besoins simples, MailerLite ou Brevo suffisent.",
                    outil: "Automation simple : MailerLite. Automation avancée : ActiveCampaign.",
                  },
                  {
                    critere: "Conformité RGPD",
                    explication:
                      "Pour les entreprises françaises et européennes, les données de vos abonnés doivent être hébergées en Europe. Brevo (France), MailerLite (Lituanie) et Sarbacane (France) offrent un hébergement UE natif. Vérifiez aussi la gestion des consentements et les mécanismes de désabonnement.",
                    outil: "Priorité RGPD : Brevo ou Sarbacane.",
                  },
                  {
                    critere: "Support en français",
                    explication:
                      "Si vous n'êtes pas à l'aise en anglais ou si votre équipe a besoin d'aide rapidement, un support francophone est indispensable. Brevo, Sarbacane et Mailjet proposent un support client en français, contrairement à Mailchimp ou ConvertKit.",
                    outil: "Support français : Brevo, Sarbacane, Mailjet.",
                  },
                ].map((item) => (
                  <div
                    key={item.critere}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <p className="mb-2 font-semibold text-gray-900">
                      {item.critere}
                    </p>
                    <p className="mb-3 text-sm leading-relaxed text-gray-600">
                      {item.explication}
                    </p>
                    <p className="text-xs font-medium text-green-700">
                      ✓ {item.outil}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ─ Section 3 ─────────────────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Comparatif rapide des 10 meilleurs outils
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
                        Note
                      </th>
                      <th className="px-3 py-3 text-left font-semibold text-gray-600">
                        Idéal pour
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tools.map((tool, idx) => (
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
                        <td className="px-3 py-3 text-center text-gray-700">
                          {tool.prixDepart === null
                            ? "Sur devis"
                            : tool.prixDepart === 0
                            ? "Gratuit"
                            : `${tool.prixDepart} €/mois`}
                        </td>
                        <td className="px-3 py-3 text-center">
                          {tool.planGratuit ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-gray-300">✗</span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-center font-semibold text-gray-900">
                          {tool.noteGlobale}/5
                        </td>
                        <td className="px-3 py-3 text-gray-600">
                          {tool.idealPour.slice(0, 2).join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-center">
                <a
                  href="/outils"
                  className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-800"
                >
                  Voir toutes les fiches détaillées →
                </a>
              </p>
            </section>

            {/* ─ Section 4 ─────────────────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Notre recommandation selon votre profil
              </h2>
              <div className="space-y-4">
                {PROFILE_RECOMMENDATIONS.map((profil) => (
                  <div
                    key={profil.slug}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-gray-900">
                        {profil.label}
                      </p>
                      <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-800">
                        {profil.recommendation}
                      </span>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-gray-600">
                      {profil.raison}
                    </p>
                    <a
                      href={`/meilleur-emailing/${profil.slug}`}
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                    >
                      Guide complet pour {profil.label.toLowerCase()} →
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* ─ Section 5 ─────────────────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les erreurs à éviter
              </h2>
              <ol className="space-y-5">
                {ERRORS.map((error, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="mb-1 font-semibold text-gray-900">
                        {error.titre}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {error.explication}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ─ FAQ ───────────────────────────────────────────────────────── */}
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
