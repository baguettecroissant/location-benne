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

};
