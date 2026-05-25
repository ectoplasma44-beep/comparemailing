import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import { generateBreadcrumbJsonLd } from "@/lib/breadcrumb";
import AffiliateButton from "@/components/AffiliateButton";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Meilleur serveur SMTP emailing 2026 — Comparatif et guide",
  description:
    "Comparatif des meilleurs serveurs SMTP en 2026 : Brevo, Mailjet, Mailchimp. Configuration SPF, DKIM, DMARC et options gratuites pour l'envoi d'emails transactionnels.",
  alternates: { canonical: "/smtp" },
  openGraph: {
    title: "Meilleur serveur SMTP emailing 2026 — Comparatif et guide",
    description:
      "Guide technique sur les serveurs SMTP : comparatif des meilleurs services, configuration DNS et options gratuites pour développeurs et marketeurs.",
    type: "article",
  },
};

const ETAPES_CONFIG = [
  {
    titre: "Configurer vos enregistrements DNS",
    description:
      "Accédez au gestionnaire DNS de votre domaine (OVH, Cloudflare, Gandi…). Vous devrez y ajouter plusieurs enregistrements TXT et CNAME dans les étapes suivantes. Prévoyez un délai de propagation DNS de 15 minutes à 48 heures selon votre hébergeur.",
  },
  {
    titre: "Ajouter l'enregistrement SPF",
    description:
      "SPF (Sender Policy Framework) liste les serveurs autorisés à envoyer des emails en votre nom. Ajoutez un enregistrement TXT sur votre domaine racine, par exemple : v=spf1 include:spf.brevo.com include:spf.mailjet.com ~all. Si vous utilisez plusieurs services d'envoi, combinez-les dans un seul enregistrement SPF.",
  },
  {
    titre: "Configurer DKIM",
    description:
      "DKIM (DomainKeys Identified Mail) ajoute une signature cryptographique à chaque email. Votre service SMTP vous fournit une clé publique à ajouter en enregistrement TXT ou CNAME dans votre DNS (ex. : brevo._domainkey.votredomaine.fr). La clé privée reste sur les serveurs du service SMTP et signe chaque email à l'envoi.",
  },
  {
    titre: "Mettre en place DMARC",
    description:
      "DMARC (Domain-based Message Authentication) indique aux serveurs destinataires comment traiter les emails échouant SPF ou DKIM. Commencez en mode surveillance : v=DMARC1; p=none; rua=mailto:dmarc@votredomaine.fr. Après 2 semaines d'analyse des rapports, passez à p=quarantine puis p=reject pour protéger votre domaine contre le spoofing.",
  },
  {
    titre: "Tester votre configuration",
    description:
      "Utilisez Mail-Tester.com (envoyez un email à l'adresse fournie, score sur 10) et MXToolbox pour vérifier SPF, DKIM et DMARC. Vérifiez aussi que votre domaine n'est pas blacklisté via MXToolbox Blacklist Check. Un score Mail-Tester de 9/10 ou plus garantit une délivrabilité optimale.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Quelle est la différence entre un serveur SMTP et un ESP ?",
    answer:
      "Un serveur SMTP (Simple Mail Transfer Protocol) est le protocole technique qui transporte les emails d'un serveur à un autre. Un ESP (Email Service Provider) comme Brevo ou Mailchimp est un service complet qui inclut un serveur SMTP mais aussi une interface graphique, des templates, des analytics, de la gestion de listes et de l'automation. Pour envoyer des emails transactionnels depuis une application, vous pouvez utiliser directement le relay SMTP d'un service sans passer par son interface graphique.",
  },
  {
    question: "Puis-je utiliser Gmail comme serveur SMTP pour mon application ?",
    answer:
      "Techniquement oui, mais ce n'est pas recommandé en production. Gmail limite les envois à 500 emails/jour via SMTP (2 000 avec Google Workspace). Pour une application envoyant des emails transactionnels (confirmations de commande, réinitialisations de mot de passe), utilisez un service SMTP dédié comme Brevo, Mailjet ou Amazon SES. Ces services offrent des limites bien plus élevées, une meilleure délivrabilité et des logs détaillés.",
  },
  {
    question: "Quel port SMTP utiliser ?",
    answer:
      "Le port 25 est le port SMTP historique mais la plupart des FAI le bloquent pour limiter le spam. Utilisez le port 587 (STARTTLS, recommandé pour l'authentification) ou le port 465 (SMTP over SSL/TLS). Le port 2525 est une alternative quand 587 est bloqué. Votre service SMTP vous indiquera le port à utiliser dans sa documentation.",
  },
  {
    question: "Combien d'emails peut-on envoyer gratuitement via SMTP ?",
    answer:
      "Brevo propose 9 000 emails/mois gratuits via SMTP (300/jour). Mailjet offre 6 000 emails/mois gratuits (200/jour). Amazon SES facture 0,10 $ pour 1 000 emails — quasi gratuit pour de petits volumes. Pour des volumes importants (>50 000 emails/mois), comparez le coût à l'envoi : Brevo, Mailjet et Amazon SES sont généralement les moins chers du marché.",
  },
];

export default function SmtpPage() {
  const apiTools = getAllTools().filter((t) => t.features.api);
  const freeApiTools = apiTools.filter((t) => t.planGratuit);

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
    headline: "Meilleur serveur SMTP pour l'envoi d'emails",
    description:
      "Comparatif des meilleurs serveurs SMTP en 2026 : Brevo, Mailjet, Mailchimp. Configuration SPF, DKIM, DMARC et options gratuites.",
    url: `${BASE_URL}/smtp`,
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "ToolPick" },
    publisher: { "@type": "Organization", name: "ToolPick" },
  };

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Accueil", url: BASE_URL },
    { name: "Serveur SMTP", url: `${BASE_URL}/smtp` },
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
                  Serveur SMTP
                </li>
              </ol>
            </nav>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meilleur serveur SMTP pour l&apos;envoi d&apos;emails
            </h1>
            <p className="text-lg text-gray-500">
              Comparatif des services SMTP, guide de configuration SPF/DKIM/DMARC
              et meilleures options gratuites pour développeurs et équipes
              marketing en 2026.
            </p>
          </div>
        </section>

        <div className="px-4 py-14">
          <div className="mx-auto max-w-3xl space-y-20">

            {/* ─ Section 1 : Définition ────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Qu&apos;est-ce qu&apos;un serveur SMTP&nbsp;?
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  SMTP (Simple Mail Transfer Protocol) est le protocole standard
                  utilisé pour <strong>transférer des emails entre serveurs</strong>.
                  Quand vous envoyez un email depuis votre application, votre code
                  se connecte à un serveur SMTP via les ports 587 ou 465, s&apos;authentifie
                  avec vos identifiants, et remet le message au serveur qui le
                  achemine vers le destinataire. C&apos;est l&apos;équivalent du réseau postal
                  pour les emails&nbsp;: vous déposez votre courrier, le bureau de poste
                  se charge du routage.
                </p>
                <p>
                  La distinction avec un ESP (Email Service Provider) est importante.
                  Un <strong>relay SMTP</strong> est un service purement technique&nbsp;:
                  vous lui envoyez des emails via le protocole SMTP et il les achemine
                  avec une bonne délivrabilité, des logs et des statistiques de base.
                  Un <strong>ESP complet</strong> comme Brevo ou Mailchimp inclut en plus
                  une interface graphique, des templates, de l&apos;automation, de la
                  gestion de listes et des analytics avancés. Vous pouvez utiliser
                  un ESP comme relay SMTP sans jamais toucher à son interface.
                </p>
                <p>
                  Pour un développeur, le relay SMTP est la solution de choix pour
                  les <strong>emails transactionnels</strong>&nbsp;: confirmations de
                  commande, réinitialisations de mot de passe, notifications système,
                  rapports automatiques. Ces emails doivent arriver instantanément,
                  avec une délivrabilité proche de 100 %, et leur envoi doit être
                  déclenché programmatiquement — pas depuis une interface manuelle.
                </p>
              </div>
            </section>

            {/* ─ Section 2 : Meilleurs services SMTP ───────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les meilleurs services SMTP
              </h2>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Ces services proposent tous un relay SMTP fiable avec authentification,
                logs d&apos;envoi et statistiques de délivrabilité.
              </p>
              <div className="space-y-4">
                {apiTools.sort((a, b) => b.noteGlobale - a.noteGlobale).map((tool) => (
                  <div key={tool.slug} className="rounded-xl border border-gray-200 p-5">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`/alternative/${tool.slug}`}
                            className="font-semibold text-gray-900 hover:underline"
                          >
                            {tool.nom}
                          </a>
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

            {/* ─ Section 3 : Configuration ─────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Comment configurer un serveur SMTP
              </h2>
              <ol className="space-y-5">
                {ETAPES_CONFIG.map((etape, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="mb-1.5 font-semibold text-gray-900">{etape.titre}</p>
                      <p className="text-sm leading-relaxed text-gray-600">{etape.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ─ Section 4 : SMTP gratuit ──────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                SMTP gratuit&nbsp;: les meilleures options
              </h2>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Ces services proposent un plan gratuit incluant un accès SMTP — idéal
                pour les projets en développement ou les faibles volumes.
              </p>
              <div className="space-y-3">
                {freeApiTools.map((tool) => {
                  const freeTier = tool.pricing[0];
                  return (
                    <div
                      key={tool.slug}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 px-5 py-4"
                    >
                      <div>
                        <a
                          href={`/alternative/${tool.slug}`}
                          className="font-semibold text-gray-900 hover:underline"
                        >
                          {tool.nom}
                        </a>
                        {freeTier?.emailsMois && (
                          <p className="mt-0.5 text-xs text-gray-500">
                            {freeTier.emailsMois.toLocaleString("fr-FR")} emails/mois gratuits
                            {freeTier.note ? ` — ${freeTier.note}` : ""}
                          </p>
                        )}
                      </div>
                      <AffiliateButton tool={tool} variant="outline" className="w-auto px-4 py-1.5 text-xs" />
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
