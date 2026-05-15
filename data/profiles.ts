export type Profile = {
  slug: string;
  nom: string;
  nomPluriel: string;
  description: string;
  besoins: string[];
  budgetMensuel: "gratuit" | "faible" | "moyen" | "élevé";
  tailleListeMoyenne: "petite" | "moyenne" | "grande";
  priorites: string[];
};

export const PROFILES: Record<string, Profile> = {
  freelance: {
    slug: "freelance",
    nom: "Freelance",
    nomPluriel: "les freelances",
    description:
      "Un freelance a besoin d'un outil simple et abordable pour rester en contact avec ses clients et prospects sans y passer des heures.",
    besoins: [
      "Envoyer une newsletter mensuelle sans complexité technique",
      "Automatiser les relances et séquences de bienvenue",
      "Collecter des leads via un formulaire sur son site",
      "Garder un coût mensuel minimal, idéalement gratuit",
    ],
    budgetMensuel: "faible",
    tailleListeMoyenne: "petite",
    priorites: ["Prix abordable", "Facilité de prise en main", "Plan gratuit généreux"],
  },

  tpe: {
    slug: "tpe",
    nom: "TPE",
    nomPluriel: "les TPE",
    description:
      "Une TPE cherche à fidéliser sa clientèle locale et à promouvoir ses offres sans avoir une équipe marketing dédiée.",
    besoins: [
      "Envoyer des promotions et actualités à sa base clients",
      "Segmenter facilement par type de client ou d'achat",
      "Disposer d'un support réactif en cas de problème",
      "Respecter le RGPD sans expertise juridique",
    ],
    budgetMensuel: "faible",
    tailleListeMoyenne: "petite",
    priorites: ["Support en français", "Rapport qualité/prix", "Conformité RGPD"],
  },

  ecommerce: {
    slug: "ecommerce",
    nom: "E-commerçant",
    nomPluriel: "les e-commerçants",
    description:
      "Un e-commerçant exploite l'email marketing pour récupérer les paniers abandonnés, fidéliser et générer des ventes récurrentes.",
    besoins: [
      "Relancer automatiquement les paniers abandonnés",
      "Segmenter selon l'historique d'achat et le comportement",
      "S'intégrer nativement à Shopify, WooCommerce ou PrestaShop",
      "Envoyer des emails transactionnels et marketing depuis un seul outil",
    ],
    budgetMensuel: "moyen",
    tailleListeMoyenne: "grande",
    priorites: ["Automation e-commerce", "Intégrations natives", "Délivrabilité"],
  },

  startup: {
    slug: "startup",
    nom: "Startup",
    nomPluriel: "les startups",
    description:
      "Une startup a besoin d'un outil scalable avec une API robuste pour intégrer l'emailing dans son produit et automatiser sa croissance.",
    besoins: [
      "Accéder à une API complète pour les envois transactionnels",
      "Automatiser des séquences d'onboarding et de rétention",
      "Analyser finement l'engagement pour piloter la croissance",
      "Monter en charge rapidement sans changer d'outil",
    ],
    budgetMensuel: "moyen",
    tailleListeMoyenne: "moyenne",
    priorites: ["API robuste", "Scalabilité", "Analytics avancés"],
  },

  association: {
    slug: "association",
    nom: "Association",
    nomPluriel: "les associations",
    description:
      "Une association communique avec ses adhérents et donateurs avec un budget serré et des impératifs RGPD stricts.",
    besoins: [
      "Envoyer des newsletters à faible coût, voire gratuitement",
      "Gérer les désabonnements et consentements conformément au RGPD",
      "Créer des emails sans compétences graphiques avancées",
      "Segmenter adhérents, bénévoles et donateurs",
    ],
    budgetMensuel: "gratuit",
    tailleListeMoyenne: "petite",
    priorites: ["Gratuité ou coût très faible", "Conformité RGPD", "Simplicité"],
  },

  artisan: {
    slug: "artisan",
    nom: "Artisan",
    nomPluriel: "les artisans",
    description:
      "Un artisan veut informer sa clientèle locale de ses nouveautés, promotions saisonnières et événements sans complexité technique.",
    besoins: [
      "Créer des emails visuels avec des templates prêts à l'emploi",
      "Envoyer des promotions saisonnières et offres ponctuelles",
      "Collecter les emails en boutique via un formulaire simple",
      "Utiliser un outil en français avec un support accessible",
    ],
    budgetMensuel: "gratuit",
    tailleListeMoyenne: "petite",
    priorites: ["Templates prêts à l'emploi", "Interface en français", "Prix gratuit ou très bas"],
  },

  coach: {
    slug: "coach",
    nom: "Coach",
    nomPluriel: "les coachs",
    description:
      "Un coach utilise l'email pour nurturer ses prospects, vendre ses programmes et maintenir le lien avec ses clients entre les séances.",
    besoins: [
      "Mettre en place des séquences de nurturing automatisées",
      "Créer des pages de capture pour ses lead magnets",
      "Vendre ses programmes directement depuis l'email",
      "Segmenter prospects froids, tièdes et clients actifs",
    ],
    budgetMensuel: "faible",
    tailleListeMoyenne: "petite",
    priorites: ["Automation", "Landing pages intégrées", "Simplicité"],
  },

  formateur: {
    slug: "formateur",
    nom: "Formateur",
    nomPluriel: "les formateurs",
    description:
      "Un formateur s'appuie sur l'emailing pour promouvoir ses formations, animer ses webinaires et fidéliser ses apprenants.",
    besoins: [
      "Automatiser les séquences avant et après webinaire",
      "Promouvoir des formations avec des tunnels emails dédiés",
      "Segmenter par thématique de formation ou niveau",
      "Intégrer des outils de vente en ligne (Teachable, Systeme.io…)",
    ],
    budgetMensuel: "moyen",
    tailleListeMoyenne: "moyenne",
    priorites: ["Webinaires intégrés", "Automation avancée", "Tunnels de vente"],
  },

  createur: {
    slug: "createur",
    nom: "Créateur de contenu",
    nomPluriel: "les créateurs de contenu",
    description:
      "Un créateur de contenu monetise sa communauté via une newsletter, du contenu payant et des recommandations affiliées.",
    besoins: [
      "Envoyer une newsletter régulière à une large audience",
      "Proposer une newsletter payante pour monétiser ses abonnés",
      "Démarrer gratuitement avec un plan généreux en contacts",
      "Suivre les taux d'ouverture et de clic pour optimiser son contenu",
    ],
    budgetMensuel: "gratuit",
    tailleListeMoyenne: "grande",
    priorites: ["Plan gratuit généreux", "Newsletter payante intégrée", "Délivrabilité"],
  },

  photographe: {
    slug: "photographe",
    nom: "Photographe",
    nomPluriel: "les photographes",
    description:
      "Un photographe utilise l'email pour présenter son portfolio, promouvoir ses offres saisonnières et fidéliser sa clientèle.",
    besoins: [
      "Créer des emails visuels mettant en valeur son portfolio",
      "Envoyer des offres saisonnières (mariages, Noël, portraits…)",
      "Automatiser le suivi des prospects après un premier contact",
      "Utiliser un outil simple sans besoin de compétences techniques",
    ],
    budgetMensuel: "gratuit",
    tailleListeMoyenne: "petite",
    priorites: ["Templates visuels", "Prix faible ou gratuit", "Facilité d'utilisation"],
  },

  therapeute: {
    slug: "therapeute",
    nom: "Thérapeute",
    nomPluriel: "les thérapeutes",
    description:
      "Un thérapeute communique avec ses patients et prospects en respectant une confidentialité et un cadre RGPD stricts.",
    besoins: [
      "Envoyer une newsletter bien-être ou conseils santé",
      "Gérer les consentements et désabonnements rigoureusement",
      "Choisir un hébergement de données en Europe (RGPD)",
      "Utiliser un outil simple, sans jargon technique",
    ],
    budgetMensuel: "gratuit",
    tailleListeMoyenne: "petite",
    priorites: ["Conformité RGPD stricte", "Hébergement européen", "Prix gratuit ou bas"],
  },

  consultant: {
    slug: "consultant",
    nom: "Consultant",
    nomPluriel: "les consultants",
    description:
      "Un consultant utilise l'emailing pour asseoir son expertise, nurturer ses leads et convertir des prospects en missions.",
    besoins: [
      "Envoyer une newsletter d'expertise positionnant son savoir-faire",
      "Automatiser les séquences de nurturing sur plusieurs semaines",
      "Suivre les leads les plus engagés pour prioriser ses relances",
      "Intégrer l'email à son CRM ou outil de gestion commerciale",
    ],
    budgetMensuel: "faible",
    tailleListeMoyenne: "petite",
    priorites: ["CRM intégré ou compatible", "Scoring de leads", "Automation"],
  },

  infopreneur: {
    slug: "infopreneur",
    nom: "Infopreneur",
    nomPluriel: "les infopreneurs",
    description:
      "Un infopreneur construit tout son business en ligne autour de sa liste email : ventes, webinaires, lancements et contenu payant.",
    besoins: [
      "Mettre en place des tunnels de vente complets par email",
      "Automatiser les séquences de lancement de produits",
      "Héberger et vendre ses formations directement depuis la plateforme",
      "Segmenter finement selon les comportements d'achat et d'engagement",
    ],
    budgetMensuel: "moyen",
    tailleListeMoyenne: "grande",
    priorites: ["Tunnels de vente", "Automation avancée", "Tout-en-un"],
  },

  agence: {
    slug: "agence",
    nom: "Agence",
    nomPluriel: "les agences",
    description:
      "Une agence marketing gère l'emailing de plusieurs clients et a besoin d'une plateforme multi-comptes avec reporting avancé.",
    besoins: [
      "Gérer plusieurs comptes clients depuis une interface unique",
      "Produire des rapports personnalisés et exportables par client",
      "Accéder à une API complète pour automatiser les workflows clients",
      "Bénéficier d'un whitelabeling ou d'une gestion des droits fine",
    ],
    budgetMensuel: "élevé",
    tailleListeMoyenne: "grande",
    priorites: ["Gestion multi-comptes", "Rapports avancés", "API et intégrations"],
  },

  restauration: {
    slug: "restauration",
    nom: "Restaurateur",
    nomPluriel: "les restaurateurs",
    description:
      "Un restaurateur fidélise sa clientèle locale avec des newsletters, promotions événementielles et rappels de réservation.",
    besoins: [
      "Envoyer des promotions événementielles (Saint-Valentin, Noël…)",
      "Combiner email et SMS pour les rappels et offres flash",
      "Utiliser des templates visuels et appétissants facilement",
      "Gérer une petite liste sans coûts excessifs",
    ],
    budgetMensuel: "faible",
    tailleListeMoyenne: "petite",
    priorites: ["SMS marketing intégré", "Templates visuels", "Prix accessible"],
  },
};

export function getProfileBySlug(slug: string): Profile | undefined {
  return PROFILES[slug];
}

export function getAllProfiles(): Profile[] {
  return Object.values(PROFILES);
}
