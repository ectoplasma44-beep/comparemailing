import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import QuizClient from "@/components/quiz/QuizClient";

export const metadata: Metadata = {
  title: "Quel outil emailing choisir ? — Quiz gratuit 2026",
  description:
    "5 questions pour identifier l'outil emailing le plus adapté à votre profil, votre budget et vos besoins. Recommandation personnalisée et gratuite en moins de 2 minutes.",
  alternates: { canonical: "/quiz" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Quiz : Quel outil emailing choisir ?",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Quiz interactif de 5 questions pour identifier l'outil emailing le plus adapté à votre profil, votre budget et vos besoins.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
};

export default function QuizPage() {
  const tools = getAllTools();

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-xl px-4 py-16">

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
            Quel outil emailing<br className="hidden sm:block" /> vous correspond ?
          </h1>
          <p className="mx-auto max-w-sm text-base text-gray-500">
            5 questions pour une recommandation personnalisée en moins de 2 minutes.
          </p>
        </div>

        {/* ── Quiz interactif ───────────────────────────────────────────────── */}
        <QuizClient tools={tools} />

        {/* ── Texte SEO footer ─────────────────────────────────────────────── */}
        <div className="mt-16 text-xs leading-relaxed text-gray-400">
          <p>
            Ce quiz analyse votre taille de liste, budget, besoins en automation, préférence
            linguistique et profil pour vous recommander parmi 10 outils emailing — Brevo,
            Mailchimp, MailerLite, GetResponse, Systeme.io, Kit (ConvertKit), ActiveCampaign,
            Sarbacane, Mailjet et Moosend. Les recommandations sont indépendantes et basées sur
            des critères objectifs. Certains liens sont des liens affiliés.
          </p>
        </div>

      </div>
    </div>
  );
}
