// Population tiers — 5 niveaux avec contenu adapté par catégorie
// XS (<2000), S (2000-10000), M (10000-50000), L (50000-200000), XL (>200000)

export type PopTier = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface PopTierContent {
    tier: PopTier;
    label: string;
    intro_gravats: string;
    intro_encombrants: string;
    intro_dechets_verts: string;
    intro_dib: string;
    cas_usage_gravats: string;
    cas_usage_encombrants: string;
    cas_usage_dechets_verts: string;
    cas_usage_dib: string;
    conseil_pratique: string;
    logistique: string;
}

export function getPopTier(population?: number): PopTier {
    // population=0 means data missing — default to 'S' (safer assumption)
    if (population === undefined || population === null) return 'S';
    if (population === 0) return 'S';
    if (population < 2000) return 'XS';
    if (population < 10000) return 'S';
    if (population < 50000) return 'M';
    if (population < 200000) return 'L';
    return 'XL';
}

export const populationTiers: Record<PopTier, PopTierContent> = {
    XS: {
        tier: 'XS',
        label: 'commune rurale',
        intro_gravats: "Dans les communes rurales comme la vôtre, les travaux de rénovation de maisons anciennes, de granges et de murs en pierre représentent la majorité des besoins en benne à gravats. La déchetterie la plus proche étant souvent à 15-30 km, la location d'une benne livrée directement sur votre chantier est nettement plus économique et pratique que les allers-retours en utilitaire.",
        intro_encombrants: "Dans les petites communes rurales, les successions et les vidages de maisons de famille sont les premières raisons de louer une benne encombrants. Ces propriétés, souvent habitées depuis plusieurs générations, contiennent un volume de mobilier et d'objets divers qui dépasse rapidement la capacité de n'importe quel véhicule personnel. Une benne 20m³ est souvent nécessaire pour un vidage complet.",
        intro_dechets_verts: "En milieu rural, les terrains sont généralement plus grands et plus boisés, générant des volumes importants de déchets verts lors de l'entretien des haies, l'élagage des arbres ou le défrichage de parcelles. La déchetterie étant souvent éloignée, la benne livrée à domicile est la solution la plus pratique et la plus économique pour les gros volumes.",
        intro_dib: "Dans les communes rurales, les artisans et exploitants agricoles sont les principaux utilisateurs de bennes DIB. Les travaux de rénovation de bâtiments agricoles, les débarras de hangars ou le remplacement de toitures en fibrociment (hors amiante) génèrent des volumes importants de déchets mélangés nécessitant une benne adaptée.",
        cas_usage_gravats: "Les travaux les plus fréquents sont la rénovation de murs en pierre, la reprise de fondations de maisons anciennes, le remplacement de chapes de garage ou d'étable, et la démolition de dépendances (appentis, murets, anciens fours à pain).",
        cas_usage_encombrants: "Les situations les plus courantes : succession et vidage de maison familiale, débarras d'un grenier ou d'une grange, préparation d'une vente immobilière, ou remplacement complet du mobilier lors d'une rénovation.",
        cas_usage_dechets_verts: "Les projets typiques : défrichage d'une parcelle abandonnée, élagage massif d'arbres matures, taille de haies bocagères, nettoyage après tempête, ou remise en état d'un terrain non entretenu depuis plusieurs années.",
        cas_usage_dib: "Les chantiers courants : rénovation de toiture (hors amiante), remplacement de menuiseries, isolation par l'extérieur, débarras d'atelier ou de hangar agricole, ou démontage de structures légères (abris de jardin, clôtures).",
        conseil_pratique: "Vérifiez que le chemin d'accès à votre propriété est suffisamment large (minimum 3m) et portant pour un camion ampliroll (environ 15 tonnes). Les chemins en terre peuvent devenir impraticables par temps de pluie. Prévoyez un espace de dépose plat et stable, idéalement sur une surface bétonnée ou empierrée.",
        logistique: "Le délai de livraison est généralement de 48 à 72h dans les communes rurales. Prévoyez de regrouper vos besoins en une seule rotation pour optimiser le coût de transport, qui représente une part plus importante du tarif en zone rurale."
    },
    S: {
        tier: 'S',
        label: 'bourg ou petite ville',
        intro_gravats: "Dans les bourgs et petites villes, les chantiers de rénovation de centres-bourg, la construction de lotissements périphériques et les travaux d'aménagement privé alimentent une demande régulière de bennes à gravats. La proximité d'un centre de traitement des inertes rend les tarifs généralement compétitifs dans cette catégorie de communes.",
        intro_encombrants: "Les petites villes et bourgs actifs voient un flux constant de déménagements, de rénovations de logements locatifs et de mise aux normes de commerces. Les bennes encombrants de 10 à 15m³ sont les plus demandées pour les débarras de pavillons et d'appartements. La proximité des déchetteries communales est un atout, mais celles-ci imposent souvent des limites de volume qui rendent la benne plus pratique pour les gros projets.",
        intro_dechets_verts: "Dans les petites villes, les zones pavillonnaires avec jardins de 200 à 800m² constituent la majorité de la demande en bennes déchets verts. Les entretiens de printemps (première tonte, taille de haies) et d'automne (feuilles, préparation hivernale) sont les deux pics de demande. Les espaces verts communaux et les cimetières sont également des utilisateurs réguliers.",
        intro_dib: "Les petites villes abritent souvent des zones artisanales où menuisiers, plombiers, électriciens et maçons produisent des DIB au quotidien. La mutualisation d'une benne entre artisans voisins est une pratique courante et économique dans ces zones d'activité. Les remises à neuf de locaux commerciaux en centre-bourg génèrent également des besoins ponctuels.",
        cas_usage_gravats: "Les travaux les plus fréquents : rénovation de façade en centre-bourg, démolition d'annexe pour densification, création de terrasses et allées, reprise de fondations sur maisons anciennes, et travaux de voirie communale.",
        cas_usage_encombrants: "Les situations les plus courantes : déménagement de pavillon, renouvellement de cuisine ou salle de bain, vidage d'un bien locatif entre deux locataires, débarras de cave ou de garage, et fermeture de commerce.",
        cas_usage_dechets_verts: "Les projets typiques : taille de haies mitoyennes (thuyas, lauriers, charmilles), tonte d'un grand jardin, élagage d'arbres d'ornement, arrachage de souches, et nettoyage de terrain après les feuilles d'automne.",
        cas_usage_dib: "Les chantiers courants : rénovation intérieure complète d'un pavillon, changement de fenêtres et volets, pose d'isolation intérieure, remplacement de plomberie, et réaménagement de local commercial.",
        conseil_pratique: "Dans les bourgs, la benne est souvent posée sur la voie publique devant la maison. Rapprochez-vous de votre mairie pour vérifier si une autorisation est nécessaire. Dans la plupart des communes de moins de 10 000 habitants, la procédure est simplifiée et le délai réduit à quelques jours.",
        logistique: "Le délai de livraison standard est de 24 à 48h. Les loueurs couvrent généralement un rayon de 30 à 50 km autour de leur dépôt. Vérifiez que votre commune est bien dans la zone de desserte pour éviter un surcoût de transport."
    },
    M: {
        tier: 'M',
        label: 'ville moyenne',
        intro_gravats: "Dans les villes moyennes, l'activité de construction et de rénovation est soutenue tout au long de l'année. Les programmes immobiliers neufs côtoient la rénovation thermique du parc existant, générant un flux continu de gravats. La concurrence entre loueurs est généralement plus forte qu'en zone rurale, ce qui maintient des tarifs compétitifs. Plusieurs options de bennes sont disponibles, du 3m³ pour un petit chantier au 10m³ pour une démolition.",
        intro_encombrants: "Les villes moyennes connaissent un marché immobilier actif où les rotations de locataires et les ventes immobilières sont fréquentes. Les débarras d'appartements avant mise en vente, les renouvellements de mobilier de résidences et les nettoyages de caves d'immeuble constituent les principales demandes. L'avantage : les loueurs locaux sont bien équipés et les délais de livraison courts (24h en général).",
        intro_dechets_verts: "Les villes moyennes combinent des quartiers pavillonnaires aux jardins de taille moyenne et des espaces verts publics importants. La collecte municipale des déchets verts, quand elle existe, est souvent limitée en volume (quelques sacs par passage). Pour les tailles de haies, les élagages importants ou les nettoyages de terrain, la benne reste la solution la plus efficace et rapide.",
        intro_dib: "Les zones d'activité économique des villes moyennes regroupent artisans, commerces et PME qui produisent des DIB au quotidien. La rénovation de centres commerciaux, la fermeture de boutiques et les chantiers de bureaux créent des besoins ponctuels mais importants. Les loueurs locaux proposent souvent des contrats d'enlèvement régulier pour les professionnels.",
        cas_usage_gravats: "Les travaux les plus fréquents : rénovation complète d'un appartement en centre-ville, démolition de cloisons pour créer un espace ouvert, remplacement de carrelage dans une maison, ravalement de façade d'immeuble, et création de piscine ou extension de maison.",
        cas_usage_encombrants: "Les situations les plus courantes : vidage d'appartement pour mise en location, déménagement avec renouvellement complet du mobilier, débarras après succession, et nettoyage de cave ou cellier d'immeuble.",
        cas_usage_dechets_verts: "Les projets typiques : remise en état d'un jardin de pavillon, taille de haies de clôture, élagage d'arbres devenus trop grands pour le terrain, nettoyage après tempête, et suppression de végétation envahissante.",
        cas_usage_dib: "Les chantiers courants : rénovation de local commercial, mise aux normes d'un ERP, réhabilitation d'un entrepôt, déconstruction sélective d'un bâtiment, et remplacement de cloisons et faux plafonds de bureaux.",
        conseil_pratique: "Dans les villes moyennes, la pose de benne sur la voie publique nécessite une autorisation d'occupation que votre loueur peut vous aider à obtenir. Le délai est de 5 à 10 jours ouvrés. Prévoyez 4 cônes de signalisation et un éclairage si la benne est située près d'une voie de circulation.",
        logistique: "Livraison sous 24h dans la plupart des cas. Plusieurs loueurs sont généralement en concurrence, ce qui vous permet de comparer les devis. Demandez systématiquement si le prix inclut la location (nombre de jours), le transport aller-retour et le traitement des déchets."
    },
    L: {
        tier: 'L',
        label: 'grande ville',
        intro_gravats: "Dans les grandes villes, les chantiers de rénovation d'immeubles, les programmes de densification urbaine et les opérations de réhabilitation de quartiers anciens génèrent des volumes très importants de gravats. Les contraintes urbanistiques (réglementation voirie, horaires de livraison, stationnement) impactent l'organisation logistique. Les tarifs sont 8 à 15% plus élevés qu'en zone rurale, reflétant les coûts d'exploitation urbains plus importants.",
        intro_encombrants: "Les grandes villes concentrent une forte demande de bennes encombrants, tirée par un marché immobilier dynamique et un taux de rotation des logements élevé. Les gestionnaires d'immeubles, syndics de copropriété et agences immobilières sont des commanditaires fréquents. Les bennes 3m³ et 6m³ sont privilégiées en centre-ville pour des raisons d'encombrement, tandis que les 20-30m³ sont utilisées en périphérie.",
        intro_dechets_verts: "Dans les grandes villes, les espaces verts des copropriétés, les parcs privés et les jardins de maisons de ville génèrent une demande régulière de bennes déchets verts. Les entreprises d'espaces verts et les paysagistes sont des utilisateurs réguliers. La collecte municipale est souvent insuffisante pour les gros volumes (élagage d'arbre, abattage, refonte de jardin) qui nécessitent une benne dédiée.",
        intro_dib: "Les grandes villes sont le terrain de prédilection des chantiers professionnels produisant des DIB en quantité : rénovation de bureaux, transformation de locaux commerciaux, mise aux normes de bâtiments publics. La réglementation sur le tri des déchets de chantier (décret 7 flux) est strictement contrôlée. Le bordereau de suivi des déchets (BSD) est obligatoire pour tout chantier produisant plus de 1 100 litres de déchets par semaine.",
        cas_usage_gravats: "Les travaux les plus fréquents : ravalement de façade d'immeuble, démolition de cloisons en béton, reprise de fondations, surélévation d'immeuble, démolition partielle pour programme neuf, et création de parkings souterrains.",
        cas_usage_encombrants: "Les situations les plus courantes : vidage d'appartement haussmannien, débarras de cave d'immeuble, nettoyage de local commercial après fermeture, renouvellement de mobilier de bureau, et vidage complet avant travaux de rénovation lourde.",
        cas_usage_dechets_verts: "Les projets typiques : élagage d'arbres en cour d'immeuble, refonte de jardin de maison de ville, entretien de parc de copropriété, abattage d'arbre dangereux, et nettoyage de toiture végétalisée.",
        cas_usage_dib: "Les chantiers courants : rénovation complète de plateau de bureau, mise aux normes d'un commerce en rez-de-chaussée, désamiantage (évacuation DIB associés), reconversion de local d'activité, et chantier de promotion immobilière multi-lots.",
        conseil_pratique: "En grande ville, un arrêté de voirie ou un permis de stationnement est obligatoire pour poser une benne sur la voie publique. Le délai d'obtention est de 8 à 15 jours ouvrés. Votre loueur peut souvent gérer cette démarche à votre place moyennant un supplément de 50 à 100€. Attention aux restrictions de circulation qui peuvent limiter les créneaux de livraison (souvent tôt le matin, 6h-9h).",
        logistique: "Livraison sous 24h, parfois dans la journée. Les loueurs en grande ville disposent de flottes importantes et de multiples tailles de bennes. Comparez au moins 3 devis. En centre-ville, vérifiez la hauteur de passage (porche d'immeuble) et la largeur de la rue (un camion ampliroll mesure 2,55m de large et 10m de long)."
    },
    XL: {
        tier: 'XL',
        label: 'métropole',
        intro_gravats: "Dans les métropoles, l'activité de construction et de démolition atteint son intensité maximale. Les programmes de renouvellement urbain, les grands projets d'infrastructure et la réhabilitation du parc immobilier ancien génèrent des centaines de milliers de tonnes de gravats chaque année. Les tarifs de location de bennes sont les plus élevés de France (10 à 20% au-dessus de la moyenne nationale) en raison de la forte demande, des contraintes logistiques et des réglementations strictes.",
        intro_encombrants: "Les métropoles concentrent la plus forte demande de bennes encombrants du pays, portée par une mobilité résidentielle intense (plus de 10% de la population déménage chaque année). Les services de collecte municipale des encombrants, bien que développés, sont saturés avec des délais d'attente de plusieurs semaines. La benne privée reste la solution la plus rapide et la plus flexible pour les volumes importants (débarras complet, fin de bail commercial, vidage de cave de copropriété).",
        intro_dechets_verts: "Même dans les métropoles, les espaces verts existent : parcs de copropriété, jardins de maisons en périphérie, terrasses plantées. Les paysagistes et entreprises d'espaces verts qui opèrent en métropole sont des utilisateurs réguliers de bennes déchets verts. La demande est concentrée sur les 3m³ à 10m³, adaptées aux contraintes d'espace urbain. Les tarifs incluent le traitement en plateforme de compostage agréée.",
        intro_dib: "Les métropoles sont le premier marché pour les bennes DIB professionnelles. Rénovation de tours de bureaux, transformation de centres commerciaux, reconversion de friches industrielles : chaque projet génère des dizaines de tonnes de DIB. Le décret « 7 flux » impose un tri obligatoire de 7 catégories de déchets sur les chantiers de plus de 1 100L/semaine. Des amendes de 150 000€ sanctionnent les manquements.",
        cas_usage_gravats: "Les travaux les plus fréquents : démolition de bâtiment entier pour reconstruction, curage d'immeuble avant réhabilitation, creusement de parking souterrain, ravalement de façade d'immeuble ancien, et rénovation lourde d'appartement (reprise de plancher, ouverture de mur porteur).",
        cas_usage_encombrants: "Les situations les plus courantes : vidage express d'appartement (24-48h) avant relocation, débarras de cave de copropriété (souvent imposé par la copropriété), nettoyage de local commercial après liquidation judiciaire, et renouvellement de mobilier hôtelier ou de résidence meublée.",
        cas_usage_dechets_verts: "Les projets typiques : réfection complète de jardin privatif en copropriété, abattage d'arbre en cour d'immeuble (sur autorisation), entretien de toiture végétalisée, renouvellement de plantations de terrasse d'entreprise, et maintenance de squares et jardins partagés.",
        cas_usage_dib: "Les chantiers courants : curage de plateau de bureau avant restructuration, dépose de faux plafond et cloisons sèches, remplacement de réseaux (plomberie, électricité, CVC), rénovation de hall et parties communes d'immeuble de bureau, et mise en conformité accessibilité d'ERP.",
        conseil_pratique: "En métropole, anticipez ! L'autorisation de voirie demande 10 à 20 jours ouvrés. Certaines mairies proposent une procédure en ligne. Vérifiez les restrictions de gabarit (pont, porche, rues étroites) et les horaires autorisés de livraison. Les amendes pour stationnement non autorisé de benne vont de 135€ à 1 500€. Votre loueur doit fournir une signalisation réglementaire (cônes, bande réfléchissante).",
        logistique: "Livraison souvent possible dans la journée ou le lendemain. En métropole, les loueurs vérifient systématiquement la faisabilité d'accès avant de valider la commande. Demandez un repérage si vous êtes en centre-ville dense. Pour les petits volumes, les bennes 3m³ (occupant une place de parking) sont idéales en environnement contraint."
    }
};
