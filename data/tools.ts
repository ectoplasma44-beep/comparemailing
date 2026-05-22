// ─── Types ────────────────────────────────────────────────────────────────────

export type Feature = {
  automation: boolean;
  landingPages: boolean;
  sms: boolean;
  crmIntegre: boolean;
  abTesting: boolean;
  templates: boolean;
  api: boolean;
  supportFrancais: boolean;
  rgpd: boolean;
  dragAndDrop: boolean;
  segmentation: boolean;
  rapportsAvances: boolean;
};

export type PricingTier = {
  nom: string;
  contacts: number | null;
  emailsMois: number | null;
  prixMois: number | null;
  note?: string;
};

export type AffiliateProgram = {
  commission: string;
  type: "récurrent" | "one-shot";
  dureeRecurrence?: string;
  cookieDays: number;
  lien?: string;
};

export type Tool = {
  slug: string;
  nom: string;
  logoUrl: string;
  descriptionCourte: string;
  descriptionLongue: string;
  siteUrl: string;
  affiliateUrl?: string;
  affiliateProgram: AffiliateProgram;
  noteGlobale: number;
  prixDepart: number | null;
  planGratuit: boolean;
  pricing: PricingTier[];
  features: Feature;
  idealPour: string[];
  avantages: string[];
  inconvenients: string[];
  pays: string;
  fondation: number;
  couleurBrand: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const TOOLS: Record<string, Tool> = {
  brevo: {
    slug: "brevo",
    nom: "Brevo",
    logoUrl: "/logos/brevo.svg",
    descriptionCourte:
      "La solution française tout-en-un pour l'emailing, le SMS et le CRM.",
    descriptionLongue:
      "Brevo (ex-Sendinblue) est une plateforme marketing française fondée à Paris en 2012. Elle propose l'email marketing, les SMS, le chat en direct, un CRM intégré et des pages de destination dans une interface unifiée. Particulièrement appréciée des PME européennes pour sa conformité RGPD native et son support francophone, elle facture à l'envoi plutôt qu'au nombre de contacts, ce qui la rend compétitive dès que la base d'abonnés grossit.",
    siteUrl: "https://www.brevo.com/fr/",
    affiliateUrl: "https://www.brevo.com/fr/referral-program/",
    affiliateProgram: {
      commission: "5 € par compte gratuit créé + 100 € par upgrade payant",
      type: "one-shot",
      cookieDays: 90,
      lien: "https://www.brevo.com/fr/referral-program/",
    },
    noteGlobale: 4.4,
    prixDepart: 9,
    planGratuit: true,
    pricing: [
      {
        nom: "Gratuit",
        contacts: null,
        emailsMois: 9000,
        prixMois: 0,
        note: "Contacts illimités, 300 emails/jour",
      },
      {
        nom: "Starter",
        contacts: null,
        emailsMois: 20000,
        prixMois: 9,
        note: "Contacts illimités, sans logo Brevo",
      },
      {
        nom: "Business",
        contacts: null,
        emailsMois: 20000,
        prixMois: 18,
        note: "Automation avancée, A/B testing, rapports multi-utilisateurs",
      },
      {
        nom: "Enterprise",
        contacts: null,
        emailsMois: null,
        prixMois: null,
        note: "Volume sur mesure, SLA, IP dédiée",
      },
    ],
    features: {
      automation: true,
      landingPages: true,
      sms: true,
      crmIntegre: true,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: true,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: true,
    },
    idealPour: ["tpe", "ecommerce", "agence", "association", "startup", "consultant"],
    avantages: [
      "Facturation à l'envoi : contacts illimités même en plan gratuit",
      "Solution française, support en français 7j/7, RGPD natif",
      "CRM intégré évitant un abonnement supplémentaire",
      "SMS marketing dans la même interface que l'email",
      "API robuste et intégrations WooCommerce/Shopify natives",
    ],
    inconvenients: [
      "Éditeur d'automation moins visuel qu'ActiveCampaign",
      "Rapports analytics moins détaillés que Mailchimp en plan bas",
      "Limite de 300 emails/jour sur le plan gratuit",
      "Templates par défaut vieillissants comparés à MailerLite",
    ],
    pays: "France",
    fondation: 2012,
    couleurBrand: "#0B96E5",
  },

  mailchimp: {
    slug: "mailchimp",
    nom: "Mailchimp",
    logoUrl: "/logos/mailchimp.svg",
    descriptionCourte:
      "Le standard mondial de l'email marketing, riche en fonctionnalités.",
    descriptionLongue:
      "Mailchimp est la référence mondiale de l'email marketing avec plus de 13 millions d'utilisateurs. Fondée en 2001 à Atlanta, la plateforme propose un éditeur drag-and-drop mature, des automatisations puissantes, des landing pages, des formulaires et des rapports analytics détaillés. Rachetée par Intuit en 2021, elle se positionne de plus en plus comme une suite marketing complète. Son plan gratuit est désormais limité à 500 contacts, ce qui pousse rapidement vers des abonnements payants.",
    siteUrl: "https://mailchimp.com/",
    affiliateUrl: "https://mailchimp.com/referral-program/",
    affiliateProgram: {
      commission: "30 % sur le premier mois de l'abonné référé",
      type: "one-shot",
      cookieDays: 30,
      lien: "https://mailchimp.com/referral-program/",
    },
    noteGlobale: 4.2,
    prixDepart: 13,
    planGratuit: true,
    pricing: [
      {
        nom: "Gratuit",
        contacts: 500,
        emailsMois: 1000,
        prixMois: 0,
        note: "1 audience, pas d'A/B testing",
      },
      {
        nom: "Essentials",
        contacts: 500,
        emailsMois: 5000,
        prixMois: 13,
        note: "3 audiences, suppression du logo Mailchimp",
      },
      {
        nom: "Standard",
        contacts: 500,
        emailsMois: 6000,
        prixMois: 20,
        note: "Automation avancée, A/B testing, optimisation horaire",
      },
      {
        nom: "Premium",
        contacts: 10000,
        emailsMois: null,
        prixMois: 350,
        note: "Audiences illimitées, support prioritaire, segmentation avancée",
      },
    ],
    features: {
      automation: true,
      landingPages: true,
      sms: true,
      crmIntegre: false,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: false,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: true,
    },
    idealPour: ["ecommerce", "startup", "agence", "createur", "tpe"],
    avantages: [
      "Éditeur drag-and-drop le plus abouti du marché",
      "Écosystème d'intégrations le plus vaste (300+ apps)",
      "Rapports analytics détaillés avec carte de clics",
      "Notoriété mondiale, ressources communautaires abondantes",
      "Fonctionnalité d'optimisation horaire basée sur l'IA",
    ],
    inconvenients: [
      "Tarifs parmi les plus élevés dès que la liste dépasse 1 000 contacts",
      "Support uniquement en anglais, pas de support téléphonique en Essentials",
      "Plan gratuit très restrictif depuis 2019 (500 contacts max)",
      "Hébergement aux États-Unis, contraintes RGPD à gérer manuellement",
    ],
    pays: "États-Unis",
    fondation: 2001,
    couleurBrand: "#FFE01B",
  },

  mailerlite: {
    slug: "mailerlite",
    nom: "MailerLite",
    logoUrl: "/logos/mailerlite.svg",
    descriptionCourte:
      "L'outil emailing le plus abordable avec un rapport qualité/prix imbattable.",
    descriptionLongue:
      "MailerLite est une plateforme d'email marketing fondée en 2010 à Vilnius (Lituanie). Elle se distingue par un plan gratuit très généreux (jusqu'à 1 000 abonnés, 12 000 emails/mois), un éditeur de newsletters et de sites web d'une grande simplicité, et des prix parmi les plus bas du marché. Idéale pour les créateurs de contenu, les solopreneurs et les petites structures qui veulent démarrer sans complexité et sans budget.",
    siteUrl: "https://www.mailerlite.com/",
    affiliateUrl: "https://www.mailerlite.com/?linkId=lp_170762&sourceId=toolpick&tenantId=mailerlite",
    affiliateProgram: {
      commission: "30 % récurrent à vie",
      type: "récurrent",
      dureeRecurrence: "à vie",
      cookieDays: 90,
      lien: "https://www.mailerlite.com/?linkId=lp_170762&sourceId=toolpick&tenantId=mailerlite",
    },
    noteGlobale: 4.5,
    prixDepart: 9,
    planGratuit: true,
    pricing: [
      {
        nom: "Gratuit",
        contacts: 1000,
        emailsMois: 12000,
        prixMois: 0,
        note: "Éditeur drag-and-drop, formulaires, landing pages",
      },
      {
        nom: "Growing Business",
        contacts: 1000,
        emailsMois: null,
        prixMois: 9,
        note: "Envois illimités, suppression logo, A/B testing",
      },
      {
        nom: "Advanced",
        contacts: 1000,
        emailsMois: null,
        prixMois: 18,
        note: "Automation avancée, éditeur HTML, newsletter payante",
      },
      {
        nom: "Enterprise",
        contacts: null,
        emailsMois: null,
        prixMois: null,
        note: "Sur devis, IP dédiée, support dédié",
      },
    ],
    features: {
      automation: true,
      landingPages: true,
      sms: false,
      crmIntegre: false,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: false,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: false,
    },
    idealPour: ["freelance", "createur", "coach", "formateur", "infopreneur", "therapeute", "photographe"],
    avantages: [
      "Plan gratuit le plus généreux du marché (1 000 contacts, 12 000 emails/mois)",
      "Interface épurée, prise en main en moins d'une heure",
      "Éditeur de site web et de newsletter payante inclus",
      "Tarifs très compétitifs jusqu'à 50 000 abonnés",
      "Programme d'affiliation 30 % récurrent à vie",
    ],
    inconvenients: [
      "Pas de SMS marketing intégré",
      "CRM inexistant, pas de scoring de leads",
      "Automation moins puissante qu'ActiveCampaign ou GetResponse",
      "Support uniquement en anglais (chat & email)",
    ],
    pays: "Lituanie",
    fondation: 2010,
    couleurBrand: "#09C167",
  },

  getresponse: {
    slug: "getresponse",
    nom: "GetResponse",
    logoUrl: "/logos/getresponse.svg",
    descriptionCourte:
      "Emailing, automation et webinaires intégrés dans une seule plateforme.",
    descriptionLongue:
      "GetResponse est une plateforme marketing all-in-one fondée en 1998 en Pologne. Elle se distingue par l'intégration native de webinaires, un constructeur de tunnels de vente (Autofunnel), des formulaires pop-up et une automation visuelle avancée. Prisée des formateurs, infopreneurs et marketeurs qui souhaitent centraliser leur stack sans multiplier les abonnements, elle propose aussi un plan gratuit limité à 500 contacts.",
    siteUrl: "https://www.getresponse.com/fr",
    affiliateUrl: "https://www.getresponse.com/affiliate",
    affiliateProgram: {
      commission: "33 % récurrent",
      type: "récurrent",
      dureeRecurrence: "à vie",
      cookieDays: 120,
      lien: "https://www.getresponse.com/affiliate",
    },
    noteGlobale: 4.3,
    prixDepart: 15,
    planGratuit: true,
    pricing: [
      {
        nom: "Gratuit",
        contacts: 500,
        emailsMois: null,
        prixMois: 0,
        note: "1 landing page, formulaires, pas d'automation",
      },
      {
        nom: "Email Marketing",
        contacts: 1000,
        emailsMois: null,
        prixMois: 15,
        note: "Envois illimités, automation basique, landing pages illimitées",
      },
      {
        nom: "Marketing Automation",
        contacts: 1000,
        emailsMois: null,
        prixMois: 49,
        note: "Automation avancée, webinaires 100 participants, scoring",
      },
      {
        nom: "Ecommerce Marketing",
        contacts: 1000,
        emailsMois: null,
        prixMois: 99,
        note: "Abandons de panier, promo codes, webinaires 300 participants",
      },
    ],
    features: {
      automation: true,
      landingPages: true,
      sms: true,
      crmIntegre: false,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: true,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: true,
    },
    idealPour: ["formateur", "infopreneur", "ecommerce", "coach", "startup", "agence"],
    avantages: [
      "Webinaires natifs jusqu'à 1 000 participants (plan Enterprise)",
      "Constructeur de tunnels de vente Autofunnel intégré",
      "Automation visuelle parmi les plus complètes du marché",
      "Programme d'affiliation 33 % récurrent, parmi les meilleurs",
      "Interface disponible en français, support francophone",
    ],
    inconvenients: [
      "Tarifs qui grimpent vite selon le nombre de contacts",
      "CRM natif limité, scoring de leads perfectible",
      "Interface parfois surchargée, courbe d'apprentissage",
      "Délivrabilité légèrement inférieure à Brevo selon les benchmarks",
    ],
    pays: "Pologne",
    fondation: 1998,
    couleurBrand: "#00BAFF",
  },

  systemeio: {
    slug: "systemeio",
    nom: "Systeme.io",
    logoUrl: "/logos/systemeio.svg",
    descriptionCourte:
      "L'alternative française tout-en-un pour vendre des formations en ligne.",
    descriptionLongue:
      "Systeme.io est une plateforme tout-en-un créée en 2018 par l'entrepreneur français Aurélien Amacker. Elle combine l'emailing, les tunnels de vente, la création de cours en ligne, les programmes d'affiliation, les webinaires et les blogs dans une seule interface. Sa promesse : remplacer ClickFunnels + Mailchimp + Teachable + ThriveCart pour moins de 100 $/mois. Le plan gratuit est le plus généreux du marché avec 2 000 contacts et des tunnels illimités.",
    siteUrl: "https://systeme.io/fr",
    affiliateUrl: "https://systeme.io/fr?sa=sa00528582246f7b1fdec8926b990261b281da9921",
    affiliateProgram: {
      commission: "60 % récurrent à vie",
      type: "récurrent",
      dureeRecurrence: "à vie",
      cookieDays: 365,
      lien: "https://systeme.io/fr?sa=sa00528582246f7b1fdec8926b990261b281da9921",
    },
    noteGlobale: 4.4,
    prixDepart: 27,
    planGratuit: true,
    pricing: [
      {
        nom: "Gratuit",
        contacts: 2000,
        emailsMois: null,
        prixMois: 0,
        note: "3 tunnels, 1 cours, 1 blog, domaine personnalisé, emails illimités",
      },
      {
        nom: "Startup",
        contacts: 5000,
        emailsMois: null,
        prixMois: 27,
        note: "10 tunnels, 5 cours, 10 workflows automation",
      },
      {
        nom: "Webinar",
        contacts: 10000,
        emailsMois: null,
        prixMois: 47,
        note: "50 tunnels, webinaires evergreen, 20 cours, 100 workflows",
      },
      {
        nom: "Unlimited",
        contacts: null,
        emailsMois: null,
        prixMois: 97,
        note: "Tout illimité, migration gratuite, coaching dédié",
      },
    ],
    features: {
      automation: true,
      landingPages: true,
      sms: false,
      crmIntegre: false,
      abTesting: false,
      templates: true,
      api: true,
      supportFrancais: true,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: false,
    },
    idealPour: ["formateur", "infopreneur", "coach", "createur", "consultant", "freelance"],
    avantages: [
      "Plan gratuit le plus complet du marché : 2 000 contacts + cours + tunnels",
      "Affiliation 60 % récurrente à vie, la plus généreuse du secteur",
      "Tout-en-un évitant 4 à 5 abonnements distincts",
      "Interface en français, support francophone réactif",
      "Idéal pour lancer un business en ligne sans budget tech",
    ],
    inconvenients: [
      "Pas de SMS marketing",
      "A/B testing absent sur tous les plans",
      "Éditeur d'emails moins riche que Mailchimp ou MailerLite",
      "Rapports analytics basiques, peu adaptés aux besoins avancés",
    ],
    pays: "France",
    fondation: 2018,
    couleurBrand: "#4F46E5",
  },

  convertkit: {
    slug: "convertkit",
    nom: "Kit (ConvertKit)",
    logoUrl: "/logos/convertkit.svg",
    descriptionCourte:
      "L'outil emailing pensé par et pour les créateurs de contenu.",
    descriptionLongue:
      "ConvertKit, rebrandé Kit en 2024, est une plateforme d'email marketing fondée en 2013 par Nathan Barry, créateur de contenu lui-même. Elle adopte une philosophie différente des autres outils : pas d'éditeur de newsletters complexe, mais un focus sur les séquences automatisées, les formulaires d'opt-in et la relation directe avec les abonnés. Son plan gratuit monte jusqu'à 10 000 abonnés, un record. Elle propose aussi une fonctionnalité de newsletter payante (Kit Commerce) pour monétiser directement sa liste.",
    siteUrl: "https://kit.com/",
    affiliateUrl: "https://partners.kit.com/",
    affiliateProgram: {
      commission: "30 % récurrent",
      type: "récurrent",
      dureeRecurrence: "24 mois",
      cookieDays: 90,
      lien: "https://partners.kit.com/",
    },
    noteGlobale: 4.3,
    prixDepart: 25,
    planGratuit: true,
    pricing: [
      {
        nom: "Newsletter",
        contacts: 10000,
        emailsMois: null,
        prixMois: 0,
        note: "Broadcasts illimités, 1 séquence, formulaires, pas d'automation",
      },
      {
        nom: "Creator",
        contacts: 300,
        emailsMois: null,
        prixMois: 25,
        note: "Automation visuelle, intégrations tierces, live chat support",
      },
      {
        nom: "Creator Pro",
        contacts: 300,
        emailsMois: null,
        prixMois: 50,
        note: "Scoring abonnés, système de parrainage, support prioritaire",
      },
    ],
    features: {
      automation: true,
      landingPages: true,
      sms: false,
      crmIntegre: false,
      abTesting: true,
      templates: false,
      api: true,
      supportFrancais: false,
      rgpd: true,
      dragAndDrop: false,
      segmentation: true,
      rapportsAvances: false,
    },
    idealPour: ["createur", "infopreneur", "formateur", "coach", "photographe", "developpeur"],
    avantages: [
      "Plan gratuit jusqu'à 10 000 abonnés, le plus généreux du secteur",
      "Philosophie « text-first » : délivrabilité excellente, emails qui ressemblent à du vrai texte",
      "Monétisation intégrée : vendre abonnements payants et produits numériques",
      "Automation visuelle intuitive avec tags et segments",
      "Communauté de créateurs et formations très actives",
    ],
    inconvenients: [
      "Pas d'éditeur drag-and-drop d'emails visuels",
      "Pas de SMS, pas de CRM, pas de landing pages avancées",
      "Tarifs élevés une fois la liste > 1 000 abonnés en plan payant",
      "Interface et support uniquement en anglais",
    ],
    pays: "États-Unis",
    fondation: 2013,
    couleurBrand: "#FB6970",
  },

  activecampaign: {
    slug: "activecampaign",
    nom: "ActiveCampaign",
    logoUrl: "/logos/activecampaign.svg",
    descriptionCourte:
      "La référence en automation marketing et CRM pour les PME ambitieuses.",
    descriptionLongue:
      "ActiveCampaign est une plateforme d'automation marketing et de CRM fondée en 2003 à Chicago. Elle est considérée comme la référence en matière d'automatisation avancée grâce à son éditeur de workflows visuels, son scoring de leads, son CRM intégré et ses 870+ intégrations natives. Particulièrement adaptée aux équipes marketing et commerciales qui veulent aligner automatisation des emails et gestion de la relation client dans un seul outil.",
    siteUrl: "https://www.activecampaign.com/",
    affiliateUrl: "https://www.activecampaign.com/partner/affiliates",
    affiliateProgram: {
      commission: "20 à 30 % récurrent selon le volume",
      type: "récurrent",
      dureeRecurrence: "à vie",
      cookieDays: 90,
      lien: "https://www.activecampaign.com/partner/affiliates",
    },
    noteGlobale: 4.5,
    prixDepart: 15,
    planGratuit: false,
    pricing: [
      {
        nom: "Starter",
        contacts: 1000,
        emailsMois: 10000,
        prixMois: 15,
        note: "Email marketing, formulaires, rapports de base",
      },
      {
        nom: "Plus",
        contacts: 1000,
        emailsMois: null,
        prixMois: 49,
        note: "CRM, landing pages, SMS, contenu conditionnel",
      },
      {
        nom: "Pro",
        contacts: 1000,
        emailsMois: null,
        prixMois: 79,
        note: "Attribution, probabilité de conversion, split automation",
      },
      {
        nom: "Enterprise",
        contacts: 1000,
        emailsMois: null,
        prixMois: 145,
        note: "SSO, rapports personnalisés, onboarding dédié, SLA",
      },
    ],
    features: {
      automation: true,
      landingPages: true,
      sms: true,
      crmIntegre: true,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: false,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: true,
    },
    idealPour: ["startup", "agence", "ecommerce", "consultant", "tpe", "developpeur"],
    avantages: [
      "Automation la plus puissante du marché, avec split testing de workflows",
      "CRM intégré avec pipeline de vente et scoring de leads",
      "870+ intégrations natives (Shopify, Salesforce, WordPress…)",
      "Délivrabilité excellente, réputation d'expéditeur solide",
      "Contenu conditionnel : emails personnalisés selon le profil abonné",
    ],
    inconvenients: [
      "Aucun plan gratuit, essai 14 jours seulement",
      "Courbe d'apprentissage importante, outil complexe à maîtriser",
      "Support uniquement en anglais pour les plans inférieurs",
      "Prix qui augmentent rapidement avec la taille de la liste",
    ],
    pays: "États-Unis",
    fondation: 2003,
    couleurBrand: "#356AE6",
  },

  sarbacane: {
    slug: "sarbacane",
    nom: "Sarbacane",
    logoUrl: "/logos/sarbacane.svg",
    descriptionCourte:
      "La solution emailing française premium pour les équipes marketing.",
    descriptionLongue:
      "Sarbacane est une entreprise française fondée en 2001 à Roubaix, pionnière de l'emailing en France. Elle propose une suite marketing complète incluant l'emailing, les SMS, le chat en direct (Sarbacane Chat), les landing pages et les formulaires. Positionnée sur le segment premium avec un accompagnement personnalisé, elle s'adresse principalement aux PME et ETI françaises qui privilégient la proximité avec un éditeur local, le support téléphonique et la conformité RGPD.",
    siteUrl: "https://www.sarbacane.com/",
    affiliateUrl: "https://www.sarbacane.com/partenaires",
    affiliateProgram: {
      commission: "15 % récurrent",
      type: "récurrent",
      dureeRecurrence: "12 mois",
      cookieDays: 60,
      lien: "https://www.sarbacane.com/partenaires",
    },
    noteGlobale: 4.1,
    prixDepart: 69,
    planGratuit: false,
    pricing: [
      {
        nom: "Starter",
        contacts: 2500,
        emailsMois: null,
        prixMois: 69,
        note: "Envois illimités, éditeur drag-and-drop, statistiques",
      },
      {
        nom: "Essential",
        contacts: 5000,
        emailsMois: null,
        prixMois: 129,
        note: "A/B testing, landing pages, formulaires avancés",
      },
      {
        nom: "Premium",
        contacts: 10000,
        emailsMois: null,
        prixMois: 229,
        note: "SMS, chat live, automation, support téléphonique prioritaire",
      },
      {
        nom: "Grand Compte",
        contacts: null,
        emailsMois: null,
        prixMois: null,
        note: "Sur devis, IP dédiée, onboarding dédié, SLA",
      },
    ],
    features: {
      automation: true,
      landingPages: true,
      sms: true,
      crmIntegre: false,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: true,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: true,
    },
    idealPour: ["tpe", "agence", "association", "ecommerce", "restauration", "artisan"],
    avantages: [
      "Éditeur français avec support téléphonique en français inclus",
      "Délivrabilité parmi les meilleures du marché français",
      "RGPD natif avec hébergement des données en France",
      "Accompagnement personnalisé et onboarding inclus",
      "Envois illimités dès le premier plan payant",
    ],
    inconvenients: [
      "Tarifs élevés par rapport aux solutions internationales équivalentes",
      "Pas de plan gratuit permanent",
      "CRM inexistant, nécessite une intégration tierce",
      "Moins d'intégrations natives que Mailchimp ou ActiveCampaign",
    ],
    pays: "France",
    fondation: 2001,
    couleurBrand: "#FF6B35",
  },

  mailjet: {
    slug: "mailjet",
    nom: "Mailjet",
    logoUrl: "/logos/mailjet.svg",
    descriptionCourte:
      "L'emailing transactionnel et marketing pour les équipes tech.",
    descriptionLongue:
      "Mailjet est une plateforme d'emailing fondée en 2010 à Paris, rachetée par Sinch en 2021. Elle se distingue par ses fonctionnalités orientées équipes : collaboration en temps réel sur les templates, rôles et permissions granulaires, et une API SMTP robuste appréciée des développeurs. Elle propose un plan gratuit de 6 000 emails/mois (200/jour) et se positionne sur les usages mixtes emailing marketing + transactionnel.",
    siteUrl: "https://www.mailjet.com/fr/",
    affiliateUrl: "https://www.mailjet.com/fr/partenaires/",
    affiliateProgram: {
      commission: "15 % récurrent",
      type: "récurrent",
      dureeRecurrence: "12 mois",
      cookieDays: 30,
      lien: "https://www.mailjet.com/fr/partenaires/",
    },
    noteGlobale: 4.0,
    prixDepart: 15,
    planGratuit: true,
    pricing: [
      {
        nom: "Gratuit",
        contacts: null,
        emailsMois: 6000,
        prixMois: 0,
        note: "200 emails/jour, contacts illimités, logo Mailjet",
      },
      {
        nom: "Essential",
        contacts: null,
        emailsMois: 15000,
        prixMois: 15,
        note: "Suppression logo, statistiques avancées, sous-comptes",
      },
      {
        nom: "Premium",
        contacts: null,
        emailsMois: 15000,
        prixMois: 25,
        note: "Automation, A/B testing, segmentation, collaboration temps réel",
      },
      {
        nom: "Custom",
        contacts: null,
        emailsMois: null,
        prixMois: null,
        note: "Sur devis, SLA, IP dédiée, support dédié",
      },
    ],
    features: {
      automation: true,
      landingPages: false,
      sms: true,
      crmIntegre: false,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: true,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: false,
    },
    idealPour: ["developpeur", "agence", "startup", "tpe", "ecommerce"],
    avantages: [
      "API SMTP très robuste, parfaite pour les envois transactionnels",
      "Collaboration en temps réel sur les templates (comme Google Docs)",
      "Hébergement européen, RGPD natif, support en français",
      "Contacts illimités sur tous les plans, facturation à l'envoi",
      "Sous-comptes et gestion multi-utilisateurs inclus dès Essential",
    ],
    inconvenients: [
      "Pas de landing pages intégrées",
      "Automation moins avancée que GetResponse ou ActiveCampaign",
      "Limite de 200 emails/jour sur le plan gratuit, très contraignante",
      "Rapports analytics basiques sur les plans inférieurs",
    ],
    pays: "France",
    fondation: 2010,
    couleurBrand: "#FF6600",
  },

  klaviyo: {
    slug: "klaviyo",
    nom: "Klaviyo",
    logoUrl: "/logos/klaviyo.svg",
    descriptionCourte:
      "Le spécialiste de l'emailing e-commerce avec une segmentation ultra-avancée.",
    descriptionLongue:
      "Klaviyo est la plateforme d'email et SMS marketing de référence pour le e-commerce, fondée en 2012 à Boston. Elle se distingue par ses intégrations natives Shopify et WooCommerce, sa segmentation comportementale avancée et ses flux d'automation pré-construits pour l'e-commerce (abandon de panier, post-achat, réengagement). Prisée des marques DTC (Direct-to-Consumer), elle centralise les données clients et permet de créer des campagnes ultra-personnalisées basées sur l'historique d'achat et le comportement de navigation.",
    siteUrl: "https://www.klaviyo.com/",
    affiliateUrl: "https://www.klaviyo.com/partners",
    affiliateProgram: {
      commission: "15 % récurrent",
      type: "récurrent",
      dureeRecurrence: "à vie",
      cookieDays: 90,
      lien: "https://www.klaviyo.com/partners",
    },
    noteGlobale: 4.4,
    prixDepart: 20,
    planGratuit: true,
    pricing: [
      {
        nom: "Gratuit",
        contacts: 250,
        emailsMois: 500,
        prixMois: 0,
        note: "250 contacts, 500 emails/mois, 150 SMS gratuits",
      },
      {
        nom: "Email",
        contacts: 500,
        emailsMois: null,
        prixMois: 20,
        note: "Envois illimités, A/B testing, segmentation avancée",
      },
      {
        nom: "Email + SMS",
        contacts: 500,
        emailsMois: null,
        prixMois: 35,
        note: "Email illimité + SMS marketing, rapports combinés",
      },
      {
        nom: "Enterprise",
        contacts: null,
        emailsMois: null,
        prixMois: null,
        note: "Sur devis, IP dédiée, CSM dédié, SLA",
      },
    ],
    features: {
      automation: true,
      landingPages: false,
      sms: true,
      crmIntegre: false,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: false,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: true,
    },
    idealPour: ["ecommerce", "startup"],
    avantages: [
      "Intégration native Shopify la plus avancée du marché, synchronisation temps réel",
      "Segmentation comportementale ultra-fine basée sur l'historique d'achat",
      "Flux e-commerce pré-construits : abandon panier, post-achat, win-back",
      "SMS et email dans la même plateforme avec reporting unifié",
      "Prédictions IA : valeur vie client, probabilité d'achat, churn",
    ],
    inconvenients: [
      "Tarifs parmi les plus élevés dès que la liste dépasse 1 000 contacts",
      "Courbe d'apprentissage importante, pas adapté aux débutants",
      "Pas de landing pages natives",
      "Support uniquement en anglais",
    ],
    pays: "États-Unis",
    fondation: 2012,
    couleurBrand: "#27AB6E",
  },

  omnisend: {
    slug: "omnisend",
    nom: "Omnisend",
    logoUrl: "/logos/omnisend.svg",
    descriptionCourte:
      "Emailing, SMS et push notifications pour booster votre boutique e-commerce.",
    descriptionLongue:
      "Omnisend est une plateforme marketing e-commerce fondée en 2014 à Vilnius (Lituanie). Elle propose l'email marketing, les SMS, les push notifications web et le marketing automation dans une interface unifiée, spécialement conçue pour les boutiques en ligne. Ses flux pré-construits pour e-commerce, son éditeur de formulaires pop-up et ses intégrations avec Shopify, WooCommerce et BigCommerce en font une alternative populaire à Klaviyo pour les PME e-commerce avec un budget plus serré.",
    siteUrl: "https://www.omnisend.com/",
    affiliateUrl: "https://www.omnisend.com/partners",
    affiliateProgram: {
      commission: "20 % récurrent",
      type: "récurrent",
      dureeRecurrence: "à vie",
      cookieDays: 90,
      lien: "https://www.omnisend.com/partners",
    },
    noteGlobale: 4.2,
    prixDepart: 16,
    planGratuit: true,
    pricing: [
      {
        nom: "Gratuit",
        contacts: 250,
        emailsMois: 500,
        prixMois: 0,
        note: "250 contacts, 500 emails/mois, push notifications illimitées",
      },
      {
        nom: "Standard",
        contacts: 500,
        emailsMois: 6000,
        prixMois: 16,
        note: "SMS inclus, automation avancée, segmentation",
      },
      {
        nom: "Pro",
        contacts: 2500,
        emailsMois: null,
        prixMois: 59,
        note: "Emails illimités, SMS avancé, rapports personnalisés",
      },
      {
        nom: "Enterprise",
        contacts: null,
        emailsMois: null,
        prixMois: null,
        note: "Sur devis, IP dédiée, account manager, SLA",
      },
    ],
    features: {
      automation: true,
      landingPages: false,
      sms: true,
      crmIntegre: false,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: false,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: true,
    },
    idealPour: ["ecommerce", "startup"],
    avantages: [
      "Plateforme tout-en-un email + SMS + push notifications pour e-commerce",
      "Flux d'automation e-commerce pré-construits prêts à l'emploi",
      "Intégrations natives Shopify, WooCommerce et BigCommerce",
      "Rapport qualité-prix meilleur que Klaviyo pour les petites boutiques",
      "Programme d'affiliation 20 % récurrent très compétitif",
    ],
    inconvenients: [
      "Pas de landing pages natives",
      "Segmentation moins fine que Klaviyo sur les grands volumes",
      "Support uniquement en anglais",
      "Moins d'intégrations tierces que Mailchimp ou ActiveCampaign",
    ],
    pays: "Lituanie",
    fondation: 2014,
    couleurBrand: "#0A3D91",
  },

  aweber: {
    slug: "aweber",
    nom: "AWeber",
    logoUrl: "/logos/aweber.svg",
    descriptionCourte:
      "Le vétéran de l'emailing : simple, fiable et avec une délivrabilité excellente.",
    descriptionLongue:
      "AWeber est l'une des premières plateformes d'email marketing, fondée en 1998 en Pennsylvanie. Pionnière des autorépondeurs, elle a bâti sa réputation sur une délivrabilité excellente, un support client disponible 24h/7j et une interface délibérément simple. Si elle a moins innové que ses concurrents, elle reste un choix solide pour les freelances, coachs et créateurs qui veulent un outil qui fonctionne sans complexité, avec un plan gratuit permanent généreux jusqu'à 500 contacts.",
    siteUrl: "https://www.aweber.com/",
    affiliateUrl: "https://www.aweber.com/affiliates.htm",
    affiliateProgram: {
      commission: "30 % récurrent à vie",
      type: "récurrent",
      dureeRecurrence: "à vie",
      cookieDays: 365,
      lien: "https://www.aweber.com/affiliates.htm",
    },
    noteGlobale: 3.9,
    prixDepart: 0,
    planGratuit: true,
    pricing: [
      {
        nom: "Gratuit",
        contacts: 500,
        emailsMois: 3000,
        prixMois: 0,
        note: "500 contacts, 3 000 emails/mois, 1 liste, automation basique",
      },
      {
        nom: "Lite",
        contacts: 500,
        emailsMois: null,
        prixMois: 12,
        note: "Envois illimités, suppression logo, 3 listes",
      },
      {
        nom: "Plus",
        contacts: 2500,
        emailsMois: null,
        prixMois: 20,
        note: "Listes illimitées, landing pages, split testing, analytics avancés",
      },
      {
        nom: "Unlimited",
        contacts: null,
        emailsMois: null,
        prixMois: 899,
        note: "Contacts et envois illimités, support prioritaire",
      },
    ],
    features: {
      automation: true,
      landingPages: true,
      sms: false,
      crmIntegre: false,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: false,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: false,
    },
    idealPour: ["freelance", "coach", "createur"],
    avantages: [
      "Délivrabilité excellente, parmi les meilleures du secteur depuis 25 ans",
      "Support 24h/7j par chat, email et téléphone inclus sur tous les plans",
      "Interface très simple, idéale pour les non-techniciens",
      "Plan gratuit généreux : 500 contacts, 3 000 emails/mois sans limite de durée",
      "Programme d'affiliation 30 % récurrent à vie",
    ],
    inconvenients: [
      "Interface et fonctionnalités vieillissantes comparées aux concurrents modernes",
      "Pas de SMS marketing intégré",
      "Automation moins puissante qu'ActiveCampaign ou GetResponse",
      "Support uniquement en anglais",
    ],
    pays: "États-Unis",
    fondation: 1998,
    couleurBrand: "#003087",
  },

  benchmark: {
    slug: "benchmark",
    nom: "Benchmark Email",
    logoUrl: "/logos/benchmark.svg",
    descriptionCourte:
      "L'emailing simple et abordable pour les TPE, associations et artisans.",
    descriptionLongue:
      "Benchmark Email est une plateforme d'email marketing fondée en 2004 en Californie. Elle se distingue par une interface particulièrement intuitive, des templates soignés et un positionnement tarifaire agressif avec un plan gratuit permanent. Sans prétendre à la puissance d'ActiveCampaign, elle offre l'essentiel pour les petites structures : campagnes, automation basique, formulaires et rapports clairs. Son bon rapport qualité-prix en fait un choix adapté aux TPE, associations et artisans qui démarrent l'emailing.",
    siteUrl: "https://www.benchmarkemail.com/",
    affiliateUrl: "https://www.benchmarkemail.com/partners",
    affiliateProgram: {
      commission: "25 % récurrent",
      type: "récurrent",
      dureeRecurrence: "à vie",
      cookieDays: 90,
      lien: "https://www.benchmarkemail.com/partners",
    },
    noteGlobale: 3.8,
    prixDepart: 0,
    planGratuit: true,
    pricing: [
      {
        nom: "Gratuit",
        contacts: 500,
        emailsMois: 3500,
        prixMois: 0,
        note: "500 contacts, 3 500 emails/mois, templates inclus",
      },
      {
        nom: "Pro",
        contacts: 500,
        emailsMois: null,
        prixMois: 13,
        note: "Envois illimités, suppression logo, automation, A/B testing",
      },
      {
        nom: "Business",
        contacts: 5000,
        emailsMois: null,
        prixMois: 43,
        note: "Contacts étendus, rapports avancés, API complète",
      },
      {
        nom: "Enterprise",
        contacts: null,
        emailsMois: null,
        prixMois: null,
        note: "Sur devis, IP dédiée, support prioritaire",
      },
    ],
    features: {
      automation: true,
      landingPages: false,
      sms: false,
      crmIntegre: false,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: false,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: false,
    },
    idealPour: ["tpe", "association", "artisan"],
    avantages: [
      "Interface parmi les plus simples du marché, prise en main immédiate",
      "Templates propres et modernes, nombreux secteurs d'activité couverts",
      "Plan gratuit sans limite de durée : 500 contacts, 3 500 emails/mois",
      "Bon rapport qualité-prix pour les petites structures avec peu d'abonnés",
    ],
    inconvenients: [
      "Pas de SMS marketing ni de landing pages natives",
      "Automation limitée comparée à GetResponse ou ActiveCampaign",
      "Rapports analytics basiques sur les plans inférieurs",
      "Moins d'intégrations natives que les leaders du marché",
    ],
    pays: "États-Unis",
    fondation: 2004,
    couleurBrand: "#FF5C35",
  },

  moosend: {
    slug: "moosend",
    nom: "Moosend",
    logoUrl: "/logos/moosend.svg",
    descriptionCourte:
      "L'outil emailing abordable avec une automation visuelle intuitive.",
    descriptionLongue:
      "Moosend est une plateforme d'email marketing fondée en 2011 à Londres. Elle propose une automation visuelle avancée, un éditeur drag-and-drop moderne, des landing pages et des formulaires, le tout à des tarifs très compétitifs. Rachetée par Sitecore en 2021, elle cible les PME et e-commerçants qui veulent la puissance d'ActiveCampaign à moitié prix. Son plan d'essai gratuit de 30 jours est généreux, mais elle ne propose pas de plan gratuit permanent.",
    siteUrl: "https://moosend.com/",
    affiliateUrl: "https://moosend.com/partner-program/",
    affiliateProgram: {
      commission: "30 à 40 % récurrent selon le volume",
      type: "récurrent",
      dureeRecurrence: "à vie",
      cookieDays: 90,
      lien: "https://moosend.com/partner-program/",
    },
    noteGlobale: 4.3,
    prixDepart: 9,
    planGratuit: false,
    pricing: [
      {
        nom: "Essai gratuit",
        contacts: null,
        emailsMois: null,
        prixMois: 0,
        note: "30 jours, toutes fonctionnalités, sans CB",
      },
      {
        nom: "Pro",
        contacts: 500,
        emailsMois: null,
        prixMois: 9,
        note: "Envois illimités, landing pages, automation, formulaires",
      },
      {
        nom: "Moosend+",
        contacts: null,
        emailsMois: null,
        prixMois: null,
        note: "Sur devis, add-ons à la carte (SMTP dédié, SSO, account manager)",
      },
      {
        nom: "Enterprise",
        contacts: null,
        emailsMois: null,
        prixMois: null,
        note: "Sur devis, SLA, IP dédiée, onboarding dédié",
      },
    ],
    features: {
      automation: true,
      landingPages: true,
      sms: false,
      crmIntegre: false,
      abTesting: true,
      templates: true,
      api: true,
      supportFrancais: false,
      rgpd: true,
      dragAndDrop: true,
      segmentation: true,
      rapportsAvances: true,
    },
    idealPour: ["ecommerce", "startup", "tpe", "agence", "freelance"],
    avantages: [
      "Automation visuelle avancée à un prix imbattable",
      "Envois illimités dès le plan Pro, quel que soit le volume",
      "Éditeur drag-and-drop moderne avec prédictions IA de produits e-commerce",
      "Rapports analytics détaillés avec heatmaps inclus",
      "Essai gratuit 30 jours sans carte bancaire",
    ],
    inconvenients: [
      "Pas de plan gratuit permanent (contrairement à MailerLite ou Brevo)",
      "Pas de SMS marketing intégré",
      "Support uniquement en anglais",
      "Moins d'intégrations natives que Mailchimp ou ActiveCampaign",
    ],
    pays: "Royaume-Uni",
    fondation: 2011,
    couleurBrand: "#8B5CF6",
  },
};

// ─── Aliases (redirections SEO ancien nom → slug actuel) ──────────────────────

export const TOOL_ALIASES: Record<string, string> = {
  sendinblue: "brevo",
  convertkit: "convertkit",
};

// ─── Utilitaires ──────────────────────────────────────────────────────────────

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS[slug];
}

export function getAllTools(): Tool[] {
  return Object.values(TOOLS);
}

export function getToolsForProfile(profileSlug: string): Tool[] {
  return Object.values(TOOLS).filter((tool) =>
    tool.idealPour.includes(profileSlug)
  );
}

export function getVsPageSlug(slugA: string, slugB: string): string {
  return [slugA, slugB].sort().join("-vs-");
}

// 22 paires les plus pertinentes SEO entre les 10 outils
export const VS_COMBINATIONS: [string, string][] = [
  ["brevo", "mailchimp"],
  ["brevo", "mailerlite"],
  ["brevo", "sarbacane"],
  ["brevo", "mailjet"],
  ["brevo", "getresponse"],
  ["brevo", "activecampaign"],
  ["brevo", "convertkit"],
  ["mailchimp", "mailerlite"],
  ["mailchimp", "getresponse"],
  ["mailchimp", "activecampaign"],
  ["mailchimp", "convertkit"],
  ["mailerlite", "getresponse"],
  ["mailerlite", "convertkit"],
  ["mailerlite", "moosend"],
  ["mailerlite", "activecampaign"],
  ["mailerlite", "systemeio"],
  ["getresponse", "activecampaign"],
  ["getresponse", "systemeio"],
  ["convertkit", "activecampaign"],
  ["systemeio", "mailchimp"],
  ["activecampaign", "moosend"],
  ["sarbacane", "mailjet"],
  // Klaviyo
  ["klaviyo", "mailchimp"],
  ["klaviyo", "omnisend"],
  ["klaviyo", "activecampaign"],
  ["klaviyo", "brevo"],
  // Omnisend
  ["omnisend", "mailchimp"],
  ["omnisend", "brevo"],
  // AWeber
  ["aweber", "mailchimp"],
  ["aweber", "mailerlite"],
  // Benchmark
  ["benchmark", "mailchimp"],
  ["benchmark", "mailerlite"],
  // Paires supplémentaires couverture complète
  ["klaviyo", "mailerlite"],
  ["klaviyo", "getresponse"],
  ["omnisend", "activecampaign"],
  ["aweber", "getresponse"],
  ["aweber", "convertkit"],
  ["benchmark", "brevo"],
  ["benchmark", "getresponse"],
];
