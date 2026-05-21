import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import LongTailPageLayout from "@/components/alternative/LongTailPageLayout";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Alternative à Brevo en anglais — Outils emailing internationaux",
  description:
    "Vous cherchez une alternative à Brevo avec une interface en anglais ? Découvrez Mailchimp, ActiveCampaign, GetResponse et les meilleures plateformes internationales.",
  alternates: { canonical: "/alternative/brevo-anglais" },
  openGraph: {
    title: "Alternative à Brevo en anglais — Outils emailing internationaux",
    description:
      "Les meilleures alternatives internationales à Brevo : outils en anglais avec un écosystème mondial d'intégrations.",
    type: "article",
  },
};

export default function BrevoAnglaisPage() {
  const tools = getAllTools()
    .filter((t) => t.slug !== "brevo" && !t.features.supportFrancais)
    .sort((a, b) => b.noteGlobale - a.noteGlobale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Alternative à Brevo en anglais — Outils emailing internationaux",
    url: `${BASE_URL}/alternative/brevo-anglais`,
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
        h1="Meilleure alternative à Brevo en anglais"
        subtitle={`${tools.length} outils internationaux — interfaces et support en anglais, triés par note.`}
        tools={tools}
        breadcrumbLabel="Alternative à Brevo en anglais"
      />
    </>
  );
}
