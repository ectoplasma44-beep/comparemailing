import type { Metadata } from "next";
import { getAllTools, getVsPageSlug } from "@/data/tools";
import { generateBreadcrumbJsonLd } from "@/lib/breadcrumb";
import AffiliateButton from "@/components/AffiliateButton";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Emailing e-commerce — Meilleurs outils et stratégies 2026",
  description:
    "Les meilleurs outils emailing pour e-commerce en 2026 : Klaviyo, Omnisend, Mailchimp. Stratégies de panier abandonné, post-achat, réengagement et comparatif détaillé.",
  alternates: { canonical: "/emailing-ecommerce" },
  openGraph: {
    title: "Emailing e-commerce — Meilleurs outils et stratégies 2026",
    description:
      "Guide complet emailing e-commerce : meilleurs outils, 6 types d'emails indispensables et comparatif Klaviyo vs Omnisend vs Mailchimp.",
    type: "article",
  },
};

const EMAIL_TYPES = [
  {
    type: "Email de bienvenue",
    description:
      "Déclenché dès l'inscription ou le premier achat, c'est l'email avec le taux d'ouverture le plus élevé (50-70 %). Il pose la relation, présente votre marque et peut inclure un code de réduction pour le premier achat. Une séquence de 2 à 3 emails sur 5 jours est plus efficace qu'un email unique.",
    impact: "Taux d'ouverture : 50-70 %",
  },
  {
    type: "Relance de panier abandonné",
    description:
      "70 % des paniers e-commerce sont abandonnés. Une séquence de 3 emails (à 1 h, 24 h et 72 h) récupère en moyenne 5 à 15 % de ces ventes perdues. L'email à 1 heure est le plus performant — simple rappel du panier avec photo du produit et lien direct vers la caisse.",
    impact: "Récupère 5-15 % des paniers abandonnés",
  },
  {
    type: "Email post-achat",
    description:
      "Envoyé après chaque commande, il inclut la confirmation, les informations de livraison et des conseils d'utilisation. À J+10, demandez un avis. À J+30, proposez un produit complémentaire. Une bonne séquence post-achat augmente le LTV (lifetime value) de 20 à 40 %.",
    impact: "LTV +20-40 %",
  },
  {
    type: "Campagne de réengagement",
    description:
      "Les clients qui n'ont pas acheté depuis 90 à 180 jours nécessitent une séquence de réengagement : un email de rappel, une offre exclusive et un dernier avertissement avant désinscription. Supprimer les inactifs définitifs améliore votre délivrabilité globale.",
    impact: "Maintient la délivrabilité",
  },
  {
    type: "Email promotionnel",
    description:
      "Soldes, ventes flash, Black Friday, anniversaire de la boutique — les campagnes promotionnelles génèrent des pics de revenus. Segmentez par historique d'achat pour envoyer des offres pertinentes. Un email trop générique vers toute votre liste augmente les désinscriptions.",
    impact: "Pic de revenus ponctuels",
  },
  {
    type: "Email transactionnel",
    description:
      "Confirmation de commande, avis d'expédition, notification de livraison — ces emails ont des taux d'ouverture de 60 à 80 % car ils sont attendus. Profitez-en pour inclure des recommandations de produits ou une invitation à suivre votre marque sur les réseaux sociaux.",
    impact: "Taux d'ouverture : 60-80 %",
  },
];

const VS_COMPARAISONS = [
  {
    slugA: "klaviyo",
    slugB: "omnisend",
    labelA: "Klaviyo",
    labelB: "Omnisend",
    resume:
      "Klaviyo excelle en segmentation comportementale avancée et en analytics. Omnisend est plus abordable avec des fonctionnalités multi-canaux (SMS, push) incluses dans tous les plans. Klaviyo est recommandé pour les boutiques avec un catalogue large ; Omnisend pour les marchands qui veulent une solution simple et économique.",
  },
  {
    slugA: "klaviyo",
    slugB: "mailchimp",
    labelA: "Klaviyo",
    labelB: "Mailchimp",
    resume:
      "Klaviyo est conçu spécifiquement pour l'e-commerce avec des intégrations Shopify/WooCommerce natives et un ROI mesurable par séquence. Mailchimp est plus généraliste mais propose des intégrations e-commerce solides. Pour une boutique en croissance, Klaviyo s'impose ; pour une boutique débutante avec un petit budget, Mailchimp peut suffire.",
  },
  {
    slugA: "omnisend",
    slugB: "mailchimp",
    labelA: "Omnisend",
    labelB: "Mailchimp",
    resume:
      "Omnisend est pensé pour l'e-commerce avec des workflows automatisés prêts à l'emploi (panier abandonné, post-achat). Mailchimp est plus polyvalent mais moins spécialisé en e-commerce. Omnisend est généralement moins cher que Mailchimp pour un volume équivalent de contacts.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Quel outil emailing est le meilleur pour une boutique Shopify ?",
    answer:
      "Klaviyo est le choix numéro un pour Shopify grâce à son intégration native profonde : synchronisation en temps réel des données produits, segmentation par comportement d'achat, templates e-commerce optimisés et attribution des revenus par email. Omnisend est une alternative plus économique avec une intégration Shopify également solide. Shopify Email (natif dans Shopify) convient pour les très petites boutiques avec des besoins basiques.",
  },
  {
    question: "Comment calculer le ROI de mes campagnes emailing e-commerce ?",
    answer:
      "Le ROI emailing e-commerce = (revenus générés par email - coût de l'outil) / coût de l'outil × 100. Pour mesurer les revenus générés, activez le tracking e-commerce dans votre outil (Klaviyo, Omnisend et Mailchimp l'intègrent nativement). Attribuez les ventes sur une fenêtre de 5 jours après l'ouverture ou 1 jour après le clic. Un ROI moyen e-commerce se situe entre 3 000 % et 4 200 % (soit 30 à 42 € pour chaque euro investi).",
  },
  {
    question: "À quelle fréquence envoyer des emails à mes clients e-commerce ?",
    answer:
      "La fréquence optimale dépend de votre secteur et de votre catalogue. Pour une boutique e-commerce classique : 1 à 2 emails/semaine maximum hors périodes promotionnelles. Durant le Black Friday ou les soldes, 1 email/jour pendant 3 à 5 jours est acceptable si vos abonnés l'ont anticipé. Segmentez vos abonnés par engagement : envoyez plus souvent aux plus actifs, moins souvent (ou supprimez) les inactifs.",
  },
  {
    question: "La relance de panier abandonné est-elle compatible avec le RGPD ?",
    answer:
      "Oui, à condition que le visiteur ait déjà créé un compte ou fourni son email lors d'une étape précédente du tunnel de commande. Vous ne pouvez pas envoyer d'email de relance panier à un visiteur anonyme. La relation commerciale établie (prospect ayant initié une transaction) justifie la relance sans nouveau consentement explicite, à condition d'inclure un lien de désinscription dans chaque email.",
  },
];

export default function EmailingEcommercePage() {
  const ecommerceTools = getAllTools()
    .filter((t) => t.idealPour.includes("ecommerce"))
    .sort((a, b) => b.noteGlobale - a.noteGlobale);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Emailing e-commerce : outils et stratégies pour booster vos ventes",
    description:
      "Meilleurs outils emailing pour e-commerce, 6 types d'emails indispensables et comparatif Klaviyo vs Omnisend vs Mailchimp.",
    url: `${BASE_URL}/emailing-ecommerce`,
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "ToolPick" },
    publisher: { "@type": "Organization", name: "ToolPick" },
  };

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Accueil", url: BASE_URL },
    { name: "Emailing e-commerce", url: `${BASE_URL}/emailing-ecommerce` },
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
                  Emailing e-commerce
                </li>
              </ol>
            </nav>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Emailing e-commerce&nbsp;: outils et stratégies pour booster vos ventes
            </h1>
            <p className="text-lg text-gray-500">
              Comparatif des meilleurs outils emailing pour boutiques en ligne,
              6 types d&apos;emails indispensables et stratégies éprouvées pour
              augmenter votre chiffre d&apos;affaires en 2026.
            </p>
          </div>
        </section>

        <div className="px-4 py-14">
          <div className="mx-auto max-w-3xl space-y-20">

            {/* ─ Section 1 : Pourquoi l'emailing est indispensable ─────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Pourquoi l&apos;emailing est indispensable en e-commerce
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  L&apos;email marketing est le canal de rétention le plus rentable pour
                  les boutiques en ligne. Selon Klaviyo et DMA, il génère en moyenne{" "}
                  <strong>42 € de revenus pour chaque euro investi</strong> en e-commerce —
                  soit un ROI supérieur à celui des publicités Facebook, Google Shopping ou
                  du SEO seul. Contrairement à ces canaux, l&apos;email ne dépend d&apos;aucun
                  algorithme tiers et les contacts acquis vous appartiennent durablement.
                </p>
                <p>
                  Les chiffres parlent d&apos;eux-mêmes&nbsp;: les séquences de panier
                  abandonné génèrent en moyenne{" "}
                  <strong>5 à 15 % de revenus supplémentaires</strong> sur des ventes
                  qui auraient été définitivement perdues. Les emails de bienvenue affichent
                  des taux d&apos;ouverture de 50 à 70 %. Les emails post-achat augmentent
                  la valeur à vie client (LTV) de 20 à 40 %. Pour une boutique réalisant
                  50 000 € de CA mensuel, une stratégie emailing bien exécutée peut
                  représenter 8 000 à 15 000 € de revenus additionnels.
                </p>
                <p>
                  En 2026, les outils e-commerce comme Klaviyo et Omnisend intègrent
                  nativement les données Shopify et WooCommerce en temps réel&nbsp;:
                  produits consultés, articles achetés, montant du panier, fréquence
                  d&apos;achat. Cette granularité permet une personnalisation qui dépasse
                  de loin ce que permettent les campagnes display ou les posts sur
                  les réseaux sociaux.
                </p>
              </div>
            </section>

            {/* ─ Section 2 : Meilleurs outils ──────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les meilleurs outils emailing e-commerce
              </h2>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Ces outils sont particulièrement adaptés aux boutiques en ligne,
                classés par note décroissante.
              </p>
              <div className="space-y-4">
                {ecommerceTools.map((tool) => (
                  <div key={tool.slug} className="rounded-xl border border-gray-200 p-5">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <a
                          href={`/alternative/${tool.slug}`}
                          className="font-semibold text-gray-900 hover:underline"
                        >
                          {tool.nom}
                        </a>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {tool.descriptionCourte}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 text-sm text-gray-500">
                        <span className="font-semibold text-gray-900">
                          {tool.noteGlobale}/5
                        </span>
                        <span>
                          {tool.prixDepart === null
                            ? "Sur devis"
                            : tool.prixDepart === 0
                            ? "Gratuit"
                            : `À partir de ${tool.prixDepart} €/mois`}
                        </span>
                      </div>
                    </div>
                    <AffiliateButton tool={tool} variant="outline" />
                  </div>
                ))}
              </div>
            </section>

            {/* ─ Section 3 : Types d'emails ────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les emails e-commerce indispensables
              </h2>
              <div className="space-y-4">
                {EMAIL_TYPES.map((et, idx) => (
                  <div key={idx} className="rounded-xl border border-gray-200 p-5">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-gray-900">{et.type}</p>
                      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        {et.impact}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{et.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ─ Section 4 : Comparatif rapide ─────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Klaviyo vs Omnisend vs Mailchimp pour l&apos;e-commerce
              </h2>
              <div className="space-y-4">
                {VS_COMPARAISONS.map((vs) => {
                  const href = `/${getVsPageSlug(vs.slugA, vs.slugB)}`;
                  return (
                    <div key={href} className="rounded-xl border border-gray-200 p-5">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-gray-900">
                          {vs.labelA}{" "}
                          <span className="font-normal text-gray-400">vs</span>{" "}
                          {vs.labelB}
                        </p>
                        <a
                          href={href}
                          className="text-xs font-medium text-gray-500 underline underline-offset-2 hover:text-gray-800"
                        >
                          Comparatif complet →
                        </a>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600">{vs.resume}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ─ FAQ ───────────────────────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Questions fréquentes
              </h2>
              <dl className="space-y-5">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.question} className="rounded-xl border border-gray-200 p-6">
                    <dt className="mb-2 font-semibold text-gray-900">{item.question}</dt>
                    <dd className="text-sm leading-relaxed text-gray-700">{item.answer}</dd>
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
