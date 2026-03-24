// Pool de faits "Le saviez-vous ?" — Rotation via hash du slug
// 25+ faits par catégorie, un ou deux sélectionnés par page

export type WasteCategory = 'gravats' | 'encombrants' | 'dechets_verts' | 'dib';

export const factsPool: Record<WasteCategory, string[]> = {
    gravats: [
        "En France, le secteur du BTP produit 246 millions de tonnes de déchets par an, dont près de 80% sont des déchets inertes (gravats). C'est 10 fois plus que les déchets ménagers.",
        "Le béton est recyclable à 100% : une fois concassé, il devient du granulat recyclé utilisable en sous-couche routière ou en remblaiement. Un geste pour l'économie circulaire.",
        "Depuis 2023, la REP PMCB (Responsabilité Élargie du Producteur pour les Produits et Matériaux de Construction du Bâtiment) impose aux fabricants de financer la collecte et le recyclage des déchets de chantier.",
        "Un mètre cube de gravats pèse en moyenne 1 500 kg (1,5 tonne). C'est pourquoi les bennes à gravats sont limitées à 8-10m³ : au-delà, le poids dépasse la capacité de charge des camions.",
        "La mise en décharge sauvage de gravats est passible d'une amende de 1 500€ pour un particulier et jusqu'à 75 000€ pour une entreprise, majorée de frais de remise en état du site.",
        "Les gravats sont classés « déchets inertes » car ils ne se décomposent pas et ne polluent pas. Ils doivent être traités dans des installations classées ISDI (Installation de Stockage de Déchets Inertes) ou ISDI/recyclage.",
        "Le prix d'une benne à gravats inclut généralement 3 postes : le transport (aller-retour du camion), la location de la benne (7 jours standard) et le traitement des déchets au centre agréé.",
        "En France, 70% des gravats de chantier sont aujourd'hui recyclés ou valorisés, contre seulement 40% en 2010. L'objectif européen est d'atteindre 80% de valorisation d'ici 2030.",
        "La terre et les déblais de terrassement ne sont PAS des gravats. Ils constituent une catégorie distincte avec des filières de traitement spécifiques. Ne les mélangez jamais avec des gravats de construction.",
        "Les tuiles en terre cuite, une fois broyées, sont utilisées comme paillis minéral pour les jardins ou comme matériau de drainage. Elles se recyclent intégralement.",
        "L'amiante, même en infime quantité, rend un lot de gravats entier « dangereux ». Si vous suspectez la présence d'amiante (bâtiment construit avant 1997), faites réaliser un diagnostic avant démolition.",
        "Le plâtre est incompatible avec les gravats en décharge ISDI car il dégage du sulfure d'hydrogène (H₂S) au contact de l'humidité. Il doit être trié séparément et acheminé vers une filière plâtre dédiée.",
        "Le coût de traitement des gravats en centre agréé varie de 5 à 25€ la tonne selon la région et la pureté du lot. Un tri soigneux à la source permet systématiquement de réduire la facture.",
        "Les fondations romaines encore visibles en France (Nîmes, Arles, Lyon) sont la preuve que les gravats de pierre calcaire et de mortier sont pratiquement indestructibles — d'où leur classement « inertes ».",
        "Un simple WC ou une petite salle de bain rénovée génère en moyenne 200 à 400 kg de gravats (carrelage, chape, faïence). C'est déjà la moitié d'une benne 3m³ en poids.",
        "Le broyage des gravats sur chantier (avec un concasseur mobile) peut réduire le volume de 30% et permettre la réutilisation sur place en remblai, économisant le coût d'une benne.",
        "Depuis 2022, tout devis de travaux de plus de 5 000€ HT doit mentionner les modalités d'enlèvement et de valorisation des déchets de chantier. C'est une obligation légale.",
        "Les déchets de gravats sont les moins coûteux à traiter de tous les déchets de chantier : entre 8 et 15€/tonne en moyenne, contre 80 à 200€/tonne pour les déchets mélangés non triés.",
        "La brique rouge, une fois broyée, est un excellent matériau de paillage pour les allées de jardin et les courts de tennis (terre battue). Elle se recycle à 100%.",
        "En zone sismique (Alpes, Pyrénées, Alsace), les gravats de démolition peuvent contenir des armatures métalliques et du ferraillage qu'il vaut mieux séparer pour optimiser la valorisation.",
        "Le terme « gravats » vient de l'ancien français « grève » qui désignait le sable grossier des berges. Les gravats actuels incluent tout matériau de construction inerte : béton, brique, pierre, tuile.",
        "Le Diagnostic Déchets avant démolition est obligatoire pour tout bâtiment de plus de 1 000 m² ou ayant abrité une activité utilisant des substances dangereuses. Il liste les matériaux et leurs filières de traitement.",
        "Un camion ampliroll peut transporter une benne de 10m³ de gravats, soit environ 15 tonnes. C'est la charge maximale autorisée sur les routes françaises sans convoi exceptionnel.",
        "Les briques de terre crue (adobe, pisé), typiques du Sud-Ouest et du Rhône-Alpes, ne sont pas considérées comme des gravats classiques. Elles peuvent souvent être réutilisées après broyage comme matériau de construction.",
        "Un chantier de rénovation moyen d'une maison de 100m² génère entre 3 et 8 tonnes de gravats, soit environ une à deux bennes de 3m³.",
    ],
    encombrants: [
        "En France, chaque foyer produit en moyenne 23 kg d'encombrants par an, soit 1,5 million de tonnes à l'échelle nationale. La benne est de loin la solution la plus rapide pour les gros volumes.",
        "Un canapé standard pèse entre 30 et 80 kg mais occupe 1 à 2 m³ dans une benne. Les encombrants sont trompeurs : ils sont légers mais volumineux. Prenez toujours la taille de benne au-dessus en cas de doute.",
        "Les encombrants déposés sur le trottoir sont interdits en dehors des collectes municipales programmées. L'amende est de 135€ pour un dépôt sauvage, majorée à 375€ en cas de récidive.",
        "Pour les appareils électroménagers (réfrigérateurs, lave-linge, fours), la reprise « 1 pour 1 » est obligatoire : tout vendeur d'un appareil neuf doit reprendre l'ancien gratuitement. Pensez-y avant de les mettre en benne.",
        "Un débarras complet de maison de 3 pièces (T3) nécessite en moyenne une benne de 10 à 15m³. Pour une maison de 5 pièces avec garage et grenier, comptez plutôt 20 à 30m³.",
        "Les meubles en bon état peuvent être donnés à des associations (Emmaüs, Le Relais, Secours Populaire) avant de passer à la benne. Certaines proposent même le retrait à domicile. Un geste solidaire et écologique.",
        "Le rembourrage de mousse des canapés et fauteuils est un excellent combustible pour les unités de valorisation énergétique. Les centres de tri séparent ces matières pour maximiser la valorisation.",
        "La durée de vie moyenne d'un meuble IKEA est de 5 à 8 ans. Les meubles en aggloméré/mélaminé sont les plus fréquents dans les bennes encombrants, et sont recyclés en panneaux de particules neufs.",
        "Les matelas sont un encombrant particulier : ils doivent être transportés à la verticale dans la benne pour optimiser l'espace. Un matelas 140×190 occupe 0,5m³ à plat mais seulement 0,15m³ debout.",
        "Le coût moyen d'un vidage de maison par un débarrasseur professionnel est de 1 500 à 3 000€ pour un T3. La location d'une benne (300-500€) est 3 à 5 fois moins chère, si vous faites le chargement vous-même.",
        "En France, 30% des meubles jetés pourraient être réutilisés tels quels ou après une petite réparation. Les « Repair Cafés », présents dans de nombreuses villes, proposent des ateliers de remise en état gratuits.",
        "Les piles, batteries, ampoules et peintures ne doivent JAMAIS aller dans une benne encombrants. Ce sont des Déchets Dangereux des Ménages (DDM) à déposer en déchetterie dans les bacs dédiés.",
        "Le service municipal de collecte des encombrants, quand il existe, est limité à 2m³ par foyer et par mois en moyenne. Au-delà, la benne de location est la seule option légale.",
        "Un réfrigérateur contient des gaz fluorés (HFC) nocifs pour la couche d'ozone. Il ne doit jamais être mis en benne brute : les fluides doivent être extraits par un professionnel agréé avant élimination de la carcasse métallique.",
        "Lors d'un déménagement, le volume moyen de mobilier à évacuer est de 5 à 8m³ pour un couple, et de 10 à 15m³ pour une famille de 4 personnes. Les bennes 10m³ sont les plus adaptées.",
        "Le bois de meuble, une fois broyé et débarrassé de ses quincailleries (vis, charnières), est recyclé en panneaux de particules ou valorisé en énergie (chaufferies biomasse). Taux de recyclage : 75%.",
        "La filière REP DEA (Déchets d'Éléments d'Ameublement) finance le recyclage des meubles en fin de vie via l'éco-organisme Éco-Mobilier. Une éco-participation de 0,5 à 15€ est prélevée à l'achat de chaque meuble neuf.",
        "Les services de location de bennes proposent parfois un « tri assisté » : un opérateur vient sur place pour aider au chargement et au tri. Ce service, facturé 50 à 100€ en supplément, peut réduire le coût de traitement.",
        "Un vieux vélo, même rouillé, vaut mieux être déposé chez un ferrailleur que dans une benne encombrants : le métal est racheté entre 5 et 15 centimes le kilo. Idem pour les radiateurs en fonte.",
        "Le volume standard d'un camion de déménagement est de 20m³. Si vous videz un logement complet, une benne de même volume est l'équivalent le plus proche pour l'évacuation.",
    ],
    dechets_verts: [
        "Le brûlage des déchets verts à l'air libre est interdit en France depuis la circulaire du 18 novembre 2011. L'amende est de 450€. La location d'une benne est la solution légale et écologique pour les gros volumes.",
        "Un mètre cube de déchets verts « tassés » (tontes, feuilles) pèse environ 300 à 400 kg. Les branchages non broyés, eux, ne pèsent que 100 à 200 kg/m³ mais prennent beaucoup plus de place. Le broyage avant chargement réduit le volume de 80%.",
        "En France, les déchets verts représentent 17% du tonnage global des déchets des ménages, soit 11 millions de tonnes par an. Ils sont entièrement compostables et valorisables.",
        "Le compostage des déchets verts produit un amendement organique de qualité. Les centres de traitement transforment vos tontes et branchages en compost vendu aux agriculteurs et paysagistes locaux.",
        "Le débroussaillage est obligatoire dans un rayon de 50m autour des habitations dans les communes classées à risque incendie (article L131-1 du Code forestier). Le non-respect peut entraîner une amende de 30 à 150€/m².",
        "Un élagage standard d'un arbre de hauteur moyenne (6-10m) produit entre 1 et 3 m³ de branchages. Pour un grand arbre (15m+), comptez 5 à 8 m³. C'est la principale raison de louer une benne déchets verts.",
        "Les tontes de gazon frais, si elles sont stockées en tas plus de 48h, fermentent et dégagent du méthane. Elles peuvent atteindre une température de 70°C au cœur du tas. Chargez-les rapidement dans la benne.",
        "La pyrale du buis, arrivée en France en 2008, a imposé l'arrachage de millions de buis dans les jardins et parcs français. Les déchets de buis infectés doivent être incinérés et non compostés.",
        "Un saule pleureur adulte produit à lui seul 3 à 5 m³ de feuilles par automne. Si votre jardin compte des arbres caduques matures, une benne 10m³ est recommandée pour le nettoyage automnal.",
        "Le « paillage » consiste à broyer les branches et à les étaler au pied des plantations. Si vous disposez d'un broyeur, vous pouvez réduire votre besoin de benne de 60 à 80% et nourrir vos sols en même temps.",
        "Les souches d'arbre sont acceptées dans les bennes déchets verts, à condition qu'elles ne dépassent pas 30 cm de diamètre. Au-delà, elles doivent être tronçonnées ou passées au dessoucheur.",
        "Les sapins de Noël sont des déchets verts. Chaque année en janvier, 6 millions de sapins sont collectés en France. Si vous n'avez pas de point de collecte municipal, une benne 3m³ est idéale pour un copropriété.",
        "Le bambou est l'une des plantes les plus envahissantes de France. Son rhizome (racine) doit être déraciné mécaniquement et évacué en benne. Ne le mettez pas au compost : il repousserait.",
        "La taille des haies est réglementée entre le 15 mars et le 31 juillet pour protéger la nidification des oiseaux (arrêté préfectoral). En dehors de cette période, vous pouvez tailler librement et évacuer les déchets en benne.",
        "Un jardin de 500m² produit en moyenne 3 à 5 m³ de déchets verts par an, en comptant les tontes, les tailles de haies et les feuilles mortes. Une benne 6m³ couvre généralement un grand nettoyage saisonnier.",
        "Les ronces et les épineux (aubépine, prunellier) ne doivent pas être compactés à la main dans la benne en raison du risque de blessure. Utilisez une fourche et des gants renforcés pour le chargement.",
        "Le palmier (Trachycarpus, Phoenix) est de plus en plus présent dans les jardins français. L'élagage de leurs palmes sèches génère un déchet fibreux très volumineux. Un seul palmier adulte produit 0,5m³ de palmes par an.",
        "Le mulching (tondeuse mulcheuse) réduit de 30% le volume de tontes en broyant l'herbe sur place. Combiné avec le compostage domestique, il peut diviser par deux votre besoin annuel de benne déchets verts.",
        "Les cendres de bois non traité ne sont pas des déchets verts. Elles sont considérées comme un amendement calcique et peuvent être épandues directement au jardin (200g/m² max).",
        "Depuis 2024, le compostage des biodéchets est obligatoire pour tous les ménages français. Toutefois, cette obligation ne concerne que les déchets alimentaires, pas les branchages et les tontes de gros volume.",
    ],
    dib: [
        "Les DIB (Déchets Industriels Banals) représentent 21 millions de tonnes par an en France, produites majoritairement par le secteur du BTP, les commerces et l'industrie.",
        "Le décret « 7 flux » (2016, renforcé en 2025) impose le tri séparé de 7 catégories de déchets sur les chantiers : papier/carton, métal, plastique, verre, bois, plâtre et fractions minérales. Les bennes DIB triées coûtent 30 à 50% moins cher que les bennes tout-venant.",
        "Les palettes en bois, principal DIB du commerce et de la logistique, sont recyclables à 100%. En France, 400 millions de palettes circulent chaque année. Un professionnel de la palette vous les rachète entre 0,50€ et 3€ pièce selon l'état.",
        "Le plâtre (plaques BA13, staff, enduit) est un DIB à part : il ne peut être mélangé ni avec les gravats (réaction chimique) ni avec les autres DIB (contamination). Il doit être trié séparément et acheminé vers un recycleur agréé (Placo Recycling, Siniat).",
        "Le polystyrène expansé (PSE), bien que très léger, occupe un volume considérable. 1 m³ de PSE ne pèse que 15 à 25 kg. Si votre chantier génère du PSE en quantité, demandez une benne dédiée pour réduire le coût au poids.",
        "Les laines minérales d'isolation (laine de verre, laine de roche) sont classées DIB non dangereux. Elles doivent cependant être conditionnées en sacs fermés dans la benne pour éviter la dispersion de fibres pendant le transport.",
        "Le bois de chantier (charpente, coffrage, palettes) représente à lui seul 25% du volume total des DIB en France. Il est valorisé à 95% : recyclage en panneaux de particules (60%), valorisation énergétique en chaufferie bois (35%).",
        "Le coût de traitement d'une benne de DIB triés est de 80 à 120€/tonne, contre 150 à 250€/tonne pour du DIB en mélange. Le tri à la source est donc un investissement rentable, même avec le surcoût de plusieurs bennes.",
        "Depuis 2022, tout particulier réalisant des travaux doit pouvoir justifier de l'évacuation légale de ses déchets de chantier via un bordereau de suivi. Les loueurs de bennes fournissent systématiquement ce document.",
        "Les Déchets d'Équipements Électriques et Électroniques (DEEE) ne sont PAS des DIB. Câbles, luminaires, tableaux électriques doivent être extraits du flux DIB et orientés vers une filière DEEE spécialisée.",
        "L'amiante transforme un chantier standard en chantier « déchets dangereux ». Même une seule plaque de fibrociment amiantée dans une benne DIB rend tout le lot dangereux, avec un surcoût de traitement multiplié par 10.",
        "Les menuiseries en PVC sont recyclables à 100% : elles sont broyées puis refondues en profilés neufs. Séparez-les du flux DIB pour les orienter vers un recycleur PVC (programme VinylPlus).",
        "Un chantier de rénovation intérieure de 50m² (cloisons, sols, peinture) génère en moyenne 2 à 4 tonnes de DIB. C'est l'équivalent d'une benne 10m³ à moitié pleine.",
        "Le placo-plâtre usagé est recyclable en circuit fermé : la marque Placo® opère un réseau de collecte national qui fabrique de nouvelles plaques à partir du plâtre recyclé. Demandez un sac big bag plâtre séparé à votre loueur.",
        "Les solvants, peintures, huiles et produits chimiques sont des Déchets Dangereux (DD) et ne doivent JAMAIS être mis dans une benne DIB. Ils requièrent un bordereau de suivi spécifique et une collecte par un prestataire agréé.",
        "La ferraille issue des chantiers (tuyaux, armatures, chutes de tôle) a une valeur marchande de 100 à 300€/tonne. Si votre chantier en produit en quantité, triez-la séparément et revendez-la à un ferrailleur : c'est un revenu, pas un coût.",
        "Un local commercial de 100m² vidé jusqu'aux murs (dal, cloisons, faux plafond, moquette) génère 3 à 6 tonnes de DIB, soit environ une benne de 20m³. Prévoyez le chantier sur 2-3 jours avec une benne en rotation.",
        "Les moquettes et revêtements de sol textiles sont des DIB recyclables via la filière Optimum. Ils sont broyés et transformés en isolant acoustique ou en matériau de rembourrage. Enroulez-les avant de les placer dans la benne.",
        "L'isolant PIR/PUR (panneaux de mousse polyuréthane/polyisocyanurate) est un DIB standard, mais il dégage des fumées toxiques en cas d'incendie. Ne le brûlez jamais sur site : benne obligatoire.",
        "Le terme « DIB » a été officiellement remplacé par « Déchets d'Activité Économique non dangereux » (DAE) dans le Code de l'Environnement. Dans le langage courant, le terme DIB reste cependant le plus utilisé.",
    ]
};

// Sélectionne des faits de façon déterministe en fonction du slug
export function getFactsForCity(slug: string, category: WasteCategory, count: number = 2): string[] {
    const pool = factsPool[category];
    const hash = simpleHash(slug);
    const indices: number[] = [];
    let idx = hash % pool.length;
    for (let i = 0; i < count && i < pool.length; i++) {
        indices.push(idx);
        idx = (idx + 7) % pool.length; // Step de 7 pour éviter les adjacences
    }
    return indices.map(i => pool[i]);
}

function simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash);
}
