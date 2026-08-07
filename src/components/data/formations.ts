
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
    id: 'metier-comptable',
    title: 'Formation Métier Comptable (Simple ou Alternance)',
    description: 'Formation intensive de 420 heures sur 3 mois axée sur la pratique : comptabilité générale, enregistrements des opérations, déclarations fiscales et sociales, français professionnel et logiciels spécialisés (Sage, Paie, Excel).',
    duration: '3 mois (420h)',
    level: 'Bacc+2/3 ou VAP',
    category: 'Métier & Certification',
    image: whatsappImages[1],
    features: ['Comptabilité générale & PCG', 'Fiscalité & Paie', 'Logiciels Sage & Excel', 'Français professionnel', 'Stage en entreprise'],
  },
  {
    id: 'parcours-dirigeants',
    title: 'Parcours Dirigeants et Cadres d\'Entreprise',
    description: 'Programme sur-mesure à la carte visant la performance globale du leader : coaching individuel, management stratégique, communication et pilotage de la rentabilité économique.',
    duration: 'À la carte (3 à 12 mois)',
    level: 'Dirigeants & Cadres',
    category: 'Management & Dirigeants',
    image: whatsappImages[5],
    features: ['Coaching individuel', 'Management & Leadership', 'Communication professionnelle', 'Gestion des risques & fiscalité'],
  },
  {
    id: 'audit-interne',
    title: 'Audit Interne et Contrôle de Gestion',
    description: 'Maîtrisez la démarche et les outils de l\'auditeur interne pour évaluer efficacement le dispositif de contrôle interne et élaborer des rapports d\'audit à forte valeur ajoutée.',
    duration: '3 mois',
    level: 'Cadres & Auditeurs',
    category: 'Audit & Contrôle',
    image: whatsappImages[0],
    features: ['Démarche d\'audit interne', 'Évaluation du contrôle interne', 'Questionnaires d\'audit', 'Rédaction de comptes rendus'],
  },
  {
    id: 'audit-comptable',
    title: 'Audit Comptable et Financier',
    description: 'Fiabilisez les états financiers et maîtrisez le contrôle des risques. Formation pratique pour effectuer la révision des comptes et formuler des conclusions constructives.',
    duration: '3 mois',
    level: 'Professionnel',
    category: 'Audit & Contrôle',
    image: whatsappImages[3],
    features: ['Révision des comptes', 'Maîtrise des risques financiers', 'États financiers & Bilan', 'Rapports d\'audit financier'],
  },
  {
    id: 'initiation-entrepreneuriat',
    title: 'Initiation à l\'Entrepreneuriat & Montage de Projet',
    description: 'Accompagnement de l\'idée de projet au Business Plan. Révélez votre potentiel entrepreneurial pour créer et financer votre entreprise.',
    duration: '6 à 10 mois',
    level: 'Licence / Master',
    category: 'Entrepreneuriat',
    image: whatsappImages[4],
    features: ['Culture entrepreneuriale', 'Élaboration du Business Plan', 'Montage financier', 'Présentation aux investisseurs'],
  },
]

// Color mapping per category for visual differentiation
export const categoryColors: Record<string, { gradient: string; dot: string; badge: string }> = {
  'Métier & Certification': {
    gradient: 'from-primary-900 via-primary-800 to-primary-900',
    dot: 'bg-accent-500',
    badge: 'accent',
  },
  'Management & Dirigeants': {
    gradient: 'from-primary-800 via-accent-800 to-primary-800',
    dot: 'bg-accent-400',
    badge: 'accent',
  },
  'Audit & Contrôle': {
    gradient: 'from-warm-600 via-warm-700 to-warm-800',
    dot: 'bg-warm-400',
    badge: 'warm',
  },
  'Entrepreneuriat': {
    gradient: 'from-cool-600 via-cool-700 to-cool-800',
    dot: 'bg-cool-400',
    badge: 'cool',
  },
}

