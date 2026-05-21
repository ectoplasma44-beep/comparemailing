import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import LongTailPageLayout from "@/components/alternative/LongTailPageLayout";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Alternative simple à Mailchimp — Outils faciles à prendre en main",
  description:
    "Mailchimp trop complexe ? Découvrez les alternatives simples avec éditeur drag-and-drop et interface intuitive : MailerLite, Brevo, Moosend et plus.",
  alternates: { canonical: "/alternative/mailchimp-simple" },
  openGraph: {
    title: "Alternative simple à Mailchimp — Outils faciles à prendre en main",
    description:
      "Les outils emailing les plus faciles à utiliser en alternative à Mailchimp. Éditeur drag-and-drop, prise en main rapide.",
    type: "article",
  },
};

export default function MailchimpSimplePage() {
  const tools = getAllTools()
    .filter(
      (t) =>
        t.slug !== "mailchimp" &&
        t.features.dragAndDrop &&
        t.noteGlobale > 4
    )
    .sort((a, b) => {
      const priceA = a.planGratuit ? 0 : (a.prixDepart ?? Infinity);
      const priceB = b.planGratuit ? 0 : (b.prixDepart ?? Infinity);
      return priceA - priceB;
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Alternative simple à Mailchimp — Outils faciles à prendre en main",
    url: `${BASE_URL}/alternative/mailchimp-simple`,
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
        h1="Meilleure alternative simple à Mailchimp"
        subtitle={`${tools.length} outils avec éditeur drag-and-drop et note supérieure à 4/5 — triés par prix croissant.`}
        tools={tools}
        breadcrumbLabel="Alternative simple à Mailchimp"
      />
    </>
  );
}
