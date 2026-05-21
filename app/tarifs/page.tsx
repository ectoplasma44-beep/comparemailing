import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import type { Tool, PricingTier } from "@/data/tools";
import TarifsClient, { type PricingRow, type BestPick } from "@/components/tarifs/TarifsClient";
import { generateBreadcrumbJsonLd } from "@/lib/breadcrumb";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Comparatif prix outils emailing 2026 — Tous les tarifs",
  description:
    "Comparatif complet des prix outils emailing en 2026 : plans gratuits, tarifs pour 500, 1 000, 2 000 et 5 000 contacts. Trouvez le moins cher selon votre budget.",
  alternates: { canonical: "/tarifs" },
  openGraph: {
    title: "Comparatif prix outils emailing 2026 — Tous les tarifs",
    description:
      "Tous les tarifs emailing comparés : plan gratuit, prix départ, coût selon votre taille de liste. Badge meilleur prix par seuil.",
    type: "website",
  },
};

// ─── findBestTierPrice ────────────────────────────────────────────────────────
// Returns the cheapest monthly price covering `targetContacts`.
// - Tiers with contacts=null cover any number (email-based billing like Brevo/Mailjet)
// - Tiers with prixMois=null are "Sur devis" → excluded
// - Tiers with prixMois=0 are included only if tool.planGratuit=true (excludes trials)

function findBestTierPrice(tool: Tool, targetContacts: number): number | null {
  const candidates: PricingTier[] = tool.pricing.filter((p) => {
    if (p.prixMois === null) return false;
    if (p.prixMois === 0 && !tool.planGratuit) return false;
    return p.contacts === null || p.contacts >= targetContacts;
  });

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => (a.prixMois as number) - (b.prixMois as number));
  return candidates[0].prixMois as number;
}

// ─── bestForContacts ──────────────────────────────────────────────────────────
// Returns the tool with the lowest price for a given contact threshold.

function bestForContacts(
  tools: Tool[],
  targetContacts: number
): { tool: Tool; prix: number } | null {
  let best: { tool: Tool; prix: number } | null = null;
  for (const t of tools) {
    const p = findBestTierPrice(t, targetContacts);
    if (p === null) continue;
    if (best === null || p < best.prix || (p === best.prix && t.noteGlobale > best.tool.noteGlobale)) {
      best = { tool: t, prix: p };
    }
  }
  return best;
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "Quel outil emailing est le moins cher en 2026 ?",
    answer:
      "MailerLite et Moosend sont les outils emailing les moins chers pour les petites listes, avec des plans payants démarrant à 9€/mois. Pour une liste sous 2 000 contacts, Systeme.io propose le plan gratuit le plus généreux (jusqu'à 2 000 contacts) et des plans payants à 27€/mois. Brevo est avantageux pour les grandes listes car il facture à l'envoi et non aux contacts.",
  },
  {
    question: "Quels outils emailing proposent un plan gratuit en 2026 ?",
    answer:
      "En 2026, les outils avec un plan gratuit permanent sont : MailerLite (1 000 contacts, 12 000 emails/mois), Systeme.io (2 000 contacts, emails illimités), Kit/ConvertKit (10 000 abonnés, broadcasts illimités), Brevo (contacts illimités, 300 emails/jour), GetResponse (500 contacts), Mailjet (6 000 emails/mois, contacts illimités) et Mailchimp (500 contacts).",
  },
  {
    question: "Comment le prix de Mailchimp évolue-t-il avec la taille de la liste ?",
    answer:
      "Mailchimp est l'un des outils dont le prix augmente le plus rapidement avec la liste. Pour 500 contacts : 0€ (gratuit, mais limité). Pour 1 000 contacts : environ 13€/mois (Essentials). Pour 5 000 contacts : environ 75€/mois. Pour 10 000 contacts : environ 110€/mois. Au-delà de 5 000 contacts, des alternatives comme MailerLite ou Brevo deviennent significativement moins chères.",
  },
  {
    question: "Vaut-il mieux choisir un outil qui facture à l'envoi ou aux contacts ?",
    answer:
      "La facturation aux contacts (MailerLite, ActiveCampaign, GetResponse) est avantageuse si vous envoyez souvent. La facturation à l'envoi (Brevo, Mailjet) est avantageuse si vous avez une grande liste mais envoyez peu souvent (moins d'un email par semaine à toute votre liste). Pour une liste de 10 000 contacts avec 2 envois/mois, Brevo coûte ~9€ vs ~90€ pour un outil facturant aux contacts.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TarifsPage() {
  const tools = getAllTools().sort((a, b) => b.noteGlobale - a.noteGlobale);

  // Build pricing matrix
  const THRESHOLDS = [500, 1000, 2000, 5000] as const;
  const rows: PricingRow[] = tools.map((t) => ({
    slug: t.slug,
    nom: t.nom,
    planGratuit: t.planGratuit,
    prixDepart: t.prixDepart,
    p500: findBestTierPrice(t, 500),
    p1k:  findBestTierPrice(t, 1000),
    p2k:  findBestTierPrice(t, 2000),
    p5k:  findBestTierPrice(t, 5000),
  }));

  // Best picks cards
  const freeStarter = tools
    .filter((t) => t.planGratuit)
    .sort((a, b) => {
      const cA = a.pricing.find((p) => p.prixMois === 0)?.contacts ?? 0;
      const cB = b.pricing.find((p) => p.prixMois === 0)?.contacts ?? 0;
      return cB - cA;
    })[0];

  const best1k  = bestForContacts(tools, 1000);
  const best5k  = bestForContacts(tools, 5000);
  const best10k = bestForContacts(tools, 10000);

  const bestPicks: BestPick[] = [
    freeStarter && {
      label: "Pour démarrer (0 contact)",
      tool: freeStarter,
      prix: "Plan gratuit permanent",
    },
    best1k && {
      label: "Pour 1 000 contacts",
      tool: best1k.tool,
      prix: best1k.prix === 0 ? "Gratuit" : `${best1k.prix} €/mois`,
    },
    best5k && {
      label: "Pour 5 000 contacts",
      tool: best5k.tool,
      prix: best5k.prix === 0 ? "Gratuit" : `${best5k.prix} €/mois`,
    },
    best10k && {
      label: "Pour 10 000 contacts",
      tool: best10k.tool,
      prix: best10k.prix === 0 ? "Gratuit" : `${best10k.prix} €/mois`,
    },
  ].filter(Boolean) as BestPick[];

  // JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comparatif prix outils emailing 2026 — Tous les tarifs",
    url: `${BASE_URL}/tarifs`,
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "ToolPick" },
    publisher: { "@type": "Organization", name: "ToolPick" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Accueil", url: "https://toolpick.fr" },
    { name: "Tarifs", url: "https://toolpick.fr/tarifs" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-white">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Fil d'Ariane" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
                <li><a href="/" className="hover:text-gray-800 hover:underline">Accueil</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-gray-800">Tarifs</li>
              </ol>
            </nav>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
              Comparatif des prix outils emailing 2026
            </h1>
            <p className="mb-4 text-gray-500">
              Tous les tarifs mis à jour — trouvez l&apos;outil dans votre budget
            </p>
            <p className="text-xs text-gray-400">
              💡 Les outils facturés à l&apos;envoi (Brevo, Mailjet) affichent leur plan d&apos;entrée quel que soit le nombre de contacts.
              Les prix varient selon la fréquence d&apos;envoi et les options — vérifiez sur les sites officiels.
            </p>
          </div>
        </section>

        {/* ── TABLEAU + FILTRES ─────────────────────────────────────────────── */}
        <section className="px-4 py-10">
          <div className="mx-auto max-w-5xl">
            <TarifsClient rows={rows} bestPicks={bestPicks} />
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              Questions fréquentes sur les tarifs emailing
            </h2>
            <dl className="space-y-5">
              {FAQ_ITEMS.map((f) => (
                <div key={f.question} className="rounded-xl border border-gray-200 bg-white p-6">
                  <dt className="mb-2 font-semibold text-gray-900">{f.question}</dt>
                  <dd className="text-sm leading-relaxed text-gray-700">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── DISCLOSURE ───────────────────────────────────────────────────── */}
        <footer className="border-t border-gray-100 bg-white px-4 py-6">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs leading-relaxed text-gray-400">
              <strong className="font-medium text-gray-500">Disclosure affiliation :</strong>{" "}
              Certains liens présents sur cette page sont des liens affiliés. Si vous cliquez
              et souscrivez, nous pouvons percevoir une commission sans coût supplémentaire
              pour vous. Cette rémunération n&apos;influence pas nos recommandations. Tous les
              liens affiliés portent l&apos;attribut{" "}
              <code className="rounded bg-gray-100 px-1 text-gray-500">rel=&quot;sponsored&quot;</code>.
            </p>
          </div>
        </footer>

      </main>
    </>
  );
}
