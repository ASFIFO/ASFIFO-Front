import type { Article, ContactMessage } from '../types';

export const initialArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Les meilleures pratiques du Webdesign éco-responsable en 2026',
    excerpt: 'Comment réduire l’empreinte carbone de vos applications web tout en offrant une expérience utilisateur fluide et performante.',
    content: `## Introduction
Le webdesign responsable n'est plus une option mais une nécessité stratégique pour les entreprises modernes. Avec l'accroissement continu des volumes de données transférées, l'impact environnemental du numérique devient préoccupant.

### Les 4 piliers de l'éco-conception web :
1. **Optimisation des médias** : Réduire le poids des images grâce au format AVIF ou WebP, et privilégier des icônes vectorielles.
2. **Minimalisme UI** : Limiter l'usage de vidéos en arrière-plan et de scripts tiers inutiles.
3. **Mise en cache efficace** : Tirer parti des Service Workers et du cache HTTP pour éviter de re-télécharger des actifs constants.
4. **Accessibilité et sobriété** : Adopter des palettes de couleurs adaptées et préserver un mode sombre économe en énergie OLED.

> "Réduire le poids d'une page de 2 Mo à 500 Ko divise par quatre son coût énergétique de transfert."

### En conclusion
En intégrant ces principes dès la phase de maquettage, vos applications gagnent en rapidité, en référencement naturel et apportent un bénéfice réel à vos utilisateurs.`,
    image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    tags: ['Design', 'Éco-conception', 'Performance', 'Web'],
    featured: true,
    is_published: true,
    created_at: '2026-07-20T10:30:00.000Z',
    updated_at: '2026-07-25T14:15:00.000Z',
    views: 428,
    author: 'Sophie Martin'
  },
  {
    id: 'art-2',
    title: 'Construire un Backoffice modulable avec React & Vite',
    excerpt: 'Découvrez l’architecture idéale pour développer des interfaces d’administration rapides, robustes et maintenables.',
    content: `## Pourquoi Vite et React pour vos interfaces d'administration ?
Pour développer des outils internes et des dashboards de gestion, la vitesse d'exécution et l'ergonomie sont cruciales.

### Avantages de cette combinaison :
* **Temps de démarrage instantané** grâce aux modules ES natifs.
* **Typage strict avec TypeScript** pour éviter les erreurs de données en production.
* **Tailwind CSS** pour maintenir une cohérence graphique parfaite sans fichier CSS complexe.

### Gestion de l'état local et persistance
En utilisant des contextes React combinés à la persistance \`localStorage\` ou des API REST/GraphQL, les administrateurs bénéficient d'une réactivité hors pair.`,
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Vite', 'Architecture', 'Backoffice'],
    featured: true,
    is_published: true,
    created_at: '2026-07-15T09:00:00.000Z',
    updated_at: '2026-07-15T09:00:00.000Z',
    views: 890,
    author: 'Alexandre Dubois'
  },
  {
    id: 'art-3',
    title: 'L’impact de l’Intelligence Artificielle sur la rédaction de contenus',
    excerpt: 'Analyse des synergies entre créativité humaine et génération d’idées assistée par IA pour les blogs d’entreprise.',
    content: `## L'IA au service des équipes éditoriales
Loin de remplacer la voix humaine, les outils d'IA permettent d'accélérer la recherche documentaire, d'optimiser le SEO et d'éliminer le syndrome de la page blanche.

### Utilisation optimale :
1. Recherche de sujets pertinents et structuration du plan.
2. Synthèse de documents volumineux.
3. Relecture orthographique et ajustement du ton.`,
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    tags: ['IA', 'Contenu', 'SEO', 'Rédaction'],
    featured: false,
    is_published: true,
    created_at: '2026-07-02T16:20:00.000Z',
    updated_at: '2026-07-05T11:00:00.000Z',
    views: 312,
    author: 'Camille Leroy'
  },
  {
    id: 'art-4',
    title: 'Guide d’intégration du RGPD pour les formulaires de contact',
    excerpt: 'Les obligations légales à respecter pour traiter en toute sécurité les données personnelles collectées via vos formulaires.',
    content: `## Le RGPD résumé pour les développeurs web
Toute collecte d'emails et de données de contact nécessite une information transparente et le consentement explicite de l'utilisateur.

### Les règles d'or :
- Consentement libre et éclairé (case à cocher non pré-cochée).
- Droit d'accès, de rectification et de suppression des données.
- Durée de conservation limitée (généralement 3 ans pour la prospection).`,
    image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    tags: ['RGPD', 'Sécurité', 'Formulaires', 'Légal'],
    featured: false,
    is_published: false,
    created_at: '2026-07-27T11:00:00.000Z',
    updated_at: '2026-07-27T11:00:00.000Z',
    views: 0,
    author: 'Sophie Martin'
  }
];

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Jean-Marc Bernard',
    email: 'jm.bernard@innov-tech.fr',
    subject: 'Demande de devis pour la refonte de notre portail client',
    message: 'Bonjour,\n\nNous avons consulté vos articles et nous souhaiterions obtenir un devis personnalisé pour la refonte complète de notre application web. Seriez-vous disponibles pour un premier échange visio cette semaine ?\n\nBien cordialement,\nJean-Marc Bernard',
    created_at: '2026-07-28T18:45:00.000Z',
    status: 'new'
  },
  {
    id: 'msg-2',
    name: 'Claire Vance',
    email: 'claire.vance@design-studio.com',
    subject: 'Proposition de partenariat éditorial & co-branding',
    message: 'Bonjour l’équipe,\n\nJe représente Design Studio. Nous serions ravis de rédiger un article invité sur l’éco-conception pour votre blog. Pourrions-nous échanger sur les modalités ?',
    created_at: '2026-07-28T14:10:00.000Z',
    status: 'new'
  },
  {
    id: 'msg-3',
    name: 'Thomas Morel',
    email: 't.morel@nexus-agency.io',
    subject: 'Question concernant l’accès API de votre plateforme',
    message: 'Bonjour,\n\nJ’ai lu votre dernier tutoriel sur l’intégration des Webhooks. Auriez-vous une documentation technique plus détaillée sur la gestion des rate limits ? Merci !',
    created_at: '2026-07-26T09:30:00.000Z',
    status: 'read'
  },
  {
    id: 'msg-4',
    name: 'Élodie Caron',
    email: 'elodie.caron@solutions-rh.fr',
    subject: 'Candidature spontanée - Chef de projet Digital',
    message: 'Bonjour,\n\nImpressionnée par la qualité de vos réalisations et votre ligne éditoriale, je vous transmets ma candidature pour un poste de chef de projet digital.\n\nVous trouverez mon CV ci-joint.',
    created_at: '2026-07-22T11:15:00.000Z',
    status: 'replied',
    reply_notes: 'Répondu le 23/07/2026 : Entretien RH planifié.',
    replied_at: '2026-07-23T10:00:00.000Z'
  },
  {
    id: 'msg-5',
    name: 'Laurent Petit',
    email: 'laurent.petit@gmail.com',
    subject: 'Signalement de lien cassé sur l’article #12',
    message: 'Bonjour, juste pour vous informer que le lien vers la documentation externe dans l’article sur les formulaires renvoie vers une erreur 404.',
    created_at: '2026-07-10T16:00:00.000Z',
    status: 'archived'
  }
];

export const sampleImagePresets = [
  { label: 'Technologie & Code', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Webdesign & Éco-conception', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Intelligence Artificielle', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Sécurité & RGPD', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Espace de travail & Bureau', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Stratégie & Analytics', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' }
];
