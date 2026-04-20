import Link from "next/link";
import { CheckCircle, AlertTriangle, Info, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

// Internal Link Component for consistent maillage
function IL({ href, children }: { href: string; children: ReactNode }) {
    return <Link href={href} className="text-amber-600 font-semibold hover:text-amber-500 underline decoration-amber-200 underline-offset-2">{children}</Link>;
}

// Callout Box
function Callout({ type, title, children }: { type: 'info' | 'warning' | 'tip'; title: string; children: ReactNode }) {
    const styles = {
        info: "bg-blue-50 border-blue-200 text-blue-900",
        warning: "bg-red-50 border-red-200 text-red-900",
        tip: "bg-amber-50 border-amber-200 text-amber-900",
    };
    return (
        <div className={`not-prose ${styles[type]} border rounded-2xl p-6 my-8`}>
            <h4 className="font-bold mb-2 text-base">{title}</h4>
            <div className="text-sm leading-relaxed">{children}</div>
        </div>
    );
}

// CTA Block inline
function CTABlock({ text }: { text: string }) {
    return (
        <div className="not-prose bg-amber-500 text-white rounded-2xl p-6 my-8 text-center">
            <p className="font-bold text-lg mb-3">{text}</p>
            <Link href="/devis" className="inline-flex items-center gap-2 bg-white text-amber-600 font-bold px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors">
                Devis Gratuit <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
    );
}

export const guideContents: Record<string, ReactNode> = {

// ═══════════════════════════════════════════════════════════════
// ARTICLE 1 — COMMENT CHOISIR LA TAILLE DE SA BENNE
// ═══════════════════════════════════════════════════════════════
"comment-choisir-taille-benne": (
<>
<p>Choisir la bonne taille de benne est <strong>la décision la plus importante</strong> de votre projet d&apos;évacuation de déchets. Une benne trop petite vous obligera à commander une seconde rotation (150 à 200€ de surcoût). Une benne trop grande, c&apos;est de l&apos;argent gaspillé. Ce guide vous donne les clés pour estimer votre volume avec précision.</p>

<h2>Les 6 tailles de bennes disponibles en France</h2>
<p>Le marché français propose 6 volumes standards. Chaque taille correspond à des usages spécifiques :</p>

<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-slate-50"><tr><th className="px-4 py-3 text-left font-bold">Volume</th><th className="px-4 py-3 text-left font-bold">Dimensions (L×l×h)</th><th className="px-4 py-3 text-left font-bold">Équivalent</th><th className="px-4 py-3 text-left font-bold">Usage principal</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-4 py-3 font-bold text-amber-600">3m³</td><td className="px-4 py-3">3,0 × 1,5 × 0,7m</td><td className="px-4 py-3">~20 brouettes</td><td className="px-4 py-3">SdB, WC, petit mur</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3 font-bold text-amber-600">6m³</td><td className="px-4 py-3">3,5 × 1,8 × 1,0m</td><td className="px-4 py-3">~40 brouettes</td><td className="px-4 py-3">Cuisine, terrasse, cheminée</td></tr>
<tr className="border-t"><td className="px-4 py-3 font-bold text-amber-600">10m³</td><td className="px-4 py-3">4,0 × 1,8 × 1,4m</td><td className="px-4 py-3">~65 brouettes</td><td className="px-4 py-3">Rénovation lourde, mur porteur</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3 font-bold text-amber-600">15m³</td><td className="px-4 py-3">4,5 × 2,0 × 1,7m</td><td className="px-4 py-3">~100 brouettes</td><td className="px-4 py-3">Rénovation complète, débarras</td></tr>
<tr className="border-t"><td className="px-4 py-3 font-bold text-amber-600">20m³</td><td className="px-4 py-3">5,5 × 2,3 × 1,6m</td><td className="px-4 py-3">~130 brouettes</td><td className="px-4 py-3">Vidage de maison, succession</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3 font-bold text-amber-600">30m³</td><td className="px-4 py-3">6,0 × 2,5 × 2,0m</td><td className="px-4 py-3">~200 brouettes</td><td className="px-4 py-3">Chantier pro, succession complète</td></tr>
</tbody>
</table>
</div>

<Callout type="info" title="💡 Attention aux limites de poids">
<p>Les <IL href="/location-benne-gravats">bennes gravats</IL> sont limitées à <strong>10m³ maximum</strong> en raison du poids (densité ~1,5 t/m³). Au-delà, le camion serait en surcharge. Les bennes 15m³ à 30m³ sont réservées aux <IL href="/location-benne-encombrants">encombrants</IL>, <IL href="/location-benne-dechets-verts">déchets verts</IL> et <IL href="/location-benne-dib">DIB</IL> (matériaux plus légers).</p>
</Callout>

<h2>Estimation par type de projet</h2>
<p>Voici des repères concrets pour les projets les plus courants :</p>

<h3>Rénovation de salle de bain</h3>
<p>Démolition de carrelage sol et murs, dépose de baignoire/douche, remplacement des sanitaires : comptez <strong>1,5 à 3m³ de gravats</strong>. Une benne 3m³ suffit dans la plupart des cas. Si vous remplacez également la cloison séparative, passez à 6m³.</p>

<h3>Rénovation de cuisine</h3>
<p>Dépose de l&apos;ancien plan de travail, meubles hauts et bas, crédence en carrelage, sol : <strong>2 à 4m³</strong> de déchets mixtes (gravats + mobilier). Si les vieux meubles de cuisine sont en bon état, donnez-les. Sinon, prévoyez une <IL href="/location-benne-encombrants">benne encombrants</IL> de 6m³.</p>

<h3>Vidage de maison complète (succession)</h3>
<p>C&apos;est le projet le plus volumineux. Comptez <strong>15 à 30m³</strong> selon la taille du logement :</p>
<ul>
<li><strong>T2-T3 (appartement)</strong> : 10 à 15m³</li>
<li><strong>Maison 4-5 pièces</strong> : 20 à 25m³</li>
<li><strong>Maison + grenier + cave + garage</strong> : 25 à 30m³</li>
</ul>

<h3>Élagage d&apos;arbre / Défrichage</h3>
<p>Un arbre de taille moyenne (8-10m) produit <strong>5 à 10m³ de branchages</strong>. Astuce : si vous broyez les branches avant chargement, vous réduisez le volume de <strong>50 à 70%</strong>. Location de broyeur : ~80€/jour. En savoir plus dans notre guide sur les <IL href="/guides/dechets-verts-reglementation-brulage">alternatives au brûlage des déchets verts</IL>.</p>

<h2>La règle d&apos;or : toujours prendre la taille au-dessus</h2>
<p>C&apos;est le conseil n°1 de tous les professionnels du BTP. La différence de prix entre deux tailles consécutives est de <strong>40 à 80€</strong>. Le prix d&apos;une seconde rotation (re-livraison d&apos;une benne supplémentaire) est de <strong>150 à 200€</strong>. Le calcul est vite fait :</p>

<div className="not-prose bg-green-50 border border-green-200 rounded-2xl p-6 my-8">
<p className="font-bold text-green-800 text-base mb-2">✅ Benne 6m³ (279€) &gt; Benne 3m³ (179€) + rotation 3m³ (179€ + ~150€ livraison)</p>
<p className="text-sm text-green-700">Surcoût de la taille supérieure : <strong>+100€</strong>. Surcoût d&apos;une seconde benne : <strong>+329€</strong>. Économie : <strong>229€</strong>.</p>
</div>

<h2>Comment mesurer vos déchets avant de commander</h2>
<p>Trois méthodes simples :</p>
<ol>
<li><strong>Le repère brouette</strong> : comptez le nombre de brouettes de 80L que vous allez remplir. Divisez par 12,5 pour obtenir le volume en m³.</li>
<li><strong>Le calcul de surface</strong> : pour du carrelage, multipliez la surface au sol (m²) par l&apos;épaisseur (0,05 à 0,15m) = volume en m³ de gravats.</li>
<li><strong>La photo</strong> : envoyez une photo de vos déchets au loueur. Les professionnels savent estimer le volume d&apos;un seul coup d&apos;œil.</li>
</ol>

<CTABlock text="Vous hésitez encore ? Décrivez votre projet et recevez une recommandation de volume personnalisée." />

<h2>Tableau récapitulatif par type de déchet</h2>
<p>Le volume maximal dépend aussi du <strong>type de déchets</strong>. Consultez nos pages spécialisées pour des informations détaillées :</p>
<ul>
<li><IL href="/location-benne-gravats">Benne Gravats</IL> : 3m³ à 10m³ (max poids ~15 tonnes)</li>
<li><IL href="/location-benne-encombrants">Benne Encombrants</IL> : 3m³ à 30m³ (objets légers mais volumineux)</li>
<li><IL href="/location-benne-dechets-verts">Benne Déchets Verts</IL> : 3m³ à 30m³ (très volumineux, peu denses)</li>
<li><IL href="/location-benne-dib">Benne DIB</IL> : 10m³ à 30m³ (déchets mixtes de chantier)</li>
</ul>
<p>Pour une comparaison complète des tarifs, consultez notre <IL href="/guides/prix-location-benne-guide-complet">guide des prix 2026</IL>.</p>
</>
),

// ═══════════════════════════════════════════════════════════════
// ARTICLE 2 — PRIX LOCATION DE BENNE
// ═══════════════════════════════════════════════════════════════
"prix-location-benne-guide-complet": (
<>
<p>Combien coûte réellement la location d&apos;une benne en 2026 ? Entre les différences de volume, de type de déchets, les surcoûts cachés et les variations régionales, il est facile de s&apos;y perdre. Ce guide détaille <strong>tous les prix réels</strong> du marché français, avec les pièges à éviter.</p>

<h2>Grille tarifaire complète 2026</h2>
<p>Les tarifs ci-dessous sont des <strong>moyennes nationales TTC</strong> basées sur plus de 500 devis analysés. Ils incluent la livraison, 7 jours de location et le traitement des déchets au centre agréé :</p>

<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-amber-50"><tr><th className="px-3 py-3 text-left font-bold">Volume</th><th className="px-3 py-3 text-center font-bold">Gravats</th><th className="px-3 py-3 text-center font-bold">Encombrants</th><th className="px-3 py-3 text-center font-bold">Déchets Verts</th><th className="px-3 py-3 text-center font-bold">DIB</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-3 py-3 font-bold">3m³</td><td className="px-3 py-3 text-center">179€</td><td className="px-3 py-3 text-center">149€</td><td className="px-3 py-3 text-center">129€</td><td className="px-3 py-3 text-center text-slate-400">—</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-bold">6m³</td><td className="px-3 py-3 text-center">279€</td><td className="px-3 py-3 text-center">219€</td><td className="px-3 py-3 text-center">199€</td><td className="px-3 py-3 text-center text-slate-400">—</td></tr>
<tr className="border-t"><td className="px-3 py-3 font-bold">10m³</td><td className="px-3 py-3 text-center">399€</td><td className="px-3 py-3 text-center">299€</td><td className="px-3 py-3 text-center">269€</td><td className="px-3 py-3 text-center">299€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-bold">15m³</td><td className="px-3 py-3 text-center text-slate-400">—</td><td className="px-3 py-3 text-center">369€</td><td className="px-3 py-3 text-center">339€</td><td className="px-3 py-3 text-center">399€</td></tr>
<tr className="border-t"><td className="px-3 py-3 font-bold">20m³</td><td className="px-3 py-3 text-center text-slate-400">—</td><td className="px-3 py-3 text-center">449€</td><td className="px-3 py-3 text-center">399€</td><td className="px-3 py-3 text-center">449€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-bold">30m³</td><td className="px-3 py-3 text-center text-slate-400">—</td><td className="px-3 py-3 text-center">599€</td><td className="px-3 py-3 text-center">499€</td><td className="px-3 py-3 text-center">599€</td></tr>
</tbody>
</table>
</div>

<p><em>Le &quot;—&quot; indique que le volume n&apos;est pas disponible pour ce type de déchet. Les <IL href="/location-benne-gravats">gravats</IL> sont limités à 10m³ en raison de leur poids élevé.</em></p>

<h2>Pourquoi les prix varient-ils autant ?</h2>
<p>Plusieurs facteurs expliquent les écarts de prix entre deux devis pour la même prestation :</p>

<h3>1. La localisation géographique</h3>
<p>La distance entre votre adresse et le centre de traitement le plus proche est le facteur n°1. En zone urbaine dense (Paris, Lyon, Marseille), la concurrence entre loueurs tire les prix vers le bas. En zone rurale éloignée, les frais de transport peuvent majorer le tarif de <strong>20 à 40%</strong>.</p>

<h3>2. Le type de déchets</h3>
<p>Chaque type de déchet suit une filière de traitement différente, avec des coûts de traitement distincts :</p>
<ul>
<li><strong>Déchets verts</strong> → Compostage (coût le plus faible, ~20-40€/tonne)</li>
<li><strong>Gravats</strong> → ISDI ou recyclage (~30-50€/tonne)</li>
<li><strong>Encombrants</strong> → Centre de tri (~50-80€/tonne)</li>
<li><strong>DIB tout-venant</strong> → Centre de tri + enfouissement (~80-120€/tonne)</li>
</ul>

<h3>3. Le degré de tri</h3>
<p>Un point crucial, surtout pour les <IL href="/location-benne-dib">DIB</IL> : une benne de déchets <strong>triés</strong> (mono-matériau) coûte 30 à 50% moins cher qu&apos;une benne de déchets mélangés. La ferraille est même souvent reprise <strong>gratuitement</strong> car elle a une valeur de revente. Consultez notre <IL href="/guides/tri-dechets-chantier-guide">guide du décret 7 flux</IL> pour en savoir plus.</p>

<Callout type="warning" title="⚠️ Les 5 surcoûts cachés à surveiller">
<ol className="space-y-2">
<li><strong>Dépassement de poids</strong> : le loueur pèse la benne au retour. Tout dépassement du tonnage maximal est facturé 15 à 30€/tonne supplémentaire.</li>
<li><strong>Remplissage excessif</strong> : si vos déchets dépassent le bord supérieur de la benne, le chauffeur peut refuser l&apos;enlèvement ou facturer un supplément de 50 à 100€.</li>
<li><strong>Mauvais tri</strong> : des gravats dans une benne déchets verts = reclassement en DIB tout-venant, avec un surcoût de 40 à 80%.</li>
<li><strong>Jours supplémentaires</strong> : au-delà de 7 jours, comptez 5 à 15€/jour de pénalité.</li>
<li><strong>Attente du camion</strong> : si le camion ne peut pas accéder à la benne ou doit attendre, des frais d&apos;attente de 30 à 50€/demi-heure s&apos;appliquent.</li>
</ol>
</Callout>

<h2>Comment économiser sur votre location de benne</h2>
<h3>Astuce n°1 : Comparez au moins 3 devis</h3>
<p>Les prix peuvent varier de <strong>30 à 50%</strong> entre deux loueurs pour la même prestation. En 2 minutes, vous pouvez obtenir plusieurs devis comparatifs via notre formulaire.</p>

<h3>Astuce n°2 : Triez vos déchets</h3>
<p>Deux bennes triées (une gravats + une encombrants) coûtent souvent <strong>moins cher</strong> qu&apos;une seule grande benne tout-venant. Et vous respectez le <IL href="/guides/tri-dechets-chantier-guide">décret 7 flux</IL>.</p>

<h3>Astuce n°3 : Commandez hors saison</h3>
<p>Les tarifs sont plus compétitifs en <strong>novembre-février</strong> (basse saison). Le printemps et l&apos;été sont les périodes les plus chargées, avec une demande forte en <IL href="/location-benne-dechets-verts">bennes déchets verts</IL>.</p>

<h3>Astuce n°4 : Prenez la taille au-dessus</h3>
<p>Comme expliqué dans notre <IL href="/guides/comment-choisir-taille-benne">guide des tailles de bennes</IL>, le surcoût d&apos;une taille supérieure (40-80€) est toujours inférieur au prix d&apos;une seconde rotation (150-200€).</p>

<CTABlock text="Comparez les prix dans votre ville en 2 minutes" />
</>
),

// ═══════════════════════════════════════════════════════════════
// ARTICLE 3 — AUTORISATION DE VOIRIE
// ═══════════════════════════════════════════════════════════════
"autorisation-voirie-benne-guide": (
<>
<p>Poser une benne sur le trottoir, la rue ou le parking devant chez vous n&apos;est pas un geste anodin. En France, <strong>toute occupation de la voie publique par une benne nécessite une autorisation de voirie</strong> délivrée par la mairie. Sans cette autorisation, vous risquez une <strong>contravention de 38 à 135€</strong> et l&apos;enlèvement immédiat de la benne par la fourrière. Ce guide vous explique tout.</p>

<h2>Tout terrain privé, aucune autorisation ?</h2>
<p>La première question est simple : <strong>où comptez-vous poser votre benne ?</strong></p>
<ul>
<li><strong>Sur votre terrain privé</strong> (cour, jardin, allée, parking privé) : aucune autorisation nécessaire. Vous êtes chez vous.</li>
<li><strong>Sur la voie publique</strong> (trottoir, chaussée, parking public, accotement) : autorisation de voirie <strong>obligatoire</strong>.</li>
</ul>

<Callout type="tip" title="💡 Privilégiez toujours le terrain privé">
<p>Si vous avez la possibilité de faire livrer la benne sur votre terrain, faites-le. Vous économisez les frais d&apos;autorisation (50 à 150€), les délais administratifs (5 à 15 jours), et vous n&apos;avez aucune contrainte de durée.</p>
</Callout>

<h2>Comment obtenir l&apos;autorisation de voirie</h2>
<h3>Étape 1 — Identifier le bon service</h3>
<p>Contactez le <strong>service voirie</strong> de votre mairie (ou le service urbanisme dans les petites communes). La plupart des mairies disposent désormais d&apos;un formulaire en ligne sur leur site web.</p>

<h3>Étape 2 — Constituer le dossier</h3>
<p>Le dossier d&apos;autorisation comprend généralement :</p>
<ul>
<li>Le formulaire de demande d&apos;occupation du domaine public (cerfa ou formulaire municipal)</li>
<li>Un plan de situation indiquant l&apos;emplacement exact de la benne</li>
<li>La durée d&apos;occupation prévue (7 à 15 jours en général)</li>
<li>Les dimensions de la benne (longueur × largeur)</li>
<li>Les coordonnées du loueur de bennes</li>
</ul>

<h3>Étape 3 — Délais et tarifs</h3>
<div className="not-prose overflow-x-auto my-6">
<table className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden text-sm">
<thead className="bg-slate-50"><tr><th className="px-4 py-3 text-left font-bold">Taille de commune</th><th className="px-4 py-3 text-center font-bold">Délai d&apos;obtention</th><th className="px-4 py-3 text-center font-bold">Prix moyen</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-4 py-3">Petite commune (&lt;5 000 hab.)</td><td className="px-4 py-3 text-center">3 à 7 jours</td><td className="px-4 py-3 text-center">30 à 50€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">Ville moyenne (5 000 - 50 000)</td><td className="px-4 py-3 text-center">7 à 10 jours</td><td className="px-4 py-3 text-center">50 à 100€</td></tr>
<tr className="border-t"><td className="px-4 py-3">Grande ville (&gt;50 000 hab.)</td><td className="px-4 py-3 text-center">10 à 15 jours</td><td className="px-4 py-3 text-center">80 à 150€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">Paris et petite couronne</td><td className="px-4 py-3 text-center">15 à 21 jours</td><td className="px-4 py-3 text-center">100 à 200€</td></tr>
</tbody>
</table>
</div>

<h3>Étape 4 — Obligations pendant l&apos;occupation</h3>
<p>Une fois l&apos;autorisation obtenue, vous devez respecter certaines obligations :</p>
<ul>
<li><strong>Signalisation</strong> : la benne doit être signalée par des bandes rétro-réfléchissantes (le loueur s&apos;en charge).</li>
<li><strong>Éclairage nocturne</strong> : des feux clignotants ou des plots lumineux sont obligatoires si la benne est sur la chaussée.</li>
<li><strong>Durée</strong> : la benne ne doit pas rester au-delà de la durée autorisée.</li>
<li><strong>Propreté</strong> : vous devez nettoyer les abords de la benne et éviter toute nuisance pour les riverains.</li>
</ul>

<Callout type="info" title="🏗️ Votre loueur peut s'en charger">
<p>La plupart des loueurs de bennes proposent de <strong>gérer l&apos;autorisation de voirie pour vous</strong>, moyennant un supplément de 50 à 100€. C&apos;est un gain de temps appréciable. Précisez-le au moment de votre <IL href="/devis">demande de devis</IL>.</p>
</Callout>

<h2>Cas particuliers</h2>
<h3>Copropriété</h3>
<p>Si vous habitez en copropriété et souhaitez poser la benne dans la cour de l&apos;immeuble (terrain privé commun), vous devez obtenir l&apos;accord du syndic de copropriété en plus de l&apos;autorisation de voirie si la benne déborde sur la voie publique.</p>

<h3>Zone protégée (ABF)</h3>
<p>Dans les périmètres de protection des monuments historiques, des contraintes supplémentaires peuvent s&apos;appliquer (durée limitée, benne bâchée, couleur imposée). Renseignez-vous auprès de votre mairie.</p>

<p>Pour choisir la benne adaptée à votre projet, consultez notre <IL href="/guides/comment-choisir-taille-benne">guide des tailles de bennes</IL> ou notre <IL href="/guides/prix-location-benne-guide-complet">grille tarifaire complète</IL>.</p>

<CTABlock text="Votre loueur gère l'autorisation de voirie pour vous. Demandez votre devis." />
</>
),

// ═══════════════════════════════════════════════════════════════
// ARTICLE 4 — TRI DES DÉCHETS DE CHANTIER / DÉCRET 7 FLUX
// ═══════════════════════════════════════════════════════════════
"tri-dechets-chantier-guide": (
<>
<p>Le <strong>décret n° 2016-288</strong>, dit &quot;décret 7 flux&quot;, impose depuis 2016 le tri séparé de 7 catégories de déchets à tous les professionnels du BTP. Depuis 2025, les obligations se sont encore renforcées. Ce guide détaille qui est concerné, quels matériaux trier, et les <strong>sanctions encourues</strong> en cas de non-respect.</p>

<h2>Qui est concerné par le décret 7 flux ?</h2>
<p>Le décret s&apos;applique à <strong>tout producteur de déchets non dangereux</strong> qui produit ou détient plus de <strong>1 100 litres de déchets par semaine</strong> sur un même site. En pratique, cela concerne :</p>
<ul>
<li>Les entreprises du BTP (gros œuvre, second œuvre, démolition)</li>
<li>Les artisans du bâtiment (plaquistes, menuisiers, plombiers, électriciens)</li>
<li>Les entreprises de déménagement et de débarras</li>
<li>Les collectivités locales pour leurs chantiers</li>
<li>Les particuliers ne sont <strong>pas directement concernés</strong> mais bénéficient du tri via les tarifs réduits</li>
</ul>

<h2>Les 7 catégories de tri obligatoire</h2>
<div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
{[
    { name: "Papier / Carton", emoji: "📦", examples: "Emballages, cartons, papiers" },
    { name: "Métal", emoji: "⚙️", examples: "Tuyaux, ferraille, armatures" },
    { name: "Plastique", emoji: "♻️", examples: "PVC, polyéthylène, films" },
    { name: "Verre", emoji: "🪟", examples: "Vitrage, miroirs, bouteilles" },
    { name: "Bois", emoji: "🪵", examples: "Palettes, charpente, plancher" },
    { name: "Textile", emoji: "👕", examples: "Moquettes, tissus, feutres" },
    { name: "Plâtre", emoji: "🏗️", examples: "BA13, enduits, carreaux" },
].map((c, i) => (
    <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
        <span className="text-3xl block mb-2">{c.emoji}</span>
        <span className="font-bold text-slate-900 text-sm block">{c.name}</span>
        <span className="text-xs text-slate-500">{c.examples}</span>
    </div>
))}
<div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
    <span className="text-3xl block mb-2">🪨</span>
    <span className="font-bold text-amber-800 text-sm block">+ Gravats (8ᵉ flux)</span>
    <span className="text-xs text-amber-600">Depuis 2023, ajout inertes</span>
</div>
</div>

<Callout type="warning" title="💸 Sanctions en cas de non-respect">
<p><strong>Personne physique</strong> : amende de 150€ par infraction constatée.<br/>
<strong>Personne morale</strong> : amende de 750€ par infraction.<br/>
En cas de récidive, les montants peuvent être multipliés. La DREAL (Direction Régionale de l&apos;Environnement) peut effectuer des contrôles inopinés sur les chantiers.</p>
</Callout>

<h2>Mise en pratique sur un chantier</h2>
<h3>Option 1 — Plusieurs bennes triées (recommandé)</h3>
<p>Pour un chantier important, commandez <strong>plusieurs bennes mono-matériau</strong> :</p>
<ul>
<li>Une <IL href="/location-benne-gravats">benne gravats</IL> pour le béton, les briques, les tuiles</li>
<li>Une benne bois pour les palettes, charpentes, menuiseries</li>
<li>Une benne plâtre pour les plaques BA13 et enduits</li>
</ul>
<p><strong>Résultat</strong> : économie de 30 à 50% sur les coûts de traitement par rapport à une benne <IL href="/location-benne-dib">DIB tout-venant</IL>.</p>

<h3>Option 2 — Une seule benne tout-venant</h3>
<p>Pour les petits chantiers (&lt; 1 100L/semaine), une seule benne DIB tout-venant est acceptable. Les déchets seront triés au centre de traitement, mais le coût de tri est répercuté sur vous — d&apos;où un prix plus élevé par m³.</p>

<h2>Traçabilité : le Bordereau de Suivi des Déchets (BSD)</h2>
<p>Depuis la <strong>loi AGEC (2020)</strong>, tout producteur de déchets du BTP doit conserver un <strong>Bordereau de Suivi des Déchets (BSD)</strong> pendant 3 ans minimum. Ce document, fourni par votre loueur de bennes, atteste de la bonne élimination de vos déchets et vous protège en cas de contrôle.</p>

<p>Consultez notre <IL href="/guides/prix-location-benne-guide-complet">comparatif des prix</IL> pour voir l&apos;avantage financier du tri, ou notre guide sur l&apos;<IL href="/guides/evacuation-gravats-guide-complet">évacuation des gravats</IL> pour les options spécifiques aux déchets inertes.</p>

<CTABlock text="Besoin de bennes triées pour votre chantier ? Devis multi-bennes en 2 minutes." />
</>
),

// ═══════════════════════════════════════════════════════════════
// ARTICLE 5 — ÉVACUATION DE GRAVATS
// ═══════════════════════════════════════════════════════════════
"evacuation-gravats-guide-complet": (
<>
<p>Votre chantier de rénovation génère des gravats et vous ne savez pas comment les évacuer ? Il existe <strong>5 solutions principales</strong>, chacune avec ses avantages, inconvénients et fourchettes de prix. Ce guide comparatif vous aide à choisir la meilleure option selon votre volume, votre budget et votre situation.</p>

<h2>Comparatif des 5 solutions</h2>
<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-amber-50"><tr><th className="px-3 py-3 text-left font-bold">Solution</th><th className="px-3 py-3 text-center font-bold">Volume</th><th className="px-3 py-3 text-center font-bold">Prix</th><th className="px-3 py-3 text-center font-bold">Note</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-3 py-3 font-semibold">🚛 Benne de location</td><td className="px-3 py-3 text-center">3 à 10m³</td><td className="px-3 py-3 text-center">179-399€</td><td className="px-3 py-3 text-center font-bold text-green-600">⭐⭐⭐⭐⭐</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-semibold">🏭 Déchetterie</td><td className="px-3 py-3 text-center">&lt;1m³</td><td className="px-3 py-3 text-center">Gratuit*</td><td className="px-3 py-3 text-center font-bold text-green-600">⭐⭐⭐⭐</td></tr>
<tr className="border-t"><td className="px-3 py-3 font-semibold">💼 Big Bag (1m³)</td><td className="px-3 py-3 text-center">0,5 à 1m³</td><td className="px-3 py-3 text-center">80-150€</td><td className="px-3 py-3 text-center font-bold text-amber-600">⭐⭐⭐</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-semibold">🧺 Sacs à gravats</td><td className="px-3 py-3 text-center">&lt;0,1m³</td><td className="px-3 py-3 text-center">3-5€/sac</td><td className="px-3 py-3 text-center font-bold text-amber-600">⭐⭐</td></tr>
<tr className="border-t"><td className="px-3 py-3 font-semibold">🧹 Entreprise de débarras</td><td className="px-3 py-3 text-center">Illimité</td><td className="px-3 py-3 text-center">500-2000€</td><td className="px-3 py-3 text-center font-bold text-orange-600">⭐⭐</td></tr>
</tbody>
</table>
</div>
<p className="text-sm text-slate-500"><em>* Gratuit pour les particuliers dans la limite du quota communal (souvent 1m³ par visite)</em></p>

<h2>Solution 1 — La benne de location (notre recommandation)</h2>
<p>La <IL href="/location-benne-gravats">benne à gravats</IL> est la solution la plus efficace pour les volumes de <strong>1 à 10m³</strong>. Elle est livrée devant votre chantier, vous la remplissez à votre rythme pendant 7 jours, puis le loueur la récupère et s&apos;occupe de tout (transport + traitement ISDI).</p>
<p><strong>Avantages</strong> : aucun effort de transport, 7 jours de disponibilité, traçabilité BSD, aucun aller-retour en voiture. <strong>Inconvénient</strong> : nécessite un espace de pose (4m × 2,5m) et une <IL href="/guides/autorisation-voirie-benne-guide">autorisation de voirie</IL> si posée sur la voie publique.</p>

<h2>Solution 2 — La déchetterie municipale</h2>
<p>La déchetterie est la solution <strong>gratuite</strong> pour les particuliers, dans la limite des quotas communaux (souvent 1m³ par visite, 2 à 4 visites/an). Idéale pour un petit volume de gravats (réfection d&apos;une douche, remplacement d&apos;un carrelage dans les toilettes).</p>
<p><strong>Avantages</strong> : gratuit. <strong>Inconvénients</strong> : volume limité, allers-retours en voiture/utilitaire, horaires d&apos;ouverture, files d&apos;attente le samedi.</p>

<h2>Solution 3 — Le Big Bag</h2>
<p>Le Big Bag est un gros sac en toile d&apos;environ <strong>1m³</strong>, livré chez vous et collecté plein par le loueur. Prix : 80 à 150€ selon la commune. C&apos;est l&apos;intermédiaire entre les sacs à gravats et la benne.</p>
<p><strong>Avantages</strong> : peu encombrant, livrable partout. <strong>Inconvénients</strong> : volume limité à 1m³, coûteux au m³ (80-150€/m³ vs 40-60€/m³ pour une benne).</p>

<h2>Solution 4 — Les sacs à gravats</h2>
<p>Sacs renforcés de 25 à 50 kg, vendus en magasin de bricolage (3 à 5€ pièce). Vous les remplissez et les apportez vous-même à la déchetterie.</p>
<p><strong>Avantages</strong> : pas de livraison, commencez immédiatement. <strong>Inconvénients</strong> : limité à de très petits volumes, allers-retours déchetterie, très coûteux au m³ pour les gros volumes.</p>

<h2>Solution 5 — L&apos;entreprise de débarras</h2>
<p>Prestation clé en main : l&apos;entreprise vient, charge et évacue vos gravats. Prix élevé (500 à 2000€) mais aucun effort de votre part. Adapté aux personnes ne pouvant pas charger elles-mêmes (personnes âgées, absence prolongée).</p>

<h2>Quelle solution choisir ?</h2>
<p>Le choix dépend principalement du <strong>volume</strong> :</p>
<ul>
<li><strong>Moins de 0,5m³</strong> : sacs à gravats + déchetterie (gratuit)</li>
<li><strong>0,5 à 1m³</strong> : Big Bag (80-150€) ou déchetterie</li>
<li><strong>1 à 10m³</strong> : <IL href="/location-benne-gravats">benne de location</IL> (179-399€) — meilleur rapport qualité/prix</li>
<li><strong>Besoin de zéro effort</strong> : entreprise de débarras (500-2000€)</li>
</ul>

<p>Consultez notre <IL href="/guides/comment-choisir-taille-benne">guide des tailles</IL> pour choisir le volume optimal, et notre <IL href="/guides/prix-location-benne-guide-complet">grille tarifaire</IL> pour comparer les prix par ville.</p>

<CTABlock text="Faites évacuer vos gravats sans effort. Devis benne en 2 minutes." />
</>
),

// ═══════════════════════════════════════════════════════════════
// ARTICLE 6 — BRÛLAGE DÉCHETS VERTS INTERDIT
// ═══════════════════════════════════════════════════════════════
"dechets-verts-reglementation-brulage": (
<>
<p>Chaque printemps, c&apos;est la même question : &quot;Puis-je brûler mes déchets de jardin ?&quot; La réponse est catégorique : <strong>non</strong>. Le brûlage à l&apos;air libre des déchets verts est <strong>interdit partout en France</strong> depuis la circulaire du 18 novembre 2011, renforcée par l&apos;article 84 de la <strong>loi Climat & Résilience (2021)</strong>. L&apos;amende est de <strong>450€</strong>. Ce guide explique pourquoi, et vous présente <strong>6 alternatives légales</strong>.</p>

<h2>Pourquoi le brûlage est-il interdit ?</h2>
<p>Le brûlage à l&apos;air libre des déchets verts pose <strong>trois problèmes majeurs</strong> :</p>

<h3>1. Pollution de l&apos;air</h3>
<p>La combustion de végétaux humides (herbe de tonte, feuilles) produit de grandes quantités de <strong>particules fines (PM2,5 et PM10)</strong>, de monoxyde de carbone (CO) et de composés organiques volatils (COV). Selon l&apos;ADEME, <strong>brûler 50 kg de végétaux émet autant de particules que 13 000 km en voiture diesel</strong>.</p>

<h3>2. Risque d&apos;incendie</h3>
<p>Le vent peut projeter des braises à plusieurs dizaines de mètres. En période sèche, le risque de propagation est réel. Les pompiers interviennent chaque année pour des feux de jardins qui se sont échappés.</p>

<h3>3. Nuisances de voisinage</h3>
<p>La fumée constitue un <strong>trouble anormal du voisinage</strong> (article 1240 du Code civil). Vos voisins peuvent porter plainte et obtenir des dommages-intérêts en plus de l&apos;amende pénale.</p>

<Callout type="warning" title="⚖️ Ce que dit la loi">
<p><strong>Circulaire du 18/11/2011</strong> : interdit le brûlage en tout lieu et à tout moment.<br/>
<strong>Loi Climat & Résilience (2021), article 84</strong> : renforce l&apos;interdiction et le montant des amendes.<br/>
<strong>Amende</strong> : 450€ (contravention de 3ᵉ classe).<br/>
<strong>Aucune dérogation </strong>: même en zone rurale, même avec l&apos;accord des voisins, même &quot;depuis toujours&quot;.</p>
</Callout>

<h2>Les 6 alternatives légales au brûlage</h2>

<h3>1. Compostage domestique</h3>
<p>La solution la plus écologique. Feuilles mortes, tontes fines, résidus de potager : tout se composte en <strong>3 à 6 mois</strong>. De nombreuses communes offrent des composteurs gratuits. Idéal pour les <strong>petits volumes réguliers</strong> (&lt; 2m³/an).</p>

<h3>2. Broyage + paillage</h3>
<p>Broyez vos branches à l&apos;aide d&apos;un broyeur de végétaux (location ~80€/jour) et utilisez les copeaux comme <strong>paillage naturel</strong> au pied de vos arbres et massifs. Doublement vertueux : vous éliminez vos déchets et vous nourrissez vos sols.</p>

<h3>3. Location de benne déchets verts</h3>
<p>Pour les <strong>gros volumes</strong> (élagage, abattage d&apos;arbre, défrichage, obligation OLD), la <IL href="/location-benne-dechets-verts">benne déchets verts</IL> est la solution la plus rapide. Les déchets sont acheminés vers une plateforme de compostage industriel agréée. Tarifs : <strong>129€ (3m³) à 499€ (30m³)</strong>.</p>

<h3>4. Déchetterie municipale</h3>
<p>Gratuit pour les particuliers, dans la limite des quotas (souvent 1m³ par visite). Pratique pour les tontes régulières ou les petites tailles de haies.</p>

<h3>5. Ramassage communal</h3>
<p>Beaucoup de communes organisent des collectes de déchets verts en porte-à-porte (bacs verts, sacs biodégradables). Renseignez-vous auprès de votre mairie. Ce service est généralement inclus dans la taxe d&apos;enlèvement des ordures ménagères.</p>

<h3>6. Tonte mulching</h3>
<p>Les tondeuses mulching broient l&apos;herbe très finement et la redéposent directement sur le gazon. Résultat : <strong>zéro déchet de tonte</strong>, et un gazon mieux nourri. L&apos;herbe se décompose en 24-48h.</p>

<h2>Obligation Légale de Débroussaillage (OLD)</h2>
<p>Si vous habitez en zone à risque d&apos;incendie (communes classées dans le sud, le sud-est, la Corse et certaines zones de l&apos;ouest), vous êtes soumis à l&apos;<strong>Obligation Légale de Débroussaillage</strong> : débroussailler 50m autour de votre habitation (jusqu&apos;à 200m dans certaines zones). Le non-respect est passible de <strong>30 à 60€/m²</strong>.</p>
<p>Ces travaux génèrent des volumes importants : comptez 10 à 20m³ pour un terrain de 1000m². La location d&apos;une <IL href="/location-benne-dechets-verts">benne 20m³</IL> à 399€ est souvent la solution la plus économique.</p>

<h2>Calendrier des travaux de jardin</h2>
<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden text-sm">
<thead className="bg-green-50"><tr><th className="px-4 py-3 text-left font-bold">Période</th><th className="px-4 py-3 text-left font-bold">Travaux recommandés</th><th className="px-4 py-3 text-center font-bold">Volume typique</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-4 py-3">Mars-Avril</td><td className="px-4 py-3">Première tonte, nettoyage de printemps, taille des rosiers</td><td className="px-4 py-3 text-center">3-6m³</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">Mai-Juin</td><td className="px-4 py-3">Tontes régulières, taille de haies de printemps</td><td className="px-4 py-3 text-center">3-6m³</td></tr>
<tr className="border-t"><td className="px-4 py-3">Septembre-Oct.</td><td className="px-4 py-3">Élagage, abattage, ramassage feuilles — pic de volume</td><td className="px-4 py-3 text-center">6-20m³</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">Nov.-Février</td><td className="px-4 py-3">Gros élagages (hors nidification), défrichage</td><td className="px-4 py-3 text-center">10-30m³</td></tr>
</tbody>
</table>
</div>
<p><em>Important : la taille des haies est réglementairement déconseillée du <strong>15 mars au 31 juillet</strong> (période de nidification, article L. 411-1 du Code de l&apos;environnement).</em></p>

<p>Pour tout savoir sur les prix et volumes, consultez notre <IL href="/guides/comment-choisir-taille-benne">guide des tailles de bennes</IL> et la <IL href="/location-benne-dechets-verts">page dédiée aux bennes déchets verts</IL>.</p>

<CTABlock text="Évacuez vos déchets de jardin légalement. Benne livrée en 24h." />
</>
),

// ═══════════════════════════════════════════════════════════════
// ARTICLE 7 — LOCATION DE BENNE POUR DÉMÉNAGEMENT
// ═══════════════════════════════════════════════════════════════
"location-benne-demenagement": (
<>
<p>Un déménagement ne se résume pas à remplir des cartons et louer un camion. Entre les vieux meubles irrécupérables, la moquette arrachée, le canapé trop usé pour être donné et les gravats d&apos;une cloison abattue, <strong>un déménagement génère en moyenne 3 à 20m³ de déchets</strong>. La location d&apos;une benne est souvent la solution la plus simple et la plus économique pour tout évacuer en une seule fois.</p>

<h2>Pourquoi louer une benne pour un déménagement ?</h2>
<p>La plupart des personnes qui déménagent sous-estiment le volume de déchets à évacuer. Résultat : des allers-retours en déchetterie qui s&apos;accumulent, un utilitaire loué à la journée qui coûte cher, et un stress supplémentaire un jour déjà éprouvant. La benne change la donne :</p>
<ul>
<li><strong>Gain de temps considérable</strong> : la benne est livrée devant votre domicile 24 à 48h avant le jour J. Vous la remplissez à votre rythme pendant 7 jours.</li>
<li><strong>Zéro aller-retour en déchetterie</strong> : fini les 4-5 trajets en voiture chargée. Le loueur récupère la benne pleine et gère le traitement.</li>
<li><strong>Traçabilité légale</strong> : vous recevez un Bordereau de Suivi des Déchets (BSD), obligatoire depuis la <strong>loi AGEC (2020)</strong>.</li>
<li><strong>Économie réelle</strong> : à partir de 2m³ de déchets, la benne est plus rentable que les solutions alternatives (utilitaire + essence + déchetterie).</li>
</ul>

<Callout type="tip" title="💡 Le bon timing pour commander">
<p>Commandez votre benne <strong>au moins 5 jours avant le déménagement</strong>. Cela vous laisse le temps de trier et charger progressivement, sans pression le jour J. Si la benne est posée sur la voie publique, prévoyez un délai supplémentaire pour l&apos;<IL href="/guides/autorisation-voirie-benne-guide">autorisation de voirie</IL> (5 à 15 jours selon la commune).</p>
</Callout>

<h2>Quelle taille de benne choisir pour un déménagement ?</h2>
<p>Le volume de déchets dépend du type de logement, de la durée d&apos;occupation (plus on accumule, plus on jette) et du type de déménagement (simple départ vs. rénovation avant relocation). Voici des repères concrets :</p>

<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-amber-50"><tr><th className="px-4 py-3 text-left font-bold">Situation</th><th className="px-4 py-3 text-center font-bold">Volume estimé</th><th className="px-4 py-3 text-center font-bold">Benne conseillée</th><th className="px-4 py-3 text-center font-bold">Budget TTC</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-4 py-3">Studio / T1 — petits encombrants</td><td className="px-4 py-3 text-center">1 à 3m³</td><td className="px-4 py-3 text-center font-bold text-amber-600">3m³</td><td className="px-4 py-3 text-center">149 – 179€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">T2-T3 — meubles + cartons</td><td className="px-4 py-3 text-center">3 à 6m³</td><td className="px-4 py-3 text-center font-bold text-amber-600">6m³</td><td className="px-4 py-3 text-center">199 – 279€</td></tr>
<tr className="border-t"><td className="px-4 py-3">Maison 4-5 pièces — gros tri</td><td className="px-4 py-3 text-center">6 à 15m³</td><td className="px-4 py-3 text-center font-bold text-amber-600">10 ou 15m³</td><td className="px-4 py-3 text-center">299 – 369€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">Succession / vidage complet</td><td className="px-4 py-3 text-center">15 à 30m³</td><td className="px-4 py-3 text-center font-bold text-amber-600">20 ou 30m³</td><td className="px-4 py-3 text-center">449 – 599€</td></tr>
<tr className="border-t"><td className="px-4 py-3">Déménagement + rénovation légère</td><td className="px-4 py-3 text-center">5 à 10m³</td><td className="px-4 py-3 text-center font-bold text-amber-600">10m³</td><td className="px-4 py-3 text-center">299 – 399€</td></tr>
</tbody>
</table>
</div>

<p>Pour une estimation plus fine selon votre projet, consultez notre <IL href="/guides/comment-choisir-taille-benne">guide complet des tailles de bennes</IL>. La règle d&apos;or reste la même : <strong>prenez toujours la taille au-dessus</strong>. L&apos;écart de prix (40 à 80€) est nettement inférieur au coût d&apos;une seconde rotation (150 à 200€).</p>

<h2>Quels déchets peut-on mettre dans une benne de déménagement ?</h2>
<p>Un déménagement produit des déchets très variés. La bonne nouvelle : la plupart sont acceptés dans une <IL href="/location-benne-encombrants">benne encombrants</IL>. Voici la répartition typique :</p>

<h3>✅ Déchets acceptés (encombrants classiques)</h3>
<ul>
<li><strong>Mobilier</strong> : canapés, armoires, commodes, sommiers, matelas, tables, chaises</li>
<li><strong>Électroménager</strong> : micro-ondes, plaques, hottes (hors frigo et congélateur — DEEE à part)</li>
<li><strong>Textile et literie</strong> : moquettes, rideaux, couettes, oreillers</li>
<li><strong>Cartons et emballages</strong> : cartons, films plastique, papier bulle</li>
<li><strong>Bois et petite menuiserie</strong> : étagères, planches, tasseaux, portes ​intérieures</li>
</ul>

<h3>⚠️ Déchets nécessitant une benne spécifique</h3>
<ul>
<li><strong>Gravats</strong> (plâtre, parpaings, carrelage en cas de rénovation) → <IL href="/location-benne-gravats">benne gravats</IL></li>
<li><strong>Déchets verts</strong> (arbustes, haie arrachée si jardinage en parallèle) → <IL href="/location-benne-dechets-verts">benne déchets verts</IL></li>
<li><strong>Déchets mixtes professionnels</strong> (chantier lourd) → <IL href="/location-benne-dib">benne DIB</IL></li>
</ul>

<h3>🚫 Déchets interdits dans toutes les bennes</h3>
<ul>
<li>Amiante, peintures, solvants et produits chimiques</li>
<li>Pneus, huiles de vidange et batteries</li>
<li>Déchets d&apos;équipements électriques et électroniques (DEEE) : frigos, téléviseurs, ordinateurs</li>
<li>Déchets médicaux et médicaments</li>
</ul>

<Callout type="warning" title="⚠️ Attention au mélange gravats + encombrants">
<p>Si votre déménagement s&apos;accompagne de travaux (abattre une cloison, refaire un sol), <strong>ne mélangez pas gravats et encombrants</strong> dans la même benne. Le loueur reclassera le contenu en DIB tout-venant, avec un surcoût de 40 à 80%. Commandez deux bennes séparées : c&apos;est souvent moins cher au total. Consultez notre <IL href="/guides/tri-dechets-chantier-guide">guide du tri des déchets de chantier</IL> pour les bonnes pratiques.</p>
</Callout>

<h2>Comment organiser la location de benne le jour du déménagement</h2>
<p>Un planning bien pensé vous évite le chaos. Voici la chronologie idéale :</p>

<h3>J-15 à J-10 : la préparation</h3>
<ul>
<li><strong>Estimez le volume</strong> : faites le tour de chaque pièce et listez les objets à jeter.</li>
<li><strong>Demandez vos devis</strong> : comparez au moins 3 loueurs via notre <IL href="/devis">formulaire de devis gratuit</IL>. Les prix varient de 30 à 50% d&apos;un prestataire à l&apos;autre.</li>
<li><strong>Vérifiez l&apos;emplacement</strong> : terrain privé (cour, allée) = pas d&apos;autorisation. Voie publique = demande de voirie en mairie.</li>
</ul>

<h3>J-2 : livraison de la benne</h3>
<ul>
<li>Le camion-grue livre la benne à l&apos;emplacement convenu. Vérifiez que l&apos;accès est dégagé (largeur minimale de 3m pour le passage du camion).</li>
<li>Commencez à charger les gros encombrants : canapé, sommier, moquette. Ce sont les pièces les plus volumineuses.</li>
</ul>

<h3>Jour J : le déménagement</h3>
<ul>
<li>Chargez les derniers déchets de tri : cartons abîmés, vieux rideaux, petits meubles cassés.</li>
<li><strong>Astuce gain de place</strong> : démontez les meubles avant de les jeter. Un meuble démonté occupe 50 à 70% de volume en moins.</li>
<li>Ne dépassez pas le bord supérieur de la benne (refus d&apos;enlèvement ou supplément de 50 à 100€).</li>
</ul>

<h3>J+1 à J+5 : enlèvement</h3>
<ul>
<li>Appelez le loueur pour planifier l&apos;enlèvement dès que la benne est pleine.</li>
<li>Conservez le BSD (Bordereau de Suivi des Déchets) pendant <strong>3 ans minimum</strong>.</li>
</ul>

<h2>Prix d&apos;une benne pour déménagement : à quoi s&apos;attendre</h2>
<p>Les tarifs dépendent du volume, du type de déchets et de votre localisation. Pour un déménagement standard avec principalement des encombrants, voici les fourchettes 2026 :</p>
<ul>
<li><strong>Benne 3m³ encombrants</strong> : 149 à 179€ TTC</li>
<li><strong>Benne 6m³ encombrants</strong> : 199 à 249€ TTC</li>
<li><strong>Benne 10m³ encombrants</strong> : 279 à 329€ TTC</li>
<li><strong>Benne 15m³ encombrants</strong> : 349 à 399€ TTC</li>
<li><strong>Benne 20m³ encombrants</strong> : 429 à 499€ TTC</li>
</ul>
<p>Ces tarifs incluent la livraison, 7 jours de location et l&apos;évacuation vers un centre de tri agréé. Pour un détail complet par type de déchet et par ville, consultez notre <IL href="/guides/prix-location-benne-guide-complet">grille tarifaire complète 2026</IL>.</p>

<Callout type="info" title="💰 Comment réduire la facture ?">
<p><strong>1. Donnez avant de jeter</strong> : meubles en bon état sur Leboncoin, Emmaüs, Ressourceries — c&apos;est gratuit et vous réduisez le volume de la benne.<br/>
<strong>2. Triez par matière</strong> : une benne mono-matériau (bois seul, carton seul) coûte 30 à 50% moins cher qu&apos;une benne tout-venant.<br/>
<strong>3. Déménagez hors saison</strong> : les tarifs sont plus bas de novembre à février (basse saison des loueurs).<br/>
<strong>4. Négociez la durée</strong> : si vous n&apos;avez besoin de la benne que 3-4 jours au lieu de 7, certains loueurs accordent une réduction.</p>
</Callout>

<h2>Benne de déménagement : les erreurs fréquentes à éviter</h2>
<p>Après des centaines de retours clients, voici les 5 erreurs les plus courantes :</p>
<ol>
<li><strong>Sous-estimer le volume</strong> : c&apos;est l&apos;erreur n°1. Un salon complet (canapé + table + meuble TV + tapis) représente à lui seul 3 à 4m³.</li>
<li><strong>Oublier l&apos;autorisation de voirie</strong> : si la benne est sur le trottoir et que vous n&apos;avez pas d&apos;autorisation, vous risquez 38 à 135€ d&apos;amende et l&apos;enlèvement immédiat par la fourrière.</li>
<li><strong>Mélanger les types de déchets</strong> : gravats + encombrants dans la même benne = reclassement en DIB et <strong>surcoût de 40 à 80%</strong>.</li>
<li><strong>Ne pas dégager l&apos;accès</strong> : le camion-grue mesure 2,5m de large et 10m de long. Vérifiez que rien ne bloque le passage (voitures garées, branches basses, portail trop étroit).</li>
<li><strong>S&apos;y prendre trop tard</strong> : en pleine période de déménagements (juin-septembre), les disponibilités sont limitées. Réservez 2 à 3 semaines à l&apos;avance.</li>
</ol>

<p>Un déménagement bien anticipé, c&apos;est un stress en moins. La location de benne vous décharge (littéralement) de la gestion des déchets pour vous concentrer sur l&apos;essentiel : votre nouvelle vie dans votre nouveau logement. Comparez les <IL href="/tarifs">tarifs dans votre département</IL> et trouvez le loueur le plus proche via notre réseau de partenaires.</p>

<CTABlock text="Déménagement prévu ? Recevez 3 devis benne gratuits en 2 minutes." />
</>
),

// ═══════════════════════════════════════════════════════════════
// ARTICLE 8 — LOCATION DE BENNE POUR PARTICULIER : GUIDE PAS À PAS
// ═══════════════════════════════════════════════════════════════
"location-benne-particulier-guide": (
<>
<p>Vous êtes particulier et vous avez des gravats, de vieux meubles ou des déchets de jardin à évacuer ? La <strong>location de benne pour particulier</strong> est la solution la plus simple et la plus économique dès que le volume dépasse 1m³. Pourtant, beaucoup hésitent : combien ça coûte ? Faut-il une autorisation ? Quels déchets sont acceptés ? Ce guide pas à pas répond à toutes ces questions et vous accompagne de la demande de devis jusqu&apos;à l&apos;enlèvement de la benne.</p>

<h2>Étape 1 — Identifier la nature de vos déchets</h2>
<p>La première chose à déterminer est le <strong>type de déchets</strong> que vous devez évacuer. C&apos;est ce critère qui détermine le type de benne à commander, et donc le tarif. En tant que particulier, vous êtes généralement concerné par l&apos;un de ces quatre cas :</p>
<ul>
<li><strong>Gravats</strong> (béton, carrelage, briques, parpaings, plâtre) → <IL href="/location-benne-gravats">benne gravats</IL></li>
<li><strong>Encombrants</strong> (meubles, matelas, électroménager, moquettes) → <IL href="/location-benne-encombrants">benne encombrants</IL></li>
<li><strong>Déchets verts</strong> (branches, tontes, feuilles, haies) → <IL href="/location-benne-dechets-verts">benne déchets verts</IL></li>
<li><strong>Déchets mixtes</strong> (mélange de tout, chantier de rénovation complète) → <IL href="/location-benne-dib">benne DIB</IL></li>
</ul>

<Callout type="warning" title="⚠️ Ne mélangez jamais gravats et encombrants">
<p>C&apos;est l&apos;erreur la plus fréquente chez les particuliers. Si vous mettez des gravats dans une benne encombrants (ou inversement), le loueur <strong>reclassera le contenu en DIB tout-venant</strong>, avec un surcoût de 40 à 80%. En cas de doute, commandez deux bennes séparées : c&apos;est souvent moins cher au total. Consultez notre <IL href="/guides/tri-dechets-chantier-guide">guide du tri des déchets</IL> pour y voir clair.</p>
</Callout>

<h2>Étape 2 — Choisir le bon volume de benne</h2>
<p>Le volume est le second critère déterminant. Les particuliers ont généralement besoin de bennes de <strong>3m³ à 15m³</strong>. Voici des repères concrets par type de projet :</p>

<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-amber-50"><tr><th className="px-4 py-3 text-left font-bold">Projet du particulier</th><th className="px-4 py-3 text-center font-bold">Volume estimé</th><th className="px-4 py-3 text-center font-bold">Benne conseillée</th><th className="px-4 py-3 text-center font-bold">Budget TTC</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-4 py-3">Rénovation salle de bain (gravats)</td><td className="px-4 py-3 text-center">1,5 à 3m³</td><td className="px-4 py-3 text-center font-bold text-amber-600">3m³</td><td className="px-4 py-3 text-center">149 – 179€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">Rénovation cuisine complète</td><td className="px-4 py-3 text-center">2 à 5m³</td><td className="px-4 py-3 text-center font-bold text-amber-600">6m³</td><td className="px-4 py-3 text-center">199 – 279€</td></tr>
<tr className="border-t"><td className="px-4 py-3">Élagage / abattage d&apos;arbre</td><td className="px-4 py-3 text-center">5 à 15m³</td><td className="px-4 py-3 text-center font-bold text-amber-600">10m³</td><td className="px-4 py-3 text-center">269 – 299€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">Vidage de garage / grenier</td><td className="px-4 py-3 text-center">5 à 10m³</td><td className="px-4 py-3 text-center font-bold text-amber-600">10m³</td><td className="px-4 py-3 text-center">279 – 329€</td></tr>
<tr className="border-t"><td className="px-4 py-3">Rénovation lourde (murs, sols)</td><td className="px-4 py-3 text-center">5 à 10m³</td><td className="px-4 py-3 text-center font-bold text-amber-600">10m³</td><td className="px-4 py-3 text-center">299 – 399€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">Vidage de maison complète</td><td className="px-4 py-3 text-center">15 à 30m³</td><td className="px-4 py-3 text-center font-bold text-amber-600">20m³</td><td className="px-4 py-3 text-center">399 – 499€</td></tr>
</tbody>
</table>
</div>

<p>Pour une estimation plus fine, consultez notre <IL href="/guides/comment-choisir-taille-benne">guide complet sur le choix de la taille de benne</IL>. La règle d&apos;or reste la même : <strong>prenez toujours la taille au-dessus</strong>. L&apos;écart de prix entre deux volumes consécutifs (40 à 80€) est très inférieur au prix d&apos;une seconde rotation (150 à 200€).</p>

<h2>Étape 3 — Demander et comparer des devis</h2>
<p>Les prix de location de benne varient de <strong>30 à 50%</strong> entre deux loueurs pour la même prestation. C&apos;est pourquoi il est essentiel de comparer au minimum 3 devis. Voici ce qu&apos;un devis sérieux doit inclure :</p>
<ul>
<li><strong>Le volume</strong> de la benne (en m³)</li>
<li><strong>Le type de déchets</strong> pris en charge (gravats, encombrants, déchets verts, DIB)</li>
<li><strong>La durée de location</strong> (7 jours standard, jours supplémentaires facturés 5 à 15€/jour)</li>
<li><strong>Le transport aller-retour</strong> (livraison + enlèvement par camion-grue)</li>
<li><strong>Le traitement des déchets</strong> (acheminement vers ISDI, centre de tri ou plateforme de compostage agréé)</li>
<li><strong>Le tonnage maximal</strong> inclus (attention aux dépassements facturés 15 à 30€/tonne)</li>
</ul>

<Callout type="tip" title="💡 Vérifiez les surcoûts potentiels">
<p>Demandez toujours au loueur de lister tous les surcoûts possibles : dépassement de poids, remplissage excessif (au-dessus du bord), jours supplémentaires, frais d&apos;attente du camion. Un devis transparent évite les mauvaises surprises. Consultez notre <IL href="/guides/prix-location-benne-guide-complet">guide des prix 2026</IL> pour connaître les tarifs de référence.</p>
</Callout>

<h2>Étape 4 — Préparer l&apos;emplacement de la benne</h2>
<p>La benne est livrée par un <strong>camion-grue</strong> qui mesure environ 2,5m de large et 10m de long. L&apos;emplacement de pose doit être réfléchi en amont :</p>

<h3>Sur terrain privé (solution recommandée)</h3>
<p>Si vous disposez d&apos;une cour, d&apos;une allée ou d&apos;un jardin accessible au camion, privilégiez systématiquement cette option. Avantages :</p>
<ul>
<li><strong>Aucune autorisation</strong> à demander</li>
<li><strong>Aucun frais</strong> de redevance voirie</li>
<li><strong>Aucune contrainte de durée</strong> imposée par la mairie</li>
<li>Accès direct la benne à toute heure</li>
</ul>
<p>Assurez-vous simplement que le sol est suffisamment stable (pas de pelouse molle — privilégiez gravier, béton ou bitume) et que le portail ou l&apos;accès fait <strong>au moins 3m de largeur</strong>.</p>

<h3>Sur la voie publique (autorisation obligatoire)</h3>
<p>Si la benne doit être posée sur le trottoir, la chaussée ou un parking public, vous devez impérativement obtenir une <strong>autorisation d&apos;occupation du domaine public</strong> auprès de votre mairie. Cette démarche prend de <strong>5 à 21 jours</strong> selon la taille de votre commune, pour un coût de <strong>30 à 200€</strong>. Bonne nouvelle : la plupart des loueurs proposent de gérer cette formalité pour vous, moyennant un supplément de 50 à 100€.</p>
<p>Pour toutes les démarches détaillées, consultez notre <IL href="/guides/autorisation-voirie-benne-guide">guide complet sur l&apos;autorisation de voirie</IL>.</p>

<h2>Étape 5 — Remplir la benne correctement</h2>
<p>Le chargement de la benne est une étape souvent sous-estimée par les particuliers. Pourtant, quelques bonnes pratiques vous évitent des surcoûts importants :</p>

<h3>Les règles d&apos;or du chargement</h3>
<ul>
<li><strong>Ne dépassez jamais le bord supérieur</strong> : si les déchets dépassent, le chauffeur peut refuser l&apos;enlèvement ou facturer un supplément de 50 à 100€.</li>
<li><strong>Répartissez le poids uniformément</strong> : ne concentrez pas les gravats d&apos;un seul côté, au risque de déséquilibrer la benne lors du levage.</li>
<li><strong>Cassez et démontez</strong> avant de charger : démonter un meuble réduit son volume de 50 à 70%. Cassez les grandes plaques de placo en morceaux.</li>
<li><strong>Chargez les éléments lourds en premier</strong> (gravats, carrelage) puis les éléments légers et volumineux au-dessus (cartons, plastiques).</li>
<li><strong>Respectez le tonnage maximal</strong> : une benne 3m³ gravats est limitée à environ 4,5 tonnes. Au-delà, le loueur facture 15 à 30€/tonne supplémentaire.</li>
</ul>

<Callout type="info" title="📋 Les déchets interdits dans toutes les bennes">
<p>En tant que particulier, vous ne pouvez <strong>jamais</strong> mettre dans une benne :<br/>
• <strong>Amiante</strong> (obligatoirement traité en filière spécialisée — devis spécifique nécessaire)<br/>
• <strong>Peintures, solvants, produits chimiques</strong> → déchetterie, rayon « déchets dangereux »<br/>
• <strong>Pneus, huiles de vidange, batteries</strong> → repris gratuitement par les garagistes<br/>
• <strong>DEEE</strong> (frigos, téléviseurs, ordinateurs) → obligation de reprise par le vendeur (loi AGEC 2020)<br/>
• <strong>Déchets médicaux</strong> → pharmacie ou collecte spécifique</p>
</Callout>

<h2>Étape 6 — L&apos;enlèvement et la traçabilité</h2>
<p>Une fois la benne pleine, contactez le loueur pour planifier l&apos;enlèvement. Le camion-grue intervient généralement sous <strong>24 à 48h</strong>. L&apos;opération dure environ 15 minutes.</p>
<p>À l&apos;enlèvement, le loueur vous remet un <strong>Bordereau de Suivi des Déchets (BSD)</strong>. Ce document, obligatoire depuis la <strong>loi AGEC (2020)</strong>, atteste que vos déchets ont été acheminés vers un centre de traitement agréé. Conservez-le <strong>3 ans minimum</strong> : en cas de contrôle, il prouve votre bonne foi et vous protège légalement.</p>
<p>Les déchets sont ensuite orientés vers la filière adaptée :</p>
<ul>
<li><strong>Gravats</strong> → ISDI (Installation de Stockage de Déchets Inertes) ou plateforme de recyclage</li>
<li><strong>Encombrants</strong> → Centre de tri, puis valorisation matière ou énergétique</li>
<li><strong>Déchets verts</strong> → Plateforme de compostage industriel</li>
<li><strong>DIB</strong> → Centre de tri, puis recyclage ou enfouissement (ISDND)</li>
</ul>

<h2>Combien coûte une location de benne pour un particulier en 2026 ?</h2>
<p>Les tarifs incluent généralement la livraison, 7 jours de location et le traitement des déchets. Voici les fourchettes moyennes nationales :</p>
<ul>
<li><strong>Benne 3m³</strong> : 129€ (déchets verts) à 179€ (gravats)</li>
<li><strong>Benne 6m³</strong> : 199€ à 279€</li>
<li><strong>Benne 10m³</strong> : 269€ à 399€</li>
<li><strong>Benne 15m³</strong> : 339€ à 399€</li>
<li><strong>Benne 20m³</strong> : 399€ à 449€</li>
</ul>
<p>Les prix varient selon votre localisation (écart de 20 à 40% entre zone urbaine et zone rurale) et la saison (comptez 10 à 15% de plus au printemps et en été, haute saison). Pour un comparatif complet, consultez notre <IL href="/tarifs">page tarifs par département</IL>.</p>

<h2>Les 5 erreurs les plus fréquentes chez les particuliers</h2>
<ol>
<li><strong>Sous-estimer le volume</strong> : une cuisine complète (meubles + carrelage + électroménager) représente à elle seule 3 à 5m³. Multipliez votre première estimation par 1,3.</li>
<li><strong>Oublier l&apos;autorisation de voirie</strong> : pas d&apos;autorisation sur voie publique = amende de 38 à 135€ et risque d&apos;enlèvement par la fourrière.</li>
<li><strong>Commander trop tard</strong> : en haute saison (avril-septembre), les disponibilités se réduisent vite. Réservez <strong>2 à 3 semaines à l&apos;avance</strong>.</li>
<li><strong>Ne pas vérifier l&apos;accès</strong> : le camion-grue fait 10m de long. Si votre rue est trop étroite ou si une branche basse bloque le passage, la livraison est impossible.</li>
<li><strong>Ne comparer qu&apos;un seul devis</strong> : les prix varient de 30 à 50% d&apos;un loueur à l&apos;autre. Comparez systématiquement au moins 3 offres.</li>
</ol>

<p>La location de benne pour particulier est une solution accessible, rapide et économique pour tous vos projets de rénovation, de débarras ou de jardinage. En suivant ces 6 étapes, vous maîtrisez votre budget, respectez la réglementation et vous débarrassez sereinement de tous vos déchets. N&apos;attendez plus : comparez les <IL href="/departements">loueurs de bennes dans votre département</IL> et recevez vos devis gratuits en quelques clics.</p>

<CTABlock text="Particulier ? Recevez 3 devis benne gratuits et sans engagement en 2 minutes." />
</>
),

// ═══════════════════════════════════════════════════════════════
// ARTICLE 9 — DÉCHETTERIE OU BENNE : COMPARATIF COMPLET
// ═══════════════════════════════════════════════════════════════
"dechetterie-ou-benne-comparatif": (
<>
<p>Vous avez des gravats, des encombrants ou des déchets verts à évacuer et vous hésitez entre la <strong>déchetterie</strong> et la <strong>location de benne</strong> ? Les deux solutions ont leurs avantages et leurs limites. La déchetterie est gratuite mais contraignante ; la benne est payante mais livrée chez vous. Ce comparatif complet analyse les deux options sur 8 critères concrets pour vous aider à faire le bon choix selon votre projet.</p>

<h2>Déchetterie vs Benne : le tableau comparatif</h2>
<p>Avant d&apos;entrer dans le détail, voici une vue d&apos;ensemble des deux solutions :</p>

<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-amber-50"><tr><th className="px-4 py-3 text-left font-bold">Critère</th><th className="px-4 py-3 text-center font-bold">🏭 Déchetterie</th><th className="px-4 py-3 text-center font-bold">🚛 Benne de location</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-4 py-3 font-semibold">Prix</td><td className="px-4 py-3 text-center text-green-600 font-bold">Gratuit*</td><td className="px-4 py-3 text-center">129 à 599€ TTC</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3 font-semibold">Volume accepté</td><td className="px-4 py-3 text-center">0,5 à 1m³ / visite</td><td className="px-4 py-3 text-center text-green-600 font-bold">3 à 30m³</td></tr>
<tr className="border-t"><td className="px-4 py-3 font-semibold">Transport</td><td className="px-4 py-3 text-center">À votre charge</td><td className="px-4 py-3 text-center text-green-600 font-bold">Livraison + enlèvement inclus</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3 font-semibold">Disponibilité</td><td className="px-4 py-3 text-center">Horaires imposés</td><td className="px-4 py-3 text-center text-green-600 font-bold">24h/24, 7j/7</td></tr>
<tr className="border-t"><td className="px-4 py-3 font-semibold">Effort physique</td><td className="px-4 py-3 text-center">Chargement + déchargement</td><td className="px-4 py-3 text-center text-green-600 font-bold">Chargement seul</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3 font-semibold">Délai de mise en place</td><td className="px-4 py-3 text-center text-green-600 font-bold">Immédiat</td><td className="px-4 py-3 text-center">24 à 72h</td></tr>
<tr className="border-t"><td className="px-4 py-3 font-semibold">Traçabilité (BSD)</td><td className="px-4 py-3 text-center">Non</td><td className="px-4 py-3 text-center text-green-600 font-bold">Oui (obligatoire loi AGEC)</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3 font-semibold">Types de déchets</td><td className="px-4 py-3 text-center text-green-600 font-bold">Très variés (DEEE, DMS…)</td><td className="px-4 py-3 text-center">Gravats, encombrants, verts, DIB</td></tr>
</tbody>
</table>
</div>
<p className="text-sm text-slate-500"><em>* Gratuit pour les particuliers, dans la limite du quota communal (souvent 1m³ par visite, 2 à 6 visites/an selon la commune).</em></p>

<h2>La déchetterie : gratuite, mais à quel prix ?</h2>
<p>La déchetterie municipale est la solution historique pour les particuliers. Financée par la taxe d&apos;enlèvement des ordures ménagères (TEOM), elle est <strong>gratuite à l&apos;usage</strong> pour les résidents de la commune. Mais cette gratuité a des contreparties importantes.</p>

<h3>Les avantages de la déchetterie</h3>
<ul>
<li><strong>Gratuité</strong> : aucun coût direct pour les particuliers (hors carburant et temps).</li>
<li><strong>Acceptation large</strong> : les déchetteries acceptent des catégories que les bennes refusent — DEEE (frigos, téléviseurs), piles, huiles usagées, peintures, déchets ménagers spéciaux (DMS), pneus.</li>
<li><strong>Tri sur place</strong> : les bennes de la déchetterie sont pré-triées par matériau (bois, ferraille, carton, gravats, déchets verts), ce qui facilite le recyclage.</li>
<li><strong>Proximité</strong> : la France compte environ 4 700 déchetteries, soit une tous les 13 km en moyenne.</li>
</ul>

<h3>Les inconvénients de la déchetterie</h3>
<ul>
<li><strong>Volume limité</strong> : la plupart des communes plafonnent à <strong>1m³ par visite</strong> et à 2-6 visites par an. Au-delà, des frais s&apos;appliquent (10 à 30€/m³ supplémentaire).</li>
<li><strong>Horaires contraignants</strong> : ouverture de 8h30 à 17h en semaine, 9h à 12h le samedi dans de nombreuses communes. Fermé le dimanche et jours fériés.</li>
<li><strong>Files d&apos;attente</strong> : 20 à 45 minutes d&apos;attente en moyenne le samedi matin (pic d&apos;affluence).</li>
<li><strong>Transport à votre charge</strong> : il faut charger le véhicule, conduire, décharger, recommencer. Pour 5m³ de gravats, comptez <strong>5 à 8 allers-retours</strong> en utilitaire.</li>
<li><strong>Usure du véhicule</strong> : les gravats pèsent ~1,5 tonne/m³. Charger une remorque de 500 kg de gravats 5 fois use les pneus, les suspensions et consomme du carburant.</li>
</ul>

<Callout type="info" title="💡 Le coût caché de la déchetterie">
<p>La déchetterie est « gratuite » mais vos allers-retours ne le sont pas. Pour évacuer <strong>5m³ de gravats</strong> (une rénovation de cuisine) :<br/>
• <strong>Location utilitaire</strong> : 60 à 80€/jour<br/>
• <strong>Carburant</strong> : 20 à 30€ (5-8 trajets × 15 km en moyenne)<br/>
• <strong>Temps</strong> : 4 à 6 heures de votre journée (chargement + conduite + attente + déchargement)<br/>
<strong>Total réel</strong> : 80 à 110€ + une journée perdue. Soit <strong>presque le prix d&apos;une benne 3m³ livrée chez vous</strong> (149-179€), sans aucun effort de transport.</p>
</Callout>

<h2>La benne de location : le confort a un prix</h2>
<p>La <IL href="/guides/location-benne-particulier-guide">location de benne pour particulier</IL> fonctionne sur un principe simple : un camion-grue livre une benne devant votre domicile, vous la remplissez à votre rythme pendant 7 jours, puis le loueur la récupère et gère le traitement.</p>

<h3>Les avantages de la benne</h3>
<ul>
<li><strong>Volume illimité</strong> : de 3m³ à 30m³, il existe une benne pour chaque projet — de la salle de bain à la succession complète. Consultez notre <IL href="/guides/comment-choisir-taille-benne">guide des tailles de bennes</IL>.</li>
<li><strong>Zéro transport</strong> : la benne est livrée et enlevée par le loueur. Aucun trajet, aucun chargement de voiture, aucune file d&apos;attente.</li>
<li><strong>Disponibilité 24h/24</strong> : la benne est posée devant chez vous, vous la remplissez quand vous voulez — le soir, le week-end, entre deux sessions de travaux.</li>
<li><strong>Traçabilité légale</strong> : le loueur vous délivre un <strong>Bordereau de Suivi des Déchets (BSD)</strong>, obligatoire depuis la <strong>loi AGEC (2020)</strong>. Vous êtes couvert en cas de contrôle.</li>
<li><strong>Gain de temps considérable</strong> : une benne 6m³ remplace 6 à 8 allers-retours en déchetterie. Vous économisez une journée entière de travail.</li>
</ul>

<h3>Les inconvénients de la benne</h3>
<ul>
<li><strong>Coût</strong> : de 129€ pour une benne 3m³ déchets verts à 599€ pour une benne 30m³ encombrants. Consultez notre <IL href="/guides/prix-location-benne-guide-complet">grille tarifaire complète</IL>.</li>
<li><strong>Espace de pose</strong> : la benne occupe environ 4m × 2m. Il faut un accès carrossable pour le camion-grue (3m de largeur minimum).</li>
<li><strong>Autorisation de voirie</strong> : si la benne est posée sur la voie publique (trottoir, chaussée), une <IL href="/guides/autorisation-voirie-benne-guide">autorisation de voirie</IL> est obligatoire (30 à 200€, délai 5 à 21 jours).</li>
<li><strong>Déchets limités</strong> : les bennes n&apos;acceptent pas l&apos;amiante, les DEEE, les peintures, les pneus ni les produits chimiques (→ déchetterie obligatoire pour ces déchets).</li>
</ul>

<h2>Quel volume pour quelle solution ?</h2>
<p>Le critère décisif est le <strong>volume de déchets à évacuer</strong>. Voici un guide de décision rapide :</p>

<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-amber-50"><tr><th className="px-4 py-3 text-left font-bold">Volume</th><th className="px-4 py-3 text-left font-bold">Solution recommandée</th><th className="px-4 py-3 text-left font-bold">Pourquoi</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-4 py-3 font-bold text-amber-600">&lt; 0,5m³</td><td className="px-4 py-3 font-semibold">🏭 Déchetterie</td><td className="px-4 py-3">Gratuit, 1 seul trajet en voiture suffit.</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3 font-bold text-amber-600">0,5 à 1m³</td><td className="px-4 py-3 font-semibold">🏭 Déchetterie ou Big Bag</td><td className="px-4 py-3">Déchetterie si proche, Big Bag (80-150€) si accès limité.</td></tr>
<tr className="border-t"><td className="px-4 py-3 font-bold text-amber-600">1 à 3m³</td><td className="px-4 py-3 font-semibold">🚛 Benne 3m³</td><td className="px-4 py-3">Le seuil de rentabilité : benne (149-179€) vs 3-4 allers-retours.</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3 font-bold text-amber-600">3 à 10m³</td><td className="px-4 py-3 font-semibold text-green-600">🚛 Benne (choix évident)</td><td className="px-4 py-3">Impossible en déchetterie en un jour. Benne 6 ou 10m³ : 219-399€.</td></tr>
<tr className="border-t"><td className="px-4 py-3 font-bold text-amber-600">10 à 30m³</td><td className="px-4 py-3 font-semibold text-green-600">🚛 Benne (seule option viable)</td><td className="px-4 py-3">Vidage de maison, succession. Benne 15 à 30m³ : 339-599€.</td></tr>
</tbody>
</table>
</div>

<Callout type="tip" title="💡 La stratégie combinée : le meilleur des deux mondes">
<p>Pour les gros projets de rénovation, la solution optimale est souvent de <strong>combiner les deux</strong> :<br/>
• <strong>Benne</strong> pour les gros volumes (gravats, encombrants, déchets verts) → <IL href="/location-benne-gravats">benne gravats</IL> ou <IL href="/location-benne-encombrants">benne encombrants</IL><br/>
• <strong>Déchetterie</strong> pour les déchets spéciaux refusés en benne (pots de peinture, néons, vieux frigo, piles)<br/>
Vous évacuez 95% du volume sans effort, et vous faites un seul trajet en déchetterie pour les 5% restants.</p>
</Callout>

<h2>Comparatif des coûts réels : déchetterie vs benne</h2>
<p>La déchetterie semble gratuite, mais ce n&apos;est vrai que pour de très petits volumes. Dès que le nombre de trajets augmente, les coûts cachés s&apos;accumulent. Voici 3 scénarios réalistes :</p>

<h3>Scénario 1 — Rénovation de salle de bain (2m³ de gravats)</h3>
<ul>
<li><strong>Déchetterie</strong> : 3 allers-retours en utilitaire (location 60€ + carburant 15€) + 3h de manutention = <strong>~75€ + ½ journée</strong></li>
<li><strong>Benne 3m³ gravats</strong> : livraison + 7 jours + enlèvement + traitement = <strong>179€, zéro effort</strong></li>
</ul>

<h3>Scénario 2 — Vidage de garage (6m³ d&apos;encombrants)</h3>
<ul>
<li><strong>Déchetterie</strong> : 8 allers-retours (utilitaire 80€ + carburant 30€) + 6h minimum = <strong>~110€ + 1 journée complète</strong></li>
<li><strong>Benne 6m³ encombrants</strong> : <strong>219€, chargement à votre rythme sur 7 jours</strong></li>
</ul>

<h3>Scénario 3 — Élagage + nettoyage de jardin (10m³ de déchets verts)</h3>
<ul>
<li><strong>Déchetterie</strong> : 12 à 15 allers-retours (utilitaire 80€ + remorque 40€ + carburant 40€) + 2 jours = <strong>~160€ + 2 jours</strong></li>
<li><strong>Benne 10m³ déchets verts</strong> : <strong>269€, aucun trajet</strong>. En savoir plus sur les <IL href="/guides/dechets-verts-reglementation-brulage">alternatives au brûlage</IL>.</li>
</ul>

<p><strong>Conclusion</strong> : à partir de <strong>3m³</strong>, la benne devient compétitive face à la déchetterie quand on intègre le coût réel du transport, du temps et de l&apos;effort physique.</p>

<h2>Quand choisir la déchetterie, quand choisir la benne ?</h2>

<h3>Choisissez la déchetterie si :</h3>
<ul>
<li>Votre volume est <strong>inférieur à 1m³</strong></li>
<li>Vous avez des <strong>déchets spéciaux</strong> (DEEE, peintures, piles, huiles, pneus)</li>
<li>La déchetterie est à <strong>moins de 5 km</strong> et accessible sans file d&apos;attente (en semaine)</li>
<li>Vous disposez d&apos;un <strong>véhicule adapté</strong> (break, utilitaire, remorque) et du temps nécessaire</li>
</ul>

<h3>Choisissez la benne si :</h3>
<ul>
<li>Votre volume est <strong>supérieur à 1m³</strong> (le seuil de rentabilité)</li>
<li>Vous n&apos;avez <strong>pas de véhicule adapté</strong> ou pas le temps de faire des allers-retours</li>
<li>Vos travaux s&apos;étalent <strong>sur plusieurs jours</strong> et vous avez besoin de charger progressivement</li>
<li>Vous avez besoin d&apos;un <strong>BSD</strong> pour la traçabilité réglementaire</li>
<li>Vous voulez éviter tout effort logistique et vous concentrer sur vos travaux</li>
</ul>

<Callout type="warning" title="⚠️ Attention aux déchets professionnels en déchetterie">
<p>Les déchetteries municipales sont réservées aux <strong>particuliers</strong>. Les professionnels du BTP (artisans, entreprises) doivent utiliser des <strong>déchetteries professionnelles</strong> (payantes) ou louer des bennes. Depuis le <strong>décret 7 flux (2016)</strong>, les pros sont tenus au tri séparé de leurs déchets. Consultez notre <IL href="/guides/tri-dechets-chantier-guide">guide du décret 7 flux</IL> pour connaître vos obligations.</p>
</Callout>

<h2>Déchetterie ou benne : le verdict</h2>
<p>Il n&apos;y a pas de réponse universelle. Le bon choix dépend de <strong>trois facteurs</strong> : le volume de déchets, votre disponibilité et votre équipement de transport. En résumé :</p>
<ul>
<li><strong>Moins de 1m³</strong> : la déchetterie reste imbattable (gratuite et un seul trajet).</li>
<li><strong>1 à 3m³</strong> : la benne devient compétitive si vous valorisez votre temps à plus de 15-20€/heure.</li>
<li><strong>Plus de 3m³</strong> : la benne est la solution évidente, tant en confort qu&apos;en coût réel.</li>
</ul>
<p>Quel que soit votre choix, pensez à trier vos déchets par matériau : c&apos;est bon pour l&apos;environnement et ça réduit la facture. Comparez les <IL href="/tarifs">tarifs dans votre département</IL> et trouvez le loueur le plus proche pour recevoir vos devis gratuits.</p>

<CTABlock text="Plus de 1m³ à évacuer ? Comparez 3 devis benne gratuits en 2 minutes." />
</>
),

// ═══════════════════════════════════════════════════════════════
// ARTICLE 10 — PRIX LOCATION BENNE ÎLE-DE-FRANCE 2026
// ═══════════════════════════════════════════════════════════════
"prix-location-benne-ile-de-france": (
<>
<p>L&apos;Île-de-France est la région la plus chère de France pour la location de benne. Entre la densité urbaine, les contraintes d&apos;accès, le prix du foncier des centres de traitement et les autorisations de voirie parisiennes, les tarifs sont <strong>15 à 30% supérieurs à la moyenne nationale</strong>. Ce guide détaille les prix réels 2026, département par département, et vous donne les clés pour maîtriser votre budget.</p>

<h2>Pourquoi la location de benne coûte plus cher en Île-de-France</h2>
<p>Avant de consulter les tarifs, il est essentiel de comprendre pourquoi les prix franciliens sont systématiquement supérieurs aux moyennes nationales. Quatre facteurs structurels expliquent cet écart :</p>

<h3>1. La congestion et les distances</h3>
<p>En Île-de-France, un camion-benne passe en moyenne <strong>40 à 60% de son temps de rotation dans les embouteillages</strong>. Un aller-retour entre un chantier parisien et un centre de traitement en grande couronne (Gennevilliers, Bonneuil-sur-Marne, Claye-Souilly) prend 2 à 3 heures au lieu de 45 minutes en province. Ce temps improductif se répercute directement sur le prix.</p>

<h3>2. Le coût des centres de traitement</h3>
<p>Les Installations de Stockage de Déchets Inertes (ISDI) et les centres de tri franciliens facturent <strong>30 à 50€/tonne de plus</strong> qu&apos;en province. La raison : le foncier est rare, les normes environnementales sont renforcées en zone dense (plan régional de prévention et gestion des déchets — PRPGD Île-de-France), et la demande dépasse l&apos;offre.</p>

<h3>3. Les autorisations de voirie</h3>
<p>À Paris intra-muros, l&apos;<IL href="/guides/autorisation-voirie-benne-guide">autorisation de voirie</IL> coûte <strong>120 à 200€</strong> et nécessite un délai de <strong>15 à 21 jours ouvrés</strong>. Dans les communes de petite couronne (Boulogne, Montreuil, Saint-Denis), comptez 80 à 150€ et 10 à 15 jours. Ce surcoût administratif s&apos;ajoute au prix de la benne elle-même.</p>

<h3>4. Les restrictions horaires et les zones à faibles émissions (ZFE)</h3>
<p>Depuis 2024, la ZFE du Grand Paris interdit la circulation des véhicules Crit&apos;Air 3, 4 et 5 en semaine de 8h à 20h dans les 77 communes de la Métropole du Grand Paris. Les loueurs doivent investir dans des <strong>flottes récentes (Crit&apos;Air 1 ou 2)</strong>, ce qui augmente leurs coûts d&apos;exploitation — et donc vos tarifs.</p>

<Callout type="info" title="📍 La ZFE du Grand Paris en 2026">
<p>La Zone à Faibles Émissions du Grand Paris couvre <strong>Paris et les 76 communes de la Métropole du Grand Paris</strong>. Les véhicules Crit&apos;Air 4 et 5 sont totalement interdits, et les Crit&apos;Air 3 sont restreints en semaine. Si votre loueur utilise un vieux camion, il devra circuler de nuit ou le week-end — avec un surcoût de 50 à 100€ sur votre devis.</p>
</Callout>

<h2>Grille tarifaire 2026 par département d&apos;Île-de-France</h2>
<p>Les tarifs ci-dessous sont des <strong>moyennes TTC</strong> incluant la livraison, 7 jours de location et le traitement des déchets au centre agréé. Ils ont été compilés à partir de <strong>plus de 200 devis franciliens</strong> collectés entre janvier et mars 2026.</p>

<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-amber-50"><tr><th className="px-3 py-3 text-left font-bold">Département</th><th className="px-3 py-3 text-center font-bold">Benne 3m³</th><th className="px-3 py-3 text-center font-bold">Benne 6m³</th><th className="px-3 py-3 text-center font-bold">Benne 10m³</th><th className="px-3 py-3 text-center font-bold">Benne 15m³</th><th className="px-3 py-3 text-center font-bold">Benne 20m³</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-3 py-3 font-bold">75 — Paris</td><td className="px-3 py-3 text-center">249€</td><td className="px-3 py-3 text-center">379€</td><td className="px-3 py-3 text-center">529€</td><td className="px-3 py-3 text-center">599€</td><td className="px-3 py-3 text-center">699€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-bold">92 — Hauts-de-Seine</td><td className="px-3 py-3 text-center">229€</td><td className="px-3 py-3 text-center">349€</td><td className="px-3 py-3 text-center">489€</td><td className="px-3 py-3 text-center">559€</td><td className="px-3 py-3 text-center">649€</td></tr>
<tr className="border-t"><td className="px-3 py-3 font-bold">93 — Seine-Saint-Denis</td><td className="px-3 py-3 text-center">219€</td><td className="px-3 py-3 text-center">329€</td><td className="px-3 py-3 text-center">469€</td><td className="px-3 py-3 text-center">529€</td><td className="px-3 py-3 text-center">619€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-bold">94 — Val-de-Marne</td><td className="px-3 py-3 text-center">219€</td><td className="px-3 py-3 text-center">339€</td><td className="px-3 py-3 text-center">479€</td><td className="px-3 py-3 text-center">539€</td><td className="px-3 py-3 text-center">629€</td></tr>
<tr className="border-t"><td className="px-3 py-3 font-bold">78 — Yvelines</td><td className="px-3 py-3 text-center">199€</td><td className="px-3 py-3 text-center">309€</td><td className="px-3 py-3 text-center">429€</td><td className="px-3 py-3 text-center">489€</td><td className="px-3 py-3 text-center">569€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-bold">91 — Essonne</td><td className="px-3 py-3 text-center">199€</td><td className="px-3 py-3 text-center">299€</td><td className="px-3 py-3 text-center">419€</td><td className="px-3 py-3 text-center">479€</td><td className="px-3 py-3 text-center">559€</td></tr>
<tr className="border-t"><td className="px-3 py-3 font-bold">95 — Val-d&apos;Oise</td><td className="px-3 py-3 text-center">199€</td><td className="px-3 py-3 text-center">299€</td><td className="px-3 py-3 text-center">419€</td><td className="px-3 py-3 text-center">479€</td><td className="px-3 py-3 text-center">559€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-bold">77 — Seine-et-Marne</td><td className="px-3 py-3 text-center">189€</td><td className="px-3 py-3 text-center">289€</td><td className="px-3 py-3 text-center">399€</td><td className="px-3 py-3 text-center">459€</td><td className="px-3 py-3 text-center">539€</td></tr>
</tbody>
</table>
</div>

<p><em>Ces tarifs concernent les <IL href="/location-benne-encombrants">bennes encombrants</IL>. Les <IL href="/location-benne-gravats">bennes gravats</IL> sont en moyenne 15 à 20% plus chères (densité plus élevée = coût de transport et de traitement supérieur). Les <IL href="/location-benne-dechets-verts">bennes déchets verts</IL> sont 10 à 15% moins chères.</em></p>

<h2>Focus Paris intra-muros : le cas le plus cher de France</h2>
<p>Paris (75) concentre toutes les difficultés : rues étroites, stationnement inexistant, autorisations de voirie onéreuses, et centres de traitement éloignés (les dernières ISDI parisiennes ont fermé ; les déchets partent vers le 93, le 94 ou le 77). Voici le <strong>budget réel tout compris</strong> pour une location de benne à Paris :</p>

<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-red-50"><tr><th className="px-4 py-3 text-left font-bold">Poste de coût</th><th className="px-4 py-3 text-center font-bold">Benne 3m³</th><th className="px-4 py-3 text-center font-bold">Benne 6m³</th><th className="px-4 py-3 text-center font-bold">Benne 10m³</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-4 py-3">Location + livraison + traitement</td><td className="px-4 py-3 text-center">249€</td><td className="px-4 py-3 text-center">379€</td><td className="px-4 py-3 text-center">529€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">Autorisation de voirie (mairie de Paris)</td><td className="px-4 py-3 text-center">120 – 200€</td><td className="px-4 py-3 text-center">120 – 200€</td><td className="px-4 py-3 text-center">120 – 200€</td></tr>
<tr className="border-t"><td className="px-4 py-3">Supplément livraison nuit/WE (si ZFE)</td><td className="px-4 py-3 text-center">0 – 80€</td><td className="px-4 py-3 text-center">0 – 80€</td><td className="px-4 py-3 text-center">0 – 80€</td></tr>
<tr className="border-t bg-amber-50"><td className="px-4 py-3 font-bold">Budget total Paris</td><td className="px-4 py-3 text-center font-bold text-amber-600">369 – 529€</td><td className="px-4 py-3 text-center font-bold text-amber-600">499 – 659€</td><td className="px-4 py-3 text-center font-bold text-amber-600">649 – 809€</td></tr>
</tbody>
</table>
</div>

<Callout type="warning" title="⚠️ Accès limité dans certains arrondissements">
<p>Dans les <strong>1er au 6ᵉ arrondissements</strong> (rues étroites du Marais, Saint-Germain, Île de la Cité), les bennes au-delà de 6m³ sont souvent impossibles à livrer en raison de la <strong>largeur de voirie insuffisante</strong> (le camion-grue mesure 10m de long et 2,5m de large). Privilégiez les <strong>bennes 3m³</strong> avec rotation, ou les <strong>big bags 1m³</strong> pour les très petits chantiers. En cas de doute, votre loueur effectuera une visite technique gratuite avant la livraison.</p>
</Callout>

<h2>Petite couronne vs grande couronne : quel écart de prix ?</h2>
<p>L&apos;Île-de-France se découpe en deux zones tarifaires distinctes :</p>

<h3>Petite couronne (92, 93, 94) : +15 à 25% vs moyenne nationale</h3>
<p>Les départements de la petite couronne (Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne) présentent des contraintes proches de Paris : forte densité, stationnement difficile, voiries étroites dans certaines communes (Vincennes, Levallois-Perret, Pantin). Les autorisations de voirie coûtent <strong>80 à 150€</strong> et les délais sont de <strong>10 à 15 jours</strong>.</p>
<p>L&apos;avantage : la proximité de plusieurs <strong>grands centres de traitement</strong> (plateforme de tri de Gennevilliers dans le 92, ISDI de Bonneuil-sur-Marne dans le 94, centre de Romainville dans le 93) réduit les frais de transport par rapport à Paris intra-muros.</p>

<h3>Grande couronne (77, 78, 91, 95) : +5 à 15% vs moyenne nationale</h3>
<p>Les départements de grande couronne (Seine-et-Marne, Yvelines, Essonne, Val-d&apos;Oise) offrent des tarifs plus proches des <IL href="/guides/prix-location-benne-guide-complet">moyennes nationales</IL>. Les centres de traitement sont plus nombreux, les accès plus faciles, et les autorisations de voirie moins chères (<strong>50 à 100€</strong>). La Seine-et-Marne (77), avec son caractère semi-rural, propose les tarifs les plus compétitifs de la région.</p>

<Callout type="tip" title="💡 Astuce : livraison en terrain privé = économie immédiate">
<p>Si vous avez la possibilité de faire livrer la benne sur votre terrain privé (cour, jardin, allée), vous économisez <strong>120 à 200€ d&apos;autorisation de voirie</strong> à Paris, et 50 à 150€ en petite couronne. C&apos;est souvent la meilleure façon de rapprocher votre budget des tarifs de province. Assurez-vous simplement que le portail fait au moins <strong>3m de largeur</strong> et que le sol est stable.</p>
</Callout>

<h2>Comment économiser sur votre benne en Île-de-France</h2>
<p>Les tarifs franciliens sont élevés, mais plusieurs leviers permettent de réduire la facture de <strong>20 à 40%</strong> :</p>

<h3>1. Comparez systématiquement 3 devis</h3>
<p>Les écarts de prix entre loueurs franciliens sont parmi <strong>les plus importants de France</strong> : jusqu&apos;à 50% de différence pour la même prestation. Un loueur basé en Seine-et-Marne (77) peut proposer un tarif nettement inférieur à un loueur parisien pour livrer une benne dans le Val-de-Marne (94). Utilisez notre <IL href="/devis">formulaire de devis gratuit</IL> pour comparer rapidement.</p>

<h3>2. Triez vos déchets par matière</h3>
<p>Deux bennes triées (une <IL href="/location-benne-gravats">gravats</IL> + une <IL href="/location-benne-encombrants">encombrants</IL>) coûtent souvent <strong>moins cher</strong> qu&apos;une seule grande benne <IL href="/location-benne-dib">DIB tout-venant</IL>. En Île-de-France, l&apos;écart est encore plus marqué : le traitement DIB coûte 120 à 150€/tonne en IDF contre 30 à 50€/tonne pour les gravats triés. Consultez notre <IL href="/guides/tri-dechets-chantier-guide">guide du décret 7 flux</IL> pour les bonnes pratiques de tri.</p>

<h3>3. Programmez hors saison</h3>
<p>Le pic de demande en Île-de-France se situe d&apos;<strong>avril à septembre</strong> (travaux de rénovation, déménagements de fin de bail parisien). En hiver (novembre à février), les disponibilités sont meilleures et de nombreux loueurs concèdent des <strong>remises de 10 à 15%</strong> pour maintenir leur activité.</p>

<h3>4. Choisissez la bonne taille du premier coup</h3>
<p>En province, une seconde rotation coûte 150 à 200€. En Île-de-France, elle peut atteindre <strong>250 à 350€</strong> (re-livraison, re-enlèvement, nouvelle autorisation de voirie). La <IL href="/guides/comment-choisir-taille-benne">règle d&apos;or</IL> s&apos;applique doublement en IDF : prenez <strong>toujours la taille au-dessus</strong>.</p>

<h2>Réglementation spécifique Île-de-France</h2>
<p>Au-delà de la ZFE déjà mentionnée, plusieurs réglementations régionales impactent la location de benne en Île-de-France :</p>

<h3>Le Plan Régional de Prévention et Gestion des Déchets (PRPGD)</h3>
<p>Le PRPGD Île-de-France fixe un objectif de <strong>valorisation de 70% des déchets du BTP</strong> d&apos;ici 2026 (contre 64% en 2023). Les loueurs de bennes sont tenus de justifier la traçabilité de chaque benne via un <strong>Bordereau de Suivi des Déchets (BSD)</strong>, conformément à la <strong>loi AGEC (2020)</strong>. Exigez toujours ce document — il vous protège en cas de contrôle de la DRIEAT (Direction Régionale de l&apos;Environnement).</p>

<h3>Règles de stationnement et horaires de livraison</h3>
<p>À Paris et dans de nombreuses communes de petite couronne, la livraison de bennes par camion-grue est <strong>interdite aux heures de pointe</strong> (7h30-9h30 et 16h30-19h30) sur les axes structurants. Certaines communes (Neuilly-sur-Seine, Boulogne-Billancourt) imposent également des <strong>horaires de chantier</strong> (8h-20h du lundi au vendredi, 9h-12h le samedi, interdiction le dimanche).</p>

<h2>Les alternatives en zone très dense</h2>
<p>Dans les quartiers où la livraison d&apos;une benne classique est impossible (rues piétonnes, accès &lt; 3m, absence d&apos;espace de pose), voici les solutions alternatives :</p>
<ul>
<li><strong>Big Bag (1m³)</strong> : livrable à la main ou par petit utilitaire. Prix en IDF : <strong>100 à 180€</strong>. Idéal pour un petit chantier de salle de bain en appartement parisien. Consultez notre <IL href="/guides/evacuation-gravats-guide-complet">guide d&apos;évacuation des gravats</IL> pour les alternatives.</li>
<li><strong>Sacs à gravats + enlèvement sur rendez-vous</strong> : certains loueurs franciliens proposent un service d&apos;enlèvement de sacs de gravats (50 kg max/sac) déposés sur le trottoir. Prix : 8 à 15€/sac, minimum 10 sacs.</li>
<li><strong>Camion aspirateur (terrassement)</strong> : pour les gravats en sous-sol ou les déchets inaccessibles par grue, le camion aspirateur intervient avec un tuyau flexible. Prix : 600 à 1200€ la demi-journée.</li>
</ul>

<h2>Tableau récapitulatif : à quel budget s&apos;attendre ?</h2>
<p>Pour vous permettre de budgétiser rapidement votre projet, voici les fourchettes de prix tout compris (benne + voirie + traitement) selon la zone et le type de projet :</p>

<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-amber-50"><tr><th className="px-3 py-3 text-left font-bold">Projet type</th><th className="px-3 py-3 text-center font-bold">Paris (75)</th><th className="px-3 py-3 text-center font-bold">Petite couronne</th><th className="px-3 py-3 text-center font-bold">Grande couronne</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-3 py-3">Rénovation salle de bain (3m³ gravats)</td><td className="px-3 py-3 text-center">369 – 529€</td><td className="px-3 py-3 text-center">299 – 399€</td><td className="px-3 py-3 text-center">219 – 299€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3">Rénovation cuisine (6m³ encombrants)</td><td className="px-3 py-3 text-center">499 – 659€</td><td className="px-3 py-3 text-center">399 – 519€</td><td className="px-3 py-3 text-center">319 – 419€</td></tr>
<tr className="border-t"><td className="px-3 py-3">Vidage de garage (10m³ encombrants)</td><td className="px-3 py-3 text-center">649 – 809€</td><td className="px-3 py-3 text-center">529 – 669€</td><td className="px-3 py-3 text-center">439 – 539€</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3">Vidage de maison/succession (20m³)</td><td className="px-3 py-3 text-center">819 – 979€</td><td className="px-3 py-3 text-center">699 – 819€</td><td className="px-3 py-3 text-center">579 – 699€</td></tr>
<tr className="border-t"><td className="px-3 py-3">Élagage (10m³ déchets verts)</td><td className="px-3 py-3 text-center">549 – 709€</td><td className="px-3 py-3 text-center">449 – 569€</td><td className="px-3 py-3 text-center">359 – 459€</td></tr>
</tbody>
</table>
</div>

<p>Pour un détail complet des tarifs nationaux par type de déchet, consultez notre <IL href="/guides/prix-location-benne-guide-complet">grille tarifaire complète 2026</IL>. Et pour trouver un loueur proche de votre chantier, parcourez notre <IL href="/departements">index des départements</IL>.</p>

<CTABlock text="Comparez les prix de benne en Île-de-France. 3 devis gratuits en 2 minutes." />
</>
),

// ═══════════════════════════════════════════════════════════════
// ARTICLE 11 — LOCATION DE BENNE EN ZONE RURALE : PRIX ET DÉLAIS
// ═══════════════════════════════════════════════════════════════
"location-benne-zone-rurale": (
<>
<p>Rénovation d&apos;une longère, vidage d&apos;un corps de ferme, élagage d&apos;un grand terrain boisé : en zone rurale, les projets générateurs de déchets ne manquent pas. Pourtant, <strong>louer une benne à la campagne coûte en moyenne 20 à 40% plus cher qu&apos;en zone urbaine</strong>, avec des délais de livraison parfois doublés. Ce guide détaille les prix réels 2026, explique les surcoûts spécifiques au milieu rural et vous donne toutes les clés pour maîtriser votre budget.</p>

<h2>Pourquoi la location de benne coûte plus cher en zone rurale</h2>
<p>En ville, la concurrence entre loueurs tire les prix vers le bas et les centres de traitement sont proches. En zone rurale, la donne est différente. Trois facteurs structurels expliquent l&apos;écart de prix :</p>

<h3>1. La distance aux centres de traitement</h3>
<p>Les Installations de Stockage de Déchets Inertes (ISDI), les plateformes de compostage et les centres de tri sont majoritairement situés en périphérie des grandes agglomérations. En zone rurale, le camion-benne parcourt souvent <strong>40 à 80 km aller-retour</strong> entre le lieu de pose et le centre agréé, contre 10 à 20 km en ville. Ce surcoût de transport — carburant, péages, temps de conduite — se répercute directement sur votre devis.</p>

<h3>2. Le faible nombre de loueurs locaux</h3>
<p>Dans les zones urbaines denses, il est courant de trouver <strong>5 à 10 loueurs de bennes</strong> dans un rayon de 30 km. En zone rurale, ce chiffre tombe souvent à <strong>1 ou 2 prestataires</strong>. Moins de concurrence signifie moins de pression sur les prix. Les loueurs éloignés facturent en outre un <strong>supplément de déplacement de 30 à 80€</strong> pour couvrir leurs frais de route.</p>

<h3>3. L&apos;accessibilité des chemins et terrains</h3>
<p>Le camion-grue qui livre une benne mesure <strong>10m de long, 2,5m de large et pèse entre 15 et 26 tonnes</strong> en charge. En zone rurale, les routes communales étroites, les chemins non goudronnés et les ponts à tonnage limité peuvent rendre la livraison complexe, voire impossible sans repérage préalable. Certains loueurs facturent une <strong>visite technique de 50 à 100€</strong> pour valider l&apos;accessibilité.</p>

<Callout type="info" title="📍 Les communes rurales en chiffres">
<p>La France compte environ <strong>30 000 communes de moins de 2 000 habitants</strong>, soit 88% des communes. Près de <strong>22 millions de Français</strong> vivent en zone rurale ou périurbaine. La distance moyenne au centre de traitement des déchets le plus proche y est de <strong>25 à 45 km</strong>, contre 5 à 15 km en zone urbaine (source : ADEME, rapport 2024).</p>
</Callout>

<h2>Prix de location de benne en zone rurale : grille tarifaire 2026</h2>
<p>Les tarifs ci-dessous sont des <strong>moyennes TTC</strong> constatées en zone rurale (communes de moins de 5 000 habitants, à plus de 30 km d&apos;une agglomération de 50 000 habitants). Ils incluent la livraison, 7 jours de location et le traitement des déchets au centre agréé :</p>

<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-amber-50"><tr><th className="px-3 py-3 text-left font-bold">Volume</th><th className="px-3 py-3 text-center font-bold">Zone urbaine</th><th className="px-3 py-3 text-center font-bold">Zone rurale</th><th className="px-3 py-3 text-center font-bold">Surcoût moyen</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-3 py-3 font-bold text-amber-600">3m³</td><td className="px-3 py-3 text-center">149 – 179€</td><td className="px-3 py-3 text-center">199 – 249€</td><td className="px-3 py-3 text-center font-semibold text-red-600">+30 à 40%</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-bold text-amber-600">6m³</td><td className="px-3 py-3 text-center">199 – 279€</td><td className="px-3 py-3 text-center">269 – 369€</td><td className="px-3 py-3 text-center font-semibold text-red-600">+25 à 35%</td></tr>
<tr className="border-t"><td className="px-3 py-3 font-bold text-amber-600">10m³</td><td className="px-3 py-3 text-center">269 – 399€</td><td className="px-3 py-3 text-center">349 – 499€</td><td className="px-3 py-3 text-center font-semibold text-red-600">+20 à 30%</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-bold text-amber-600">15m³</td><td className="px-3 py-3 text-center">339 – 399€</td><td className="px-3 py-3 text-center">429 – 519€</td><td className="px-3 py-3 text-center font-semibold text-red-600">+20 à 30%</td></tr>
<tr className="border-t"><td className="px-3 py-3 font-bold text-amber-600">20m³</td><td className="px-3 py-3 text-center">399 – 449€</td><td className="px-3 py-3 text-center">499 – 599€</td><td className="px-3 py-3 text-center font-semibold text-red-600">+20 à 30%</td></tr>
<tr className="border-t bg-slate-50"><td className="px-3 py-3 font-bold text-amber-600">30m³</td><td className="px-3 py-3 text-center">499 – 599€</td><td className="px-3 py-3 text-center">629 – 779€</td><td className="px-3 py-3 text-center font-semibold text-red-600">+25 à 30%</td></tr>
</tbody>
</table>
</div>

<p><em>Ces tarifs concernent les <IL href="/location-benne-encombrants">bennes encombrants</IL>. Les <IL href="/location-benne-gravats">bennes gravats</IL> sont 15 à 20% plus chères en raison de la densité supérieure. Les <IL href="/location-benne-dechets-verts">bennes déchets verts</IL> sont 10 à 15% moins chères. Pour une grille complète tous types confondus, consultez notre <IL href="/guides/prix-location-benne-guide-complet">guide des prix 2026</IL>.</em></p>

<h2>Délais de livraison en zone rurale</h2>
<p>En zone urbaine, une benne est généralement livrée sous <strong>24 à 48 heures</strong> après validation du devis. En zone rurale, les délais sont significativement plus longs. Plusieurs facteurs entrent en jeu :</p>

<div className="not-prose overflow-x-auto my-8">
<table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
<thead className="bg-slate-50"><tr><th className="px-4 py-3 text-left font-bold">Situation</th><th className="px-4 py-3 text-center font-bold">Délai de livraison</th><th className="px-4 py-3 text-center font-bold">Délai d&apos;enlèvement</th></tr></thead>
<tbody>
<tr className="border-t"><td className="px-4 py-3">Zone urbaine (&gt;50 000 hab.)</td><td className="px-4 py-3 text-center font-semibold text-green-600">24 à 48h</td><td className="px-4 py-3 text-center">24 à 48h</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">Zone périurbaine (5 000 – 50 000 hab.)</td><td className="px-4 py-3 text-center">48 à 72h</td><td className="px-4 py-3 text-center">48 à 72h</td></tr>
<tr className="border-t"><td className="px-4 py-3">Zone rurale (&lt;5 000 hab., &lt;30 km d&apos;un centre)</td><td className="px-4 py-3 text-center">3 à 5 jours</td><td className="px-4 py-3 text-center">2 à 4 jours</td></tr>
<tr className="border-t bg-slate-50"><td className="px-4 py-3">Zone rurale isolée (&lt;2 000 hab., &gt;50 km)</td><td className="px-4 py-3 text-center font-semibold text-red-600">5 à 10 jours</td><td className="px-4 py-3 text-center">3 à 7 jours</td></tr>
</tbody>
</table>
</div>

<p>En zone très isolée (montagne, arrière-pays, bocage profond), certains loueurs ne livrent qu&apos;à <strong>jours fixes</strong> — par exemple le mardi et le vendredi uniquement — pour optimiser leurs tournées. Anticipez en commandant <strong>2 à 3 semaines à l&apos;avance</strong>, surtout en haute saison (avril à septembre).</p>

<Callout type="warning" title="⚠️ Vérifiez l&apos;accessibilité avant de commander">
<p>En zone rurale, l&apos;accès au terrain est le premier point à vérifier. Le camion-grue a besoin de :<br/>
• Une voie d&apos;accès de <strong>3m de largeur minimum</strong> sur toute la longueur du trajet<br/>
• Un sol porteur (pas de chemin de terre détrempé après la pluie)<br/>
• Aucun obstacle aérien à moins de <strong>5m de hauteur</strong> (branches, fils électriques)<br/>
• Un pont ou un passage à gué supportant <strong>au moins 19 tonnes</strong> (poids du camion à vide + benne)<br/>
Si l&apos;accès est douteux, envoyez des photos de la route et du terrain au loueur avant de valider le devis.</p>
</Callout>

<h2>Les projets typiques en zone rurale</h2>
<p>Les besoins en location de benne à la campagne diffèrent sensiblement de ceux en ville. Voici les projets les plus fréquents et les volumes associés :</p>

<h3>Rénovation de maison ancienne ou de longère</h3>
<p>Les maisons rurales à rénover génèrent des volumes importants : <strong>démolition de cloisons en pierre, dépose de toiture en ardoise ou en tuile, arrachage de planchers anciens</strong>. Comptez <strong>10 à 20m³ de gravats</strong> pour la rénovation complète d&apos;une longère de 120m². Privilégiez une <IL href="/location-benne-gravats">benne gravats 10m³</IL> avec rotation, ou deux bennes successives pour les gros chantiers. Consultez notre <IL href="/guides/comment-choisir-taille-benne">guide des tailles de bennes</IL> pour estimer votre volume précisément.</p>

<h3>Vidage de corps de ferme ou succession rurale</h3>
<p>Les successions en milieu rural impliquent souvent de vider une maison <strong>et</strong> ses dépendances : grange, remise, grenier, cave, atelier. Le volume total peut atteindre <strong>25 à 40m³</strong>. Notre conseil : commandez une <IL href="/location-benne-encombrants">benne encombrants 20 ou 30m³</IL> et prévoyez une seconde rotation si nécessaire. En zone rurale, les tarifs de rotation sont de <strong>180 à 250€</strong>.</p>

<h3>Élagage et entretien de grands terrains</h3>
<p>Les terrains ruraux sont souvent plus grands — 2 000 à 10 000m² — et génèrent des volumes considérables de <IL href="/location-benne-dechets-verts">déchets verts</IL>. Un élagage d&apos;arbres centenaires ou un défrichage de parcelle produit facilement <strong>15 à 30m³ de branchages</strong>. Rappel : le <IL href="/guides/dechets-verts-reglementation-brulage">brûlage est interdit</IL>, même en zone rurale, sous peine de <strong>450€ d&apos;amende</strong> (circulaire du 18/11/2011, renforcée par la loi Climat &amp; Résilience 2021).</p>

<h3>Travaux agricoles et démolition de bâtiments</h3>
<p>La démolition d&apos;un hangar agricole, d&apos;un appentis ou d&apos;un ancien poulailler en parpaings génère <strong>5 à 15m³ de gravats inertes</strong>. Attention : si la construction contient de l&apos;amiante (plaques de fibrociment fréquentes sur les bâtiments agricoles d&apos;avant 1997), un diagnostic amiante est <strong>obligatoire avant démolition</strong> (décret n° 2011-629). L&apos;amiante ne peut pas être mis en benne classique — une filière spécialisée est requise.</p>

<Callout type="tip" title="💡 Regroupez vos besoins avec vos voisins">
<p>En zone rurale, une astuce efficace pour réduire le surcoût de transport : <strong>organisez une commande groupée avec vos voisins</strong>. Si deux ou trois foyers commandent chacun une benne livrée le même jour dans le même hameau, le loueur peut mutualiser le déplacement du camion et accorder une <strong>réduction de 10 à 20%</strong> sur chaque devis. Certains loueurs proposent même des tarifs « multi-livraisons » sur une même commune.</p>
</Callout>

<h2>Alternatives à la benne classique en zone rurale isolée</h2>
<p>Lorsque l&apos;accès au terrain est trop difficile pour un camion-grue, ou que le surcoût de livraison rend la benne classique prohibitive, plusieurs alternatives existent :</p>

<h3>Le Big Bag (1m³) livrable en utilitaire</h3>
<p>Le Big Bag est un gros sac en toile de <strong>1m³</strong>, livrable par petit utilitaire (pas besoin de camion-grue). Prix en zone rurale : <strong>100 à 180€</strong> (livraison + enlèvement + traitement). Idéal pour les petits chantiers (salle de bain, WC) ou les terrains inaccessibles en camion. Pour un comparatif complet, consultez notre <IL href="/guides/evacuation-gravats-guide-complet">guide d&apos;évacuation des gravats</IL>.</p>

<h3>La remorque + déchetterie</h3>
<p>Si vous disposez d&apos;une remorque, les allers-retours en déchetterie restent une option viable pour les <strong>volumes inférieurs à 3m³</strong>. Attention cependant : en zone rurale, la déchetterie la plus proche peut être à <strong>20 à 40 km</strong>, ce qui rend cette solution chronophage et coûteuse en carburant. Au-delà de 3 allers-retours, la benne devient plus économique. Consultez notre <IL href="/guides/dechetterie-ou-benne-comparatif">comparatif déchetterie vs benne</IL> pour faire le bon calcul.</p>

<h3>Le loueur agricole local</h3>
<p>Dans certaines zones rurales, des <strong>entreprises de travaux agricoles ou de terrassement</strong> proposent un service de location de benne en complément de leur activité principale. Leurs tarifs sont parfois plus compétitifs que ceux des loueurs spécialisés basés en ville, car ils n&apos;ont pas de frais de déplacement longue distance. Renseignez-vous auprès de la mairie ou de la chambre d&apos;agriculture de votre département.</p>

<h2>5 astuces pour économiser en zone rurale</h2>
<p>Malgré les surcoûts structurels, plusieurs leviers permettent de réduire significativement votre facture :</p>
<ol>
<li><strong>Comparez au moins 3 devis</strong> : les écarts de prix atteignent souvent <strong>40 à 60%</strong> en zone rurale. Utilisez notre <IL href="/devis">formulaire de devis gratuit</IL> pour recevoir des offres de loueurs qui couvrent votre commune.</li>
<li><strong>Triez vos déchets</strong> : deux bennes mono-matériau (gravats + encombrants) coûtent souvent <strong>moins cher</strong> qu&apos;une seule benne <IL href="/location-benne-dib">DIB tout-venant</IL>. Le tri réduit les coûts de traitement de 30 à 50%. Reportez-vous au <IL href="/guides/tri-dechets-chantier-guide">guide du décret 7 flux</IL>.</li>
<li><strong>Commandez hors saison</strong> : de <strong>novembre à février</strong>, les loueurs ruraux tournent à 30-50% de leur capacité. Négociez une remise de 10 à 15% ou une livraison gratuite.</li>
<li><strong>Mutualisez avec les voisins</strong> : plusieurs livraisons dans le même secteur le même jour = réduction du surcoût de transport pour chacun.</li>
<li><strong>Broyez vos déchets verts</strong> : un broyeur de végétaux (location ~80€/jour) réduit le volume de branches de <strong>50 à 70%</strong>. Un élagage de 20m³ tient alors dans une benne 10m³.</li>
</ol>

<h2>Autorisation de voirie en zone rurale : une formalité simplifiée</h2>
<p>Bonne nouvelle pour les habitants de zones rurales : l&apos;<IL href="/guides/autorisation-voirie-benne-guide">autorisation de voirie</IL> est souvent <strong>plus simple et moins chère</strong> qu&apos;en ville. Dans les communes de moins de 5 000 habitants, le délai d&apos;obtention est de <strong>3 à 7 jours seulement</strong> et le coût est de <strong>30 à 50€</strong>, contre 80 à 200€ dans les grandes agglomérations.</p>
<p>Mieux encore : en zone rurale, la plupart des propriétaires disposent d&apos;un <strong>terrain privé</strong> (cour, chemin, pré) suffisamment grand pour poser la benne sans occuper la voie publique. Dans ce cas, <strong>aucune autorisation n&apos;est nécessaire</strong> — c&apos;est un avantage majeur par rapport aux zones urbaines denses.</p>

<Callout type="info" title="🏡 Terrain privé : les précautions à prendre">
<p>Même sur votre propre terrain, quelques précautions s&apos;imposent pour la pose d&apos;une benne :<br/>
• <strong>Sol stable</strong> : évitez la pelouse détrempée ou le terrain meuble. Privilégiez le gravier, le béton ou le bitume. Si nécessaire, posez des planches de répartition sous les patins de la benne.<br/>
• <strong>Pente</strong> : la benne doit être posée sur un sol <strong>plat ou à très faible pente</strong> (&lt;5%). Sur un terrain en pente, elle risque de glisser une fois chargée.<br/>
• <strong>Distance à la route</strong> : la benne doit rester accessible au camion-grue pour l&apos;enlèvement. Ne la posez pas au fond du jardin si le camion ne peut pas y accéder.</p>
</Callout>

<h2>Location de benne en zone rurale : ce qu&apos;il faut retenir</h2>
<p>La location de benne en zone rurale présente des contraintes spécifiques — <strong>surcoût de 20 à 40%</strong>, délais de livraison allongés à <strong>3 à 10 jours</strong>, et accessibilité parfois limitée — mais elle reste la solution la plus pratique pour évacuer de gros volumes de déchets à la campagne. En anticipant votre commande, en triant vos déchets et en comparant systématiquement plusieurs devis, vous pouvez <strong>réduire la facture de 20 à 40%</strong>.</p>
<p>Que vous rénoviez une maison de campagne, vidiez une succession ou entreteniez un grand terrain, la benne vous évite des dizaines d&apos;allers-retours en déchetterie et vous garantit une <strong>traçabilité réglementaire</strong> conforme à la loi AGEC (2020). Consultez les <IL href="/departements">loueurs disponibles dans votre département</IL> et comparez les offres pour trouver le meilleur prix.</p>

<CTABlock text="En zone rurale ? Comparez les prix de benne dans votre commune. Devis gratuit en 2 minutes." />
</>
),

};
