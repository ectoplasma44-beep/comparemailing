import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTools, getToolBySlug } from "@/data/tools";
import AlternativePageClient from "@/components/alternative/AlternativePageClient";

type Props = {
  params: Promise<{ outil: string }>;
};

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ outil: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { outil } = await params;
  const tool = getToolBySlug(outil);

  if (!tool) return {};

  const year = new Date().getFullYear();
  const title = `Alternative à ${tool.nom} : les meilleures options en ${year}`;
  const description = `Vous cherchez une alternative à ${tool.nom} ? Comparatif des meilleures solutions emailing selon votre profil et budget.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/alternative/${outil}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function AlternativePage({ params }: Props) {
  const { outil } = await params;
  const tool = getToolBySlug(outil);

  if (!tool) notFound();

  const allTools = getAllTools();
  const year = new Date().getFullYear();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Alternative à ${tool.nom} : les meilleures options en ${year}`,
    description: `Comparatif des meilleures alternatives à ${tool.nom} en ${year} selon votre profil et budget.`,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlternativePageClient tool={tool} allTools={allTools} year={year} />
    </>
  );
}
