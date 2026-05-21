import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import LongTailPageLayout from "@/components/alternative/LongTailPageLayout";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Alternative pas chère à ActiveCampaign — Même puissance, moins cher",
  description:
    "ActiveCampaign trop cher ? Découvrez les meilleures alternatives abordables avec automation avancée : GetResponse, MailerLite, Brevo et plus.",
  alternates: { canonical: "/alternative/activecampaign-pas-cher" },
  openGraph: {
    title: "Alternative pas chère à ActiveCampaign — Même puissance, moins cher",
    description:
      "Outils emailing avec automation avancée pour moins cher qu'ActiveCampaign. Comparatif prix et fonctionnalités.",
    type: "article",
  },
};

export default function ActivecampaignPasCherPage() {
  const tools = getAllTools()
    .filter((t) => t.slug !== "activecampaign" && t.features.automation)
    .sort((a, b) => {
      const priceA = a.planGratuit ? 0 : (a.prixDepart ?? Infinity);
      const priceB = b.planGratuit ? 0 : (b.prixDepart ?? Infinity);
      return priceA - priceB;
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Alternative pas chère à ActiveCampaign — Même puissance, moins cher",
    url: `${BASE_URL}/alternative/activecampaign-pas-cher`,
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
        h1="Meilleure alternative pas chère à ActiveCampaign"
        subtitle={`${tools.length} outils avec automation marketing — triés du moins cher au plus cher.`}
        tools={tools}
        breadcrumbLabel="Alternative pas chère à ActiveCampaign"
      />
    </>
  );
}
