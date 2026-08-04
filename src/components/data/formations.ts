
export const whatsappImages = [
  new URL('../../assets/WhatsApp Image 2026-08-03 at 10.12.34 (1).jpeg', import.meta.url).href,
  new URL('../../assets/WhatsApp Image 2026-08-03 at 10.12.34.jpeg', import.meta.url).href,
  new URL('../../assets/WhatsApp Image 2026-08-03 at 10.12.35.jpeg', import.meta.url).href,
  new URL('../../assets/WhatsApp Image 2026-08-03 at 10.12.50 (1).jpeg', import.meta.url).href,
  new URL('../../assets/WhatsApp Image 2026-08-03 at 10.12.50.jpeg', import.meta.url).href,
  new URL('../../assets/WhatsApp Image 2026-08-03 at 10.12.51 (2).jpeg', import.meta.url).href,
  new URL('../../assets/WhatsApp Image 2026-07-28 at 08.42.24.jpeg', import.meta.url).href,
]


export interface Formation {
  id: string
  title: string
  description: string
  duration: string
  level: string
  category: string
  image?: string
  features: string[]
}

export const formations: Formation[] = [
  {
    id: 'dcg',
    title: 'Diplôme de Comptabilité et de Gestion (DCG)',
    description: 'Formation complète préparant au Diplôme de Comptabilité et de Gestion, reconnu par l\'État français. Développez vos compétences en comptabilité, gestion et droit.',
    duration: '3 ans',
    level: 'Bac+3',
    category: 'Diplôme',
    image: whatsappImages[1],
    features: ['Comptabilité générale', 'Gestion financière', 'Droit des sociétés', 'Économie'],
  },
  {
    id: 'dscg',
    title: 'Diplôme Supérieur de Comptabilité et de Gestion (DSCG)',
    description: 'Formation avancée pour les professionnels souhaitant obtenir le DSCG. Approfondissez vos connaissances en audit, fiscalité et management.',
    duration: '2 ans',
    level: 'Bac+5',
    category: 'Diplôme',
    image: whatsappImages[3],
    features: ['Audit et contrôle', 'Fiscalité avancée', 'Management', 'Stratégie financière'],
  },
  {
    id: 'expertise-comptable',
    title: 'Préparation à l\'Examen d\'Expertise Comptable',
    description: 'Préparation intensive au passage de l\'examen d\'expertise comptable, avec encadrement personnalisé par des professionnels expérimentés.',
    duration: '1 an',
    level: 'Bac+8',
    category: 'Certification',
    image: whatsappImages[2],
    features: ['Droit fiscal avancé', 'Expertise comptable', 'Évaluation d\'entreprise', 'Communication professionnelle'],
  },
  {
    id: 'comptabilite-pratique',
    title: 'Comptabilité Pratique et Sage',
    description: 'Formation pratique en comptabilité pour les professionnels en activité. Maîtrisez les outils et procédures comptables au quotidien.',
    duration: '6 mois',
    level: 'Professionnel',
    category: 'Formation continue',
    image: whatsappImages[4],
    features: ['Logiciels comptables', 'Paie et déclarations', 'Trésorerie', 'Reporting'],
  },
  {
    id: 'fiscalite',
    title: 'Fiscalité et Optimisation',
    description: 'Formation spécialisée en fiscalité malgache et internationale. Apprenez les stratégies d\'optimisation fiscale légales et efficaces.',
    duration: '3 mois',
    level: 'Avancé',
    category: 'Formation continue',
    image: whatsappImages[0],
    features: ['Impôt sur les sociétés', 'TVA', 'Fiscalité internationale', 'Optimisation fiscale'],
  },
  {
    id: 'management',
    title: 'Management et Leadership',
    description: 'Développez vos compétences managériales pour piloter efficacement votre structure. Leadership, communication et gestion d\'équipe.',
    duration: '4 mois',
    level: 'Intermédiaire',
    category: 'Management',
    image: whatsappImages[5],
    features: ['Leadership', 'Gestion d\'équipe', 'Communication', 'Stratégie'],
  },
]

// Color mapping per category for visual differentiation
export const categoryColors: Record<string, { gradient: string; dot: string; badge: string }> = {
  'Diplôme': {
    gradient: 'from-primary-900 via-primary-800 to-primary-900',
    dot: 'bg-accent-500',
    badge: 'accent',
  },
  'Certification': {
    gradient: 'from-warm-600 via-warm-700 to-warm-800',
    dot: 'bg-warm-400',
    badge: 'warm',
  },
  'Formation continue': {
    gradient: 'from-cool-600 via-cool-700 to-cool-800',
    dot: 'bg-cool-400',
    badge: 'cool',
  },
  'Management': {
    gradient: 'from-primary-800 via-accent-800 to-primary-800',
    dot: 'bg-accent-400',
    badge: 'accent',
  },
}
