// Content Engine — Moteur de génération de contenu unique
// Assemble les 5 niveaux de signaux pour produire du contenu unique par page

import { City } from "@/types";
import { regionsContent } from "./db/content/regions";
import { departmentsContent } from "./db/content/departments";
import { getClimateZone } from "./db/content/climate-zones";
import { getPopTier, populationTiers } from "./db/content/population-tiers";
import { getFactsForCity, WasteCategory } from "./db/content/facts-pool";

export type CategoryKey = 'gravats' | 'encombrants' | 'dechets_verts' | 'dib';

export interface PageContent {
    introTitle: string;
    introParagraph: string;
    regionContext: string;
    departmentContext: string;
    climateAdvice: string;
    casUsage: string;
    conseilPratique: string;
    logistique: string;
    saisonHaute: string;
    facts: string[];
    faqItems: FaqItem[];
    pricingContext: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

// ============== MAIN GENERATORS ==============

export function generateGravatsContent(city: City): PageContent {
    return generateContent(city, 'gravats');
}

export function generateEncombrantsContent(city: City): PageContent {
    return generateContent(city, 'encombrants');
}

export function generateDechetsVertsContent(city: City): PageContent {
    return generateContent(city, 'dechets_verts');
}

export function generateDIBContent(city: City): PageContent {
    return generateContent(city, 'dib');
}

// Generic city page — overview of ALL waste types
export function generateGenericContent(city: City): GenericPageContent {
    const tier = getPopTier(city.population);
    const tierData = populationTiers[tier];
    const regionData = regionsContent[city.region];
    const deptData = departmentsContent[city.department_code];
    const climateZone = getClimateZone(city.coordinates.lat, city.coordinates.lng);
    const pop = city.population || 0;
    const dept = city.department_name;
    const popStr = pop > 0 ? ` (${pop.toLocaleString('fr-FR')} habitants)` : '';

    // Intro — adapted per population tier
    const introTitle = `Location de benne à ${city.name}${popStr}`;

    const introTexts: Record<string, string> = {
        XS: `${city.name}, commune rurale du ${dept}, est régulièrement concernée par des besoins d'évacuation de déchets : rénovation de maisons anciennes, travaux de jardinage, débarras de dépendances ou déblaiement de terrains. La déchetterie la plus proche étant souvent éloignée, la location d'une benne livrée directement chez vous est la solution la plus pratique et économique pour les volumes importants.`,
        S: `À ${city.name}, les projets d'aménagement et de rénovation sont fréquents : remise en état de pavillons, entretien de jardins, fermeture de commerces ou nettoyage après succession. La benne de location permet d'évacuer rapidement tous types de déchets, des gravats de chantier aux encombrants, en passant par les déchets verts et les DIB professionnels.`,
        M: `${city.name} est une ville active où les chantiers de construction, de rénovation et d'aménagement sont réguliers. Particuliers et professionnels ont besoin de solutions fiables pour l'évacuation de leurs déchets : gravats de démolition, meubles et encombrants, déchets de jardin ou encore déchets d'activité. La location de benne avec livraison sous 24h est la réponse la plus efficace.`,
        L: `À ${city.name}, grande ville du ${dept}, l'activité de construction et de rénovation est soutenue toute l'année. Les particuliers qui rénovent leur logement, les entreprises qui aménagent leurs locaux et les collectivités qui entretiennent les espaces publics ont tous besoin de bennes pour évacuer leurs déchets. Avec plusieurs loueurs en concurrence, les prix sont généralement compétitifs et la livraison rapide.`,
        XL: `${city.name}, métropole dynamique, génère d'importants volumes de déchets liés à la construction, la rénovation et l'activité économique. Que vous soyez un particulier en plein déménagement, un artisan sur un chantier de rénovation ou une entreprise en reconversion de locaux, la location de benne est un service essentiel. La forte concurrence entre loueurs en métropole garantit des prix compétitifs et une disponibilité quasi immédiate.`,
    };

    const introParagraph = introTexts[tier] || introTexts.S;

    // Region overview — pick 2 categories for variety
    const regionOverview = regionData
        ? `${regionData.gravats} Par ailleurs, ${regionData.dechets_verts.charAt(0).toLowerCase()}${regionData.dechets_verts.slice(1)}`
        : '';

    // Department context
    const departmentContext = deptData
        ? `Le ${dept} (${city.department_code}) dispose de ${deptData.dechetteries} déchetteries réparties sur son territoire, la préfecture de ${deptData.prefecture} centralisant les autorisations administratives. ${deptData.specificite}.`
        : '';

    // Climate advice — general
    const climateAdvice = `${climateZone.gravats_conseil.split('.').slice(0, 2).join('.')}. La saison haute pour les chantiers à ${city.name} s'étend de ${climateZone.saison_haute}.`;

    // Generic FAQ
    const faqItems = buildGenericFaq(city, tier, climateZone.saison_haute);

    // Pricing context
    const pricingContext = buildPricingContext(city, 'gravats', tier);

    // Facts — pull from multiple categories for variety
    const gravFacts = getFactsForCity(city.slug, 'gravats', 1);
    const encFacts = getFactsForCity(city.slug + '-enc', 'encombrants', 1);
    const facts = [...gravFacts, ...encFacts];

    // Category summaries for the "types de bennes" section
    const categorySummaries = {
        gravats: tierData.cas_usage_gravats,
        encombrants: tierData.cas_usage_encombrants,
        dechets_verts: tierData.cas_usage_dechets_verts,
        dib: tierData.cas_usage_dib,
    };

    return {
        introTitle,
        introParagraph,
        regionOverview,
        departmentContext,
        climateAdvice,
        conseilPratique: tierData.conseil_pratique,
        logistique: tierData.logistique,
        saisonHaute: climateZone.saison_haute,
        facts,
        faqItems,
        pricingContext,
        categorySummaries,
    };
}

export interface GenericPageContent {
    introTitle: string;
    introParagraph: string;
    regionOverview: string;
    departmentContext: string;
    climateAdvice: string;
    conseilPratique: string;
    logistique: string;
    saisonHaute: string;
    facts: string[];
    faqItems: FaqItem[];
    pricingContext: string;
    categorySummaries: {
        gravats: string;
        encombrants: string;
        dechets_verts: string;
        dib: string;
    };
}

function buildGenericFaq(city: City, tier: string, saisonHaute: string): FaqItem[] {
    const pop = city.population || 0;
    const dept = city.department_name;

    return [
        {
            question: `Faut-il une autorisation pour poser une benne à ${city.name} ?`,
            answer: pop > 50000
                ? `Oui, à ${city.name}, un arrêté de voirie est obligatoire pour toute benne sur la voie publique. Comptez 8 à 15 jours pour l'obtention auprès de la mairie. Votre loueur peut souvent gérer cette formalité. Sur terrain privé, aucune autorisation n'est nécessaire.`
                : pop > 10000
                    ? `À ${city.name}, une autorisation est requise pour les bennes posées sur la voie publique (trottoir, chaussée). Le délai est de 5 à 10 jours. Sur votre terrain privé, aucune formalité nécessaire.`
                    : `Dans les communes comme ${city.name}, les formalités sont souvent simplifiées : un accord verbal de la mairie suffit pour une benne ponctuelle sur la voie publique. Sur terrain privé, aucune autorisation requise.`
        },
        {
            question: `Quel est le délai de livraison à ${city.name} ?`,
            answer: pop > 50000
                ? `Livraison sous 24h à ${city.name}, parfois le jour même. Plusieurs loueurs disposent de dépôts dans l'agglomération. En haute saison (${saisonHaute}), réservez 48h à l'avance.`
                : `Comptez 24 à 72h pour la livraison à ${city.name}, selon la distance au dépôt le plus proche dans le ${dept}. En haute saison (${saisonHaute}), prévoyez 3 à 5 jours d'avance.`
        },
        {
            question: `Quel volume de benne choisir à ${city.name} ?`,
            answer: `Tout dépend du type et du volume de déchets. 3m³ pour un petit chantier (salle de bain, taille de haie). 10m³ pour une pièce complète ou un débarras d'appartement. 20m³ pour un déménagement ou une rénovation de maison. 30m³ pour un chantier professionnel complet. En cas de doute, prenez toujours la taille supérieure : c'est plus économique qu'une seconde rotation.`
        },
        {
            question: `Quels types de déchets peut-on mettre dans une benne à ${city.name} ?`,
            answer: `Selon le type de benne : gravats (béton, briques, tuiles — à trier séparément), encombrants (meubles, matelas, cartons), déchets verts (tontes, branches, feuilles) ou DIB (bois, métal, plastique, plâtre). Important : ne mélangez jamais les catégories pour éviter un surcoût de traitement. Les déchets dangereux (amiante, peintures, huiles) sont interdits dans toutes les bennes.`
        },
        {
            question: `Combien coûte une benne à ${city.name} ?`,
            answer: `Les prix à ${city.name} varient en fonction du volume et du type de déchet. Comptez 129 à 179€ pour un 3m³, 269 à 399€ pour un 10m³, et 449 à 599€ pour un 20-30m³. Le prix inclut la livraison, 7 jours de location et le traitement des déchets. Les bennes de gravats (limité à 10m³ car très lourd) et les bennes DIB triées sont les plus économiques.`
        },
        {
            question: `Quelle est la meilleure période pour louer une benne à ${city.name} ?`,
            answer: `La haute saison à ${city.name} s'étend de ${saisonHaute}. C'est la période où la demande est la plus forte et les délais les plus longs. Pour bénéficier d'une meilleure disponibilité et potentiellement de tarifs plus avantageux, planifiez votre location en dehors de cette période si votre projet le permet.`
        },
    ];
}


// ============== CORE ENGINE ==============

function generateContent(city: City, category: CategoryKey): PageContent {
    const tier = getPopTier(city.population);
    const tierData = populationTiers[tier];
    const regionData = regionsContent[city.region];
    const deptData = departmentsContent[city.department_code];
    const climateZone = getClimateZone(city.coordinates.lat, city.coordinates.lng);
    const facts = getFactsForCity(city.slug, category as WasteCategory, 2);

    // Category-specific content selectors
    const categoryMap = {
        gravats: {
            introKey: 'intro_gravats' as const,
            casKey: 'cas_usage_gravats' as const,
            regionKey: 'gravats' as const,
            climateKey: 'gravats_conseil' as const,
        },
        encombrants: {
            introKey: 'intro_encombrants' as const,
            casKey: 'cas_usage_encombrants' as const,
            regionKey: 'encombrants' as const,
            climateKey: 'encombrants_conseil' as const,
        },
        dechets_verts: {
            introKey: 'intro_dechets_verts' as const,
            casKey: 'cas_usage_dechets_verts' as const,
            regionKey: 'dechets_verts' as const,
            climateKey: 'dechets_verts_conseil' as const,
        },
        dib: {
            introKey: 'intro_dib' as const,
            casKey: 'cas_usage_dib' as const,
            regionKey: 'dib' as const,
            climateKey: 'dib_conseil' as const,
        },
    };

    const keys = categoryMap[category];
    const categoryLabels: Record<CategoryKey, string> = {
        gravats: 'gravats',
        encombrants: 'encombrants',
        dechets_verts: 'déchets verts',
        dib: 'DIB (Déchets Industriels Banals)',
    };

    // Build intro title
    const introTitle = buildIntroTitle(city, category, tier);

    // Build intro paragraph — combines tier + city specifics
    const introParagraph = tierData[keys.introKey];

    // Region context
    const regionContext = regionData?.[keys.regionKey] || '';

    // Department context
    const departmentContext = deptData
        ? `Dans le ${city.department_name} (${city.department_code}), la préfecture de ${deptData.prefecture} centralise les autorisations de voirie pour les bennes posées sur le domaine public départemental. Le département dispose de ${deptData.dechetteries} déchetteries réparties sur son territoire. ${deptData.specificite}.`
        : '';

    // Climate advice
    const climateAdvice = climateZone[keys.climateKey];

    // Use case
    const casUsage = tierData[keys.casKey];

    // Practical advice
    const conseilPratique = tierData.conseil_pratique;

    // Logistics
    const logistique = tierData.logistique;

    // Season
    const saisonHaute = climateZone.saison_haute;

    // FAQ — dynamic, unique per city × category
    const faqItems = buildFaq(city, category, tier, climateZone.saison_haute);

    // Pricing context
    const pricingContext = buildPricingContext(city, category, tier);

    return {
        introTitle,
        introParagraph,
        regionContext,
        departmentContext,
        climateAdvice,
        casUsage,
        conseilPratique,
        logistique,
        saisonHaute,
        facts,
        faqItems,
        pricingContext,
    };
}

// ============== BUILDERS ==============

function buildIntroTitle(city: City, category: CategoryKey, tier: string): string {
    const pop = city.population;
    const popStr = pop ? ` (${pop.toLocaleString('fr-FR')} habitants)` : '';
    const titles: Record<CategoryKey, string> = {
        gravats: `Évacuation de gravats à ${city.name}${popStr}`,
        encombrants: `Débarras et encombrants à ${city.name}${popStr}`,
        dechets_verts: `Évacuation de déchets verts à ${city.name}${popStr}`,
        dib: `Gestion des DIB à ${city.name}${popStr}`,
    };
    return titles[category];
}

function buildPricingContext(city: City, category: CategoryKey, tier: string): string {
    const pop = city.population || 0;
    const dept = city.department_name;

    if (pop > 200000) {
        return `À ${city.name}, les tarifs de location de benne sont 10 à 20% supérieurs à la moyenne nationale, reflétant la forte demande métropolitaine, les contraintes de circulation et les coûts logistiques urbains. La concurrence entre loueurs permet néanmoins d'obtenir des devis compétitifs en comparant au moins 3 prestataires.`;
    } else if (pop > 50000) {
        return `À ${city.name}, les prix de location de benne se situent dans la tranche haute du département du ${dept}, en raison de la demande soutenue et des contraintes de stationnement en zone urbaine. Un supplément de 50 à 100€ peut s'appliquer pour l'obtention de l'autorisation de voirie, gérée par votre loueur.`;
    } else if (pop > 10000) {
        return `À ${city.name}, les tarifs sont dans la moyenne du département du ${dept}. La proximité de centres de traitement agréés et une concurrence saine entre loueurs locaux maintiennent des prix compétitifs. Le rapport qualité-prix est généralement optimal dans les villes de cette taille.`;
    } else if (pop > 2000) {
        return `À ${city.name}, les prix de location de benne bénéficient de la compétitivité des loueurs du ${dept}. Les frais de transport peuvent légèrement varier en fonction de la distance au dépôt le plus proche. Demandez un devis pour obtenir un tarif exact incluant livraison, location et traitement.`;
    } else {
        return `À ${city.name}, les tarifs de location de benne sont parmi les plus compétitifs du ${dept}. Le poste principal de coût est le transport, qui dépend de la distance au centre de traitement le plus proche. Pour optimiser le budget, regroupez vos besoins en une seule rotation.`;
    }
}

function buildFaq(city: City, category: CategoryKey, tier: string, saisonHaute: string): FaqItem[] {
    const pop = city.population || 0;
    const dept = city.department_name;

    const commonFaqs: FaqItem[] = [
        {
            question: `Faut-il une autorisation pour poser une benne à ${city.name} ?`,
            answer: pop > 50000
                ? `Oui, à ${city.name}, une autorisation d'occupation du domaine public (arrêté de voirie) est obligatoire pour toute benne posée sur la voie publique. Le délai d'obtention est de 8 à 15 jours ouvrés auprès de la mairie. Votre loueur peut généralement gérer cette démarche pour vous. Si la benne est posée sur votre terrain privé, aucune autorisation n'est nécessaire.`
                : pop > 10000
                    ? `À ${city.name}, une autorisation de voirie est généralement requise si la benne est posée sur le trottoir ou la chaussée. Contactez votre mairie ou demandez à votre loueur de s'en occuper (délai habituel : 5 à 10 jours). Sur votre terrain privé, aucune formalité n'est nécessaire.`
                    : `Dans les communes comme ${city.name}, les formalités sont souvent simplifiées. Un simple accord verbal du service voirie de la mairie suffit dans la plupart des cas. Cependant, vérifiez auprès de votre mairie les éventuelles règles locales. Si la benne est sur votre terrain, aucune autorisation n'est nécessaire.`
        },
        {
            question: `Quel est le délai de livraison d'une benne à ${city.name} ?`,
            answer: pop > 50000
                ? `À ${city.name}, la livraison est possible sous 24h, parfois le jour même en fonction de la disponibilité. Les loueurs métropolitains disposent de flottes importantes. Réservez votre benne au moins 48h à l'avance pour garantir le créneau souhaité, surtout entre mars et octobre (haute saison).`
                : pop > 5000
                    ? `À ${city.name}, comptez un délai de 24 à 48h pour la livraison de votre benne. Pendant la haute saison (${saisonHaute}), un délai de 3 à 5 jours peut être nécessaire. Réservez le plus tôt possible pour sécuriser votre date.`
                    : `Pour ${city.name}, le délai de livraison est de 48 à 72h en fonction de la distance au dépôt du loueur le plus proche. En haute saison (${saisonHaute}), prévoyez une semaine d'avance. Vérifiez que votre commune est dans la zone de desserte du loueur.`
        },
    ];

    // Category-specific FAQs
    const categoryFaqs: Record<CategoryKey, FaqItem[]> = {
        gravats: [
            {
                question: `Quelle taille de benne pour mes gravats à ${city.name} ?`,
                answer: `Le choix dépend du volume de travaux : 3m³ pour une salle de bain ou un WC (200-400 kg de gravats), 6m³ pour une cuisine ou une terrasse (500-900 kg), 10m³ pour une démolition de cloisons ou de toiture (1-1,5 tonne). Les gravats étant très lourds (~1,5t/m³), les bennes sont limitées à 10m³ maximum. À ${city.name}, les bennes 6m³ sont les plus demandées.`
            },
            {
                question: `Peut-on mélanger gravats et autres déchets à ${city.name} ?`,
                answer: `Non. Dans le ${dept}, comme partout en France, les gravats (déchets inertes) doivent être triés séparément des autres déchets. Le mélange entraîne un reclassement en « DIB mélangé » avec un surcoût de traitement de 40 à 80%. Si votre chantier produit des gravats ET d'autres déchets, commandez deux bennes séparées : c'est paradoxalement plus économique.`
            },
            {
                question: `Où sont traités les gravats collectés à ${city.name} ?`,
                answer: `Les gravats collectés à ${city.name} sont acheminés vers le centre ISDI (Installation de Stockage de Déchets Inertes) ou la plateforme de recyclage la plus proche dans le ${dept}. Les matériaux recyclables (béton, brique) sont concassés pour devenir des granulats recyclés. Le bordereau de suivi des déchets, fourni par votre loueur, garantit la traçabilité complète.`
            },
        ],
        encombrants: [
            {
                question: `Quelle taille de benne pour un débarras à ${city.name} ?`,
                answer: `Pour un débarras d'appartement T2-T3 : une benne 10m³ suffit généralement. Pour une maison complète avec grenier et garage : prévoyez 20 à 30m³. À ${city.name}, les bennes 10m³ et 15m³ sont les plus commandées. Astuce : les encombrants sont légers mais volumineux — en cas de doute, prenez la taille supérieure.`
            },
            {
                question: `Les appareils électroménagers vont-ils dans la benne ?`,
                answer: `Les « gros blancs » (lave-linge, réfrigérateur, four) doivent idéalement être orientés vers la filière DEEE via le programme « 1 pour 1 » (reprise gratuite par le vendeur lors de l'achat d'un appareil neuf) ou la déchetterie. En pratique, certains loueurs du ${dept} les acceptent dans les bennes encombrants mais les trient au centre de traitement. Vérifiez avec votre prestataire.`
            },
            {
                question: `Combien de temps peut-on garder la benne à ${city.name} ?`,
                answer: `La durée standard de location est de 7 jours. La plupart des loueurs du ${dept} proposent des extensions à la semaine (supplément de 30 à 50€). Sur la voie publique à ${city.name}, la durée est limitée par l'autorisation de voirie (généralement 7 à 15 jours). Sur terrain privé, la durée est plus flexible.`
            },
        ],
        dechets_verts: [
            {
                question: `Quelle benne pour mes déchets verts à ${city.name} ?`,
                answer: `Pour une tonte + taille de haie standard : 3m³. Pour un élagage d'arbre moyen : 6m³. Pour un défrichage de terrain ou un abattage d'arbre : 10 à 20m³. Les déchets verts sont légers (200-400 kg/m³) mais très volumineux. Broyez les branchages avant chargement pour gagner 50% de volume. À ${city.name}, les bennes 6m³ sont les plus courantes.`
            },
            {
                question: `Peut-on brûler ses déchets verts à ${city.name} ?`,
                answer: `Non, le brûlage à l'air libre des déchets verts est interdit partout en France (circulaire du 18/11/2011), y compris à ${city.name}. L'amende est de 450€. Les alternatives légales : la benne de location, le compostage domestique, ou le dépôt en déchetterie du ${dept}. Certaines communes proposent aussi un broyage communal gratuit.`
            },
            {
                question: `Quand tailler et élaguer à ${city.name} ?`,
                answer: `La saison idéale pour vos travaux de jardin à ${city.name} se situe entre ${saisonHaute}. Attention : la taille de haies est réglementairement déconseillée du 15 mars au 31 juillet (période de nidification des oiseaux). L'automne (octobre-novembre) est le meilleur créneau pour les gros élagages et le nettoyage de jardin avant l'hiver.`
            },
        ],
        dib: [
            {
                question: `Quels déchets sont acceptés dans une benne DIB à ${city.name} ?`,
                answer: `Les DIB regroupent tous les déchets non dangereux d'activité : bois (palettes, charpente), métal (tuyaux, ferraille), plastique (PVC, PE), carton d'emballage, plâtre (plaques BA13, enduit), isolants non dangereux (laine de verre, PSE), moquette et revêtements. Attention : les produits chimiques, peintures, huiles et amiante sont des Déchets Dangereux et ne doivent JAMAIS aller dans une benne DIB.`
            },
            {
                question: `Faut-il trier les DIB dans la benne à ${city.name} ?`,
                answer: `Le tri n'est pas obligatoire dans la benne elle-même, mais fortement recommandé. Dans le ${dept}, une benne de DIB triés (un seul matériau) coûte 30 à 50% moins cher qu'une benne de mélange. Pour les chantiers importants, commandez plusieurs petites bennes triées (bois, métal, plâtre) plutôt qu'une grosse benne mélangée. Le décret 7 flux impose le tri séparé sur les chantiers produisant plus de 1100L/semaine.`
            },
            {
                question: `Quel est le prix d'une benne DIB à ${city.name} ?`,
                answer: `Le prix dépend du volume et de la composition des déchets. À ${city.name}, comptez environ 299€ TTC pour un 10m³ tout-venant, 449€ pour un 20m³ et 599€ pour un 30m³. Les bennes triées (mono-matériau) sont 30 à 50% moins chères. Le prix inclut la livraison, 7 jours de location et le traitement en centre agréé du ${dept}.`
            },
        ],
    };

    return [...commonFaqs, ...categoryFaqs[category]];
}
