import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import OutilsClient from "@/components/outils/OutilsClient";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Comparatif outils emailing 2026 — Tous les outils testés",
  description:
    "Comparatif complet des 10 meilleurs outils emailing en 2026 : Brevo, Mailchimp, MailerLite, GetResponse, ActiveCampaign… Notes, prix, plans gratuits et alternatives.",
  alternates: { canonical: "/outils" },
  openGraph: {
    title: "Comparatif outils emailing 2026 — Tous les outils testés",
    description:
      "10 outils emailing analysés en détail : prix, fonctionnalités, avis et alternatives pour choisir le meilleur.",
    type: "website",
  },
};

export default function OutilsPage() {
  const tools = getAllTools().sort((a, b) => b.noteGlobale - a.noteGlobale);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Comparatif outils emailing 2026",
    url: `${BASE_URL}/outils`,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.nom,
      url: `${BASE_URL}/alternative/${tool.slug}`,
      description: tool.descriptionCourte,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <OutilsClient tools={tools} />
    </>
  );
}
