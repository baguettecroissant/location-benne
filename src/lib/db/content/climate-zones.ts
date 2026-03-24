// Zones climatiques dérivées de la latitude — 6 zones
// Utilisées pour générer des conseils saisonniers et logistiques uniques

export interface ClimateZone {
    id: string;
    label: string;
    gravats_conseil: string;
    encombrants_conseil: string;
    dechets_verts_conseil: string;
    dib_conseil: string;
    saison_haute: string;
    saison_basse: string;
}

export function getClimateZone(lat: number, lng: number): ClimateZone {
    // Détection simplifiée basée sur latitude + longitude
    if (lat > 48.5) return climateZones.oceanique_nord;
    if (lat > 46.5 && lng < 0) return climateZones.oceanique;
    if (lat > 46.5 && lng >= 0 && lng < 5) return climateZones.semi_continental;
    if (lat > 46.5 && lng >= 5) return climateZones.continental;
    if (lat > 44 && lng > 3) return climateZones.mediterraneen;
    if (lat <= 44 && lng > 3) return climateZones.mediterraneen;
    if (lat <= 44) return climateZones.oceanique_sud;
    return climateZones.oceanique;
}

export const climateZones: Record<string, ClimateZone> = {
    oceanique_nord: {
        id: "oceanique_nord",
        label: "Climat océanique tempéré (Nord)",
        gravats_conseil: "Dans votre zone climatique, les précipitations fréquentes peuvent accélérer la corrosion des métaux dans les gravats mixtes. Prévoyez une bâche de protection si la benne reste plusieurs jours sur chantier. Les périodes de gel (décembre-février) peuvent empêcher la livraison dans les zones exposées — privilégiez les chantiers d'intérieur en hiver.",
        encombrants_conseil: "Le taux d'humidité élevé de votre zone rend les matelas et textiles plus lourds une fois exposés à la pluie. Protégez la benne avec une bâche si le chargement contient des matériaux absorbants. Évitez de stocker du mobilier en bois aggloméré à l'extérieur avant le chargement : il gonfle au contact de l'eau et prend plus de volume.",
        dechets_verts_conseil: "Votre climat doux et humide favorise une croissance végétale rapide : les jardins produisent des déchets verts de mars à novembre. Prévoyez 2 à 3 rotations de benne par an pour un grand jardin (>500m²). La tonte doit être chargée dans les 48h pour éviter la fermentation, qui alourdit considérablement les déchets et peut provoquer des odeurs.",
        dib_conseil: "L'humidité ambiante de votre zone impose de protéger les DIB sensibles (carton, plâtre, isolants) avant chargement. Optez pour un chargement rapide et une récupération sous 48-72h maximum pour éviter que les matériaux ne s'imbibent d'eau, ce qui augmenterait la facture de traitement.",
        saison_haute: "mars à octobre",
        saison_basse: "novembre à février"
    },
    oceanique: {
        id: "oceanique",
        label: "Climat océanique doux (Ouest)",
        gravats_conseil: "Votre zone bénéficie d'un climat doux propice aux chantiers toute l'année, mais les pluies régulières imposent de couvrir la benne pour éviter l'accumulation d'eau. Un gravat mouillé pèse 20% de plus : cela peut entraîner un surcoût de transport si la charge maximale est dépassée. Planifiez votre chargement lors d'une période de temps sec si possible.",
        encombrants_conseil: "Le climat atlantique doux permet d'organiser vos débarras presque toute l'année. Profitez des mois de septembre-octobre, après la saison estivale et avant les tempêtes automnales, pour programmer vos débarras de maison ou de résidence secondaire. C'est aussi la période où la demande est la plus basse, ce qui peut faciliter la disponibilité des bennes.",
        dechets_verts_conseil: "Votre climat atlantique favorise la pousse des haies et pelouses presque toute l'année. Les tontes peuvent être nécessaires même en hiver lors de périodes douces. Prévoyez une benne déchets verts au moins 2 fois par an : au printemps pour le premier gros entretien et à l'automne pour les feuilles et tailles pré-hivernales.",
        dib_conseil: "La proximité de l'océan peut accélérer l'oxydation des métaux dans les DIB. Triez soigneusement les métaux ferreux et non-ferreux avant chargement pour maximiser la valeur de recyclage. Les plateformes de tri littorales sont habituées à traiter les DIB des chantiers côtiers et proposent souvent des tarifs compétitifs.",
        saison_haute: "mars à novembre",
        saison_basse: "décembre à février"
    },
    semi_continental: {
        id: "semi_continental",
        label: "Climat semi-continental",
        gravats_conseil: "Le climat de votre région, avec des étés chauds et des hivers froids, crée une amplitude thermique importante qui favorise les fissures dans les bâtiments anciens. Les chantiers de réparation de façades et de reprise de fondations sont fréquents au printemps, après les dégâts du gel hivernal. Planifiez votre location de benne dès février pour être servi avant le rush de mars-avril.",
        encombrants_conseil: "Les hivers froids de votre zone incitent souvent les habitants à reporter leurs projets de débarras au printemps. Résultat : une forte concentration de la demande entre mars et juin. Pour bénéficier d'une meilleure disponibilité et de tarifs potentiellement plus bas, envisagez un débarras en automne (octobre-novembre), avant les premiers froids.",
        dechets_verts_conseil: "La saison de jardinage est concentrée entre avril et octobre dans votre zone climatique. Le gel hivernal impose un élagage précoce (mars) pour les arbres fruitiers et un nettoyage d'automne (novembre) avant les premières gelées. Les volumes sont généralement importants au printemps, quand les jardins reprennent vie après l'hiver.",
        dib_conseil: "Les chantiers de rénovation sont concentrés sur la période avril-octobre dans votre zone, en raison des contraintes liées au gel et aux basses températures. Anticipez votre réservation de benne DIB dès mars pour sécuriser une livraison rapide pendant cette période de forte demande.",
        saison_haute: "avril à octobre",
        saison_basse: "novembre à mars"
    },
    continental: {
        id: "continental",
        label: "Climat continental (Est, massifs)",
        gravats_conseil: "Votre climat continental, avec des hivers rigoureux et des été chauds, impose une planification rigoureuse des chantiers. Les cycles gel-dégel endommagent les maçonneries et génèrent des besoins de reprise structurelle au printemps. Attention : en période de gel, les gravats humides peuvent prendre en masse dans la benne, compliquant le déchargement au centre de traitement.",
        encombrants_conseil: "Dans votre zone au climat marqué, les déménagements se concentrent entre mai et septembre. Réservez votre benne encombrants le plus tôt possible durant cette période de forte demande. L'hiver, les tarifs peuvent être plus avantageux et les disponibilités meilleures, mais attention à protéger les encombrants sensibles au gel (appareils contenant de l'eau).",
        dechets_verts_conseil: "La saison de jardinage est courte dans votre zone (mai-septembre), mais intense. Les arbres caduques produisent d'importants volumes de feuilles en automne. Prévoyez deux créneaux : un au printemps pour les tailles et un à l'automne pour les feuilles et le nettoyage avant l'hiver. En altitude, la fenêtre peut être encore plus réduite (juin-septembre).",
        dib_conseil: "Les chantiers professionnels dans votre zone sont soumis aux aléas climatiques : gel, neige, températures extrêmes. Les entreprises du BTP regroupent souvent leurs évacuations de DIB au printemps et en fin de saison. Pour les projets intérieurs (démolition, aménagement), la benne DIB peut être commandée toute l'année.",
        saison_haute: "mai à septembre",
        saison_basse: "décembre à mars"
    },
    mediterraneen: {
        id: "mediterraneen",
        label: "Climat méditerranéen (Sud-Est)",
        gravats_conseil: "Le climat méditerranéen, sec et ensoleillé, est idéal pour les chantiers de gros œuvre. Les gravats sèchent rapidement, restant légers et faciles à manipuler. Attention cependant aux épisodes cévenols et méditerranéens (pluies violentes automne/printemps) : évitez de laisser une benne en extérieur lors de ces alertes météo. La forte demande estivale, liée aux rénovations de résidences secondaires, peut allonger les délais de livraison en juillet-août.",
        encombrants_conseil: "Le climat méditerranéen, sec et lumineux, est propice aux débarras toute l'année. La période de mai à juin est idéale : les propriétaires de résidences secondaires préparent l'été. Évitez les week-ends de juillet-août, périodes de forte affluence où les loueurs sont très sollicités. L'automne (septembre-octobre) offre des conditions idéales : tarifs plus doux et disponibilité optimale.",
        dechets_verts_conseil: "Le débroussaillage obligatoire (Obligation Légale de Débroussaillement) dans votre zone impose de maintenir un périmètre dégagé de 50m autour de toute habitation. Cette obligation, contrôlée par les services de prévention des incendies, concerne toutes les communes classées à risque feu de forêt. La non-conformité peut entraîner une amende de 30 à 150€/m². La période de débroussaillage réglementaire s'étend de mars à juin.",
        dib_conseil: "Le secteur du BTP en zone méditerranéenne est actif toute l'année grâce au climat clément. Les chantiers de rénovation de bastides, de mas provençaux et de villas bénéficient de conditions de travail optimales. La demande de bennes DIB est soutenue et régulière, avec un léger pic en printemps lié aux lancements de chantiers de la saison.",
        saison_haute: "mars à novembre",
        saison_basse: "décembre à février (léger ralentissement)"
    },
    oceanique_sud: {
        id: "oceanique_sud",
        label: "Climat océanique aquitain (Sud-Ouest)",
        gravats_conseil: "Le climat du Sud-Ouest, à la fois doux et pluvieux, permet de mener des chantiers presque toute l'année. Les constructions traditionnelles en pierre blonde du Périgord, en brique rose de Toulouse ou en galets du Pays basque génèrent des gravats de nature variée. Prévoyez une bâche en hiver et au printemps, périodes les plus arrosées, pour limiter la prise de poids des gravats par l'eau de pluie.",
        encombrants_conseil: "Le Sud-Ouest, terre de villégiature, voit de nombreux débarras de résidences secondaires (Dordogne, Lot-et-Garonne, Pays basque). Les successions de propriétés de caractère (chartreuses, maisons de maître) nécessitent souvent des bennes de gros volume (20 à 30m³). La période d'avril à juin est la plus favorable pour ces opérations, avant l'arrivée des locataires estivaux.",
        dechets_verts_conseil: "Le climat aquitain, doux et humide, est l'un des plus productifs de France en matière de végétation. Les jardins du Sud-Ouest produisent des déchets verts de février à décembre avec seulement une courte pause en janvier. Les haies de laurier, les platanes et les chênes caractéristiques de la région génèrent des volumes importants lors des tailles saisonnières.",
        dib_conseil: "Le bassin économique du Sud-Ouest, avec Airbus à Toulouse, le secteur viticole en Bordelais et l'artisanat basque, produit des DIB diversifiés. Les professionnels bénéficient d'un réseau de recycleurs structuré le long de l'axe Bordeaux-Toulouse, avec des plateformes de tri modernes qui permettent une valorisation élevée des DIB triés.",
        saison_haute: "mars à novembre",
        saison_basse: "décembre à février"
    }
};
