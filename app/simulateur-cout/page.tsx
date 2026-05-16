import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import SimulateurClient from "@/components/simulateur/SimulateurClient";

export const metadata: Metadata = {
  title: "Simulateur de coût emailing — Comparez les prix en temps réel",
  description:
    "Entrez votre nombre de contacts et votre fréquence d'envoi pour comparer instantanément le coût mensuel de chaque outil emailing : Brevo, Mailchimp, MailerLite, GetResponse et plus.",
  alternates: { canonical: "/simulateur-cout" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Simulateur de coût emailing",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Comparez en temps réel le coût mensuel des principaux outils emailing selon votre volume de contacts et votre fréquence d'envoi.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
};

export default function SimulateurCoutPage() {
  const tools = getAllTools();

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-16">

        {/* ── En-tête ──────────────────────────────────────────────────────── */}
        <div className="mb-10 text-center">
          <a
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour à l&apos;accueil
          </a>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simulateur de coût emailing
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-500">
            Ajustez votre nombre de contacts et votre fréquence d&apos;envoi pour voir
            instantanément quel outil est le plus adapté à votre budget.
          </p>
        </div>

        {/* ── Simulateur interactif ─────────────────────────────────────────── */}
        <SimulateurClient tools={tools} />

        {/* ── Conclusion SEO ────────────────────────────────────────────────── */}
        <div className="mt-16 rounded-2xl border border-gray-100 bg-gray-50 px-6 py-8 text-sm leading-relaxed text-gray-500">
          <h2 className="mb-3 text-base font-semibold text-gray-900">
            Comment choisir son outil emailing selon son budget ?
          </h2>
          <p className="mb-3">
            Le coût d&apos;un outil emailing dépend principalement de deux variables : le
            nombre de contacts dans votre liste et le volume d&apos;emails envoyés chaque
            mois. Certains outils comme <strong className="text-gray-700">Brevo</strong> ou{" "}
            <strong className="text-gray-700">Mailjet</strong> facturent à l&apos;envoi (contacts
            illimités, prix selon le volume), tandis que{" "}
            <strong className="text-gray-700">MailerLite</strong>,{" "}
            <strong className="text-gray-700">GetResponse</strong> ou{" "}
            <strong className="text-gray-700">ActiveCampaign</strong> facturent selon le
            nombre de contacts (envois illimités ou très généreux).
          </p>
          <p>
            Pour les petites listes (&lt; 1 000 contacts), des outils comme{" "}
            <strong className="text-gray-700">Systeme.io</strong> (2 000 contacts gratuits) ou{" "}
            <strong className="text-gray-700">MailerLite</strong> (1 000 contacts gratuits)
            offrent d&apos;excellents plans gratuits. Au-delà de 10 000 contacts, comparez
            attentivement les grilles tarifaires car les écarts peuvent être significatifs.
          </p>
        </div>

      </div>
    </div>
  );
}
