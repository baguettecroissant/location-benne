import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions Légales — Prix-Location-Benne.fr",
    description: "Mentions légales du site Prix-Location-Benne.fr, comparateur de prix pour la location de bennes en France.",
    alternates: { canonical: 'https://www.prix-location-benne.fr/mentions-legales' },
};

export default function MentionsLegalesPage() {
    return (
        <div className="min-h-screen bg-white py-16">
            <div className="container mx-auto px-4 max-w-3xl prose prose-slate prose-lg">
                <h1>Mentions Légales</h1>

                <h2>Éditeur du site</h2>
                <p>
                    Le site <strong>prix-location-benne.fr</strong> est un service de comparaison de prix et de mise en relation
                    pour la location de bennes à déchets en France.
                </p>

                <h2>Hébergement</h2>
                <p>
                    Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
                </p>

                <h2>Propriété intellectuelle</h2>
                <p>
                    L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes) est protégé par le droit d&apos;auteur.
                    Toute reproduction est interdite sans autorisation préalable.
                </p>

                <h2>Protection des données personnelles</h2>
                <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès,
                    de rectification et de suppression de vos données personnelles. Les données collectées via
                    le formulaire de devis sont utilisées exclusivement pour vous mettre en relation avec des loueurs de bennes.
                </p>

                <h2>Cookies</h2>
                <p>
                    Ce site utilise des cookies techniques nécessaires au bon fonctionnement du service.
                    Aucun cookie publicitaire n&apos;est utilisé sans votre consentement explicite.
                </p>

                <h2>Limitation de responsabilité</h2>
                <p>
                    Les prix affichés sur ce site sont donnés à titre indicatif et peuvent varier selon les loueurs et les zones géographiques.
                    Prix-Location-Benne.fr ne saurait être tenu responsable des tarifs finaux pratiqués par les professionnels partenaires.
                </p>
            </div>
        </div>
    );
}
