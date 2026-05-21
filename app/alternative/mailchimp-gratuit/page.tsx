import type { Metadata } from "next";
import { getAllTools } from "@/data/tools";
import LongTailPageLayout from "@/components/alternative/LongTailPageLayout";

const BASE_URL = "https://toolpick.fr";

export const metadata: Metadata = {
  title: "Alternative gratuite à Mailchimp — Les meilleures options gratuites",
  description:
    "Vous cherchez une alternative gratuite à Mailchimp ? Voici les meilleurs outils emailing avec un plan gratuit : MailerLite, Brevo, Moosend et plus.",
  alternates: { canonical: "/alternative/mailchimp-gratuit" },
  openGraph: {
    title: "Alternative gratuite à Mailchimp — Les meilleures options gratuites",
    description:
      "Comparatif des meilleures alternatives gratuites à Mailchimp. Plans 0 € avec contacts et emails illimités.",
    type: "article",
  },
};

export default function MailchimpGratuitPage() {
  const tools = getAllTools()
    .filter((t) => t.slug !== "mailchimp" && t.planGratuit)
    .sort((a, b) => {
      const contactsA = a.pricing.find((p) => p.prixMois === 0)?.contacts ?? 0;
      const contactsB = b.pricing.find((p) => p.prixMois === 0)?.contacts ?? 0;
      return contactsB - contactsA;
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Alternative gratuite à Mailchimp — Les meilleures options gratuites",
    url: `${BASE_URL}/alternative/mailchimp-gratuit`,
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
        h1="Meilleure alternative gratuite à Mailchimp"
        subtitle={`${tools.length} outils avec un plan gratuit permanent — triés par nombre de contacts offerts.`}
        tools={tools}
        breadcrumbLabel="Alternative gratuite à Mailchimp"
      />
    </>
  );
}
