import type { Tool } from "@/data/tools";

export type FaqItem = {
  question: string;
  answer: string;
};

export function generateAlternativeFaqItems(
  tool: Tool,
  alternatives: Tool[]
): FaqItem[] {
  // Q1 — meilleure alternative gratuite
  const freePick = alternatives
    .filter((t) => t.planGratuit)
    .sort((a, b) => b.noteGlobale - a.noteGlobale)[0] ?? null;

  const freeAnswer = freePick
    ? `La meilleure alternative gratuite à ${tool.nom} est ${freePick.nom} (${freePick.noteGlobale}/5). ${freePick.descriptionCourte} Son plan gratuit permet de démarrer sans engagement financier.`
    : `Parmi les alternatives à ${tool.nom}, aucune ne propose de plan gratuit permanent à l'heure actuelle. Vérifiez les pages officielles car les offres évoluent régulièrement.`;

  // Q2 — meilleure alternative française (supportFrancais)
  const frenchPick = alternatives
    .filter((t) => t.features.supportFrancais)
    .sort((a, b) => b.noteGlobale - a.noteGlobale)[0] ?? null;

  const frenchAnswer = frenchPick
    ? `Pour un support en français, nous recommandons ${frenchPick.nom} (${frenchPick.noteGlobale}/5). ${frenchPick.descriptionCourte}`
    : `Parmi les alternatives listées, aucune ne propose de support client en français. Si c'est un critère essentiel, privilégiez des outils d'origine française comme Brevo (ex-Sendinblue).`;

  // Q3 — pourquoi quitter [tool.nom]
  const inconvList = tool.inconvenients
    .map((inc) => `• ${inc}`)
    .join(" ");
  const whyLeaveAnswer = `Les principales raisons de quitter ${tool.nom} sont : ${inconvList} Si vous vous reconnaissez dans l'un de ces points, une des alternatives présentées ci-dessus sera mieux adaptée à vos besoins.`;

  // Q4 — alternative la plus abordable
  const affordablePick = alternatives
    .filter((t) => t.prixDepart !== null || t.planGratuit)
    .sort((a, b) => {
      const priceA = a.planGratuit ? 0 : (a.prixDepart ?? Infinity);
      const priceB = b.planGratuit ? 0 : (b.prixDepart ?? Infinity);
      return priceA - priceB;
    })[0] ?? null;

  const affordableAnswer = affordablePick
    ? affordablePick.planGratuit
      ? `L'alternative la plus abordable à ${tool.nom} est ${affordablePick.nom}, qui propose un plan gratuit permanent. ${affordablePick.descriptionCourte}`
      : `L'alternative la plus abordable à ${tool.nom} est ${affordablePick.nom}, avec des offres à partir de ${affordablePick.prixDepart} €/mois. ${affordablePick.descriptionCourte}`
    : `Toutes les alternatives à ${tool.nom} proposent des tarifs compétitifs — comparez les plans dans les fiches détaillées pour trouver la plus adaptée à votre budget.`;

  return [
    {
      question: `Quelle est la meilleure alternative gratuite à ${tool.nom} ?`,
      answer: freeAnswer,
    },
    {
      question: `Quelle est la meilleure alternative française à ${tool.nom} ?`,
      answer: frenchAnswer,
    },
    {
      question: `Pourquoi quitter ${tool.nom} ?`,
      answer: whyLeaveAnswer,
    },
    {
      question: `Quelle alternative à ${tool.nom} est la plus abordable ?`,
      answer: affordableAnswer,
    },
  ];
}
