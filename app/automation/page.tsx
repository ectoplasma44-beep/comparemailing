import type { Metadata } from "next";
import { getAllTools, getToolBySlug } from "@/data/tools";
import { generateBreadcrumbJsonLd } from "@/lib/breadcrumb";
import AffiliateButton from "@/components/AffiliateButton";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Marketing automation emailing — Guide et meilleurs outils 2026",
  description:
    "Comprendre le marketing automation : définition, séquences indispensables, comparatif des meilleurs outils et recommandations selon votre niveau. Guide complet 2026.",
  alternates: { canonical: "/automation" },
  openGraph: {
    title: "Marketing automation emailing — Guide et meilleurs outils 2026",
    description:
      "Guide complet sur le marketing automation : séquences de bienvenue, relance panier, nurturing B2B et comparatif des meilleurs outils en 2026.",
    type: "article",
  },
};

const SEQUENCES = [
  {
    titre: "Séquence de bienvenue (3 emails)",
    description:
      "La séquence de bienvenue est la plus rentable de toutes : elle enregistre un taux d'ouverture de 50 à 70 %. Email 1 (immédiat) : accueil, livraison du lead magnet et présentation de votre univers. Email 2 (J+2) : votre histoire, vos valeurs et ce qui vous différencie. Email 3 (J+5) : votre meilleur contenu, une offre d'entrée de gamme ou une invitation à répondre. Ces trois emails posent la relation et filtrent vos abonnés les plus engagés.",
  },
  {
    titre: "Relance panier abandonné (e-commerce)",
    description:
      "Environ 70 % des paniers e-commerce sont abandonnés avant paiement. Une séquence en 3 emails récupère en moyenne 5 à 15 % de ces ventes perdues. Email 1 (1 h après l'abandon) : rappel simple du panier avec un lien direct. Email 2 (24 h après) : réponse aux objections les plus courantes (frais de livraison, retours, sécurité). Email 3 (72 h après) : offre de réduction ou de livraison gratuite pour finaliser l'achat.",
  },
  {
    titre: "Nurturing leads (B2B)",
    description:
      "En B2B, le cycle de décision dure en moyenne 3 à 6 mois. Une séquence de nurturing maintient le lien avec des prospects qui ne sont pas encore prêts à acheter. Alternez entre contenu éducatif (études de cas, guides, webinaires), social proof (témoignages clients, chiffres) et appels à l'action progressifs (démo, essai gratuit, consultation). L'objectif est d'être présent au moment où le prospect décide de passer à l'action.",
  },
  {
    titre: "Réengagement des inactifs",
    description:
      "Les contacts inactifs depuis plus de 90 jours dégradent votre délivrabilité et votre réputation d'envoi. Une séquence de réengagement en 2 à 3 emails tente de les récupérer avant suppression. Email 1 : message personnalisé de type « On vous a perdu ? ». Email 2 (J+7) : offre exclusive ou contenu premium. Email 3 (J+14) : dernier avertissement avant désinscription automatique. Supprimer les contacts définitivement inactifs améliore immédiatement vos taux d'ouverture.",
  },
  {
    titre: "Séquence post-achat",
    description:
      "Le moment le plus favorable pour fidéliser un client est juste après son premier achat. Email 1 (confirmation immédiate) : remerciement chaleureux et informations pratiques. Email 2 (J+3) : conseils d'utilisation ou contenu pour maximiser la valeur du produit. Email 3 (J+10) : demande d'avis ou d'évaluation. Email 4 (J+30) : proposition de produits complémentaires ou de montée en gamme. Une séquence post-achat bien conçue augmente le LTV (lifetime value) de 20 à 40 %.",
  },
];

const LEVEL_RECOMMENDATIONS = [
  {
    niveau: "Débutant",
    description:
      "Vous démarrez en automation et cherchez une prise en main rapide sans courbe d'apprentissage. MailerLite propose un constructeur de workflows visuels intuitif avec des templates d'automation prédéfinis. Brevo est tout aussi accessible avec l'avantage de contacts illimités sur le plan gratuit et un support francophone. Ces deux outils couvrent largement les besoins d'une séquence de bienvenue et de réengagement.",
    slugs: ["mailerlite", "brevo"],
  },
  {
    niveau: "Intermédiaire",
    description:
      "Vous maîtrisez les bases et voulez des workflows plus complexes : conditions, branches, scoring, intégrations CRM. GetResponse offre un constructeur d'automation visuel puissant avec des fonctionnalités de scoring de contacts, de tags comportementaux et d'intégration e-commerce, le tout à un tarif compétitif. Idéal pour les TPE et startups en croissance.",
    slugs: ["getresponse"],
  },
  {
    niveau: "Avancé",
    description:
      "Vous avez des besoins d'automation complexes : scoring multi-critères, CRM intégré, attribution multi-canaux, API robuste et reporting avancé. ActiveCampaign est la référence pour les équipes marketing exigeantes. Ses workflows conditionnels, son CRM intégré et ses capacités de segmentation comportementale n'ont pas d'équivalent dans cette gamme de prix.",
    slugs: ["activecampaign"],
  },
];

const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que le marketing automation en emailing ?",
    answer:
      "Le marketing automation en emailing consiste à envoyer automatiquement des emails personnalisés en réponse à des comportements ou des événements précis : inscription à une newsletter, achat sur votre boutique, inactivité prolongée, anniversaire. Contrairement aux campagnes manuelles, les automations fonctionnent 24h/24 sans intervention humaine une fois configurées.",
  },
  {
    question: "Quel outil d'automation est le plus abordable pour débuter ?",
    answer:
      "MailerLite et Brevo sont les options les plus accessibles pour débuter. MailerLite propose l'automation complète sur son plan gratuit (jusqu'à 1 000 abonnés). Brevo offre des contacts illimités et des automations de base gratuitement. Les deux sont disponibles en français et ne nécessitent pas de compétences techniques particulières.",
  },
  {
    question: "Combien d'emails inclure dans une séquence de bienvenue ?",
    answer:
      "Une séquence de bienvenue efficace compte 3 à 5 emails sur une période de 7 à 14 jours. Trois emails est le minimum recommandé : un email de bienvenue immédiat, un email de présentation à J+2 et un email de valeur à J+5. Au-delà de 5 emails, le risque de désabonnement augmente si chaque email n'apporte pas une valeur claire et distincte.",
  },
  {
    question: "Quelle est la différence entre automation et campagne emailing ?",
    answer:
      "Une campagne emailing est envoyée manuellement à un moment donné à un segment de contacts. Une automation est un workflow déclenché automatiquement par un événement (inscription, achat, clic, date). Les campagnes servent pour les newsletters régulières et les promotions ponctuelles. Les automations gèrent les parcours clients et les séquences de nurturing en continu.",
  },
  {
    question: "L'automation emailing nécessite-t-elle des compétences techniques ?",
    answer:
      "Non. Les outils modernes comme MailerLite, Brevo ou GetResponse proposent des constructeurs de workflows visuels par glisser-déposer. Vous définissez un déclencheur (ex. : inscription), des conditions (ex. : a ouvert l'email 1) et des actions (ex. : envoyer l'email 2). Aucune ligne de code n'est nécessaire pour configurer des automations efficaces. Les compétences techniques deviennent utiles uniquement pour des intégrations API avancées.",
  },
];

export default function AutomationPage() {
  const automationTools = getAllTools()
    .filter((t) => t.features.automation)
    .sort((a, b) => b.noteGlobale - a.noteGlobale);

  const levelToolMap = LEVEL_RECOMMENDATIONS.map((rec) => ({
    ...rec,
    tools: rec.slugs.map((slug) => getToolBySlug(slug)).filter(Boolean),
  }));

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
    headline: "Marketing automation : guide complet et outils recommandés",
    description:
      "Guide complet sur le marketing automation : définition, séquences indispensables, comparatif des meilleurs outils et recommandations selon votre niveau.",
    url: `${BASE_URL}/automation`,
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "ToolPick" },
    publisher: { "@type": "Organization", name: "ToolPick" },
  };

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Accueil", url: BASE_URL },
    { name: "Marketing automation", url: `${BASE_URL}/automation` },
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
                  Marketing automation
                </li>
              </ol>
            </nav>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Marketing automation&nbsp;: guide complet et outils recommandés
            </h1>
            <p className="text-lg text-gray-500">
              Définition, séquences indispensables, comparatif des meilleurs
              outils et recommandations selon votre niveau — tout ce qu&apos;il
              faut pour automatiser votre marketing email en 2026.
            </p>
          </div>
        </section>

        {/* ── CONTENU ──────────────────────────────────────────────────────── */}
        <div className="px-4 py-14">
          <div className="mx-auto max-w-3xl space-y-20">

            {/* ─ Section 1 : Définition ────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Qu&apos;est-ce que le marketing automation&nbsp;?
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Le marketing automation est l&apos;ensemble des techniques permettant
                  d&apos;envoyer automatiquement des messages personnalisés en réponse à
                  des comportements ou des événements précis. En emailing, cela signifie
                  déclencher un email — ou une séquence d&apos;emails — dès qu&apos;un
                  contact s&apos;inscrit à votre liste, visite une page clé, abandonne un
                  panier ou reste inactif depuis 90 jours. Contrairement à une campagne
                  manuelle,{" "}
                  <strong>une automation fonctionne 24h/24 sans intervention humaine</strong>{" "}
                  une fois configurée.
                </p>
                <p>
                  Les exemples concrets sont nombreux. Une{" "}
                  <strong>séquence de bienvenue</strong> envoie automatiquement 3 emails
                  sur 5 jours à chaque nouvel abonné. Une{" "}
                  <strong>relance de panier abandonné</strong> contacte le visiteur 1 heure,
                  24 heures et 72 heures après qu&apos;il a quitté votre boutique sans
                  finaliser son achat. Un{" "}
                  <strong>email d&apos;anniversaire</strong> avec un code de réduction part
                  automatiquement le jour J. Ces scénarios, autrefois réservés aux grandes
                  entreprises, sont aujourd&apos;hui accessibles à partir de 15 €/mois.
                </p>
                <p>
                  Les bénéfices mesurables sont significatifs. Les emails automatisés
                  génèrent en moyenne{" "}
                  <strong>320 % de revenus supplémentaires</strong> par rapport aux
                  campagnes manuelles (source&nbsp;: Campaign Monitor). Le taux d&apos;ouverture
                  des emails de bienvenue automatisés dépasse 50 %, contre 20 à 25 % pour
                  une campagne classique. En libérant votre équipe des tâches répétitives,
                  l&apos;automation vous permet de vous concentrer sur la stratégie et la
                  création de contenu à forte valeur ajoutée.
                </p>
              </div>
            </section>

            {/* ─ Section 2 : Meilleurs outils ──────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les meilleurs outils d&apos;automation emailing
              </h2>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Tous les outils ci-dessous disposent d&apos;un moteur d&apos;automation,
                classés par note décroissante.
              </p>
              <div className="space-y-4">
                {automationTools.map((tool) => (
                  <div
                    key={tool.slug}
                    className="rounded-xl border border-gray-200 p-5"
                  >
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

            {/* ─ Section 3 : Séquences indispensables ─────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les séquences automation indispensables
              </h2>
              <div className="space-y-5">
                {SEQUENCES.map((seq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                      <p className="font-semibold text-gray-900">{seq.titre}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {seq.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ─ Section 4 : Choisir selon son niveau ─────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Choisir son outil selon son niveau
              </h2>
              <div className="space-y-5">
                {levelToolMap.map((rec) => (
                  <div
                    key={rec.niveau}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-gray-900">{rec.niveau}</p>
                      {rec.tools.map((tool) =>
                        tool ? (
                          <span
                            key={tool.slug}
                            className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-800"
                          >
                            {tool.nom}
                          </span>
                        ) : null
                      )}
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">
                      {rec.description}
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      {rec.tools.map((tool) =>
                        tool ? (
                          <AffiliateButton
                            key={tool.slug}
                            tool={tool}
                            variant="outline"
                          />
                        ) : null
                      )}
                    </div>
                  </div>
                ))}
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
