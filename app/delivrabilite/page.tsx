import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import { generateBreadcrumbJsonLd } from "@/lib/breadcrumb";
import AffiliateButton from "@/components/AffiliateButton";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Délivrabilité emailing — Comment améliorer votre taux de réception 2026",
  description:
    "Tout sur la délivrabilité emailing : définition, facteurs clés (réputation IP, SPF/DKIM, qualité de liste), meilleurs outils et 10 conseils pour éviter les spams. Guide 2026.",
  alternates: { canonical: "/delivrabilite" },
  openGraph: {
    title: "Délivrabilité emailing — Comment améliorer votre taux de réception 2026",
    description:
      "Guide complet sur la délivrabilité emailing : réputation IP, authentification SPF/DKIM, qualité de liste et 10 conseils concrets pour atterrir en boîte de réception.",
    type: "article",
  },
};

const FACTEURS = [
  {
    titre: "Réputation de l'adresse IP d'envoi",
    description:
      "Chaque email est envoyé depuis une adresse IP. Les fournisseurs de messagerie (Gmail, Outlook, etc.) évaluent la réputation de cette IP en temps réel. Une IP avec un historique d'envois de spam ou un taux de plaintes élevé sera automatiquement filtrée. Les bons outils emailing utilisent des IPs mutualisées dont ils surveillent la réputation, ou proposent des IPs dédiées pour les expéditeurs volumineux.",
  },
  {
    titre: "Qualité et propreté de la liste",
    description:
      "Envoyer à des adresses invalides génère des rebonds (bounces). Un taux de rebond dépassant 2 % déclenche des alertes chez les fournisseurs. Nettoyez régulièrement votre liste avec un outil de vérification d'emails (ZeroBounce, NeverBounce) et supprimez les contacts bouncing après le premier hard bounce.",
  },
  {
    titre: "Authentification SPF, DKIM et DMARC",
    description:
      "Ces trois protocoles prouvent que vous êtes bien l'expéditeur légitime de vos emails. SPF liste les serveurs autorisés à envoyer en votre nom. DKIM ajoute une signature cryptographique à chaque email. DMARC indique aux destinataires comment traiter les emails qui échouent ces vérifications. Depuis 2024, Gmail et Yahoo exigent SPF + DKIM pour les expéditeurs en masse.",
  },
  {
    titre: "Contenu et taux d'engagement",
    description:
      "Les algorithmes des messageries analysent si vos destinataires ouvrent, cliquent, répondent ou déplacent vos emails. Un fort taux d'engagement améliore votre réputation d'expéditeur. À l'inverse, des objets trompeurs, un ratio image/texte déséquilibré, des mots-clés spam ou des liens vers des domaines blacklistés dégradent votre score.",
  },
];

const CONSEILS = [
  {
    conseil: "Configurer SPF, DKIM et DMARC sur votre domaine",
    detail: "Obligatoire depuis 2024 pour Google et Yahoo. Votre outil emailing fournit les enregistrements DNS à ajouter.",
  },
  {
    conseil: "Utiliser un domaine d'envoi dédié",
    detail: "N'envoyez jamais depuis un domaine générique (@gmail.com). Utilisez votre propre domaine (@votreentreprise.fr).",
  },
  {
    conseil: "Chauffer progressivement un nouveau domaine",
    detail: "Commencez par envoyer 50 emails/jour la première semaine, doublez chaque semaine jusqu'à votre volume cible.",
  },
  {
    conseil: "Nettoyer votre liste régulièrement",
    detail: "Supprimez les hard bounces immédiatement. Retirez les contacts n'ayant pas ouvert vos emails depuis 6 mois.",
  },
  {
    conseil: "Activer le double opt-in",
    detail: "Élimine les fausses adresses dès l'inscription et améliore mécaniquement le taux d'engagement de votre liste.",
  },
  {
    conseil: "Segmenter vos envois par engagement",
    detail: "Envoyez d'abord aux contacts les plus engagés, puis élargissez progressivement. Récompense votre réputation d'expéditeur.",
  },
  {
    conseil: "Éviter les mots-clés spam dans l'objet",
    detail: "Fuyez « GRATUIT », « Offre exceptionnelle », « Cliquez maintenant » ou les caractères spéciaux en excès (!!!,  €€€).",
  },
  {
    conseil: "Maintenir un ratio texte/image équilibré",
    detail: "Un email contenant uniquement des images est souvent bloqué. Visez au moins 60 % de texte pour 40 % d'images.",
  },
  {
    conseil: "Surveiller votre score de réputation",
    detail: "Utilisez Google Postmaster Tools (gratuit) et Mail-Tester pour mesurer votre réputation d'expéditeur en temps réel.",
  },
  {
    conseil: "Respecter la fréquence d'envoi annoncée",
    detail: "Envoyer plus souvent que promis augmente les désinscriptions et les signalements spam. La régularité prime sur le volume.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que le taux de délivrabilité en emailing ?",
    answer:
      "Le taux de délivrabilité mesure le pourcentage d'emails qui atteignent effectivement la boîte de réception du destinataire (et non le dossier spam ou les indésirables). Il se distingue du taux de livraison, qui mesure simplement les emails acceptés par le serveur destinataire sans vérifier le dossier de réception. Un bon taux de délivrabilité est supérieur à 95 %. La moyenne industrie se situe entre 83 % et 92 % selon les secteurs.",
  },
  {
    question: "Pourquoi mes emails arrivent-ils dans le dossier spam ?",
    answer:
      "Les principales causes sont : l'absence de configuration SPF/DKIM/DMARC, un taux de plaintes élevé (supérieur à 0,1 %), des listes non nettoyées avec beaucoup d'adresses invalides, un contenu contenant des mots-clés spam, un domaine d'envoi avec une mauvaise réputation, ou l'utilisation d'une IP partagée avec des expéditeurs de mauvaise qualité. Commencez par tester votre email sur Mail-Tester.com avant l'envoi.",
  },
  {
    question: "Quel outil emailing offre la meilleure délivrabilité ?",
    answer:
      "Brevo, MailerLite et ActiveCampaign sont régulièrement classés parmi les meilleures délivrabilités dans les études sectorielles (EmailToolTester, Litmus). Brevo bénéficie d'une excellente réputation grâce à ses serveurs européens et ses systèmes anti-abus. MailerLite surveille activement la qualité des envois. Pour une délivrabilité maximale, les outils proposant des IPs dédiées (ActiveCampaign, Brevo Business) sont préférables à partir de 100 000 emails/mois.",
  },
  {
    question: "SPF, DKIM, DMARC : lequel configurer en priorité ?",
    answer:
      "Configurez-les dans cet ordre : SPF d'abord (5 minutes, un enregistrement TXT dans votre DNS), puis DKIM (fourni par votre outil emailing, un copier-coller dans votre DNS), puis DMARC (un enregistrement TXT supplémentaire). Commencez par une politique DMARC en mode 'none' (surveillance uniquement) avant de passer en 'quarantine' ou 'reject'. Depuis février 2024, Gmail exige les trois pour les expéditeurs dépassant 5 000 emails/jour.",
  },
];

export default function DelivrabilityPage() {
  const topTools = getAllTools()
    .filter((t) => t.noteGlobale > 4.2)
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
    headline: "Délivrabilité emailing : guide complet",
    description:
      "Guide complet sur la délivrabilité emailing : définition, facteurs clés, meilleurs outils et 10 conseils pour améliorer votre taux de réception.",
    url: `${BASE_URL}/delivrabilite`,
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "ToolPick" },
    publisher: { "@type": "Organization", name: "ToolPick" },
  };

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Accueil", url: BASE_URL },
    { name: "Délivrabilité emailing", url: `${BASE_URL}/delivrabilite` },
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
                  Délivrabilité
                </li>
              </ol>
            </nav>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Délivrabilité emailing&nbsp;: guide complet
            </h1>
            <p className="text-lg text-gray-500">
              Pourquoi vos emails finissent en spam, comment l&apos;éviter et
              quels outils offrent la meilleure délivrabilité en 2026.
            </p>
          </div>
        </section>

        <div className="px-4 py-14">
          <div className="mx-auto max-w-3xl space-y-20">

            {/* ─ Section 1 : Définition ────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Qu&apos;est-ce que la délivrabilité&nbsp;?
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  La délivrabilité désigne la capacité d&apos;un email à{" "}
                  <strong>atteindre effectivement la boîte de réception principale</strong>{" "}
                  du destinataire — et non son dossier spam ou indésirables. Un email
                  techniquement livré (accepté par le serveur destinataire) peut très
                  bien ne jamais être vu si les filtres anti-spam le redirigent vers
                  un dossier rarement consulté. La délivrabilité mesure ce que le
                  destinataire peut réellement voir et ouvrir.
                </p>
                <p>
                  Le taux de délivrabilité moyen dans l&apos;industrie se situe entre{" "}
                  <strong>83 % et 92 %</strong> selon les secteurs et les outils utilisés
                  (source&nbsp;: EmailToolTester, Litmus 2025). Cela signifie qu&apos;en
                  moyenne, 8 à 17 % de vos emails n&apos;atteignent pas la boîte de
                  réception principale. Pour une liste de 10 000 contacts, c&apos;est
                  potentiellement 1 700 abonnés qui ne voient jamais votre message.
                </p>
                <p>
                  L&apos;impact sur le ROI est direct&nbsp;: un taux d&apos;ouverture de
                  25 % sur une délivrabilité de 85 % équivaut à 21 % de votre liste
                  totale. Améliorer la délivrabilité de 85 % à 95 % augmente mécaniquement
                  vos ouvertures de{" "}
                  <strong>12 % sans modifier votre contenu</strong>. La délivrabilité
                  est donc l&apos;un des leviers les plus rentables à optimiser avant
                  même de travailler sur vos objets d&apos;emails.
                </p>
              </div>
            </section>

            {/* ─ Section 2 : Facteurs ──────────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les facteurs qui affectent la délivrabilité
              </h2>
              <div className="space-y-4">
                {FACTEURS.map((f, idx) => (
                  <div key={idx} className="rounded-xl border border-gray-200 p-5">
                    <p className="mb-2 font-semibold text-gray-900">{f.titre}</p>
                    <p className="text-sm leading-relaxed text-gray-600">{f.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ─ Section 3 : Meilleurs outils ──────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Les outils avec la meilleure délivrabilité
              </h2>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Ces outils sont régulièrement classés en tête des tests de
                délivrabilité indépendants (note globale &gt; 4,2/5).
              </p>
              <div className="space-y-4">
                {topTools.map((tool) => (
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
                      <span className="shrink-0 rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-800">
                        {tool.noteGlobale}/5
                      </span>
                    </div>
                    <AffiliateButton tool={tool} variant="outline" />
                  </div>
                ))}
              </div>
            </section>

            {/* ─ Section 4 : 10 conseils ───────────────────────────────────── */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                10 conseils pour améliorer votre délivrabilité
              </h2>
              <ol className="space-y-4">
                {CONSEILS.map((c, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="mb-0.5 font-semibold text-gray-900">{c.conseil}</p>
                      <p className="text-sm leading-relaxed text-gray-600">{c.detail}</p>
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
