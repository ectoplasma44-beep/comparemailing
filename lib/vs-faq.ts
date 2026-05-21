import type { Tool } from "@/data/tools";

export type FaqItem = {
  question: string;
  answer: string;
};

function freePlanAnswer(tool: Tool): string {
  if (tool.planGratuit) {
    const tier = tool.pricing.find((p) => p.prixMois === 0);
    const details: string[] = [];
    if (tier?.contacts) details.push(`jusqu'à ${tier.contacts.toLocaleString("fr-FR")} contacts`);
    if (tier?.emailsMois) details.push(`${tier.emailsMois.toLocaleString("fr-FR")} emails par mois`);
    const extra = details.length > 0 ? ` Il inclut ${details.join(" et ")}.` : "";
    return `Oui, ${tool.nom} propose un plan gratuit permanent.${extra}`;
  }
  const priceNote =
    tool.prixDepart !== null && tool.prixDepart > 0
      ? ` Son offre d'entrée démarre à ${tool.prixDepart} €/mois.`
      : "";
  return `Non, ${tool.nom} ne propose pas de plan gratuit permanent.${priceNote} Un essai gratuit peut toutefois être disponible — vérifiez sur leur site officiel.`;
}

function differenceAnswer(toolA: Tool, toolB: Tool): string {
  const parts: string[] = [];

  if (toolA.noteGlobale !== toolB.noteGlobale) {
    const better = toolA.noteGlobale > toolB.noteGlobale ? toolA : toolB;
    const worse = better === toolA ? toolB : toolA;
    parts.push(
      `${better.nom} obtient une meilleure note globale (${better.noteGlobale}/5 contre ${worse.noteGlobale}/5)`
    );
  }

  if (toolA.pays !== toolB.pays) {
    parts.push(
      `${toolA.nom} est d'origine ${toolA.pays} tandis que ${toolB.nom} vient de ${toolB.pays}`
    );
  }

  if (toolA.planGratuit !== toolB.planGratuit) {
    const withFree = toolA.planGratuit ? toolA : toolB;
    const withoutFree = withFree === toolA ? toolB : toolA;
    parts.push(
      `${withFree.nom} propose un plan gratuit contrairement à ${withoutFree.nom}`
    );
  }

  if (parts.length === 0) {
    return `${toolA.nom} et ${toolB.nom} sont positionnés de manière très similaire. Les nuances se trouvent dans les détails fonctionnels et la tarification — explorez les onglets "Fonctionnalités" et "Tarifs" ci-dessus pour affiner votre choix.`;
  }

  return parts.join(". ") + ".";
}

function beginnersAnswer(toolA: Tool, toolB: Tool): string {
  if (toolA.planGratuit && !toolB.planGratuit) {
    return `Pour les débutants, ${toolA.nom} est généralement plus accessible : son plan gratuit permet de démarrer sans engagement financier et de progresser avant de passer à un abonnement payant.`;
  }
  if (toolB.planGratuit && !toolA.planGratuit) {
    return `Pour les débutants, ${toolB.nom} est généralement plus accessible : son plan gratuit permet de démarrer sans engagement financier et de progresser avant de passer à un abonnement payant.`;
  }

  const recommended = toolA.noteGlobale >= toolB.noteGlobale ? toolA : toolB;
  const hasFree = recommended.planGratuit;
  return `Pour les débutants, nous recommandons ${recommended.nom} (${recommended.noteGlobale}/5), qui bénéficie de la meilleure évaluation globale${hasFree ? " et d'un plan gratuit pour commencer sans risque" : ""}. Sa prise en main est généralement plus intuitive pour se lancer dans l'email marketing.`;
}

export function generateFaqItems(toolA: Tool, toolB: Tool): FaqItem[] {
  return [
    {
      question: `${toolA.nom} est-il gratuit ?`,
      answer: freePlanAnswer(toolA),
    },
    {
      question: `${toolB.nom} est-il gratuit ?`,
      answer: freePlanAnswer(toolB),
    },
    {
      question: `Quelle est la différence principale entre ${toolA.nom} et ${toolB.nom} ?`,
      answer: differenceAnswer(toolA, toolB),
    },
    {
      question: `Lequel choisir entre ${toolA.nom} et ${toolB.nom} pour les débutants ?`,
      answer: beginnersAnswer(toolA, toolB),
    },
  ];
}
