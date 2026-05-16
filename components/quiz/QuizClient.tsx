"use client";

import { useState, useMemo } from "react";
import type { Tool } from "@/data/tools";
import { getVsPageSlug } from "@/data/tools";
import AffiliateButton from "@/components/AffiliateButton";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Option = {
  label: string;
  scores: Partial<Record<string, number>>;
};

type Question = {
  question: string;
  options: Option[];
};

// ─── Questions & scoring ───────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    question: "Quelle est la taille de votre liste actuelle (ou prévue) ?",
    options: [
      {
        label: "Moins de 500 contacts",
        scores: { mailerlite: 3, convertkit: 3, systemeio: 2, brevo: 2, mailchimp: 1, getresponse: 1, mailjet: 1 },
      },
      {
        label: "500 à 2 000 contacts",
        scores: { mailerlite: 3, systemeio: 3, convertkit: 2, brevo: 2, getresponse: 1, moosend: 1 },
      },
      {
        label: "2 000 à 10 000 contacts",
        scores: { brevo: 3, mailjet: 2, mailerlite: 2, getresponse: 2, systemeio: 2, activecampaign: 1 },
      },
      {
        label: "Plus de 10 000 contacts",
        scores: { brevo: 3, mailjet: 3, activecampaign: 2, getresponse: 1, sarbacane: 1, mailchimp: 1 },
      },
    ],
  },
  {
    question: "Quel est votre budget mensuel ?",
    options: [
      {
        label: "Gratuit uniquement",
        scores: { systemeio: 3, mailerlite: 3, brevo: 2, convertkit: 2, mailchimp: 1, getresponse: 1, mailjet: 1 },
      },
      {
        label: "Moins de 20 €/mois",
        scores: { mailerlite: 3, brevo: 3, moosend: 2, mailjet: 2, activecampaign: 1, getresponse: 1 },
      },
      {
        label: "20 € à 50 €/mois",
        scores: { getresponse: 2, activecampaign: 2, systemeio: 2, mailerlite: 2, convertkit: 1, mailchimp: 1, brevo: 1 },
      },
      {
        label: "Plus de 50 €/mois",
        scores: { activecampaign: 3, sarbacane: 3, getresponse: 2, mailchimp: 2, systemeio: 1, moosend: 1 },
      },
    ],
  },
  {
    question: "Avez-vous besoin d'automation marketing ?",
    options: [
      {
        label: "Non, j'envoie juste des newsletters",
        scores: { mailerlite: 3, convertkit: 2, mailjet: 2, mailchimp: 2, systemeio: 1, brevo: 1 },
      },
      {
        label: "Oui, des séquences simples (bienvenue, relance)",
        scores: { brevo: 2, mailerlite: 2, getresponse: 2, systemeio: 2, moosend: 2, mailchimp: 1 },
      },
      {
        label: "Oui, de l'automation avancée (scoring, CRM)",
        scores: { activecampaign: 3, getresponse: 2, moosend: 2, brevo: 1, sarbacane: 1, mailchimp: 1 },
      },
    ],
  },
  {
    question: "Le support en français est-il important pour vous ?",
    options: [
      {
        label: "Oui, indispensable",
        scores: { brevo: 3, sarbacane: 3, systemeio: 2, mailjet: 2, getresponse: 1 },
      },
      {
        label: "Non, l'anglais me convient",
        scores: { mailerlite: 1, convertkit: 1, activecampaign: 1, mailchimp: 1, moosend: 1 },
      },
    ],
  },
  {
    question: "Quel est votre profil ?",
    options: [
      {
        label: "Créateur de contenu / Newsletter",
        scores: { convertkit: 3, mailerlite: 2, getresponse: 1, brevo: 1 },
      },
      {
        label: "E-commerce / Boutique en ligne",
        scores: { mailchimp: 3, activecampaign: 2, brevo: 2, getresponse: 2, moosend: 2 },
      },
      {
        label: "Coach / Formateur / Infopreneur",
        scores: { systemeio: 3, getresponse: 3, convertkit: 2, mailerlite: 1, activecampaign: 1 },
      },
      {
        label: "Freelance / Consultant",
        scores: { mailerlite: 2, brevo: 2, systemeio: 2, activecampaign: 1, convertkit: 1 },
      },
      {
        label: "Association / TPE",
        scores: { brevo: 3, sarbacane: 2, mailerlite: 2, mailjet: 1, getresponse: 1 },
      },
    ],
  },
];

// ─── Why text ──────────────────────────────────────────────────────────────────

function generateWhy(slug: string, answers: number[]): string {
  const [taille, budget, automation, francais, profil] = answers;
  const budgetFree = budget === 0;
  const needsFrench = francais === 0;
  const needsAdvancedAuto = automation === 2;

  switch (slug) {
    case "brevo":
      if (needsFrench) return "Solution française avec support en français 7j/7, contacts illimités et RGPD natif.";
      if (budgetFree) return "Plan gratuit avec contacts illimités idéal pour démarrer sans budget.";
      return "Plateforme française tout-en-un avec un excellent rapport qualité/prix.";
    case "mailerlite":
      if (budgetFree && taille <= 1) return "Plan gratuit très généreux (1 000 contacts, 12 000 emails/mois) sans contrainte.";
      if (profil === 0) return "Interface épurée et prix imbattables, parfaits pour les newsletters de créateurs.";
      return "L'outil le plus abordable avec une prise en main rapide et des fonctionnalités complètes.";
    case "systemeio":
      if (budgetFree) return "Plan gratuit le plus complet du marché : 2 000 contacts, cours en ligne et tunnels de vente inclus.";
      if (profil === 2) return "Tout-en-un idéal pour vendre des formations : emails, tunnels et cours dans une seule plateforme.";
      return "Alternative française tout-en-un pour lancer un business en ligne sans multiplier les abonnements.";
    case "convertkit":
      if (budgetFree) return "Plan gratuit jusqu'à 10 000 abonnés, le plus généreux du secteur pour les créateurs.";
      if (profil === 0) return "Conçu par des créateurs pour des créateurs, avec monétisation directe de la newsletter.";
      return "Philosophie text-first avec une délivrabilité excellente et une automation intuitive par tags.";
    case "activecampaign":
      if (needsAdvancedAuto) return "Référence incontestée de l'automation avancée avec CRM intégré et 870+ intégrations.";
      if (profil === 1) return "Le choix des équipes e-commerce qui veulent automatiser tout le cycle de vie client.";
      return "Automation la plus puissante du marché pour les structures qui veulent scaler.";
    case "getresponse":
      if (profil === 2) return "Webinaires natifs et tunnels de vente intégrés, parfaits pour les formateurs et coachs.";
      if (needsAdvancedAuto) return "Automation visuelle avancée avec webinaires et landing pages dans une seule interface.";
      return "Suite marketing complète avec programme d'affiliation récurrent parmi les meilleurs.";
    case "sarbacane":
      if (needsFrench) return "Éditeur français premium avec support téléphonique inclus et données hébergées en France.";
      return "Solution française haut de gamme avec accompagnement personnalisé et délivrabilité optimale.";
    case "mailjet":
      if (needsFrench) return "Outil français avec contacts illimités, support francophone et collaboration en temps réel sur les templates.";
      if (taille >= 2) return "Facturation à l'envoi avec contacts illimités, idéal pour les grandes bases.";
      return "API robuste et collaboration en temps réel sur les templates, parfait pour les équipes tech.";
    case "mailchimp":
      if (profil === 1) return "Standard mondial de l'e-commerce avec l'écosystème d'intégrations le plus vaste du marché.";
      return "La référence mondiale avec l'éditeur drag-and-drop le plus abouti et 300+ intégrations.";
    case "moosend":
      if (needsAdvancedAuto) return "Automation visuelle avancée d'ActiveCampaign à moitié prix, avec envois illimités.";
      return "Envois illimités et automation avancée à des tarifs très compétitifs dès 9 €/mois.";
    default:
      return "Excellent rapport qualité/prix adapté à votre profil et vos besoins.";
  }
}

// ─── Star rating ───────────────────────────────────────────────────────────────

function StarRating({ note, small = false }: { note: number; small?: boolean }) {
  const starSize = small ? 10 : 13;
  return (
    <div
      className="flex shrink-0 items-center gap-0.5"
      aria-label={`Note : ${note}/5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          width={starSize}
          height={starSize}
          viewBox="0 0 24 24"
          fill={note >= star ? "#F59E0B" : note >= star - 0.5 ? "#FCD34D" : "none"}
          stroke="#F59E0B"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className={`ml-1 font-medium text-gray-600 ${small ? "text-xs" : "text-sm"}`}>
        {note}
      </span>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function QuizClient({ tools }: { tools: Tool[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [exiting, setExiting] = useState(false);

  const isCompleted = step >= QUESTIONS.length;

  function handleAnswer(optionIndex: number) {
    setExiting(true);
    setTimeout(() => {
      setAnswers((prev) => [...prev, optionIndex]);
      setStep((prev) => prev + 1);
      setExiting(false);
    }, 180);
  }

  function handleReset() {
    setExiting(true);
    setTimeout(() => {
      setStep(0);
      setAnswers([]);
      setExiting(false);
    }, 180);
  }

  const scores = useMemo<Record<string, number>>(() => {
    const acc: Record<string, number> = {};
    answers.forEach((answerIndex, qIndex) => {
      const option = QUESTIONS[qIndex]?.options[answerIndex];
      if (!option) return;
      Object.entries(option.scores).forEach(([slug, pts]) => {
        acc[slug] = (acc[slug] ?? 0) + (pts ?? 0);
      });
    });
    return acc;
  }, [answers]);

  const top3 = useMemo(() => {
    return tools
      .map((tool) => ({ tool, score: scores[tool.slug] ?? 0 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [tools, scores]);

  // ── Question view ────────────────────────────────────────────────────────────

  if (!isCompleted) {
    const q = QUESTIONS[step];
    const progress = (step / QUESTIONS.length) * 100;

    return (
      <div
        className={`transition-all duration-[180ms] ${
          exiting ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-gray-400">
            <span>Question {step + 1} sur {QUESTIONS.length}</span>
            <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)} %</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gray-900 transition-all duration-300"
              style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="mb-6 text-xl font-semibold text-gray-900 sm:text-2xl">
          {q.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="group w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-left text-sm font-medium text-gray-800 transition-all hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              <span className="flex items-center justify-between gap-3">
                {option.label}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-gray-300 transition-colors group-hover:text-gray-600"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Results view ─────────────────────────────────────────────────────────────

  const [first, second, third] = top3;

  return (
    <div
      className={`transition-all duration-[180ms] ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="mb-8 text-center">
        <p className="text-sm font-medium text-gray-500">Résultats personnalisés</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Voici les outils faits pour vous
        </h2>
      </div>

      {/* ── #1 highlighted ─────────────────────────────────────────────────── */}
      <div className="mb-4 overflow-hidden rounded-2xl border-2 border-gray-900 bg-white shadow-sm">
        <div className="bg-gray-900 px-5 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white">
          #1 — Recommandation principale
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: first.tool.couleurBrand }}
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold text-gray-900">{first.tool.nom}</h3>
              </div>
              <p className="text-sm text-gray-500">{first.tool.descriptionCourte}</p>
            </div>
            <StarRating note={first.tool.noteGlobale} />
          </div>
          <p className="mb-5 rounded-lg bg-gray-50 px-4 py-3 text-sm italic text-gray-600">
            {generateWhy(first.tool.slug, answers)}
          </p>
          <AffiliateButton tool={first.tool} variant="primary" />
        </div>
      </div>

      {/* ── VS link ─────────────────────────────────────────────────────────── */}
      {second && (
        <div className="my-5 text-center">
          <a
            href={`/${getVsPageSlug(first.tool.slug, second.tool.slug)}`}
            className="text-xs text-gray-400 underline underline-offset-2 hover:text-gray-700"
          >
            Voir le comparatif complet {first.tool.nom} vs {second.tool.nom} →
          </a>
        </div>
      )}

      {/* ── #2 and #3 ───────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        {[second, third].filter(Boolean).map((row, i) => (
          <div
            key={row.tool.slug}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="mb-4 flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-sm font-bold text-gray-300">
                #{i + 2}
              </span>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: row.tool.couleurBrand }}
                    aria-hidden="true"
                  />
                  <h3 className="font-semibold text-gray-900">{row.tool.nom}</h3>
                  <StarRating note={row.tool.noteGlobale} small />
                </div>
                <p className="mb-1.5 text-xs text-gray-500">{row.tool.descriptionCourte}</p>
                <p className="text-xs italic text-gray-400">
                  {generateWhy(row.tool.slug, answers)}
                </p>
              </div>
            </div>
            <AffiliateButton tool={row.tool} variant="outline" />
          </div>
        ))}
      </div>

      {/* ── Reset ───────────────────────────────────────────────────────────── */}
      <div className="mt-8 text-center">
        <button
          onClick={handleReset}
          className="text-sm text-gray-400 underline underline-offset-2 hover:text-gray-700"
        >
          Recommencer le quiz
        </button>
      </div>
    </div>
  );
}
