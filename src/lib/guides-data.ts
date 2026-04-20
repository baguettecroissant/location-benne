// Guides / Blog — Données des articles
// Chaque article est un guide expert SEO-optimisé pour dominer les SERPs

export interface GuideArticle {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    excerpt: string;
    image: string;
    imageAlt: string;
    category: 'guide-pratique' | 'reglementation' | 'prix' | 'dechets' | 'conseil-pro' | 'environnement';
    publishDate: string;
    updatedDate: string;
    readTime: number; // minutes
    tags: string[];
}

export const guidesCategories = {
    'guide-pratique': { label: 'Guides Pratiques', color: 'bg-amber-100 text-amber-700', icon: '📋' },
    'reglementation': { label: 'Réglementation', color: 'bg-red-100 text-red-700', icon: '⚖️' },
    'prix': { label: 'Prix & Tarifs', color: 'bg-green-100 text-green-700', icon: '💰' },
    'dechets': { label: 'Types de Déchets', color: 'bg-blue-100 text-blue-700', icon: '🗑️' },
    'conseil-pro': { label: 'Conseils Pro', color: 'bg-purple-100 text-purple-700', icon: '🔧' },
    'environnement': { label: 'Environnement', color: 'bg-emerald-100 text-emerald-700', icon: '🌍' },
};

export const guides: GuideArticle[] = [
    {
        slug: "comment-choisir-taille-benne",
        title: "Comment Choisir la Taille de sa Benne : Le Guide Complet (3m³ à 30m³)",
        metaTitle: "Comment Choisir la Taille de sa Benne ? Guide Complet 2026 (3m³ à 30m³)",
        metaDescription: "Quelle taille de benne choisir ? Guide expert avec tableau comparatif 3m³, 6m³, 10m³, 15m³, 20m³, 30m³. Estimation du volume par type de projet. Ne payez plus trop cher.",
        excerpt: "3m³, 6m³, 10m³, 20m³, 30m³ — comment ne pas se tromper de volume ? Tableau comparatif, estimation par projet, et la règle d'or qui vous fera économiser à coup sûr.",
        image: "/images/guides/comment-choisir-taille-benne.png",
        imageAlt: "Vue aérienne de 3 bennes de tailles différentes sur un chantier de rénovation",
        category: 'guide-pratique',
        publishDate: "2026-01-15",
        updatedDate: "2026-03-20",
        readTime: 12,
        tags: ["volume benne", "taille benne", "choisir benne", "guide"],
    },
    {
        slug: "prix-location-benne-guide-complet",
        title: "Prix Location de Benne en 2026 : Grille Tarifaire Complète par Type et Volume",
        metaTitle: "Prix Location de Benne 2026 : Tarifs Complets par Type & Volume",
        metaDescription: "Tous les prix de location de benne en 2026 : gravats, encombrants, déchets verts, DIB. Grille tarifaire de 129€ à 599€. Ce qui est inclus, les surcoûts cachés à éviter.",
        excerpt: "Combien coûte vraiment une benne ? Grille complète des tarifs 2026 par type de déchet et volume, avec les surcoûts cachés que personne ne vous dit.",
        image: "/images/guides/prix-location-benne-guide-complet.png",
        imageAlt: "Benne jaune sur un chantier avec billets et pièces d'euros symbolisant les tarifs",
        category: 'prix',
        publishDate: "2026-01-20",
        updatedDate: "2026-03-18",
        readTime: 15,
        tags: ["prix benne", "tarif location benne", "cout benne", "devis"],
    },
    {
        slug: "autorisation-voirie-benne-guide",
        title: "Autorisation de Voirie pour une Benne : Démarches, Délais et Prix par Commune",
        metaTitle: "Autorisation de Voirie Benne 2026 : Démarches, Délais & Prix",
        metaDescription: "Faut-il une autorisation pour poser une benne ? Oui, sur la voie publique. Délai 5 à 15 jours, prix 50 à 150€. Démarches mairie, documents, cas de terrain privé.",
        excerpt: "Pose d'une benne sur la voie publique = autorisation de voirie obligatoire. Voici les démarches exactes, les délais par taille de commune, et comment votre loueur peut s'en charger.",
        image: "/images/guides/autorisation-voirie-benne-guide.png",
        imageAlt: "Benne jaune avec cônes de signalisation posée devant une mairie française",
        category: 'reglementation',
        publishDate: "2026-02-01",
        updatedDate: "2026-03-15",
        readTime: 10,
        tags: ["autorisation voirie", "mairie", "reglementation benne", "permis"],
    },
    {
        slug: "tri-dechets-chantier-guide",
        title: "Tri des Déchets de Chantier : Guide Pratique du Décret 7 Flux pour les Pros",
        metaTitle: "Tri Déchets Chantier 2026 : Guide Décret 7 Flux (Obligations & Amendes)",
        metaDescription: "Comment trier les déchets de chantier selon le décret 7 flux ? 7 catégories obligatoires, seuil 1100L/semaine, amendes. Guide pro artisans et entreprises BTP.",
        excerpt: "Le décret 7 flux impose le tri de 7 catégories de déchets sur les chantiers. Qui est concerné, quels matériaux, quelles amendes ? Le guide complet pour les pros du BTP.",
        image: "/images/guides/tri-dechets-chantier-guide.png",
        imageAlt: "Bennes de tri colorées sur un chantier BTP : bois, gravats, végétaux, métaux",
        category: 'reglementation',
        publishDate: "2026-02-10",
        updatedDate: "2026-03-10",
        readTime: 14,
        tags: ["decret 7 flux", "tri chantier", "reglementation BTP", "dechets chantier"],
    },
    {
        slug: "evacuation-gravats-guide-complet",
        title: "Évacuation de Gravats : 5 Solutions Comparées (Benne, Déchetterie, Big Bag...)",
        metaTitle: "Évacuation de Gravats 2026 : 5 Solutions Comparées (Prix & Avantages)",
        metaDescription: "Comment évacuer ses gravats ? Comparatif complet : benne de location, déchetterie, big bag, sac à gravats, entreprise de débarras. Prix, avantages et inconvénients de chaque solution.",
        excerpt: "Benne, déchetterie, big bag, sac à gravats ou entreprise ? Comparatif complet des 5 solutions pour évacuer vos gravats avec les prix réels et les pièges à éviter.",
        image: "/images/guides/evacuation-gravats-guide-complet.png",
        imageAlt: "Intérieur de maison en rénovation avec gravats et benne jaune visible par la fenêtre",
        category: 'guide-pratique',
        publishDate: "2026-02-20",
        updatedDate: "2026-03-22",
        readTime: 13,
        tags: ["evacuation gravats", "big bag", "dechetterie", "gravats"],
    },
    {
        slug: "dechets-verts-reglementation-brulage",
        title: "Déchets Verts : Pourquoi le Brûlage est Interdit et Quelles Alternatives en 2026",
        metaTitle: "Brûlage Déchets Verts Interdit 2026 : Amende 450€ + 6 Alternatives Légales",
        metaDescription: "Le brûlage de déchets verts est interdit depuis 2011 (amende 450€). Découvrez les 6 alternatives légales : benne, compostage, broyage, déchetterie, ramassage communal.",
        excerpt: "Brûler ses déchets de jardin = 450€ d'amende. Même en zone rurale, c'est interdit. Voici les 6 alternatives légales pour s'en débarrasser efficacement et à moindre coût.",
        image: "/images/guides/dechets-verts-reglementation-brulage.png",
        imageAlt: "Jardin français en automne avec benne verte pour déchets verts et branches coupées",
        category: 'environnement',
        publishDate: "2026-03-01",
        updatedDate: "2026-03-24",
        readTime: 11,
        tags: ["brulage interdit", "dechets verts", "alternative", "compostage", "amende"],
    },
    {
        slug: "location-benne-demenagement",
        title: "Location de Benne pour Déménagement : Guide Complet",
        metaTitle: "Location de Benne pour Déménagement : Guide Complet 2026",
        metaDescription: "Benne pour déménagement : quel volume choisir, prix de 149€ à 449€, types de déchets acceptés et organisation étape par étape. Devis gratuit.",
        excerpt: "Un déménagement génère 3 à 20m³ de déchets. Découvrez comment choisir la bonne benne, organiser le tri et maîtriser votre budget d\u0027évacuation.",
        image: "/images/guides/location-benne-demenagement.png",
        imageAlt: "Benne jaune chargée de meubles et cartons devant une maison en cours de déménagement",
        category: 'guide-pratique',
        publishDate: "2026-03-25",
        updatedDate: "2026-03-25",
        readTime: 12,
        tags: ["benne déménagement", "location benne", "déménagement", "encombrants", "évacuation meubles"],
    },
    {
        slug: "location-benne-particulier-guide",
        title: "Location de Benne pour Particulier : Guide Pas à Pas",
        metaTitle: "Location de Benne pour Particulier : Guide Pas à Pas 2026",
        metaDescription: "Louez une benne en tant que particulier : démarches, choix du volume, prix de 129€ à 599€, erreurs à éviter. Guide étape par étape avec devis gratuit.",
        excerpt: "Rénovation, débarras ou jardinage : louer une benne quand on est particulier n\u0027est pas compliqué. Voici toutes les étapes, les prix réels et les pièges à éviter.",
        image: "/images/guides/location-benne-particulier-guide.png",
        imageAlt: "Particulière chargeant une benne jaune devant une maison française typique en pierre",
        category: 'guide-pratique',
        publishDate: "2026-04-05",
        updatedDate: "2026-04-05",
        readTime: 12,
        tags: ["location benne particulier", "benne particulier", "louer benne", "guide location benne", "déchets particulier"],
    },
    {
        slug: "dechetterie-ou-benne-comparatif",
        title: "Déchetterie ou Benne : Comparatif Complet pour Bien Choisir",
        metaTitle: "Déchetterie ou Benne ? Comparatif Complet 2026 (Prix & Avis)",
        metaDescription: "Déchetterie gratuite ou benne livrée chez vous ? Comparatif prix, volume, contraintes et gain de temps. Découvrez quelle solution choisir selon votre projet.",
        excerpt: "Déchetterie gratuite mais contraignante, benne pratique mais payante : le comparatif honnête pour choisir la meilleure solution selon votre volume et votre situation.",
        image: "/images/guides/dechetterie-ou-benne-comparatif.png",
        imageAlt: "Comparatif visuel entre une déchetterie municipale avec file de voitures et une benne jaune livrée devant une maison",
        category: 'guide-pratique',
        publishDate: "2026-04-05",
        updatedDate: "2026-04-05",
        readTime: 11,
        tags: ["déchetterie ou benne", "comparatif benne", "alternative déchetterie", "évacuation déchets", "location benne"],
    },
    {
        slug: "prix-location-benne-ile-de-france",
        title: "Prix Location Benne Île-de-France 2026 : Tarifs par Département (75, 77, 78, 91, 92, 93, 94, 95)",
        metaTitle: "Prix Location Benne Île-de-France 2026 : Tarifs Complets",
        metaDescription: "Tarifs location de benne en Île-de-France 2026 : Paris, Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne. De 199€ à 699€. Comparez et demandez un devis gratuit.",
        excerpt: "Les prix de location de benne en Île-de-France sont 15 à 30% plus élevés que la moyenne nationale. Grille tarifaire complète par département, surcoûts parisiens et astuces pour économiser.",
        image: "/images/guides/prix-location-benne-ile-de-france.png",
        imageAlt: "Benne jaune livrée par un camion-grue dans une rue parisienne avec immeubles haussmanniens",
        category: 'prix',
        publishDate: "2026-04-12",
        updatedDate: "2026-04-12",
        readTime: 13,
        tags: ["prix benne Île-de-France", "location benne Paris", "tarif benne 92", "benne 93", "benne IDF"],
    },
    {
        slug: "location-benne-zone-rurale",
        title: "Location de Benne en Zone Rurale : Prix, Délais et Solutions Adaptées",
        metaTitle: "Location de Benne en Zone Rurale : Prix & Délais 2026",
        metaDescription: "Louer une benne en zone rurale : surcoût de 20 à 40%, délais allongés, alternatives. Prix réels 2026, astuces pour économiser et comparatif des solutions.",
        excerpt: "En zone rurale, la location de benne coûte 20 à 40% plus cher qu\u0027en ville. Découvrez les prix réels 2026, les délais de livraison et les astuces pour maîtriser votre budget.",
        image: "/images/guides/location-benne-zone-rurale.png",
        imageAlt: "Camion-benne livrant une benne jaune sur un chemin de campagne française avec village et champs en arrière-plan",
        category: 'guide-pratique',
        publishDate: "2026-04-20",
        updatedDate: "2026-04-20",
        readTime: 13,
        tags: ["benne zone rurale", "location benne campagne", "prix benne rural", "délai benne", "benne isolée"],
    },
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
    return guides.find(g => g.slug === slug);
}

export function getRelatedGuides(currentSlug: string, limit: number = 3): GuideArticle[] {
    const current = getGuideBySlug(currentSlug);
    if (!current) return guides.filter(g => g.slug !== currentSlug).slice(0, limit);
    
    // Prioritize same category, then other categories
    const sameCategory = guides.filter(g => g.slug !== currentSlug && g.category === current.category);
    const otherCategory = guides.filter(g => g.slug !== currentSlug && g.category !== current.category);
    return [...sameCategory, ...otherCategory].slice(0, limit);
}
