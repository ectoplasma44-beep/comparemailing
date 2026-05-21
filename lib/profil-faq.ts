import type { Tool } from "@/data/tools";
import type { Profile } from "@/data/profiles";

export type FaqItem = {
  question: string;
  answer: string;
};

const BUDGET_ANSWER: Record<Profile["budgetMensuel"], string> = {
  gratuit:
    "Un plan gratuit suffit pour démarrer. Plusieurs outils proposent un plan 0 € permanent (jusqu'à 1 000 contacts environ) qui couvre largement les besoins d'une petite liste.",
  faible:
    "Comptez entre 9 € et 20 €/mois pour un plan d'entrée. La plupart des outils proposent des tarifs dans cette fourchette pour des listes de moins de 1 000 contacts.",
  moyen:
    "Prévoyez entre 20 € et 50 €/mois. Ce budget débloque l'automation avancée, la segmentation et les rapports détaillés sur la majorité des plateformes.",
  élevé:
    "Un budget de 50 €+ est recommandé pour accéder aux fonctionnalités avancées : CRM intégré, A/B testing poussé, délivrabilité premium et support prioritaire.",
};

export function generateProfilFaqItems(
  profil: Profile,
  allTools: Tool[]
): FaqItem[] {
  // Q1 — meilleur outil gratuit pour ce profil
  const freePick = allTools
    .filter((t) => t.planGratuit)
    .sort((a, b) => b.noteGlobale - a.noteGlobale)[0] ?? null;

  const freeAnswer = freePick
    ? `Le meilleur outil emailing gratuit pour ${profil.nomPluriel} est ${freePick.nom} (${freePick.noteGlobale}/5). ${freePick.descriptionCourte} Son plan gratuit permet de démarrer sans engagement financier.`
    : `Aucun outil de notre sélection ne propose actuellement de plan gratuit permanent. Vérifiez les sites officiels, les offres évoluent régulièrement.`;

  // Q2 — meilleur outil français (supportFrancais)
  const frenchPick = allTools
    .filter((t) => t.features.supportFrancais)
    .sort((a, b) => b.noteGlobale - a.noteGlobale)[0] ?? null;

  const frenchAnswer = frenchPick
    ? `Pour ${profil.nomPluriel} qui ont besoin d'un support en français, nous recommandons ${frenchPick.nom} (${frenchPick.noteGlobale}/5). ${frenchPick.descriptionCourte}`
    : `Aucun outil de notre sélection ne propose de support client en français. Si ce critère est essentiel, orientez-vous vers des solutions d'origine française comme Brevo.`;

  // Q3 — budget
  const budgetAnswer = BUDGET_ANSWER[profil.budgetMensuel];

  // Q4 — contacts sur plan gratuit (top 3 outils avec planGratuit)
  const freeTools = allTools
    .filter((t) => t.planGratuit)
    .sort((a, b) => b.noteGlobale - a.noteGlobale)
    .slice(0, 3);

  const freeContactLines = freeTools.map((t) => {
    const tier = t.pricing.find((p) => p.prixMois === 0);
    const parts: string[] = [];
    if (tier?.contacts) parts.push(`${tier.contacts.toLocaleString("fr-FR")} contacts`);
    if (tier?.emailsMois) parts.push(`${tier.emailsMois.toLocaleString("fr-FR")} emails/mois`);
    return parts.length > 0 ? `${t.nom} : ${parts.join(", ")}` : `${t.nom} : plan gratuit disponible`;
  });

  const freeContactsAnswer =
    freeContactLines.length > 0
      ? `Voici les limites des plans gratuits des outils les mieux notés : ${freeContactLines.join(" — ")}. Ces limites sont suffisantes pour démarrer une liste de zéro.`
      : `Les plans gratuits sont limités en contacts et en envois. Consultez les pages tarifaires officielles pour les chiffres exacts, qui peuvent évoluer.`;

  return [
    {
      question: `Quel est le meilleur outil emailing gratuit pour ${profil.nom} ?`,
      answer: freeAnswer,
    },
    {
      question: `Quel outil emailing français recommandez-vous pour ${profil.nom} ?`,
      answer: frenchAnswer,
    },
    {
      question: `Quel budget prévoir pour l'emailing quand on est ${profil.nom} ?`,
      answer: budgetAnswer,
    },
    {
      question: `Combien de contacts peut-on avoir sur un plan gratuit ?`,
      answer: freeContactsAnswer,
    },
  ];
}
