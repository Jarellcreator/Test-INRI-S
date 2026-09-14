/**
 * Source unique des formations.
 *
 * Chaque entrée génère automatiquement :
 *   - une carte sur la page d'accueil ;
 *   - une page complète à l'adresse /formations/<slug>/ ;
 *   - une entrée dans le menu du pied de page.
 *
 * Ajouter une formation = ajouter un objet ici. Rien d'autre à toucher.
 */
export const formations = [
  {
    slug: 'permis-b-accelere',
    titre: 'Permis B accéléré',
    titreCourt: 'Permis B accéléré',
    accroche: 'Le parcours signature INRI’S',
    description:
      'Le parcours signature INRI’S : code et conduite condensés sur une période courte, sans perte de rythme.',
    points: [
      'Obtention en 1 à 4 semaines',
      'Moniteur dédié et véhicule fourni',
      'Date d’examen réservée en amont',
    ],
    etiquette: { texte: 'Le plus demandé', style: 'phare' },
    duree: '1 à 4 semaines',
    icone: '<path d="M5 17h14M5 17a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0m18 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0M3 17v-4l2-5a2 2 0 0 1 2-1.4h10A2 2 0 0 1 19 8l2 5v4"/><path d="M5 13h14"/>',
  },
  {
    slug: 'permis-moto',
    titre: 'Permis moto — A1, A2, A',
    titreCourt: 'Permis moto',
    accroche: 'Plateau et circulation en stage intensif',
    description:
      'Plateau et circulation en stage intensif, avec un encadrement spécialisé deux-roues du premier au dernier jour.',
    points: [
      'Plateau et circulation intégrés',
      'Équipement de sécurité prêté',
      'Passerelle A2 → A disponible',
    ],
    etiquette: null,
    duree: null,
    icone: '<circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="M8 17h6l3-6h-4l-2-3H8"/><path d="M13 8h4"/>',
  },
  {
    slug: 'groupe-lourd',
    titre: 'Groupe lourd — C, CE, D',
    titreCourt: 'Groupe lourd',
    accroche: 'Accéder aux métiers de la conduite',
    description:
      'Formations professionnelles pour accéder aux métiers de la conduite : transport de marchandises et de voyageurs.',
    points: [
      'Parcours professionnalisant',
      'Accompagnement au financement',
      'Débouchés métiers concrets',
    ],
    etiquette: { texte: 'Reconversion', style: 'secondaire' },
    duree: null,
    icone: '<path d="M2 16V7h11v9"/><path d="M13 10h4l4 4v2h-8"/><circle cx="6.5" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
  },
  {
    slug: 'permis-bateau',
    titre: 'Permis bateau',
    titreCourt: 'Permis bateau',
    accroche: 'Côtier ou fluvial, en stage court',
    description:
      'Côtier ou fluvial, en stage court : théorie encadrée et navigation pratique pour partir l’esprit tranquille.',
    points: [
      'Options côtier et fluvial',
      'Théorie + navigation pratique',
      'Formule week-end possible',
    ],
    etiquette: null,
    duree: null,
    icone: '<path d="M3 18c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0"/><path d="M5 14 6.5 8h11L19 14"/><path d="M12 8V4"/>',
  },
  {
    slug: 'recuperation-de-points',
    titre: 'Récupération de points',
    titreCourt: 'Récupération de points',
    accroche: 'Stage agréé de sensibilisation',
    description:
      'Stage agréé de sensibilisation à la sécurité routière : jusqu’à 4 points récupérés en deux journées.',
    points: [
      'Stage agréé par la préfecture',
      '2 jours, sans examen',
      'Sessions dans toute la France',
    ],
    etiquette: null,
    duree: '2 jours',
    icone: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>',
  },
  {
    slug: 'boite-automatique',
    titre: 'Boîte automatique',
    titreCourt: 'Boîte automatique',
    accroche: 'Un apprentissage simplifié',
    description:
      'Un apprentissage simplifié, idéal pour aller vite ou reprendre confiance au volant, avec passerelle vers la boîte manuelle.',
    points: [
      'Volume d’heures réduit',
      'Idéal conduite en ville',
      'Passerelle vers la boîte manuelle',
    ],
    etiquette: null,
    duree: null,
    icone: '<path d="M12 3 2 8l10 5 10-5Z"/><path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5"/>',
  },
];

export const parSlug = (slug) => formations.find((f) => f.slug === slug);
