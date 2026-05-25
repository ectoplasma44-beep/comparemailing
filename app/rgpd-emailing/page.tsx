import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import { generateBreadcrumbJsonLd } from "@/lib/breadcrumb";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "RGPD et emailing — Guide de conformité 2026",
  description:
    "Tout ce que vous devez savoir sur le RGPD appliqué à l'emailing : consentement, double opt-in, droit à l'oubli, sanctions CNIL et outils conformes. Guide 2026.",
  alternates: { canonical: "/rgpd-emailing" },
  openGraph: {
    title: "RGPD et emailing — Guide de conformité 2026",
    description:
      "Guide de conformité RGPD pour l'emailing : obligations, bonnes pratiques, sanctions et comparatif des outils conformes en 2026.",
    type: "article",
  },
};

const BONNES_PRATIQUES = [
  {
    titre: "Mettre en place le double opt-in",
    description:
      "Le double opt-in envoie un email de confirmation après l'inscription. Le contact ne rejoint votre liste qu'après avoir cliqué sur le lien de confirmation. Cette pratique constitue une preuve de consentement solide et réduit les faux emails, améliorant ainsi la délivrabilité.",
  },
  {
    titre: "Inclure un lien de désinscription dans chaque email",
    description:
      "Chaque email commercial doit contenir un lien de désinscription visible et fonctionnel. La désinscription doit être effective dans un délai maximal de 10 jours selon la CNIL. Utilisez un lien en texte clair et non un bouton difficile à trouver.",
  },
  {
    titre: "Conserver les preuves de consentement",
    description:
      "Votre outil d'emailing doit enregistrer la date, l'heure, l'adresse IP et la source de chaque consentement. En cas de contrôle CNIL, vous devez être capable de prouver que chaque contact a bien consenti à recevoir vos emails. MailerLite, Brevo et ActiveCampaign conservent ces données automatiquement.",
  },
  {
    titre: "Mentionner clairement la finalité lors de l'inscription",
    description:
      "Le formulaire d'inscription doit indiquer explicitement ce que recevra l'abonné (newsletter hebdomadaire, offres promotionnelles, etc.) et la fréquence d'envoi prévue. Un consentement obtenu pour une newsletter ne couvre pas l'envoi d'offres commerciales non annoncées.",
  },
  {
    titre: "Respecter le droit à l'oubli",
    description:
      "Tout contact peut demander la suppression de ses données. Vous disposez d'un mois pour y répondre. Cela inclut la suppression de l'adresse email, de l'historique des clics et de toute donnée personnelle associée. Vérifiez que votre outil permet une suppression complète et traçable.",
  },
  {
    titre: "Héberger les données en Europe",
    description:
      "Le RGPD impose des restrictions strictes sur les transferts de données hors UE. Privilégiez des outils dont les serveurs sont hébergés en Europe : Brevo (France), Sarbacane (France) et MailerLite (Lituanie) répondent à cette exigence. Pour les outils américains (Mailchimp), vérifiez les clauses contractuelles types (CCT).",
  },
];

const SANCTIONS = [
  {
    type: "Amende administrative",
    detail:
      "La CNIL peut infliger des amendes allant jusqu'à 20 millions d'euros ou 4 % du chiffre d'affaires mondial annuel pour les violations les plus graves — le montant le plus élevé étant retenu.",
  },
  {
    type: "Avertissement et mise en demeure",
    detail:
      "Pour les infractions moins graves ou les primo-contrevenants, la CNIL commence souvent par un avertissement formel ou une mise en demeure de se mettre en conformité dans un délai imparti.",
  },
  {
    type: "Exemples concrets",
    detail:
      "En France, plusieurs entreprises ont été sanctionnées pour prospection sans consentement : une amende de 600 000 € pour envoi d'emails sans opt-in (2022), 150 000 € pour absence de lien de désinscription fonctionnel, et 75 000 € pour conservation excessive des données.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Le double opt-in est-il obligatoire pour être conforme au RGPD ?",
    answer:
      "Le double opt-in n'est pas légalement obligatoire selon le texte du RGPD, mais il est fortement recommandé car il constitue la preuve de consentement la plus solide. En cas de litige ou de contrôle CNIL, pouvoir prouver que l'abonné a cliqué sur un lien de confirmation est un avantage considérable. Sans double opt-in, vous devez conserver d'autres preuves de consentement (logs, screenshots du formulaire, horodatage).",
  },
  {
    question: "Puis-je envoyer des emails commerciaux à mes clients existants sans leur accord ?",
    answer:
      "Oui, sous conditions. La directive ePrivacy (transposée en droit français) autorise l'envoi d'emails commerciaux à des clients existants pour des produits ou services similaires à ceux déjà achetés. Cette exception s'appelle la « relation commerciale établie ». Vous devez toutefois avoir proposé lors de l'achat la possibilité de refuser ces communications, et inclure un lien de désinscription dans chaque email.",
  },
  {
    question: "Combien de temps puis-je conserver les données de mes abonnés inactifs ?",
    answer:
      "La CNIL recommande de ne pas conserver les données de contacts inactifs au-delà de 3 ans. Un contact est considéré inactif s'il n'a pas ouvert vos emails ni interagi avec votre site pendant cette période. Passé ce délai, vous devez soit relancer le contact pour recueillir un nouveau consentement, soit supprimer ses données de votre base.",
  },
  {
    question: "Quels outils emailing sont les plus conformes au RGPD ?",
    answer:
      "Brevo (ex-Sendinblue) et Sarbacane sont les outils les plus conformes au RGPD car ce sont des entreprises françaises dont les serveurs sont hébergés en France. MailerLite héberge ses données en Lituanie (UE). Ces trois outils proposent la gestion des consentements, le double opt-in natif, la suppression des données sur demande et des contrats de sous-traitance (DPA) conformes au RGPD.",
  },
];

export default function RgpdEmailingPage() {
  const rgpdTools = getAllTools().filter((t) => t.features.rgpd);

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
    headline: "RGPD et emailing : guide complet de conformité",
    description:
      "Guide de conformité RGPD pour l'emailing : obligations, bonnes pratiques, sanctions et outils conformes.",
    url: `${BASE_URL}/rgpd-emailing`,
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "ToolPick" },
    publisher: { "@type": "Organization", name: "ToolPick" },
  };

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Accueil", url: BASE_URL },
    { name: "RGPD et emailing", url: `${BASE_URL}/rgpd-emailing` },
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
                  RGPD et emailing
                </li>
              </ol>
            </nav>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              RGPD et emailing&nbsp;: guide complet de conformité
            </h1>
            <p className="text-lg text-gray-500">
              Consentement, double opt-in, droit à l&apos;oubli, sanctions CNIL —
              tout ce qu&apos;il faut savoir pour envoyer des emails en conformité
              avec le règlement européen.
            </p>
          </div>
        </section>

        <div className="px-4 py-14">
          <div className="mx-auto max-w-3xl space-y-20">

            {/* ─ Section 1 : Obligations ───────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les obligations RGPD pour l&apos;emailing
              </h2>
              <div className="space-y-5">
                {[
                  {
                    titre: "Consentement explicite et préalable",
                    texte:
                      "Le RGPD exige que le consentement soit libre, spécifique, éclairé et univoque. En pratique, cela signifie une case à cocher non pré-cochée sur votre formulaire d'inscription, accompagnée d'une mention claire sur la nature des emails envoyés. Un simple intérêt légitime ne suffit pas pour l'email marketing B2C.",
                  },
                  {
                    titre: "Droit à l'oubli et portabilité des données",
                    texte:
                      "Tout abonné peut demander à tout moment la suppression de toutes ses données personnelles (droit à l'oubli) ou leur export dans un format lisible (portabilité). Vous disposez d'un mois pour traiter ces demandes. Votre outil d'emailing doit permettre une suppression complète et irréversible de l'historique du contact.",
                  },
                  {
                    titre: "Registre des consentements",
                    texte:
                      "Vous êtes tenu de tenir un registre des traitements et de conserver la preuve de chaque consentement : date, heure, source, texte exact du formulaire au moment de l'inscription. Ce registre doit être accessible en cas de contrôle de la CNIL. Les outils modernes comme Brevo, MailerLite ou ActiveCampaign journalisent automatiquement ces informations.",
                  },
                ].map((item) => (
                  <div
                    key={item.titre}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <p className="mb-2 font-semibold text-gray-900">{item.titre}</p>
                    <p className="text-sm leading-relaxed text-gray-600">{item.texte}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ─ Section 2 : Outils conformes ──────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les outils emailing conformes RGPD
              </h2>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Ces outils proposent nativement la gestion des consentements,
                le double opt-in, la suppression des données et un contrat
                de sous-traitance (DPA) conforme au RGPD.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {rgpdTools.map((tool) => (
                  <a
                    key={tool.slug}
                    href={`/alternative/${tool.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 transition-all hover:border-gray-300 hover:shadow-sm"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:underline">
                        {tool.nom}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {tool.pays} · {tool.noteGlobale}/5
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      Conforme RGPD
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* ─ Section 3 : Bonnes pratiques ──────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les bonnes pratiques
              </h2>
              <ol className="space-y-5">
                {BONNES_PRATIQUES.map((bp, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="mb-1 font-semibold text-gray-900">{bp.titre}</p>
                      <p className="text-sm leading-relaxed text-gray-600">{bp.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ─ Section 4 : Sanctions ─────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les sanctions encourues
              </h2>
              <div className="space-y-4">
                {SANCTIONS.map((s) => (
                  <div
                    key={s.type}
                    className="rounded-xl border border-red-100 bg-red-50 p-5"
                  >
                    <p className="mb-2 font-semibold text-red-900">{s.type}</p>
                    <p className="text-sm leading-relaxed text-red-800">{s.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Source&nbsp;:{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-gray-800"
                >
                  CNIL.fr
                </a>
              </p>
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
