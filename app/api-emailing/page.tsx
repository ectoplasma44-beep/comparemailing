import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import { generateBreadcrumbJsonLd } from "@/lib/breadcrumb";
import AffiliateButton from "@/components/AffiliateButton";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "API emailing — Meilleurs services et guide d'intégration 2026",
  description:
    "Comparatif des meilleures API emailing pour développeurs en 2026 : Brevo, Mailjet, Mailchimp. Guide d'intégration, webhooks, SDKs et critères de choix.",
  alternates: { canonical: "/api-emailing" },
  openGraph: {
    title: "API emailing — Meilleurs services et guide d'intégration 2026",
    description:
      "Guide d'intégration API emailing pour développeurs : comparatif des services, exemple de code, webhooks, SDKs et critères de choix en 2026.",
    type: "article",
  },
};

const CRITERES = [
  {
    critere: "Délivrabilité",
    description:
      "La délivrabilité est le critère le plus important pour une API emailing transactionnelle. Vérifiez les taux publiés par des tests indépendants (EmailToolTester, Litmus). Brevo et Mailjet, hébergés en Europe, affichent régulièrement des scores supérieurs à 95 % sur Gmail et Outlook. Une mauvaise délivrabilité rend inutile toute autre fonctionnalité.",
  },
  {
    critere: "Qualité de la documentation",
    description:
      "Une bonne API emailing se reconnaît à sa documentation : guides de démarrage rapide, référence complète des endpoints, exemples de code dans plusieurs langages (Node.js, Python, PHP, Ruby), changelog versionné et guide de migration. Testez la documentation avant de vous engager — une intégration ratée coûte plus cher que l'abonnement.",
  },
  {
    critere: "Structure tarifaire",
    description:
      "Les APIs emailing facturent généralement à l'email envoyé ou par tranche mensuelle. Comparez le coût réel à votre volume : à 100 000 emails/mois, Brevo coûte environ 25 €, Mailjet environ 35 €. Vérifiez aussi les frais cachés : coût des webhooks, des logs rétention, des IPs dédiées et des contacts supplémentaires si la plateforme facture aussi au nombre de contacts.",
  },
  {
    critere: "Webhooks et événements temps réel",
    description:
      "Les webhooks permettent à votre application de réagir aux événements d'envoi en temps réel : email livré, ouvert, cliqué, bounced, signalé comme spam. Cette visibilité est indispensable pour mettre à jour votre CRM, déclencher des actions dans votre application ou nettoyer votre liste automatiquement. Vérifiez la granularité des événements et la fiabilité de la livraison des webhooks.",
  },
  {
    critere: "SDKs et librairies officielles",
    description:
      "Un SDK officiel pour votre stack technique réduit considérablement le temps d'intégration. Brevo propose des SDKs pour Node.js, Python, PHP, Java, Ruby, Go et C#. Mailjet couvre Node.js, Python, PHP, Ruby et Java. Vérifiez que le SDK est maintenu activement (dernière mise à jour, issues ouvertes sur GitHub) avant de baser votre intégration dessus.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Quelle est la différence entre une API REST emailing et un relay SMTP ?",
    answer:
      "Un relay SMTP utilise le protocole email standard (connexion TCP sur le port 587 ou 465, authentification LOGIN ou PLAIN). Une API REST emailing utilise des requêtes HTTP (POST) avec des payloads JSON. L'API REST est généralement plus simple à intégrer dans les applications modernes, offre plus de fonctionnalités (tags, métadonnées, gestion de listes) et a une meilleure gestion des erreurs. Le relay SMTP est utile pour les applications qui utilisent déjà des librairies d'envoi standard (Nodemailer, PHPMailer, smtplib) sans vouloir les refactoriser.",
  },
  {
    question: "Comment gérer les bounces et les plaintes spam via l'API ?",
    answer:
      "Configurez des webhooks sur votre service emailing pour recevoir les événements de bounce (hard et soft) et les plaintes spam. Votre application doit supprimer ou marquer comme inactifs les contacts qui génèrent des hard bounces (adresse inexistante), et désabonner automatiquement ceux qui signalent vos emails comme spam. La plupart des services (Brevo, Mailjet) gèrent automatiquement les suppressions mais il est recommandé de synchroniser ces statuts dans votre propre base de données.",
  },
  {
    question: "Quelle API emailing choisir pour une application Next.js ou Node.js ?",
    answer:
      "Brevo et Mailjet proposent tous deux des SDKs Node.js officiels bien maintenus. Pour Next.js spécifiquement, l'API REST via fetch ou axios fonctionne parfaitement depuis les Server Actions ou les Route Handlers. Brevo est souvent préféré pour ses tarifs compétitifs et son support francophone. Pour les très faibles volumes, le SDK @sendgrid/mail est aussi une option populaire dans l'écosystème Node.js.",
  },
  {
    question: "Comment tester une API emailing sans envoyer de vrais emails ?",
    answer:
      "La plupart des services proposent un mode sandbox ou des adresses de test dédiées. Brevo propose un mode test qui simule l'envoi sans livraison réelle. Alternativement, utilisez Mailtrap ou Mailhog en développement — ces outils interceptent tous les emails envoyés depuis votre environnement local et les affichent dans une interface web sans les livrer. En staging, configurez une liste blanche d'adresses autorisées à recevoir de vrais emails.",
  },
];

const CODE_EXAMPLE = `// Exemple générique : envoi d'un email transactionnel via API REST
// Adaptez l'URL et les headers à votre service (Brevo, Mailjet, etc.)

const response = await fetch("https://api.votre-service-smtp.com/v3/smtp/email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": process.env.EMAIL_API_KEY,
  },
  body: JSON.stringify({
    sender: {
      name: "Votre App",
      email: "noreply@votredomaine.fr",
    },
    to: [
      {
        email: destinataire,
        name: nomDestinataire,
      },
    ],
    subject: "Confirmation de votre commande #" + orderId,
    htmlContent: \`
      <h1>Merci pour votre commande !</h1>
      <p>Bonjour \${nomDestinataire},</p>
      <p>Votre commande <strong>#\${orderId}</strong> a bien été reçue.</p>
      <p>Vous recevrez un email d'expédition dès que votre colis sera pris en charge.</p>
    \`,
    // Métadonnées pour les webhooks et le tracking
    tags: ["transactionnel", "commande"],
    params: {
      orderId: orderId,
    },
  }),
});

if (!response.ok) {
  const error = await response.json();
  throw new Error(\`Échec d'envoi email : \${error.message}\`);
}

const result = await response.json();
console.log("Email envoyé, messageId :", result.messageId);`;

export default function ApiEmailingPage() {
  const apiTools = getAllTools()
    .filter((t) => t.features.api)
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
    headline: "API emailing : les meilleurs services pour les développeurs",
    description:
      "Comparatif des meilleures APIs emailing pour développeurs : Brevo, Mailjet, Mailchimp. Guide d'intégration, webhooks, SDKs et critères de choix.",
    url: `${BASE_URL}/api-emailing`,
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "ToolPick" },
    publisher: { "@type": "Organization", name: "ToolPick" },
  };

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Accueil", url: BASE_URL },
    { name: "API emailing", url: `${BASE_URL}/api-emailing` },
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
                  API emailing
                </li>
              </ol>
            </nav>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              API emailing&nbsp;: les meilleurs services pour les développeurs
            </h1>
            <p className="text-lg text-gray-500">
              Comparatif des APIs emailing, guide d&apos;intégration avec exemple
              de code, webhooks, SDKs et critères de choix pour intégrer l&apos;envoi
              d&apos;emails dans votre application en 2026.
            </p>
          </div>
        </section>

        <div className="px-4 py-14">
          <div className="mx-auto max-w-3xl space-y-20">

            {/* ─ Section 1 : Pourquoi ──────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Pourquoi utiliser une API emailing&nbsp;?
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Une API emailing est indispensable dès que votre application doit
                  envoyer des emails de manière programmatique. Les cas d&apos;usage
                  sont nombreux&nbsp;:{" "}
                  <strong>emails transactionnels</strong> (confirmation de commande,
                  réinitialisation de mot de passe, facture PDF), notifications
                  automatiques (alerte de stock, rapport hebdomadaire, rappel
                  d&apos;événement) et <strong>marketing programmé</strong>
                  (email d&apos;anniversaire déclenché par votre CRM, relance basée
                  sur un événement applicatif). Dans tous ces cas, l&apos;envoi est
                  déclenché par votre code, pas par un marketeur depuis une interface.
                </p>
                <p>
                  La différence avec un envoi SMTP maison est significative. Héberger
                  votre propre serveur d&apos;envoi (Postfix, Exim) implique de gérer
                  la réputation IP, les blacklists, les bounces, les plaintes spam
                  et les mises à jour de sécurité — une charge opérationnelle importante.
                  Un <strong>service API emailing</strong> externalise tout cela&nbsp;:
                  vous appelez un endpoint HTTP, le service s&apos;occupe de la
                  délivrabilité, des logs, des statistiques et de la conformité. Vous
                  vous concentrez sur votre produit.
                </p>
                <p>
                  Les APIs modernes offrent bien plus qu&apos;un simple envoi. Elles
                  exposent des{" "}
                  <strong>webhooks temps réel</strong> pour les événements (livraison,
                  ouverture, clic, bounce, plainte), des{" "}
                  <strong>templates dynamiques</strong> avec variables, de la
                  <strong> gestion de listes</strong> et des suppressions automatiques,
                  et des <strong>analytics par email</strong>. Certains services
                  (Brevo, Mailjet) proposent aussi la gestion des emails marketing
                  depuis la même API, centralisant l&apos;ensemble de vos envois.
                </p>
              </div>
            </section>

            {/* ─ Section 2 : Meilleures APIs ───────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les meilleures API emailing
              </h2>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Ces services proposent une API REST documentée, des SDKs officiels
                et des webhooks d&apos;événements. Classés par note décroissante.
              </p>
              <div className="space-y-4">
                {apiTools.map((tool) => (
                  <div key={tool.slug} className="rounded-xl border border-gray-200 p-5">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={`/alternative/${tool.slug}`}
                            className="font-semibold text-gray-900 hover:underline"
                          >
                            {tool.nom}
                          </a>
                          {tool.planGratuit && (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                              Plan gratuit
                            </span>
                          )}
                          {tool.features.supportFrancais && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                              Support FR
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {tool.descriptionCourte}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1 text-sm">
                        <span className="font-semibold text-gray-900">
                          {tool.noteGlobale}/5
                        </span>
                        <span className="text-gray-500">
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

            {/* ─ Section 3 : Exemple d'intégration ────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Exemple d&apos;intégration API
              </h2>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Voici un exemple générique d&apos;envoi d&apos;email transactionnel
                via une API REST (compatible avec Brevo, Mailjet et la plupart des
                services du marché — adaptez l&apos;URL et les noms de champs à
                votre service).
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-950">
                <pre className="p-5 text-xs leading-relaxed text-gray-100">
                  <code>{CODE_EXAMPLE}</code>
                </pre>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Stockez toujours votre clé API dans une variable d&apos;environnement
                (
                <code className="rounded bg-gray-100 px-1 text-xs">
                  process.env.EMAIL_API_KEY
                </code>
                ) et ne la committez jamais dans votre dépôt Git.
              </p>
            </section>

            {/* ─ Section 4 : Critères de choix ─────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Critères de choix d&apos;une API emailing
              </h2>
              <div className="space-y-4">
                {CRITERES.map((c, idx) => (
                  <div key={idx} className="rounded-xl border border-gray-200 p-5">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                      <p className="font-semibold text-gray-900">{c.critere}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{c.description}</p>
                  </div>
                ))}
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
