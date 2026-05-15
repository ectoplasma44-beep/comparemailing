import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS, VS_COMBINATIONS, getToolBySlug, getVsPageSlug } from "@/data/tools";
import VsPageClient from "@/components/vs/VsPageClient";

type Props = {
  params: Promise<{ vs: string }>;
};

function parseVsRoute(vsParam: string): { slugA: string; slugB: string } | null {
  const parts = vsParam.split("-vs-");
  if (parts.length !== 2) return null;
  const [slugA, slugB] = parts;
  if (!slugA || !slugB) return null;
  return { slugA, slugB };
}

export function generateStaticParams() {
  return VS_COMBINATIONS.map(([slugA, slugB]) => ({
    vs: getVsPageSlug(slugA, slugB),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vs } = await params;
  const parsed = parseVsRoute(vs);

  if (!parsed) return {};

  const toolA = getToolBySlug(parsed.slugA);
  const toolB = getToolBySlug(parsed.slugB);

  if (!toolA || !toolB) return {};

  const year = new Date().getFullYear();
  const title = `${toolA.nom} vs ${toolB.nom} : comparatif complet ${year}`;
  const description = `Comparatif ${toolA.nom} vs ${toolB.nom} en ${year} : prix, fonctionnalités, avantages, inconvénients et verdict. Découvrez lequel est le meilleur outil emailing pour votre projet.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${vs}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function VsPage({ params }: Props) {
  const { vs } = await params;
  const parsed = parseVsRoute(vs);

  if (!parsed) notFound();

  const toolA = getToolBySlug(parsed.slugA);
  const toolB = getToolBySlug(parsed.slugB);

  if (!toolA || !toolB) notFound();

  const year = new Date().getFullYear();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${toolA.nom} vs ${toolB.nom} : comparatif complet ${year}`,
    description: `Comparatif détaillé entre ${toolA.nom} et ${toolB.nom} : tarifs, fonctionnalités, avantages et verdict final.`,
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
      <VsPageClient toolA={toolA} toolB={toolB} year={year} />
    </>
  );
}
