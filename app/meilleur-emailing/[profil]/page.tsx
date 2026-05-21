import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProfiles, getProfileBySlug } from "@/data/profiles";
import { getAllTools, getToolsForProfile } from "@/data/tools";
import ProfilPageClient from "@/components/profil/ProfilPageClient";
import { generateProfilFaqItems } from "@/lib/profil-faq";

type Props = {
  params: Promise<{ profil: string }>;
};

export function generateStaticParams() {
  return getAllProfiles().map((p) => ({ profil: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profil } = await params;
  const profile = getProfileBySlug(profil);

  if (!profile) return {};

  const year = new Date().getFullYear();
  const title = `Meilleur outil emailing pour ${profile.nomPluriel} en ${year}`;
  const description = `Quel outil emailing choisir quand on est ${profile.nom} ? Comparatif des meilleures solutions selon votre budget et vos besoins.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/meilleur-emailing/${profil}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function ProfilPage({ params }: Props) {
  const { profil } = await params;
  const profile = getProfileBySlug(profil);

  if (!profile) notFound();

  const tools = getToolsForProfile(profile.slug);
  const allTools = getAllTools();
  const year = new Date().getFullYear();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Meilleur outil emailing pour ${profile.nomPluriel} en ${year}`,
    description: `Comparatif des meilleures solutions emailing pour ${profile.nom} en ${year} selon votre budget et vos besoins.`,
    datePublished: `${year}-01-01`,
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Organization",
      name: "CompareMailing",
    },
    publisher: {
      "@type": "Organization",
      name: "CompareMailing",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generateProfilFaqItems(profile, allTools).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

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
      <ProfilPageClient
        profil={profile}
        tools={tools}
        allTools={allTools}
        year={year}
      />
    </>
  );
}
