import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import LongTailPageLayout from "@/components/alternative/LongTailPageLayout";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Alternative française à Mailchimp — Outils emailing made in France",
  description:
    "Vous cherchez une alternative française à Mailchimp ? Découvrez les outils emailing avec support en français : Brevo, Sarbacane, Mailjet et plus.",
  alternates: { canonical: "/alternative/mailchimp-francais" },
  openGraph: {
    title: "Alternative française à Mailchimp — Outils emailing made in France",
    description:
      "Les meilleures alternatives françaises à Mailchimp : support client en français, hébergement UE, conformité RGPD.",
    type: "article",
  },
};

export default function MailchimpFrancaisPage() {
  const tools = getAllTools()
    .filter((t) => t.slug !== "mailchimp" && t.features.supportFrancais)
    .sort((a, b) => b.noteGlobale - a.noteGlobale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Alternative française à Mailchimp — Outils emailing made in France",
    url: `${BASE_URL}/alternative/mailchimp-francais`,
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "ToolPick" },
    publisher: { "@type": "Organization", name: "ToolPick" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LongTailPageLayout
        h1="Meilleure alternative française à Mailchimp"
        subtitle={`${tools.length} outils avec support en français — hébergement européen et conformité RGPD inclus.`}
        tools={tools}
        breadcrumbLabel="Alternative française à Mailchimp"
      />
    </>
  );
}
